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

    const ADMIN_URL = APIS.adminLogin;
    const ADMIN_PROFILE_URL = APIS.adminProfile;
    
    // ----------------------------------- APIs END ---------------------------------------//



    // ----------------------------------- LOGIN START ---------------------------------------//

    let isLoggingIn = false; // 🔒 lock

    $("#kt_login_signin_form").on("submit", function (e) {

        e.preventDefault(); // ✅ stop reload

        if (isLoggingIn) return; // 🚫 prevent multiple submit

        let userName = $("#adminUserName").val();
        let password = $("#adminPassword").val();
        const submitButton = $(this).find("button[type='submit']");

        if (userName && password) {

            isLoggingIn = true;
            submitButton.prop("disabled", true);

            // 🔵 SHOW LOADER
            $("#spinnerOverlay").css("display", "flex");
            $("body").css("pointer-events", "none");

            $.post(ADMIN_URL, { username: userName, password: password })

                .done(function (data) {

                    if (data.responsecode == 1) {

                        localStorage.setItem('Admin_auth', data.responseObject);
                        localStorage.setItem("TypeInfo", data.AdditionalInfo);

                        // 👉 SECOND API (NO async:false)
                        $.ajax({
                            url: `${ADMIN_PROFILE_URL}?id=${data.responseObject}`,
                            type: "GET",
                            dataType: "JSON",
                            crossDomain: true,

                            success: function (profile) {

                                localStorage.setItem('Admin_Name', profile.Name);
                                localStorage.setItem('Admin_UserName', profile.username);
                                localStorage.setItem("Admin_Phone", profile.phone);
                                localStorage.setItem("RoleId", profile.RoleId);
                                localStorage.setItem("EmployeeID", profile.EmployeeID);

                                SUCCESS_MESSAGE("Login Successfully");

                                if (profile.id === "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                    PAGE_REDIRECTION('./dashboard.html');
                                } else {
                                    PAGE_REDIRECTION('./empdashboard.html');
                                }
                            },

                            error: function () {
                                ERROR_MESSAGE("Failed to load profile");
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
                    isLoggingIn = false;
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