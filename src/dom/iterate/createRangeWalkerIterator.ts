import { createRangeTreeWalker } from "./createRangeTreeWalker";

export const createRangeWalkerIterator = function* (range: Range): Generator<Node> {
  const treeWalker = createRangeTreeWalker(range);
  while (treeWalker.nextNode()) {
    yield treeWalker.currentNode;
  }
};
