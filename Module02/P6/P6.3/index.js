const userProfile = {
    username: "Nguyen Van A",
    age: 20,
    email: "nguyenvana@example.com",
    address: {
        city: "Ha Noi",
    },
};

const {
    username: fullName,
    address: { city },
} = userProfile;

console.log("Full Name:", fullName);
console.log("City:", city);
