exports.checkPasswordValidity = (password) => {
  if (!password) {
    return { isValid: false, failedRequirements: ["Password cannot be empty"] };
  }
  const requirements = [
    { regex: /[a-z]/, message: "at least one lowercase letter" },
    { regex: /[A-Z]/, message: "at least one uppercase letter" },
    { regex: /\d/, message: "at least one digit" },
    { regex: /.{8,}/, message: "minimum length of 8 characters" },
  ];

  const failedRequirements = requirements
    .filter((req) => !req.regex.test(password))
    .map((req) => req.message);

  return {
    isValid: failedRequirements.length === 0,
    failedRequirements,
  };
};
