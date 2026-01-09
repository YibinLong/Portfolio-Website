---
title: 'My AI Methodology'
description: 'My AI Methodology'
pubDate: 'Nov 19 2025'
draft: false
---

An AI Methodology is simply a systematic workflow of how a developer goes about using AI in their development process.

We're early enough that there's not a well-defined _optimal_ way to use AI to develop yet. Every person will have different opinions on what they prefer and what they believe works best. Obviously there are very unoptimized workflows, but at the right tail of AI development vastly different workflows can produce remarkably good results.

Ultimately, what matters is: Does what you produce match with what you imagined in your head?

Or, as <a href="https://en.wikipedia.org/wiki/Peter_Naur" target="_blank" rel="noopener noreferrer">Peter Naur</a> more eloquently describes:

> "Programming in essence is building a certain kind of theory, a theory of how certain affairs of the world will be handled by a computer program"

You'll note that this question is _exactly_ what you ask when you're coding without AI! The desired end result does not change. Only the tools you get to use change.

In this post, I'll outline my AI methodology. Hopefully this helps when you're building yours, too.

Here's a summary:

1. **Define the Requirements**
2. **Clarify Requirements with an LLM**
3. **Research the Tech Stack**
4. **Design the Frontend**
5. **Edit the PRD Prompt**
6. **Create the PRD**
7. **Generate the Task List**
8. **Complete the Epics Iteratively**

## 1. Define the Requirements

For every project, you need to know _what_ you want to create.

Here, you write down the problem that you want to solve. You wouldn't be creating software just for the sake of it, so make sure you think hard here. Define the goals and success metrics. Determine who your target users and personas are. What are your user stories?

Here you should also define your functional requirements. What are must-haves? Should-haves? Nice-to-haves?

What are some non-functional requirements? For example, how performant do you want your project to be?

What are the technical requirements? What are the dependencies that you must have, or the key assumptions?

Finally, what's out of scope? It's important to know what you won't need to develop to avoid scope creep.

Think of this as a version 0 of your Product Requirements Document (PRD). This one gets your thoughts down, but you'll heavily refine it into a full-fledged PRD later.

Once you're done, export this document as a Markdown file. LLMs parse Markdown files quite well, so you'll be using them a lot!

---

## 2. Clarify Requirements with an LLM

Talk with your favorite LLM (I prefer ChatGPT) to ask it questions about the requirements.

If you were given the requirements from your boss, make sure you ask lots of questions to actually understand what is being asked of you.

I particularly like asking ChatGPT a question by starting with: Explain this SIMPLY. 

I'm a huge fan of the <a href="https://en.wikipedia.org/wiki/Learning_by_teaching#Plastic_platypus_learning" target="_blank" rel="noopener noreferrer">Feynman Technique</a> of using analogies and simplifying complex subjects down to their essence. I feel this allows me to really understand topics I hadn't even heard of minutes earlier.

I'll do research here about what are the best practices for what I'm doing. Are there any common pitfalls I should watch out for? How would senior engineers from a world-class tech firm architect my project?

<details>
<summary>If you're interested, click here to see my system prompt for ChatGPT </summary>

```
When I ask you to explain something, it is better to explain it SIMPLY, so that a first year smart undergraduate could understand it. With programming questions, provide code examples. If I ask you to explain why to use a programming concept, give code examples WITHOUT using the concept, and then WITH using the concept (i.e. using async/await in Javascript versus Callback Hell). This is so I can compare the differences, and learn why I should use this new concept.

Also, use your judgement on whether to use analogies to explain a concept. When you use analogies, try to make all the analogies relate to each other (i.e. a restaurant when explaining each part of a full stack app NOTE: Feel free to use whichever analogy feels the best to use). Use your judgement, an analogy is not relevant for every question!

Get right to the point. Speak with SIGNAL over noise (DON'T mention the word "signal" though). Flowery language and talking down / baby-talking to me is really annoying, so avoid that. Do not say: "Straight to it" or any variation of that in the beginning (It is unnecessary, I know you're being straight to the point).

DO NOT USE line breaks / horizontal lines, it makes me have to scroll too much.

Have a summary at the end that highlights the most important points.

HOWEVER: If a question is VERY SIMPLE or asking a DEFINITION or it is something Googleable (i.e. I am asking for medical advice or the capital of a country), answer SUCCINCTLY.

Format your answer nicely.
```

