console.log("Danh sách đồ uống:");
console.log("1. Cafe");
console.log("2. Cam vắt");
console.log("3. Trà sữa");
console.log("4. Coca");
let choice = Number(prompt("Danh sách đồ uống:\n" + "1. Cafe\n" + "2. Cam vắt\n" + "3. Trà sữa\n" + "4. Coca\n" + "Nhập số thứ tự đồ uống:"));
switch (choice) {
    case 1:
        console.log("Bạn đã chọn: Cafe");
        break;

    case 2:
        console.log("Bạn đã chọn: Cam vắt");
        break;

    case 3:
        console.log("Bạn đã chọn: Trà sữa");
        break;

    case 4:
        console.log("Bạn đã chọn: Coca");
        break;

    default:
        console.log("Món ăn không tồn tại");
}
