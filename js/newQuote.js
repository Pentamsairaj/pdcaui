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

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//

    CLEAR_STORAGE();


    // ----------------------------------- APIs START ---------------------------------------//



    const TEMPLATE_LIST_FOR_SERVICE_OFFER_URL = APIS.templatesForServiceOffer;
    const TEMPLATE_VIEW_URL = APIS.templateDetailsEditView;
    const CREATE_SERVICE_OFFER_URL = APIS.createServiceOffer;
    const CREATE_SERVICE_OFFER_PRICE_TABLE_URL = APIS.createServiceOfferPriceTable;
    const SERVICE_OFFER_LIST_URL = APIS.ServiceOfferList;
    const DELETE_SERVICE_OFFER_URL = APIS.deleteServiceOffer;
    const SERVICE_OFFER_REMARK_URL = APIS.serviceOfferRemark;
    const PROFORMA_CSV_DOWNLOAD = APIS.proformaListCSvDownload;
    // ----------------------------------- APIs END ---------------------------------------//


    // ----------------------------------- COMMON AJAX CALLS START ---------------------------------------//

    const CREATE_PRICE_ROW = commonAjaxCalls.createServiceOfferPrice;
    const PRICE_AND_BILL_CREATION_AT_ONCE = commonAjaxCalls.priceAndBillCreationAtOnceForServiceOffer;
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
                }, CREATE_SERVICE_OFFER_PRICE_TABLE_URL);

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
                    }, CREATE_SERVICE_OFFER_PRICE_TABLE_URL);
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
                        }, CREATE_SERVICE_OFFER_PRICE_TABLE_URL);
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
                        }, CREATE_SERVICE_OFFER_PRICE_TABLE_URL, templateid);

                    }
                }
            }
        }
    }


    // -----------------------------------  TEMPLATES FOR SERVVICE OFFER START ---------------------------------------//

    $.get(`${TEMPLATE_LIST_FOR_SERVICE_OFFER_URL}?AdminId=${ADMIN_AUTH}`)
        .done((data) => {
            if (Object.keys(data).length > 0) {
                $.each(data, (index, value) => {
                    let newOption = `<option value=${value.id}>${value.Template_name}</option>`
                    $("#serviceTemplateSelect").append(newOption);
                });
            };

        });

    // -----------------------------------  TEMPLATES FOR SERVVICE OFFER END ---------------------------------------//


    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  START ---------------------------------------//
    $("#quoteSerach").click((e) => {
        e.preventDefault();
        let client_ID = $("#client_ID").val();
        CLEAR_STORAGE();
        if (client_ID) {
            $.ajax({
                url: "https://api.pioneerfoods.in/Client/GetDetails?AdminId=" + ADMIN_AUTH + "&ClientId=" + client_ID,
                type: "GET",
                async: false,
                dataType: "JSON",
                crossDomain: true,
                success: (data) => {
                    $("#companyName").val(data.Companyname);
                    $("#companyAddress").val(data.Address);
                    $("#companyEmail").val(data.email);
                    $("#companyPhone").val(data.phonenumber);
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
                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                let currentRow = `
                        <tr>
                            <td class="text-center"><input type="number"  class="form-control" style="width:50px" value=${value.SNO} id="s_no"></td>
                            <td class="d-none d-print-none"><input type="hidden" id="product_id" name="product_id" value=${value.id}></td>
                            <td><textarea type="text" style="width:240px" id="product_service" class="form-control">${name}</textarea>
                            </td>
                            <td><input type="text" value=${SAC_HSCode} id="product_Hscode" style="width:200px" class="form-control">
                            </td>
                            <td ><input type="number" id="product_qnty" value=${Numberofservices} class="form-control  pro_qnty${value.SNO}">
                            </td>
                            <td><input type="number" id="product_price" value=${UnitPricePer} class="form-control pron_price${value.SNO}">
                            </td>
                            <td id="product_amt" class="pro_amt${value.SNO}"> ${Amount}</td>
                            <td class="removeRows" amt=${Amount} id=${value.id}><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></td>
                        </tr>
                        `;

                                $("#pricingTable tbody").append(currentRow);
                            }
                            else {
                                let currentRow = `
                        <tr>
                            <td class="text-center"><input type="number" style="width:50px" class="form-control" value=${value.SNO} id="s_no"></td>
                            <td class="d-none d-print-none"><input type="hidden" id="product_id" name="product_id" value=${value.id}></td>
                            <td><textarea type="text" style="width:240px" id="product_service" class="form-control">${name}</textarea>
                            </td>
                            <td><input type="text" value=${SAC_HSCode} id="product_Hscode" style="width:200px" class="form-control">
                            </td>
                            <td ><input type="number" id="product_qnty" value=${Numberofservices} class="form-control  pro_qnty${value.SNO}">
                            </td>
                            <td><input type="number" id="product_price" value=${UnitPricePer} class="form-control pron_price${value.SNO}">
                            </td>
                            <td id="product_amt" class="pro_amt${value.SNO}"> ${Amount}</td>
                            
                        </tr>
                        `;

                                $("#pricingTable tbody").append(currentRow);
                            }


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
                            $("#totalAmt").html(item.Amount);
                            $("#discountAmt").val(item.discount);
                            $("#toatlDiscountAmt").text(item.discountAmount);
                            $("#toatlgstAmt").text(item.gstAmount);
                            $("#sgstVal").val(item.sgst);
                            $("#cgstVal").val(item.cgst);
                            $("#isgtval").val(item.igst);
                            $("#grandTotal").text(item.grandTotal);
                            $("#amtInString").val(item.amountInWords);
                            const numberInWords = CONVERT_NUMBER_INTO_STRING(Math.round(item.grandTotal));
                            $("#amtInString").val(numberInWords);


                        });
                    }


                    $("#fl_mainimgview").attr("src", data.companylogo);
                    $("#fl_img1view").attr("src", data.signature);
                    $("#fl_img2view").attr("src", data.logo);


                    CONVERT_IMAGE_TO_BASE64(data.logo, "templateLogo");
                    CONVERT_IMAGE_TO_BASE64(data.companylogo, "companyLogo");
                    CONVERT_IMAGE_TO_BASE64(data.signature, "signatureLogo");


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
        } else {

        }
    })


    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  END ---------------------------------------//



    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  START ---------------------------------------//
    $("#serviceTemplateSelect").change((e) => {
        e.preventDefault();
        let templateId = $("#serviceTemplateSelect option:selected").val();
        CLEAR_STORAGE();
        $.ajax({
            url: `${TEMPLATE_VIEW_URL}?AdminId=${ADMIN_AUTH}&TemplateId=${templateId}`,
            type: "GET",
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                $("#companyName").val(data.company);
                $("#companyAddress").val(data.address);
                $("#companyEmail").val(data.emailid);
                $("#companyPhone").val(data.phone);
                $("#companyGstNumber").val(data.GSTNumber);
                $("#cont_name").val(data.ContactPersonName);
                $("#cont_Phone").val(data.ContactPersonNumber);
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

                if (data.T_PricingList.length >= 0) {
                    $("#pricingTable tbody").empty();
                    data.T_PricingList.map((value) => {
                        let name = value.name;
                        let SAC_HSCode = value.SAC_HSCode;
                        let Numberofservices = value.Numberofservices;
                        let UnitPricePer = value.UnitPricePer;
                        let Amount = value.Amount;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            let currentRow = `
                        <tr>
                            <td class="text-center"><input type="number" style="width:50px" class="form-control" value=${value.SNO} id="s_no"></td>
                            <td class="d-none d-print-none"><input type="hidden" id="product_id" name="product_id" value=${value.id}></td>
                            <td><textarea type="text" style="width:240px" id="product_service" class="form-control">${name}</textarea>
                            </td>
                            <td><input type="text" value=${SAC_HSCode} id="product_Hscode" class="form-control">
                            </td>
                            <td ><input type="number" id="product_qnty" value=${Numberofservices} class="form-control  pro_qnty${value.SNO}">
                            </td>
                            <td><input type="number" id="product_price" value=${UnitPricePer} class="form-control pron_price${value.SNO}">
                            </td>
                            <td id="product_amt" class="pro_amt${value.SNO}"> ${Amount}</td>
                            <td class="removeRows" amt=${Amount} id=${value.id}><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></td>
                        </tr>
                        `;

                            $("#pricingTable tbody").append(currentRow);
                        }
                        else {
                            let currentRow = `
                        <tr>
                            <td class="text-center"><input type="number" style="width:50px" class="form-control" value=${value.SNO} id="s_no"></td>
                            <td class="d-none d-print-none"><input type="hidden" id="product_id" name="product_id" value=${value.id}></td>
                            <td><textarea type="text" style="width:240px" id="product_service" class="form-control">${name}</textarea>
                            </td>
                            <td><input type="text" value=${SAC_HSCode} id="product_Hscode" class="form-control">
                            </td>
                            <td ><input type="number" id="product_qnty" value=${Numberofservices} class="form-control  pro_qnty${value.SNO}">
                            </td>
                            <td><input type="number" id="product_price" value=${UnitPricePer} class="form-control pron_price${value.SNO}">
                            </td>
                            <td id="product_amt" class="pro_amt${value.SNO}"> ${Amount}</td>
                           
                        </tr>
                        `;

                            $("#pricingTable tbody").append(currentRow);
                        }


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
                        $("#totalAmt").html(item.Amount);
                        debugger;
                        if (item.discount == null) {
                            item.discount = "0";
                        }
                        $("#discountAmt").val(item.discount);
                        $("#toatlDiscountAmt").text(item.discountAmount);
                        $("#toatlgstAmt").text(item.gstAmount);
                        $("#sgstVal").val(item.sgst);
                        $("#cgstVal").val(item.cgst);
                        $("#isgtval").val(item.igst);
                        $("#grandTotal").text(item.grandTotal);
                        $("#amtInString").val(item.amountInWords);
                        const numberInWords = CONVERT_NUMBER_INTO_STRING(Math.round(item.Amount));
                        $("#amtInString").val(numberInWords);


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

    })
    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  END ---------------------------------------//


    // ----------------------------------- CREATE SERVICE OFFER START ---------------------------------------//

    $("#createServiceSubmit").one("submit", (e) => {
        e.preventDefault();
        const submitButton = $("#createServiceSubmit button[type='submit']");
        const templateData = GET_DATA_FROM_FORM();
        if (templateData.templatename != "" && templateData.logo != "" && templateData.companylogo != "" && templateData.signature != "" && templateData.tandc != "") {
            submitButton.prop("disabled", true);
            $.ajax({
                url: CREATE_SERVICE_OFFER_URL,
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
                },
                complete: () => {
                    submitButton.prop("disabled", false);
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
    // ----------------------------------- CREATE SERVICE OFFER END ---------------------------------------//


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

    $('#table-id').DataTable({

        processing: true,
        serverSide: true,
        filter: true,
        orderMulti: false,
        pageLength: 10,

        ajax: {
            url: SERVICE_OFFER_LIST_URL, // your API URL
            type: "POST",

            data: function (d) {
                d.AdminId = ADMIN_AUTH; // send admin id
            },

            beforeSend: function () {
                $(".spinner").show();
                $("#kt_content,.card").css("opacity", "0.2");
            },

            complete: function () {
                $(".spinner").hide();
                $("#kt_content,.card").css("opacity", "");
            }
        },

        columns: [

            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },

            {
                data: "CreatedOn",
                render: function (data) {
                    return CONVERT_JSON_TO_NORMAL_DATE(data);
                }
            },

            { data: "Quotenumber" },

            { data: "Team_Membername" },

            { data: "Company" },

            {
                data: "ContactPersonName",
                render: function (data) {
                    return data ? data : "-";
                }
            },

            {
                data: "ContactPersonNumber",
                render: function (data) {
                    return data ? data : "-";
                }
            },

            {
                data: "Refferedby",
                render: function (data) {
                    return data ? data : "-";
                }
            },

            {
                data: "Amount",
                render: function (data) {
                    return data ? data : "-";
                }
            },

            { data: "Companyname" },

            {
                data: "Remark",
                render: function (data, type, row) {

                    let comment = row.Comment ? row.Comment : "";

                    return `
                    <select class="form-control remarkdropdown"
                        serviceId="${row.Id}"
                        quoteGivenBy="${row.Team_Membername}">
                        
                        <option value="">Select Remark</option>
                        <option value="cold" ${data == "cold" ? "selected" : ""}>Cold</option>
                        <option value="hot" ${data == "hot" ? "selected" : ""}>Hot</option>
                        <option value="hold" ${data == "hold" ? "selected" : ""}>Hold</option>
                    </select>
                    <br>
                    ${comment}
                    `;
                }
            },

            {
                data: "Id",
                render: function (data) {

                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {

                        return `
                        <a href='editQuote.html?TemplateId=${data}'>
                            <i class='menu-icon flaticon2-edit text-info cursor-pointer'></i>
                        </a>

                        <span TemplateId=${data} class='Delete mx-3' style="cursor:pointer">
                            <i class='menu-icon flaticon2-rubbish-bin text-danger'></i>
                        </span>

                        <a target="_blank" href='quotePreview.html?TemplateId=${data}'>
                            <i class='menu-icon flaticon-technology text-warning cursor-pointer'></i>
                        </a>
                        `;
                    }

                    else {

                        return `
                        <a href='editQuote.html?TemplateId=${data}' class='mx-3'>
                            <i class='menu-icon flaticon2-edit text-info cursor-pointer'></i>
                        </a>

                        <a target="_blank" href='quotePreview.html?TemplateId=${data}'>
                            <i class='menu-icon flaticon-technology text-warning cursor-pointer'></i>
                        </a>
                        `;
                    }
                }
            }

        ]

    });
    // -----------------------------------   SERVICE OFFER LIST END ---------------------------------------//


    // -----------------------------------   SERVICE OFFER DELETE START ---------------------------------------//

    $("#table-id tbody").on("click", '.Delete', function () {
        let TemplateId = $(this).attr("TemplateId");
        let result = confirm("Are you Sure? You Want to Delete this Template");
        if (result) {
            $.post(`${DELETE_SERVICE_OFFER_URL}?AdminId=${ADMIN_AUTH}&TemplateId=${TemplateId}`, { "TemplateId": TemplateId })
                .done(function (data) {
                    if (data.responsecode == 1) {
                        $("#" + TemplateId).closest("tr").css("background", "tomato");
                        $("#" + TemplateId).closest("tr").css("color", "#fff");
                        $("#" + TemplateId).closest("tr").fadeOut(1000, function () {
                            $(this).remove();
                        });
                        SUCCESS_MESSAGE("Service Deleted Successfully");
                        PAGE_RELOAD();
                    } else {
                        ERROR_MESSAGE(data.responseObject)
                    }
                });
        };
    });

    // -----------------------------------   SERVICE OFFER DELETE END ---------------------------------------//

    $("#btnexportService").click(() => {
        $.ajax({
            url: `${PROFORMA_CSV_DOWNLOAD}?AdminID=${ADMIN_AUTH}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: function () {
                $("#spinner").show();
                $("#kt_content,.card").css("opacity", "0.1")
            },

            success: function (data) {
                debugger;
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
            },
            complete: function () {
                $("#spinner").hide();
                $("#kt_content,.card").css("opacity", "")
            }
        });
        return false;
    })

    function Export_JSON_to_CSV(JSONString, ReportName, isShowHeader) {
        // Show the spinner
        document.querySelector(".spinner").style.display = "block";

        setTimeout(() => {
            try {
                var arrJsonData = typeof JSONString != 'object' ? JSON.parse(JSONString) : JSONString;
                var CSV = '';
                CSV += ReportName + '\r\n\n';

                if (isShowHeader) {
                    var row = "";
                    for (var index in arrJsonData[0]) {
                        row += index + ',';
                    }
                    row = row.slice(0, -1);
                    CSV += row + '\r\n';
                }

                for (var i = 0; i < arrJsonData.length; i++) {
                    var row = "";
                    for (var index in arrJsonData[i]) {
                        row += '"' + arrJsonData[i][index] + '",';
                    }
                    row = row.slice(0, -1); // Fix for trimming
                    CSV += row + '\r\n';
                }

                if (CSV == '') {
                    alert("Invalid JsonData");
                    return;
                }

                var fileName = "CSV_";
                fileName += ReportName.replace(/ /g, "_");
                var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(CSV);
                var link = document.createElement("a");
                link.href = uri;
                link.style = "visibility:hidden";
                link.download = fileName + ".csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                alert("something went wrong please try again later ...")
            } finally {
                // Hide the spinner
                document.querySelector(".spinner").style.display = "none";
            }
        }, 100); // Give time for spinner to render
    }

});