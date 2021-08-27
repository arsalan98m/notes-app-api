const express = require('express');
const notesRouter = express.Router();
const Note = require('../../db/models/note.model');

// notes (/notes) getting all notes
notesRouter.get('/', (request, response) => {
  Note.find({}, (err, notes) => {
    if (err) {
      return console.error('err=>', err);
    }

    response.json({ notes, success: true });
  });
});

// adding new note
notesRouter.post('/', (request, response) => {
  const newNote = new Note(request.body);
  newNote.save().then((savedNote) => {
    response.json({
      note: savedNote,
      success: true,
    });
  });
});

// getting particular note by id
notesRouter.get('/:id', (request, response) => {
  const noteId = request.params.id;

  Note.findById(noteId, (err, note) => {
    if (err) {
      return console.log('error=>', err);
    }

    if (!note) {
      return response.status(404).json({
        message: 'note not found',
      });
    }

    response.json({
      reply: 'note by id success',
      note,
    });
  });
});

// deleting particular note by id
notesRouter.delete('/:id', (request, response) => {
  const noteId = request.params.id;
  Note.findByIdAndRemove(noteId, (err, deletedNote) => {
    console.log(err, deletedNote);

    if (err) {
      return console.log(err);
    }

    if (!deletedNote) {
      return response.status(404).json({
        message: 'note not found for deletion',
      });
    }

    response.json({
      reply: 'delete note by id success',
    });
  });
});

// update particular note by id
// agar hamain response main updated value chahiyeh tum hum find ky 3rd parameter me new true bhejengy
notesRouter.put('/:id', (request, response) => {
  const noteId = request.params.id;
  const updatedBody = request.body;
  Note.findByIdAndUpdate(
    noteId,
    updatedBody,
    { new: true },
    (err, updatedNote) => {
      if (err) {
        return console.log('err=>', err);
      }

      if (!updatedNote) {
        return response.status(404).json({
          message: 'note not found for updating.',
        });
      }

      response.json({
        reply: 'note updated successfully',
        note: updatedNote,
      });
    }
  );
});

// (notes/dummy)
notesRouter.get('/dummy', (request, response) => {
  response.send({ text: 'dummy' });
});

module.exports = {
  notesRouter,
};
