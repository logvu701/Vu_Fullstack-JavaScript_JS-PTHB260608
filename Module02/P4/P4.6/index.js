let colors = ["Red", "Green", "Blue"];
let index = colors.indexOf("Green");
if (index !== -1) {
    colors.splice(index, 1, "Yellow", "Pink");
}
console.log(colors);
