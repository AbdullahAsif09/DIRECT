exports.InvalidRoute = (req, res) => {
  return res.json({ type: "failure", result: "Invalid Route" });
};
