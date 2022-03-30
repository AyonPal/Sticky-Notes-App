const db = require('../models');

const Note = db.StickyNote;

module.exports.list = (req, res) => {

  Note.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.read = (req, res) => {
  res.json(req.note);
};

module.exports.create = (req, res) => {
  // Create the note and assign it to the current user
  const text = req.body.text;
  const positionX = req.body.positionX;
  const positionY = req.body.positionY;

  Note
    .create({
      text,
      positionX,
      positionY
    }, {
      // logging: console.log
    })
    .then((newNote) => {

        res.json(newNote);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};

module.exports.update = (req, res) => {
  const note = req.note;

  note.updateAttributes(req.body)
    .then((updatedNote) => {
        res.json(updatedNote);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};

module.exports.deleteAll = (req, res) => {
  Note.destroy({
    where: {},
    truncate: true
  }).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.status(400).send(err.message);
  });
};

module.exports.delete = (req, res) => {
  const note = req.note;
  note.destroy()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};

// Middleware to retrieve the note when an id is passed in the route
module.exports.noteById = function (req, res, next, id) {
  Note.findById(id, {
  })
    .then((note) => {
      if (!note) {
        const err = new Error(`failed to load note: ${id}`);
        err.status = 404;
        return next(err);
      }
      req.note = note;
      next();
    })
    .catch((err) => {
      return next(err);
    });
};

