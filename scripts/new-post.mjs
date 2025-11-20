#!/usr/bin/env node

// Simple script to generate a new blog post Markdown file in src/content/blog.
// Usage:
//   npm run new:post "My New Post"
//   or: bash newpost "My New Post"
//
// This will create: src/content/blog/2025-11-19-my-new-post.md
// with frontmatter that makes it show up on the homepage immediately.
// The date prefix helps sort files chronologically in your editor.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read the title from the command line (or use default)
const [, , ...args] = process.argv;

// If no title provided, use a default with timestamp
let title;
if (args.length === 0) {
	const now = new Date();
	const timestamp = now.toLocaleTimeString('en-US', { 
		hour: '2-digit', 
		minute: '2-digit',
		hour12: false 
	}).replace(':', '');
	title = `New Post ${timestamp}`;
	console.log(`📝 No title provided, using default: "${title}"`);
	console.log('   (You can provide a title like: bash newpost "My Title")');
	console.log('');
} else {
	title = args.join(' ').trim();
}

// 2. Build a slug from the title (lowercase, hyphens, no special chars)
const slug = title
	.toLowerCase()
	.replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric characters
	.trim()
	.replace(/\s+/g, '-'); // spaces -> hyphens

if (!slug) {
	console.error('Could not generate a valid slug from that title.');
	process.exit(1);
}

// 3. Format today's date for the filename (YYYY-MM-DD)
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const datePrefix = `${year}-${month}-${day}`;

// 4. Build the target file path with date prefix
const rootDir = path.resolve(__dirname, '..');
const blogDir = path.join(rootDir, 'src', 'content', 'blog');
const filename = `${datePrefix}-${slug}.md`;
const filePath = path.join(blogDir, filename);

// 5. Avoid overwriting an existing post
if (fs.existsSync(filePath)) {
	console.error(`A post with this slug already exists: ${filePath}`);
	process.exit(1);
}

// 6. Format today's date for pubDate like 'Nov 19 2025'
const formatter = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	day: '2-digit',
	year: 'numeric',
});
const pubDate = formatter.format(now).replace(',', '');

// 7. Build the Markdown frontmatter and starter content
const content = `---
title: '${title}'
description: 'Short one-line summary of what this post is about.'
pubDate: '${pubDate}'
draft: false
---

Write your post content here in Markdown.
`;

// 8. Ensure the blog directory exists, then write the file
fs.mkdirSync(blogDir, { recursive: true });
fs.writeFileSync(filePath, content, 'utf8');

console.log(`✅ New blog post created: ${filename}`);
console.log(`📂 Location: ${filePath}`);
console.log(`🌐 URL will be: /blog/${slug}/`);
console.log('');
console.log('The post will appear on the homepage and /blog because draft is set to false.');
console.log('The date prefix in the filename helps sort your posts chronologically in your editor!');
