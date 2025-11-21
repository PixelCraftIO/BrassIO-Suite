export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Impressum</h1>

      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Angaben gemäß § 5 TMG
          </h2>
          <p>
            [Ihr vollständiger Name]<br />
            [Straße und Hausnummer]<br />
            [PLZ und Ort]<br />
            [Land]
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Kontakt
          </h2>
          <p>
            Telefon: [Ihre Telefonnummer]<br />
            E-Mail: [Ihre E-Mail-Adresse]
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p>
            [Ihr vollständiger Name]<br />
            [Straße und Hausnummer]<br />
            [PLZ und Ort]
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            EU-Streitschlichtung
          </h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B8860B] hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p className="mt-2">
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Verbraucherstreitbeilegung/Universalschlichtungsstelle
          </h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </div>
    </div>
  )
}
