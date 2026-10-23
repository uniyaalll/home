import type { Metadata } from "next";
import { LinkBio } from "../components/LinkBio";
import { BRAND, BRAND_HANDLE } from "../data/site";

export const metadata: Metadata = {
  title: `${BRAND} · Links`,
  description: `Link in bio for ${BRAND_HANDLE}. Works, artifacts, notes & sounds.`,
};

export default function Home() {
  return <LinkBio />;
}
