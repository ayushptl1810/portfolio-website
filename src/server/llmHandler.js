import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

const normalize = (s = "") => s.toLowerCase().replace(/\s+/g, " ").trim();

async function readTextFile(p) {
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    return "";
  }
}

async function detectProjectByName(query) {
  try {
    const modulePath = path.join(
      process.cwd(),
      "src",
      "utils",
      "ProjectList.js",
    );
    const { default: ProjectList } = await import(modulePath, {
      assert: { type: "javascript" },
    }).catch(async () => {
      return await import(pathToFileURL(modulePath).href);
    });
    const q = normalize(query);
    for (const proj of ProjectList || []) {
      const name = normalize(proj?.name || "");
      const repo = normalize(proj?.repo || "");
      if (q.includes(name) || (repo && q.includes(repo))) return proj;
    }
    return null;
  } catch {
    return null;
  }
}

export default async function llmHandler(req, res) {
  if (req.method && req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { query, history } = req.body || {};
    if (!query || typeof query !== "string") {
      return res.status(400).json({ ok: false, error: "Query is required" });
    }

    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_API_MODEL;
    if (!apiKey || !model) {
      return res.status(500).json({
        ok: false,
        error: "LLM not configured (missing GROQ_API_KEY or GROQ_API_MODEL)",
      });
    }

    const basePromptPath = path.join(
      process.cwd(),
      "src",
      "assets",
      "llm_info.md",
    );
    const techPromptPath = path.join(
      process.cwd(),
      "src",
      "assets",
      "llm_info_tech.md",
    );
    const basePrompt = await readTextFile(basePromptPath);
    const techPrompt = await readTextFile(techPromptPath);

    let project = await detectProjectByName(query);
    if (!project && Array.isArray(history) && history.length > 0) {
      for (let i = history.length - 1; i >= 0; i--) {
        const h = history[i];
        if (!h || typeof h.text !== "string") continue;
        const candidate = await detectProjectByName(h.text);
        if (candidate) {
          project = candidate;
          break;
        }
      }
    }

    const composedSystem = [
      basePrompt?.trim(),
      techPrompt?.trim(),
      project ?
        `\nProject Focus: ${project.name}\nRepo: ${project.owner}/${project.repo}`
      : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const messages = [{ role: "system", content: composedSystem }];

    if (Array.isArray(history)) {
      const recent = history.slice(-8);
      for (const msg of recent) {
        if (!msg || typeof msg.text !== "string") continue;
        const role = msg.from === "bot" ? "assistant" : "user";
        messages.push({ role, content: msg.text });
      }
    }
    messages.push({ role: "user", content: query });

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages,
          temperature: 0.2,
          max_tokens: 1000,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res
        .status(502)
        .json({ ok: false, error: `LLM error: ${errorText}` });
    }

    const json = await response.json();
    const content = json?.choices?.[0]?.message?.content || "";
    return res.status(200).json({ ok: true, content });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
}
