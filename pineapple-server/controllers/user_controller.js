require("dotenv").config();
const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userValidator = require("./validators/user_validator");
const summaryModel = require("../models/summary_model");

const userController = {
  register: async (req, res) => {
    const data = req.body;
    const validationResult = userValidator.register.validate(data);

    if (validationResult.error)
      return res.status(400).json({
        msg: validationResult.error,
      });

    // search for any existing user with same email,
    // return err if so
    try {
      const user = await userModel.findOne({ email: data.email });

      if (user)
        return res
          .status(400)
          .json({ msg: "This user already exist, please try again" });
    } catch (error) {
      console.error("check user exist error: ", error);
      return res.status(500).json({
        msg: "An error occured while checking for duplicates, please try again later",
      });
    }

    // apply hashing algo (bcrypt) to the given password
    const hash = await bcrypt.hash(data.password, 10);

    // create a new user
    try {
      await userModel.create({
        name: data.name,
        email: data.email,
        password: hash,
      });

      return res
        .status(200)
        .json({ msg: `user ${data.email} created successfully` });
    } catch (error) {
      console.error("create user error: ", error);
      return res.status(500).json({
        msg: "an error occured while creating the new user, please try again",
      });
    }
  },

  login: async (req, res) => {
    const data = req.body;
    const validationResult = userValidator.loginSchema.validate(data);

    if (validationResult.error)
      return res
        .status(400)
        .json({ msg: validationResult.error.details[0].message });

    // find if user exists by the email
    let user = null;
    try {
      user = await userModel.findOne({ email: data.email });
    } catch (error) {
      return res.status(500).json({ msg: "Error occured when fetching user" });
    }

    if (!user)
      return res.status(401).json({ msg: "Login failed, please try again" });

    // use bcrypt to compare given password against DB record
    const validLogin = await bcrypt.compare(data.password, user.password);

    if (!validLogin)
      return res
        .status(401)
        .json({ msg: "Invalid username or password, please try again" });

    // generate jwt using external library
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.APP_KEY,
      {
        expiresIn: "10 days",
        audience: "FE",
        issuer: "BE",
        subject: user._id.toString(), //_id from mongoose is of type ObjectID
      }
    );

    // return response with JWT
    res.json({
      msg: `${user.name} login success`,
      token: token,
    });
  },

  saveSummary: async (req, res) => {
    const data = req.body;
    const userID = res.locals.authUserID;
    const summaryInput = { ...data, userID: userID };

    const validationResult = userValidator.summarySchema.validate(summaryInput);
    if (validationResult.error)
      return res.status(400).json({ msg: validationResult.error });

    try {
      const summaryRecord = await summaryModel.create({
        userID: summaryInput.userID,
        title: summaryInput.title,
        episode: summaryInput.episode,
        summary: summaryInput.summary,
      });
      return res.status(201).json({ msg: "summary created successfully" });
    } catch (error) {
      console.error(">>> error creating summary: ", error);
      return res.status(400).json({
        msg: "error occured while creating summary, please try again",
      });
    }
  },

  listSummaries: async (req, res) => {
    const userID = res.locals.authUserID;

    try {
      const summaries = await summaryModel.find({ userID: userID });
      return res.status(200).json({ summaries: summaries });
    } catch (error) {
      console.error(">>> error getting summaries: ", error);
      return res
        .status(400)
        .json({
          msg: "error occured while retrieving summaries, please try again",
        });
    }
  },
};

module.exports = userController;
