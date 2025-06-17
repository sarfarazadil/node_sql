const db = require("../config/db");

// Insert a new school
exports.addSchool = (schoolData, callback) => {
  const { name, address, latitude, longitude } = schoolData;
  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(query, [name, address, latitude, longitude], callback);
};

// Get all schools
exports.getAllSchools = (callback) => {
  const query = "SELECT * FROM schools";
  db.query(query, callback);
};
