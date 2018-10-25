const express = require('express');
const port = process.env.PORT || 5000

const app = express();


app.use(express.static('views'))
app.use(express.static('public/stylesheets'))
app.use(express.static('public/assets'))


app.listen(port, () => console.log(`Listening on ${ port }`));