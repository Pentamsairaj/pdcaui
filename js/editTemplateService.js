"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { getDataFromForm } from './getFormData.js';
import commonAjaxCalls from './commanAjaxCalls.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {
    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const CALCULATE_AMOUNT = reUsableFunctions.calAmount;
    const GET_DATA_FROM_TABLE = reUsableFunctions.getDataFromTable;
    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;
    const CLEAR_STORAGE = reUsableFunctions.clearStorage;
    const GET_DATA_FROM_FORM = getDataFromForm;

    const ADMIN_AUTH = localStorage.getItem("Admin_auth");

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//

    CLEAR_STORAGE();

    // ----------------------------------- DATA FROM PARAMETERS START ---------------------------------------//

    const url = window.location.search;
    const params = new URLSearchParams(url);

    const TemplateId = params.get("TemplateId");
    // ----------------------------------- DATA FROM PARAMETERS END ---------------------------------------//


    // ----------------------------------- APIs START ---------------------------------------//

    const UPDATE_TEMPLATE_VIEW_URL = APIS.templateDetailsEditView;
    const UPDATE_TEMPLATE_URL = APIS.updateTemplateForServiceOffer;
    const UPDATE_PRICE_TABLE_URL = APIS.updateTemplatePriceTable;
    const CREATE_PRICE_TABLE_URL = APIS.createTemplatePriceTable;
    const DELETE_PRICING_DATA_URL = APIS.deletePricingRow;

    // ----------------------------------- APIs END ---------------------------------------//

    // ----------------------------------- COMMON AJAX CALLS START ---------------------------------------//

    const UPDATE_PRICE_ROW = commonAjaxCalls.createPrice;
    const CREATE_PRICE_ROW = commonAjaxCalls.createPrice;
    const PRICE_AND_BILL_UPDATION_AT_ONCE = commonAjaxCalls.priceAndBillUpdationAtOnce;
    const PRICE_CREATION_AND_BILL_UPADTION = commonAjaxCalls.priceCreationAndBillUpdation;

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
                    PRICE_CREATION_AND_BILL_UPADTION({
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
                        PRICE_CREATION_AND_BILL_UPADTION({
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



    // ----------------------------------- EDIT TEMPLATE FOR SERVICE OFFER VIEW  START ---------------------------------------//

    $.ajax({
        url: `${UPDATE_TEMPLATE_VIEW_URL}?AdminId=${ADMIN_AUTH}&TemplateId=${TemplateId}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            console.log(data);
            $("#titleOfTemplate").val(data.templatename);
            $("#companyName").val(data.company);
            $("#companyAddress").val(data.address);
            $("#companyEmail").val(data.emailid);
            $("#companyPhone").val(data.phone);
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


            if (data.T_PricingList.length > 0) {
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
                        <td><input type="text" value="${name}" id="product_service" class="form-control">
                        </td>
                        <td><input type="text" value=${SAC_HSCode} id="product_Hscode" class="form-control">
                        </td>
                        <td ><input type="number" id="product_qnty" value=${Numberofservices} class="form-control pro_qnty${value.SNO}">
                        </td>
                        <td><input type="number" id="product_price" value=${UnitPricePer} class="form-control pron_price${value.SNO}">
                        </td>
                        <td id="product_amt"  class="pro_amt${value.SNO}"> ${Amount}</td>
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
                });
            }


            $("#fl_mainimgview").attr("src", data.companylogo);
            $("#fl_img1view").attr("src", data.signature);
            $("#fl_img2view").attr("src", data.logo);


            CONVERT_IMAGE_TO_BASE64(data.logo, "templateTemplateLogo");
            CONVERT_IMAGE_TO_BASE64(data.companylogo, "templatecompanyLogo");
            CONVERT_IMAGE_TO_BASE64(data.signature, "templatesignatureLogo");


            if (data.companylogo) {
                $("#fl_mainimgview").css("background-image", "url('" + data.companylogo + "')");
            }

            if (data.signature) {
                $("#fl_img1view").css("background-image", "url('" + data.signature + "')");
            }

            if (data.logo) {
                $("#fl_img2view").css("background-image", "url('" + data.logo + "')");
            }
        }
    });
    // ----------------------------------- EDIT TEMPLATE FOR SERVICE OFFER VIEW  END ---------------------------------------//

    // ----------------------------------- DELETE PRICING TABLE DATA START ---------------------------------------//

    $("#pricingTable tbody").on('click', '.deleteRow', function () {
        let Id = $(this).attr("id");
        let amt = $(this).attr("amt");
        let result = confirm("Are you Sure? You Want to Delete this Row");
        if (result) {
            $.ajax({
                url: `${DELETE_PRICING_DATA_URL}?AdminId=${ADMIN_AUTH}&id=${Id}`,
                type: "POST",
                data: { "id": Id },
                async: false,
                dataType: "JSON",
                crossDomain: true,
                success: (data) => {
                    if (data.responsecode == 1) {
                        $("#" + Id).closest("tr").css("background", "tomato");
                        $("#" + Id).closest("tr").css("color", "#fff");
                        $("#" + Id).closest("tr").fadeOut(1000, function () {
                            $(this).remove();
                            updateTotals();
                        });
                        SUCCESS_MESSAGE(data.responsemessage);
                    } else {
                        ERROR_MESSAGE(data.responseObject)
                    }
                }
            });
        };
    });
    function updateTotals() {
        $("#gstType").prop("disabled", true);
        $("#sgstVal, #cgstVal, #isgtval, #discountAmt").val('');
        $("#toatlgstAmt, #totalAmt, #toatlDiscountAmt, #grandTotal").html('');
        CALCULATE_TOTAL_DSCOUNT_GRAND_TOTAL();
    }
    // ----------------------------------- DELETE PRICING TABLE DATA  END ---------------------------------------//




    // ----------------------------------- UPDATE TEMPLATE FOR SERVICE OFFER START ---------------------------------------//

    $('#updateTemplateSubmit').submit((e) => {
        e.preventDefault();
        const returnData = GET_DATA_FROM_FORM();
        const templateData = returnData.templateData;

        if (templateData.tandc != "" && templateData.templatename != "" && templateData.logo != "" && templateData.companylogo != "" && templateData.signature != "") {
            $.ajax({
                url: `${UPDATE_TEMPLATE_URL}?AdminId=${ADMIN_AUTH}&id=${TemplateId}`,
                type: "POST",
                data: { ...templateData, "AdminId": ADMIN_AUTH, "id": TemplateId },
                async: false,
                dataType: "JSON",
                crossDomain: true,
                success: (data) => {
                    if (data.responsecode == 1) {
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
    // ----------------------------------- UPDATE TEMPLATE FOR SERVICE OFFER END ---------------------------------------//



});