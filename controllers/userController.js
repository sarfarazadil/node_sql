const School = require("../models/userModel");

exports.ping = (req, res) => {
  //   console.log("Ping received");
  res.status(200).json({ message: "Server is running" });
};

// Add a new school
exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validation
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res
      .status(400)
      .json({ message: "Latitude and Longitude must be numbers" });
  }

  School.addSchool({ name, address, latitude, longitude }, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });
    res
      .status(201)
      .json({ message: "School added successfully", id: result.insertId });
  });
};

// List schools sorted by proximity
exports.listSchools = (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLong = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLong)) {
    return res.status(400).json({
      message:
        "Latitude and Longitude query params are required and must be numbers",
    });
  }

  School.getAllSchools((err, results) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });

    // Haversine formula to calculate distance
    const schoolsWithDistance = results.map((school) => {
      const distance = getDistance(
        userLat,
        userLong,
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    });

    // Sort by distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(schoolsWithDistance);
  });
};

// Haversine distance calculation
function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
