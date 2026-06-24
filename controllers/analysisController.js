const Analysis =
    require("../models/Analysis");

const getAnalysis =
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

            res.json(
                analysis
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }

    };

const getAllAnalyses =
    async (req, res) => {

        try {

            const analyses =
                await Analysis
                    .find()
                    .sort({
                        createdAt: -1
                    });

            res.json(
                analyses
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }

    };

module.exports = {

    getAnalysis,

    getAllAnalyses

};