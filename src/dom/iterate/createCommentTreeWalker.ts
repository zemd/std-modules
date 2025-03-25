export const createCommentTreeWalker = <T extends string>(node: Node, comment: T): TreeWalker => {
  return document.createTreeWalker(node, NodeFilter.SHOW_COMMENT, {
    acceptNode(node: Comment) {
      return node.data.startsWith(comment) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
};
