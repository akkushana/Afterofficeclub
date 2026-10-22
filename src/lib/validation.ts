import { z } from "zod";

export const contributionSchema = z.object({
  kind: z.enum(["topic", "experience", "nomination", "correction"]),
  name: z.string().trim().min(1, "Please add a name or preferred label.").max(80),
  message: z.string().trim().min(10, "Please add a little more detail.").max(2000),
  consent: z.literal(true, { error: "Please confirm the consent information." }),
  honeypot: z.string().max(0).optional(),
});

export type ContributionInput = z.infer<typeof contributionSchema>;
