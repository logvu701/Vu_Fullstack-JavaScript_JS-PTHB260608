const input = document.getElementById("user-input");
const result = document.getElementById("result");

input.addEventListener("keydown", (e) => {
    result.innerText = `Phím vừa nhấn: ${e.key}`;
});
