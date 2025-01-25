document.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {

        console.log("Content script loaded successfully.");

        const heading = document.querySelector("h1"); // Adjust selector as per the landing page
        if (heading) {
            heading.textContent = "Welcome to Custom Meet!";
            heading.style.color = "blue"; // Optional styling
            console.log("Heading updated successfully.");

        } else {
            console.log("Heading not found.");
        }
    }, 2000);
});