</details>

---

## 3. Research the Tech Stack

Asking Cursor or Claude Code to come up with a tech stack for your project on the spot is just asking for trouble.

I like to ask Perplexity Research and ChatGPT with Web Search to come up with a frontend, backend, and infra tech stack that works well with each other, based on the requirements. I ask it to come up with a tech stack that an engineer using AI can use to easily implement the product while also hitting all the requirements. Tech stacks that are more widely used tend to work better with LLMs, since there is more training data.

Usually, each LLM will come up with slightly different answers. Here, I pit them against each other. I'll ask one LLM whether another LLM's suggestion works better than the one it suggested. I'll do this for each framework suggested, until I come up with an optimized tech stack.

I'll finish up by pasting this optimized tech stack into new chats, to verify that every framework is still compatible with each other.

---

## 4. Design the Frontend

I like to design the frontend before the backend. I used to actually create them in parallel, or create the backend first, but I thought back to how to best realize my vision: it's better to figure out what the end product _should_ look like before full implementation.

I really enjoy using <a href="https://v0.app/" target="_blank" rel="noopener noreferrer">Vercel's v0</a> to create a frontend for me. It uses beautiful <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer">shadcn</a> components and integrates nicely with Vercel. I've heard good things about <a href="https://www.figma.com/make/" target="_blank" rel="noopener noreferrer">Figma Make</a> as well, but I have yet to test it thoroughly.

NOTE: v0 will output React code, so only use this if you intend to use React! Otherwise go with Figma.

<details>
<summary>Click here to see my system prompt for v0! </summary>

```
​​I’m building a project called [PROJECT_NAME] as an AI developer using only AI coding tools (Cursor and Claude Code). 

I want you to design a beautiful, performant frontend that looks like it came from a modern startup — the kind of design that would impress the CEO of [COMPANY]. It should look modern, clean, and energetic, using a [LIGHT OR DARK] theme. 

This frontend will serve as the UI for [QUICK SUMMARY OF PROJECT].

Users should be able to: [INCLUDE KEY FEATURES]

Keep the layout intuitive, sleek, and startup-style, with clear typography, vibrant accent colors, and smooth animations. 

Tech Stack Requirements: 
Frontend: [FRONTEND TECH STACK]

Backend: [BACKEND TECH STACK]

Infrastructure: [INFRA TECH STACK]

Ensure the frontend design can be easily integrated with this backend and easily deployed. 

Use components, structure, and data flow that make this straightforward.

I've attached the PRD for the project to use as a reference.
```

</details>

---

## 5. Edit the PRD Prompt

I have a master prompt to generate the PRD that I found worked well. I iterated on this prompt many times throughout many chat sessions. I also tested this prompt on a many different projects to confirm that I'm getting the results that I want.

Modify this prompt so that:

- You fill in any project context that is asked by the prompt
- You ensure the tech stack matches your chosen stack
- Youse ensure the requirements reflect your project

<details>
<summary>Click here to see my master prompt for the PRD! </summary>

