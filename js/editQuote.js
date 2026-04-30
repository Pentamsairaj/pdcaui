"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { getServiceFormData } from './getFormData.js';
import commonAjaxCalls from './commanAjaxCalls.js';
import { calculateTotalAndGrandTotal } from './commonFunctinality.js';


// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {
    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const CLEAR_STORAGE = reUsableFunctions.clearStorage;
    const CALCULATE_AMOUNT = reUsableFunctions.calAmount;
    const CALCULATE_TOTAL_DSCOUNT_GRAND_TOTAL = calculateTotalAndGrandTotal;
    const GET_DATA_FROM_TABLE = reUsableFunctions.getDataFromTable;
    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;
    const GET_DATA_FROM_FORM = getServiceFormData;



    const ADMIN_AUTH = localStorage.getItem("Admin_auth");

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//

    CLEAR_STORAGE();


    // ----------------------------------- DATA FROM PARAMETERS START ---------------------------------------//

    const url = window.location.search;
    const params = new URLSearchParams(url);

    const TemplateId = params.get("TemplateId");
    // ----------------------------------- DATA FROM PARAMETERS END ---------------------------------------//


    // ----------------------------------- APIs START ---------------------------------------//


    const UPDATE_TEMPLATE_VIEW_URL = APIS.serviceOfferDetailsEditView;
    const UPDATE_SERVICE_OFFER_URL = APIS.updateServiceOffer;
    const UPDATE_PRICE_TABLE_URL = APIS.updateServiceOfferPriceTable;
    const CREATE_PRICE_TABLE_URL = APIS.createServiceOfferPriceTable;
    const DELETE_PRICING_DATA_URL = APIS.deleteServiceOfferPricingRow;


    // ----------------------------------- APIs END ---------------------------------------//


    // ----------------------------------- COMMON AJAX CALLS START ---------------------------------------//


    const UPDATE_PRICE_ROW = commonAjaxCalls.createServiceOfferPrice;
    const CREATE_PRICE_ROW = commonAjaxCalls.createServiceOfferPrice;
    const PRICE_AND_BILL_UPDATION_AT_ONCE = commonAjaxCalls.priceAndBillUpdationAtOnceForServiceOffer;
    const PRICE_CERATION_AND_BILL_UPADATION = commonAjaxCalls.priceCreationAndBillUpdationForServiceOffer;

    // ----------------------------------- COMMON AJAX CALLS END ---------------------------------------//

    // ----------------------------------- HIDING ERROR MESSAGE WHILE PAGE LOADING START ---------------------------------------//

    $("#phoneNumberError").hide();
    $("#teamEmailError").hide();
    $("#companyEmailError").hide();
    $("#teamphoneNumberError").hide();

    // ----------------------------------- HIDING ERROR MESSAGE WHILE PAGE LOADING END ---------------------------------------//


    // Method for price and bill updation
    const priceAndBillUpdation = (templateid) => {
        // Get data from dynamic price table
        let tableBody = $("#rowData [id^=product_id]");
        let pricingData = GET_DATA_FROM_TABLE(tableBody);
        const PRICING_id = localStorage.getItem("pricingId");

        let lastIteration = pricingData.length;
        // Price table row count
        let rowCount = $("#pricingTable tbody tr").length;


        // If row count equals to one create bill based on single pricing data
        if (rowCount == 1) {
            for (let item of pricingData) {
                if (item.product_id < 36) {
                    PRICE_CERATION_AND_BILL_UPADATION({
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
                    PRICE_AND_BILL_UPDATION_AT_ONCE({
                        "Pricingid": PRICING_id,
                        "templateid": templateid,
                        "Id": item.product_id,
                        "SNO": parseInt(item.s_no),
                        "name": item.product_service,
                        "SAC_HSCode": item.product_Hscode,
                        "Numberofservices": parseInt(item.product_qnty),
                        "UnitPricePer": parseInt(item.product_price),
                        "qty": parseInt(item.product_qnty),
                        "Amount": parseInt(item.product_amt)
                    }, UPDATE_PRICE_TABLE_URL);
                }


            }
            // If row count greater than to one first loop thought pricingData array and
            //  create first price row and then store Pricing Id in localstorage
            // Based on Pricing Id creating multiple price rows and 
            // for last iteration creating bill
        } else {
            for (let item of pricingData) {
                const PRICING_id = localStorage.getItem("pricingId");

                if (item.product_id.length < 36) {
                    // if it is last iteration creating bill
                    if (! --lastIteration && PRICING_id && PRICING_id != "null") {
                        PRICE_CERATION_AND_BILL_UPADATION({
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
                } else {
                    // if it is last iteration creating bill
                    if (! --lastIteration && PRICING_id && PRICING_id != "null") {
                        PRICE_AND_BILL_UPDATION_AT_ONCE({
                            "Pricingid": PRICING_id,
                            "templateid": templateid,
                            "Id": item.product_id,
                            "SNO": parseInt(item.s_no),
                            "name": item.product_service,
                            "SAC_HSCode": item.product_Hscode,
                            "Numberofservices": parseInt(item.product_qnty),
                            "UnitPricePer": parseInt(item.product_price),
                            "qty": parseInt(item.product_qnty),
                            "Amount": parseInt(item.product_amt)
                        }, UPDATE_PRICE_TABLE_URL);
                    } else {
                        // if pricing id  then create multiple rows
                        if (PRICING_id) {
                            UPDATE_PRICE_ROW({
                                "Pricingid": PRICING_id,
                                "templateid": templateid,
                                "Id": item.product_id,
                                "SNO": parseInt(item.s_no),
                                "name": item.product_service,
                                "SAC_HSCode": item.product_Hscode,
                                "Numberofservices": parseInt(item.product_qnty),
                                "UnitPricePer": parseInt(item.product_price),
                                "qty": parseInt(item.product_qnty),
                                "Amount": parseInt(item.product_amt)
                            }, UPDATE_PRICE_TABLE_URL);
                            // if no pricing id  create single row and store pricing id in localstorage
                        } else {
                            UPDATE_PRICE_ROW({
                                "Pricingid": "",
                                "Id": item.product_id,
                                "templateid": templateid,
                                "SNO": parseInt(item.s_no),
                                "name": item.product_service,
                                "SAC_HSCode": item.product_Hscode,
                                "Numberofservices": parseInt(item.product_qnty),
                                "UnitPricePer": parseInt(item.product_price),
                                "qty": parseInt(item.product_qnty),
                                "Amount": parseInt(item.product_amt)
                            }, UPDATE_PRICE_TABLE_URL);

                        }
                    }
                }

            }
        }
    }

    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  START ---------------------------------------//
    $.ajax({
        url: `${UPDATE_TEMPLATE_VIEW_URL}?AdminId=${ADMIN_AUTH}&ServiceId=${TemplateId}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        beforeSend: function () {
            // Show the spinner before the AJAX call starts
            $("#spinner").show();
        },
        complete: function () {
            // Hide the spinner after the AJAX call completes (regardless of success or failure)
            $("#spinner").hide();
        },
        success: (data) => {
            console.log(data);
            $("#serviceTemplateSelect option:selected").text(data.templatename);
            $("#quoteNumber").val(data.quotenumber);
            $("#companyName").val(data.company);
            $("#companyAddress").val(data.address);
            $("#companyEmail").val(data.emailid);
            $("#companyPhone").val(data.phone);
            $("#cont_name").val(data.ContactPersonName);
            $("#cont_Phone").val(data.ContactPersonNumber);
            $("#companyGstNumber").val(data.GSTNumber);
            $("#referredBy").val(data.Refferedby);
            $("#teamMemberName").val(data.team_membername);
            $("#teamEmail").val(data.Team_emailid);
            $("#teamPhone").val(data.Team_phone);
            $("#teamAddress").val(data.Team_Address);
            $("#teamCompanyName").val(data.CompanyName);
            $("#teamGstNumber").val(data.Team_GSTNumber);
            $("#teamBankAcNo").val(data.TeamBank_Account);
            $("#teamBankName").val(data.TeamBank);
            $("#teamIfscCode").val(data.Team_IFSC_Code);

            $("#termsAndConditions").summernote('code', data.tandc);
            $('#scopeOfWorkDescription').summernote('code', data.scopeofwork);

            if (data.isscopeofwork) {
                $("#scopeWorkCheckBox").attr('checked', true);
                $('#scopeOfWorkDescription').summernote('enable');

            }
            debugger;

            if (data.T_PricingList.length > 0) {
                debugger;
                $("#pricingTable tbody").empty();
                data.T_PricingList.map((value) => {
                    let name = value.name;
                    let SAC_HSCode = value.SAC_HSCode;
                    let Numberofservices = value.Numberofservices;
                    let UnitPricePer = value.UnitPricePer;
                    let Amount = value.Amount;
                    localStorage.setItem("pricingId", value.pricingid);
                    let currentRow = `
                    <tr>
                        <td class="text-center"><input type="number"  class="form-control" value=${value.SNO} id="s_no"></td>
                        <td class="d-none d-print-none"><input type="hidden" id="product_id" name="product_id" value=${value.id}></td>
                        <td><textarea type="text" style="width:300px" id="product_service" class="form-control">${name}</textarea>
                        </td>
                        <td><input type="text" value=${SAC_HSCode} id="product_Hscode" class="form-control">
                        </td>
                        <td ><input type="number" id="product_qnty" value=${Numberofservices} class="form-control pro_qnty${value.SNO}">
                        </td>
                        <td><input type="number" id="product_price" value=${UnitPricePer} class="form-control pron_price${value.SNO}">
                        </td>
                        <td id="product_amt" class="pro_amt${value.SNO}"> ${Amount}</td>
                        <td class="deleteRow" amt=${Amount} id=${value.id}><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></td>
                    </tr>
                    `;

                    $("#pricingTable tbody").append(currentRow);

                    $(`.pron_price${value.SNO}`).keyup(() => {
                        let qnt = $(`.pro_qnty${value.SNO}`).val();
                        let price = $(`.pron_price${value.SNO}`).val();
                        if (qnt != "" && price != "") {
                            const amt = CALCULATE_AMOUNT(parseInt(qnt), parseInt(price));
                            $(`.pro_amt${value.SNO}`).html(amt);
                        }
                    });

                    $(`.pro_qnty${value.SNO}`).keyup(() => {
                        let qnt = $(`.pro_qnty${value.SNO}`).val();
                        let price = $(`.pron_price${value.SNO}`).val();
                        if (qnt != "" && price != "") {
                            const amt = CALCULATE_AMOUNT(parseInt(qnt), parseInt(price));
                            $(`.pro_amt${value.SNO}`).html(amt);
                        }
                    })

                });

            };

            if (data.LCBList.length > 0) {
                data.LCBList.map((item) => {
                    localStorage.setItem("billId", item.id);
                    $("#totalAmt").html(item.Amount);
                    $("#discountAmt").val(item.discount);
                    $("#toatlDiscountAmt").text(item.discountAmount);
                    $("#toatlgstAmt").text(item.gstAmount);
                    $("#sgstVal").val(item.sgst);
                    $("#cgstVal").val(item.cgst);
                    $("#isgtval").val(item.igst);
                    $("#grandTotal").text(item.grandTotal);
                    $("#amtInString").val(item.amountInWords);


                    if (item.discount) {
                        $("#discountCheckBox").attr('checked', true);
                        $('#discountAmt').removeAttr('disabled');
                    }

                    if (item.sgst != 0 && item.cgst != 0) {
                        $("#gstType option[value='inState']").prop('selected', true);
                        $("#gstWithInState").show();
                    } else if (item.igst != 0) {
                        $("#gstType option[value='otherState']").prop('selected', true);
                        $("#gstOutsideState").show();
                    }

                    if (item.paid) {
                        $("#invoicePaidAmtcheckbox").attr('checked', true);
                        $('#invoicePaidAmt').removeAttr('disabled');
                        $("#invoicePaidAmt").val(item.paid)
                    }

                    if (item.balance) {
                        $("#invoiceDueAmtcheckbox").attr('checked', true);
                        $('#invoiceDueAmt').removeAttr('disabled');
                        $("#invoiceDueAmt").val(item.balance)
                    }
                });
            }

            CONVERT_IMAGE_TO_BASE64(data.logo, "templateLogo");
            CONVERT_IMAGE_TO_BASE64(data.companylogo, "companyLogo");
            CONVERT_IMAGE_TO_BASE64(data.signature, "signatureLogo");

            $("#templateLogoDisplay").attr("src", `${data.logo}`);
            $("#companyLogoDisplay").attr("src", `${data.companylogo}`);
            $("#signatureDisplay").attr("src", `${data.signature}`);

        }
    });
    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  END ---------------------------------------//



    //$("#CalculateSum").click((e) => {
    //    e.preventDefault();
    //    CALCULATE_TOTAL_DSCOUNT_GRAND_TOTAL();
    //});




    // Delete table row and calculate total amount
    $("#pricingTable").on("click", ".removeRow", function () {
        CALCULATE_TOTAL_DSCOUNT_GRAND_TOTAL();
        $(this).closest("tr").remove();
    });
    // ----------------------------------- UPDATE SERVICE OFFER START ---------------------------------------//

    $("#updateServiceSubmit").submit((e) => {
        e.preventDefault();
        const templateData = GET_DATA_FROM_FORM();
        const quoteNumber = $("#quoteNumber").val();
        console.log('11111111111111111111',templateData)
        debugger;
        if (templateData.templatename != "" && templateData.logo != "" && templateData.companylogo != "" && templateData.signature != "" && templateData.tandc != "") {
            $.ajax({
                url: UPDATE_SERVICE_OFFER_URL,
                type: "POST",
                data: { ...templateData, "AdminId": ADMIN_AUTH, "id": TemplateId, "quotenumber": quoteNumber },
                async: false,
                dataType: "JSON",
                crossDomain: true,
                success: (data) => {
                    if (data.responsecode === 1) {
                        localStorage.setItem("templateID", data.responseObject);
                        priceAndBillUpdation(data.responseObject);

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
    // ----------------------------------- UPDATE SERVICE OFFER END ---------------------------------------//


    // ----------------------------------- DELETE PRICING TABLE DATA START ---------------------------------------//

    $("#pricingTable tbody").on("click", ".deleteRow", function () {
        let Id = $(this).attr("id");
        let result = confirm("Are you sure you want to delete this row?");
        if (result) {
            $.ajax({
                url: `${DELETE_PRICING_DATA_URL}?AdminId=${ADMIN_AUTH}&id=${Id}`,
                type: "POST",
                dataType: "JSON",
                crossDomain: true,
                success: (data) => {
                    if (data.responsecode === 1) {
                        let row = $("#" + Id).closest("tr");
                        row.css({ background: "tomato", color: "#fff" }).fadeOut(1000, function () {
                            $(this).remove();
                            updateTotals();
                        });
                        SUCCESS_MESSAGE("Row Deleted Successfully");
                    } else {
                        ERROR_MESSAGE(data.responseObject);
                    }
                },
                error: () => {
                    ERROR_MESSAGE("Failed to delete the row. Please try again.");
                }
            });
        }
    });

    // Function to recalculate total amounts after deletion
    function updateTotals() {
        $("#gstType").prop("disabled", true);
        $("#sgstVal, #cgstVal, #isgtval, #discountAmt").val('');
        $("#toatlgstAmt, #totalAmt, #toatlDiscountAmt, #grandTotal").html('');
        CALCULATE_TOTAL_DSCOUNT_GRAND_TOTAL();
    }


    // ----------------------------------- DELETE PRICING TABLE DATA  END ---------------------------------------//


});