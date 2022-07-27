const express = require('express');
require('express-async-errors');
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute');

const app = express();
app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', userRoute);

app.use((err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'InvalidFields': res.status(400).json({ message });
      break;
    case 'ValidationError': res.status(400).json({ message });
      break;
    case 'TokenNotFound': res.status(401).json({ message });
      break;
    case 'ExistingUser': res.status(409).json({ message });
      break;
    default: console.warn(err); res.sendStatus(400);
  }
});

module.exports = app;
