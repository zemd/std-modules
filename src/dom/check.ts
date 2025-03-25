export const isDocumentFragment = (node: Node): node is DocumentFragment => {
  return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
};

export const isHTMLElement = (node: Node): node is HTMLElement => {
  return node.nodeType === Node.ELEMENT_NODE;
};

export const isComment = (node: Node): node is Comment => {
  return node.nodeType === Node.COMMENT_NODE;
};

export const isText = (node: Node): node is Text => {
  return node.nodeType === Node.TEXT_NODE;
};

export const isContentEditable = (node: Node | null): boolean => {
  if (!node) {
    return false;
  }
  return isHTMLElement(node) && node.hasAttribute("contenteditable");
};

export const isBlockElement = (element: Node | null): boolean => {
  if (!element) {
    return false;
  }
  return isHTMLElement(element) && isContentEditable(element) && !!element.dataset.block;
};