```
## **ROLE**

You are a **senior software architect and AI project manager** coaching a **solo developer who only uses AI to code**.
Generate a complete **Product Requirements Document (PRD.md)** for the project described below.
The PRD must be explicit enough that an AI coding assistant (e.g., Cursor) can **build, test, and run the project locally** without human back-and-forth.

---

## **🗂️ INPUT PLACEHOLDERS**

**Project Name:** `[PROJECT_NAME]`
**App Type / Goal:** `[APP_TO_CLONE or SHORT_DESCRIPTION]`
**Platform:** `[WEB | MOBILE | DESKTOP | CROSS-PLATFORM]`
**Constraints (if any):** `[TECH_REQUIREMENTS or FRAMEWORKS if specified]`
**Special Notes:** `[Anything else the developer specifies, such as AI integration or backend choice]`

---

## **STYLE & APPROACH**

* Be concise, unambiguous, and consistent.
* Prefer checklists and short sentences.
* Default to modern, boring tech with strong DX.
* Call out **every manual step** the human must do.
* Make sensible assumptions, **state them clearly**, and proceed.
* Prioritize **vertical slices** that deliver end-to-end value.
* Use frameworks **the way they are meant to be used** — no hacks.
* Select tools and frameworks that the **LLM can code with most easily**, based on:
* Abundant documentation
* Prior model familiarity
* Strong ecosystem (good SDKs, clear APIs)
* Write code that is **robust, maintainable, and easy to debug**.

---

## **⚙️ MANUAL SETUP NOTIFICATIONS**

The LLM must **notify the user explicitly** whenever manual setup/config is required, including:

* Adding new `.env` variables (API keys, tokens, etc.).
* Creating or editing configs on external platforms (AWS, Render, Vercel, Supabase, etc.).
  Each time, specify:

  1. **What** must be done.
  2. **Where** to do it.
  3. **Why** it’s required (what it enables).

---

## **🧠 CURSOR / CLAUDE CONTEXT RULES**

If working across large Epics or multiple PRs:

* **Monitor remaining context.**
* If ≥60–70% of context remains at PR completion → **pause** and notify the user.
* Update `TASK_LIST.md` with what’s done.
* Wait for a new chat to continue (avoid context loss).

---

## **📋 REQUIRED PRD SECTIONS (USE EXACT HEADINGS)**

### **1. Project Summary**

Briefly explain what `[PROJECT_NAME]` is and why it exists.
Format example:
“Build a [APP_TO_CLONE or short description] to achieve [goal]. MVP scope: [A], [B], [C].”

### **2. Core Goals**

List 3–5 **must-have outcomes** — user-visible results.
Format each as “Users can …”

### **3. Non-Goals**

List what is *not* in MVP (prevents scope creep).

### **4. Tech Stack (Solo-AI Friendly)**

Specify concrete, compatible choices for the tech stack.

Include a **1-line rationale per choice** (why it’s AI-friendly or simple for solo devs).

### **5. Feature Breakdown — Vertical Slices**

For each major feature:

* **Feature Name**
* **User Story:** “As a [role], I want [capability] so that [value].”
* **Acceptance Criteria:** checklist of testable outcomes.
* **Data Model Notes:** affected files or stored data.
* **Edge Cases & Errors:** failures, invalid input, retries, offline handling.

### **8. .env Setup**

Provide example `.env` variables if any are needed (e.g., API keys, debug flags).

### **9. .gitignore**

Include one that fits Node/Electron projects.

### **10. Debugging & Logging**

Explain logging in main vs renderer (Electron).
Include toggles like `DEBUG=true`.

### **11. External Setup Instructions (Manual)**

Only include if relevant. 

### **12. Deployment Plan**

* Local run commands (`npm run start`, `npm run make`)

---

## **🧱 TASK_LIST.md STRUCTURE**

Use: **Epics → Stories → Tasks**

---

## **🧩 SOLO-DEV GUARDRAILS**

* Minimize ops.
* Use a single repo.
* Store all secrets in `.env`.
* Enforce strict TypeScript, if used.
* Ship in vertical slices.
* Avoid overengineering.

---

## **📄 OUTPUT FORMAT**

* Use exact section headings.
* Write tight, clear bullets.
* Include `.env`, `.gitignore`, example configs, and setup commands.
* If info is missing, **state an assumption** and continue.


```

</details>

---

## 6. Create the PRD

Ask ChatGPT to generate a PRD. Input the master prompt as well as the requirements document as context.

This PRD becomes the full specification for your entire project.

**Finally**, we get to move onto Cursor and/or Claude Code now!

You'll note that I like to frontload my work. I noticed I spend much less time debugging and I have a much better grasp on my codebase if I spend relatively more time planning before I jump into coding.

NOTE: I like to ask ChatGPT to generate the PRD instead of doing it inside Cursor because it seems that system prompt in Cursor makes it so that the LLM likes to output a lot of code chunks inside the PRD. This will easily create PRDs that are 1000 to 2000 lines long, blowing up the context of new chats. ChatGPT will output more succinct PRDs that only focus on the key details, and let Cursor or Claude Code figure out the future code implementation.

---

## 7. Generate the Task List

Open your preferred coding tool.

I use both Cursor and Claude Code. I open up the Cursor IDE, and have two terminals of Claude Code open: one with Sonnet 4.5 Thinking, and one with GLM 4.6. I also have OpenAI's Codex VSCode extension open as well. That's four different LLMs! I like the variety, because I noticed different LLMs in different environments tend to be better at different tasks. I'll expand on this in another post.

Paste in the initial requirements document and the PRD you just created into the repo.

