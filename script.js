var index = 0;

window.onload = document.querySelector("#user_input").select();
var last_note_coord = [0,0];
document.querySelector("#add_note").addEventListener("click", () => {
  document.querySelector("#pop_note").style.display = "block";
  document.querySelector("#user_input").value = '';
});

 document.querySelector("#container_notes").addEventListener("click", (e) => {
   last_note_coord = [e.pageX, e.pageY];
  document.querySelector("#pop_note").style.display = "block";
  document.querySelector("#user_input").value = '';
});

document.querySelector("#hide").addEventListener("click", () => {
  document.querySelector("#pop_note").style.display = "none";
});

document.querySelector("#user_input").addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    const text = document.querySelector("#user_input");
    createStickyNote(text.value, last_note_coord);
    document.querySelector("#pop_note").style.display = "none";
  }
});

/* document.querySelector("#container_notes").addEventListener('mouseclick', e => {
  x = e.offsetX;
  y = e.offsetY;
  createStickyNote();
}); */

createStickyNote = (text, coord) => {
  var note = document.createElement("div");
  var details = document.createElement("div");
  var noteText = document.createElement("h1");

  note.className = "note";
  details.className = "details";
  noteText.textContent = text;
  console.log(coord);
  details.appendChild(noteText);
  note.appendChild(details);

  note.setAttribute('style', `width:280px; height:280px; background:linear-gradient(180deg, rgba(255,209,38,1) 0%, rgba(255,209,38,1) 54%, rgba(180,149,32,1) 100%); position:absolute; left: ${coord[0]}px; top:${coord[1]}px`);

  note.addEventListener("dblclick", () => {
    note.remove();
  })

  document.querySelector("#all_notes").appendChild(note);

  document.querySelector("#remove_note").addEventListener("click", () => {
    note.remove();
  });

}