export const createElementWithTagNameTreeWalker = (node: Node, tagName: string): TreeWalker => {
  return document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node: Element) {
      return node.tagName === tagName ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
};
