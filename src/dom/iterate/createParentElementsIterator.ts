import { isBlockElement, isHTMLElement } from "../check";

export const createParentElementsIterator = function* (node: Node): Generator<HTMLElement> {
  let currentElement = isHTMLElement(node) ? node : node.parentElement;
  while (currentElement && !isBlockElement(currentElement)) {
    yield currentElement;
    currentElement = currentElement.parentElement;
  }
};
