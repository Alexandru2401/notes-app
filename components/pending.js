const data = JSON.parse(localStorage.getItem("data"));
import { getDialog } from "../utils/dialog.js";
const container = document.querySelector(".notes-container-pending-page");
const filteredData = data.filter((note) => note.noteStatus === "pending");
console.log(filteredData)

console.log(container)
container.innerHTML = filteredData
  .map(
    (note) => `
        <div class="recent-note">
          <h3>Title: <span class="recent-title">${note.title}</span></h3>
          <p>Content: <span class="recent-content">${note.content}</span></p>
          <p>Status: <span class="recent-status">${note.noteStatus}</span></p>
          <p>Deadline: <span class="recent-deadline">${note.deadline}</span></p>
          <label for="check-${note.id}">Set note as done:</label>
          <input type="checkbox" id="${note.id}" class="check"/>
          <button class="delete-btn" data-id="${note.id}">Delete note</button>
        </div>
      `
  )
  .join("");
const deleteButtons = document.querySelectorAll(".delete-btn");
const checkBtn = document.querySelectorAll(".check");

deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const idToDelete = button.getAttribute("data-id");
    deleteNote(idToDelete);
    getDialog("Note has been deleted!")
  });
});

function deleteNote(id) {
  const data = JSON.parse(localStorage.getItem("data")) || []; // ← recitește din localStorage
  const newData = data.filter((note) => note.id !== id);
  localStorage.setItem("data", JSON.stringify(newData));

  const noteElement = document.getElementById(id).closest(".recent-note");
  if (noteElement) noteElement.remove();
}

function setDone(id) {
  const data = JSON.parse(localStorage.getItem("data")) || []; // ← recitește din localStorage
  const newData = data.map((note) =>
    note.id == id ? { ...note, noteStatus: "complete" } : note
  );
  localStorage.setItem("data", JSON.stringify(newData));

  const noteElement = document.getElementById(id)?.closest(".recent-note");
  if (noteElement) noteElement.remove();

  getDialog("Note is set completed!");
}

checkBtn.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      setDone(checkbox.id);
    } else {
      console.log("nuu");
    }
  });
});
