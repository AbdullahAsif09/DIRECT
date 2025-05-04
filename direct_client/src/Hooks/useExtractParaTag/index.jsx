import { useState, useEffect } from "react";

export const useExtractParaTag = (htmlString) => {
  const [firstPTag, setFirstPTag] = useState("");

  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    // Select all <p> elements
    const paragraphs = tempDiv.querySelectorAll("p");

    // Extract text content from <p> elements
    const textContents = Array.from(paragraphs).map((p) =>
      p.textContent.trim()
    );
    if (textContents) {
      setFirstPTag(textContents[0]);
    }
  }, [htmlString]);

  return firstPTag;
};
