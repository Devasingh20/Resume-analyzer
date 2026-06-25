// const express = require("express");
// const connectDB = require("./config/db");
// // const authRoutes = require("./routes/authRoutes");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/authRoutes");
// const resumeRoutes = require("./routes/resumeRoutes");

// dotenv.config();
// // app.use("/api/auth", authRoutes);

// app.use("/api/resume", resumeRoutes);

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Database Connection
// connectDB();

// // Routes
// app.use("/api/auth", authRoutes);

// // Test Route
// app.get("/", (req, res) => {
//     res.send("Resume Analyzer Backend Running 🚀");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });
const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const pdfRoutes =
    require("./routes/pdfRoutes");
const analysisRoutes =
    require("./routes/analysisRoutes");
dotenv.config();
const profileRoutes =
    require("./routes/profileRoutes");

const app = express(); // ✅ Create app first

// Middleware
app.use(cors());
app.use(express.json());
app.use(
    express.static(
        path.join(
            __dirname,
            "public"
        )
    )
);

app.use((req, res, next) => {

    console.log(
        `${req.method} ${req.url}`
    );

    next();

});

// Database Connection
connectDB();

// Routes
app.use(
    "/api/analysis",
    analysisRoutes
);
app.use(
    "/api/pdf",
    pdfRoutes
);
app.use(
    "/api/analysis",
    analysisRoutes
);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use(

    "/api/profile",

    profileRoutes

);
// Test Route
app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );

});
const model =
    require("./utils/gemini");

// async function testGemini() {

//     const result =
//         await model.generateContent(
//             "Say Hello"
//         );

//     console.log(
//         result.response.text()
//     );

// }

// testGemini();
const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });

app.listen(
    PORT,
    "0.0.0.0",
    () => {
        console.log(
            `🚀 Server running on port ${PORT}`
        );
    }
);

