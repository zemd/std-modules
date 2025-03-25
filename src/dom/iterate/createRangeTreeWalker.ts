import { isText } from "../check";

type ShowFilter = typeof NodeFilter.SHOW_TEXT | typeof NodeFilter.SHOW_ELEMENT;

export const createRangeTreeWalker = (
  range: Range,
  whatToShow: ShowFilter = NodeFilter.SHOW_TEXT,
): TreeWalker => {
  // NOTE(29.07.24): added this code as experiment for checking if selected nodes has formatting,
  // consider updating it if formatting is not working correctly.
  const container: Node = isText(range.commonAncestorContainer)
    ? (range.commonAncestorContainer.parentElement ?? range.commonAncestorContainer)
    : range.commonAncestorContainer;

  return document.createTreeWalker(container, whatToShow, {
    acceptNode(node) {
      return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
};
