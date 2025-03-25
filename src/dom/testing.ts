let testingId = 1;

export const createTestBlockElement = (html?: string): HTMLElement => {
  testingId += 1;
  const testDiv = document.createElement("div");
  testDiv.id = `test-${testingId}`;
  testDiv.setAttribute("contenteditable", "true");
  testDiv.dataset.block = "true";

  if (html) {
    testDiv.innerHTML = html;
  } else {
    testDiv.append(document.createTextNode(""));
  }

  document.body.append(testDiv);
  return testDiv;
};
