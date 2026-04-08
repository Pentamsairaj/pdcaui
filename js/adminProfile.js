// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js'
import reUsableFunctions from './reUsableFunctions.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//

$(() => {

    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//


    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const PAGE_RELOAD = reUsableFunctions.pageReload;
    const PAGE_REDIRECTION = reUsableFunctions.pageReDirection;

    const ADMIN_AUTH = localStorage.getItem("Admin_auth");

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//

        // ----------------------------------- APIs START ---------------------------------------//
        
        const ADMIN_PROFILE_URL = APIS.adminProfile;
        const ADMIN_EDIT_PROFILE_URL = APIS.adminEditProfile;
        const ADMIN_CHANGE_PASSWORD_URL = APIS.adminChangePassword;

        // ----------------------------------- APIs END ---------------------------------------//

    // ------------------------------------------ TOGGLE OF DATA FOR EDIT ADMIN PROFILE START--------------------//

    // ADMIN PROFILE START

    $("#saveAdminEditInfo").hide();

    $("#editAdminInfo").click(() => {
        $("#editAdminInfo").hide();
        $("#saveAdminEditInfo").show();
        $("#editAdminName").removeAttr('readonly');
        $("#editAdminPhone").removeAttr('readonly');
        $("#editAdminEmail").removeAttr('readonly');

    });

    $("#cancelupdateProfile").click(() => {
        $("#editAdminInfo").show();
        $("#saveAdminEditInfo").hide();
        $("#editAdminName").attr('readonly', 'true');
        $("#editAdminPhone").attr('readonly', 'true');
        $("#editAdminEmail").attr('readonly', 'true');
    })

    // ADMIN PROFILE END

    // ADMIN MYINFO START
    $("#saveAdminEditEmail").hide();
    $("#cancelupdateEmail").hide();

    $("#editAdminInfoEmail").click(() => {
        $("#cancelupdateEmail").show();
        $("#saveAdminEditEmail").show();
        $("#editAdminInfoEmail").hide();

        $("#editEmailInfo").removeAttr('readonly');
    });
    $("#cancelupdateEmail").click(() => {
        $("#saveAdminEditEmail").hide();
        $("#cancelupdateEmail").hide();
        $("#editAdminInfoEmail").show();
        $("#editEmailInfo").attr('readonly', 'true');
    })

    // ADMIN MYINFO END
    // ------------------------------------------ TOGGLE OF DATA FOR EDIT ADMIN PROFILE END--------------------//

    // ------------------------------------------ GET ADMIN PROFILE START -------------------------------------//
    const getAdminProfile = () => {

        $.get(`${ADMIN_PROFILE_URL}?id=${ADMIN_AUTH}`).done((data) => {
            $("#adminName").html(data.Name);
            $("#adminProfile").html(data.username);
            $("#adminPhone").html(data.phone);
            if (data.Email == null) {
                $("#adminEmail").html("pdca4mtestemail@email.com");
            } else {
                $("#adminEmail").html(data.Email);
            }

            $("#editAdminName").val(data.Name);
            $("#editAdminPhone").val(data.phone);
            $("#editAdminEmail").val(data.Email);
        })


    };


    // ------------------------------------------ GET ADMIN PROFILE END -------------------------------------//

    // ------------------------------------------ EDIT ADMIN PROFILE START-------------------------------------//
    $("#saveAdminEditInfo").click(function () {
        let adminName = $("#editAdminName").val();
        let adminPhone = $("#editAdminPhone").val();
        let adminEmail = $("#editAdminEmail").val();

        $.post(ADMIN_EDIT_PROFILE_URL, { "id": ADMIN_AUTH, "phone": adminPhone, "Email": adminEmail, "Name": adminName })
            .done((data) => {
              

                if (data.responsecode == 1) {
                    SUCCESS_MESSAGE("Profile Updated Successfully");
                    PAGE_RELOAD();
                }
                else if (data.responsecode == 2) {
                    PAGE_REDIRECTION("/teamlogin.html");
                }
                else if (data.responsecode == 6) {
                    ERROR_MESSAGE("Sorry, Something went wrong");
                }
                else if (data.responsecode == 0) {
                    ERROR_MESSAGE(data.responsemessage);
                }
            })

    });

    // ------------------------------------------ EDIT ADMIN PROFILE END -------------------------------------//


    // ------------------------------------------  ADMIN RESET PASSWORD START -------------------------------------//

    $("#cancelResetPassword").click(() => {
        $("#newPassword").val("");
        $("#VerifyNewPassword").val("");
    });

    $("#saveAdimnResetPassword").click(() => {
        let newPassord = $("#newPassword").val();
        let VerifyNewPassword = $("#VerifyNewPassword").val();


        if (newPassord === VerifyNewPassword) {

            $.post(ADMIN_CHANGE_PASSWORD_URL, { "id": ADMIN_AUTH, "password": newPassord })
                .done((data) => {
                    if (data.responsecode == 1) {
                        SUCCESS_MESSAGE(data.responsemessage);
                       PAGE_RELOAD();
                    }
                    else if (data.responsecode == 2) {
                        PAGE_REDIRECTION("/teamlogin.html");
                    }
                    else if (data.responsecode == 6) {
                        ERROR_MESSAGE("Sorry, Something went wrong");
                    }
                    else if (data.responsecode == 0) {
                        ERROR_MESSAGE(data.responsemessage);

                    }
                });
        } else {
            ERROR_MESSAGE("Password and Verify Password are not same");
            $("#newPassword").val("");
            $("#VerifyNewPassword").val("");
        }
    })
    // ------------------------------------------  ADMIN RESET PASSWORD END -------------------------------------//

    // ------------------------------------------  Get Admin Email Settings -------------------------------------//
    // const getAdminEmailInfo = () => {

    //     $.ajax({
    //         url: "https://adeftech.annamrajus.com/Admin/Myinfo?id=" + PROJECT_ID + "&project_id=" + PROJECT_ID + "&authorid=" + ProjectAuth + "",
    //         type: "GET",
    //         dataType: "JSON",
    //         async: true,
    //         crossDomain: true,
    //         success: function (data) {

    //             $("#editAdminName").val(data.info_email);
    //         }
    //     });
    // };



    // ------------------------------------------ Get Admin Email Settings End-------------------------------------//


    // ------------------------------------------ Edit Admin Email Settings End-------------------------------------//
    // $("#editCompanylogoBtn").click(() => {
    //     UPLOAD_IMAGE("kt_image_6");
    // })

    // $("#saveAdminEditEmail").click(() => {

    //     let adminInfoEmail = $("#editEmailInfo").val();
    //     let file = $("#comapnyImage")[0].files[0];

    //     if (file == undefined) {
    //         if (PROJECT_ID != null) {
    //             $.ajax({
    //                 url: "https://adeftech.annamrajus.com/Admin/Myinfo?id=" + PROJECT_ID + "&project_id=" + PROJECT_ID + "&authorid=" + ProjectAuth + "",
    //                 type: "POST",
    //                 data: { "project_id": PROJECT_ID, "authorid": ProjectAuth, "id": PROJECT_ID, "info_email": adminInfoEmail, "image": imagestr },
    //                 async: false,
    //                 dataType: "JSON",
    //                 crossDomain: true,
    //                 success: function (data) {

    //                     if (data.responsecode == 1) {
    //                         SUCCESS_MESSAGE("Profile Updated Successfully");
    //                         PAGE_RELOAD();
    //                     }
    //                     else if (data.responsecode == 2) {
    //                         PAGE_REDIRECTION("/Admin/teamlogin.html");
    //                     }
    //                     else if (data.responsecode == 6) {
    //                         ERROR_MESSAGE("Sorry, Something went wrong");
    //                     }
    //                     else if (data.responsecode == 0) {
    //                         ERROR_MESSAGE(data.responsemessage);
    //                     }
    //                 },

    //                 error: function (xhr) {
    //                     //
    //                 }
    //             });
    //         }
    //     }
    //     else {
    //         let reader = new FileReader();
    //         reader.onloadend = function () {
    //             let imagebase64 = reader.result;
    //             let imagestr = imagebase64;
    //             if (PROJECT_ID != null) {
    //                 $.ajax({
    //                     url: "https://adeftech.annamrajus.com/Admin/Myinfo?id=" + PROJECT_ID + "&project_id=" + PROJECT_ID + "&authorid=" + ProjectAuth + "",
    //                     type: "POST",
    //                     data: { "project_id": PROJECT_ID, "authorid": ProjectAuth, "id": PROJECT_ID, "info_email": adminInfoEmail, "logo": imagestr },
    //                     async: false,
    //                     dataType: "JSON",
    //                     crossDomain: true,
    //                     success: function (data) {

    //                         if (data.responsecode == 1) {
    //                             SUCCESS_MESSAGE("Email Settings are Succesfully done");
    //                             PAGE_RELOAD();
    //                         }
    //                         else if (data.responsecode == 2) {
    //                             PAGE_REDIRECTION("/Admin/teamlogin.html");
    //                         }
    //                         else if (data.responsecode == 6) {
    //                             ERROR_MESSAGE("Sorry, Something went wrong");
    //                         }
    //                         else if (data.responsecode == 0) {
    //                             ERROR_MESSAGE(data.responsemessage);
    //                         }
    //                     },

    //                     error: function (xhr) {
    //                         //
    //                     }
    //                 });
    //             }
    //         }
    //         reader.readAsDataURL(file);
    //     }
    // });
    // ------------------------------------------ Edit Admin Email Settings End-------------------------------------//

    // ----------------------------------- FUNCTION INVOCATION START ---------------------------------------//

    getAdminProfile();
    // getAdminEmailInfo();
    // ----------------------------------- FUNCTION INVOCATION END ---------------------------------------//

});

