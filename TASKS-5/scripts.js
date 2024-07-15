const body = document.querySelector('body');
let themeChangeInterval;

function startThemeAnimation() {
    themeChangeInterval = setInterval(() => {
        body.classList.toggle('theme-change');
    }, 20000); // Change color every 20 seconds
}

// Start the theme change animation initially
startThemeAnimation();

// Optionally, you can stop the animation after a certain time period
setTimeout(() => {
    clearInterval(themeChangeInterval);
}, 60000); // Stop after 1 minute (adjust as needed)
