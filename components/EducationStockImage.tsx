import Image from "next/image";

const STOCK_IMAGE_SRC = "/images/education-stock.png";

/** Editorial stock image that balances the education timeline on desktop. */
export function EducationStockImage() {
  return (
    <figure className="relative h-full min-h-[20rem] w-full overflow-hidden rounded-lg border border-hairline bg-surface">
      <Image
        src={STOCK_IMAGE_SRC}
        alt="Students collaborating around a table with notebooks and a laptop"
        fill
        className="object-cover object-center"
        sizes="30vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent"
        aria-hidden
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-3 text-caption-sm text-white">
        Learning in motion
        <span className="mt-0.5 block text-[0.625rem] text-white/65">Stock photo · Unsplash</span>
      </figcaption>
    </figure>
  );
}
