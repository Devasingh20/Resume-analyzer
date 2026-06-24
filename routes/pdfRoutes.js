const express = require("express");

const router = express.Router();

const generatePDF =
    require("../controllers/pdfController");

router.get(
    "/:id",
    generatePDF
);

module.exports =
    router;