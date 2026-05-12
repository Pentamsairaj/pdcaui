"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getInvoiceCommonFormData } from './getFormData.js';
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
    const GET_DATA_FROM_FORM = getInvoiceCommonFormData;
    const GET_PAGINATION = getPagination;
    const CONVERT_NUMBER_INTO_STRING = convertIntToEnglish;



    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');
    if (ADMIN_NAME != "Admin" && ADMIN_NAME != "Manager" && ADMIN_NAME != "CRM Executive") {
        $(".Create_Invoice").hide();
    };

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
    const INVOICE_INVOICE_URL = APIS.InvoiceListExport;
    const INVOICE_LIST_URL = APIS.invoiceListCsvDownload;
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
        let quoteNumber = $("#quoteNumber").val();
        CLEAR_STORAGE();
        if (quoteNumber) {
            $.ajax({
                url: `${TEMPLATE_VIEW_URL}?AdminId=${ADMIN_AUTH}&SQNumber=${quoteNumber}`,
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
                            <td class="text-center"><input type="number"  class="form-control" value=${value.SNO} id="s_no"></td>
                            <td class="d-none d-print-none"><input type="hidden" id="product_id" name="product_id" value=${value.id}></td>
                            <td><input type="text" value="${name}" id="product_service" class="form-control">
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
                            <td class="text-center"><input type="number"  class="form-control" value=${value.SNO} id="s_no"></td>
                            <td class="d-none d-print-none"><input type="hidden" id="product_id" name="product_id" value=${value.id}></td>
                            <td><input type="text" value="${name}" id="product_service" class="form-control">
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
                        debugger;
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


    //  ----------------------------------- CREATE SERVICE OFFER START ---------------------------------------//

    let isSubmitting = false; // 🔒 global flag

    $("#createInvoiceSubmit").submit(function (e) {
        e.preventDefault();

        if (isSubmitting) return; // 🚫 STOP if already submitting

        const templateData = GET_DATA_FROM_FORM();
        const submitButton = $("#createInvoiceSubmit button[type='submit']");

        if (templateData.logo != "" &&
            templateData.companylogo != "" &&
            templateData.signature != "" &&
            templateData.tandc != "" &&
            templateData.InvoiceCode != "") {

            isSubmitting = true; // 🔒 lock

            submitButton.prop("disabled", true);

            $.ajax({
                url: CREATE_INVOICE_URL,
                type: "POST",
                data: { ...templateData, "AdminId": ADMIN_AUTH },
                dataType: "JSON",
                crossDomain: true,

                beforeSend: function () {
                    $("#spinnerOverlay").css("display", "flex");
                    $("body").css("pointer-events", "none");
                },

                success: function (data) {
                    if (data.responsecode === 1) {
                        localStorage.setItem("templateID", data.responseObject);
                        priceAndBillCreation(data.responseObject);
                    } else {
                        ERROR_MESSAGE(data.responsemessage);
                    }
                },

                error: function (err) {
                    console.error(err);
                    ERROR_MESSAGE("Something went wrong!");
                },

                complete: function () {
                    // 🔓 unlock after API finishes
                    isSubmitting = false;

                    //$("#spinnerOverlay").hide();
                    //$("body").css("pointer-events", "auto");
                    submitButton.prop("disabled", false);
                }
            });

        } else {
            // ❗ validation errors → unlock again
            isSubmitting = false;

            if (templateData.InvoiceCode == "" || templateData.InvoiceCode == "Select Invoice Type") {
                ERROR_MESSAGE("Please Select Invoice On");
            } else if (templateData.tandc == "") {
                ERROR_MESSAGE("Please Enter Terms & Conditions");
            } else if (templateData.logo == "") {
                ERROR_MESSAGE("Template Logo is Required");
            } else if (templateData.companylogo == "") {
                ERROR_MESSAGE("Powered By is Required");
            } else if (templateData.signature == "") {
                ERROR_MESSAGE("Signature is Required");
            }
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

    $.ajax({
        url: `${SERVICE_INVOICE_URL}?AdminId=${ADMIN_AUTH}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        beforeSend: (() => {
            $(".spinner").show();
        }),
        success: (data) => {
            console.log(data)
            $("#table-id tbody").empty();
            if (Object.keys(data).length > 0) {
                $.each(data, (index, value) => {
                    let comment;
                    if (value.comment) {
                        comment = value.comment;
                    } else {
                        comment = "";
                    }
                    let Refferedby;
                    if (value.Refferedby) {
                        Refferedby = value.Refferedby;
                    } else {
                        Refferedby = "-";
                    }

                    let createOn = CONVERT_JSON_TO_NORMAL_DATE(value.Date);
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        let newRow = `<tr>
                                  <td>${++index}</td>
                                  <td>${createOn}</td>
                                  <td>${value.InvoiceNumber}</td>
                                  <td>${value.Service_Quote}</td>
                                  <td>${value.company}</td>
                                  <td>${Refferedby}</td>
                                  <td>${value.team_membername}</td>
                                  <td>${value.GrandTotal}</td>
                                  <td>
                                       <select class="form-control w-150px" id="remarkdropdown${value.id}" serviceId=${value.id} quoteGivenBy=${value.team_membername}>
                                       <option value="">Select workStatus</option>
                                       <option value="Completed">Completed</option>
                                       <option value="Progress">In Progress</option>
                                       <option value="hold">Hold</option>
                                       </select>
                                  </td>
                                  <td TemplateId=${value.id} class="d-flex"><a href='editInvoice.html?TemplateId=${value.id}' class="mx-2"><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> <span TemplateId=${value.id} class='Delete mx-2'><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></span><a target="_blank" href='invoicePreview.html?TemplateId=${value.id}' class="mx-2"><i class='menu-icon flaticon-technology text-warning cursor-pointer'></i></a></td>
                                  </tr>`;
                        $("#table-id tbody").append(newRow);
                    }
                    else {
                        let newRow = `<tr>
                                  <td>${++index}</td>
                                  <td>${createOn}</td>
                                  <td>${value.InvoiceNumber}</td>
                                  <td>${value.Service_Quote}</td>
                                  <td>${value.company}</td>
                                  <td>${Refferedby}</td>
                                  <td>${value.team_membername}</td>
                                  <td>${value.GrandTotal}</td>
                                  <td>
                                       <select class="form-control w-150px" id="remarkdropdown${value.id}" serviceId=${value.id} quoteGivenBy=${value.team_membername}>
                                       <option value="">Select workStatus</option>
                                       <option value="Completed">Completed</option>
                                       <option value="Progress">In Progress</option>
                                       <option value="hold">Hold</option>
                                       </select>
                                  </td>
                                  <td TemplateId=${value.id} class="d-flex"><a href='editInvoice.html?TemplateId=${value.id}' class="mx-2"><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> <a target="_blank" href='invoicePreview.html?TemplateId=${value.id}' class="mx-2"><i class='menu-icon flaticon-technology text-warning cursor-pointer'></i></a></td>
                                  </tr>`;
                        $("#table-id tbody").append(newRow);
                    }


                    if (value.Remark != null) {
                        $(`#remarkdropdown${value.id} option[value=${value.Remark}]`).prop('selected', true);
                    }
                });
            };
            $('#table-id').DataTable();
        },
        complete: (() => {
            $(".spinner").hide();

        })
    });
    // -----------------------------------   SERVICE OFFER LIST END ---------------------------------------//
    $("#table-id tbody").on('change', '[id^="remarkdropdown"]', function () {
        let remarkValue = $(this).val();
        let serviceId = $(this).attr('serviceId');

        if (remarkValue == 'hold') {
            $('#remarkCommentModal').modal('show');

            $("#commentSave").off('click').on('click', function () {
                let reason = $("#holdReason").val();
                $('#remarkCommentModal').modal('toggle');

                SERVICE_OFFER_REMARK({
                    "Id": serviceId,
                    "comment": reason,
                    "Remark": remarkValue
                }, INVOICE_REMARK_URL);
            });
            $("#commentSave").off('click').on('click', function () {
                let reason = $("#holdReason").val().trim();

                $('#remarkCommentModal').modal('toggle');


                // Call the function to update the remark
                updateServiceOfferRemark(serviceId, reason, remarkValue);
            });
        } else if (remarkValue === 'Completed' || remarkValue === 'Progress') {
            updateServiceOfferRemark(serviceId, "", remarkValue);
        }

    });
    function updateServiceOfferRemark(serviceId, comment, remarkValue) {
        $.ajax({
            url: INVOICE_REMARK_URL,
            type: "POST",
            data: {
                "Id": serviceId,
                "comment": comment,
                "Remark": remarkValue,
                "AdminID": ADMIN_AUTH
            },
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                if (data.responsecode === 1) {
                    SUCCESS_MESSAGE("Remark Updated Successfully");
                    $(".toast").not(':first').remove(); // Ensures only one success message is shown
                    PAGE_RELOAD();
                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });
    }

    // -----------------------------------   SERVICE OFFER DELETE START ---------------------------------------//

    $("#table-id tbody").on("click", '.Delete', function () {
        let TemplateId = $(this).attr("TemplateId");
        let result = confirm("Are you Sure? You Want to Delete this Template");
        if (result) {
            $.post(`${DELETE_INVOICE_URL}?AdminId=${ADMIN_AUTH}&TemplateId=${TemplateId}`, { "TemplateId": TemplateId })
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
            url: `${INVOICE_INVOICE_URL}?AdminID=${ADMIN_AUTH}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,

            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
            },
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