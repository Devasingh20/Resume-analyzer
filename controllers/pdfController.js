const PDFDocument =
    require("pdfkit");

const Analysis =
    require("../models/Analysis");

const generatePDF =
    async (req, res) => {

        try {

            const analysis =
                await Analysis.findById(
                    req.params.id
                );

            if (!analysis) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Analysis not found"
                    });

            }

            const doc =
                new PDFDocument();

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );

            res.setHeader(
                "Content-Disposition",
                "attachment; filename=resume-report.pdf"
            );

            doc.pipe(res);

            doc
                .fontSize(24)
                .text(
                    "Resume Analysis Report",
                    {
                        align:
                            "center"
                    }
                );

            doc.moveDown();

            doc
                .fontSize(18)
                .text(
                    `ATS Score: ${analysis.atsScore}/100`
                );

            doc.moveDown();

            doc
                .fontSize(16)
                .text(
                    "Summary"
                );

            doc
                .fontSize(12)
                .text(
                    analysis.summary
                );

            doc.moveDown();

            doc
                .fontSize(16)
                .text("Technical Skills");

            doc.moveDown(0.5);

            const skillNames =
                analysis.skills
                    .map(
                        skill =>
                            skill.name
                    )
                    .join(" • ");

            doc
                .fontSize(12)
                .text(
                    skillNames
                );

            doc.moveDown();

            // Strengths

            doc.moveDown();

            doc
                .fontSize(16)
                .text("Strengths");

            doc.moveDown(0.5);

            const strengthsText =
                analysis.strengths.join(" • ");

            doc
                .fontSize(12)
                .text(
                    strengthsText
                );

            // Improvements

            doc.moveDown();

            doc
                .fontSize(16)
                .text(
                    "Areas for Improvement"
                );

            doc.moveDown(0.5);

            const improvementsText =
                analysis.improvements.join(" • ");

            doc
                .fontSize(12)
                .text(
                    improvementsText
                );

            // Recommended Roles

            doc.moveDown();

            doc
                .fontSize(16)
                .text(
                    "Recommended Roles"
                );

            doc.moveDown(0.5);

            const rolesText =
                analysis.recommendedRoles.join(" • ");

            doc
                .fontSize(12)
                .text(
                    rolesText
                );

            doc.moveDown();

            doc.end();

        } catch (error) {

            console.error(
                error
            );

            res
                .status(500)
                .json({
                    message:
                        error.message
                });

        }

    };

module.exports =
    generatePDF;