"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getServiceFormData } from './getFormData.js';
import { getPagination } from './pagination.js';
import commonAjaxCalls from './commanAjaxCalls.js';


// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {
    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const PAGE_RELOAD = reUsableFunctions.pageReload;
    const CLEAR_STORAGE = reUsableFunctions.clearStorage;
    const CALCULATE_AMOUNT = reUsableFunctions.calAmount;
    const GET_DATA_FROM_TABLE = reUsableFunctions.getDataFromTable;
    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;
    const GET_DATA_FROM_FORM = getServiceFormData;
    const GET_PAGINATION = getPagination;
    const CONVERT_NUMBER_INTO_STRING = convertIntToEnglish;

    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');
    if (ADMIN_NAME != "Admin" && ADMIN_NAME != "Manager" && ADMIN_NAME !="CRM Executive") {
        $(".btn-primary").hide();
    };
    $(document).ready(function () {
        const ADMIN_AUTH = localStorage.getItem("Admin_auth");
        getlist();
        function getlist() {
            $.ajax({
                url: "https://api.pdca.in/Client/getData?AdminId=" + ADMIN_AUTH,
                type: "GET",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                //data: fileData,
                beforeSend: function () {
                    $(".spinner_loading").show();
                    $(".card").css("opacity", "0.1")
                },
                success: function (data) {
                    $("#table-id tbody").empty();
                    var sno = 1;
                    $.each(data, function (index, val) {
                        //var completedDate = new Date(parseInt(val.createdon.replace("/Date(", "").replace(")/")));
                        //var dd = completedDate.getDate();
                        //var mm = completedDate.getMonth() + 1; //January is 0!
                        //var yyyy = completedDate.getFullYear();
                        //if (dd < 10) { dd = '0' + dd }
                        //if (mm < 10) { mm = '0' + mm }
                        //var datef = + dd + '/' + mm + '/' + yyyy;
                        let datef = val.createdon.split(" ")[0];
                        var NameTW = val.NameAcc;
                        var GSTNumber = val.GSTNumber;
                        if (NameTW == null) {
                            NameTW = '-';
                        } if (val.GSTNumber == null) {
                            GSTNumber = '-';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            $("#table-id tbody").append("<tr><td>" + sno++ + "</td><td>" + val.Companyname + "</td><td>" + val.ClientID + "</td><td>" + datef + "</td><td>" + NameTW + "</td><td>" + val.PhoneAcc + "</td><td><a href='" + val.drivelink + "' target='_blank'>" + val.drivelink + "</a></td><td>" + GSTNumber + "</td><td>" + val.Servicename + "</td><td>" + val.SubscriptionType + "</td> <td class='d-flex'><a href='../leadManagement/editClient.html?ClientID=" + val.id + "'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> <span class='Delete mx-3' style='cursor:pointer' id='" + val.id + "'><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></span><a target='_blank' href='../leadManagement/PreviewClient.html?ClientID=" + val.id + "''><i class='menu-icon flaticon-technology text-warning cursor-pointer'></i></a></td></tr>")
                        }
                        else {
                            $("#table-id tbody").append("<tr><td>" + sno++ + "</td><td>" + val.Companyname + "</td><td>" + val.ClientID + "</td><td>" + datef + "</td><td>" + NameTW + "</td><td>" + val.PhoneAcc + "</td><td><a href='" + val.drivelink + "' target='_blank'>" + val.drivelink + "</a></td><td>" + GSTNumber + "</td><td>" + val.Servicename + "</td><td>" + val.SubscriptionType + "</td> <td class='d-flex'><a href='../leadManagement/editClient.html?ClientID=" + val.id + "'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> <a target='_blank' href='../leadManagement/PreviewClient.html?ClientID=" + val.id + "''><i class='menu-icon flaticon-technology text-warning cursor-pointer mx-3'></i></a></td></tr>")
                        }
                        
                    });
                    $('#table-id').DataTable();
                },
                complete: function () {
                    $(".spinner_loading").hide();
                    $(".card").css("opacity", "")
                }
            });
        }
        $("#table-id").on("click", ".Delete", function () {
            var id = $(this).attr("id");
            var result = confirm("Are you Sure? You Want to Delete this Client");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Client/Delete?AdminId=" + ADMIN_AUTH + "&Id=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    //data: fileData,
                    success: function (data) {
                        getlist();
                    }
                });
            }
        })

    });
})