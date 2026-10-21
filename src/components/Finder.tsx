import type { ReactNode } from "react";
import type { SitePage } from "../data/site";
import { Breadcrumb } from "./Breadcrumb";
import { Sidebar } from "./Sidebar";

export function Finder({
  page,
  children,
}: {
  page?: SitePage;
  children: ReactNode;
}) {
  return (
    <main>
      <div className="desktop flex h-dvh flex-col">
        <div className="finder-shell min-h-0 flex-1">
          <section
            data-menu-open="false"
            className="finder relative flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--window-radius)] md:flex-row"
            aria-label="Personal filesystem"
          >
            <Sidebar />
            <div className="finder-preview relative isolate grid min-h-0 min-w-0 flex-1 grid-cols-1 grid-rows-1">
              {page && <Breadcrumb page={page} />}
              <div className="finder-content no-scrollbar col-start-1 row-start-1 flex min-h-0 min-w-0 flex-col overflow-y-auto overscroll-contain px-[var(--preview-pad)] pb-[var(--content-bottom)] [&>:first-child]:mt-[calc(var(--preview-fade)+0.375rem)]">
                {children}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
