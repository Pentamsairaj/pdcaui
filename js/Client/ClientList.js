"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getServiceFormData } from './getFormData.js';
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
    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;
    const GET_DATA_FROM_FORM = getServiceFormData;
    const CONVERT_NUMBER_INTO_STRING = convertIntToEnglish;
    const CLIENT_AUTH = localStorage.getItem("Client_auth");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');
    if (ADMIN_NAME != "Admin" && ADMIN_NAME != "Manager" && ADMIN_NAME != "CRM Executive") {
        $(".btn-primary").hide();
    };
    getlist();
    function getlist() {
        $.ajax({
            url: "https://api.pdca.in/Client/ClientList?ClientID=" + CLIENT_AUTH ,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#table-id tbody").empty();
                let datef = data.createdon.split(" ")[0];
                var NameTW = data.NameAcc;
                var GSTNumber = data.GSTNumber;
                if (NameTW == null) {
                    NameTW = '-';
                } if (data.GSTNumber == null) {
                    GSTNumber = '-';
                }
                $("#table-id tbody").append("<tr><td>" + data.Companyname + "</td><td>" + data.ClientID + "</td><td>" + datef + "</td><td>" + NameTW + "</td><td>" + data.PhoneAcc + "</td><td><a href='" + data.drivelink + "' target='_blank'>" + data.drivelink + "</a></td><td>" + GSTNumber + "</td><td>" + data.Servicename + "</td><td>" + data.SubscriptionType + "</td> <td class='d-flex'> <a target='_blank' href='../leadManagment/PreviewClient.html?ClientID=" + data.id + "''><i class='menu-icon flaticon-technology text-warning cursor-pointer mx-3'></i></a></td></tr>")
            }
        });
    }
});
