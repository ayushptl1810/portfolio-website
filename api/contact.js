import contactHandler from "../src/server/contactHandler.js";

export default async function handler(req, res) {
  return contactHandler(req, res);
}
