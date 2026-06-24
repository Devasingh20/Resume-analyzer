const params =
    new URLSearchParams(
        window.location.search
    );

const analysisId =
    params.get("id");
document
    .getElementById(
        "downloadBtn"
    )
    .addEventListener(
        "click",
        () => {

            window.open(
                `/api/pdf/${analysisId}`,
                "_blank"
            );

        }
    );
loadAnalysis();

async function loadAnalysis() {

    try {

        const response =
            await fetch(
                `/api/analysis/${analysisId}`
            );

        const analysis =
            await response.json();

        displayAnalysis(
            analysis
        );

    } catch (error) {

        console.error(error);

    }

}

function displayAnalysis(
    analysis
) {

    const score =
        analysis.atsScore;

    document.getElementById(
        "atsScore"
    ).textContent =
        `${score}/100`;

    const degree =
        (score / 100) * 360;

    document.querySelector(
        ".score-circle"
    ).style.background =

        `conic-gradient(
        #34d399 0deg,
        #10b981 ${degree}deg,
        #e5e7eb ${degree}deg
    )`;

    document.getElementById(
        "summary"
    ).textContent =
        analysis.summary;

    // Skills

    const skills =
        document.getElementById(
            "skills"
        );

    // const skills =
    //     document.getElementById(
    //         "skills"
    //     );

    analysis.skills.forEach(
        skill => {

            skills.innerHTML += `

        <div class="skill">

            <div class="skill-info">

                <span>
                    ${skill.name}
                </span>

                <span>
                    ${skill.score}%
                </span>

            </div>

            <div class="progress">

                <div
                    class="progress-fill"
                    style="
                    width:${skill.score}%">
                </div>

            </div>

        </div>

        `;
        }
    );

    // Strengths

    const strengths =
        document.getElementById(
            "strengths"
        );

    analysis.strengths.forEach(
        strength => {

            strengths.innerHTML += `

        <li>

            <i class="fa-solid fa-circle-check"></i>

            ${strength}

        </li>

        `;
        }
    );

    // Improvements

    const improvements =
        document.getElementById(
            "improvements"
        );

    analysis.improvements.forEach(
        item => {

            improvements.innerHTML += `

        <li>

            <i class="fa-solid fa-arrow-trend-up"></i>

            ${item}

        </li>

        `;
        }
    );

    // Roles

    const roles =
        document.getElementById(
            "roles"
        );

    analysis.recommendedRoles.forEach(
        role => {

            roles.innerHTML += `

        <span>

            ${role}

        </span>

        `;
        }
    );
    document.getElementById(
        "atsStat"
    ).textContent =
        analysis.atsScore;

    document.getElementById(
        "skillsCount"
    ).textContent =
        analysis.skills.length;

    document.getElementById(
        "improvementsCount"
    ).textContent =
        analysis.improvements.length;

    document.getElementById(
        "rolesCount"
    ).textContent =
        analysis.recommendedRoles.length;
}