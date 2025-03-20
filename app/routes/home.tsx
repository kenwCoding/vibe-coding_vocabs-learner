import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import AppLayout from "../components/layout/AppLayout";

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
    </AppLayout>
  );
}
