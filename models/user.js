const mysql = require('mysql');
const con =require('../conf/connect');

function createUser(nom,role,num_cart,date_creation,res) {
    con.query('insert into user values(?,?,?,?,?)',[nom,'',date_creation,role,num_cart],(err,result)=>{
      res.status(201).send("user created successfully");
    })
  }
  function deletUser(userId,res) {
    con.query('DELETE FROM user WHERE idu = ?', [userId], (err, res1) => {
      if (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Error deleting user');
      } else if (res1.affectedRows === 0) {
        console.log(`User with ID ${userId} not found`);
        res.status(404).send('User is not found !');
      } else {
        console.log(`User with ID ${userId} deleted successfully`);
        res.status(202).send('User deleted successfully!');
      }
    });
  }
  function updatUser(userId,newName,newCarta,res) {
    con.query('UPDATE user SET nom = ? , num_carte = ? WHERE idu = ?', [newName,newCarta,userId], (err, res1) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user');
      } else if (res1.affectedRows === 0) {
        console.log(`User with ID ${userId} not found`);
        res.status(404).send('User not found!');
      } else {
        console.log(`User with ID ${userId} updated successfully`);
        res.status(200).send('We Update the User successfully!');

      }
    });
  }
  function getUserById(idu, res) {
    con.query('SELECT * FROM user WHERE idu = ?', [idu], (err, result) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Error fetching user');
      } else if (result.length === 0) {
        console.log(`User with ID ${idu} not found`);
        res.status(404).send('User not found');
      } else {
        const user = result[0]; // Assuming there's only one row (single user)
        console.log(`User with ID ${idu} found:`, user);
        // Display user information (e.g., render a template, send JSON response)
        res.status(202).send(user); // Assuming you want to send the user data as JSON
      }
    });
  }
  function getAllUser(res) {
    con.query('SELECT * FROM user', (err, result) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Error fetching user');
      } else if (result.length === 0) {
        console.log(`their is no users`);
        res.status(404).send('their is no users');
      } else {
        const user = result; 
        res.status(200).send(user); // Assuming you want to send the user data as JSON
      }
    });
  }
  module.exports = {createUser,deletUser,updatUser,getUserById,getAllUser};
