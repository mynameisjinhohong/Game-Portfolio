export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border bg-bg-sunken">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-content-dim sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono tracking-wider">© {year} Hong Jinho · Game Developer Portfolio</p>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono">
          <li>
            <a
              href="https://github.com/mynameisjinhohong"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="mailto:ghddhksduq@gmail.com" className="hover:text-accent transition-colors">
              Email
            </a>
          </li>
          <li className="text-content-muted">Built with Next.js · Tailwind CSS</li>
        </ul>
      </div>
    </footer>
  );
}
