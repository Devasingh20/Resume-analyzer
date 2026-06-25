// const express = require("express");
// const Analysis = require("../models/Analysis");

// const router = express.Router();

// router.get("/:id", async (req, res) => {

//     try {

//         const analysis =
//             await Analysis.findById(
//                 req.params.id
//             );

//         res.json(analysis);

//     } catch (error) {

//         res.status(500).json({
//             message: error.message
//         });

//     }

// });


// const {

//     getAnalysis,

//     getAllAnalyses,

//     getUserAnalyses

// } = require(
//     "../controllers/analysisController"
// );

// router.get(
//     "/",
//     getAllAnalyses
// );
// router.get(
//     "/user/:userId",
//     getUserAnalyses
// );
// router.get(
//     "/:id",
//     getAnalysis
// );

// module.exports = router;


const express =
    require("express");

const router =
    express.Router();

const {

    getAnalysis,

    getAllAnalyses,

    getUserAnalyses,
    
    deleteAnalysis

} = require(
    "../controllers/analysisController"
);

router.get(
    "/",
    getAllAnalyses
);

router.get(
    "/user/:userId",
    getUserAnalyses
);

router.get(
    "/:id",
    getAnalysis
);
router.delete(
    "/:id",
    deleteAnalysis
);
module.exports =
    router;