module.exports.validateAndConvertUnits = (req, res, next) => {
  const { height, weight, heightUnit, weightUnit } = req.body;

  // Check if the height unit is required.
  if (height && !heightUnit) {
    return res.status(400).json({ error: "Height unit is required" });
  }

  // Check if the weight unit is required.
  if (weight && !weightUnit) {
    return res.status(400).json({ error: "Weight unit is required" });
  }

  // Convert the height unit if necessary.
  let convertedHeight = height;
  if (heightUnit === "ft") {
    // Split the height into feet and inches if it contains a single quote (')
    const heightParts = height.split("'");
    if (heightParts.length === 2) {
      const feet = parseFloat(heightParts[0]);
      const inches = parseFloat(heightParts[1]);
      if (!isNaN(feet) && !isNaN(inches)) {
        // Convert feet and inches to cm (1 foot = 30.48 cm, 1 inch = 2.54 cm)
        convertedHeight = feet * 30.48 + inches * 2.54;
      } else {
        return res.status(400).json({ error: "Invalid height format for feet and inches" });
      }
    } else {
      return res.status(400).json({ error: "Both feet and inches are required for height in feet" });
    }
  }

  // Convert the weight unit if necessary.
  let convertedWeight = weight;
  if (weightUnit === "lb") {
    convertedWeight = weight * 0.45359237;
  }

  // Update the height and weight in the request object.
  req.body.height = convertedHeight;
  req.body.weight = convertedWeight;

  // Remove the height unit and weight unit from the request object.
  delete req.body.heightUnit;
  delete req.body.weightUnit;

  next();
}

// Example of how to use the validateAndConvertUnits middleware in a route handler:
// app.post("/signup", (req, res, next) => {
//   validateAndConvertUnits(req, res, (error) => {
//     if (error) {
//       return next(error);
//     }
//     // Your route handling logic here
//   });
// });
