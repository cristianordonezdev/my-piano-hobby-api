"use strict";

const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

router.get("/test", controller.test);
router.get("/get-all", controller.getAll);

// router.get("/getall/:value?", reperController.getAll);
// router.get("/getone/:id", reperController.getOne);
router.post('/add-one', controller.addOne);
// router.post("/save", reperController.save);
// router.put("/update/:id", reperController.update);
// router.delete("/delete/:id", reperController.delete);
// router.get("/search/:id", reperController.search);

module.exports = router;
