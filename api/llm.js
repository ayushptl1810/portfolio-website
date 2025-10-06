import llmHandler from "../src/server/llmHandler.js";

export default async function handler(req, res) {
  return llmHandler(req, res);
}
