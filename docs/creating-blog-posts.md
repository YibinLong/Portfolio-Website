## How to create a new blog post

This project uses Astro's content collections.  
In simple terms: **every `.md` or `.mdx` file in `src/content/blog` becomes a blog post**.

The homepage and `/blog` page automatically read from that folder, sort posts by date, and hide drafts.

**File naming convention:**  
Files are named with a date prefix: `YYYY-MM-DD-post-title.md` (e.g., `2025-11-19-my-post.md`)
- This keeps files sorted chronologically in your editor (newest at bottom, oldest at top)
- The date prefix is **automatically stripped from URLs**, so `2025-11-19-my-post.md` becomes `/blog/my-post/`

---

### 1. Quick start (recommended)

The easiest way to create a new post is with the `newpost` command:

```bash
bash newpost "My New Post Title"
```

Or if you just want to start writing quickly without thinking of a title:

```bash
bash newpost
```

This will use a default title like "New Post 1602" (with the current time), which you can change later.

The command automatically:
- Creates a file with today's date prefix: `2025-11-19-my-new-post-title.md`
- Fills in frontmatter with title, pubDate, etc.
- Sets `draft: false` so it immediately appears on your site
- Shows you the URL where it will be available

Then just:
1. Open the new file in `src/content/blog`
2. Update the `title` and `description` 
3. Write your content

---

### 2. Manually create a new post

**Step 1 – Create a new file in the blog folder**

- Go to `src/content/blog`.
- Create a new file with the format: `YYYY-MM-DD-title.md`
  - Example: `2025-11-19-my-new-post.md`
- The date prefix helps sort files chronologically in your editor
- The URL will automatically strip the date: `2025-11-19-my-new-post.md` → `/blog/my-new-post/`

**Step 2 – Add frontmatter at the top**

Copy this template into your new file:

```markdown
---
title: 'My New Post'
description: 'Short one-line summary of what this post is about.'
pubDate: 'Nov 19 2025'
draft: false
---

Write your post content here in Markdown.
```

**What each field does:**

- **`title`**: Shown as the post's title in the UI.
- **`description`**: Short summary; useful for SEO and lists.
- **`pubDate`**: Date used to sort posts (newest first).
- **`draft`**:
  - `false` → post is **public** and shows on the homepage and `/blog`.
  - `true` → post is a **draft**, hidden from the lists.

Anything after the `---` block is your actual content, written in normal Markdown.

---

### 3. How the homepage "Recent Posts" works

On the homepage (`src/pages/index.astro`), Astro runs this code:

```ts
const posts = (await getCollection('blog'))
  .filter((post) => !post.data.draft)
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 5);
```

In plain language:

- **`getCollection('blog')`**: Load all posts from `src/content/blog`.
- **`.filter((post) => !post.data.draft)`**: Keep only posts that are **not** drafts.
- **`.sort(...)`**: Order posts so **newest `pubDate` comes first**.
- **`.slice(0, 5)`**: Show only the **5 most recent** posts.

So, to make sure your new post appears under **“Recent Posts”**:

1. Put the `.md` file in `src/content/blog` with the date prefix format: `YYYY-MM-DD-title.md`
2. Do **not** set `draft: true` (either remove the line or set `draft: false`).
3. Give it a `pubDate` that is recent enough to be in the newest 5 posts.

You do **not** need to touch any Astro components or TypeScript files for it to show up.

---

### 4. How the generator script works

The generator script (`scripts/new-post.mjs`) is a small Node program that:

1. **Reads the title** from the command line.
2. **Builds a slug**:
   - Lowercase
   - Replace spaces with `-`
   - Remove characters that are not letters, numbers, or hyphens.
3. **Adds today's date prefix** in `YYYY-MM-DD` format.
4. **Builds a file path** inside `src/content/blog` using the date prefix and slug.
5. **Formats today's date** for `pubDate` in the style `Nov 19 2025`.
6. **Writes a new `.md` file** with ready-to-edit frontmatter and placeholder content.

You don't need to understand every line of the script to use it:  
just remember `bash newpost "Your Title"` creates a new, visible blog post with automatic date sorting!

