"use strict";

var express = require("express");
var reperController = require("../controllers/reperController");

var router = express.Router();

router.get("/test", reperController.test);
router.get("/getall/:value?", reperController.getAll);
router.get("/getone/:id", reperController.getOne);

router.post("/save", reperController.save);
router.put("/update/:id", reperController.update);
router.delete("/delete/:id", reperController.delete);
router.get("/search/:id", reperController.search);

module.exports = router;
