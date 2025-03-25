export const getNextSiblings = (node: Node, clone: boolean = true): Array<Node> => {
  const result: Node[] = [];
  let nextSibling = node.nextSibling;
  while (nextSibling) {
    result.push(clone ? nextSibling.cloneNode(true) : nextSibling);
    nextSibling = nextSibling.nextSibling;
  }
  return result;
};
