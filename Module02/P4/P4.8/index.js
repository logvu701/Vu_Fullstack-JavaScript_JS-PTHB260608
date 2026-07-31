const ages = [15, 20, 12, 18, 25, 30, 10];
function getAdults(arr) {
    return arr.filter(function (age) {
        return age >= 18;
    });
}
const adults = getAdults(ages);
console.log(adults);
