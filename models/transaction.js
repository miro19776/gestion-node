const mysql = require('mysql');
const con =require('../conf/connect');

function createtrans(idu,idm,date,qant,type,res) {  
    con.query('SELECT * FROM user WHERE idu = ?', [idu], (err, res1) => {
      if (err) {
       console.error('Error fetching user:', err);
       res.status(500).send('Error fetching user');
      } else if (res1.length === 0) {
       console.log(`user with ID ${idu} not found`);
       res.status(404).send("user with ID not found");
      } else {
        con.query('SELECT * FROM materiel WHERE idm = ?', [idm], (err, res2) => {
            if (err) {
             console.error('Error fetching materiel:', err);
             res.status(500).send('Error fetching materiel');
            } else if (res2.length === 0) {
             console.log(`materiel with ID ${idm} not found`);
             res.status(404).send("materiel with ID not found");
            } else {
            con.query('insert into transaction values(?,?,?,?,?,?)',[idu,idm,date,qant,type,''],(err,res2)=>{
              console.log("abay");
              res.status(201).send("transaction created successfully :)"); 
        }) ;
      };
     });
  };
});
}

  function delettrans(userId,res) {
    con.query('DELETE FROM transaction WHERE id = ?', [userId], (err, res1) => {
      if (err) {
        console.error('Error deleting transaction:', err);
        res.status(500).send('Error deleting transaction');
      } else if (res1.affectedRows === 0) {
        console.log(`transaction with ID ${userId} not found`);
        res.status(404).send('transaction not found!');

      } else {
        console.log(`transaction with ID ${userId} deleted successfully`);
        res.status(201).send('transaction deleted successfully!');
      }
    });
  }
  
  function updatTrans(id,idu,idm,date,qant,type,res) {
    con.query('UPDATE transaction SET idu = ? , idm = ? , date = ? , qant = ? , type = ?  WHERE id = ?', [idu,idm,date,qant,type,id], (err, res1) => {
      if (err) {
        console.error('Error updating transaction:', err);
        res.status(500).send('Error updating transaction');
      } else if (res1.affectedRows === 0) {
        console.log(`transaction with ID ${id} not found`);
        res.status(404).send('transaction not found!');
      } else {
        console.log(`transaction with ID ${id} , updated successfully`);
        res.status(200).send('We Update the transaction successfully!');
      }
    });
  }
  
  function gettransById(id, res) {
    con.query('SELECT * FROM transaction WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error fetching transaction:', err);
        res.status(500).send('Error fetching transaction');
      } else if (result.length === 0) {
        console.log(`transaction with ID ${id} not found`);
        res.status(404).send('transaction not found');
      } else {
        const transaction = result[0]; 
        console.log(`transaction with ID ${id} found:`, transaction);
        res.status(200).send(transaction); // Assuming you want to send the transaction data as JSON
      }
    });
  }

  function getAllTrans(res) {
    con.query('SELECT * FROM transaction', (err, result) => {
      if (err) {
        console.error('Error fetching transaction:', err);
        res.status(500).send('Error fetching transaction');
      } else if (result.length === 0) {
        console.log(`their is no transactions`);
        res.status(404).send('their is no transaction');
      } else {
        const transaction = result; 
        res.status(200).send(transaction); // Assuming you want to send the transaction data as JSON
      }
    });
  }
module.exports = {createtrans,delettrans,updatTrans,gettransById,getAllTrans};
