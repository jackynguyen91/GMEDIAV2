import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const POSTS_PER_PAGE = 9;

function buildPostQuery({ category, q }) {
  const query = { is_published: true };
  if (category) query.category = category;
  const term = (q ?? "").trim();
  if (term) {
    query.$or = [
      { title: { $regex: term, $options: "i" } },
      { excerpt: { $regex: term, $options: "i" } },
    ];
  }
  return query;
}

export const listPublishedPosts = createServerFn({ method: "GET" })
  .validator(
    z.object({
      page: z.number().int().min(1).optional(),
      category: z.string().max(80).optional(),
      q: z.string().max(120).optional(),
    })
  )
  .handler(async ({ data, context }) => {
    const sdk = context.getBase44();
    const page = data.page ?? 1;
    const query = buildPostQuery(data);

    const [result, total, categoryRows] = await Promise.all([
      sdk.entities.BlogPost.filter(query, {
        sort: "-published_at",
        limit: POSTS_PER_PAGE,
        skip: (page - 1) * POSTS_PER_PAGE,
      }),
      sdk.entities.BlogPost.count(query),
      sdk.entities.BlogPost.aggregate({
        query: { is_published: true },
        groupBy: "category",
      }),
    ]);

    return {
      items: result?.items ?? [],
      total: total ?? 0,
      page,
      totalPages: Math.max(1, Math.ceil((total ?? 0) / POSTS_PER_PAGE)),
      categories: (categoryRows?.rows ?? [])
        .filter((row) => row.category)
        .map((row) => ({ name: row.category, count: row.count }))
        .sort((a, b) => a.name.localeCompare(b.name, "vi")),
    };
  });

export const getPublishedPost = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1).max(200) }))
  .handler(async ({ data, context }) => {
    const page = await context
      .getBase44()
      .entities.BlogPost.filter(
        { slug: data.slug, is_published: true },
        { limit: 1 }
      );

    return page?.items?.[0] ?? null;
  });

export const listRelatedPosts = createServerFn({ method: "GET" })
  .validator(
    z.object({
      slug: z.string().min(1).max(200),
      category: z.string().max(80).optional(),
    })
  )
  .handler(async ({ data, context }) => {
    const query = { is_published: true, slug: { $ne: data.slug } };
    if (data.category) query.category = data.category;

    const page = await context
      .getBase44()
      .entities.BlogPost.filter(query, {
        sort: "-published_at",
        limit: 3,
      });

    return page?.items ?? [];
  });

export const listProjects = createServerFn({ method: "GET" })
  .validator(z.object({ category: z.string().max(80).optional() }))
  .handler(async ({ data, context }) => {
    const sdk = context.getBase44();
    const query = data.category ? { category: data.category } : {};

    const [result, categoryRows] = await Promise.all([
      sdk.entities.Project.filter(query, { sort: "sort_order", limit: 100 }),
      sdk.entities.Project.aggregate({ query: {}, groupBy: "category" }),
    ]);

    return {
      items: result?.items ?? [],
      categories: (categoryRows?.rows ?? [])
        .filter((row) => row.category)
        .map((row) => row.category)
        .sort((a, b) => a.localeCompare(b, "vi")),
    };
  });

export const listFeaturedProjects = createServerFn({ method: "GET" }).handler(
  async ({ context }) => {
    const page = await context
      .getBase44()
      .entities.Project.filter(
        { is_featured: true },
        { sort: "sort_order", limit: 6 }
      );

    return page?.items ?? [];
  }
);