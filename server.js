import router from './routes/index';

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on port : ${port}`);
});

app.use('/', router);

export default app;
