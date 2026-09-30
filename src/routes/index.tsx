import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  FileCheck,
  FileText,
  Grass,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  TreePine,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitDevis } from "@/lib/devis.functions";

import heroImage from "@/assets/hero-elagage.jpg";
import prestaElagage from "@/assets/presta-elagage.jpg";
import prestaEspacesVerts from "@/assets/presta-espaces-verts.jpg";
import prestaDemoussage from "@/assets/presta-demoussage.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Paysagiste & Élagage à Lux et Chalon-sur-Saône | Ent Dufresne Services Espaces Verts",
      },
      {
        name: "description",
        content:
          "Ent Dufresne Services Espaces Verts, paysagiste à Lux et Chalon-sur-Saône (71) : élagage, abattage d'arbre, entretien d'espaces verts et démoussage de toiture. Devis gratuit, intervention rapide jusqu'à 19h. Note 5,0/5 sur Google (16 avis).",
      },
      {
        property: "og:title",
        content: "Paysagiste & Élagage à Lux et Chalon-sur-Saône — Ent Dufresne",
      },
      {
        property: "og:description",
        content:
          "Élagage, abattage d'arbre 71, entretien d'espaces verts et démoussage de toiture à Lux et Chalon-sur-Saône. Devis gratuit, intervention rapide jusqu'à 19h. 5,0/5 sur Google (16 avis).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const PHONE_DISPLAY = "06 52 68 76 53";
const PHONE_TEL = "tel:+33652687653";

const prestations = [
  {
    icon: TreePine,
    image: prestaElagage,
    alt: "Élagueur professionnel équipé coupant une branche d'arbre — élagage et abattage d'arbre 71",
    title: "Élagage & Abattage d'arbres",
    description:
      "Taille, élagage et abattage d'arbre en toute sécurité, même en milieu urbain ou proche d'habitations.",
    points: [
      "Intervention en sécurité : EPI complets et matériel certifié",
      "Élagage, émondage, abattage et dessouchage",
      "Évacuation complète des branches et nettoyage du chantier",
    ],
  },
  {
    icon: Grass,
    image: prestaEspacesVerts,
    alt: "Pelouse fraîchement tondue et haies taillées devant une maison — entretien d'espaces verts en Saône-et-Loire",
    title: "Entretien d'espaces verts",
    description:
      "Un jardin entretenu toute l'année par votre jardinier en Saône-et-Loire, avec des passages réguliers ou ponctuels.",
    points: [
      "Tonte, bordures et taille de haies",
      "Entretien régulier ou remise en état complète",
      "Débroussaillage, ramassage et évacuation des déchets verts",
    ],
  },
  {
    icon: Sparkles,
    image: prestaDemoussage,
    alt: "Nettoyage et démoussage d'une toiture en tuiles rouges — démoussage toiture Lux",
    title: "Démoussage de toiture",
    description:
      "Redonnez à votre toit son aspect d'origine et prolongez sa durée de vie, sans risque pour les tuiles.",
    points: [
      "Nettoyage doux sans agresser la couverture",
      "Traitement anti-mousse et hydrofuge protecteur",
      "Protection de l'environnement et évacuation des résidus",
    ],
  },
];

const engagements = [
  {
    icon: ShieldCheck,
    title: "Sécurité & assurance",
    description:
      "Normes de sécurité strictes, équipements de protection individuelle et assurance responsabilité civile professionnelle pour chaque chantier.",
  },
  {
    icon: FileCheck,
    title: "Devis clair et sans surprise",
    description:
      "Un devis détaillé, gratuit et transparent. Le prix annoncé est le prix respecté — c'est la règle d'or d'Ent Dufresne Services Espaces Verts.",
  },
  {
    icon: Clock,
    title: "Intervention rapide jusqu'à 19h",
    description:
      "Paysagiste réactif à Lux et Chalon-sur-Saône : nous intervenons tardivement, jusqu'à 19h, partout en Saône-et-Loire.",
  },
];

const avis = [
  {
    nom: "Marie-Hélène D.",
    ville: "Lux",
    texte:
      "Élagage d'un grand chêne dans notre jardin : équipe ponctuelle, travail soigné et chantier impeccable. Le devis a été respecté au centime.",
  },
  {
    nom: "Jean-Luc M.",
    ville: "Chalon-sur-Saône",
    texte:
      "Tonte et taille de haies régulières. Toujours dans les délais, toujours souriant. Le meilleur jardinier que j'ai eu depuis des années.",
  },
  {
    nom: "Sylvie R.",
    ville: "Saint-Marcel",
    texte:
      "Démoussage complet de notre toiture : résultat bluffant, tuiles comme neuves. Devis très clair et intervention jusqu'en soirée, très pratique.",
  },
  {
    nom: "Philippe B.",
    ville: "Givry",
    texte:
      "Abattage d'un pin trop proche de la maison : matériel pro, sécurité irréprochable et évacuation totale. Je recommande sans hésiter.",
  },
];

const zoneVilles = [
  "Lux",
  "Chalon-sur-Saône",
  "Saint-Marcel",
  "Saint-Rémy",
  "Épervans",
  "Chagny",
  "Givry",
  "Buxy",
  "Sennecey-le-Grand",
  "Montchanin",
  "Montceau-les-Mines",
  "Verdun-sur-le-Doubs",
];

const prestationsOptions = [
  "Élagage & abattage",
  "Entretien d'espaces verts",
  "Démoussage de toiture",
  "Autre demande",
] as const;

type FormStatus = "idle" | "loading" | "success" | "error";

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="Note 5 sur 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function LandingPage() {
  const submit = useServerFn(submitDevis);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [prestation, setPrestation] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    try {
      await submit({
        data: {
          nom: String(data.get("nom") ?? ""),
          telephone: String(data.get("telephone") ?? ""),
          ville: String(data.get("ville") ?? ""),
          prestation: (prestation || "Autre demande") as (typeof prestationsOptions)[number],
          message: String(data.get("message") ?? ""),
        },
      });
      setStatus("success");
      form.reset();
      setPrestation("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ===== Header ===== */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-sm font-bold leading-tight sm:text-base">
                Ent Dufresne Services
              </span>
              <span className="block truncate text-xs font-medium text-muted-foreground">
                Espaces Verts · Paysagiste 71
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            <a href="#prestations" className="text-foreground/80 transition-colors hover:text-primary">
              Prestations
            </a>
            <a href="#engagements" className="text-foreground/80 transition-colors hover:text-primary">
              Engagements
            </a>
            <a href="#avis" className="text-foreground/80 transition-colors hover:text-primary">
              Avis clients
            </a>
            <a href="#devis" className="text-foreground/80 transition-colors hover:text-primary">
              Contact
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a href={PHONE_TEL}>
              <Button size="sm" className="gap-2">
                <Phone className="size-4" />
                <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
                <span className="sm:hidden">Appeler</span>
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden pt-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60rem 30rem at 110% -10%, color-mix(in oklab, var(--accent) 55%, transparent), transparent), radial-gradient(50rem 25rem at -20% 110%, color-mix(in oklab, var(--muted) 80%, transparent), transparent)",
          }}
        />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium shadow-sm">
              <Stars />
              <span className="text-foreground/90">
                5,0/5 sur Google — 16 avis
              </span>
            </div>

            <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Paysagiste &amp; Élagage à{" "}
              <span className="text-primary">Lux</span> et{" "}
              <span className="text-primary">Chalon-sur-Saône</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Ent Dufresne Services Espaces Verts, votre entreprise locale de
              paysagisme en Saône-et-Loire. Une équipe <strong className="font-semibold text-foreground">réactive</strong>,
              un <strong className="font-semibold text-foreground">devis toujours respecté</strong> et la
              satisfaction de <strong className="font-semibold text-foreground">16 avis Google à 5,0/5</strong>.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#devis" className="sm:w-auto">
                <Button size="lg" className="w-full gap-2 px-6 text-base font-semibold shadow-lg shadow-primary/25 sm:w-auto">
                  <FileText className="size-5" />
                  Demander un devis gratuit
                </Button>
              </a>
              <a href={PHONE_TEL}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 border-primary/30 px-6 text-base font-semibold text-primary hover:bg-accent hover:text-primary-foreground sm:w-auto"
                >
                  <Phone className="size-5" />
                  Appeler le {PHONE_DISPLAY}
                </Button>
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-foreground/80">
              <li className="flex items-center gap-2">
                <Zap className="size-4 text-primary" />
                Intervention rapide
              </li>
              <li className="flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                Devis gratuit
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                Assurance professionnelle
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-2xl shadow-forest/20">
              <img
                src={heroImage}
                alt="Élagueur professionnel avec harnais et tronçonneuse élaguant un arbre dans un jardin de Bourgogne — Paysagiste à Lux et Chalon-sur-Saône"
                width={1920}
                height={1088}
                className="h-auto w-full object-cover"
                fetchPriority="high"
              />
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl sm:left-8">
              <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                <CalendarCheck className="size-5" />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">Ouvert jusqu'à 19h</p>
                <p className="text-xs text-muted-foreground">Interventions en Saône-et-Loire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Prestations ===== */}
      <section id="prestations" className="bg-muted/60 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Nos prestations
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Des services complets pour votre jardin et votre toiture
            </h2>
            <p className="mt-4 text-muted-foreground">
              De l'élagage à Lux au démoussage de toiture, en passant par
              l'entretien régulier de vos espaces verts en Saône-et-Loire.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {prestations.map((p) => (
              <article
                key={p.title}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.alt}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <p.icon className="size-5" />
                    </span>
                    <h3 className="font-display text-xl font-bold leading-tight">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {p.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span className="text-foreground/85">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#devis"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-glow"
                  >
                    Demander un devis gratuit
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Engagements ===== */}
      <section id="engagements" className="bg-forest py-20 text-forest-foreground lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-glow">
              Nos engagements
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Un travail soigné, en toute confiance
            </h2>
            <p className="mt-4 text-forest-foreground/80">
              Ce que chaque client d'Ent Dufresne Services Espaces Verts peut
              attendre, à Lux comme à Chalon-sur-Saône.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {engagements.map((e) => (
              <div
                key={e.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-glow/15 text-primary-glow">
                  <e.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-forest-foreground/80">
                  {e.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a href="#devis">
              <Button size="lg" className="gap-2 px-8 text-base font-semibold shadow-lg shadow-black/20">
                <FileText className="size-5" />
                Demander un devis gratuit
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== Avis clients ===== */}
      <section id="avis" className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_2fr]">
            <div className="rounded-3xl border border-border bg-forest p-8 text-center text-forest-foreground shadow-lg">
              <p className="font-display text-6xl font-extrabold">5,0</p>
              <div className="mt-3 flex justify-center">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-forest-foreground/85">
                Note parfaite sur Google, fondée sur 16 avis clients vérifiés.
              </p>
              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="font-display text-3xl font-extrabold text-primary-glow">100 %</p>
                <p className="mt-1 text-sm text-forest-foreground/85">
                  de clients satisfaits : travail soigné et délais tenus.
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Avis clients
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ils nous font confiance autour de Lux et Chalon-sur-Saône
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {avis.map((a) => (
                  <figure
                    key={a.nom}
                    className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
                  >
                    <Stars />
                    <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
                      « {a.texte} »
                    </blockquote>
                    <figcaption className="mt-4 text-sm">
                      <span className="font-bold">{a.nom}</span>
                      <span className="text-muted-foreground"> — {a.ville}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact & devis ===== */}
      <section id="devis" className="bg-muted/60 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Contact &amp; devis gratuit
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Demandez votre devis express dès maintenant
            </h2>
            <p className="mt-4 text-muted-foreground">
              Réponse rapide, devis gratuit et sans engagement. Nous
              intervenons dans un rayon de 30 km autour de Lux et
              Chalon-sur-Saône.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Coordonnées + zone */}
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold">
                  Ent Dufresne Services Espaces Verts
                </h3>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span>
                      <span className="font-semibold">Adresse :</span>
                      <br />
                      Impasse du Bourria, 71100 Lux
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span>
                      <span className="font-semibold">Téléphone :</span>{" "}
                      <a href={PHONE_TEL} className="font-semibold text-primary hover:underline">
                        {PHONE_DISPLAY}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span>
                      <span className="font-semibold">Horaires :</span> ouvert
                      jusqu'à 19h, du lundi au samedi
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-forest p-8 text-forest-foreground shadow-sm">
                <h3 className="font-display text-xl font-bold">
                  Zone d'intervention
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-forest-foreground/85">
                  Un rayon de 30 km autour de Lux et Chalon-sur-Saône, partout
                  en Saône-et-Loire, avec des interventions possibles jusqu'à
                  19h.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {zoneVilles.map((v) => (
                    <li
                      key={v}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Formulaire */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              {status === "success" ? (
                <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
                  <CheckCircle2 className="size-14 text-primary" />
                  <h3 className="mt-5 font-display text-2xl font-bold">
                    Demande envoyée !
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Merci pour votre confiance. Nous vous rappelons très vite
                    pour programmer votre intervention. Pour aller plus vite,
                    appelez-nous directement au{" "}
                    <a href={PHONE_TEL} className="font-semibold text-primary hover:underline">
                      {PHONE_DISPLAY}
                    </a>
                    .
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setStatus("idle")}
                  >
                    Envoyer une autre demande
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-xl font-bold">
                    Demande de devis express
                  </h3>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="nom" className="text-sm font-semibold">
                        Nom *
                      </label>
                      <input
                        id="nom"
                        name="nom"
                        required
                        minLength={2}
                        placeholder="Votre nom"
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="telephone" className="text-sm font-semibold">
                        Téléphone *
                      </label>
                      <input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        required
                        placeholder="06 12 34 56 78"
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="ville" className="text-sm font-semibold">
                      Ville *
                    </label>
                    <input
                      id="ville"
                      name="ville"
                      required
                      minLength={2}
                      placeholder="Lux, Chalon-sur-Saône…"
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">
                      Type de prestation *
                    </label>
                    <Select
                      value={prestation}
                      onValueChange={setPrestation}
                      required
                    >
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Choisissez une prestation" />
                      </SelectTrigger>
                      <SelectContent>
                        {prestationsOptions.map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-semibold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      maxLength={1500}
                      placeholder="Décrivez votre besoin : arbre à élaguer, haie à tailler, toiture à démousser…"
                      className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  {status === "error" && (
                    <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                      Une erreur est survenue lors de l'envoi. Merci de réessayer
                      ou de nous appeler directement au {PHONE_DISPLAY}.
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading" || !prestation}
                    className="w-full gap-2 text-base font-semibold shadow-lg shadow-primary/25"
                  >
                    {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande de devis"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Gratuit et sans engagement. Vos coordonnées servent
                    uniquement à vous recontacter.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-forest py-14 text-forest-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid size-10 place-items-center rounded-xl bg-primary-glow/15 text-primary-glow">
                  <Leaf className="size-5" />
                </span>
                <div>
                  <p className="font-display font-bold leading-tight">
                    Ent Dufresne Services
                  </p>
                  <p className="text-xs text-forest-foreground/70">
                    Espaces Verts · Paysagiste Saône-et-Loire
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-forest-foreground/75">
                Paysagiste, élagage et abattage d'arbre 71, entretien d'espaces
                verts et démoussage de toiture à Lux et Chalon-sur-Saône.
              </p>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-primary-glow">
                Coordonnées
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-forest-foreground/80">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary-glow" />
                  Impasse du Bourria, 71100 Lux
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary-glow" />
                  <a href={PHONE_TEL} className="hover:text-primary-glow">
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 size-4 shrink-0 text-primary-glow" />
                  Ouvert jusqu'à 19h
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-primary-glow">
                Nos prestations
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-forest-foreground/80">
                <li>
                  <a href="#prestations" className="hover:text-primary-glow">
                    Élagage &amp; abattage d'arbres
                  </a>
                </li>
                <li>
                  <a href="#prestations" className="hover:text-primary-glow">
                    Entretien d'espaces verts
                  </a>
                </li>
                <li>
                  <a href="#prestations" className="hover:text-primary-glow">
                    Démoussage de toiture
                  </a>
                </li>
                <li>
                  <a href="#devis" className="hover:text-primary-glow">
                    Devis gratuit
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <p className="text-xs leading-relaxed text-forest-foreground/60">
              © {new Date().getFullYear()} Ent Dufresne Services Espaces Verts —
              Paysagiste à Lux (71100), élagage Chalon-sur-Saône, jardinier
              Saône-et-Loire. Entreprise assurée en responsabilité civile
              professionnelle. Mentions légales disponibles sur simple demande.
            </p>
          </div>
        </div>
      </footer>

      {/* ===== Barre d'appel mobile ===== */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur sm:hidden">
        <a href={PHONE_TEL} className="block">
          <Button size="lg" className="w-full gap-2 text-base font-semibold">
            <Phone className="size-5" />
            Appeler le {PHONE_DISPLAY}
          </Button>
        </a>
      </div>
      <div className="h-20 sm:hidden" aria-hidden />
    </div>
  );
}

export default LandingPage;
