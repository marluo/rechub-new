const Joi = require("@hapi/joi");

const validateLogin = user => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .label("valid email plz")
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  });

  //vilket objekt som ska valideras, vilket schema, och abortEarly: false för säkerhetskull
  return Joi.validate(user, schema, { abortEarly: false });
};

module.exports = validateLogin;
