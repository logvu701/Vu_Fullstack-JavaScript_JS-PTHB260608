const deleteButtons = document.querySelectorAll(".btn-delete");

deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const listItem = e.target.parentElement;
        listItem.remove();
    });
});
