const express = require('express');
const Notes = require('../controllers/notes');


const router = express.Router();

router.route('/')
  .all()
  .get(Notes.list)
  .post(Notes.create).delete(Notes.deleteAll);
router.route('/:noteId')
  .all()
  .get(Notes.read)
  .put(Notes.update)
  .delete(Notes.delete);
// Finish by binding the note middleware
router.param('noteId', Notes.noteById);

module.exports = router;
