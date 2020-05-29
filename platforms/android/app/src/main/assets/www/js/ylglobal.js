// Mobile web development
// Final Project
// Template for General purpose html5 page with JQuery Mobile
// Created by: Yumi Lee
// email: ylee4918@conestogac.on.ca
// Date: April 18, 2020

//call init and initDB method
$(document).ready(function () {
    init();
    initDB();
});

function init() {
    console.info("DOM is ready");

    $("#btnRegister").on("click", ShowRegister);

    $("#btnSearch").on("click", btnShow_click);

    $("#btnCreateAccount").on("click", btnCreateAccount_click);

    $("#btnLogin").on("click", btnLogin_click);

    $("#clearDatabase").on("click", clearDatabase_click);

    $("#btnSaveEdit").on("click", btnSaveEdit_click);

    $("#btnLogOut").on("click", btnLogOut_click);

    $("#pageAccount").on("pageshow", pageAccount_show);

}
function pageAccount_show() {
    console.info("firstName");

    $("#txtEmailEdit").val(localStorage.getItem("email"));
    $("#txtFirstNameEdit").val(localStorage.getItem("firstName"));
    $("#txtLastNameEdit").val(localStorage.getItem("lastName"));
    $("#txtPasswordEdit").val(localStorage.getItem("password"));
    $("#txtPointcardNumberEdit").val(localStorage.getItem("pointcardNumber"));

}
function btnLogOut_click() {
    $("#divRegister").hide();
    $(location).prop("href", "#ylHomePage");
}
function btnSaveEdit_click() {
    EditUser();
}

function clearDatabase_click() {
    ylClearDatabase();
}

function btnLogin_click() {
    CheckLogin();

}
function ShowRegister() {
    $("#divRegister").show();
}

function btnCreateAccount_click(){
    registerUser();
}

//Call method to calculate ratings of Add page
function YLUpdateOverallHandler() {
    YLCalculateOverallRating("ylFoodQualityAddFB", "ylServiceAddFB",
        "ylValueAddFB", "ylOverallRatingAddFB");
}

function btnShow_click() {
    getPosition();
}

function ShowPageYourOffers() {
    console.info("1");

    $(location).prop("href", "#pageYourOffers");

}

//create tables
function initDB() {

    console.info("Creating Database... ");
    try {

        DB.ylCreateDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.ylCreateTables();
        }
        else {
            console.error("Error: cannot create tables: Database is not available");
        }
    } catch (e) {
        console.error("Error:  (Fatal) Error in initDB(). Cannot proceed");
    }

}




