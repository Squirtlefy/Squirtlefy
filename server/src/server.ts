const { google } = require('googleapis');
const cors = require('cors');
import express, { Request, Response, NextFunction } from "express";
import testQueries from './database/testCalls'
import apiRouter from './routes/api'

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
// client_ID = '207130399105-liobtrmdselqr1um3qe1188d2c2djnrn.apps.googleusercontent.com'
// client_SECRET = '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'

// test route
app.get('/test',  testQueries.test,  (req: any, res: any) => {
  res.status(200).json(res.locals.test)
})

// first router
app.use('/api', apiRouter);


const oauth2Client = new google.auth.OAuth2(
  '207130399105-liobtrmdselqr1um3qe1188d2c2djnrn.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/login'
);

// set auth as a global default
google.options({
  auth: oauth2Client
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
  console.log(req.query);
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
  );

  const data = await response.json();
  console.log('data: ', data);

  res.redirect('http://localhost:5173/');
});

// basic error handler
app.use((err, req, res, next) => {
  res.status(500).send('Error');
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
