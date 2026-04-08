"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
//import { BASEURL } from './Global.js';
import reUsableFunctions from './reUsableFunctions.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//




$(() => {

    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const PAGE_REDIRECTION = reUsableFunctions.pageReDirection;
    const PAGE_RELOAD = reUsableFunctions.pageReload;

    const AUTHOR_ID = localStorage.getItem("Admin_auth");
    const BASE_URL = "https://api.pdca.in/" /*BASEURL*/;

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//


    // ----------------------------------- ROLE CREATION START ---------------------------------------//

    $("#createRole").click(() => {
        let roleName = $("#roleName").val();
        let createRoleUrl = `${BASE_URL}/Role/Create`;
        if (roleName) {
            $.post(createRoleUrl, {"AdminId": AUTHOR_ID, "name": roleName })
                .done((data) => {
                    if (data.responsecode == 1) {
                        $("#addRoleModal").modal('toggle');
                        SUCCESS_MESSAGE(data.responsemessage);
                        PAGE_RELOAD();
                    } else if (data.responseCode == 2) {
                        PAGE_REDIRECTION("teamlogin.html");
                    } else if (data.responseCode == 6) {
                        ERROR_MESSAGE("Sorry, Something went wrong");
                    } else if (data.responseCode == 0) {
                        ERROR_MESSAGE(data.responsemessage);
                    };
                })
                .fail((xhr) => {
                    if (xhr.status == 404) {
                        PAGE_REDIRECTION("../404.html");
                    } else if (xhr.status == 401) {
                        location.clear();
                        PAGE_REDIRECTION("../teamlogin.html");
                    }
                });
        } else {
            ERROR_MESSAGE("Role Name is Required");
        }

    });
    // ----------------------------------- ROLE CREATION END ---------------------------------------//


    // ----------------------------------- LIST OF ROLES START ---------------------------------------//
    const getRoleList = () => {
        let getRoleListUrl = `${BASE_URL}/Role/Index?AdminId=${AUTHOR_ID}`

        $.get(getRoleListUrl)
            .done(data => {

                if (Object.keys(data).length > 0) {

                    $("#table_id tbody").empty();
                    let S_NO = 0;
                    $.each(data, (index, value) => {
                        var completedDate = new Date(parseInt(value.createdon.replace("/Date(", "").replace(")/")));
                        var dd = completedDate.getDate();
                        var mm = completedDate.getMonth() + 1; //January is 0! 
                        var yyyy = completedDate.getFullYear();
                        if (dd < 10) { dd = '0' + dd }
                        if (mm < 10) { mm = '0' + mm }
                        const datef = + dd + '/' + mm + '/' + yyyy;
                        let newRoleRow = `<tr><td>${++S_NO}</td><td>${value.name}</td><td>${datef}</td><td><button class="btn role_delete" id=${value.id} roleId=${value.id}><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></button></td></tr>`;

                        $("#table_id tbody").append(newRoleRow);
                    });
                    $('#table_id').DataTable();
                } else {

                    const MessageRow = `<tr><td></td><td></td><td><h6 class='text-center font-weight-bold pt-5'>No Data Found</h6></td><td></td><td></td><td></td></tr>`;
                    $("#table_id tbody").append(MessageRow);

                };
                $('#table-id').DataTable();
            });
    };

    // ----------------------------------- LIST OF ROLES END ---------------------------------------//


    // ----------------------------------- DELETE ROLE START ---------------------------------------//

    $("#table_id tbody").on('click', '.role_delete', function () {
        let response = confirm("Are you sure do you want to Delete!");
        let roleId = $(this).attr('roleId');
        let roleDeleteUrl = `${BASE_URL}/Role/Delete?AdminId=${AUTHOR_ID}&id=${roleId}`

        if (response == true) {
            $.post(roleDeleteUrl, { "id": roleId })
                .done(data => {
                    
                    if (data.responsecode == 1) {
                        $("#" + roleId).closest("tr").css("background", "tomato");
                        $("#" + roleId).closest("tr").css("color", "#fff");
                        $("#" + roleId).closest("tr").fadeOut(1000, function () {
                            $(this).remove();
                            SUCCESS_MESSAGE("Role Deleted Successfully");
                        });
                    } else if (data.responseCode == 6) {
                        ERROR_MESSAGE("Sorry, Something went wrong");
                    }
                    else if (data.responseCode == 0) {
                        ERROR_MESSAGE(data.responsemessage);
                    };
                })
                .fail((xhr) => {
                    if (xhr.status == 404) {
                        PAGE_REDIRECTION("../404.html");
                    } else if (xhr.status == 401) {
                        location.clear();
                        PAGE_REDIRECTION("../teamlogin.html");
                    }
                });
        };
    });
    // ----------------------------------- DELETE ROLE END ---------------------------------------//



    // ----------------------------------- FUNCTION INVOCATION START ---------------------------------------//

    getRoleList();

    // ----------------------------------- FUNCTION INVOCATION END ---------------------------------------//

});
