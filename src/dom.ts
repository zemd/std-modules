export const copyAttributes = (
  sourceElement: Element,
  targetElement: Element,
  opts: Partial<{
    allowedAttributes: string[];
    forbiddenAttributes: string[];
  }> = {},
): void => {
  const { allowedAttributes = [], forbiddenAttributes = [] } = opts;
  for (const attr of sourceElement.attributes) {
    if (!allowedAttributes.includes(attr.name)) {
      continue;
    }
    if (forbiddenAttributes.includes(attr.name)) {
      continue;
    }
    targetElement.setAttributeNS(null, attr.name, attr.value);
  }
};

export * from "./dom/caret";
export * from "./dom/check";
export * from "./dom/cloneTree";
export * from "./dom/removeNestedElementsWithTagName";
export * from "./dom/selection";

export * from "./dom/iterate";
