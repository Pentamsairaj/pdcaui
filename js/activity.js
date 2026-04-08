"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
//import {BASEURL } from './Global.js';
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
    const TEMPLATE_LIST_FOR_GROUP_LIST = `${BASE_URL}Group/GroupList`;
    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//


    // ------------------------------------------ TOGGLE OF DATA FOR ADD & EDIT ACTIVITY  START--------------------//
    $("#addNewActivityBtn").click(() => {
        $("#exampleModalLabel").html("Add Activity");
        $("#activityName").val("");
        $("#activityURL").val("");

        $("#editActivity").hide();
        $("#createActivity").show();
    });

    // ------------------------------------------ TOGGLE OF DATA FOR ADD & EDIT ACTIVITY  END --------------------//

    // ----------------------------------- ACTIVITY CREATION START ---------------------------------------//

    $.get(`${TEMPLATE_LIST_FOR_GROUP_LIST}`)
        .done((data) => {
            if (Object.keys(data).length > 0) {
                $.each(data, (index, value) => {
                    let newOption = `<option value=${value.ID}>${value.Name}</option>`
                    $("#GroupSelect").append(newOption);
                });
            };
        });

    $("#createActivity").click(() => {
        let activityName = $("#activityName").val();
        let activityURL = $("#activityURL").val();
        let GroupSelect = $("#GroupSelect").val();
        let createActivityUrl = `${BASE_URL}/Activity/Create`;

        if (activityName && activityURL) {
            $.post(createActivityUrl, { "AdminId": AUTHOR_ID, "name": activityName, "GroupId": GroupSelect, "url": activityURL })
                .done((data) => {
                    if (data.responsecode == 1) {
                        $("#addNewActivityModal").modal('toggle');
                        SUCCESS_MESSAGE(data.responsemessage);
                        PAGE_RELOAD();
                    } else if (data.responseCode == 2) {
                        PAGE_REDIRECTION("../teamlogin.html");
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
            ERROR_MESSAGE("All Fileds Required");
        };
    });

    // ----------------------------------- ACTIVITY CREATION END ---------------------------------------//


    // ----------------------------------- LIST OF ACTIVITIES START ---------------------------------------//

    const getActivities = () => {
        let getActivitiesListUrl = `${BASE_URL}/Activity/Index?AdminId=${AUTHOR_ID}`;

        $.get(getActivitiesListUrl)
            .done(data => {
                if ($.fn.DataTable.isDataTable('#table_id')) {
                    $('#table_id').DataTable().clear().destroy();
                }
                if (Object.keys(data).length > 0) {
                    $("#table_id tbody").empty();
                    $.each(data, (index, value) => {
                        let newRoleRow = `<tr><td>${index + 1}</td><td>${value.name}</td><td>${value.Groupname}</td><td>${value.url}</td><td><button activityId = ${value.id} class="btn activity_edit"><i class='menu-icon flaticon2-edit text-info'></i></button><button class="btn activity_delete" id=${value.id} activityId=${value.id}><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></button></td></tr>`;
                        $("#table_id tbody").append(newRoleRow);

                    });
                    $('#table_id').DataTable();
                } else {

                    const MessageRow = `<tr><td></td><td></td><td><h6 class='text-center font-weight-bold pt-5'>No Data Found</h6></td><td></td><td></td></tr>`;
                    $("#table_id tbody").append(MessageRow);

                };

            });
    };

    // ----------------------------------- LIST OF ACTIVITIES END ---------------------------------------//



    // -----------------------------------  ACTIVITy EDIT START---------------------------------------//

    $("#table_id tbody").on('click', '.activity_edit', function () {
        $("#exampleModalLabel").html("Edit Activity");
        $("#editActivity").show();
        $("#createActivity").hide();
        let activityId = $(this).attr("activityId");
        let getActivityUrl = `${BASE_URL}/Activity/Edit?AdminId=${AUTHOR_ID}&id=${activityId}`;
        $.get(getActivityUrl)
            .done(data => {
                if (Object.keys(data).length > 0) {
                    $("#hiddenid").val(data.id);
                    $("#activityName").val(data.name);
                    $("#GroupSelect").val(data.GroupId);
                    $("#activityURL").val(data.url);
                    $("#addNewActivityModal").modal('toggle');
                    getActivities();
                } else {
                    ERROR_MESSAGE("Sorry, Something went wrong");
                }
            });

    });

    $("#editActivity").click(() => {

        let activityId = $("#hiddenid").val();
        let activityName = $("#activityName").val();
        let activityURL = $("#activityURL").val();
        let GroupSelect = $("#GroupSelect").val();
        let updateActivityUrl = `${BASE_URL}/Activity/Edit`;


        if (activityName && activityURL) {
            $.post(updateActivityUrl, { "AdminId": AUTHOR_ID, "id": activityId, "name": activityName, "GroupId": GroupSelect, "url": activityURL })
                .done(data => {
                    $('#addNewActivityModal').modal('toggle');
                    if (data.responsecode == 1) {
                        getActivities();
                        SUCCESS_MESSAGE("Activity Updated Successfully");
                        //PAGE_RELOAD();
                    } else if (data.responsecode == 2) {
                        PAGE_REDIRECTION("teamlogin.html");
                    } else if (data.responsecode == 6) {
                        ERROR_MESSAGE("Sorry, Something went wrong");
                    } else if (data.responsecode == 0) {
                        ERROR_MESSAGE(data.responsemessage);
                    };
                }).fail((xhr) => {
                    if (xhr.status == 404) {
                        PAGE_REDIRECTION("../404.html");
                    } else if (xhr.status == 401) {
                        location.clear();
                        PAGE_REDIRECTION("../teamlogin.html");
                    }
                });
        } else {
            ERROR_MESSAGE("All Fileds Required");
        };

    });

    // -----------------------------------  ACTIVITy EDIT END ---------------------------------------//



    // -----------------------------------  ACTIVITy DELETE START ---------------------------------------//

    $("#table_id tbody").on('click', '.activity_delete', function () {

        let response = confirm("Are you sure do you want to Delete!");
        let activityId = $(this).attr('activityId');
        let activityDeleteUrl = `${BASE_URL}/Activity/Delete?AdminId=${AUTHOR_ID}&id=${activityId}`

        if (response == true) {
            $.post(activityDeleteUrl, { "id": activityId })
                .done(data => {
                    if (data.responsecode == 1) {
                        $("#" + activityId).closest("tr").css("background", "tomato");
                        $("#" + activityId).closest("tr").css("color", "#fff");
                        $("#" + activityId).closest("tr").fadeOut(1000, function () {
                            $(this).remove();
                            SUCCESS_MESSAGE("Activity Deleted Successfully");
                            PAGE_RELOAD();
                        });
                    } else if (data.responsecode == 6) {
                        ERROR_MESSAGE("Sorry, Something went wrong");
                    }
                    else if (data.responsecode == 0) {
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

    // -----------------------------------  ACTIVITy DELETE END ---------------------------------------//


    // ----------------------------------- FUNCTION INVOCATION START ---------------------------------------//

    getActivities();

    // ----------------------------------- FUNCTION INVOCATION END ---------------------------------------//

});