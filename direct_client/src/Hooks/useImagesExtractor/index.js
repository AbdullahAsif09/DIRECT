import { useState } from "react";
import { useEffect } from "react";
export function useImagesExtractor(htmlString) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const parser = new DOMParser();
    const html = parser.parseFromString(htmlString, "text/html");
    const imageElements = html.getElementsByTagName("img");
    const urls = Array.from(imageElements).map((img) => img.src);
    setImageUrls(urls);
  }, [htmlString]);

  return imageUrls;
}
