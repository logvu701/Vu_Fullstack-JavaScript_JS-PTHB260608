let tasks = [];

function addTask(title) {
    tasks.push(title);
    console.log(`Đã thêm: ${title}`);
}

function removeTask(index) {
    if (index >= 0 && index < tasks.length) {
        console.log(`Đã xóa: ${tasks[index]}`);
        tasks.splice(index, 1);
    } else {
        console.log("Vị trí không hợp lệ!");
    }
}

function displayTasks() {
    if (tasks.length === 0) {
        console.log("Danh sách công việc trống.");
        return;
    }
    console.log("Danh sách công việc:");
    tasks.forEach(function (task, index) {
        console.log(`${index + 1}. ${task}`);
    });
}

addTask("Học JavaScript");
addTask("Làm bài tập");
addTask("Đi tập gym");
displayTasks();
removeTask(1);
displayTasks();
