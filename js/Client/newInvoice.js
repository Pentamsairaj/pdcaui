"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getInvoiceCommonFormData } from './getFormData.js';
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
    const GET_DATA_FROM_FORM = getInvoiceCommonFormData;
    const CONVERT_NUMBER_INTO_STRING = convertIntToEnglish;



    const CLIENT_AUTH = localStorage.getItem("Client_auth");
   
    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//

    CLEAR_STORAGE();

    // ----------------------------------- APIs START ---------------------------------------//



    const TEMPLATE_LIST_FOR_SERVICE_OFFER_URL = APIS.templatesForServiceOffer;
    const TEMPLATE_VIEW_URL = APIS.serviceOfferDetailsEditView;
    const CREATE_INVOICE_URL = APIS.createInvoice;
    const CREATE_INVOICE_PRICE_TABLE_URL = APIS.createInvoicePriceTable;
    const SERVICE_INVOICE_URL = APIS.invoiceList;
    const DELETE_INVOICE_URL = APIS.deleteInvoice;
    const INVOICE_REMARK_URL = APIS.invoiceRemark;

    // ----------------------------------- APIs END ---------------------------------------//


    // ----------------------------------- COMMON AJAX CALLS START ---------------------------------------//

    const CREATE_PRICE_ROW = commonAjaxCalls.createInvoicePrice;
    const PRICE_AND_BILL_CREATION_AT_ONCE = commonAjaxCalls.priceAndBillCreationAtOnceForInvoice;
    const SERVICE_OFFER_REMARK = commonAjaxCalls.serciveOfferRemark;

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
                }, CREATE_INVOICE_PRICE_TABLE_URL);

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
                    }, CREATE_INVOICE_PRICE_TABLE_URL);
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
                        }, CREATE_INVOICE_PRICE_TABLE_URL);
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
                        }, CREATE_INVOICE_PRICE_TABLE_URL, templateid);

                    }
                }
            }
        }
    }


    // -----------------------------------  TEMPLATES FOR SERVVICE OFFER START ---------------------------------------//



    // -----------------------------------  TEMPLATES FOR SERVVICE OFFER END ---------------------------------------//






    // -----------------------------------  DELETE PRICING ROW START ---------------------------------------//

    $("#pricingTable").on("click", ".removeRows", function () {
        let amt = $(this).attr("amt");
        let prevAmt = $("#totalAmt").text();
        let totalAmt = parseInt(prevAmt) - parseInt(amt);
        $("#totalAmt").html(`${totalAmt}`);
        $("#grandTotal").html(`${totalAmt}`);
        $(this).closest("tr").remove();
        localStorage.setItem("prevAmt", totalAmt);
    });

    // -----------------------------------  DELETE PRICING ROW END START---------------------------------------//


    // -----------------------------------   SERVICE OFFER LIST START ---------------------------------------//

    $.ajax({
        url: `${SERVICE_INVOICE_URL}?ClientID=${CLIENT_AUTH}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            console.log(data)
            $("#table-id tbody").empty();
            if (data.responsecode == 0) {
                ERROR_MESSAGE(data.responsemessage);
                let newRow1 = $("#datnofod").val();
                $("#table-id tbody").append(newRow1);
            }
            else {
                $("#datnofod").hide();
                if (Object.keys(data).length > 0) {

                    $.each(data, (index, value) => {
                        let comment;
                        if (value.comment) {
                            comment = value.comment;
                        } else {
                            comment = "NaN";
                        }
                        let createOn = CONVERT_JSON_TO_NORMAL_DATE(value.Date);
                        let newRow = `<tr>
                                  <td>${++index}</td>
                                  <td>${createOn}</td>
                                  <td>${value.InvoiceNumber}</td>
                                  <td>${value.Service_Quote}</td>
                                  <td>${value.company}</td>
                                  <td>${value.Refferedby}</td>
                                  <td>${value.team_membername}</td>
                                   <td>${value.GrandTotal}</td>
                                  <td>
                                       <select class="form-control" id="remarkdropdown${value.id}" serviceId=${value.id} quoteGivenBy=${value.team_membername} disabled>
                                       <option value="">Select workStatus</option>
                                       <option value="Completed">Completed</option>
                                       <option value="Progress">In Progress</option>
                                       <option value="hold">Hold</option>
                                       </select>
                                  </td>
                                  
                                  <td TemplateId=${value.id}><a target="_blank" href='invoicePreview.html?TemplateId=${value.id}'><i class='menu-icon flaticon-technology text-warning cursor-pointer'></i></a></td>
                                  </tr>`;
                        $("#table-id tbody").append(newRow);

                        if (value.Remark != null) {
                            $(`#remarkdropdown${value.id} option[value=${value.Remark}]`).prop('selected', true);
                        }


                        $("#table-id tbody").on('change', `#remarkdropdown${value.id}`, function () {
                            let remarkValue = $(`#remarkdropdown${value.id} option:selected`).val();

                            let serviceId = $(this).attr('serviceId');

                            if (remarkValue == 'hold') {
                                $('#remarkCommentModal').modal('show');

                                $("#commentSave").click(() => {
                                    let reason = $("#holdReason").val();
                                    $('#remarkCommentModal').modal('toggle');

                                    SERVICE_OFFER_REMARK({
                                        "Id": serviceId,
                                        "comment": reason,
                                        "Remark": remarkValue
                                    }, INVOICE_REMARK_URL);
                                });
                            } else if (remarkValue == 'Completed' || remarkValue == 'Progress') {

                                SERVICE_OFFER_REMARK({
                                    "Id": serviceId,
                                    "comment": "",
                                    "Remark": remarkValue
                                }, INVOICE_REMARK_URL);
                            }

                        })

                    });
                };
            }
        }
    });
    // -----------------------------------   SERVICE OFFER LIST END ---------------------------------------//


    // -----------------------------------   SERVICE OFFER DELETE START ---------------------------------------//


    // -----------------------------------   SERVICE OFFER DELETE END ---------------------------------------//
});