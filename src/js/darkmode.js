//-----------(っ◕‿◕)っ  CÓDIGO PRESTADO DEL PROFE BRAYAN-----------
export function changeDarkMode () {
  const themeButton = document.getElementById('darkbttn')
  const darkTheme = 'dark-mode'
  const iconTheme = 'bx-sun'

  const selectedTheme = window.localStorage.getItem('selected-theme')
  const selectedIcon = window.localStorage.getItem('selected-icon')

  const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
  const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

  if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
  }

  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    window.localStorage.setItem('selected-theme', getCurrentTheme())
    window.localStorage.setItem('selected-icon', getCurrentIcon())
  })
}
//-----------------CÓDIGO ANTERIOR---------------

// function ChangeDarkMode() {
//   document.body.classList.toggle("dark-mode");
//   changeIcon();
// }

// function changeIcon() {
//   darkMode.classList.contains("bx-moon")
//     ? darkMode.classList.replace("bx-moon", "bx-sun")
//     : darkMode.classList.replace("bx-sun", "bx-moon");
// }


// const darkMode = document.querySelector("#darkbttn");
// darkMode.addEventListener("click", ChangeDarkMode);