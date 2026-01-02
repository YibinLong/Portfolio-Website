---
title: 'How Claude Skills and Plugins Work'
description: 'A deep dive into Claude Skills and Plugins: the building blocks and distribution system that make Claude Code infinitely extensible'
pubDate: 'Jan 01 2026'
draft: false
---

If you've been using Claude Code (or any AI coding assistant) for a while, you've probably noticed something: you end up repeating the same instructions over and over again. "Follow our coding standards." "Use this specific architecture pattern." "Make sure to include error handling."

What if Claude could just _know_ your standards and best practices without you having to explain them every single time? And what if you could share your entire Claude Code setup with teammates in a single command?

That's exactly what Skills and Plugins solve—and understanding the difference between them is key to using Claude Code effectively.

## What Are Claude Skills?

At their core, Skills are simple: they're markdown files that teach Claude how to do specific things consistently and expertly. Think of them as specialized instruction packages that bundle together guidelines, examples, and reference materials for particular workflows or domains.

But here's the clever part: **progressive disclosure**.

Unlike other AI features that load everything into memory at once (bloating your context window), Skills use a smart three-step activation:

1. **Startup**: Claude loads only the _name_ and _description_ of each available Skill
2. **Discovery**: When your request matches a Skill's description, Claude recognizes it's relevant
3. **Activation**: The full Skill content loads into context only when actually needed

This design means you can have dozens of Skills available without any performance impact until you actually need them.

## Why Should You Care?

I've been using AI to code for a while now, and Skills have genuinely changed how I work. Here's why they matter:

**1. They eliminate repetitive instruction**

Before Skills, every new Claude Code session meant re-explaining your team's code review standards, documentation format, or testing requirements. Now? Those instructions are always available when needed, automatically.

**2. They scale expertise across teams**

Senior engineers can encode their knowledge into Skills that the entire team benefits from. Your best practices become portable, versionable, and consistent.

**3. They work automatically**

You don't invoke Skills with special commands. Just ask Claude a question that matches a Skill's domain, and Claude will suggest using it. It's model-invoked, meaning Claude decides when Skills are relevant.

## How to Create a Skill

Creating a Skill is surprisingly straightforward. I'll walk you through it.

### Step 1: Create the Directory Structure

Create a folder in one of these locations:
- `~/.claude/skills/skill-name/` (Personal - available across all your projects)
- `.claude/skills/skill-name/` (Project - shared with your team via git)
- Admin-managed (Enterprise - organization-wide)

### Step 2: Write SKILL.md

Every Skill needs a `SKILL.md` file with YAML frontmatter:

```markdown
---
name: code-review-standards
description: Reviews code against team standards for security, performance, and maintainability
---

## Code Review Checklist

When reviewing code, check for:

1. **Security**: No exposed secrets, proper input validation
2. **Performance**: Efficient algorithms, no unnecessary loops
3. **Maintainability**: Clear naming, proper comments
4. **Testing**: Adequate test coverage

...your detailed instructions here...
```

The **name** identifies your Skill (lowercase, max 64 characters).

The **description** is crucial—it determines when Claude will activate this Skill. Be specific and include keywords users will actually search for.

### Step 3: Add Supporting Files (Optional)

You can organize supporting materials in your Skill directory:

```
code-review-standards/
├── SKILL.md
├── references/
│   ├── security-checklist.md
│   ├── performance-guidelines.md
│   └── style-guide.md
├── scripts/
│   └── lint-validator.sh
└── examples/
    └── good-review-examples.md
```

Claude will load these files contextually when needed, keeping your main SKILL.md concise.

### Step 4: Activate It

Restart Claude Code, and your Skill is ready. Next time you ask Claude to review code, it'll recognize your Skill applies and ask permission to use it.

## Real-World Examples

Let me share some Skills I've found genuinely useful:

### Brand Compliance Skill

```
brand-compliance/
├── SKILL.md (instructions for consistent branding)
├── references/
│   ├── brand-guidelines.md
│   ├── color-palette.md
│   └── approved-fonts.md
└── assets/
    ├── logo.svg
    └── templates/
```

