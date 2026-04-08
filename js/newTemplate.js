"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { getDataFromForm } from './getFormData.js';
import { getPagination } from './pagination.js';
import commonAjaxCalls from './commanAjaxCalls.js';



// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {
    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const PAGE_RELOAD = reUsableFunctions.pageReload;
    const GET_DATA_FROM_TABLE = reUsableFunctions.getDataFromTable;
    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
    const CLEAR_STORAGE = reUsableFunctions.clearStorage;
    const GET_DATA_FROM_FORM = getDataFromForm;
    const GET_PAGINATION = getPagination;


    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');
    if (ADMIN_NAME != "Admin" && ADMIN_NAME != "Manager") {
        $(".templatelist").hide(); 
    };
// ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//

CLEAR_STORAGE();

// ----------------------------------- APIs START ---------------------------------------//

const CREATE_TEMPLATE_URL = APIS.createTemplateForServiceOffer;
const CREATE_PRICE_TABLE_URL = APIS.createTemplatePriceTable;
const TEMPLATE_LIST_FOR_SERVICE_OFFER_URL = APIS.templatesForServiceOffer;
const DELETE_TEMPLATE_URL = APIS.templateDelete;

// ----------------------------------- APIs END ---------------------------------------//

// ----------------------------------- COMMON AJAX CALLS START ---------------------------------------//

const CREATE_PRICE_ROW = commonAjaxCalls.createPrice;
const PRICE_AND_BILL_CREATION_AT_ONCE = commonAjaxCalls.priceAndBillCreationAtOnce;

// ----------------------------------- COMMON AJAX CALLS END ---------------------------------------//


// ----------------------------------- HIDING ERROR MESSAGE WHILE PAGE LOADING START ---------------------------------------//

$("#phoneNumberError").hide();
$("#teamEmailError").hide();
$("#companyEmailError").hide();
$("#teamphoneNumberError").hide();

// ----------------------------------- HIDING ERROR MESSAGE WHILE PAGE LOADING END ---------------------------------------//



// Method for price and bill creation
const priceAndBillCreation = (templateid) => {
    // Get data from dynamic price table
    let tableBody = $("#rowData [id^=product_id]");
    let pricingData = GET_DATA_FROM_TABLE(tableBody);
    let lastIteration = pricingData.length;

    // Price table row count
    let rowCount = $("#pricingTable tbody tr").length;

    // If row count equals to one create bill based on single pricing data
    if (rowCount == 1) {
        for (let item of pricingData) {

            PRICE_AND_BILL_CREATION_AT_ONCE({
                "Pricingid": "",
                "templateid": templateid,
                "SNO": parseInt(item.s_no),
                "name": item.product_service,
                "SAC_HSCode": item.product_Hscode,
                "Numberofservices": parseInt(item.product_qnty),
                "UnitPricePer": parseInt(item.product_price),
                "qty": parseInt(item.product_qnty),
                "Amount": parseInt(item.product_amt)
            }, CREATE_PRICE_TABLE_URL);

        }
        // If row count greater than to one first loop thought pricingData array and
        //  create first price row and then store Pricing Id in localstorage
        // Based on Pricing Id creating multiple price rows and 
        // for last iteration creating bill
    } else {
        for (let item of pricingData) {
            const PRICING_id = localStorage.getItem("pricingId");

            // if it is last iteration creating bill
            if (! --lastIteration && PRICING_id && PRICING_id != "null") {
                PRICE_AND_BILL_CREATION_AT_ONCE({
                    "Pricingid": PRICING_id,
                    "templateid": templateid,
                    "SNO": parseInt(item.s_no),
                    "name": item.product_service,
                    "SAC_HSCode": item.product_Hscode,
                    "Numberofservices": parseInt(item.product_qnty),
                    "UnitPricePer": parseInt(item.product_price),
                    "qty": parseInt(item.product_qnty),
                    "Amount": parseInt(item.product_amt)
                }, CREATE_PRICE_TABLE_URL);
            } else {
                // if pricing id  then create multiple rows
                if (PRICING_id) {
                    CREATE_PRICE_ROW({
                        "Pricingid": PRICING_id,
                        "templateid": templateid,
                        "SNO": parseInt(item.s_no),
                        "name": item.product_service,
                        "SAC_HSCode": item.product_Hscode,
                        "Numberofservices": parseInt(item.product_qnty),
                        "UnitPricePer": parseInt(item.product_price),
                        "qty": parseInt(item.product_qnty),
                        "Amount": parseInt(item.product_amt)
                    }, CREATE_PRICE_TABLE_URL);
                    // if no pricing id  create single row and store pricing id in localstorage
                } else {
                    CREATE_PRICE_ROW({
                        "Pricingid": "",
                        "templateid": templateid,
                        "SNO": parseInt(item.s_no),
                        "name": item.product_service,
                        "SAC_HSCode": item.product_Hscode,
                        "Numberofservices": parseInt(item.product_qnty),
                        "UnitPricePer": parseInt(item.product_price),
                        "qty": parseInt(item.product_qnty),
                        "Amount": parseInt(item.product_amt)
                    }, CREATE_PRICE_TABLE_URL);

                }
            }
        }
    }
}



