import { join } from "node:path";
import { env } from "node:process";
import MobxLark, { LarkPageData, LarkWikiNode } from "npm:mobx-lark";
import WebUtility from "npm:web-utility";

export interface LarkWiki
  extends Record<"name" | " description" | "space_id", string> {
  space_type: "team" | "person" | "my_library";
  visibility: "public" | "private";
  open_sharing: "open" | "closed";
}

const id = env.LARK_APP_ID!,
  secret = env.LARK_APP_SECRET!;

export const larkApp = new MobxLark.LarkApp({ id, secret });

interface LarkWikiTraverseNode {
  node: LarkWikiNode;
  titlePath: string;
  markdown: string;
}

export async function* traverseWiki(
  domain: string,
  space_id: string,
  title_path = "",
  parent_node_token?: string
): AsyncGenerator<LarkWikiTraverseNode> {
  const { body } = await larkApp.client.get<LarkPageData<LarkWikiNode>>(
    `wiki/v2/spaces/${space_id}/nodes?${WebUtility.buildURLData({
      page_size: 50,
      parent_node_token,
    })}`
  );
  for (const node of body?.data?.items || [])
    if (node.obj_type === "docx") {
      const titlePath = join(title_path, node.title);

      let markdown = await larkApp.downloadMarkdown(
        `https://${domain}/wiki/${node.node_token}`
      );
      markdown = markdown.replace(/https?:\/\/[^\s)]+/g, (link) =>
        link.replace(/\\\./g, ".")
      );
      yield { node, titlePath, markdown };

      yield* traverseWiki(domain, node.space_id, titlePath, node.node_token);
    }
}
