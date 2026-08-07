import { fetchUsers } from "./apiService.js";
async function displayUsers() {
    try {
        const users = await fetchUsers();

        const userList = document.getElementById("user-list");

        userList.innerHTML = users
            .map(
                ({ name, email, website }) => `
                <div class="user-card">
                    <h3>${name}</h3>
                    <p>Email: ${email}</p>
                    <p>Website: ${website}</p>
                </div>
            `,
            )
            .join("");
    } catch (error) {
        console.error(error);
    }
}
displayUsers();
