export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Datenschutzerklärung</h1>

      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            1. Datenschutz auf einen Blick
          </h2>
          <h3 className="mb-1 mt-3 font-semibold">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
            Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            2. Datenerfassung auf dieser Website
          </h2>
          <h3 className="mb-1 mt-3 font-semibold">
            Wer ist verantwortlich für die Datenerfassung auf dieser Website?
          </h3>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
            Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>

          <h3 className="mb-1 mt-3 font-semibold">Wie erfassen wir Ihre Daten?</h3>
          <p>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen.
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der
            Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten
            (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>

          <h3 className="mb-1 mt-3 font-semibold">Wofür nutzen wir Ihre Daten?</h3>
          <p>
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website
            zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
          </p>

          <h3 className="mb-1 mt-3 font-semibold">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und
            Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem
            ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine
            Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung
            jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten
            Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            3. Hosting
          </h2>
          <p>
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
          </p>
          <p className="mt-2">
            [Hosting-Anbieter eintragen]
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            4. Allgemeine Hinweise und Pflichtinformationen
          </h2>
          <h3 className="mb-1 mt-3 font-semibold">Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
            Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den
            gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3 className="mb-1 mt-3 font-semibold">Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p className="mt-2">
            [Ihr vollständiger Name]<br />
            [Straße und Hausnummer]<br />
            [PLZ und Ort]<br />
            E-Mail: [Ihre E-Mail-Adresse]
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            5. Datenerfassung auf dieser Website
          </h2>
          <h3 className="mb-1 mt-3 font-semibold">Cookies</h3>
          <p>
            Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine
            Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder
            vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft
            (permanente Cookies) auf Ihrem Endgerät gespeichert.
          </p>
          <p className="mt-2">
            Diese Website verwendet ausschließlich technisch notwendige Cookies für die
            Speicherung Ihrer Theme-Präferenz (Hell/Dunkel-Modus).
          </p>

          <h3 className="mb-1 mt-3 font-semibold">Server-Log-Dateien</h3>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch Informationen in so
            genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
          </p>
          <ul className="mt-2 list-inside list-disc">
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p className="mt-2">
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            6. Lokale Speicherung
          </h2>
          <p>
            Diese Anwendung speichert Ihre Metronom- und Rhythmus-Einstellungen lokal in
            Ihrem Browser (LocalStorage). Diese Daten werden nicht an unsere Server übertragen
            und verbleiben ausschließlich auf Ihrem Gerät.
          </p>
        </section>
      </div>
    </div>
  )
}
