const data = JSON.parse(localStorage.getItem("data")) || [];

const container = document.querySelector(".notes-container-secondary-page");
const filteredData = data.filter((note) => note.noteStatus === "complete");

import { getDialog } from "../utils/dialog.js";

container.innerHTML = filteredData
  .map(
    (note) => `
      <div class="recent-note">
        <h3>Title: <span class="recent-title">${note.title}</span></h3>
        <p>Content: <span class="recent-content">${note.content}</span></p>
        <p>Status: <span class="recent-status">${note.noteStatus}</span></p>
        <p>Deadline: <span class="recent-deadline">${note.deadline}</span></p>
        <button class="delete-btn" data-id="${note.id}">Delete note</button>
      </div>`
  )
  .join("");

const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const idToDelete = button.getAttribute("data-id");
    deleteNote(idToDelete, button);
    getDialog("Note has been deleted!");
  });
});

function deleteNote(id, button) {
  const data = JSON.parse(localStorage.getItem("data")) || []; // ← recitește din localStorage
  const newData = data.filter((note) => note.id !== id);
  localStorage.setItem("data", JSON.stringify(newData));

  const noteElement = button.closest(".recent-note");
  if (noteElement) noteElement.remove();
}
