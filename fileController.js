const multer = require("multer");
const path = require("path");
const admzip = require("adm-zip");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.applicantId + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("file");

const filesToZip = (req, res) => {
  var zip = new admzip();
  var zipName = Date.now() + "-" + req.body.applicant + ".zip";
  var outputFilePath = __dirname + "/public/uploads/" + zipName;
  if (req.files) {
    req.files.forEach((file) => {
      console.log(file.path);
      zip.addLocalFile(file.path);
    });
    fs.writeFileSync(outputFilePath, zip.toBuffer());
    console.log(outputFilePath);
    res.json({ zipPath: zipName });
  }
};

const zipDownload = (req, res) => {
  let zip = req.params.zipPath.trim();
  if (!zip) {
    res.end();
  } else {
    let zipPath = __dirname + `/public/uploads/${zip}`;
    console.log(zipPath);
    res.download(zipPath);
  }
};

module.exports = {
  upload,
  filesToZip,
  zipDownload,
};
