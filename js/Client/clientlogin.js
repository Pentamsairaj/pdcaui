"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js'
import reUsableFunctions from './reUsableFunctions.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//

$(() => {

    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const PAGE_REDIRECTION = reUsableFunctions.pageReDirection;

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//

    // ----------------------------------- APIs START ---------------------------------------//

    const CLIENT_URL = APIS.clientLogin;
    const CLIENT_PROFILE_URL = APIS.clientProfile;

    // ----------------------------------- APIs END ---------------------------------------//



    // ----------------------------------- LOGIN START ---------------------------------------//

    let isClientLoggingIn = false; // 🔒 lock

    $("#kt_login_signin_form").on("submit", function (e) {

        e.preventDefault(); // ✅ stop reload

        if (isClientLoggingIn) return; // 🚫 prevent multiple submit

        let userName = $("#clientUserName").val();
        let password = $("#clientPassword").val();
        const submitButton = $(this).find("button[type='submit']");

        if (userName && password) {

            isClientLoggingIn = true;
            submitButton.prop("disabled", true);

            // 🔵 SHOW LOADER
            $("#spinnerOverlay").css("display", "flex");
            $("body").css("pointer-events", "none");

            $.post(CLIENT_URL, { email: userName, password: password })

                .done(function (data) {

                    if (data.responsecode == 1) {

                        localStorage.setItem('Client_auth', data.responseObject);
                        localStorage.setItem("TypeInfo", data.AdditionalInfo);

                        // 👉 GET PROFILE
                        $.ajax({
                            url: `${CLIENT_PROFILE_URL}?id=${data.responseObject}`,
                            type: "GET",
                            dataType: "JSON",
                            crossDomain: true,

                            success: function (res) {

                                let client = JSON.parse(res.data);

                                localStorage.setItem('Client_Name', client.NameAcc);
                                localStorage.setItem('Client_UserName', client.EmailidAcc);
                                localStorage.setItem('Client_Phone', client.PhoneAcc);

                                SUCCESS_MESSAGE("Login Successfully");

                                PAGE_REDIRECTION('./clientdashboard.html');
                            },

                            error: function () {
                                ERROR_MESSAGE("Failed to load client profile");
                            }
                        });

                    } else {
                        ERROR_MESSAGE("Invalid User Name / Password");
                    }
                })

                .fail(function () {
                    ERROR_MESSAGE("Login failed. Try again.");
                })

                .always(function () {
                    // 🔓 unlock + restore UI
                    isClientLoggingIn = false;
                    submitButton.prop("disabled", false);
                    $("#spinnerOverlay").hide();
                    $("body").css("pointer-events", "auto");
                });

        } else {
            ERROR_MESSAGE("All Fields Required");
        }
    });
    // ----------------------------------- LOGIN END ---------------------------------------//
});