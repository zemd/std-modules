export const moveCaretToElement = (element: Element, offset = 0): void => {
  const selection = globalThis.getSelection();
  const range = document.createRange();
  if (selection && element.childNodes.length > 0) {
    // @ts-expect-error element.childNodes has at least one node
    range.setStart(element.childNodes[0], offset);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export const moveCaretToNode = (node: Node, offset = 0): void => {
  const selection = globalThis.getSelection();
  const range = document.createRange();
  range.setStart(node, offset);
  range.collapse(true);
  selection?.removeAllRanges();
  selection?.addRange(range);
};
