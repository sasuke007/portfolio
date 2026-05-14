const LINKEDIN_HANDLE = "rohit-pandit-419b8215a";

export function LinkedInLink() {
  return (
    <a
      href={`https://www.linkedin.com/in/${LINKEDIN_HANDLE}/`}
      target="_blank"
      rel="noreferrer"
      aria-label="LinkedIn profile"
      className="relative flex h-8 items-center justify-end overflow-hidden rounded-full bg-text transition-transform hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bg/30 focus-visible:ring-offset-2"
      style={{ width: "32px" }}
    >
      <span
        aria-hidden
        className="mx-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg"
      >
        <img
          src="/assets/linkedin.svg"
          alt=""
          width={14}
          height={14}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
    </a>
  );
}
