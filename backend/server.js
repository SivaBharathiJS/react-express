const config=require('./config')
const express =require('express')
const port=5000
const app = express()

//
const cors = require('cors');
app.use(cors({origin: 'http://localhost:3000',}),);
//db

const AWS = require('aws-sdk');


AWS.config.update(config.aws_remote_config);
const { v4: uuidv4 } = require('uuid');
//
//json
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//view

//
app.get('/', (req, res) => {
    res.send('hello world')
  })
app.post('/api/save', (req, res) => {

  const db = new AWS.DynamoDB.DocumentClient();
 
  console.log(req.body)
  const body=req.body
  var params = {
    TableName: config.aws_table_name,
    Item: {
        // creates a new uuid
        "Id": uuidv4(),
        // name property passed from body
        "Name": body["Name"],
        "Contact":body["Contact"],
        "Location":body["Location"]
    }
};
db.put(params, function (err, data) {

  if (err) {
      console.log(err)
      res.send({
          success: false,
          message: err
      });
  } else {
      const { Items } = data;
      res.send({
          success: true,
          movies: Items
      });
  }
});

    //   var newData = {
    // "Name": req.body.Name,
    // "Contact": req.body.Contact,
    // "Location": req.body.Location
    //   }
    //   Data.push(newData)
    //   console.log(Data);
    //   res.status(201).json({"some":"response"})

  // res.send('posted')
  })
  
app.get('/api/view/', (req, res) => {
  const db = new AWS.DynamoDB.DocumentClient();
          var params = {
            TableName:config.aws_table_name ,
            ProjectionExpression: "#Id, #Name, #Contact, #Location",
            ExpressionAttributeNames: {
                "#Id": "Id",
                "#Name": "Name",
                "#Contact": "Contact",
                "#Location": "Location",
                
            }
        };console.log("Scanning tb2 table.");

        db.scan(params, onScan);function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                res.send(data)
                // print all the details
                console.log("Scan succeeded.");
                data.Items.forEach(function(view) {
                  console.log(view.Id, view.Name, view.Location)
                });if (typeof data.LastEvaluatedKey != "undefined") {
                    console.log("Scanning for more...");
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    db.scan(params, onScan);
                }
            }
          }
})


app.get('/api/update', (req, res) => {
    res.send('hello world')
  })
app.get('/api/delete', (req, res) => {
    res.send('hello world')
  })

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
