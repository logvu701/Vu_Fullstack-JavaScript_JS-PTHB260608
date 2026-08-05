const image = document.getElementById("my-image");
const button = document.getElementById("btn-change");

button.addEventListener("click", () => {
    console.log("Ảnh hiện tại:");
    console.log(image.getAttribute("src"));
    image.setAttribute("src", "https://picsum.photos/id/1003/300/200");
    console.log("Đã đổi ảnh!");
});
