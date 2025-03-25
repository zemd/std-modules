export const fragmentToString = (fragment: DocumentFragment): string => {
  const div = document.createElement("DIV");
  div.replaceChildren(...fragment.cloneNode(true).childNodes);
  return div.innerHTML;
};
