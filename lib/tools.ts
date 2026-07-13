import { tool } from 'ai';
import { z } from 'zod';
import {
  getProductRecommendations,
  getColorOptions,
  getInspirationProjects,
} from './products';

export const hardieTools = {
  recommendProducts: tool({
    description:
      "Recommend specific One Hardie products based on the user's project preferences. Call this once you know at least one product category and a style or budget preference. Returns product cards rendered inline in the chat.",
    parameters: z.object({
      categories: z
        .array(
          z.enum(['siding', 'trim', 'decking', 'railing', 'lighting', 'pergola']),
        )
        .min(1)
        .describe('Product categories to include in the recommendation'),
      homeStyle: z
        .enum([
          'traditional',
          'craftsman',
          'modern',
          'farmhouse',
          'coastal',
          'contemporary',
          'colonial',
          'industrial',
        ])
        .optional()
        .describe("User's home architectural style"),
      budgetTier: z
        .enum(['moderate', 'premium', 'luxury'])
        .optional()
        .describe(
          'moderate = good value, premium = high-performance, luxury = best-of-best',
        ),
      colorFamily: z
        .enum(['light', 'dark', 'warm', 'cool', 'neutral', 'bold'])
        .optional()
        .describe('Color preference family'),
      region: z
        .enum([
          'northeast',
          'southeast',
          'midwest',
          'southwest',
          'pacific',
          'mountain',
          'all',
        ])
        .optional()
        .describe('Geographic region for climate-appropriate recommendations'),
      projectType: z
        .enum(['new-build', 'full-renovation', 'partial-update', 'addition'])
        .optional(),
    }),
    execute: async (params) => getProductRecommendations(params),
  }),

  getColorOptions: tool({
    description:
      'Return color swatches and options for a specific product line. Use when the user asks about colors, wants to coordinate two products, or mentions a color they love.',
    parameters: z.object({
      brand: z.enum(['hardie', 'azek', 'timbertech', 'struxure']),
      productLine: z
        .string()
        .describe('Product line name, e.g. "HardiePlank" or "AZEK Deck"'),
      coordinateWith: z
        .string()
        .optional()
        .describe('Another product or color to coordinate with'),
    }),
    execute: async (params) => getColorOptions(params),
  }),

  getInspirationProjects: tool({
    description:
      'Return real-world inspiration project examples filtered by style or region. Use when users say "show me examples," "I\'m not sure what style," or "what would that look like."',
    parameters: z.object({
      style: z
        .string()
        .optional()
        .describe(
          'Architectural style: coastal, farmhouse, modern, craftsman, etc.',
        ),
      products: z
        .array(z.string())
        .optional()
        .describe('Product IDs to filter projects that feature those products'),
      region: z
        .string()
        .optional()
        .describe(
          'Region: northeast, southeast, midwest, southwest, pacific, mountain',
        ),
    }),
    execute: async (params) => getInspirationProjects(params),
  }),
};
