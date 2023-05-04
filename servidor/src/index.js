const express = require('express');
const cors = require("cors");
const app = express();
const port = 4000;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use(cors());
app.use('/api/files', require('./routes/files'))

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})