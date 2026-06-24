const revealElements =
    document.querySelectorAll(
        ".reveal"
    );

const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("active");

                    }

                }
            );

        },

        {
            threshold: 0.2
        }

    );

revealElements.forEach(
    (element) => {

        observer.observe(
            element
        );

    }
);






const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon =
        menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    }
    else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});

document.getElementById("loginBtn")
    .addEventListener("click", () => {

        window.location.href = "pages/login.html";

    });

document.getElementById("signupBtn")
    .addEventListener("click", () => {

        window.location.href = "pages/signup.html";

    });


const user = JSON.parse(
    localStorage.getItem("user")
);

if (user) {

    document.querySelector(".userName").innerHTML = `
        <div class="user-badge">
            <i class="fa-solid fa-user"></i>
            Hello, ${user.username}
        </div>
    `;

}
function showNoty(type, message) {

    if (typeof Noty !== "undefined") {

        new Noty({

            type: type,

            layout: "topRight",

            theme: "metroui",

            text: message,

            timeout: 3000,

            progressBar: true

        }).show();

    } else {

        alert(message);

    }

}
document
    .getElementById("uploadResumeBtn")
    .addEventListener("click", () => {

        const isLoggedIn =
            localStorage.getItem("isLoggedIn");

        if (isLoggedIn === "true") {

            window.location.href =
                "pages/upload.html";

        } else {

            showNoty(
                "info",
                "Please login to upload your resume"
            );

            setTimeout(() => {

                window.location.href =
                    "pages/login.html";

            }, 1500);

        }

    });