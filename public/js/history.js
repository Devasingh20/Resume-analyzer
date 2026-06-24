const historyContainer =
    document.getElementById(
        "historyContainer"
    );

loadHistory();

async function loadHistory() {

    try {

        const response =
            await fetch(
                "/api/analysis"
            );

        const analyses =
            await response.json();

        if (
            !analyses.length
        ) {

            historyContainer.innerHTML = `

                <div class="empty-state">

                    <i class="fa-solid fa-file-circle-xmark"></i>

                    <h2>

                        No Analysis Found

                    </h2>

                    <p>

                        Upload your first resume
                        to generate a report.

                    </p>

                </div>

            `;

            return;

        }

        renderHistory(
            analyses
        );

    } catch (error) {

        console.error(
            "History Error:",
            error
        );

        historyContainer.innerHTML = `

            <div class="empty-state">

                <h2>

                    Failed to load history

                </h2>

            </div>

        `;

    }

}

function renderHistory(
    analyses
) {

    historyContainer.innerHTML =
        "";

    analyses.forEach(
        analysis => {

            const role =
                analysis
                    .recommendedRoles?.[0]
                ||
                "Not Available";

            const date =
                new Date(
                    analysis.createdAt
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    }
                );

            historyContainer.innerHTML += `

                <div class="history-card">

                    <div class="history-top">

                        <div class="score-badge">

                            ${analysis.atsScore}/100

                        </div>

                    </div>

                    <h3>

                        ${role}

                    </h3>

                    <p class="history-date">

                        <i class="fa-solid fa-calendar"></i>

                        ${date}

                    </p>

                    <div class="history-actions">

                        <button
                            class="view-btn"
                            onclick="
                            viewReport(
                            '${analysis._id}'
                            )
                            "
                        >

                            <i class="
                            fa-solid
                            fa-eye
                            ">
                            </i>

                            View Report

                        </button>

                    </div>

                </div>

            `;

        }
    );

}

function viewReport(
    analysisId
) {

    window.location.href =
        `/pages/dashboard.html?id=${analysisId}`;

}