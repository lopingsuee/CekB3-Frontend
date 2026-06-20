export function HeroWasteIllustration() {
  return (
    <figure
      className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-surface)] p-3 shadow-[var(--shadow-soft)]"
      aria-label="Ilustrasi analisis limbah B3 rumah tangga dengan baterai, lampu, aerosol, oli, dan obat"
    >
      <svg viewBox="0 0 720 520" role="img" className="h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id="leafWash" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-faint)" />
            <stop offset="100%" stopColor="var(--color-paper-2)" />
          </linearGradient>
          <linearGradient id="heat" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-warning)" />
            <stop offset="100%" stopColor="var(--color-danger)" />
          </linearGradient>
        </defs>

        <rect width="720" height="520" rx="8" fill="url(#leafWash)" />
        <path
          d="M34 398C121 335 186 330 266 365C359 405 443 387 526 313C585 260 640 240 690 248"
          fill="none"
          stroke="var(--color-rule-strong)"
          strokeWidth="2"
          opacity="0.6"
        />
        <path
          d="M64 110C137 72 214 76 291 123C370 171 453 174 540 128C600 96 654 93 698 111"
          fill="none"
          stroke="var(--color-accent-soft)"
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.9"
        />

        <g transform="translate(64 90)">
          <rect x="0" y="0" width="190" height="260" rx="8" fill="var(--color-surface)" stroke="var(--color-rule)" />
          <rect x="20" y="22" width="150" height="150" rx="8" fill="var(--color-paper-2)" />
          <path d="M55 62h72v92H55z" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="3" />
          <path d="M75 52h32v10H75z" fill="var(--color-accent)" />
          <path d="M91 78v60M68 108h46" stroke="var(--color-accent)" strokeWidth="7" strokeLinecap="round" />
          <path d="M42 185h106" stroke="var(--color-rule-strong)" strokeWidth="3" strokeLinecap="round" />
          <path d="M42 207h78" stroke="var(--color-rule)" strokeWidth="3" strokeLinecap="round" />
          <rect x="42" y="226" width="86" height="20" rx="8" fill="var(--color-danger-soft)" />
        </g>

        <g transform="translate(278 62)">
          <rect x="0" y="0" width="190" height="310" rx="8" fill="var(--color-ink)" />
          <rect x="22" y="24" width="146" height="172" rx="8" fill="var(--color-paper)" />
          <path d="M95 48c34 0 56 23 56 56 0 29-18 52-43 57v20H82v-20c-25-5-43-28-43-57 0-33 22-56 56-56Z" fill="var(--color-warning-soft)" stroke="var(--color-warning)" strokeWidth="3" />
          <path d="M81 181h28v25H81z" fill="var(--color-warning)" />
          <path d="M59 238h74" stroke="var(--color-accent-soft)" strokeWidth="8" strokeLinecap="round" />
          <path d="M47 264h98" stroke="var(--color-rule-strong)" strokeWidth="3" strokeLinecap="round" />
          <path d="M47 284h68" stroke="var(--color-rule-strong)" strokeWidth="3" strokeLinecap="round" />
        </g>

        <g transform="translate(494 110)">
          <rect x="0" y="0" width="150" height="238" rx="8" fill="var(--color-surface)" stroke="var(--color-rule)" />
          <rect x="45" y="26" width="58" height="154" rx="8" fill="var(--color-paper-3)" stroke="var(--color-ink-soft)" strokeWidth="3" />
          <rect x="53" y="12" width="42" height="22" rx="6" fill="var(--color-accent)" />
          <path d="M47 74h56" stroke="var(--color-danger)" strokeWidth="6" strokeLinecap="round" />
          <path d="M47 108h56" stroke="var(--color-warning)" strokeWidth="6" strokeLinecap="round" />
          <path d="M47 142h56" stroke="var(--color-accent)" strokeWidth="6" strokeLinecap="round" />
          <path d="M32 204h84" stroke="var(--color-rule-strong)" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 222h62" stroke="var(--color-rule)" strokeWidth="3" strokeLinecap="round" />
        </g>

        <g transform="translate(126 382)">
          <rect x="0" y="0" width="478" height="88" rx="8" fill="var(--color-surface)" stroke="var(--color-rule)" />
          <g transform="translate(24 22)">
            <circle cx="22" cy="22" r="22" fill="url(#heat)" opacity="0.88" />
            <circle cx="22" cy="22" r="9" fill="var(--color-accent-ink)" opacity="0.9" />
          </g>
          <path d="M86 28h128" stroke="var(--color-ink)" strokeWidth="8" strokeLinecap="round" />
          <path d="M86 55h210" stroke="var(--color-rule-strong)" strokeWidth="4" strokeLinecap="round" />
          <rect x="330" y="24" width="118" height="40" rx="20" fill="var(--color-accent)" />
          <path d="M355 45h68" stroke="var(--color-accent-ink)" strokeWidth="5" strokeLinecap="round" />
        </g>

        <g fill="none" stroke="var(--color-accent)" strokeLinecap="round" opacity="0.75">
          <path d="M590 62c-44 14-73 44-87 91 45-7 77-34 96-82" strokeWidth="4" />
          <path d="M538 126c19-18 39-33 61-46" strokeWidth="3" />
          <path d="M126 64c-32 2-57 19-75 52 34 6 62-5 84-37" strokeWidth="4" />
          <path d="M80 111c16-14 34-25 55-32" strokeWidth="3" />
        </g>
      </svg>
    </figure>
  );
}
