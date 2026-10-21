import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Finder } from "../../components/Finder";
import { MediaGallery } from "../../components/MediaGallery";
import { NoteView } from "../../components/NoteView";
import { RadioPlayer } from "../../components/RadioPlayer";
import { ALL_PAGES, getPage } from "../../data/site";

export function generateStaticParams() {
  return ALL_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = getPage(slug);
    if (!page) return {};
    return { title: page.name };
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  return (
    <Finder page={page}>
      {page.kind === "note" && <NoteView page={page} />}
      {page.kind === "sound" && <RadioPlayer page={page} />}
      {(page.kind === "work" || page.kind === "artifact") && (
        <MediaGallery page={page} />
      )}
    </Finder>
  );
}
