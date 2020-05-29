// Mobile web development
// Final Project
// Template for General purpose html5 page with JQuery Mobile
// Created by: Yumi Lee
// email: ylee4918@conestogac.on.ca
// Date: April 18, 2020

//CRUD functions...
var Feedback = {
    ylInsert: function(options, callback){
        function txFunction(tx){
            var sql="INSERT INTO users(firstName, lastName, typeId, email, password, " +
                "pointcardNumber, point) values(?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);

        }
        function successTransaction(){
            console.info("Success: Insert Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    ylSelectAll: function (options, callback){
        function txFunction(tx){
            var sql="SELECT * FROM users;";
            tx.executeSql(sql, options, callback, errorHandler);

        }
        function successTransaction(){
            console.info("Success: Select All Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    ylSelectAllType: function (options, callback){
        function txFunction(tx){

            var sql="SELECT * FROM employeeType;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Select All Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    ylSelect: function (options, callback){
        function txFunction(tx){
            var sql="SELECT * FROM users WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Select Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    ylUpdate: function (options, callback){
        function txFunction(tx){
            var sql="UPDATE users SET firstName=?, lastName=?, email=?, " +
                "password=?, pointcardNumber=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Update Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    ylDelete: function (options, callback){
        function txFunction(tx){
            var sql="DELETE FROM users WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Delete Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

