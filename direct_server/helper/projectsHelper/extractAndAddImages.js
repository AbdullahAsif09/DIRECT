const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

exports.processHtmlFields = async (body, req) => {
  const htmlFields = [
    "fireHazard",
    "objectives",
    "references",
    "methodology",
    "description",
    "deliverables",
    "specOfProduct",
    "physicalAspect",
    "logisticAspect",
    "performanceAspect",
    "enviromentalAspect",
    "compatibilityAspect",
  ];

  for (const field in body) {
    if (htmlFields.includes(field) && typeof body[field] === "string") {
      const htmlContent = body[field];
      const $ = cheerio.load(htmlContent);
      const imgPromises = [];

      // Process each image in the HTML content
      $("img").each(function () {
        const img = $(this);
        const src = img.attr("src");

        if (src.startsWith("data:")) {
          // Extract base64 data and convert to a Buffer
          const base64Data = src.split(",")[1];
          const buffer = Buffer.from(base64Data, "base64");

          // Save the image to the server and replace the src with the new URL
          const uploadPromise = saveImageToServer(req, buffer).then(
            (imageUrl) => {
              img.attr("src", imageUrl);
            }
          );

          imgPromises.push(uploadPromise);
        }
      });

      // Wait for all images to be processed
      await Promise.all(imgPromises);

      // Update the HTML field with the processed content
      body[field] = $.html();
    }
  }

  return body;
};

// Function to save the image to the server and return its URL

// Function to save the image to the server and return its URL
async function saveImageToServer(req, buffer) {
  const reqId = req?.id || req?.body?.reqId;
  const destination = path.join("uploads", "projects", reqId, "editorImages");

  // Ensure the destination directory exists
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Create a unique filename for the image
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}.png`;

  // Define the path where the image will be saved
  const imagePath = path.join(destination, fileName);

  // Save the file to the server's filesystem
  await fs.promises.writeFile(imagePath, buffer);

  // Generate a URL for the saved image (e.g., serving from /uploads/projects/...)
  const url = process.env.HOSTURL_PROD;
  // const url =
  //   process.env.NODE_ENV === "development" || !process.env.NODE_ENV
  //     ? process.env.HOSTURL_LOCAL
  //     : process.env.HOSTURL_PROD;
  const imageUrl = `${url}/${destination.replace(/\\/g, "/")}/${fileName}`;

  return imageUrl;
}
exports.processHtmlFieldsForProposals = async (
  body,
  req,
  htmlFields,
  reqId
) => {
  console.log(body)
  console.log(htmlFields)
  console.log(reqId)
  const htmlFieldsProposals = Object.entries(htmlFields).map(
    ([key, value]) => key
  );
  console.log(htmlFieldsProposals);
  for (const field in body) {
    if (
      htmlFieldsProposals.includes(field) &&
      typeof body[field] === "string"
    ) {
      const htmlContent = body[field];
      const $ = cheerio.load(htmlContent);
      const imgPromises = [];

      // Process each image in the HTML content
      $("img").each(function () {
        const img = $(this);
        const src = img.attr("src");

        if (src.startsWith("data:")) {
          // Extract base64 data and convert to a Buffer
          const base64Data = src.split(",")[1];
          const buffer = Buffer.from(base64Data, "base64");

          // Save the image to the server and replace the src with the new URL
          const uploadPromise = saveImageProposalToServer(
            req,
            buffer,
            reqId
          ).then((imageUrl) => {
            img.attr("src", imageUrl);
          });

          imgPromises.push(uploadPromise);
        }
      });

      // Wait for all images to be processed
      await Promise.all(imgPromises);

      // Update the HTML field with the processed content
      body[field] = $.html();
    }
  }

  return body;
};


// Function to save the image to the server and return its URL
async function saveImageProposalToServer(req, buffer, reqId) {
  console.log(reqId,"reqId")
  const destination = path.join("uploads", "proposal", reqId, "editorImages");

  // Ensure the destination directory exists
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Create a unique filename for the image
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}.png`;

  // Define the path where the image will be saved
  const imagePath = path.join(destination, fileName);

  // Save the file to the server's filesystem
  await fs.promises.writeFile(imagePath, buffer);

  // Generate a URL for the saved image (e.g., serving from /uploads/projects/...)
  const url = process.env.HOSTURL_PROD;
  // const url =
  //   process.env.NODE_ENV === "development" || !process.env.NODE_ENV
  //     ? process.env.HOSTURL_LOCAL
  //     : process.env.HOSTURL_PROD;
  const imageUrl = `${url}/${destination.replace(/\\/g, "/")}/${fileName}`;

  return imageUrl;
}
