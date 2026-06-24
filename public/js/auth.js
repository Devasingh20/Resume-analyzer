

// const loginForm = document.getElementById("loginForm");
// const togglePassword = document.querySelector(".togglePassword");

// if (togglePassword) {
//     togglePassword.addEventListener("click", () => {
//         const passwordInput = document.getElementById("password");

//         passwordInput.type =
//             passwordInput.type === "password"
//                 ? "text"
//                 : "password";

//         togglePassword.classList.toggle("fa-eye-slash");
//     });
// }
// if (loginForm) {

//     loginForm.addEventListener("submit", async (e) => {

//         e.preventDefault();

//         document
//             .getElementById("loginForm")
//             .addEventListener("submit", async (e) => {

//                 e.preventDefault();

//                 const email =
//                     document.getElementById("email").value.trim();

//                 const password =
//                     document.getElementById("password").value.trim();

//                 if (!email || !password) {

//                     showNoty(
//                         "error",
//                         "Please fill all fields"
//                     );

//                     return;
//                 }

//                 const button =
//                     document.getElementById("loginBtn");

//                 button.disabled = true;
//                 button.innerText = "Logging In...";

//                 try {

//                     const response =
//                         await fetch(
//                             "http://localhost:5000/api/auth/login",
//                             {
//                                 method: "POST",

//                                 headers: {
//                                     "Content-Type": "application/json"
//                                 },

//                                 body: JSON.stringify({
//                                     email,
//                                     password
//                                 })
//                             }
//                         );

//                     const data =
//                         await response.json();

//                     if (response.ok) {

//                         localStorage.setItem(
//                             "token",
//                             data.token
//                         );

//                         showNoty(
//                             "success",
//                             "Login Successful"
//                         );

//                         setTimeout(() => {

//                             window.location.href =
//                                 "dashboard.html";

//                         }, 1500);

//                     } else {

//                         showNoty(
//                             "error",
//                             data.message
//                         );

//                     }

//                 } catch (error) {

//                     showNoty(
//                         "error",
//                         "Server error"
//                     );

//                 } finally {

//                     button.disabled = false;
//                     button.innerText = "Login";

//                 }

//             });

//         function showNoty(type, message) {

//             const finalMessage =
//                 message || "Something went wrong";

//             if (typeof Noty !== "undefined") {

//                 new Noty({

//                     type: type,

//                     layout: "topRight",

//                     theme: "metroui",

//                     text: `${type === "success" ? "✅" :
//                         type === "error" ? "❌" :
//                             type === "info" ? "ℹ️" : "🔔"
//                         } ${finalMessage}`,

//                     timeout: 3000,

//                     progressBar: true,

//                     containerStyle: {

//                         top: "100px",
//                         right: "20px"

//                     },

//                     animation: {

//                         open:
//                             "animate__animated animate__fadeInRight",

//                         close:
//                             "animate__animated animate__fadeOutRight"

//                     }

//                 }).show();

//             } else {

//                 alert(finalMessage);

//             }

//         }




//     });

// }



// const signupForm = document.getElementById("signupForm");
// const togglePassword = document.querySelector(".togglePassword");

// if (togglePassword) {
//     togglePassword.addEventListener("click", () => {
//         const passwordInput = document.getElementById("password");

//         passwordInput.type =
//             passwordInput.type === "password"
//                 ? "text"
//                 : "password";

//         togglePassword.classList.toggle("fa-eye-slash");
//     });
// }
// if (signupForm) {

//     signupForm.addEventListener("submit", async (e) => {

//         e.preventDefault();

//         document
//             .getElementById("signupForm")
//             .addEventListener("submit", async (e) => {

//                 e.preventDefault();

//                 const username =
//                     document.getElementById("username").value.trim();

//                 const email =
//                     document.getElementById("email").value.trim();

//                 const password =
//                     document.getElementById("password").value.trim();

//                 const confirmPassword =
//                     document.getElementById("confirmPassword").value.trim();

//                 const terms =
//                     document.getElementById("terms").checked;

//                 if (
//                     !username ||
//                     !email ||
//                     !password ||
//                     !confirmPassword
//                 ) {

//                     showNoty("error",
//                         "Please fill all fields");

//                     return;
//                 }

//                 if (password.length < 6) {

//                     showNoty(
//                         "error",
//                         "Password must be at least 6 characters"
//                     );

//                     return;
//                 }

//                 if (password !== confirmPassword) {

//                     showNoty(
//                         "error",
//                         "Passwords do not match"
//                     );

//                     return;
//                 }

//                 if (!terms) {

//                     showNoty(
//                         "error",
//                         "Please accept Terms & Conditions"
//                     );

//                     return;
//                 }

//                 const button =
//                     document.getElementById("signupBtn");

//                 button.disabled = true;
//                 button.innerText = "Creating Account...";

//                 try {

//                     const response =
//                         await fetch(
//                             "http://localhost:5000/api/auth/signup",
//                             {
//                                 method: "POST",

//                                 headers: {
//                                     "Content-Type":
//                                         "application/json"
//                                 },

//                                 body: JSON.stringify({
//                                     username,
//                                     email,
//                                     password
//                                 })
//                             }
//                         );

//                     const data =
//                         await response.json();

//                     if (response.ok) {

//                         showNoty(
//                             "success",
//                             data.message
//                         );

//                         setTimeout(() => {

//                             window.location.href =
//                                 "login.html";

//                         }, 2000);

//                     } else {

//                         showNoty(
//                             "error",
//                             data.message
//                         );
//                     }

//                 } catch (error) {

//                     showNoty(
//                         "error",
//                         "Server error"
//                     );

//                 } finally {

//                     button.disabled = false;

//                     button.innerText =
//                         "Create Account";

//                 }

//             });

//         function showNoty(type, message) {

//             const finalMessage =
//                 message || "Something went wrong";

//             if (typeof Noty !== "undefined") {

//                 new Noty({

//                     type: type,

//                     layout: "topRight",

//                     theme: "metroui",

//                     text: `${type === "success" ? "✅" :
//                         type === "error" ? "❌" :
//                             type === "info" ? "ℹ️" : "🔔"
//                         } ${finalMessage}`,

//                     timeout: 3000,

//                     progressBar: true,

//                     containerStyle: {

//                         top: "100px",
//                         right: "20px"

//                     },

//                     animation: {

//                         open:
//                             "animate__animated animate__fadeInRight",

//                         close:
//                             "animate__animated animate__fadeOutRight"

//                     }

//                 }).show();

//             } else {

//                 alert(finalMessage);

//             }

//         }



//     });

// }

