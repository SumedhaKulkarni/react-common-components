/* eslint-disable */
const express = require('express');

const app = express();

app.disable('x-powered-by');
app.use(express.static('docz-dist'));
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
    if(err) throw err;
    console.log('listening on http://localhost:' + 5000);
});
