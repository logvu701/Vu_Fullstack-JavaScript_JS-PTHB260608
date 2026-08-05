const itemList = document.getElementById("item-list");
const btnAdd = document.getElementById("btn-add");
const btnRemove = document.getElementById("btn-remove");

btnAdd.addEventListener("click", () => {
    const newItem = document.createElement("li");
    newItem.innerText = "New Item";
    itemList.appendChild(newItem);
});

btnRemove.addEventListener("click", () => {
    const lastItem = itemList.lastElementChild;
    if (lastItem) {
        lastItem.remove();
    }
});
