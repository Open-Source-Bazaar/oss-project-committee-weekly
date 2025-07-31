/// <reference lib="dom" />

// @deno-types="npm:@types/turndown"
import TurnDown from "npm:turndown";
import { gfm } from 'npm:turndown-plugin-gfm';

export const Empty_URL = /^(#+|javascript:.+)$/;

export const turndown = new TurnDown({
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  linkStyle: "referenced",
});

export const IgnoredTags: (keyof HTMLElementTagNameMap)[] = [
  "meta",
  "link",
  "script",
  "form",
  "fieldset",
  "legend",
  "label",
  "input",
  "button",
];

turndown
  .use(gfm)
  .addRule("user_interface", {
    filter: IgnoredTags,
    replacement: () => "",
  })
  .addRule("non_url", {
    filter: (node) =>
      ["a", "area"].includes(node.nodeName.toLowerCase()) &&
      Empty_URL.test(node.getAttribute("href") + ''),
    replacement: () => "",
  });
