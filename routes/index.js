var express = require('express');
var router = express.Router();


//########################################
//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
var path = require ('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value

router.use(bodyParser.json()); // for parsing application/json

router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//#########################################

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ReadFormDataSaveMongoDB' });
});


var controllerDatabase = require('../controllers/database');   //this will load the controller file below
router.post("/saveNewCustomer", controllerDatabase.saveNewCustomer); //see controllers/database.js file


/*show Customers*/
router.get("/customers", async (req, res) => {
  try {
    const customers = await controllerDatabase.getAllCustomers();
    console.log("Fetched customers:", customers);

    if (customers.length === 0) {
      return res.send("No customers found");
    }

    res.render("customers", { customers });
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
