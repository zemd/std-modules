import { createCommentTreeWalker } from "./createCommentTreeWalker";

export const getCommentNode = <T extends string>(container: Node, comment: T): Comment | null => {
  const treeWalker = createCommentTreeWalker<T>(container, comment);
  return treeWalker.nextNode() as Comment;
};
