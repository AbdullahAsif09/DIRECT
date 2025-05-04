import axios from "axios";

export const handleImages = async (values) => {
  const aspects = [
    "objectives",
    "deliverables",
    "description",
    "methodology",
    "references",
    "physicalAspect",
    "performanceAspect",
    "compatibilityAspect",
    "enviromentalAspect",
    "specOfProduct",
    "logisticAspect",
    "fireHazard",
  ];

  const updatedValues = { ...values };

  for (let aspect of aspects) {
    const htmlContent = values[aspect];
    const imageUrls = extractImageUrls(htmlContent);

    if (imageUrls.length === 0) {
      continue;
    }

    try {
      // Map each URL to a promise that fetches the blob and converts it to base64
      const urlToBase64Map = await Promise.all(
        imageUrls.map(async (url) => {
          if (url.startsWith("blob:")) {
            try {
              const response = await axios.get(url, { responseType: "blob" });
              const base64Data = await blobToBase64(response.data);
              return { url, base64Data };
            } catch (err) {
              console.error(
                `Failed to fetch image from ${url}: ${err.message}`
              );
              return { url, base64Data: null };
            }
          } else {
            return { url, base64Data: null };
          }
        })
      );

      // Replace blob URLs in HTML content with base64 data URLs
      const updatedHtmlContent = replaceBlobsWithBase64(
        htmlContent,
        urlToBase64Map
      );
      updatedValues[aspect] = updatedHtmlContent;
    } catch (err) {
      console.error(
        `Error processing images for aspect ${aspect}: ${err.message}`
      );
    }
  }

  return updatedValues;
};

function extractImageUrls(htmlString) {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, "text/html");
  const imageElements = html.getElementsByTagName("img");
  const imageUrls = Array.from(imageElements).map((img) => img.src);
  return imageUrls;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function replaceBlobsWithBase64(htmlContent, urlToBase64Map) {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlContent, "text/html");
  const imageElements = html.getElementsByTagName("img");

  for (let img of imageElements) {
    const src = img.src;
    const matched = urlToBase64Map.find((entry) => entry.url === src);
    if (matched && matched.base64Data) {
      img.src = matched.base64Data;
    }
  }

  return html.documentElement.outerHTML;
}
