function darkTheme() {
    document.querySelector("html").setAttribute("data-theme", "dark");
    document.getElementById("icon-theme").setAttribute("class", "fa-solid fa-moon");
    document.querySelector("header").style.backgroundColor = `#13171f`;
    localStorage.setItem("theme", "dark");
}

function lightTheme() {
    document.querySelector("html").setAttribute("data-theme", "light");
    document.getElementById("icon-theme").setAttribute("class", "fa-solid fa-sun");
    document.querySelector("header").style.backgroundColor = `#fff`;
    localStorage.setItem("theme", "light");
}

const theme = localStorage.getItem("theme");

switch(theme) {
    case "dark":
        darkTheme()
    break;
    case "light":
        lightTheme()
}

document.getElementById("change-theme").addEventListener("click", () => {
    const themeHTML = document.querySelector("html").getAttribute("data-theme");

    switch(themeHTML) {
        case "dark": 
            lightTheme()
        break;
        case "light":
            darkTheme()
    }


})

