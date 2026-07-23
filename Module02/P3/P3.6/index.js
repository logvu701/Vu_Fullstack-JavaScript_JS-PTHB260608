let w = Number(prompt("Nhập chiều rộng: "));
let h = Number(prompt("Nhập chiều cao: "));
if (Number.isInteger(w) && Number.isInteger(h) && w > 0 && h > 0) {
    for (let i = 0; i < h; i++) {
        let row = "";
        for (let j = 0; j < w; j++) {
            row += "*";
        }
        console.log(row);
    }
}
