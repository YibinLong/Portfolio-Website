---
title: 'My AI Methodology'
description: 'My AI Methodology'
pubDate: 'Nov 19 2025'
draft: false
---

This post shows my exact workflow:
1. **Requirements PDF** → Understand what to build
2. **Frontend Design** → Visualize the UI
3. **Tech Stack** → Choose the tools
4. **Master Prompt** → Set up AI context
5. **PRD** → Define the product
6. **TASK_LIST.md** → Break down the work
7. **Epics Loop** → Build iteratively

## 1. Start With the Requirements PDF
Every project begins with a requirements document, usually a `requirements.pdf`.

Workflow:
1. Convert the PDF into Markdown → `requirements.md`.
2. This creates clean, structured text your AI tools can understand.
3. `requirements.md` becomes the foundation for prompt engineering, PRDs, and planning.

## 2. Talk with an LLM to clarify Requirements.
Talk with ChatGPT to ask questions about the requirements. Make sure that I actually understand what is being asked of me. I'll do research here about what competitors do, and what the best practices are to implement my project are.

## 3. Turn Requirements Into a Frontend Using V0
Import `requirements.md` into **v0.dev**.

Generate:
- A modern, clean, startup-quality UI.
- Components that match your project's needs (dashboards, forms, real-time views, charts, docs, etc.).
- A design that looks professional enough for production.

This gives you a "visual blueprint" before writing a single line of code.

## 4. Clarify the Purpose of the Frontend
Whatever the project is, make sure your frontend design supports things like:
- Viewing or interacting with real-time data
- Displaying system or API status
- Providing user flows (authentication, forms, uploads, dashboards)
- Offering documentation or onboarding
- Running tests or mock actions

Keep it clean, structured, and easily implementable by AI.

Recommended defaults:
- **React + Vite** for web
- **Clean component hierarchy**
- **Deployable anywhere** (AWS, Vercel, Firebase, etc.)

## 5. Research the Tech Stack
Workflow:
1. Ask **Perplexity** what tech stack best fits the project.
2. Feed `requirements.md` into **ChatGPT** to confirm or correct.
3. Start a new chat and ask:
   > Does this tech stack work for this project? I’m using only AI tools (Cursor, GPT, Claude), so pick something easy for AI to implement and debug.

Pick a stack that:
- Has excellent documentation  
- Is predictable  
- Is widely used  
- Is easy for LLMs to scaffold  
- Minimizes hidden complexity  

Examples:
- Web: React/Vite + Node or Python backend
- Mobile: Expo + React Native
- Backend: FastAPI / Express / Django
- Infra: AWS, Vercel, Supabase, Firebase

## 6. Prepare the Master Prompt
Grab your master project prompt (your reusable template).

Modify it so:
- The tech stack matches your chosen stack
- The requirements reflect your project
- You **do not mention any frameworks you are not using**

This avoids confusing the LLM.

## 8. Put the Master Prompt Into ChatGPT

Ask ChatGPT to genereate a PRD that will fully define the specs of the project.

This PRD becomes the full specification for your entire project:
- Architecture
- Data models
- API routes
- UI screens
- User flows
- Error conditions
- Deployment notes


## 9. Turn the PRD Into TASK_LIST.md
Now generate a `TASK_LIST.md` using:
- PHASES
- EPICS
- TASKS
- Status icons

You feed the PRD into Claude with:
> Great, now generate a TASK_LIST.md based on the @PRD.md:

This becomes the step-by-step execution plan.

---

# Example Epic Format (From a WhatsApp Clone)

Use this style for any project:

```markdown
### Epic 1.1: Initialize Project & Environment

Story: Set up the development environment and base project structure.

- ⬜ Task 1.1.1: Initialize the project with the chosen framework/tooling
- ⬜ Task 1.1.2: Install required dependencies
- ⬜ Task 1.1.3: Configure environment variables
- ⬜ Task 1.1.4: Set up base folder structure
- ⬜ Task 1.1.5: Connect the project to backend/services (if applicable)
- ⬜ Task 1.1.6: Verify builds and basic execution
````

This is the template you'll use when generating your real project task list.

---

# 9. Begin the Epic Loop

Once `TASK_LIST.md` is created, begin your **Epic Loop**:

* First iteration: Implement Epic 1
* Next: Implement Epic 2
* Next: Implement Epic 3
* Continue until the entire build is complete

Use:

* **Claude 4.5 Sonnet Thinking MAX**
* Cursor’s **Plan Mode**

This lets you build production-ready projects *as a single developer* using only AI tools.

---

# Summary

* Convert requirements PDF → Markdown
* Generate a professional frontend using v0
* Research and confirm the tech stack
* Update your master prompt to reflect the project
* Use Cursor Plan Mode with Claude 4.5 Sonnet
* Generate a PRD → convert it to TASK_LIST.md
* Execute using the Epic Loop

This workflow works for *any* project and is fully optimized for AI-only development.