// ----------------------------------- CREATE TEMPLATE FOR SERVICE OFFER START ---------------------------------------//

$("#createTemplateSubmit").submit((e) => {
    e.preventDefault();
    const returnData = GET_DATA_FROM_FORM();
    const templateData = returnData.templateData;

    if (templateData.tandc != "" && templateData.templatename != "" && templateData.logo != "" && templateData.companylogo != "" && templateData.signature != "") {
        $.ajax({
            url: CREATE_TEMPLATE_URL,
            type: "POST",
            data: { ...templateData, "AdminId": ADMIN_AUTH },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode === 1) {
                    localStorage.setItem("templateID", data.responseObject);
                    priceAndBillCreation(data.responseObject);

                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    } else if (templateData.tandc == "") {
        ERROR_MESSAGE("Please Enter Terms & Conditions");
    } else if (templateData.templatename == "") {
        ERROR_MESSAGE("Template Name is Required");
    } else if (templateData.logo == "") {
        ERROR_MESSAGE("Template Logo is Required");
    } else if (templateData.companylogo == "") {
        ERROR_MESSAGE("Powered By is Required");
    } else if (templateData.signature == "") {
        ERROR_MESSAGE("Signature is Required");
    }

});
// ----------------------------------- CREATE TEMPLATE FOR SERVICE OFFER END ---------------------------------------//


// -----------------------------------  TEMPLATES FOR SERVVICE OFFER START ---------------------------------------//
$.ajax({
    url: `${TEMPLATE_LIST_FOR_SERVICE_OFFER_URL}?AdminId=${ADMIN_AUTH}`,
    type: "GET",
    async: false,
    dataType: "JSON",
    crossDomain: true,
    success: (data) => {
        $("#table-id tbody").empty();
        if (Object.keys(data).length > 0) {
            $.each(data, (index, value) => {
                if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                    let createOn = CONVERT_JSON_TO_NORMAL_DATE(value.createdon);
                    let newRow = `<tr><td>${++index}</td><td>${createOn}</td><td>${value.Template_name}</td><td TemplateId=${value.id}><a href='editTemplate.html?TemplateId=${value.id}'  class='btn'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i>&nbsp;</a>  &nbsp;&nbsp;<button TemplateId=${value.id} class='btn Delete'><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i>&nbsp;&nbsp;</button></td></tr>`;
                    $("#table-id tbody").append(newRow);
                }
                else {
                    let createOn = CONVERT_JSON_TO_NORMAL_DATE(value.createdon);
                    let newRow = `<tr><td>${++index}</td><td>${createOn}</td><td>${value.Template_name}</td><td TemplateId=${value.id}><a href='editTemplate.html?TemplateId=${value.id}'  class='btn'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i>&nbsp;</a>  &nbsp;&nbsp;</td></tr>`;
                    $("#table-id tbody").append(newRow);
                }
            });

        };
        $('#table-id').DataTable();
    }
});
// -----------------------------------  TEMPLATES FOR SERVICE OFFER END ---------------------------------------//

// -----------------------------------  TEMPLATES FOR SERVICE OFFER DELETE START ---------------------------------------//

$("#table-id tbody").on("click", '.Delete', function () {
    let TemplateId = $(this).attr("TemplateId");
    let result = confirm("Are you Sure? You Want to Delete this Template");
    if (result) {
        $.ajax({
            url: `${DELETE_TEMPLATE_URL}?AdminId=${ADMIN_AUTH}&TemplateId=${TemplateId}`,
            type: "POST",
            data: { "TemplateId": TemplateId },
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode == 1) {
                    $("#" + TemplateId).closest("tr").css("background", "tomato");
                    $("#" + TemplateId).closest("tr").css("color", "#fff");
                    $("#" + TemplateId).closest("tr").fadeOut(1000, function () {
                        $(this).remove();
                    });
                    SUCCESS_MESSAGE(data.responsemessage);
                    PAGE_RELOAD();
                } else {
                    ERROR_MESSAGE(data.responseObject)
                }
            }
        });
    };
});

    // -----------------------------------  TEMPLATES FOR SERVVICE OFFER DELETE END ---------------------------------------//

});