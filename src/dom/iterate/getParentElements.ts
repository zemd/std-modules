import { isBlockElement } from "../check";

export const getParentElements = (node: Node): Element[] => {
  const result: Element[] = [];
  let currentElement = node.parentElement;
  while (currentElement && !isBlockElement(currentElement)) {
    result.push(currentElement);
    currentElement = currentElement.parentElement;
  }
  return result;
};
