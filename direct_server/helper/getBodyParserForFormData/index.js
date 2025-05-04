exports.getBodyParserForFormData = (req) => {
  const body = req.body;

  Object.keys(body).forEach((field) => {
    const fieldValue = body[field];

    try {
      // Attempt to parse the field value as JSON
      req.body[field] = JSON.parse(fieldValue);
    } catch (error) {
      // If parsing fails, keep the original value
      req.body[field] = fieldValue;
    }
  });
};
