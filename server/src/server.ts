const { google } = require('googleapis');
const cors = require('cors');
require('dotenv').config();
import user from './controllers/user';
import express, { Request, Response, NextFunction } from 'express';
import testQueries from './database/testCalls';
import apiRouter from './routes/api';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// router
app.use('/api', apiRouter);

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:3000/login'
);

// set auth as a global default
google.options({
  auth: oauth2Client,
});

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

// TEST - can see output if you open localhost 3000 in browser
app.get('/', (req: any, res: any) => {
  res.redirect(url);
});

app.get('/login', async (req: any, res: any) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
  );
  const data = await response.json();
  console.log('data: ', data);

  const result = await user.createUser(
    data.name,
    data.email,
    data.id,
    data.picture
  );
  console.log(result);

  if (result === -1) {
    res.status(500).send('Error creating user');
  }

  res.redirect(`http://localhost:5173/?data=${JSON.stringify(data.email)}`);
});

// basic error handler
app.use((err, req, res, next) => {
  res.status(500).send('Error');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
