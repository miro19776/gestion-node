const mysql = require('mysql');
const con =require('../conf/connect');
function createMater(nom,idcat,stock,res) {
      con.query('SELECT * FROM categ WHERE idcat = ?', [idcat], (err, res1) => {
        if (err) {
         console.error('Error fetching categ:', err);
         res1.status(500).send('Error fetching categ');
        } else if (res1.length === 0) {
         console.log(`categ with ID ${idcat} not found`);
         res.status(404).send("categ with ID  not found");
        } else {
          con.query('insert into materiel values(?,?,?,?)',[nom,,idcat,stock],(err,res2)=>{
              res.status(201).send("materiel created successfully :)"); 
          }) 
        }
       });
    }
  function deletMater(userId,res) {
    con.query('DELETE FROM materiel WHERE idm = ?', [userId], (err, res1) => {
      if (err) {
        console.error('Error deleting materiel:', err);
        res1.status(500).send('Error deleting materiel');
      } else if (res1.affectedRows === 0) {
        console.log(`materiel with ID ${userId} not found`);
        res.status(404).send('materile is not found !');
      } else {
        console.log(`materiel with ID ${userId} deleted successfully`);
        res.status(200).send('materiel is  deleted successfully !');
      }
    });
  }
  function updatMater(userId,newName,stock,res) {
    con.query('UPDATE materiel SET nom = ? , stock = ? WHERE idm = ?', [newName,stock,userId], (err, res1) => {
      if (err) {
        console.error('Error updating categ:', err);
        res1.status(500).send('Error updating categ');
      } else if (res1.affectedRows === 0) {
        console.log(`categ with ID ${userId} not found`);
        res.status(404).send('User not found!');
      } else {
        console.log(`categ with ID ${userId} , updated successfully`);
        res.status(200).send('We Update the materiel successfully!');
      }
    });
  }
  function getMaterielById(idm, res) {
    con.query('SELECT * FROM materiel WHERE idm = ?', [idm], (err, result) => {
      if (err) {
        console.error('Error fetching materiel:', err);
        res.status(500).send('Error fetching materiel');
      } else if (result.length === 0) {
        console.log(`materiel with ID ${idm} not found`);
        res.status(404).send('materiel not found');
      } else {
        const materiel = result[0]; 
        console.log(`materiel with ID ${idm} found:`, materiel);
        res.status(200).send(materiel); // Assuming you want to send the materiel data as JSON
      }
    });
  }
  function getAllMater(res) {
    con.query('SELECT * FROM materiel', (err, result) => {
      if (err) {
        console.error('Error fetching materiel:', err);
        res.status(500).send('Error fetching materiel');
      } else if (result.length === 0) {
        console.log(`their is no materiels`);
        res.status(404).send('their is no materiel');
      } else {
        const materiel = result; 
        res.status(200).send(materiel); // Assuming you want to send the materiel data as JSON
      }
    });
  }
  
  module.exports = {createMater,deletMater,updatMater,getMaterielById,getAllMater};
