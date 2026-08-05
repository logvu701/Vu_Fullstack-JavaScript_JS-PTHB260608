const box = document.getElementById("box");
const button = document.getElementById("btn-toggle");

button.addEventListener("click", () => {
    box.classList.toggle("highlight");
});
