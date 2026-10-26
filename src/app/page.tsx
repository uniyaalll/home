import type { Metadata } from "next";
import { HomePage } from "../components/HomePage";
import { BIO } from "../data/bio";

export const metadata: Metadata = {
  title: BIO.name,
  description: BIO.intro,
};

export default function Home() {
  return <HomePage />;
}
