const numbers = [10, 20, 30, 40, 50, 60];

// Hàm kiểm tra số bang indexOf
function checkNumber(searchValue) {
    const index = numbers.indexOf(searchValue);

    if (index !== -1) {
        console.log(`Tìm thấy ${searchValue} tại vị trí index ${index}`);
    } else {
        console.log("Not found");
    }
}

// Hàm kiểm tra số bang includes
/*function checkNumber(searchValue) {
    if (numbers.includes(searchValue)) {
        console.log(`Tìm thấy ${searchValue} tại vị trí index ${numbers.indexOf(searchValue)}`);
    } else {
        console.log("Not found");
    }
}*/

checkNumber(30);
checkNumber(100);
