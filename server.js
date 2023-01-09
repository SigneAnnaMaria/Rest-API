const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

var bodyParser = require('body-parser')
let db = 'db.json'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Send list of employees
app.get('/employees', (req, res) => {
  fs.readFile(db, 'utf-8', (err, data) => {
    if (err) {
      res.status(404).send(err)
    }
    res.send(JSON.parse(data))
  })
})

//Add employee Frans Fritz to list
app.post('/employees', (req, res) => {
  fs.readFile(db, 'utf8', (err, data) => {
      const newUserId = Date.now().toString()
      let obj = JSON.parse(data)
      obj[newUserId] = req.body
      let json = JSON.stringify(obj, null, 2)

      fs.writeFile(db, json, (err) => {
        if (err) {
          res.status(404).send(err)
        } else {
          res.status(200).send('new employee added')
        }
      })
    },
    true
  )
})

//Update employee first in list to Emma Enoksson 
app.put('/employees/:id', (req, res) => {
  fs.readFile(db, 'utf8', (err, data) => {
    const uniqueID = parseInt(req.params.id)
    let obj = JSON.parse(data)
    obj[uniqueID] = req.body
    let json = JSON.stringify(obj, null, 2)

    fs.writeFile(db, json, (err) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send('updated employee')
      }
    })
  })
})

//Delate employee first in list
app.delete('/employees/delete/:id', (req, res) => {
  fs.readFile(db, 'utf8', (err, data) => {
    const uniqueID = parseInt(req.params.id)
    let obj = JSON.parse(data)
    delete obj[uniqueID]
    let json = JSON.stringify(obj, null, 2)
    
    fs.writeFile(db, json, (err) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send('deleted employee')
      }
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
