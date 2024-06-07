const mysql = require('mysql');
const con =require('../conf/connect');

  function createAction(idu,date_entree,res)  {
    con.query('SELECT * FROM user WHERE idu = ?', [idu], (err, res1) => {
      if (err) {
       console.error('Error fetching user:', err);
       res1.status(500).send('Error fetching user');
      } else if (res1.length === 0) {
       console.log(`user with ID ${idu} not found`);
       res.status(404).send("user with ID  not found");
      } else {
        con.query('insert into action values(?,?,?,?)',[idu,date_entree,date_entree,''],(err,res2)=>{
            res.status(201).send("action created successfully :)"); 
        }) 
      }
     });
  }
  function deletaction(userId,res) {
    con.query('DELETE FROM action WHERE idc = ?', [userId], (err, res1) => {
      if (err) {
        console.error('Error deleting action:', err);
        res.status(500).send('Error deleting action');
      } else if (res1.affectedRows === 0) {
        console.log(`action with ID ${userId} not found`);
        res.status(404).send('action is not found !');
      } else {
        console.log(`action with ID ${userId} deleted successfully`);
        res.status(202).send('Action deleted successfully !!!');
      }
    });
  }
  
  function updatAction(id,date,res) {
    con.query('UPDATE action SET date_sortie = ? WHERE idc = ?', [date,id], (err, res1) => {
      if (err) {
        console.error('Error updating action:', err);
        res.status(500).send('Error updating action');
      } else if (res1.affectedRows === 0) {
        console.log(`action with ID ${id} not 111 found`);
        res.status(404).send('action not found!');
      } else {
        console.log(`action with ID ${id} , updated successfully`);
        res.status(200).send('We Update the action successfully!');
      }
    });
  }
  function getActionById(idc, res) {
    con.query('SELECT * FROM action WHERE idc = ?', [idc], (err, result) => {
      if (err) {
        console.error('Error fetching action:', err);
        res.status(500).send('Error fetching action');
      } else if (result.length === 0) {
        console.log(`action with ID ${idc} not found`);
        res.status(404).send('action not found');
      } else {
        const action = result[0]; 
        console.log(`action with ID ${idc} found:`, action);
        res.status(202).send(action); // Assuming you want to send the categ data as JSON
      }
    });
  }
  function getAllAction(res) {
    con.query('SELECT * FROM action', (err, result) => {
      if (err) {
        console.error('Error fetching action:', err);
        res.status(500).send('Error fetching action');
      } else if (result.length === 0) {
        console.log(`their is no actions`);
        res.status(404).send('their is no action');
      } else {
        const action = result; 
        res.status(200).send(action); // Assuming you want to send the action data as JSON
      }
    });
  }

  module.exports = {createAction,deletaction,updatAction,getActionById,getAllAction};
