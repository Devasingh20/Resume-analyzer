const mongoose = require("mongoose");

const analysisSchema =
    new mongoose.Schema({

        atsScore: Number,

        summary: String,

        skills: [
            {
                name: String,
                score: Number
            }
        ],

        strengths: [String],

        improvements: [String],

        recommendedRoles: [String],

        resumeText: String,

        createdAt: {
            type: Date,
            default: Date.now
        }

    });

module.exports =
    mongoose.model(
        "Analysis",
        analysisSchema
    );