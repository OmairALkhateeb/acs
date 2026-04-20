import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gradient-gold">404</h1>
        <p className="mt-4 text-ivory/70">Lost in the void.</p>
        <Link to="/" className="mt-6 inline-block text-[var(--gold)] underline-offset-4 hover:underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "A-C-S — Performance. Strategy. Conversion." },
      { name: "description", content: "A-C-S is a creative performance studio turning attention into measurable business results." },
      { name: "author", content: "A-C-S" },
      { property: "og:title", content: "A-C-S — Performance. Strategy. Conversion." },
      { property: "og:description", content: "A-C-S is a creative performance studio turning attention into measurable business results." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "A-C-S — Performance. Strategy. Conversion." },
      { name: "twitter:description", content: "A-C-S is a creative performance studio turning attention into measurable business results." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9b282b9a-5260-4517-a5a2-b1038c3aa5f9" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9b282b9a-5260-4517-a5a2-b1038c3aa5f9" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <I18nProvider>
      <div className="relative min-h-screen overflow-hidden">
        {/* Global continuous cinematic background — fixed across all sections */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-cinematic">
          <div className="aurora-layer-1" />
          <div className="aurora-layer-2" />
          <div className="absolute inset-0 grid-overlay opacity-[0.08]" />
        </div>
        <Header />
        <main className="relative">
          <Outlet />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </I18nProvider>
  );
}
