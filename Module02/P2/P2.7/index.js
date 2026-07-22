let attendance = Number(prompt("Nhập phần trăm chuyên cần:"));
let averageScore = Number(prompt("Nhập điểm trung bình:"));
let specialPermission = confirm("Bạn có giấy phép đặc biệt không?");
if ((attendance > 80 && averageScore >= 5) || specialPermission) {
    console.log("Sinh viên được dự thi.");
} else {
    console.log("Sinh viên không được dự thi.");
}
