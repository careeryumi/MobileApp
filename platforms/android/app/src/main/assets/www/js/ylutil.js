// Mobile web development
// Final Project
// Template for General purpose html5 page with JQuery Mobile
// Created by: Yumi Lee
// email: ylee4918@conestogac.on.ca
// Date: April 18, 2020


function doValidate_formRegister() {

    var form = $("#formRegister");
    form.validate({
        rules: {
            txtRegisterFirstName: {
                required: true,
                minlength: 1,
                maxlength: 20
            },
            txtRegisterLastName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            txtRegisterEmail: {
                required: true,
                email: true,
                ylEmailcheck: true
            },
            txtRegisterPassword: {
                required: true,
                passwordCheck: true
            },
            txtRegisterPasswordVerify: {
                required: true,
                passwordValidationCheck: true
            }
        },
        messages: {
            txtRegisterFirstName: {
                required: "You must specify first name",
                minlength: "Length must be 2-20 characters long"
            },
            txtRegisterLastName: {
                required: "You must specify last name",
                minlength: "Length must be 2-20 characters long"
            },
            txtRegisterEmail: {
                required: "You must enter an email",
                email: "You must enter a valid email address",
                ylEmailcheck: "Email must be a valid email address"
            },
            txtRegisterPassword: {
                required: "You must enter an password",
                passwordCheck: "You must contain at least 4 characters"
            },
            txtRegisterPasswordVerify: {
                required: "You must enter a password",
                passwordValidationCheck: "Email must be matched"
            }
        }
    });

    return form.valid();

}

//jQuery custom validation for email
jQuery.validator.addMethod("ylEmailcheck",
    function (value, element) {

        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return this.optional(element) || regex.test(value);
    },
    "Our custom email checker"
);

//jQuery custom validation for password
jQuery.validator.addMethod("passwordCheck",
    function (value, element) {

        var regex = /^.{4,8}$/;
        // var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return this.optional(element) || regex.test(value);
    },
    "Our custom password checker"
);

//jQuery custom validation for password matching
jQuery.validator.addMethod("passwordValidationCheck",
    function (value, element) {

        console.info("1");

        if ($("#txtRegisterPassword").val().toString() == $("#txtRegisterPasswordVerify").val().toString() ) {
            console.info("2");
            return true;
        }
            console.info("3");
            return false;


    },
    "Our custom email matching checker"
);


