const profileBtn =
    document.getElementById(
        "profileBtn"
    );

const profileOverlay =
    document.getElementById(
        "profileOverlay"
    );

const closeProfile =
    document.getElementById(
        "closeProfile"
    );
async function loadProfile() {

    try {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            );

        const response =
            await fetch(
                `/api/profile/${user.id}`
            );

        const data =
            await response.json();

        document.getElementById(
            "profileName"
        ).textContent =
            data.username;

        document.getElementById(
            "profileEmail"
        ).textContent =
            data.email;

        document.getElementById(
            "totalReports"
        ).textContent =
            data.totalReports;

        document.getElementById(
            "averageATS"
        ).textContent =
            data.averageATS;

        document.getElementById(
            "highestATS"
        ).textContent =
            data.highestATS;

        const joined =
            new Date(
                data.joinedDate
            );

        document.getElementById(
            "joinedDate"
        ).textContent =
            joined.toLocaleDateString(
                "en-IN",
                {

                    day: "numeric",

                    month: "short",

                    year: "numeric"

                }
            );

    }

    catch (error) {

        console.error(error);

    }

}
profileBtn.addEventListener(
    "click",
    async (e) => {

        e.preventDefault();

        await loadProfile();

        profileOverlay.classList.add(
            "show"
        );

    }
);

closeProfile.addEventListener(
    "click",
    () => {

        profileOverlay.classList.remove(
            "show"
        );

    }
);

profileOverlay.addEventListener(
    "click",
    (e) => {

        if (
            e.target === profileOverlay
        ) {

            profileOverlay.classList.remove(
                "show"
            );

        }

    }
);


function logout() {

    localStorage.clear();

    window.location.href =
        "/pages/login.html";

}