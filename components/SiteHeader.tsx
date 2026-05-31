import Link from "next/link";

type SiteHeaderProps = {
  title: string;
};

export function SiteHeader({ title }: SiteHeaderProps) {
  return (
    <header className="border-b border-hairline bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-content items-center justify-between gap-4 px-6 lg:px-12">
        <Link href="/" className="focus-ring rounded-md text-heading-sm text-on-dark">
          ← Home
        </Link>
        <p className="text-body-sm-strong text-on-dark">{title}</p>
      </div>
    </header>
  );
}
