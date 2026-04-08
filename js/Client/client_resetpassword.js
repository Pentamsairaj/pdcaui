"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js'
import reUsableFunctions from './reUsableFunctions.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//

$(() => {
    const params = new URLSearchParams(window.location.search);
    const custemail = params.get("cust_email");
    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const PAGE_REDIRECTION = reUsableFunctions.pageReDirection;

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//

    // ----------------------------------- APIs START ---------------------------------------//

    const CLIENT_URL = APIS.clientresetpswd;
    const CLIENT_PROFILE_URL = APIS.clientProfile;

    // ----------------------------------- APIs END ---------------------------------------//



    // ----------------------------------- LOGIN START ---------------------------------------//

    $("#kt_login_signin_form").on("submit", function (e) {

        e.preventDefault(); // ✅ stop reload

        let new_password = $("#clientPassword1").val();
        let confirm_password = $("#clientPassword2").val();


        // ✅ validations
        if (!new_password || !confirm_password) {
            ERROR_MESSAGE("All fields are required");
            return;
        }

        if (new_password !== confirm_password) {
            ERROR_MESSAGE("Passwords do not match");
            return;
        }

        // ✅ API call
        $.ajax({
            url: "https://api.pdca.in/Client/ResetPassword",
            type: "POST",
            data: {
                email: custemail,
                password: new_password
            },
            dataType: "JSON",

            success: function (data) {

                if (data.responsecode === 1) {
                    SUCCESS_MESSAGE("Password reset successful");

                    // optional: clear session
                    sessionStorage.removeItem("cust_email");

                    // redirect to login
                    window.location = "./clientlogin.html";
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            },

            error: function () {
                ERROR_MESSAGE("Something went wrong. Try again.");
            }

        });

    });


    // ----------------------------------- LOGIN END ---------------------------------------//
});