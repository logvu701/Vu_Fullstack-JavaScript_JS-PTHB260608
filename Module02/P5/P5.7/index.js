const form = document.getElementById("register-form");
const username = document.getElementById("username");
const email = document.getElementById("email");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
        username: username.value,
        email: email.value,
    };
    console.log(user);
});
