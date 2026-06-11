export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border bg-bg-sunken">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-content-dim sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-md text-balance font-mono leading-relaxed tracking-[0.18em]">
          © {year} Hong Jinho · Game Developer Portfolio
        </p>
        <ul className="flex flex-col gap-2 font-mono sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
          <li>
            <a
              href="https://github.com/mynameisjinhohong"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="mailto:ghddhksduq@gmail.com"
              className="inline-flex min-h-11 items-center break-all transition-colors hover:text-accent"
            >
              Email
            </a>
          </li>
          <li className="w-full leading-relaxed text-content-muted sm:w-auto">
            Built with Next.js · Tailwind CSS
          </li>
        </ul>
      </div>
    </footer>
  );
}