Whenever you ask Claude to create marketing materials, presentations, or documentation, this Skill ensures everything follows your brand standards. No more inconsistent colors or off-brand designs.

### Testing Standards Skill

```
testing-standards/
├── SKILL.md (testing methodology and requirements)
├── references/
│   ├── test-naming-conventions.md
│   └── coverage-requirements.md
└── examples/
    └── sample-tests.md
```

This one activates when you ask Claude to write tests, ensuring consistent test structure, proper naming, and adequate coverage across your codebase.

### API Documentation Skill

```
api-docs/
├── SKILL.md (documentation standards)
├── references/
│   ├── api-documentation-template.md
│   └── terminology-guide.md
└── examples/
    └── documented-endpoints.md
```

Maintains consistent API documentation format, including proper parameter descriptions, error codes, and example requests/responses.

## Best Practices I've Learned

After creating several Skills, here's what actually works:

**1. Keep SKILL.md under 500 lines**

The full instructions should be concise. Use reference files for detailed information. I aim for clarity over comprehensiveness in the main file.

**2. Write laser-focused descriptions**

Bad: "Helps with documents"
Good: "Generates Excel spreadsheets with formulas, formatting, and data validation"

The description determines activation, so precision matters.

**3. Use tool restrictions for safety**

```yaml
---
name: read-only-analyzer
allowed-tools: Read, Grep, Glob
---
```

This restricts the Skill to read-only operations, preventing accidental modifications during analysis tasks.

**4. Include examples liberally**

Claude learns from examples as much as from instructions. Show before/after code, sample outputs, and common patterns.

**5. Test activation thoroughly**

Use multiple phrasings users might actually say. If your Skill doesn't trigger when you expect, refine the description.

## When to Use Skills vs. Other Features

Before we dive into Plugins, let me clarify when to use Skills versus other Claude Code features:

**Use Skills for:**
- Standards and best practices that should activate automatically
- Domain-specific knowledge (branding, technical conventions)
- Repeatable workflows with consistent requirements

**Use slash commands for:**
- Explicit workflows you invoke intentionally with `/command`
- Multi-step processes that need specific flags or parameters

**Use CLAUDE.md for:**
- Project-wide rules that should _always_ be loaded
- General codebase documentation and context

**Use subagents for:**
- Isolated contexts with restricted tool access
- Parallel processing of independent tasks

We'll cover how Plugins fit into this picture after we explore what they are.

## Common Pitfalls to Avoid

**Skill not triggering?**

The description needs to match what users actually say. I've found testing with multiple phrasings helps. If Claude isn't suggesting your Skill, the description is probably too generic.

**Context issues?**

Your SKILL.md is likely too long. Break detailed content into reference files and let progressive disclosure do its job.

**File loading problems?**

Filename must be exactly `SKILL.md` (case-sensitive). Verify your directory structure matches the expected format. And no tab characters in YAML—use spaces only.

---

## Enter Plugins: The Distribution Layer

Now here's where it gets interesting. Skills are powerful for individual use, but what if you want to share a complete Claude Code setup with your team? What if you want to bundle Skills together with custom commands, specialized agents, and automation hooks?

That's where **Plugins** come in.

## What Are Claude Plugins?

If Skills are the building blocks, Plugins are the boxes you ship them in.

Plugins are **distributable bundles** that package together multiple Claude Code customizations:
- **Skills** (auto-invoked capabilities we just covered)
- **Slash commands** (custom `/command` shortcuts)
- **Subagents** (specialized AI agents for specific tasks)
- **Hooks** (event handlers that react to lifecycle events)
- **MCP servers** (external tool integrations)

The key insight: **Plugins are Claude Code-specific, while Skills work everywhere** (Claude web, API, and Claude Code).

### The Relationship Between Skills and Plugins

This confused me at first, so let me clarify:

| Aspect | Skills | Plugins |
|--------|--------|---------|
| **Scope** | Universal - works across all Claude products | Claude Code only |
| **Purpose** | Auto-triggered context providers | Distribution containers |
| **Contains** | Single capability | Skills + Commands + Agents + Hooks |
| **Activation** | Model-invoked (Claude decides) | User installs/enables |
| **Distribution** | Manual copying or git | Single command install |

