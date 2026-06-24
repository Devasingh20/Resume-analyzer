// const fs = require("fs");
// const pdfParse = require("pdf-parse");

// const analyzeResume = async (req, res) => {

//     try {

//         console.log("ROUTE HIT");

//         const pdfBuffer =
//             fs.readFileSync(req.file.path);

//         const data =
//             await pdfParse(pdfBuffer);

//         res.json({
//             success: true,
//             message: "Resume parsed successfully",
//             text: data.text
//         });

//     } catch (error) {

//         console.error("Resume Parse Error:", error);

//         res.status(500).json({
//             success: false,
//             message: "Error parsing resume"
//         });

//     }

// };

// module.exports = {
//     analyzeResume
// };


const fs = require("fs");
const pdfParse = require("pdf-parse");

const Analysis =
    require("../models/Analysis");

const analyzeResumeAI =
    require("../utils/gemini");

const analyzeResume = async (req, res) => {

    try {

        console.log("ROUTE HIT");

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message:
                    "No file uploaded"

            });

        }

        console.log(
            "FILE PATH:",
            req.file.path
        );

        const pdfBuffer =
            fs.readFileSync(
                req.file.path
            );

        console.log(
            "PDF Size:",
            pdfBuffer.length
        );

        console.log(
            "About to parse PDF..."
        );

        const data =
            await pdfParse(
                pdfBuffer
            );

        console.log(
            "PDF Parsed Successfully"
        );

        const resumeText =
            data.text;

        console.log(
            "Extracted Length:",
            resumeText.length
        );

        console.log(
            "EXTRACTED TEXT:"
        );

        console.log(
            resumeText
        );

        console.log(
            "Sending to Gemini..."
        );

        // const analysis =
        //     await analyzeResumeAI(
        //         resumeText
        //     );

        // console.log(
        //     "AI ANALYSIS:"
        // );

        // console.log(
        //     analysis
        // );

        // return res.json({

        //     success: true,

        //     analysis

        // });

        const analysis =
            await analyzeResumeAI(
                resumeText
            );

        console.log(
            "AI ANALYSIS:"
        );

        console.log(
            analysis
        );

        const cleanedAnalysis =
            analysis
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

        const parsedAnalysis =
            JSON.parse(
                cleanedAnalysis
            );

        const savedAnalysis =
            await Analysis.create({

                atsScore:
                    parsedAnalysis.atsScore,

                summary:
                    parsedAnalysis.summary,

                skills:
                    parsedAnalysis.skills,

                strengths:
                    parsedAnalysis.strengths,

                improvements:
                    parsedAnalysis.improvements,

                recommendedRoles:
                    parsedAnalysis.recommendedRoles,

                resumeText

            });

        return res.json({

            success: true,

            analysisId:
                savedAnalysis._id

        });

    } catch (error) {

        console.error(
            "RESUME CONTROLLER ERROR:"
        );

        console.error(
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};

module.exports = {
    analyzeResume
};