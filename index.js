require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { db } = require("./dbconnection");
const cors = require("cors");
const {
  applicationSubmitHandler,
  getAllApplications,
  getCustomApplications,
  updateOtherPersonalDetails,
  insertIntoAcademicQualifications,
  updateJobDetails,
  saveCertifications,
  getFullApplications,
} = require("./application");
const { upload, zipDownload, filesToZip } = require("./fileController");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//db connection
db.getConnection((err) => {
  if (err) throw err;
  console.log("db connected");
});

//saving applications
app.post("/personal-data", applicationSubmitHandler);

app.post("/other-personal-data", updateOtherPersonalDetails);

app.post("/academic-qualifications", insertIntoAcademicQualifications);
app.get("/academic-qualifications/:applicantId", (req, res) => {
  let query = `SELECT * FROM academic_qualifications WHERE applicantId =${req.params.applicantId};`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get(`/me`, (req, res) => {
  res.json({ me: "Its working" });
});

app.post("/certifications", saveCertifications);

app.get("/getcertif/:applicantId", (req, res) => {
  let q = `SELECT * FROM certifications WHERE applicantId =${req.params.applicantId};`;
  db.query(q, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

app.post("/job-details", updateJobDetails);

//handles file uploads and downloads
app.post("/upload", upload, (req, res) => {
  console.log(req.file.filename);
  if (!req.body.applicantId) {
    res.status(200).end();
  } else {
    console.log(req.body.applicantId);
    let q = `UPDATE applicants SET upload ='${req.file.filename}' WHERE applicant_id=${req.body.applicantId};`;
    db.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    });
  }
});
app.get(`/download-zip/:zipPath`, zipDownload);

//fetching applications
app.get("/applications/:limit", getAllApplications);
app.get("/full", getFullApplications);
app.get("/filter-applications/:date/:limit", getCustomApplications);

//Captures unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

//Server listenning 5000
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server started on port", port);
});
