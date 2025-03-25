/* eslint-disable sonarjs/cognitive-complexity */

const DIRECTION_UPWARD = -1;
const DIRECTION_DOWNWARD = 1;
const DIRECTION_INDETERMINATE = 0;

type MousePoint = {
  clientX: number;
  clientY: number;
};
let prevIndex = Infinity; // a cache value for searching the node with the hover

export const getElementByClientCoordinates = (
  rootElement: HTMLElement,
  { clientY }: MousePoint,
  {
    includeEdges = false,
    includeDirection = true,
  }: { includeEdges?: boolean; includeDirection?: boolean } = {},
): Element | null => {
  if (includeEdges) {
    const [firstNodeElement, lastNodeElement] = [
      rootElement.firstElementChild,
      rootElement.lastElementChild,
    ];

    const [firstNodeRect, lastNodeRect] = [
      firstNodeElement?.getBoundingClientRect(),
      lastNodeElement?.getBoundingClientRect(),
    ];
    if (firstNodeRect && lastNodeRect) {
      if (clientY < firstNodeRect.top) {
        return firstNodeElement;
      } else if (clientY > lastNodeRect.bottom) {
        return lastNodeElement;
      }
    }
  }

  // traversing the DOM tree is tricky and fragile, it is much easier
  // to just calculate whether mouse coordinates are overlap with the
  // each node's boundaries. Actually we do not have to iterate over each
  // node, we can start from the middle and navigate towards the mouse current
  // position.

  let targetElement: Element | null = null;
  let direction = DIRECTION_INDETERMINATE;

  let index = Math.floor(rootElement.childElementCount / 2);
  if (rootElement.childElementCount === 0) {
    index = Infinity; // skip the loop
  }

  if (prevIndex >= 0 && prevIndex < rootElement.childElementCount) {
    index = prevIndex;
  }
  let lastBlockElement: Element | null = null; // in case when user points in between 2 elements where no overlapping, I can assume the last element was selected

  while (index >= 0 && index < rootElement.childElementCount) {
    const blockElement = rootElement.children.item(index);
    if (blockElement === null) {
      break;
    }
    lastBlockElement = blockElement;

    const blockElementClientRect = blockElement.getBoundingClientRect();
    const topBoundary = blockElementClientRect.top + document.body.scrollTop;
    // const leftBoundary = blockElementClientRect.left + document.body.scrollLeft; // NOTE: originally this
    // const leftBoundary = rootClientRect.left + document.body.scrollLeft; // NOTE: theoretically we don't need the code above, however practically we don't this code either

    const isOnTopSide: boolean = clientY < topBoundary;
    const isOnBottomSide: boolean = clientY > topBoundary + blockElementClientRect.height;
    // const isOnLeftSide: boolean = clientX < -leftBoundary; // NOTE: originally clientX < leftBoundary
    // const isOnRightSide: boolean = clientX > leftBoundary + blockElementClientRect.width;

    const mouseWithinBlock: boolean = !isOnTopSide && !isOnBottomSide; // && !isOnLeftSide && !isOnRightSide;

    if (mouseWithinBlock) {
      targetElement = blockElement;
      prevIndex = index;
      break;
    }

    if (direction === DIRECTION_INDETERMINATE) {
      if (isOnTopSide) {
        direction = DIRECTION_UPWARD;
      } else if (isOnBottomSide) {
        direction = DIRECTION_DOWNWARD;
      } else {
        direction = Infinity; // exit while loop
      }
    }

    index += direction;
  }

  if (targetElement) {
    return targetElement;
  }

  if (!includeDirection) {
    return targetElement;
  }

  if (direction === DIRECTION_UPWARD && lastBlockElement?.nextElementSibling) {
    return lastBlockElement.nextElementSibling;
  }

  if (direction === DIRECTION_DOWNWARD && lastBlockElement?.previousElementSibling) {
    return lastBlockElement.previousElementSibling;
  }

  return lastBlockElement;
};

/* eslint-enable sonarjs/cognitive-complexity */
