import { join } from "node:path";
import { argv, exit } from "node:process";
// @deno-types="npm:@types/fs-extra"
import { outputFile } from "npm:fs-extra";

import { larkApp, findWiki, traverseWiki } from "./utility.ts";

const [domain, spaceName, targetFolder = "document"] = argv.slice(2);

console.time(spaceName);

await larkApp.getAccessToken();

const space = await findWiki(spaceName);

if (!space)
  throw new ReferenceError(`Space with name "${spaceName}" is not found`);

for await (const { titlePath, markdown } of traverseWiki(
  domain,
  space.space_id
)) {
  const path = join(targetFolder, `${titlePath}.md`);

  await outputFile(path, markdown);

  console.log(`[save] ${path}`);
}
console.timeEnd(spaceName);

exit();
