const parent = document.getElementById("parent");
const child = document.getElementById("child");

parent.addEventListener("click", () => {
    console.log("Parent được click");
});

child.addEventListener("click", () => {
    console.log("Child được click");
});