Now, I ask in a Cursor chat for Sonnet 4.5 Thinking on Max context mode to parse the PRD and the requirements, and create a TASK_LIST.md that details all of the tasks to be completed. It will be split by Epics, Stories, and Tasks.

<details>
<summary>Expand this to see what I provide in the chat as an example of what I want the Task List to look like.</summary>

```
# **MessageAI - Task List**

**Status Legend:** ⬜ Not Started | 🟦 In Progress | ✅ Done | ❌ Blocked

---

## **EPIC 1: PROJECT SETUP** ✅

### **Story 1.1: Initialize Project & Environment** ✅

**Story:** Set up development environment and project structure

- ✅ **Task 1.1.1:** Create Firebase project, enable Auth/Firestore/Storage/Functions/FCM
- ✅ **Task 1.1.2:** Initialize Expo React Native project with TypeScript
- ✅ **Task 1.1.3:** Install dependencies (React Native Paper, Firebase SDK, SQLite, etc.)
- ✅ **Task 1.1.4:** Configure `app.json` (bundle ID, permissions, splash screen)
- ✅ **Task 1.1.5:** Set up `.env` file with Firebase config
- ✅ **Task 1.1.6:** Create project folder structure (`/app`, `/components`, `/services`, `/utils`, `/types`)
- ✅ **Task 1.1.7:** Initialize Firebase Cloud Functions project (`firebase init functions`)
- ✅ **Task 1.1.8:** Deploy Firestore security rules (basic MVP rules)
- ✅ **Task 1.1.9:** Test Firebase connection (frontend → Firestore read/write)
- ✅ **Task 1.1.10:** Set up SQLite database with initial schema (messages, chats, users tables)

**Acceptance:** Project runs on Android device via Expo Go, can read/write Firestore, SQLite initialized. ✅ COMPLETE
```

</details>

---

## 8. Complete the Epics Iteratively

Once `TASK_LIST.md` is created, you can begin completing the Epics, Stories, and Tasks iteratively.

I like to put the LLM into Plan mode. I noticed GPT-5.1-High works best for this. Here's an example of how I prompt my plan, simply replace the story name with the story that you're working on.

```text
Let's implement: Story 2.2: Basic Messaging from @TASK_LIST.md 
Be sure to follow @PRD.md rules.
Use context7 MCP to make sure you're using the packages correctly.
Do NOT create any extra .md files when you're done.
Give the EXACT way to test.
Make sure you check off the TASK_LIST.md when you're done.
Ask me any questions about tasks you're unsure about.
Lets first switch to plan mode and plan how to complete these tasks!
```

Answer any questions that the LLM asks of you. When the plan is ready, simply tell it to go implement!

When the implementation is done, I like to QA all tasks that the agent finished. I noticed that simply relying on unit tests can let huge bugs slip through. If the bug is more complex, ask the LLM to first plan a fix, and then implement it. For the truly big bugs, ask GPT-5.1-Codex-High to plan, and then implement a fix. I'll share my debugging workflow in a future post!

Finally, after everything is done, I like to use an LLM to help create commit messages that follow Conventional Commit standards and helpful pull request descriptions.

I use Sonnet 4.5 on Agent mode in a new Cursor chat window for this.

Here is my prompt, simply replace the story name with the one you're completing:

```text
We just finished Story 1.1: Initialize Electron Project from @TASK_LIST.md.
I have GitHub CLI installed already.
I want you to write me commands I can just copy and paste into my terminal for these tasks. 
CHECK the modified files so you actually know which files we need to commit.
CHAIN all of the commands together, so I only need to copy and paste it into my terminal ONCE:
Create separate commits for each logical change (e.g., feature, fix, refactor, etc) using Conventional Commit format.
Then, add a clear title and description to the pull request and push it to GitHub.
Use gh pr create end the command with “--base main”
NOTE: DO NOT RUN THE COMMANDS - I WANT TO RUN THEM MYSELF
```

After finishing a story, just go onto the next one, and repeat! Super systematic.

---

You did it, the project's done!

I hope you enjoyed reading through my AI methodology.

I want to reiterate that this is just the workflow I personally use. I highly encourage you to test different methods out, every single step along the way can be changed and optimized to your liking. Ultimately, the best AI methodology is one that allows you to solve your problems in the fastest and most robust way, and that is one that is custom built for you!
