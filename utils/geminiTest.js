const axios = require("axios");
require("dotenv").config();

async function testGemini() {

    try {

        const response =
            await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: "Say Hello"
                                }
                            ]
                        }
                    ]
                }
            );

        console.log(
            response.data
        );

    } catch (error) {

        console.log(
            error.response?.data ||
            error.message
        );

    }

}

testGemini();