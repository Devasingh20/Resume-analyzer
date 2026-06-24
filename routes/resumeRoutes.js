// const express = require("express");
// const upload = require("../middleware/upload");

// const router = express.Router();

// router.post(
//     "/analyze",
//     upload.single("resume"),
//     (req, res) => {

//         console.log(req.file);
//         console.log("ROUTE HIT");

//         res.json({
//             message: "File uploaded successfully"
//         });

//     }
// );

// module.exports = router;

// const express = require("express");
// const upload = require("../middleware/upload");
// const {
//     analyzeResume
// } = require("../controllers/resumeController");

// const router = express.Router();


// router.post(
//     "/analyze",
//     upload.single("resume"),
//     (req, res) => {

//         console.log("ROUTE HIT");

//         if (!req.file) {
//             return res.status(400).json({
//                 message: "No file received"
//             });
//         }

//         console.log(req.file);

//         res.json({
//             message: "Upload success"
//         });

//     }
// );

// module.exports = router;

const express = require("express");
const upload = require("../middleware/upload");

const {
    analyzeResume
} = require("../controllers/resumeController");

const router = express.Router();

router.post(
    "/analyze",
    upload.single("resume"),
    analyzeResume
);

module.exports = router;