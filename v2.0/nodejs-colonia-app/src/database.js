const mongoose = require("mongoose");
const config = require("./config");

const MONGODB_URI = `mongodb://${config.MONGODB_HOST}/${config.MONGODB_DATABASE}`;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("Mongodb is connected to", db.connection.host))
  .catch((err) => console.error(err));


const csvtojson = require("csvtojson");
const path = require('path');
const fs = require("fs");
const fastcsv = require("fast-csv");

const coolPath = path.join(__dirname, 'db-latam-c.csv');
const readableStream = fs.createReadStream(coolPath);

csvtojson()
  .fromFile(coolPath)
  .then(csvData => {
    console.log(csvData);
  });

let stream = readableStream;
let csvData = [];
let csvStream = fastcsv
      .parse()
      .on("data", function(data) {
        csvData.push({
          name: data[0],
          email: data[1],
          password: data[2],
        });
      })
      .on("end", function() {
        // remove the first line: header
        csvData.shift();
    
        // save to the MongoDB database collection
      });
    
    stream.pipe(csvStream);

const mongodb = require("mongodb").MongoClient;

mongodb.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    client
      .db(`${config.MONGODB_DATABASE}`)
      .collection("users")
      .insertMany(csvData, (err, res) => {
        if (err) throw err;
        console.log(`Inserted: ${res.insertedCount} rows`);
        client.close();
      });
  }
);

stream.pipe(csvStream);
