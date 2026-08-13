function identity<T>(arg: T): T {
    return arg;
}

interface Box<T> {
    content: T;
}

const value1 = identity<string>("Hello TypeScript");
const value2 = identity<number>(42);

console.log(value1);
console.log(value2);

const stringBox: Box<string> = { content: "Inside the box" };
const numberBox: Box<number> = { content: 100 };

console.log(stringBox.content);
console.log(numberBox.content);
