const scores = [1, 2, 3, 4, 5];
console.log("Bình phương các phần tử:");
scores.forEach((score) => {
    console.log(score * score);
});

const doubledScores = scores.map((score) => {
    return score * 2;
});

console.log("Mảng sau khi gấp đôi:");
console.log(doubledScores);
