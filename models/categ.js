const mysql = require('mysql');
const con =require('../conf/connect');

function createCateg(nom,date_creation,res) {
    con.query('insert into categ values(?,?,?)',[' ',nom,date_creation],(err,res1)=>{
      res.status(201).send('This categ created successfully!');
    })
  }
  function deletCateg(userId,res) {
    con.query('DELETE FROM categ WHERE idcat = ?', [userId], (err, res1) => {
      if (err) {
        console.error('Error deleting categ:', err);
        res.status(500).send('Error deleting categ');
      } else if (res1.affectedRows === 0) {
        console.log(`categ with ID ${userId} not found`);
        res.status(404).send('Categ with that ID  not found');
      } else {
        console.log(`categ with ID ${userId} deleted successfully`);
        res.status(200).send('Categ deleted successfully!');
      }
    });
  }
  
  function updatCateg(userId,newName,res) {
    con.query('UPDATE categ SET nom = ? WHERE idcat = ?', [newName,userId], (err, res1) => {
      if (err) {
        console.error('Error updating categ:', err);
        res.status(500).send('Error updating categ');
      } else if (res1.affectedRows === 0) {
        console.log(`categ with ID ${userId} not found`);
        res.status(404).send('Categ with that ID not found');
      } else {
        console.log(`categ with ID ${userId} , updated successfully`);
        res.status(200).send('We Update the User successfully!');
      }
    });
  }
  
  function getCategrById(idcat, res) {
    con.query('SELECT * FROM categ WHERE idcat = ?', [idcat], (err, result) => {
      if (err) {
        console.error('Error fetching categ:', err);
        res.status(500).send('Error fetching categ');
      } else if (result.length === 0) {
        console.log(`categ with ID ${idcat} not found`);
        res.status(404).send('categ not found');
      } else {
        const categ = result[0]; 
        console.log(`categ with ID ${idcat} found:`, categ);
        res.status(200).send(categ); // Assuming you want to send the categ data as JSON
      }
    });
  }

  function getAllCateg(res) {
    con.query('SELECT * FROM categ', (err, result) => {
      if (err) {
        console.error('Error fetching categ:', err);
        res.status(500).send('Error fetching categ');
      } else if (result.length === 0) {
        console.log(`their is no categs`);
        res.status(404).send('their is no categ');
      } else {
        const categ = result; 
        res.status(200).send(categ); // Assuming you want to send the categ data as JSON
      }
    });
  }
  module.exports = {createCateg,deletCateg,updatCateg,getCategrById,getAllCateg};
