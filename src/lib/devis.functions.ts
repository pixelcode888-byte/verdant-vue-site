import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const devisSchema = z.object({
  nom: z.string().trim().min(2, "Nom trop court").max(100),
  telephone: z
    .string()
    .trim()
    .regex(/^[+0-9 ().-]{8,20}$/, "Numéro de téléphone invalide"),
  ville: z.string().trim().min(2, "Ville trop courte").max(100),
  prestation: z.enum([
    "Élagage & abattage",
    "Entretien d'espaces verts",
    "Démoussage de toiture",
    "Autre demande",
  ]),
  message: z.string().trim().max(1500).optional(),
});

export type DevisInput = z.infer<typeof devisSchema>;

export const submitDevis = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => devisSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { error } = await supabaseAdmin
      .from("devis_requests")
      .insert({
        nom: data.nom,
        telephone: data.telephone,
        ville: data.ville,
        prestation: data.prestation,
        message: data.message || null,
      });

    if (error) {
      throw new Error("Enregistrement impossible : " + error.message);
    }

    return { ok: true as const };
  });
