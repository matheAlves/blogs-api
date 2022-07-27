const express = require('express');
require('express-async-errors');
const loginRoute = require('./routes/loginRoute');

const app = express();
app.use(express.json());

app.use('/login', loginRoute);

app.use((err, _req, res, _next) => {
  const { name } = err;
  switch (name) {
    case 'InvalidFields': res.status(400).json({ message: 'Invalid fields' });
      break;
    case 'ValidationError': res.status(400).json({ message: 'Some required fields are missing' });
      break;
    
    default: console.warn(err); res.sendStatus(400);
  }
});

module.exports = app;
