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
        let groupName = $("#groupName").val();
        let groupindex = $("#groupindex").val();
        let createRoleUrl = `${BASE_URL}Group/CreateGroup`;
        if (groupName) {
            $.post(createRoleUrl, { "Author_ID": AUTHOR_ID, "Name": groupName, "groupindex": groupindex })
                .done((data) => {
                    if (data.responsecode == 1) {
                        $("#addRoleModal").modal('toggle');
                        SUCCESS_MESSAGE(data.responsemessage);
                        //PAGE_RELOAD();
                        getRoleList();
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
            ERROR_MESSAGE("Group Name is Required");
        }

    });
    // ----------------------------------- ROLE CREATION END ---------------------------------------//


    // ----------------------------------- LIST OF ROLES START ---------------------------------------//
    const getRoleList = () => {
        let getRoleListUrl = `${BASE_URL}Group/GroupList`;

        $.get(getRoleListUrl)
            .done(data => {
                // Clear previous DataTable instance to avoid duplicate table initialization
                if ($.fn.DataTable.isDataTable('#table_id')) {
                    $('#table_id').DataTable().clear().destroy();
                }

                $("#table_id tbody").empty(); // Clear the table body

                if (Object.keys(data).length > 0) {
                    $.each(data, (index, value) => {
                        let newRoleRow = `<tr><td>${index + 1}</td><td>${value.groupindex}</td><td>${value.Name}</td><td><button class="btn role_delete" id=${value.ID} roleId=${value.ID}><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></button></td></tr>`;
                        $("#table_id tbody").append(newRoleRow);
                    });

                    // Reinitialize DataTable
                    $('#table_id').DataTable();
                } else {
                    const MessageRow = `<tr><td colspan="3"><h6 class='text-center font-weight-bold pt-5'>No Data Found</h6></td></tr>`;
                    $("#table_id tbody").append(MessageRow);
                }
            });
    };

    // ----------------------------------- LIST OF ROLES END ---------------------------------------//


    // ----------------------------------- DELETE ROLE START ---------------------------------------//

    $("#table_id tbody").on('click', '.role_delete', function () {
        let response = confirm("Are you sure do you want to Delete!");
        let roleId = $(this).attr('roleId');
        let roleDeleteUrl = `${BASE_URL}Group/DeleteGroup?AdminId=${AUTHOR_ID}&id=${roleId}`
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
                        getRoleList();
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
