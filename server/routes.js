const NotesRoutes = require('./routes/notes-routes');

module.exports.init = (app) => {

  // Api entity routes
  app.use('/api/notes', NotesRoutes);

  app.get('/ping', (req, res) => {
    res.status(200).send('Server is alive...');
  });
};
