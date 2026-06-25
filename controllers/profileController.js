const User = require("../models/User");
const Analysis = require("../models/Analysis");

const getProfile = async (req, res) => {

    try {

        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        const reports =
            await Analysis.find({

                userId

            });

        const totalReports =
            reports.length;

        let averageATS = 0;

        let highestATS = 0;

        if (totalReports > 0) {

            const totalScore =
                reports.reduce(

                    (sum, report) =>

                        sum + report.atsScore,

                    0

                );

            averageATS =
                Math.round(

                    totalScore /
                    totalReports

                );

            highestATS =
                Math.max(

                    ...reports.map(

                        report =>
                            report.atsScore

                    )

                );

        }

        res.json({

            username:
                user.username,

            email:
                user.email,

            joinedDate:
                user.createdAt,

            totalReports,

            averageATS,

            highestATS

        });

    }

    catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

};

module.exports = {

    getProfile

};