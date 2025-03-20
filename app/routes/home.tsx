import type { Route } from "../+types/root";
import { Welcome } from "../welcome/welcome";
import AppLayout from "../components/layout/AppLayout";
import TestGql from "../components/TestGql";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VocabMaster - AI-Powered Vocabulary Learning" },
    { name: "description", content: "Enhance your vocabulary learning with personalized AI-powered tests and analysis." },
  ];
}

export default function Home() {
  return (
    <AppLayout>
      <Welcome />
      <div className="mt-8">
        <TestGql />
      </div>
    </AppLayout>
  );
}
