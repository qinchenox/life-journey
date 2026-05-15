"use client";

import { Header } from "@/components/layout/Header";
import { ResumeForm } from "@/components/edit/ResumeForm";

export default function EditPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <ResumeForm />
      </main>
    </>
  );
}
