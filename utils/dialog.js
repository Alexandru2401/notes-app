const diag = document.getElementById("pop-up");
const closeDiag = document.getElementById("close-modal");
const message = document.querySelector(".text");

function getDialog(msg) {
  message.textContent = msg;
  diag.show();
  setTimeout(() => {
    diag.close();
  }, 3000);
}

closeDiag.addEventListener("click", () => {
  diag.close();
});

export { getDialog };
