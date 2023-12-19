import express, { Request, Response, NextFunction } from "express";
import testQueries from './database/testCalls'

const PORT = 3000;
const app = express();

// TEST - can see output if you open localhost 3000 in browser
app.get('/',  testQueries.test,  (req: any, res: any) => {
  res.status(200).json(res.locals.test)
})

// basic error handler
app.use((err, req, res, next) => {
  res.status(500).send('Error');
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

export default app;