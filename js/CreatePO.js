"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getPoCommonFormData } from './getFormData.js';
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
    const GET_DATA_FROM_FORM = getPoCommonFormData;
    const CONVERT_NUMBER_INTO_STRING = convertIntToEnglish;

    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');
    if (ADMIN_NAME != "Admin" && ADMIN_NAME != "Manager") {
        $(".create_purch_order").hide();
    };
    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//

    CLEAR_STORAGE();

    // ----------------------------------- APIs START ---------------------------------------//

    const TEMPLATE_LIST_FOR_SERVICE_OFFER_URL = APIS.templatesForServiceOffer;
    const TEMPLATE_VIEW_URL = APIS.templateDetailsEditView;
    const CREATE_PO_URL = APIS.createPo;
    const CREATE_PO_PRICE_TABLE_URL = APIS.createPoPriceTable;
    const SERVICE_INVOICE_URL = APIS.poList;
    const Purchase_Order_Export = APIS.PurchaseOrderExport;
    const DELETE_INVOICE_URL = APIS.deletePo;
    const PO_REMARK_URL = APIS.poRemark;
    const VENDOR_DROPDOWN = APIS.vendorData
    // ----------------------------------- APIs END ---------------------------------------//

    // ----------------------------------- COMMON AJAX CALLS START ---------------------------------------//

    const CREATE_PRICE_ROW = commonAjaxCalls.createPoPrice;
    const PRICE_AND_BILL_CREATION_AT_ONCE = commonAjaxCalls.priceAndBillCreationAtOnceForPo;
    const SERVICE_OFFER_REMARK = commonAjaxCalls.serciveOfferRemark;

    // ----------------------------------- COMMON AJAX CALLS END ---------------------------------------//


    // ----------------------------------- HIDING ERROR MESSAGE WHILE PAGE LOADING START ---------------------------------------//

    $("#phoneNumberError").hide();
    $("#teamEmailError").hide();
    $("#companyEmailError").hide();
    $("#teamphoneNumberError").hide();


    const url = window.location.search;
    const params = new URLSearchParams(url);

    const TemplateId = params.get("TemplateId");

    // ----------------------------------- HIDING ERROR MESSAGE WHILE PAGE LOADING END ---------------------------------------//


    $.get(`${VENDOR_DROPDOWN}?AdminId=${ADMIN_AUTH}`)
        .done((data) => {
            if (Object.keys(data).length > 0) {
                $.each(data, (index, value) => {
                    let newOption = `<option value=${value.id}>${value.NameAcc}</option>`
                    $("#vendorName").append(newOption);
                });
            };

        });


    // Method for price and bill creation
    const priceAndBillCreation = (PurchaseorderID) => {
        debugger;
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
                    "PurchaseorderID": PurchaseorderID,
                    "sno": parseInt(item.s_no),
                    "Servicename": item.product_service,
                    "SAC_HSCode": item.product_Hscode,
                    "Numberofservices": parseInt(item.product_qnty),
                    "Unitprice": parseInt(item.product_price),
                    "qty": parseInt(item.product_qnty),
                    "Amount": parseInt(item.product_amt)
                }, CREATE_PO_PRICE_TABLE_URL);

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
                    debugger;
                    PRICE_AND_BILL_CREATION_AT_ONCE({
                        "POpricingID": PRICING_id,
                        "PurchaseorderID": PurchaseorderID,
                        "sno": parseInt(item.s_no),
                        "Servicename": item.product_service,
                        "SAC_HSCode": item.product_Hscode,
                        "Numberofservices": parseInt(item.product_qnty),
                        "Unitprice": parseInt(item.product_price),
                        "qty": parseInt(item.product_qnty),
                        "Amount": parseInt(item.product_amt)
                    }, CREATE_PO_PRICE_TABLE_URL, PurchaseorderID);
                } else {
                    // if pricing id  then create multiple rows
                    if (PRICING_id) {
                        CREATE_PRICE_ROW({
                            "PricingID": PRICING_id,
                            "PurchaseorderID": PurchaseorderID,
                            "sno": parseInt(item.s_no),
                            "Servicename": item.product_service,
                            "SAC_HSCode": item.product_Hscode,
                            "Numberofservices": parseInt(item.product_qnty),
                            "Unitprice": parseInt(item.product_price),
                            "qty": parseInt(item.product_qnty),
                            "Amount": parseInt(item.product_amt)
                        }, CREATE_PO_PRICE_TABLE_URL);
                        // if no pricing id  create single row and store pricing id in localstorage
                    } else {
                        CREATE_PRICE_ROW({

                            "PurchaseorderID": PurchaseorderID,
                            "sno": parseInt(item.s_no),
                            "Servicename": item.product_service,
                            "SAC_HSCode": item.product_Hscode,
                            "Numberofservices": parseInt(item.product_qnty),
                            "Unitprice": parseInt(item.product_price),
                            "qty": parseInt(item.product_qnty),
                            "Amount": parseInt(item.product_amt)
                        }, CREATE_PO_PRICE_TABLE_URL, PurchaseorderID);

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
                    $("#invoiceOn").append(newOption);
                });
            };

        });

    // -----------------------------------  TEMPLATES FOR SERVVICE OFFER END ---------------------------------------//


    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  START ---------------------------------------//
    //$("#invoiceOn").click((e) => {
    //    e.preventDefault();
    //    let CorrespondingInvoice = $("#CorrespondingInvoice").val();
    //    CLEAR_STORAGE();
    //    if (CorrespondingInvoice) {
    //        $.ajax({
    //            url: `${TEMPLATE_VIEW_URL}?AdminId=${ADMIN_AUTH}&CINumber=${CorrespondingInvoice}`,
    //            type: "GET",
    //            async: false,
    //            dataType: "JSON",
    //            crossDomain: true,
    //            success: (data) => {
    //                $("#vendorName").val(data.vendorname);
    //                $("#companyName").val(data.companyname);
    //                $("#companyAddress").val(data.address);
    //                $("#companyEmail").val(data.emailid);
    //                $("#companyPhone").val(data.phone);
    //                $("#companyGstNumber").val(data.GSTNumber);
    //                $("#companyBankAcNo").val(data.ToBank_Account);
    //                $("#companyBankName").val(data.ToBankName);
    //                $("#companyIfscCode").val(data.ToBank_IFSC_Code);
    //                $("#Materialreceivedon").val(data.Materialreceivedon);
    //                $("#CorrespondingInvoice").val(data.Invoiceno);
    //                $("#teamMemberName").val(data.team_membername);
    //                $("#teamEmail").val(data.Team_emailid);
    //                $("#teamPhone").val(data.Team_phone);
    //                $("#teamAddress").val(data.Team_Address);
    //                $("#teamCompanyName").val(data.CompanyName);

    //                $("#teamGstNumber").val(data.Team_GSTNumber);
    //                $("#teamBankAcNo").val(data.TeamBank_Account);
    //                $("#teamBankName").val(data.TeamBank);
    //                $("#teamIfscCode").val(data.Team_IFSC_Code);
    //                $("#termsAndConditions").summernote('code', data.tandc);
    //                $('#scopeOfWorkDescription').summernote('code', data.scopeofwork);

    //                if (data.isscopeofwork) {
    //                    $("#scopeWorkCheckBox").attr('checked', true);
    //                    $('#scopeOfWorkDescription').summernote('enable');

    //                }


    //                if (data.T_PricingList.length > 0) {
    //                    $("#pricingTable tbody").empty();
    //                    data.T_PricingList.map((value) => {
    //                        let name = value.name;
    //                        let SAC_HSCode = value.SAC_HSCode;
    //                        let Numberofservices = value.Numberofservices;
    //                        let UnitPricePer = value.UnitPricePer;
    //                        let Amount = value.Amount;
    //                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
    //                            let currentRow = `
    //                    <tr>
    //                        <td class="text-center"><input type="number"  class="form-control" value=${value.SNO} id="s_no"></td>
    //                        <td class="d-none d-print-none"><input type="hidden" id="product_id" name="product_id" value=${value.id}></td>
    //                        <td><textarea style="width:350px" id="product_service" class="form-control">${Servicename}</textarea>
    //                        </td>
    //                        <td><input type="text" value=${SAC_HSCode} id="product_Hscode" class="form-control">
    //                        </td>
    //                        <td ><input type="number" id="product_qnty" value=${Numberofservices} class="form-control  pro_qnty${value.SNO}">
    //                        </td>
    //                        <td><input type="number" id="product_price" value=${Unitprice} class="form-control pron_price${value.SNO}">
    //                        </td>
    //                        <td id="product_amt" class="pro_amt${value.SNO}"> ${Amount}</td>
    //                        <td class="removeRows" amt=${Amount} id=${value.id}><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></td>
    //                    </tr>
    //                    `;

    //                            $("#pricingTable tbody").append(currentRow);
    //                        }
    //                        else {
    //                            let currentRow = `
    //                    <tr>
    //                        <td class="text-center"><input type="number"  class="form-control" value=${value.SNO} id="s_no"></td>
    //                        <td class="d-none d-print-none"><input type="hidden" id="product_id" name="product_id" value=${value.id}></td>
    //                        <td><textarea style="width:350px" id="product_service" class="form-control">${Servicename}</textarea>
    //                        </td>
    //                        <td><input type="text" value=${SAC_HSCode} id="product_Hscode" class="form-control">
    //                        </td>
    //                        <td ><input type="number" id="product_qnty" value=${Numberofservices} class="form-control  pro_qnty${value.SNO}">
    //                        </td>
    //                        <td><input type="number" id="product_price" value=${Unitprice} class="form-control pron_price${value.SNO}">
    //                        </td>
    //                        <td id="product_amt" class="pro_amt${value.SNO}"> ${Amount}</td>
                           
    //                    </tr>
    //                    `;

    //                            $("#pricingTable tbody").append(currentRow);
    //                        }


    //                        $(`.pron_price${value.SNO}`).keyup(() => {
    //                            let qnt = $(`.pro_qnty${value.SNO}`).val();
    //                            let price = $(`.pron_price${value.SNO}`).val();
    //                            if (qnt != "" && price != "") {
    //                                const amt = CALCULATE_AMOUNT(parseInt(qnt), parseInt(price));
    //                                $(`.pro_amt${value.SNO}`).html(amt);
    //                            }
    //                        });

    //                        $(`.pro_qnty${value.SNO}`).keyup(() => {
    //                            let qnt = $(`.pro_qnty${value.SNO}`).val();
    //                            let price = $(`.pron_price${value.SNO}`).val();
    //                            if (qnt != "" && price != "") {
    //                                const amt = CALCULATE_AMOUNT(parseInt(qnt), parseInt(price));
    //                                $(`.pro_amt${value.SNO}`).html(amt);
    //                            }
    //                        })
    //                    });

    //                };

    //                if (data.LCBList.length > 0) {
    //                    data.LCBList.map((item) => {
    //                        $("#totalAmt").html(item.Amount);
    //                        $("#discountAmt").val(item.discount);
    //                        $("#toatlDiscountAmt").text(item.discountAmount);
    //                        $("#toatlgstAmt").text(item.gstAmount);
    //                        $("#sgstVal").val(item.sgst);
    //                        $("#cgstVal").val(item.cgst);
    //                        $("#isgtval").val(item.igst);
    //                        $("#grandTotal").text(item.grandTotal);
    //                        $("#amtInString").val(item.amountInWords);
    //                        const numberInWords = CONVERT_NUMBER_INTO_STRING(Math.round(item.grandTotal));
    //                        $("#amtInString").val(numberInWords);


    //                    });
    //                }


    //                $("#fl_mainimgview").attr("src", data.poweredbylogo);
    //                $("#fl_img1view").attr("src", data.signature);
    //                $("#fl_img2view").attr("src", data.logo);


    //                CONVERT_IMAGE_TO_BASE64(data.logo, "templateLogo");
    //                CONVERT_IMAGE_TO_BASE64(data.poweredbylogo, "companyLogo");
    //                CONVERT_IMAGE_TO_BASE64(data.signature, "signatureLogo");


    //                if (data.companylogo) {
    //                    $("#fl_mainimgview").css("background-image", "url('" + data.poweredbylogo + "')");
    //                }

    //                if (data.signature) {
    //                    $("#fl_img1view").css("background-image", "url('" + data.signature + "')");
    //                }

    //                if (data.logo) {
    //                    $("#fl_img2view").css("background-image", "url('" + data.logo + "')");
    //                }
    //            }
    //        });
    //    } else {

    //    }
    //})


    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  END ---------------------------------------//


    //  ----------------------------------- PULL VENDOR DATA START ---------------------------------------//

    $("#vendorName").change(function () {
        var VendorId = $(this).val();
        vendordata(VendorId);
    });
   
    $("#invoiceOn").change((e) => {
        e.preventDefault();
        let Id = $("#invoiceOn option:selected").val();
        CLEAR_STORAGE();
        $.ajax({
            url: `${TEMPLATE_VIEW_URL}?AdminId=${ADMIN_AUTH}&TemplateId=${Id}`,
            type: "GET",
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
               
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



                $("#fl_mainimgview").attr("src", data.companylogo);
                $("#fl_img1view").attr("src", data.signature);
                $("#fl_img2view").attr("src", data.logo);

                debugger;
                CONVERT_IMAGE_TO_BASE64(data.logo, "templateLogo");
                CONVERT_IMAGE_TO_BASE64(data.companylogo, "poweredbylogo");
                CONVERT_IMAGE_TO_BASE64(data.signature, "signatureLogo");


                if (data.logo) {
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

    })


    function vendordata(VendorId) {

        $.ajax({
            url: "https://api.pioneerfoods.in/Vendor/VendorGetDetails?AdminId=" + ADMIN_AUTH + "&ClientId=" + VendorId,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false,
            success: (data) => {

                $("#invoiceOn option:selected").text(data.poraisedby);
                $("#quoteNumber").val(data.POOn);
                /*       $("#vendorName").val(data.vendorname).change();*/
                $("#vendorName option").each(function () {
                    if ($(this).text() === data.vendorname) {
                        $(this).prop("selected", true);
                    }
                });
                $("#companyName").val(data.Companyname);
                $("#companyAddress").val(data.Address);
                $("#companyEmail").val(data.email);
                $("#companyPhone").val(data.phonenumber);
                $("#companyGstNumber").val(data.GSTNumber);
                $("#companyBankAcNo").val(data.Bank_Account);
                $("#companyBankName").val(data.BankName);
                $("#companyIfscCode").val(data.IFSC_Code);
                //if (data.Materialreceivedon != null) {
                //    var completedDate = new Date(parseInt(data.Materialreceivedon.replace("/Date(", "").replace(")/")));
                //    var dd = completedDate.getDate();
                //    var mm = completedDate.getMonth() + 1; //January is 0! 
                //    var yyyy = completedDate.getFullYear();
                //    if (dd < 10) { dd = '0' + dd }
                //    if (mm < 10) { mm = '0' + mm }

                //    var Materialreceivedon = yyyy + '-' + mm + '-' + dd;

                //}
                //else {
                //    Materialreceivedon = "";
                //}
                //$("#Materialreceivedon").val(Materialreceivedon);
                //$("#CorrespondingInvoice").val(data.Invoiceno);
            }
        });

    }

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
   
    //  ----------------------------------- PULL VENDOR DATA START ---------------------------------------//

    //  ----------------------------------- CREATE SERVICE OFFER START ---------------------------------------//

    $("#createInvoiceSubmit").one("submit", (e) => {
        e.preventDefault();
        const submitButton = $("#createInvoiceSubmit button[type='submit']");
        const templateData = GET_DATA_FROM_FORM();
        if (templateData.logo != "" && templateData.poweredbylogo != "" && templateData.signature != "" && templateData.tandc != "" && templateData.poraisedby != "") {
            submitButton.prop("disabled", true);
            $.ajax({
                url: `${CREATE_PO_URL}?AdminID=${ADMIN_AUTH}`,
                type: "POST",
                data: templateData,
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
                },

            });
        } else if (templateData.poraisedby == "" || templateData.poraisedby == "Select PO Raised By") {
            ERROR_MESSAGE("Please Select PO Raised By");
        } else if (templateData.tandc == "") {
            ERROR_MESSAGE("Please Enter Terms & Conditions");
        } else if (templateData.logo == "") {
            ERROR_MESSAGE("Template Logo is Required");
        } else if (templateData.poweredbylogo == "") {
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
        localstorage.setItem("prevAmt", totalAmt);
    });

    // -----------------------------------  DELETE PRICING ROW END START---------------------------------------//


    // -----------------------------------   SERVICE OFFER LIST START ---------------------------------------//
    $.ajax({
        url: `${SERVICE_INVOICE_URL}?AdminID=${ADMIN_AUTH}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        beforeSend: function () {
            // Show the spinner before the AJAX call starts
            $(".spinner").show();
            $("#kt_content,.card").css("opacity", "0.1");
        },
        success: (data) => {
            console.log(data)
            $("#table-id tbody").empty();
            if (Object.keys(data).length > 0) {

                $.each(data, (index, value) => {

                    var license = ""
                    if (value.Invoicecopy == null) {
                        license = "N/A"
                    }
                    else {
                        license = "<a href='" + value.Invoicecopy + "' target='_blank'><i class='fa-solid fa-eye' style='color: #74C0FC;'></i></a>"
                    }
                    let createOn = CONVERT_JSON_TO_NORMAL_DATE(value.createdon);
                    if (value.Materialreceivedon != null) {
                        var completedDate = new Date(parseInt(value.Materialreceivedon.replace("/Date(", "").replace(")/")));
                        var dd = completedDate.getDate();
                        var mm = completedDate.getMonth() + 1; //January is 0! 
                        var yyyy = completedDate.getFullYear();
                        if (dd < 10) { dd = '0' + dd }
                        if (mm < 10) { mm = '0' + mm }

                        var Materialreceivedon = dd + '-' + mm + '-' + yyyy;

                    }
                    else {
                        Materialreceivedon = "-";
                    }
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        let newRow = `<tr>
                                  <td>${++index}</td>
                                  <td>${createOn}</td>
                                  <td>${value.POOn}</td>
                                  <td>${value.poraisedby}</td>
                                  <td>${value.Amount}</td>
                                  <td>${value.companyname}</td>
                                  <td>${value.vendorname}</td>
                                  <td>${value.phone}</td>
                                  <td>${Materialreceivedon}</td>
                                  <td>${value.Invoiceno}</td>
                                  <td>${license}</td>
                                  <td>
                                       <select class="form-control w-150px" id="remarkdropdown${value.ID}" serviceId=${value.ID} quoteGivenBy=${value.team_membername}>
                                       <option value="">Select workStatus</option>
                                       <option value="Completed">Completed</option>
                                       <option value="Progress">In Progress</option>
                                       <option value="hold">Hold</option>
                                       </select>
                                  </td>
                                  <td ID=${value.ID} class="d-flex"><a href='EditPO.html?ID=${value.ID}'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> <span ID=${value.ID} class='Delete mx-3'><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></span><a target="_blank" href='POPreview.html?ID=${value.ID}'><i class='menu-icon flaticon-technology text-warning cursor-pointer'></i></a></td>
                                  </tr>`;
                        $("#table-id tbody").append(newRow);
                    }
                    else {
                        let newRow = `<tr>
                                  <td>${++index}</td>
                                  <td>${createOn}</td>
                                  <td>${value.POOn}</td>
                                  <td>${value.poraisedby}</td>
                                   <td>${value.Amount}</td>
                                  <td>${value.companyname}</td>
                                  <td>${value.vendorname}</td>
                                  <td>${value.phone}</td>
                                  <td>${Materialreceivedon}</td>
                                  <td>${value.Invoiceno}</td>
                                  <td>${license}</td>
                                  <td>
                                       <select class="form-control w-150px" id="remarkdropdown${value.ID}" serviceId=${value.ID} quoteGivenBy=${value.team_membername}>
                                       <option value="">Select workStatus</option>
                                       <option value="Completed">Completed</option>
                                       <option value="Progress">In Progress</option>
                                       <option value="hold">Hold</option>
                                       </select>
                                  </td>
                                  <td ID=${value.ID}><a href='EditPO.html?ID=${value.ID}'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> <a target="_blank" href='POPreview.html?ID=${value.ID}'><i class='menu-icon flaticon-technology text-warning cursor-pointer'></i></a></td>
                                  </tr>`;
                        $("#table-id tbody").append(newRow);
                    }


                    if (value.Status != null) {
                        debugger;
                        $(`#remarkdropdown${value.ID} option[value=${value.Status}]`).prop('selected', true);
                    }


                    $("#table-id tbody").on('change', `#remarkdropdown${value.ID}`, function () {
                        debugger;
                        let remarkValue = $(`#remarkdropdown${value.ID} option:selected`).val();

                        let serviceId = $(this).attr('serviceId');

                        if (remarkValue == 'hold') {
                            $('#remarkCommentModal').modal('show');

                            $("#commentSave").click(() => {
                                let reason = $("#holdReason").val();
                                $('#remarkCommentModal').modal('toggle');

                                SERVICE_OFFER_REMARK({
                                    "Id": serviceId,
                                    "Status": reason,
                                    "Status": remarkValue
                                }, PO_REMARK_URL);
                            });
                        } else if (remarkValue == 'Completed' || remarkValue == 'Progress') {

                            SERVICE_OFFER_REMARK({
                                "Id": serviceId,
                                "Status": "",
                                "Status": remarkValue
                            }, PO_REMARK_URL);
                        }

                    })

                });
            };
            $('#table-id').DataTable();
        },
        complete: function () {
            // Hide the spinner after the AJAX call completes (regardless of success or failure)
            $(".spinner").hide();
            $("#kt_content,.card").css("opacity", "");

        },
    });
    // -----------------------------------   SERVICE OFFER LIST END ---------------------------------------//

    $("#btnexportService").click(() => {

        $.ajax({
            url: `${Purchase_Order_Export}?AdminID=${ADMIN_AUTH}&downloadCsv=${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: () => {
                $(".spinner_loading").show()
            },
            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
                $(".spinner_loading").hide();
            }
        });
        return false;
    })
    function Export_JSON_to_CSV(JSONString, ReportName, isShowHeader) {
        // Show the spinner
        document.querySelector(".spinner_loading").style.display = "block";

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
                document.querySelector(".spinner_loading").style.display = "none";
            }
        }, 100); // Give time for spinner to render
    }
    // -----------------------------------   SERVICE OFFER DELETE START ---------------------------------------//
    $("#table-id").on("click", ".Delete", function () {

        var id = $(this).attr("id");
        var result = confirm("Are you Sure? You Want to Delete");
        if (result) {
            $.ajax({
                url: "https://api.pioneerfoods.in/PurchaseOrder/Delete_PurchaseOrder?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                /*data: fileData,*/
                success: function (data) {
                    $(this).closest("tr").remove();
                    location.reload();
                }
            });
        }
    });

    // -----------------------------------   SERVICE OFFER DELETE END ---------------------------------------//
});
