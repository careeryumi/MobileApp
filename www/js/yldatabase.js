// Mobile web development
// Final Project
// Template for General purpose html5 page with JQuery Mobile
// Created by: Yumi Lee
// email: ylee4918@conestogac.on.ca
// Date: April 18, 2020

var db;

//error handler
function errorHandler(tx, error) {
    console.error("SQL Error: " + tx + " ( " + error.code + ") -- " + error.message);
}

//Functions to Create and droptables
var DB = {
    ylCreateDatabase: function(){
        var shortName = "Yumi Lee Hi points DB";
        var version = "1.0";
        var displayName = "DB for Hi points app";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess(){
            console.info("Success: Database creation successful");
        }
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

    },
    ylCreateTables: function () {
        function txFunction(tx){

            //Drop table type first
            var sql = "DROP TABLE IF EXISTS employeeType;";
            var options = [];
            function successCallback(){
                console.info("Success: Table type dropped successfully");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);

            // create table type
            var sql = "CREATE TABLE IF NOT EXISTS employeeType( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "isEmployee BOOLEAN);";
            var options = [];
            function successCallback(){
                console.info("Success: employeeType Table type creation successful");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);

            //insert 1st row of the type table
            var sql = "INSERT INTO employeeType(isEmployee) values(true);";
            var options = [];
            function successCallback(){
                console.info("Success: Insert true row of table type successful");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);

            //insert 2nd row of the type table
            var sql = "INSERT INTO employeeType(isEmployee) values(false);";
            var options = [];
            function successCallback(){
                console.info("Success: Insert false row of table type successful");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);

            //Declare sql for create table review
            var sql = "CREATE TABLE IF NOT EXISTS users( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "firstName VARCHAR(30) NOT NULL," +
                "lastName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "email VARCHAR(30) NOT NULL," +
                "password VARCHAR(30) NOT NULL ," +
                "pointcardNumber INTEGER," +
                "point INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES employeeType(id));";
            var options = [];
            function successCallback(){
                console.info("Success: users table successful");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);

        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    ylDropTables: function(){
        function txFunction(tx){

            //Drop table type first
            var sql = "DROP TABLE IF EXISTS employeeType;";
            var options = [];
            function successCallback(){
                console.info("Success: Table employeeType dropped successfully");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);

            var sql = "DROP TABLE IF EXISTS users;";
            var options = [];
            function successCallback(){
                console.info("Success: Table review dropped successfully");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);

        }
        function successTransaction(){
            console.info("Success: transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
