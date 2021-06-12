const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const logo = document.querySelector(".logoicon img");
const logo1 = document.querySelector(".logoicon-1 img");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  logo.style.opacity = 0;
  logo1.style.opacity = 1;
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
  logo.style.opacity = 1;
  logo1.style.opacity = 0;
});
