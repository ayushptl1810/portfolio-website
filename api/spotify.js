import spotifyHandler from "../src/server/spotifyHandler.js";

export default async function handler(req, res) {
  return spotifyHandler(req, res);
}
