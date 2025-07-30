/// <reference types="npm:@types/node" />

import { join } from "node:path";
import { env } from "node:process";
import MobxLark, { LarkWikiNode } from "npm:mobx-lark@2.4.0-rc.0";
// @deno-types="npm:@types/react-dom/server"
import { renderToStaticMarkup } from "npm:react-dom/server";
// @deno-types="npm:@types/turndown"
import TurnDown from "npm:turndown";

const id = env.LARK_APP_ID!,
  secret = env.LARK_APP_SECRET!;

export const larkApp = new MobxLark.LarkApp({ id, secret });

export class MyWikiModel extends MobxLark.WikiModel {
  client = larkApp.client;
}

export class MyWikiNodeModel extends MobxLark.WikiNodeModel {
  client = larkApp.client;
}

export class MyDocumentModel extends MobxLark.DocumentModel {
  client = larkApp.client;
}

interface LarkWikiTraverseNode {
  node: LarkWikiNode;
  titlePath: string;
  markdown: string;
}

const documentStore = new MyDocumentModel(),
  turndown = new TurnDown();

export async function docx2markdown(obj_token: string) {
  const blocks = await documentStore.getOneBlocks(obj_token);

  const { vDOM, files } = MobxLark.renderBlocks(blocks);

  const markup = renderToStaticMarkup(vDOM);

  const markdown = turndown.turndown(markup);

  return { markdown, files };
}

export async function* traverseWiki(
  domain: string,
  space_id: string,
  title_path = ""
): AsyncGenerator<LarkWikiTraverseNode> {
  const wikiNodeStore = new MyWikiNodeModel(domain, space_id);

  const wikiNodes = await wikiNodeStore.getAll();

  for (const node of wikiNodes)
    if (node.obj_type === "docx") {
      const titlePath = join(title_path, node.title);

      const { markdown, files } = await docx2markdown(node.obj_token);

      yield { node, titlePath, markdown };
    }
}
