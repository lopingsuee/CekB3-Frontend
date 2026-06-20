export function GradCamDemo() {
  return (
    <figure className="surface grid gap-3 p-3 md:grid-cols-2">
      <div className="relative min-h-72 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-paper-2)]">
        <svg viewBox="0 0 360 320" className="h-full w-full" aria-hidden="true">
          <rect width="360" height="320" fill="var(--color-paper-2)" />
          <path d="M38 268C92 196 161 172 244 196c35 10 60 27 78 52" fill="none" stroke="var(--color-rule-strong)" strokeWidth="3" />
          <rect x="126" y="76" width="108" height="162" rx="8" fill="var(--color-surface)" stroke="var(--color-ink-soft)" strokeWidth="4" />
          <rect x="142" y="53" width="76" height="34" rx="8" fill="var(--color-accent)" />
          <path d="M140 122h80M140 162h80M140 202h80" stroke="var(--color-rule-strong)" strokeWidth="7" strokeLinecap="round" />
        </svg>
        <figcaption className="absolute bottom-3 left-3 rounded-[var(--radius-pill)] bg-[var(--color-surface)] px-3 py-1 text-xs font-bold">
          Foto input
        </figcaption>
      </div>
      <div className="relative min-h-72 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-paper-2)]">
        <svg viewBox="0 0 360 320" className="h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="camFocus" cx="50%" cy="48%" r="45%">
              <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.9" />
              <stop offset="48%" stopColor="var(--color-warning)" stopOpacity="0.68" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.05" />
            </radialGradient>
          </defs>
          <rect width="360" height="320" fill="var(--color-paper-2)" />
          <path d="M38 268C92 196 161 172 244 196c35 10 60 27 78 52" fill="none" stroke="var(--color-rule-strong)" strokeWidth="3" />
          <rect x="126" y="76" width="108" height="162" rx="8" fill="var(--color-surface)" stroke="var(--color-ink-soft)" strokeWidth="4" />
          <rect x="142" y="53" width="76" height="34" rx="8" fill="var(--color-accent)" />
          <path d="M140 122h80M140 162h80M140 202h80" stroke="var(--color-rule-strong)" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="181" cy="152" rx="116" ry="104" fill="url(#camFocus)" />
        </svg>
        <figcaption className="absolute bottom-3 left-3 rounded-[var(--radius-pill)] bg-[var(--color-surface)] px-3 py-1 text-xs font-bold">
          Overlay Grad-CAM
        </figcaption>
      </div>
    </figure>
  );
}
