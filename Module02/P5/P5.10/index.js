const colors = ["red", "blue", "green", "yellow", "purple"];
const button = document.querySelector("#btn-change");
const colorName = document.querySelector("#color-name");

button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    document.body.style.backgroundColor = randomColor;
    colorName.innerText = `Màu hiện tại: ${randomColor}`;
});
