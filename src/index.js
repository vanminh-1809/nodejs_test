const express = require('express');
const client = require('./connection.js')
const app = express();

app.use(express.json())

app.listen(3300, () => {
    console.log("Sever is now listening at port 3300");
})

client.connect();

app.get('/employee', (req, res)=>{
  client.query(`SELECT * FROM "Employee" ORDER BY id ASC`, (err, result)=>{
      if(!err){
          res.send(result.rows);
      }else{
        res.status(404).send('Error')
        console.log(err.message)
      }
  });
  client.end;
})

app.get('/employee/:id', (req, res)=>{
  client.query(`SELECT * FROM "Employee" WHERE id = ${req.params.id}`, (err, result)=>{
    if(!err){
      res.send(result.rows);
    }else{
      res.status(404).send('Error')
    }
  })
  client.end;
})

app.post('/employee/add', (req, res)=> {
  const user = req.body;
  const insertQuery = 
    `INSERT INTO "Employee"(name, birthday, position, department, entry_date)
    VALUES('${user.name}', '${user.birthday}', '${user.position}', '${user.department}', '${user.entry_date}')`

  client.query(insertQuery, (err, result)=>{
      if(!err){
          client.query(`SELECT * FROM "Employee" ORDER BY id ASC`, (err, result)=>{
            if(!err){
              res.send(result.rows);  
            }
          });
      }
      else{
        res.status(404).send('Error')
      }
  })
  client.end;
})

app.put('/employee/:id', (req, res)=>{
  const user = req.body;
  const updateQuery =
    `UPDATE "Employee"
    SET name = '${user.name}',
    birthday = '${user.birthday}',
    position = '${user.position}',
    department = '${user.department}',
    entry_date = '${user.entry_date}'
    WHERE id = ${req.params.id}`
  client.query(updateQuery  , (err, result)=>{
    if(!err){
      client.query(`SELECT * FROM "Employee" ORDER BY id ASC`, (err, result)=>{
        if(!err){
          res.send(result.rows);  
        }
      });
    }
    else{
      res.status(404).send('Error')
      console.log(err.message);
    }
  })
  client.end;
})

app.delete('/employee/:id', (req, res) => {
  const deleteQuery = `DELETE FROM "Employee" WHERE id = ${req.params.id}`;
  client.query(deleteQuery , (err, result) => {
    if(!err){
      client.query(`SELECT * FROM "Employee" ORDER BY id ASC"`, (err, result)=>{
        if(!err){
          res.send(result.rows);  
        }
      });
    }
    else{
      res.status(404).send('Error')
    }
  })
  client.end;
})
