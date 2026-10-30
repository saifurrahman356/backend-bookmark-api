export interface Bookmark {
  id: number;
  url: string;
  title: string;
  tag?: string;
}

export type UpdateBookmark = Omit<Partial<Bookmark>, "id">;

export let bookmarks: Bookmark[] = [
  { id: 1, url: "https://expressjs.com", title: "Express.js", tag: "node" },
  {
    id: 2,
    url: "https://typescriptlang.org",
    title: "TypeScript",
    tag: "typescript",
  },
  { id: 3, url: "https://developer.mozilla.org", title: "MDN Web Docs" },
];

export function isBookmark(value: unknown): value is Bookmark {
  console.log(value);
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const bookmark = value as Record<string, unknown>;

  console.log(bookmark);

  return (
    typeof bookmark.id === "number" &&
    typeof bookmark.url === "string" &&
    typeof bookmark.title === "string" &&
    (bookmark.tag === undefined || typeof bookmark.tag === "string")
  );
}

export function isUpdateBookmark(value: unknown): value is UpdateBookmark {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const update = value as Record<string, unknown>;

  const allowedKeys = ["url", "title", "tag"];

  return (
    Object.keys(update).length > 0 &&
    Object.keys(update).every((key) => allowedKeys.includes(key)) &&
    (update.url === undefined || typeof update.url === "string") &&
    (update.title === undefined || typeof update.title === "string") &&
    (update.tag === undefined || typeof update.tag === "string")
  );
}
