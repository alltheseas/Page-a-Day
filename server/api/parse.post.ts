import { parseEpub } from "@gxl/epub-parser";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsedEpub = await parseEpub(body.input);
  return parsedEpub;
});