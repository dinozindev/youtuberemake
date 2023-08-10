const toggleBtn = document.getElementById("mode__icon");
const screen = document.getElementById("website");

let darkMode;

// se a localStorage tiver o item dark-mode em sua storage, atribui o valor dela a variável darkMode. 
if(localStorage.getItem('dark-mode')) {
    darkMode = localStorage.getItem("dark-mode")
// caso a localStorage não tenha nada, ou seja, é a primeira vez da pessoa no site, atribui o valor de light à variável darkMode.
} else {
    darkMode = "light";
}

// caso o item dark-mode tenha o valor igual a dark, atribui as customizações do dark mode. 
if(localStorage.getItem("dark-mode") == "dark") {
    screen.classList.add("dark")
    toggleBtn.classList.remove("fa-moon")
    toggleBtn.classList.add("fa-sun")
}

// cria um novo item na localStorage, com key dark-mode e com valor da variável darkMode. 
localStorage.setItem("dark-mode", darkMode)


toggleBtn.addEventListener("click", () => {
   if(toggleBtn.classList.contains("fa-moon")) {
         toggleBtn.classList.remove("fa-moon")
         toggleBtn.classList.add("fa-sun");
         screen.classList.add("dark");
         localStorage.setItem("dark-mode", "dark")

         return;
     } else {
         toggleBtn.classList.remove("fa-sun")
         toggleBtn.classList.add('fa-moon')
         screen.classList.remove("dark")
         localStorage.setItem("dark-mode", "light")

     }
})