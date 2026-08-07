function simulateTask() {
    return new Promise((resolve, reject) => {
        const hasError = false;

        setTimeout(() => {
            if (hasError) {
                reject("An error occurred!");
            } else {
                resolve("Task Completed!");
            }
        }, 2000);
    });
}

async function runTask() {
    try {
        const result = await simulateTask();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
runTask();
