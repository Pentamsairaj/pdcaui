"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
//import {BASEURL } from './Global.js';
import reUsableFunctions from './reUsableFunctions.js';
import commonAjaxCalls from './commanAjaxCalls.js';

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
    $(".createStatus").show();

    const severityData = [
        { ID: 'Low', Name: "Low" },
        { ID: 'Intermediate', Name: "Intermediate" },
        { ID: 'High', Name: "High" },
    ]
    const statusData = [
        { ID: 'Raised', Name: "Raised" },
        { ID: 'In-progress', Name: "In-progress" },
        { ID: 'Resolved', Name: "Resolved" },
    ]

    // ------------------------------------------ TOGGLE OF DATA FOR ADD & EDIT ACTIVITY  START--------------------//
    $("#addNewActivityBtn").on('click', () => {
        $("#exampleModalLabel").html("Add Ticket");
        $("#activityName").val("");
        $("#activityURL").val("");
        $("#editActivity").hide();
        $(".editStatus").hide();
        $("#createActivity").show();
    });

    // ------------------------------------------ TOGGLE OF DATA FOR ADD & EDIT ACTIVITY  END --------------------//

    // ----------------------------------- ACTIVITY CREATION START ---------------------------------------//


    $.each(severityData, (index, value) => {
        let newOption = `<option value=${value.ID}>${value.Name}</option>`
        $("#severity").append(newOption);
    });

    $.each(statusData, (index, value) => {
        let newOption = `<option value=${value.ID}>${value.Name}</option>`
        $("#status").append(newOption);
    });


    $("#createActivity").one("click", (e) => {
        e.preventDefault();
        const submitButton = $("#createActivity");
        submitButton.prop("disabled", true);
        let img = "";
        let ticket_title = $("#ticket_title").val().trim();
        let description = $("#description").val().trim();
        let severity = $("#severity").val();
        let file = $("#img")[0].files[0];
        if (file) {
            img = $("#fl_img").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        }
        let createticket = `${BASE_URL}ITSupport/Create`;
        if (ticket_title && description) {
            $.post(createticket, { "AdminId": AUTHOR_ID, "severity": severity, "description": description, "ticket_title": ticket_title, "SupportImage": img })
                .done((data) => {
                    if (data.responsecode) {
                        $("#addNewActivityModal").modal('toggle');
                        alert(data.responsemessage);
                        setTimeout(() => {
                            PAGE_RELOAD();
                        }, 500)
                    }
                })
                .fail((xhr) => {
                    if (xhr.status == 404) {
                        PAGE_REDIRECTION("../404.html");
                    } else if (xhr.status == 401) {
                        location.clear();
                        PAGE_REDIRECTION("../teamlogin.html");
                    }
                });
            complete: () => {
                submitButton.prop("disabled", false)
            }
        }
        else {
            ERROR_MESSAGE("All Fields Required");
        };
    });

    // ----------------------------------- ACTIVITY CREATION END ---------------------------------------//


    // ----------------------------------- LIST OF ACTIVITIES START ---------------------------------------//

    const getActivities = () => {
        let getActivitiesListUrl = `${BASE_URL}ITSupport/Index?AdminId=${AUTHOR_ID}`;

        $.ajax({
            url: getActivitiesListUrl,
            type: "GET",
            beforeSend: () => {
                $(".spinner_loading").show();
                $(".card").css("opacity", "0.1");

            },
            success: (data) => {
                if ($.fn.DataTable.isDataTable('#table_id')) {
                    $('#table_id').DataTable().clear().destroy();
                }

                if (Object.keys(data).length > 0) {
                    $("#table_id tbody").empty();

                    $.each(data, (index, value) => {
                        let Actions = `<button class="btn activity_delete" id=${value.id} activityId=${value.id}><i class='menu-icon flaticon2-rubbish-bin text-danger'></i></button>`;

                        if (AUTHOR_ID.toUpperCase() == "2D4AC65E-FF99-407A-A729-CCDE60C7D5F1") {
                            Actions = `<button ID=${value.id} class="btn activity_edit"><i class='menu-icon flaticon2-edit text-info'></i></button>` + Actions;
                        }

                        const updatedDate = value.updated_on ? moment(value.updated_on).format('DD-MM-YYYY') : "N/A";
                        const createdDate = value.created_on ? moment(value.created_on).format('DD-MM-YYYY') : "N/A";
                        const status = value.status ? value.status : "-";

                        let newRoleRow = `<tr>
                        <td>${index + 1}</td>
                        <td>${value.ticket_num}</td>
                        <td>${value.ticket_title}</td>
                        <td>${value.description}</td>
                        <td>${value.severity}</td>
                        <td>${createdDate}</td>
                        <td>${updatedDate}</td>
                        <td>${status}</td>
                        <td class="d-flex">${Actions}</td>
                    </tr>`;

                        $("#table_id tbody").append(newRoleRow);
                    });

                    $('#table_id').DataTable();
                } else {
                    const MessageRow = `<tr>
                    <td colspan="9" class="text-center font-weight-bold pt-5">No Data Found</td>
                </tr>`;
                    $("#table_id tbody").append(MessageRow);
                }
            },
            complete: () => {
                $(".spinner_loading").hide(); // Hide loader after request completes
                $(".card").css("opacity", ""); // Reset card opacity
            },
            error: (xhr, status, error) => {
                console.error("Error fetching activities:", error);
                $(".spinner_loading").hide();
                $(".card").css("opacity", "");
            }
        });
    };


    // ----------------------------------- LIST OF ACTIVITIES END ---------------------------------------//



    // -----------------------------------  ACTIVITy EDIT START---------------------------------------//

    $("#table_id tbody").on('click', '.activity_edit', function () {
        $("#exampleModalLabel").html("Edit Ticket");
        $("#editActivity").show();
        $("#createActivity").hide();


        let ID = $(this).attr("ID");
        let getActivityUrl = `${BASE_URL}ITSupport/Edit?AdminId=${AUTHOR_ID}&id=${ID}`;
        $.get(getActivityUrl)
            .done(data => {
                if (Object.keys(data).length > 0) {
                    $("#hiddenid").val(data.id);
                    $("#ticket_title").val(data.ticket_title);
                    $("#description").val(data.description);
                    $("#ticket_num").val(data.ticket_num);
                    $("#severity").val(data.severity);
                    $("#status").val(data.status);
                    $("#image_view").html("<a href='" + data.SupportImage + "' target='_blank'>View Ticket</a>");
                    $(".editStatus").show();
                    $(".createStatus").hide();
                    getActivities();
                    $("#addNewActivityModal").modal('toggle');
                } else {
                    ERROR_MESSAGE("Sorry, Something went wrong");
                }
            });

    });


    $("#editActivity").on('click',() => {
        let ticket_title = $("#ticket_title").val();
        let description = $("#description").val();
        let severity = $("#severity").val();
        let status = $("#status").val();
        let activityId = $("#hiddenid").val();
        let updateActivityUrl = `${BASE_URL}ITSupport/Edit`;
        if (ticket_title && description) {
            $.post(updateActivityUrl, { "AdminId": AUTHOR_ID, "id": activityId, "ticket_title": ticket_title, "description": description, "severity": severity, "status": status })
                .done(data => {
                    $('#addNewActivityModal').modal('toggle');
                    if (data.responsecode == 1) {
                        SUCCESS_MESSAGE("Ticket Updated Successfully");
                        PAGE_RELOAD();

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
        let activityId = $(this).attr("ID");
        let activityDeleteUrl = `${BASE_URL}ITSupport/Delete?AdminId=${AUTHOR_ID}&id=${activityId}`

        if (response == true) {
            $.post(activityDeleteUrl, { "id": activityId })
                .done(data => {
                    if (data.responsecode == 1) {
                        $("#" + activityId).closest("tr").css("background", "tomato");
                        $("#" + activityId).closest("tr").css("color", "#fff");
                        $("#" + activityId).closest("tr").fadeOut(1000, function () {
                            $(this).remove();
                            SUCCESS_MESSAGE("Ticket Deleted Successfully");
                            //PAGE_RELOAD();
                            getActivities();
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