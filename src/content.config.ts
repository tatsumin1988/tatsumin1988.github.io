import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover_image: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    problem: z.string(),
    solution: z.string(),
    project_type: z.enum(["case_study", "concept_demo"]).default("case_study"),
    tech_stack: z.array(z.string()).default([]),
    status: z.enum(["公開中", "社内利用", "試作", "改善継続中"]),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url()
        })
      )
      .default([]),
    demo_url: z.string().url().optional(),
    proof_points: z.array(z.string()).default([]),
    audience: z.string().optional(),
    disclaimer: z.string().optional(),
    cover_image: z.string().optional(),
    showcase_image: z.string().optional(),
    showcase_caption: z.string().optional(),
    evidence_metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          note: z.string().optional()
        })
      )
      .default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog, projects };