Think of it this way: **Skills can exist independently, but Plugins bundle Skills (and other components) for easy distribution.**

A plugin can include zero Skills, one Skill, or many Skills—along with other components. Skills work standalone; Plugins are packages.

## Why Plugins Matter

Plugins solve the **distribution and coordination problem**.

Without plugins, sharing your Claude Code setup means:
- Sending teammates markdown files to copy manually
- Explaining where to put each file
- Keeping everything in sync across updates
- Managing dependencies between components

With plugins:
```bash
/plugin install team-standards
```

Done. Your entire team setup—Skills, commands, hooks, everything—installed and ready.

### Real-World Plugin Use Cases

**1. Team Engineering Standards Plugin**
```
engineering-standards/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── code-review/
│   ├── testing-standards/
│   └── security-guidelines/
├── commands/
│   └── review-pr.md
└── hooks/
    └── hooks.json
```

This plugin bundles all your team's standards into one installable package. New engineers run one command and immediately have access to all team conventions.

**2. Library Support Plugin**

If you maintain an open-source library, you can provide a plugin that helps users work with your API:
```
my-library-helper/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── api-patterns/
├── commands/
│   ├── scaffold-integration.md
│   └── generate-types.md
└── README.md
```

Users install your plugin and Claude instantly knows your API patterns, best practices, and common integration approaches.

**3. Code Review Plugin**

Anthropic provides an official code review plugin that runs 5 parallel Sonnet agents analyzing:
- Compliance with standards
- Bug detection
- Git history context
- Pull request context
- Existing code comments

This is way more than a single Skill could handle—it's a complete workflow bundled together.

## Creating a Plugin

The structure is straightforward:

### Step 1: Create the Directory

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── skills/ (optional)
├── commands/ (optional)
├── agents/ (optional)
├── hooks/ (optional)
├── .mcp.json (optional)
└── README.md
```

### Step 2: Write plugin.json

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Brief description of what this plugin does",
  "author": "Your Name"
}
```

Only this file goes inside `.claude-plugin/`. Everything else goes at the plugin root.

### Step 3: Add Components

**Add Skills** (we covered this earlier):
```
skills/
└── my-skill/
    └── SKILL.md
```

**Add Commands** (custom slash commands):
```markdown
---
name: review-code
description: Comprehensive code review following team standards
---

When this command is invoked, perform a thorough code review:

1. Check for security vulnerabilities
2. Verify performance patterns
3. Ensure test coverage
4. Validate documentation

...detailed step-by-step instructions...
```

**Add Agents** (specialized subagents):
```markdown
---
name: security-analyzer
description: Specialized agent for security analysis
---

You are a security expert. When analyzing code, focus on:
- Authentication and authorization
- Input validation
- Dependency vulnerabilities
- Secure data handling
```

### Step 4: Publish and Share

Push to GitHub and anyone can install with:
```bash
/plugin install username/my-plugin
```

Or add to a marketplace:
```bash
/plugin marketplace add username/plugin-registry
/plugin install my-plugin
```

## Skills vs Plugins: When to Use Each

This is the question I get most often. Here's my decision framework:

### Use a Skill when:
- **You want automatic, context-aware behavior** across all Claude products
- **One specific capability** needs to trigger based on user requests
- **The knowledge should always be available** (like coding standards)
- **You're working solo** and don't need distribution complexity

**Example**: A Skill that provides your company's API documentation style guide, automatically activated when Claude detects you're writing API docs.

### Use a Plugin when:
- **You're distributing to a team or community**
- **You need multiple components** (Skills + Commands + Hooks) working together
- **You want users to toggle functionality** on/off per project
- **You're creating a complete workflow** (like feature development or code review)
- **It's Claude Code-specific** functionality

**Example**: A complete DevOps plugin with deployment commands, infrastructure Skills, testing agents, and pre-commit hooks—all bundled for easy team distribution.

