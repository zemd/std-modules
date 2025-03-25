/* eslint-disable sonarjs/cognitive-complexity */
import { isHTMLElement, isText } from "./check";

const hasNodes = (node: Node): boolean => {
  if (isText(node)) {
    return true;
  }
  for (let child of node.childNodes) {
    if (isHTMLElement(child) || isText(child)) {
      return true;
    }
  }
  return false;
};

/**
 * NOTE: selecting all nodes before the given node works inclusively to the node,
 *  that means the method will return it also, but this also means that it won't
 *  include any other things like slice comments that go after the given node.
 */
export const experimental_cloneTree = (
  container: Node,
  node: Text, // TODO: replace using references to using IDs within the slice comment
  withText: Text,
  part: "before" | "after",
): DocumentFragment => {
  let nodeFound = false;
  const result = document.createDocumentFragment();

  for (let childNode of container.childNodes) {
    if (childNode === node) {
      // if we reached the node in the DOM tree we can return
      // DocumentFragment reference instead of the Text content,
      // allowing to modify it later
      if (part === "before") {
        // result.appendChild(childNode.cloneNode());
        if (withText.data.length > 0) {
          result.append(withText);
        }
        return result;
      }
      nodeFound = true;
      if (withText.data.length > 0) {
        result.append(withText);
      }
      continue;
    }

    if (childNode.contains(node) && !nodeFound) {
      nodeFound = true;
      const nestedTree = experimental_cloneTree(childNode, node, withText, part);
      const cloned = childNode.cloneNode();
      // eslint-disable-next-line unicorn/prefer-dom-node-append
      cloned.appendChild(nestedTree);
      if (hasNodes(cloned)) {
        // NOTE(28.07.24): added this check for cleaner output.
        //  Consider removing it if something goes wrong. Still experimental.
        result.append(cloned);
      }
    }

    if (!childNode.contains(node) && !nodeFound && part === "before") {
      result.append(childNode.cloneNode(true));
    }

    if (nodeFound && part === "before") {
      continue;
    }

    if (!childNode.contains(node) && nodeFound && part === "after") {
      result.append(childNode.cloneNode(true));
    }

    if (!nodeFound && part === "after") {
      continue;
    }
  }

  return result;
};

/* eslint-enable sonarjs/cognitive-complexity */
