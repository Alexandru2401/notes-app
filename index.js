let titleInput = document.getElementById("note-title");
let noteContent = document.getElementById("note-content");
const date = document.getElementById("date");
const submitBtn = document.getElementById("add-note-btn");
const recentContainer = document.querySelector(".recent-added-container");

import { today } from "./utils/getDate.js";
import { getDialog } from "./utils/dialog.js";
import { createId } from "./utils/getId.js";

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submitForm();
});

function submitForm() {
  let titleValue = titleInput.value.trim();
  let noteValue = noteContent.value.trim();
  let dateValue = date.value;

  isInputValid(titleInput);
  isInputValid(noteContent);
  isInputValid(date);
  if (dateValue < today) {
    return; // Iese din funcție
  }

  if (titleValue !== "" && noteValue !== "" && dateValue !== "") {
    let note = {
      title: titleValue,
      content: noteValue,
      id: createId(),
      noteStatus: "pending",
      deadline: dateValue,
    };

    let existingNote = JSON.parse(localStorage.getItem("data")) || [];
    existingNote.push(note);
    localStorage.setItem("data", JSON.stringify(existingNote));

    titleInput.value = "";
    noteContent.value = "";
    date.value = "";

    getDialog("Note has been added!");
    addInRecent();
    clearInputStyles();
  } else {
    console.log("Missing input");
  }
}

function isInputValid(input) {
  const message = input.nextElementSibling;

  if (input.value.trim() === "") {
    input.classList.add("wrong");
    if (input.id !== "date") {
      message.textContent = "Input cannot be blank!";
      message.classList.remove("hidden");
      message.style.color = "red";
    } else {
      message.textContent = "Please select a date!";
      message.classList.remove("hidden");
      message.style.color = "red";
    }
  } else if (
    input.id == "date" &&
    input.value < today &&
    input.value.trim() !== ""
  ) {
    message.textContent = "Cannot select a past date!";
    message.classList.remove("hidden");
    message.style.color = "red";
  } else {
    input.classList.add("good");
    message.textContent = "";
    message.classList.add("hidden");
  }
}

function clearInputStyles() {
  [titleInput, noteContent, date].forEach((input) => {
    input.classList.remove("good", "wrong");

    const message = input.nextElementSibling;
    if (message) {
      message.textContent = "";
      message.classList.add("hidden");
    }
  });
}

function addInRecent() {
  let recentNotes = JSON.parse(localStorage.getItem("data")) || [];
  let arrLength = recentNotes.length;
  let recentThreeNotes = recentNotes.slice(
    Math.max(arrLength - 3, 0),
    arrLength
  );

  console.log(recentThreeNotes);
  3;

  recentContainer.innerHTML = recentThreeNotes
    .map(
      (note) => `
        <div class="recent-note">
          <h2>Lastest added</h2>
          <h3>Title: <span class="recent-title">${note.title}</span></h3>
          <p>Content: <span class="recent-content">${note.content}</span></p>
          <p>Status: <span class="recent-status">${note.noteStatus}</span></p>
          <p>Deadline: <span class="recent-deadline">${note.deadline}</span></p>
        </div>
      `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  addInRecent();
});
