import { isText } from "../check";

export const getNearestChildTextNode = (node: Node | null): Text | null => {
  if (!node) {
    return null;
  }
  if (isText(node)) {
    return node;
  }

  for (let child of node.childNodes) {
    const text = getNearestChildTextNode(child);
    if (text) {
      return text;
    }
  }

  return null;
};
