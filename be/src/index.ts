import "dotenv/config";
import express from "express";
import Anthropic from "@anthropic-ai/sdk";

import { BASE_PROMPT, getSystemPrompt } from "./prompts.js";
import type { ContentBlock, TextBlock } from "@anthropic-ai/sdk/resources";

import { basePrompt as nodeBasePrompt } from "./defaults/node.js";
import { basePrompt as reactBasePrompt } from "./defaults/react.js";
import cors from "cors";

const anthropic = new Anthropic();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

app.post("/template", async (req, res) => {
  const prompt = req.body.prompt;

  // Check if it's a frontend task
  const frontendKeywords = [
    "app",
    "website",
    "ui",
    "frontend",
    "component",
    "page",
    "interface",
    "dashboard",
    "form",
    "todo",
    "list",
    "gallery",
    "portfolio",
    "blog",
    "ecommerce",
    "chat",
    "game",
    "calculator",
    "editor",
    "viewer",
  ];
  const isFrontend = frontendKeywords.some((keyword) =>
    prompt.toLowerCase().includes(keyword),
  );

  if (isFrontend) {
    res.json({
      prompts: [
        BASE_PROMPT,
        `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
      ],
      uiPrompts: [reactBasePrompt],
    });
    return;
  }

  const response = await anthropic.messages.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "claude-haiku-4-5",
    max_tokens: 50,
    system:
      "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
  });

  const answer = (response.content[0] as TextBlock).text;
  if (answer == "react") {
    res.json({
      prompts: [
        BASE_PROMPT,
        `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
      ],
      uiPrompts: [reactBasePrompt],
    });
    return;
  }

  if (answer === "node") {
    res.json({
      prompts: [
        `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
      ],
      uiPrompts: [nodeBasePrompt],
    });
    return;
  }

  res.status(403).json({ message: "You cant access this" });
  return;
});

// async function main() {
//   const anthropic = new Anthropic();

//   anthropic.messages
//     .stream({
//       messages: [{ role: "user", content: "give summary of flow chart" }],
//       model: "claude-opus-4-7",
//       max_tokens: 8000,
//     })
//     .on("text", (text) => {
//       console.log(text);
//     });

//   const msg = await anthropic.messages.create({
//     model: "claude-opus-4-7",
//     max_tokens: 1000,
//     messages: [
//       {
//         role: "user",
//         content:
//           "What should I search for to find the latest developments in renewable energy?",
//       },
//     ],
//   });
//   console.log(msg);
// }

app.post("/chat", async (req, res) => {
  const messages = req.body.messages;
  const generateArtifact = !!req.body.generateArtifact;

  const artifactInstruction = {
    role: "user",
    content:
      "Please generate a complete, production-ready artifact with all the necessary files (package.json, source files, config files, etc.) and shell commands to set up and run the project. Wrap everything in <boltArtifact> tags with <boltAction> elements for each file and shell command. Make sure to include all dependencies in package.json.",
  };

  const messagesToSend = generateArtifact
    ? [...messages, artifactInstruction]
    : messages;

  const response = await anthropic.messages.create({
    messages: messagesToSend,
    model: "claude-haiku-4-5",
    max_tokens: generateArtifact ? 8000 : 2000,
    system: getSystemPrompt(),
  });

  console.log(response);

  res.json({
    response: (response.content[0] as TextBlock)?.text,
  });
});

app.listen(3003);

// main().catch(console.error);
