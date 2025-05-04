
function useCheckHTMLBody(htmlString) {
  const parser = new DOMParser();

  // Parse the HTML string
  const doc = parser.parseFromString(htmlString, "text/html");

  // Check if the body is empty
  return doc.body.innerHTML.trim() !== "";
}

export default useCheckHTMLBody