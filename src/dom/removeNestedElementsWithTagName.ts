import { isDocumentFragment } from "./check";
import { createElementWithTagNameIterator } from "./iterate/createElementWithTagNameIterator";

export const removeNestedElementsWithTagName = (
  node: DocumentFragment,
  tagName: string,
): DocumentFragment => {
  if (!isDocumentFragment(node)) {
    throw new Error(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `removeNestedElementsWithTagName can be used only with DocumentFragment. Received: ${node}`,
    );
  }

  for (let currentElement of createElementWithTagNameIterator(node, tagName)) {
    const newFragment = document.createDocumentFragment();
    newFragment.append(...currentElement.childNodes);
    currentElement.parentNode?.insertBefore(newFragment, currentElement);
    // eslint-disable-next-line unicorn/prefer-dom-node-remove
    currentElement.parentNode?.removeChild(currentElement);
  }

  return node;
};
