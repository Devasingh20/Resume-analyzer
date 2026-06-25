

// ==========================
// USER INFO



// ==========================
let selectedFile = null;
const user = JSON.parse(
    localStorage.getItem("user")
);

if (user && user.username) {

    document.querySelector(".userName").innerHTML = `

            <div class="user-badge">

                <span>
                    <i class="fa-solid fa-user"></i>
                    Hello, ${user.username}
                </span>

            </div>

        `;
}

// ==========================
// ELEMENTS
// ==========================

const input =
    document.getElementById("resumeInput");

const preview =
    document.getElementById("filePreview");

const dropZone =
    document.querySelector(".drop-zone");

// ==========================
// FILE VALIDATION FUNCTION
// ==========================

function handleFile(file) {
    selectedFile = file;
    if (!file) return;

    if (
        !file.name
            .toLowerCase()
            .endsWith(".pdf")
    ) {

        showNoty(
            "error",
            "Please upload a PDF file only"
        );

        input.value = "";

        preview.innerHTML =
            "No file selected";

        return;
    }

    preview.innerHTML = `

            <i class="fa-solid fa-file-pdf"></i>

            <span>${file.name}</span>

        `;

    showNoty(
        "success",
        "Resume selected successfully"
    );

}

// ==========================
// NORMAL FILE SELECT
// ==========================

input.addEventListener("change", () => {

    const file =
        input.files[0];

    handleFile(file);

});

// ==========================
// DRAG & DROP
// ==========================

[
    "dragenter",
    "dragover",
    "dragleave",
    "drop"
].forEach(eventName => {

    dropZone.addEventListener(
        eventName,
        preventDefaults,
        false
    );

});

function preventDefaults(e) {

    e.preventDefault();

    e.stopPropagation();

}

// ==========================
// HIGHLIGHT DROP AREA
// ==========================

["dragenter", "dragover"]
    .forEach(eventName => {

        dropZone.addEventListener(
            eventName,
            () => {

                dropZone.classList.add(
                    "drag-active"
                );

            }
        );

    });

["dragleave", "drop"]
    .forEach(eventName => {

        dropZone.addEventListener(
            eventName,
            () => {

                dropZone.classList.remove(
                    "drag-active"
                );

            }
        );

    });

// ==========================
// HANDLE FILE DROP
// ==========================

dropZone.addEventListener(
    "drop",
    (e) => {

        const file =
            e.dataTransfer.files[0];

        if (!file) return;

        handleFile(file);

    }
);

// ==========================
// FORM SUBMIT
// ==========================
// const file = selectedFile;
document
    .getElementById("uploadForm")
    .addEventListener("submit", async (e) => {

        e.preventDefault();
        console.log("Form submit intercepted");

        const file = selectedFile;

        if (!file) {

            showNoty(
                "error",
                "Please select a resume"
            );

            return;
        }

        const formData = new FormData();

        formData.append(
            "resume",
            file
        );
        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            );

        formData.append(
            "userId",
            user.id
        );
        try {

            // console.log("Before fetch");
            const btn =
                document.querySelector(
                    ".analyze-btn"
                );

            btn.disabled = true;

            btn.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin"></i>
    Analyzing Resume...
`;
            const response =
                await fetch(
                    "/api/resume/analyze",
                    {
                        method: "POST",
                        body: formData
                    }
                );

            // console.log("After fetch");

            const data =
                await response.json();

            console.log(
                "FULL RESPONSE:",
                data
            );

            // alert(
            //     data.analysisId
            // );

            if (
                data.analysisId
            ) {

                window.location.href =
                    `./dashboard.html?id=${data.analysisId}`;

            }

            alert(JSON.stringify(data));
            console.log(data);

        } catch (error) {

            console.error(
                "FETCH ERROR:",
                error
            );

            // alert(error.message);



        }
    });


// document
// .getElementById("uploadForm")
// .addEventListener("submit", async (e) => {

//     e.preventDefault();
//     console.log("Form submit intercepted");

//     const file = selectedFile;

//     if (!file) {

//         showNoty(
//             "error",
//             "Please select a resume"
//         );

//         return;
//     }

//     const formData = new FormData();

//     formData.append(
//         "resume",
//         file
//     );

//     try {

//         console.log("STEP 1");

//         const response =
//             await fetch(
//                 "http://172.20.10.5:5000/api/resume/analyze",
//                 {
//                     method: "POST",
//                     body: formData
//                 }
//             );

//         console.log("STEP 2");

//         const data =
//             await response.json();

//         console.log("STEP 3");

//         console.log(data);

//         alert("STEP 4");

//         if (data.analysisId) {

//             alert("STEP 5");

//             window.location.href =
//                 `./dashboard.html?id=${data.analysisId}`;

//         }

//     } catch (error) {

//         console.error(error);

//         alert(error.message);

//     }
// });
// ==========================
// NOTY FUNCTION
// ==========================

function showNoty(type, message) {

    new Noty({

        type,

        text: message,

        timeout: 3000,

        layout: "topRight",

        theme: "metroui",

        progressBar: true

    }).show();

}

