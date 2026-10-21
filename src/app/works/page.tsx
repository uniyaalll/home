import type { Metadata } from "next";
import { Finder } from "../../components/Finder";
import { MediaGallery } from "../../components/MediaGallery";
import { getPage } from "../../data/site";

export const metadata: Metadata = { title: "Works" };

export default function WorksPage() {
  const page = getPage("odyssey")!;
  return (
    <Finder page={page}>
      <MediaGallery page={page} />
    </Finder>
  );
}
