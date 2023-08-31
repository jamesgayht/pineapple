const Joi = require("joi");

const userValidator = {
  register: Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().max(100).email().required(),
    password: Joi.string().min(6).max(30).required(),
  }),

  loginSchema: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  
  summarySchema: Joi.object({
    userID: Joi.string().required(),
    title: Joi.string().required(),
    episode: Joi.string().required(),
    summary: Joi.string().required(),
  }),
};

module.exports = userValidator;
