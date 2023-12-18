const express = require('express');
const PORT = 3000;

const app = express();

// TEST - can see output if you open localhost 3000 in browser
app.get('/', (req: any, res: any) => {
  res.send('Hello!')
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

module.exports = app;