export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border bg-bg-sunken">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-content-dim sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-md font-mono leading-relaxed tracking-wider">
          © {year} Hong Jinho · Game Developer Portfolio
        </p>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono">
          <li>
            <a
              href="https://github.com/mynameisjinhohong"
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="mailto:ghddhksduq@gmail.com" className="transition-colors hover:text-accent">
              Email
            </a>
          </li>
          <li className="w-full text-content-muted sm:w-auto">Built with Next.js · Tailwind CSS</li>
        </ul>
      </div>
    </footer>
  );
}
