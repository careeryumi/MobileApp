// Mobile web development
// Final Project
// Template for General purpose html5 page with JQuery Mobile
// Created by: Yumi Lee
// email: ylee4918@conestogac.on.ca
// Date: April 18, 2020

function EditUser() {

    var id = localStorage.getItem("id");
    var txtFirstNameEdit = $("#txtFirstNameEdit").val();
    var txtLastNameEdit = $("#txtLastNameEdit").val();
    var txtEmailEdit = $("#txtEmailEdit").val();
    var txtPasswordEdit = $("#txtPasswordEdit").val();
    var txtPointcardNumberEdit = $("#txtPointcardNumberEdit").val();

    var options = [txtFirstNameEdit, txtLastNameEdit, txtEmailEdit, txtPasswordEdit,txtPointcardNumberEdit, id];
    function callback(){
        console.info("Record updated successfully");

        //for your offers page
        $("#your").text(txtFirstNameEdit);

        //for point card page
        $("#nameOnPointCard").text(txtFirstNameEdit);
        $("#pointCardNumber").text(txtPointcardNumberEdit);

    }
    Feedback.ylUpdate(options, callback);
}

function CheckLogin() {
    if ($("#txtFirstPageEmail").val() != "" && $("#txtFirstPagePassword").val() != "") {

        var options = [];

        function callback(tx, results) {

            var isEmailPasswordMatch = false;
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                console.info("id: " + row['id'] +
                    " Name: " + row['firstName']
                );

                //Control Your offers page header and Point card page
                //to Change pages according to users
                getLocalStorage(row['id'], row['firstName'],row['lastName'],row['password'], row['point'], row['pointcardNumber'], row['email']);

                console.info("aftergoingtolocalstorage");

                if (row['email'] == $("#txtFirstPageEmail").val() && row['password'] == $("#txtFirstPagePassword").val()) {
                    $(location).prop("href", "#pageYourOffers");
                    isEmailPasswordMatch = true;
                }
            }

            if (!isEmailPasswordMatch) {
                alert("Please check your email and password \n" +
                    "New to Hi point? Please click Register");
            }
        }

        Feedback.ylSelectAll(options, callback);
    }
    else{
        alert("Email and password needed");
    }
}

function getLocalStorage(id,firstName, lastName, password, point, pointcardNumber, email) {

    console.info("setllocal");

    localStorage.setItem("id", id);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("password", password);
    localStorage.setItem("point", point);
    localStorage.setItem("pointcardNumber", pointcardNumber);
    localStorage.setItem("email", email);

    console.info(firstName);

    var firstName = localStorage.getItem("firstName");
    var point = localStorage.getItem("point");
    var pointcardNumber = localStorage.getItem("pointcardNumber");

    //for your offers page
    $("#your").text(firstName);
    $("#point").text(point);

    //for point card page
    $("#nameOnPointCard").text(firstName);
    $("#pointCardNumber").text(pointcardNumber);
    $("#pointPointCardPage").text(point);

    var redeemableValue = point / 10;
    $("#redeemableValue").text(redeemableValue);

    //Animate points
    function animateValue(id, start, end, duration) {
        var range = end - start;
        var current = start;
        var increment = end > start ? 1 : +1;
        var stepTime = Math.abs(Math.floor(duration / range));
        var obj = document.getElementById(id);
        var timer = setInterval(function () {
            current += increment;
            obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    animateValue("point", point -100, point, 5000);

}

//Call function to drop tables
function ylClearDatabase() {
    var result = confirm("Really want to clear database? ");
    try {
        if (result) {
            DB.ylDropTables();
            alert("Database cleared");
        }
    } catch (e) {
        alert(e);
    }
}

function registerUser() {

    // 1. check the validation of the form
    if (doValidate_formRegister()) {
        console.info("Form is valid");

        // 2. if validation is ok then fetch the information from the form
        var txtRegisterFirstName = $("#txtRegisterFirstName").val();
        var txtRegisterLastName = $("#txtRegisterLastName").val();

        var typeId = 2;
        var point = 0;

        if ($("#txtPointcardNumber").val().startsWith("7", 0)) {
            typeId = 1;
            point = 20000;
        }
        else {
            typeId = 2;
            point = 10000;
        }

        var txtRegisterEmail = $("#txtRegisterEmail").val();
        var txtRegisterPassword = $("#txtRegisterPassword").val();
        var txtPointcardNumber = $("#txtPointcardNumber").val();
        if (txtPointcardNumber == "") {

            txtPointcardNumber = 9999999999;
        }


        var options = [];

        var howManyid;
        function callback(tx, results) {

            howManyid = results.rows.length;
            var newid = howManyid + 1;

            isEmailExist = false;
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                console.info("id: " + row['id'] +
                    " Name: " + row['firstName']
                );

                if (row['email'] == txtRegisterEmail) {

                    isEmailExist = true;
                }
                else {
                    console.info(row['firstName']);
                }
            }

            if (isEmailExist) {
                alert("Same email already exist. \n Please register a new email " +
                    "or find your email account");
            }
            else {


                // 3. save the information to a table
                var options = [txtRegisterFirstName, txtRegisterLastName, typeId, txtRegisterEmail, txtRegisterPassword, txtPointcardNumber, point];

                //Control Your offers page header and Point card page
                //to Change pages according to users

                getLocalStorage(newid, txtRegisterFirstName,txtRegisterLastName,
                    txtRegisterPassword,point,txtPointcardNumber,txtRegisterEmail);

                function callback() {
                    alert("New account added \n You got welcome points ");
                }

                $(location).prop("href", "#pageYourOffers");

                Feedback.ylInsert(options, callback);
            }
        }

        Feedback.ylSelectAll(options, callback);

    }
    else {
        console.error("Form is invalid");
    }

}

