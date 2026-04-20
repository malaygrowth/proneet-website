// Author byline + freshness signal. Required below H1 on every page per
// the content handbook (E-E-A-T + AEO/GEO citation weighting).

interface PageBylineProps {
  author: string;
  authorRole: string;
  lastUpdated: string;
}

export function PageByline({ author, authorRole, lastUpdated }: PageBylineProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-400">
      <span>
        By <span className="font-semibold text-slate-600">{author}</span>,{" "}
        {authorRole}
      </span>
      <span aria-hidden="true" className="text-slate-300">
        ·
      </span>
      <span>
        Last updated{" "}
        <time dateTime={toIsoDate(lastUpdated)}>{lastUpdated}</time>
      </span>
    </div>
  );
}

function toIsoDate(humanDate: string): string {
  const parsed = new Date(humanDate);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
}
