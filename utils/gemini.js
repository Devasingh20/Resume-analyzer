// const { GoogleGenerativeAI } =
//     require("@google/generative-ai");

// const genAI =
//     new GoogleGenerativeAI(
//         process.env.GEMINI_API_KEY
//     );

// const model =
//     genAI.getGenerativeModel({
//         model: "gemini-1.5-flash"
//     });
//Analyze this resume and return ONLY valid JSON.
// module.exports = model;



const axios = require("axios");

async function analyzeResumeAI(
    resumeText
) {

    try {

        const prompt = `
You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter with 15+ years of experience in talent acquisition, resume screening, and career coaching.

Your task is to analyze the resume and provide a professional ATS evaluation similar to what leading organizations and recruitment platforms use.

Evaluation Criteria:

1. Contact Information (10%)
   - Email
   - Phone Number
   - LinkedIn
   - GitHub/Portfolio

2. Professional Summary (10%)
   - Clarity
   - Relevance
   - Impact

3. Skills Section (15%)
   - Technical Skills
   - Tools & Technologies
   - Industry Relevance

4. Work Experience (25%)
   - Relevant Experience
   - Achievements
   - Quantifiable Results
   - Responsibilities

5. Projects (15%)
   - Technical Complexity
   - Business Impact
   - Technologies Used

6. Education (10%)
   - Degree
   - Institution
   - Academic Relevance

7. Certifications & Achievements (5%)

8. ATS Optimization (10%)
   - Keyword Matching
   - Formatting
   - Readability
   - Section Structure

Instructions:

- Be strict and objective.
- Do not inflate scores.
- ATS Score must be between 0 and 100.
- Explain score deductions.
- Recommend only realistic job roles based on the resume.
- Recommend junior roles if experience is missing.
- Do not recommend senior positions unless evidence exists.
- Return exactly 5 improvement suggestions.
- Return exactly 5 strengths if available.
- Return valid JSON only.
- Do not return markdown.
- Do not return explanations outside JSON.
-For each skill provide a score between 0 and 100.

{
  "atsScore": 0,
  "summary": "",
  "skills": [
    {
      "name":"",
      "score":0
    }
  ],
  "strengths": [],
  "improvements": [],
  "recommendedRoles": []
}

Resume:

${resumeText}
`;

        const response =
            await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                },
                {
                    timeout: 120000
                }
            );

        const result =
            response.data
                .candidates[0]
                .content
                .parts[0]
                .text;

        return result;

    } catch (error) {

        console.log(
            "\n========== GEMINI ERROR =========="
        );

        if (
            error.response
        ) {

            console.log(
                "Status:",
                error.response.status
            );

            console.log(
                "Data:"
            );

            console.dir(
                error.response.data,
                {
                    depth: null
                }
            );

        } else {

            console.log(
                error.message
            );

        }

        console.log(
            "==================================\n"
        );

        throw error;

    }

}

module.exports =
    analyzeResumeAI;