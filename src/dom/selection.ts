import { createParentElementsIterator } from "./iterate/createParentElementsIterator";
import { createRangeWalkerIterator } from "./iterate/createRangeWalkerIterator";

export const isSelectionBold = (): boolean => {
  return isSelectedWith("STRONG");
};

export const isSelectionItalic = (): boolean => {
  return isSelectedWith("EM");
};

export const isSelectionUnderline = (): boolean => {
  return isSelectedWith("U");
};

export const isSelectionStrikeThrough = (): boolean => {
  return isSelectedWith("S");
};

export const isSelectionCode = (): boolean => {
  return isSelectedWith("CODE");
};

export const isSelectedWith = (tagName: string): boolean => {
  const selection = globalThis.getSelection();

  if (!selection || selection.isCollapsed) {
    return false;
  }
  const range = selection.getRangeAt(0);

  let res = false;
  for (let currentNode of createRangeWalkerIterator(range)) {
    res = false;
    for (const parent of createParentElementsIterator(currentNode)) {
      if (parent.tagName === tagName) {
        res = true;
        break;
      }
    }
    if (!res) {
      return res;
    }
  }

  return res;
};

/**
 * NOTE: Do not forget to call `selection.removeAllRanges()` once
 * you are done with the selection.
 *
 * CAUTION: The method will throw an error if it is not possible to
 * get selection object.
 */
export const selectRange = (
  nodeStart: Text,
  nodeStartOffset: number,
  nodeEnd: Text,
  nodeEndOffset: number,
): Selection => {
  const range = document.createRange();
  range.setStart(nodeStart, nodeStartOffset);
  range.setEnd(nodeEnd, nodeEndOffset);
  const selection = globalThis.getSelection();
  if (!selection) {
    throw new Error("Selection is needed for this test.");
  }
  selection.removeAllRanges();
  selection.addRange(range);
  return selection;
};
