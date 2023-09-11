// Middleware to validate and convert units to metric system
function validateAndConvertUnits(req, res, next) {
    const { height, heightUnit, weight, weightUnit } = req.body;
  
    // Check if heightUnit and weightUnit are missing
    if (!heightUnit || !weightUnit) {
      return res.status(400).json({ error: 'Both heightUnit and weightUnit are required.' });
    }
  
    // Define conversion factors
    const heightConversionFactor = 2.54; // inches to centimeters
    const weightConversionFactor = 0.453592; // pounds to kilograms
  
    // Validate heightUnit
    if (!['inches', 'cm'].includes(heightUnit.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid heightUnit. Valid values are "inches" or "cm".' });
    }
  
    // Validate weightUnit
    if (!['lbs', 'kg'].includes(weightUnit.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid weightUnit. Valid values are "lbs" or "kg".' });
    }
  
    // Convert height to centimeters (if necessary)
    if (height && heightUnit.toLowerCase() === 'inches') {
      req.body.height = height * heightConversionFactor;
      req.body.heightUnit = 'cm'; // Change the unit to centimeters
    }
  
    // Convert weight to kilograms (if necessary)
    if (weight && weightUnit.toLowerCase() === 'lbs') {
      req.body.weight = weight * weightConversionFactor;
      req.body.weightUnit = 'kg'; // Change the unit to kilograms
    }
  
    // Call the next middleware or route handler
    next();
  }
  
  module.exports = validateAndConvertUnits;
  