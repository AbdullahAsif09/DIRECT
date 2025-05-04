const multer = require("multer");
const fs = require("fs");
const baseProjects = "uploads/proposal/";
const storageMultiDocsProposal = multer.diskStorage({
  destination: function (req, file, cb) {
    const reqId = req?.id;
    if (!reqId) {
      return cb(new Error("Request ID not found"));
    }
    let destination;
    if (file.fieldname === "image") {
      destination = `${baseProjects}${reqId}/images`;
    } else if (file.fieldname === "document") {
      destination = `${baseProjects}/${reqId}/documents`;
    }

    // Create the directory if it doesn't exist
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    // Return the destination directory
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const reqId = req?.id;
    const filename = file.originalname;
    console.log("filename", filename);
    const destinationImage = `${baseProjects}/${reqId}/images`;
    const destinationDocs = `${baseProjects}/${reqId}/documents`;
    if (file.fieldname === "image") {
      if (!fs.existsSync(destinationImage)) {
        fs.mkdirSync(destinationImage, { recursive: true });
      }
      req.images = req.images || [];
      req.images.push(`uploads/projects/${reqId}/images/${filename}`);
      cb(null, filename);
    } else if (file.fieldname === "document") {
      if (!fs.existsSync(destinationDocs)) {
        fs.mkdirSync(destinationDocs, { recursive: true });
      }
      req.documents = req.documents || [];
      req.documents.push({
        path: `uploads/projects/${reqId}/documents/${filename}`,
        name: filename,
      });
      cb(null, filename);
    }
  },
});

exports.uploadMultiDocs = multer({
  storage: storageMultiDocsProposal,
  limits: {
    fieldSize: 1024 * 1024 * 10, // Field value size limit (in bytes)
  },
});
