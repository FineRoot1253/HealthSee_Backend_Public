const express = require("express");
const router = express.Router();

const loggingExercise = require("../../../lib/sequelize/training/loggingExercise");
const { checkOwnPlan } = require("../../../lib/check/plan");

router.post("/", checkOwnPlan, loggingExercise);

module.exports = router;
