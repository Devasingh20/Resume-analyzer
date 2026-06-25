


const fs = require("fs");
const pdfParse = require("pdf-parse");

const Analysis =
    require("../models/Analysis");

const analyzeResumeAI =
    require("../utils/gemini");

const analyzeResume = async (req, res) => {

    try {

        // console.log("ROUTE HIT");

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

        // console.log(
        //     "PDF Size:",
        //     pdfBuffer.length
        // );

        // console.log(
        //     "About to parse PDF..."
        // );

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
        // const parsedAnalysis = {

        //     atsScore: 80,

        //     summary: "Test Summary",

        //     skills: [

        //         {
        //             name: "Java",
        //             score: 90
        //         }

        //     ],

        //     strengths: [

        //         "Problem Solving"

        //     ],

        //     improvements: [

        //         "Add Projects"

        //     ],

        //     recommendedRoles: [

        //         "Software Engineer"

        //     ]

        // };
        const savedAnalysis =
            await Analysis.create({
                userId:
                    req.body.userId,

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