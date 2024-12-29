import { z } from "zod";

export const templateSchema = z.object({
  name: z.string().min(1, "Template name must be at least 1 character long"),
  path: z.string().min(1, "Template path must be at least 1 character long"),
  lang: z
    .string()
    .min(1, "Template language must be at least 1 character long"),
});

export const versionSchema = z.object({
  name: z.string().min(1, "Version name must be at least 1 character long"),
  templates: z.array(templateSchema),
});

export const packageManagerSchema = z.object({
  name: z
    .string()
    .min(1, "Package manager name must be at least 1 character long"),
  commands: z.array(
    z.object({
      name: z.string().min(1, "Command name must be at least 1 character long"),
      command: z.string().min(1, "Command must be at least 1 character long"),
    }),
  ),
});

export const templateConfigSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character long"),
  description: z.string(),
  versions: z.array(versionSchema),
  packageManagers: z.array(packageManagerSchema),
});
