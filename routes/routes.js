"use strict";

const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();
const upload = require('../middlewares/multer');


router.get("/test", controller.test);
router.get("/get-all", controller.getAll);

// router.get("/getall/:value?", reperController.getAll);
// router.get("/getone/:id", reperController.getOne);
router.post('/add-one', upload.single('file'), controller.addOne);
router.put('/edit-one', controller.editOne);

// router.post("/save", reperController.save);
// router.put("/update/:id", reperController.update);
router.delete("/delete-one/:uuid", controller.deleteOne);
router.post("/stadistic", controller.estadistic);
// router.get("/search/:id", reperController.search);

module.exports = router;
