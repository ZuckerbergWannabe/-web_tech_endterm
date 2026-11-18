const themeButton = document.getElementById("theme-button");
const signInLink = document.getElementById("sign-in-link");
const signOutButton = document.getElementById("sign-out-button");
const fanGreeting = document.getElementById("fan-greeting");
const fanSignInForm = document.getElementById("fan-sign-in-form");

let theme = localStorage.getItem("fan-theme") || "light";

function applyTheme() {
    document.documentElement.setAttribute("data-bs-theme", theme);

    if (theme === "dark") {
        themeButton.textContent = "Light mode";
    } else {
        themeButton.textContent = "Dark mode";
    }
}

applyTheme();

themeButton.addEventListener("click", function () {
    theme = theme === "dark" ? "light" : "dark";

    localStorage.setItem("fan-theme", theme);
    applyTheme();
});

function showFanStatus() {
    const fanName = localStorage.getItem("fan-name");

    const signedIn = Boolean(fanName);

    signInLink.hidden = signedIn;
    signOutButton.hidden = !signedIn;
    fanGreeting.textContent = fanName ? "Hi, " + fanName + "!" : "";

    if (fanSignInForm) {
        fanSignInForm.hidden = signedIn;
        document.getElementById("fan-signed-in").hidden = !signedIn;
    }
}

showFanStatus();

if (fanSignInForm) {
    fanSignInForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("fan-display-name").value.trim();
        const signInError = document.getElementById("fan-sign-in-error");

        if (name.length < 2) {
            signInError.textContent = "Enter a name with at least 2 characters.";
            return;
        }

        localStorage.setItem("fan-name", name);
        signInError.textContent = "";
        fanSignInForm.reset();
        showFanStatus();
    });
}

signOutButton.addEventListener("click", function () {
    localStorage.removeItem("fan-name");
    showFanStatus();
    signInLink.focus();
});
