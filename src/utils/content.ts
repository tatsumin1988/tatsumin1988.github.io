import { getCollection, type CollectionEntry } from "astro:content";
import { compareDateDesc } from "./dates";

export type BlogEntry = CollectionEntry<"blog">;
export type ProjectEntry = CollectionEntry<"projects">;

function countSharedTerms(left: string[], right: string[]) {
  const normalized = new Set(right.map((term) => term.toLowerCase()));
  return left.reduce(
    (score, term) => score + (normalized.has(term.toLowerCase()) ? 1 : 0),
    0
  );
}

export async function getPublishedBlogPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((left, right) => compareDateDesc(left.data.date, right.data.date));
}

export async function getPublishedProjects() {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  return projects.sort((left, right) => {
    if (left.data.featured !== right.data.featured) {
      return left.data.featured ? -1 : 1;
    }

    return left.data.title.localeCompare(right.data.title, "ja-JP");
  });
}

export function getRelatedBlogPosts(posts: BlogEntry[], current: BlogEntry, limit = 3) {
  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => ({
      post,
      sharedTags: countSharedTerms(post.data.tags, current.data.tags)
    }))
    .sort((left, right) => {
      if (left.sharedTags !== right.sharedTags) {
        return right.sharedTags - left.sharedTags;
      }

      return compareDateDesc(left.post.data.date, right.post.data.date);
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getRelatedProjects(projects: ProjectEntry[], current: ProjectEntry, limit = 3) {
  return projects
    .filter((project) => project.id !== current.id)
    .map((project) => ({
      project,
      sharedStacks: countSharedTerms(project.data.tech_stack, current.data.tech_stack)
    }))
    .sort((left, right) => {
      if (left.sharedStacks !== right.sharedStacks) {
        return right.sharedStacks - left.sharedStacks;
      }

      if (left.project.data.featured !== right.project.data.featured) {
        return left.project.data.featured ? -1 : 1;
      }

      return left.project.data.title.localeCompare(right.project.data.title, "ja-JP");
    })
    .slice(0, limit)
    .map(({ project }) => project);
}

export function collectBlogTags(posts: BlogEntry[]) {
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((left, right) => {
      if (left.count !== right.count) {
        return right.count - left.count;
      }

      return left.tag.localeCompare(right.tag, "ja-JP");
    });
}

export function collectProjectTechStacks(projects: ProjectEntry[]) {
  const counts = new Map<string, number>();

  for (const project of projects) {
    for (const tech of project.data.tech_stack) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tech, count]) => ({ tech, count }))
    .sort((left, right) => {
      if (left.count !== right.count) {
        return right.count - left.count;
      }

      return left.tech.localeCompare(right.tech, "ja-JP");
    });
}