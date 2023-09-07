const testResponse = (req, res) => {
    res.json({ message: 'JWT payload:', payload: req.user });
  }

  module.exports = {
    testResponse,// Export the registerUser callback
  };