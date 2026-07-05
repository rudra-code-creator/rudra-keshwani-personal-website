type LinkedInPostEmbedProps = {
  embedSrc: string;
  title?: string;
};

export function LinkedInPostEmbed({
  embedSrc,
  title = "Embedded LinkedIn post",
}: LinkedInPostEmbedProps) {
  return (
    <div className="overflow-hidden rounded-md border border-hairline bg-surface">
      <iframe
        src={embedSrc}
        title={title}
        className="h-[min(680px,75vh)] w-full min-h-[480px] bg-white"
        loading="lazy"
      />
    </div>
  );
}
