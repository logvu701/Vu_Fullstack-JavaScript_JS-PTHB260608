const ADMIN_USER = "admin";
const ADMIN_PASS = "123456";
let username = prompt("Nhập tên đăng nhập:");
let password = prompt("Nhập mật khẩu:");
if (username === ADMIN_USER && password === ADMIN_PASS) {
    alert("Đăng nhập thành công!");
} else {
    alert("Sai tài khoản hoặc mật khẩu!");
}
