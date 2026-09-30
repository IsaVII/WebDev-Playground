import { Link } from "react-router-dom";

const LAST_UPDATED = "August 28, 2026";

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold mb-3 text-heading">{title}</h2>
      <div className="space-y-3 text-muted leading-relaxed">{children}</div>
    </section>
  );
}

const COOKIE_ROWS = [
  {
    name: "learningToolProgress",
    provider: "This site (first-party)",
    purpose:
      "Remembers which topics and sub-topics you've checked off, so your progress is still there the next time you visit.",
    duration: "Persistent - stays until it expires or you clear it",
    category: "Strictly necessary / functional",
  },
  {
    name: "theme",
    provider: "This site (first-party)",
    purpose: "Remembers whether you last used light or dark mode.",
    duration: "Persistent - stays until it expires or you clear it",
    category: "Strictly necessary / functional",
  },
];

export default function CookiePolicy() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-heading-alt">Cookie Policy</h1>
        <p className="mt-2 text-sm text-subtle">Last updated: {LAST_UPDATED}</p>
      </header>

      {/* Quick nav */}
      <nav
        className="mb-10 rounded-lg p-4 text-sm"
        style={{ border: "1px solid var(--border)" }}
      >
        <p className="font-medium mb-2 text-heading">On this page</p>
        <ul
          className="grid sm:grid-cols-2 gap-x-5 gap-y-1 md:px-20 pt-3 list-disc list-inside text-left"
          style={{ color: "var(--link-color)" }}
        >
          <li>
            <a href="#what-are-cookies">What cookies are</a>
          </li>
          <li>
            <a href="#cookies-we-use">Cookies we use</a>
          </li>
          <li>
            <a href="#why-no-consent-banner">Why there's no consent banner</a>
          </li>
          <li>
            <a href="#third-party">Third-party cookies</a>
          </li>
          <li>
            <a href="#managing-cookies">Managing / clearing cookies</a>
          </li>
          <li>
            <a href="#changes">Changes to this policy</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <div className="space-y-10">
        <Section id="what-are-cookies" title="What cookies are">
          <p>
            Cookies are small text files a website stores in your browser. They
            let a site remember information about your visit — like a saved
            setting or your progress through a page — the next time you come
            back.
          </p>
        </Section>

        <Section id="cookies-we-use" title="Cookies we use">
          <p>
            This is a static, front-end-only learning tool. It has no backend,
            no user accounts, and does not track you across other websites. The
            only cookies it sets are the two below, both used purely to make the
            app remember your own local preferences on this device.
          </p>

          <div
            className="overflow-x-auto mt-4 rounded-lg text-left"
            style={{ border: "1px solid var(--border)" }}
          >
            <table className="min-w-full text-sm">
              <thead className="bg-surface-alt">
                <tr>
                  <th className="text-left font-semibold px-4 py-2 text-heading">
                    Name
                  </th>
                  <th className="text-left font-semibold px-4 py-2 text-heading">
                    Provider
                  </th>
                  <th className="text-left font-semibold px-4 py-2 text-heading">
                    Purpose
                  </th>
                  <th className="text-left font-semibold px-4 py-2 text-heading">
                    Duration
                  </th>
                  <th className="text-left font-semibold px-4 py-2 text-heading">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {COOKIE_ROWS.map((c) => (
                  <tr
                    key={c.name}
                    className="border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="px-4 py-2 font-mono text-xs text-heading">
                      {c.name}
                    </td>
                    <td className="px-4 py-2 text-muted">{c.provider}</td>
                    <td className="px-4 py-2 text-muted">{c.purpose}</td>
                    <td className="px-4 py-2 text-muted">{c.duration}</td>
                    <td className="px-4 py-2 text-muted">{c.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-subtle mt-2">
            Nothing you enter or check off is ever sent to a server — these
            cookies are read and written entirely by your browser, via the
            helpers in{" "}
            <code className="font-mono text-xs">src/utils/cookies.js</code>.
          </p>
        </Section>

        <Section
          id="why-no-consent-banner"
          title="Why there's no consent banner"
        >
          <p>
            Most regions that require cookie consent banners (e.g. under the
            EU's ePrivacy rules) exempt cookies that are "strictly necessary"
            for a feature you've explicitly requested — such as remembering your
            own progress or theme choice. Since both cookies here are
            first-party, functional, and never used for advertising, cross-site
            tracking, or analytics, this site does not show a cookie consent
            banner.
          </p>
          <p>
            This is general information, not legal advice — if you're deploying
            a fork of this project commercially or in a specific jurisdiction,
            check what applies to you.
          </p>
        </Section>

        <Section id="third-party" title="Third-party cookies">
          <p>
            This app does not embed third-party trackers, ads, or analytics
            scripts, and does not set any third-party cookies. If you host this
            project behind something like GitHub Pages, GitHub itself may set
            its own infrastructure cookies unrelated to this app — those are
            covered by{" "}
            <a
              href="https://docs.github.com/site-policy/privacy-policies/github-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--link-color)" }}
            >
              GitHub's own privacy statement
            </a>
            , not this policy.
          </p>
        </Section>

        <Section id="managing-cookies" title="Managing or clearing cookies">
          <p>
            You're always in control of these cookies through your browser
            settings. If you clear your browser's cookies (or this site's
            cookies specifically), your saved topic progress and theme
            preference will reset to their defaults — nothing else on the site
            depends on them, and everything still works without them.
          </p>
          <ul className="list-disc list-inside space-y-1 text-left">
            <li>
              <span className="font-medium text-heading">Chrome:</span> Settings
              → Privacy and security → Cookies and other site data
            </li>
            <li>
              <span className="font-medium text-heading">Firefox:</span>{" "}
              Settings → Privacy &amp; Security → Cookies and Site Data
            </li>
            <li>
              <span className="font-medium text-heading">Safari:</span> Settings
              → Privacy → Manage Website Data
            </li>
            <li>
              <span className="font-medium text-heading">Edge:</span> Settings →
              Cookies and site permissions → Manage and delete cookies
            </li>
          </ul>
        </Section>

        <Section id="changes" title="Changes to this policy">
          <p>
            If the cookies this app uses ever change, this page will be updated
            and the "Last updated" date above will reflect that. Since this is
            an open-source project, you can also see the exact history of this
            file in the repository's commit log.
          </p>
        </Section>

        <Section id="contact" title="Contact">
          <p>
            Questions about this policy or how progress-tracking works can be
            raised as an issue on the{" "}
            <a
              href="https://github.com/IsaVII/WebDev-Playground/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--link-color)" }}
            >
              project's GitHub repository
            </a>
            .
          </p>
        </Section>
      </div>

      <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700">
        <Link
          to="/"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
