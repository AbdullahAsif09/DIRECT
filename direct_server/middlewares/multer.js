const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { throwError } = require("../helper/throwError");

const upload = multer({ storage: multer.memoryStorage() });
/* for memory storage, without saving data inside server directories */
exports.uploadSingleMiddleware = upload.single("image");
exports.uploadSingleFileMiddleware = upload.single("file");

/* for memory storage, uploading multiple files with type */
exports.uploadMultiFilesMiddleware = (req, res, callback) => {
  upload.array("files")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred
      return res
        .status(400)
        .json({ message: "Multer error occurred", error: err });
    } else if (err) {
      // An unknown error occurred
      return res
        .status(500)
        .json({ message: "Unknown error occurred", error: err });
    }

    // Process each file
    req.uploadedFiles = req.files.map((file) => {
      // Determine the file type
      const fileType = getFileType(file);
      return { file: file, type: fileType };
    });

    callback(err);
  });
};

/* base urls */
const USR = "./uploads/USR/";

/* multer with disk storage */
exports.uploadDiskStorage = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!file) return;

      const destination = USR;
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }

      cb(null, destination);
    },
    filename: (req, file, cb) => {
      if (!file) return;
      const filename = new Date().getTime() + file.originalname;
      cb(null, filename);
    },
  });

  const upload = multer({ storage }).array("files");

  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }

    if (req.files && req.files.length > 0) {
      req.uploadedFiles = req.files.map((file) => {
        const filePath = path.join(USR, file.filename);
        const fileSize = fs.statSync(filePath).size;
        return {
          file: `uploads/USR/${file.filename}`,
          size: fileSize,
          originalname: file.originalname,
        };
      });
    }

    next();
  });
};

/* Function to determine file type */
const getFileType = (file) => {
  if (file.mimetype.startsWith("image")) {
    return "image";
  } else if (file.mimetype.startsWith("video")) {
    return "video";
  } else {
    const split = file.mimetype.split("/")[0];
    return split;
  }
};

exports.saveFileToDisk = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!file) return;

      const destination = `uploads/${req.destination}/`;
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }

      cb(null, destination);
    },
    filename: (req, file, cb) => {
      if (!file) return;
      const filename = new Date().getTime() + file.originalname;
      cb(null, filename);
    },
  });

  const upload = multer({ storage }).single(req.fileName ?? "file");

  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }

    if (req.file) {
      req.image = `uploads/${req.destination}/${file.filename}`;
      next();
    } else throwError("No file uploaded", 400);
  });
};
