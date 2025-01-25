// chrome.webNavigation.onCompleted.addListener(
//     (details) => {
//         // Inject script to modify the Google Meet landing page heading
//         chrome.scripting.executeScript({
//             target: { tabId: details.tabId },
//             func: () => {
//                 console.log("executing the script.");

//                 const heading = document.querySelector("h1"); // Adjust selector based on the actual page structure
//                 if (heading) {
//                     heading.textContent = "Welcome to Custom Meet!";
//                     heading.style.color = "blue"; // Optional styling
//                 } else {
//                     console.log("Heading not found on this page.");
//                 }
//                 console.log("Script executed successfully.");

//             },
//         });
//     },
//     { url: [{ hostEquals: "meet.google.com" }] }
// );
chrome.webNavigation.onCompleted.addListener(
    (details) => {
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            func: () => {
                console.log("Executing script on Google Meet page...");

                // Modify the heading on the landing page
                const heading = document.querySelector("h1"); // Adjust selector based on actual structure
                if (heading) {
                    heading.textContent = "Welcome to Custom Google Meet!";
                    heading.style.color = "blue"; // Optional styling
                    console.log("Heading modified successfully.");
                } else {
                    console.log("Heading not found on this page.");
                }

                // Function to add fullscreen button to videos
                const addFullscreenButton = (video) => {
                    const button = document.createElement("button");
                    button.textContent = "⌞ ⌝";
                    button.style.position = "absolute";
                    button.style.zIndex = "1000";
                    button.style.top = "5%";
                    button.style.right = "2%";
                    button.style.backgroundColor = "black";
                    button.style.color = "white";
                    button.style.border = "none";
                    button.style.padding = "10px";
                    button.style.cursor = "pointer";

                    button.addEventListener("click", () => {
                        if (!document.fullscreenElement) {
                            video.requestFullscreen().catch((err) => {
                                console.error(`Error enabling full-screen mode: ${err.message}`);
                            });
                        } else {
                            document.exitFullscreen();
                        }
                    });

                    // Ensure parent container is positioned relative for absolute positioning
                    video.parentElement.style.position = "relative";
                    video.parentElement.appendChild(button);
                };

                // MutationObserver to detect new videos
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.addedNodes.length) {
                            mutation.addedNodes.forEach((node) => {
                                if (node.tagName === 'VIDEO') {
                                    addFullscreenButton(node);
                                }
                            });
                        }
                    });
                });

                // Start observing the document for added nodes
                observer.observe(document.body, { childList: true, subtree: true });

                // Initial check for existing videos
                const videos = document.querySelectorAll("video");
                console.log(`Found ${videos.length} videos.`);
                videos.forEach((video) => {
                    addFullscreenButton(video);
                });

                console.log("Fullscreen buttons added to videos.");
            },
        });
    },
    { url: [{ hostEquals: "meet.google.com" }] }
);