export function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          ForgeKit Web
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Your reusable web-development starter kit.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A practical React + TypeScript foundation for dashboards, SaaS apps,
          admin panels, landing pages, and business software.
        </p>
      </section>
    </main>
  )
}