"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { t } from "@/i18n";

/* ── Web Audio 人生旅途主题轻音乐 ── */

type Voice = { osc: OscillatorNode; gain: GainNode; filter?: BiquadFilterNode };

class MusicEngine {
  ctx: AudioContext | null = null;
  masterGain: GainNode | null = null;
  voices: Voice[] = [];
  playing = false;
  tempo = 68; // BPM — gentle walking pace
  key = "C"; // C major — bright, positive

  // ▸ Scale degrees for melody
  scale = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88]; // C4-B4
  // ▸ Chord roots (I  V  vi  IV  I)
  chords = [
    [261.63, 329.63, 392.0],   // C major
    [392.0, 493.88, 587.33],   // G major
    [220.0, 261.63, 329.63],   // Am
    [349.23, 440.0, 523.25],   // F major
  ];
  chordIdx = 0;
  timer: ReturnType<typeof setInterval> | null = null;

  async init() {
    if (this.ctx) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.35;
    this.masterGain.connect(this.ctx.destination);
  }

  private note(
    freq: number,
    startTime: number,
    duration: number,
    opts: { type?: OscillatorType; vol?: number; filterFreq?: number; detune?: number } = {}
  ) {
    if (!this.ctx || !this.masterGain) return;
    const { type = "sine", vol = 0.15, filterFreq = 0, detune = 0 } = opts;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    if (detune) osc.detune.value = detune;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + 0.08);
    gain.gain.setValueAtTime(vol, startTime + duration * 0.7);
    gain.gain.linearRampToValueAtTime(0.001, startTime + duration);

    let filter: BiquadFilterNode | undefined;
    if (filterFreq) {
      filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = filterFreq;
      osc.connect(filter);
      filter.connect(gain);
    } else {
      osc.connect(gain);
    }
    gain.connect(this.masterGain!);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private playChord(root: number, third: number, fifth: number, start: number, dur: number) {
    // Soft pad — low filtered saw
    this.note(root / 2, start, dur, { type: "sawtooth", vol: 0.06, filterFreq: 400 });
    this.note(root, start, dur, { type: "sine", vol: 0.09 });
    this.note(third, start, dur, { type: "sine", vol: 0.07, detune: 5 });
    this.note(fifth, start, dur, { type: "sine", vol: 0.06, detune: -5 });
  }

  private playMelodyNote(freq: number, start: number, dur: number) {
    // Bell-like — high sine + harmonic
    this.note(freq * 2, start, dur * 0.6, { type: "sine", vol: 0.05 });
    this.note(freq, start, dur * 0.9, { type: "sine", vol: 0.08 });
    // Soft harmonic shimmer
    this.note(freq * 3, start, dur * 0.25, { type: "sine", vol: 0.02 });
  }

  // Uplifting melody pattern (scale degree indices)
  private melodyPattern = [
    [0, 2, 4, 2],   // C-E-G-E
    [4, 6, 7, 6],   // G-B-C'-B
    [5, 4, 2, 0],   // A-G-E-C
    [3, 2, 0, -1],  // F-E-C-B(low)
  ];

  private tick() {
    if (!this.ctx || !this.playing) return;
    const now = this.ctx.currentTime;
    const barDur = 60 / this.tempo * 4; // 4 beats per chord

    // Play current chord as pad
    const chord = this.chords[this.chordIdx];
    this.playChord(chord[0], chord[1], chord[2], now, barDur);

    // Play melody notes
    const melody = this.melodyPattern[this.chordIdx];
    const noteLen = barDur / (melody.length + 1);
    melody.forEach((degree, i) => {
      const idx = (degree + 7) % 7;
      const freq = this.scale[Math.abs(idx)] * (degree < 0 ? 0.5 : degree >= 7 ? 2 : 1);
      this.playMelodyNote(freq, now + noteLen * (i + 0.5), noteLen * 0.7);
    });

    // Bell accent on chord change
    this.note(chord[0] * 2, now + 0.05, 1.5, { type: "sine", vol: 0.04 });
    this.note(chord[0] * 3, now + 0.1, 1.2, { type: "sine", vol: 0.02, detune: 10 });

    this.chordIdx = (this.chordIdx + 1) % this.chords.length;
  }

  start() {
    if (!this.ctx || this.playing) return;
    if (this.ctx.state === "suspended") this.ctx.resume();
    this.playing = true;
    this.chordIdx = 0;

    // Ambient drone
    if (this.ctx && this.masterGain) {
      const drone = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();
      drone.type = "sine";
      drone.frequency.value = 65.41; // C2 — warm bass
      droneGain.gain.value = 0.04;
      drone.connect(droneGain);
      droneGain.connect(this.masterGain);
      drone.start();
    }

    // Ambient texture — slow LFO filtered noise
    if (this.ctx && this.masterGain) {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.value = 600;
      noiseFilter.Q.value = 1;
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.15;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 200;
      lfo.connect(lfoGain);
      lfoGain.connect(noiseFilter.frequency);
      lfo.start();
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.value = 0.02;
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      noise.start();
    }

    this.tick();
    this.timer = setInterval(() => this.tick(), 60 / this.tempo * 4 * 1000);
  }

  stop() {
    this.playing = false;
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  }

  toggle() {
    if (this.playing) this.stop();
    else this.start();
  }

  setVolume(v: number) {
    if (this.masterGain) this.masterGain.gain.value = v;
  }
}

/* ── React Component ── */

export function ThemeMusic() {
  const engineRef = useRef<MusicEngine | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showVol, setShowVol] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [started, setStarted] = useState(false); // auto-play on first interaction

  // Global click listener for first interaction
  useEffect(() => {
    const handler = async () => {
      if (started) return;
      setStarted(true);
      const e = new MusicEngine();
      await e.init();
      e.setVolume(volume);
      e.start();
      setPlaying(true);
      engineRef.current = e;

      // Save ref for pause on other pages
      (window as unknown as Record<string, MusicEngine>).__themeMusic = e;
    };
    window.addEventListener("click", handler, { once: true });
    return () => window.removeEventListener("click", handler);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback(() => {
    const e = engineRef.current || (window as unknown as Record<string, MusicEngine>).__themeMusic;
    if (!e) return;
    e.toggle();
    setPlaying(e.playing);
  }, []);

  const handleVolume = useCallback((v: number) => {
    setVolume(v);
    const e = engineRef.current || (window as unknown as Record<string, MusicEngine>).__themeMusic;
    e?.setVolume(v);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[90] flex flex-col items-center gap-1">
      {showVol && (
        <input
          type="range"
          min="0.05" max="0.6" step="0.05" value={volume}
          onChange={(e) => handleVolume(parseFloat(e.target.value))}
          className="w-20 h-1 accent-teal-600 rotate-[-90deg] origin-bottom mb-12"
          style={{ writingMode: "vertical-lr", direction: "rtl", height: "60px" }}
        />
      )}
      <button
        onClick={() => { if (!started) { window.dispatchEvent(new Event("click")); } toggle(); }}
        onDoubleClick={() => setShowVol(!showVol)}
        className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-sm transition-all hover:scale-110 active:scale-95 ${playing ? "animate-pulse" : ""}`}
        style={{
          background: playing
            ? "linear-gradient(135deg, #0f766e, #14b8a6)"
            : "rgba(255,255,255,0.9)",
          border: playing ? "none" : "1px solid rgba(13,148,136,0.2)",
          boxShadow: playing ? "0 4px 16px rgba(13,148,136,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
        }}
        title={playing ? t("music.title") : t("music.hint")}
      >
        {playing ? "🎵" : "♪"}
      </button>
    </div>
  );
}
