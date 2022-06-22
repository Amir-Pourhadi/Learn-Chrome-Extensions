const nameInput = document.querySelector("input#name");
const header = document.querySelector("h2#greet");

nameInput.addEventListener("keyup", (e) => {
  header.innerText = "Hello " + e.target.value;
});
