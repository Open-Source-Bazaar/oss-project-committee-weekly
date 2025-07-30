import { join } from "node:path";
import { argv, exit } from "node:process";
// @deno-types="npm:@types/fs-extra"
import { outputFile } from "npm:fs-extra";
import { LarkPageData, LarkWiki } from "npm:mobx-lark@2.4.0-rc.0";

import { larkApp, traverseWiki } from "./utility.ts";

const [domain, spaceName, targetFolder = "document"] = argv.slice(2);

console.time(spaceName);

await larkApp.getAccessToken();

const { body: spaceBody } = await larkApp.client.get<LarkPageData<LarkWiki>>(
  "wiki/v2/spaces?page_size=50"
);
const space = spaceBody?.data?.items.find(({ name }) =>
  name.toLowerCase().includes(spaceName.toLowerCase())
);
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
