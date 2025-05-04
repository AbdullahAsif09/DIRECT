const multer = require("multer");
const fs = require("fs");
const path = require("path");
const baseProjectsImage = "asset/projects/";
const baseProjects = "uploads/projects/";
var storageProjectsImage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!file) return;

    const destination = baseProjectsImage + req.id;
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    cb(null, destination);
  },
  filename: function (req, file, cb) {
    if (!file) return;

    if (file) {
      const mimetype = file.mimetype;
      const extension = mimetype.slice(
        mimetype.indexOf("/") + 1,
        mimetype.length
      );
      var filename = "Profile" + "." + extension;

      req.body.image = baseProjectsImage + req.id + "/" + filename;
      cb(null, filename);
    }
  },
});

exports.uploadProjectImage = multer({ storage: storageProjectsImage });

var storageProjectsAwardedContract = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file, "file");
    if (!file) return;

    const destination = baseProjects + req.id + "/AwaredContract/";
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    cb(null, destination);
  },
  filename: function (req, file, cb) {
    if (!file) return;

    if (file) {
      const filename = file.originalname;
      req.body.image = {
        url: baseProjects + req.id + "/AwaredContract/" + filename,
        name: filename,
      };
      cb(null, filename);
    }
  },
});

exports.uploadAwardedContract = multer({
  storage: storageProjectsAwardedContract,
});

var storageProjectsFinalContract = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file, "file");
    if (!file) return;

    const destination = baseProjects + req.id + "/FinalContract/";
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    cb(null, destination);
  },
  filename: function (req, file, cb) {
    if (!file) return;

    if (file) {
      const filename = file.originalname;
      req.body.image = {
        url: baseProjects + req.id + "/FinalContract/" + filename,
        name: filename,
      };
      cb(null, filename);
    }
  },
});

exports.uploadFinalContract = multer({
  storage: storageProjectsFinalContract,
});

const storageMultiDocsProjects = multer.diskStorage({
  destination: function (req, file, cb) {
    const reqId = req?.id || req?.query?.reqId;
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
    const reqId = req?.id || req?.body?.reqId;
    const filename = file.originalname;
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

exports.uploadMultiDocs = multer({ storage: storageMultiDocsProjects });

// Middleware function to handle file uploads

exports.multerError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err);
    res.status(500).send("An error occurred during file upload.");
  } else {
    next(err);
  }
};
