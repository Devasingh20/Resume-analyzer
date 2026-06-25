const learnATSBtn =
    document.getElementById(
        "learnATSBtn"
    );

const atsOverlay =
    document.getElementById(
        "atsOverlay"
    );

const closeATS =
    document.getElementById(
        "closeATS"
    );

learnATSBtn.addEventListener(
    "click",
    () => {

        atsOverlay.classList.add(
            "show"
        );

        document.body.style.overflow =
            "hidden";

    }
);

closeATS.addEventListener(
    "click",
    closeATSModal
);

atsOverlay.addEventListener(
    "click",
    (e) => {

        if (
            e.target === atsOverlay
        ) {

            closeATSModal();

        }

    }
);

document.addEventListener(
    "keydown",
    (e) => {

        if (
            e.key === "Escape"
        ) {

            closeATSModal();

        }

    }
);

function closeATSModal() {

    atsOverlay.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "auto";

}