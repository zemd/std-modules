import { createElementWithTagNameTreeWalker } from "./createElementWithTagNameTreeWalker";

export const createElementWithTagNameIterator = function* (
  node: Node,
  tagName: string,
): Generator<Node> {
  const treeWalker = createElementWithTagNameTreeWalker(node, tagName);
  while (treeWalker.nextNode()) {
    yield treeWalker.currentNode;
  }
};
