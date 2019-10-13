const Joi = require("@hapi/joi");

const validateUser = user => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .error(() => "Enter a valid email"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{6,30}$/)
      .required()
      .error(() => "Password must be between 6-30 characters"),
    role: Joi.any()
      .valid("prospect", "recruiter")
      .label("Only worker or recruiter is valid")
      .required()
      .error(() => "Please make sure you've picked a role"),
    firstName: Joi.string()
      .regex(/^[a-zA-Z]{3,30}$/)
      .required()
      .error(() => "Please enter a First Name between 3-30 characters"),
    lastName: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(() => "Please enter a Last Name between 3-30 characters"),
    username: Joi.string()
      .regex(/^[a-zA-Z0-9]{5,16}$/)
      .required()
      .error(() => "Can only be between 5-16 letters and no special characters")
  });

  //vilket objekt som ska valideras, vilket schema, och abortEarly: false för säkerhetskull
  return Joi.validate(user, schema, { abortEarly: false });
};

module.exports = validateUser;
