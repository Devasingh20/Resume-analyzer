const express = require("express");
const Analysis = require("../models/Analysis");

const router = express.Router();

router.get("/:id", async (req, res) => {

    try {

        const analysis =
            await Analysis.findById(
                req.params.id
            );

        res.json(analysis);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


const {

    getAnalysis,

    getAllAnalyses

} = require(
    "../controllers/analysisController"
);

router.get(
    "/",
    getAllAnalyses
);

router.get(
    "/:id",
    getAnalysis
);
module.exports = router;