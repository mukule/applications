const moment = require("moment");

const { db } = require("./dbconnection");
const applicationSubmitHandler = (req, res) => {
  console.log(req.body);
  const now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const {
    email,
    firstname,
    middlename,
    lastname,
    salutation_title,
    national_id,
    date_of_birth,
    home_county,
    sub_county,
    ward,
    location,
    sub_location,
    phone,
    postal_address,
    postal_code,
  } = req.body.data;

  let query = `INSERT INTO applicants(email,\
firstname,\
middlename,\
lastname,\
salutation_title,\
national_id,\
date_of_birth,\
home_county,\
sub_county,\
ward,\
location,\
sub_location,\
phone,\
postal_address,\
postal_code,\
timestamp) VALUES('${email}','${firstname}',\
'${middlename}',\
'${lastname}',\
'${salutation_title} ',\
'${national_id} ',\
'${date_of_birth} ',\
'${home_county} ',\
'${sub_county} ',\
'${ward} ',\
'${location} ',\
'${sub_location} ',\
'${phone} ',\
'${postal_address} ',\
'${postal_code} ',\
'${now}');`;
  console.log(req.body);
  //insert into the database
  console.info(now);
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result.insertId);
    res.json({ applicantId: result.insertId });
  });
};

const getAllApplications = (req, res) => {
  let query = `SELECT x.*,GROUP_CONCAT(y.award,' ',y.institution,' ',y.specialization SEPARATOR ', \n') AS certifications,\
GROUP_CONCAT(z.attainment,' ',z.institution,' ',z.specialization SEPARATOR ', \n') AS academic_qualifications \
FROM applicants x \
LEFT JOIN certifications y ON y.applicantId = x.applicant_id \
LEFT JOIN academic_qualifications z ON z.applicantId = x.applicant_id \
WHERE x.position_applied IS NOT NULL \
GROUP BY x.applicant_id ORDER BY x.timestamp DESC LIMIT ${req.params.limit};`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};
const getFullApplications = (req, res) => {
  let fineQuery = `SELECT x.*,GROUP_CONCAT(y.award,' ',y.institution,' ',y.specialization SEPARATOR '\n') AS certifications,\
GROUP_CONCAT(z.attainment,' ',z.institution,' ',z.specialization SEPARATOR '\n') AS academic_qualifications \
FROM applicants x \
LEFT JOIN certifications y ON y.applicantId = x.applicant_id \
LEFT JOIN academic_qualifications z ON z.applicantId = x.applicant_id \
WHERE x.position_applied IS NOT NULL \
GROUP BY x.applicant_id ORDER BY x.timestamp DESC;`;

  db.query(fineQuery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const getCustomApplications = (req, res) => {
  const { date, limit } = req.params;
  let query = `SELECT * FROM applicants where timestamp >= '${date}' order by timestamp desc limit ${limit};`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
};

const updateOtherPersonalDetails = (req, res) => {
  console.log("Other personal");
  if (!req.body.data.applicantId) {
    res.end();
  } else {
    const {
      applicantId,
      ethnicity,
      minority_group,
      plwd,
      disability_nature_APDK,
      referees,
      chapter6_compliance,
    } = req.body.data;
    let query = `UPDATE applicants SET ethnicity='${ethnicity}',chapter6_compliance='${chapter6_compliance}',referees='${referees}', minority_group='${minority_group}', plwd='${plwd}', disability_nature_APDK='${disability_nature_APDK}' WHERE applicant_id=${applicantId};`;
    db.query(query, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  }
};

const insertIntoAcademicQualifications = (req, res) => {
  console.log("Academic qualifications");
  const {
    applicantId,
    dateFrom,
    dateTo,
    institution,
    attainment,
    specialization,
  } = req.body.data;
  let query = `INSERT INTO academic_qualifications (applicantId,dateFrom, dateTo, institution, attainment, specialization) VALUES (?,?, ?, ?, ?,?);`;
  db.query(
    query,
    [applicantId, dateFrom, dateTo, institution, attainment, specialization],
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json(result);
    }
  );
};

const saveCertifications = (req, res) => {
  console.log(req.body.data);
  console.log("saving certifications");
  const { applicantId, dateFrom, dateTo, institution, award, specialization } =
    req.body.data;
  let query = `INSERT INTO certifications (applicantId,dateFrom, dateTo, institution, award, specialization) VALUES (?,?, ?, ?, ?,?);`;
  db.query(
    query,
    [applicantId, dateFrom, dateTo, institution, award, specialization],
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json(result);
    }
  );
};

const updateJobDetails = (req, res) => {
  console.log("update job details");
  console.log(req.body);
  const {
    employed,
    current_employer,
    professional_membership,
    membership_no,
    vacancy_no,
    position_applied,
    tsc_egistration_number,
    school_applied,
    healthcare_applied,
    applicantId,
  } = req.body.data;
  let query = `UPDATE applicants SET employed=?,current_employer=?,professional_membership=?,membership_no=?,vacancy_no=?, position_applied=?,tsc_egistration_number=?, school_applied=?, healthcare_applied=? WHERE applicant_id=?;`;
  db.query(
    query,
    [
      employed,
      current_employer,
      professional_membership,
      membership_no,
      vacancy_no,
      position_applied,
      tsc_egistration_number,
      school_applied,
      healthcare_applied,
      applicantId,
    ],
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json(result);
    }
  );
};

module.exports = {
  applicationSubmitHandler,
  getAllApplications,
  getCustomApplications,
  updateOtherPersonalDetails,
  insertIntoAcademicQualifications,
  updateJobDetails,
  saveCertifications,
  getFullApplications,
};
