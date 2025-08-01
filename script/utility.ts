/// <reference types="npm:@types/node" />

import { env } from "node:process";
// @deno-types="npm:@types/fs-extra"
import { outputFile } from "npm:fs-extra";
import MobxLark, { LarkPageData, Wiki } from "npm:mobx-lark@2.4.0-rc.9";
// @deno-types="npm:@types/react-dom/server"
import { renderToStaticMarkup } from "npm:react-dom/server";

import { turndown } from "./parser.ts";

const id = env.LARK_APP_ID!,
  secret = env.LARK_APP_SECRET!;

export const larkApp = new MobxLark.LarkApp({ id, secret });

export async function findWiki(spaceName: string) {
  const { body: spaceBody } = await larkApp.client.get<LarkPageData<Wiki>>(
    "wiki/v2/spaces?page_size=50"
  );
  return spaceBody?.data?.items.find(({ name }) =>
    name.toLowerCase().includes(spaceName.toLowerCase())
  );
}

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
  titlePath: string;
  markdown: string;
}

const documentStore = new MyDocumentModel();

export async function docx2markdown(obj_token: string) {
  const blocks = await documentStore.getOneBlocks(
    obj_token,
    (token) => `https://kaiyuanshe.cn/api/lark/file/${token}`
  );
  try {
    const vDOM = MobxLark.renderBlocks(blocks);

    const markup = renderToStaticMarkup(vDOM);

    return turndown.turndown(markup);
  } catch (error) {
    await outputFile(
      `.cache/${obj_token}.json`,
      JSON.stringify(blocks, null, 2)
    );
    throw error;
  }
}

export async function* traverseWiki(
  domain: string,
  space_id: string
): AsyncGenerator<LarkWikiTraverseNode> {
  const wikiNodeStore = new MyWikiNodeModel(domain, space_id);

  const nodeStream = wikiNodeStore.traverseTree();

  for await (const { obj_type, obj_token, title_path } of nodeStream)
    if (obj_type === "docx") {
      const markdown = await docx2markdown(obj_token);

      yield { titlePath: title_path!, markdown };
    }
}
