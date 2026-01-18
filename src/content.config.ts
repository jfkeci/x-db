import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const exercises = defineCollection({
	loader: glob({ base: './src/content/exercises', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			description: z.string(),
			category: z.enum(['Strength', 'Cardio', 'Core', 'Flexibility', 'Compound']),
			muscleGroups: z.array(z.string()),
			difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
			equipment: z.array(z.string()).optional(),
			image: image().optional(),
		}),
});

export const collections = { blog, exercises };
