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

simulateTask()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
