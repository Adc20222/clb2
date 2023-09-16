const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.json({ limit: '100mb' })); // Increase limit to 10MB
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDBs
//const url = 'mongodb://127.0.0.1:27017/Article';
const url = "mongodb+srv://root:root@testing.svxbinm.mongodb.net/Article";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema for the "Data" collection
const dataSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  p: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  
});

// Create a model for the "Data" collection based on the schema
const Data = mongoose.model('Data', dataSchema);

// Define a route to insert data into the "Data" collection
app.post('/addData', async (req, res) => {
  try {
    const newData = new Data(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const port = process.env.PORT || 8013;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
