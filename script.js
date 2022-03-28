var index = 0;

window.onload = document.querySelector("#user_input").select();

document.querySelector("#add_note").addEventListener("click", () => {
  document.querySelector("#pop_note").style.display = "block";
});

/* document.querySelector("#container_notes").addEventListener("click", () => {
  document.querySelector("#pop_note").style.display = "block";
} */

document.querySelector("#hide").addEventListener("click", () => {
  document.querySelector("#pop_note").style.display = "none";
});

document.querySelector("#user_input").addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    const text = document.querySelector("#user_input");
    createStickyNote(text.value);
  }
});

createStickyNote = (text) => {
  var note = document.createElement("div");
  var details = document.createElement("div");
  var noteText = document.createElement("h1");

  note.className = "note";
  details.className = "details";
  noteText.textContent = text;

  details.appendChild(noteText);
  note.appendChild(details);

  note.setAttribute('style', 'width:280px; height:280px; background:linear-gradient(180deg, rgba(255,209,38,1) 0%, rgba(255,209,38,1) 54%, rgba(180,149,32,1) 100%);');

  note.addEventListener("dblclick", () => {
    note.remove();
  })

  document.querySelector("#all_notes").appendChild(note);

  document.querySelector("#remove_note").addEventListener("click", () => {
    note.remove();
  });

}