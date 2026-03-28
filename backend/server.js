const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API route
app.get('/', (req, res) => {
  res.send('DapStore backend running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));