### Use Both when:
You can absolutely combine them! Create Skills for universal knowledge (works everywhere), then bundle them in a Plugin for easy Claude Code distribution along with commands and hooks.

## Plugin Best Practices

After building several plugins, here's what works:

**1. Keep agents concise (300-400 lines)**

Don't try to make one agent comprehensive. Use multiple focused agents instead. They're easier to maintain and more reliable.

**2. Write commands like teaching a junior dev**

Your command instructions should be step-by-step, clear, and include validation rules. Claude follows them literally.

**3. Design for toggling**

Users should be able to enable/disable your plugin per project. Don't make it all-or-nothing. Respect context window constraints.

**4. Include comprehensive README**

Document what each component does, when to use the plugin, and any setup required. Future you (and your users) will appreciate it.

**5. Use "WHEN + WHEN NOT" in Skill descriptions**

Be explicit about when Skills should activate to prevent false positives:
```yaml
description: "Use when writing unit tests for React components. DO NOT use for integration tests or E2E tests."
```

## Exploring Community Plugins

The ecosystem is growing fast. Here are some ways to discover plugins:

**Official Anthropic plugins:**
```bash
/plugin marketplace add anthropics/claude-code
```

Includes code review, security review, and feature development plugins.

**Community marketplaces:**

Browse <a href="https://claude-plugins.dev/" target="_blank" rel="noopener noreferrer">claude-plugins.dev</a> for community-created plugins, or check out developer blogs showcasing their custom plugins.

**Check installed plugins:**
```bash
/plugins
```

This shows what's currently installed and enabled.

## Why This Matters for AI Development

We're still early in the AI coding era. Every developer is figuring out their optimal workflow, and there's no single "right" way yet.

But Skills and Plugins represent something important: **systematic knowledge capture and distribution**. Instead of your best practices living in your head (or scattered across Slack messages), they become portable, versionable, and consistently applied.

I think about Peter Naur's theory: programming is building a theory of how the world should work through code. Skills let you encode that theory in a way that AI can understand and apply. Plugins let you share that theory with your entire team.

As someone who uses AI reflexively in my development work, both have become essential:
- **Skills** ensure every Claude session starts with my accumulated knowledge and standards
- **Plugins** let me distribute complete workflows to teammates and discover capabilities from the community

The combination is powerful. Skills solve the repetition problem. Plugins solve the distribution problem. Together, they make Claude Code infinitely extensible.

## Getting Started

Want to dive deeper? Here's my recommended path:

**Start with Skills:**
1. Pick one repetitive instruction you give Claude regularly
2. Create a simple Skill for it
3. Test and refine until it triggers reliably
4. Build 2-3 more Skills for your common workflows

**Then explore Plugins:**
1. Install official Anthropic plugins: `/plugin marketplace add anthropics/claude-code`
2. Browse community plugins at <a href="https://claude-plugins.dev/" target="_blank" rel="noopener noreferrer">claude-plugins.dev</a>
3. When you have 3+ Skills that work together, bundle them into your first plugin
4. Share with your team or publish to the community

**Resources I found helpful:**

*Skills:*
- <a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener noreferrer">Claude Code Skills Documentation</a>
- <a href="https://github.com/anthropics/skills" target="_blank" rel="noopener noreferrer">Anthropic Skills Repository</a> (example Skills to learn from)
- <a href="https://support.claude.com/en/articles/12512198-how-to-create-custom-skills" target="_blank" rel="noopener noreferrer">How to Create Custom Skills</a>

*Plugins:*
- <a href="https://code.claude.com/docs/en/plugins" target="_blank" rel="noopener noreferrer">Claude Code Plugins Documentation</a>
- <a href="https://github.com/anthropics/claude-code/tree/main/plugins" target="_blank" rel="noopener noreferrer">Official Plugins Repository</a>
- <a href="https://claude-plugins.dev/" target="_blank" rel="noopener noreferrer">Community Plugin Marketplace</a>

Start simple. One Skill. One plugin install. Iterate from there. Your future self (and your team) will thank you.
