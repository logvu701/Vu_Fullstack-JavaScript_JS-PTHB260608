const productName = "Laptop";
const productPrice = 500;
const quantity = 3;
const message = `You bought ${quantity} units of ${productName} for a total of $${productPrice * quantity}`.replace(/\n\s*/g, " ").trim();
console.log(message);
