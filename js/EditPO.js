"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { getPoCommonFormData } from './getFormData.js';
import commonAjaxCalls from './commanAjaxCalls.js';
import { calculateTotalAndGrandTotal } from './commonFunctinality.js';


// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");

    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//
    const VENDOR_DROPDOWN = APIS.vendorData
    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const CLEAR_STORAGE = reUsableFunctions.clearStorage;
    const CALCULATE_AMOUNT = reUsableFunctions.calAmount;
    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
    const CALCULATE_TOTAL_DSCOUNT_GRAND_TOTAL = calculateTotalAndGrandTotal;
    const GET_DATA_FROM_TABLE = reUsableFunctions.getDataFromTable;
    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;
    const GET_DATA_FROM_FORM = getPoCommonFormData;

    const UPDATE_SERVICE_VIEW_URL = APIS.poDetailsEditView;
    const UPDATE_PO_URL = APIS.updatePO;
    const UPDATE_PRICE_TABLE_URL = APIS.updatePOPricetable;
    const CREATE_PRICE_TABLE_URL = APIS.createPoPriceTable;
    const DELETE_PRICING_DATA_URL = APIS.deletePoPricingRow;
    const UPDATE_PRICE_ROW = commonAjaxCalls.createPoPrice;
    const CREATE_PRICE_ROW = commonAjaxCalls.createPoPrice;
    const PRICE_AND_BILL_UPDATION_AT_ONCE = commonAjaxCalls.priceAndBillUpdationAtOnceForPo;
    const PRICE_CERATION_AND_BILL_UPADATION = commonAjaxCalls.priceCreationAndBillUpdationForPo;
    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//
    debugger;
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const TemplateId = params.get("ID");
    debugger;
    CLEAR_STORAGE();
    getVendorData();
    getPurchaseorderedit();

    function getVendorData() {

        $.ajax({
            url: `${VENDOR_DROPDOWN}?AdminID=${ADMIN_AUTH}`,
            type: "GET",
            async: false,
            dataType: "JSON",
            crossDomain: true,
            success: (data) => {
                $("#vendorName").empty();
                // Append a default "Select Vendor Name" option
                $("#vendorName").append('<option value="">Select Vendor Name</option>');

                // Add the vendor options
                data.forEach((value) => {
                    let newOption = `<option value=${value.id}>${value.NameAcc}</option>`;
                    $("#vendorName").append(newOption);
                });
            }
        });
    }

    $("#phoneNumberError").hide();
    $("#teamEmailError").hide();
    $("#companyEmailError").hide();
    $("#teamphoneNumberError").hide();

    // ----------------------------------- HIDING ERROR MESSAGE WHILE PAGE LOADING END ---------------------------------------//


    // Method for price and bill updation
    const priceAndBillUpdation = (PurchaseorderID) => {
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
                        "PurchaseorderID": PurchaseorderID,
                        "SNO": parseInt(item.s_no),
                        "Servicename": item.product_service,
                        "SAC_HSCode": item.product_Hscode,
                        "Numberofservices": parseInt(item.product_qnty),
                        "Unitprice": parseInt(item.product_price),
                        "qty": parseInt(item.product_qnty),
                        "Amount": parseInt(item.product_amt)
                    }, CREATE_PRICE_TABLE_URL);
                } else {
                    PRICE_AND_BILL_UPDATION_AT_ONCE({
                        "POpricingID": PRICING_id,
                        "PurchaseorderID": PurchaseorderID,
                        "Id": item.product_id,
                        "SNO": parseInt(item.s_no),
                        "Servicename": item.product_service,
                        "SAC_HSCode": item.product_Hscode,
                        "Numberofservices": parseInt(item.product_qnty),
                        "Unitprice": parseInt(item.product_price),
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
                            "PurchaseorderID": PurchaseorderID,
                            "SNO": parseInt(item.s_no),
                            "Servicename": item.product_service,
                            "SAC_HSCode": item.product_Hscode,
                            "Numberofservices": parseInt(item.product_qnty),
                            "Unitprice": parseInt(item.product_price),
                            "qty": parseInt(item.product_qnty),
                            "Amount": parseInt(item.product_amt)
                        }, CREATE_PRICE_TABLE_URL);
                    } else {
                        // if pricing id  then create multiple rows
                        if (PRICING_id) {
                            CREATE_PRICE_ROW({
                                "Pricingid": PRICING_id,
                                "PurchaseorderID": PurchaseorderID,
                                "SNO": parseInt(item.s_no),
                                "Servicename": item.product_service,
                                "SAC_HSCode": item.product_Hscode,
                                "Numberofservices": parseInt(item.product_qnty),
                                "Unitprice": parseInt(item.product_price),
                                "qty": parseInt(item.product_qnty),
                                "Amount": parseInt(item.product_amt)
                            }, CREATE_PRICE_TABLE_URL);
                            // if no pricing id  create single row and store pricing id in localstorage
                        } else {
                            CREATE_PRICE_ROW({
                                "Pricingid": "",
                                "PurchaseorderID": PurchaseorderID,
                                "SNO": parseInt(item.s_no),
                                "Servicename": item.product_service,
                                "SAC_HSCode": item.product_Hscode,
                                "Numberofservices": parseInt(item.product_qnty),
                                "Unitprice": parseInt(item.product_price),
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
                            "PurchaseorderID": PurchaseorderID,
                            "Id": item.product_id,
                            "SNO": parseInt(item.s_no),
                            "Servicename": item.product_service,
                            "SAC_HSCode": item.product_Hscode,
                            "Numberofservices": parseInt(item.product_qnty),
                            "Unitprice": parseInt(item.product_price),
                            "qty": parseInt(item.product_qnty),
                            "Amount": parseInt(item.product_amt)
                        }, UPDATE_PRICE_TABLE_URL);
                    } else {
                        // if pricing id  then create multiple rows
                        if (PRICING_id) {
                            UPDATE_PRICE_ROW({
                                "Pricingid": PRICING_id,
                                "PurchaseorderID": PurchaseorderID,
                                "Id": item.product_id,
                                "SNO": parseInt(item.s_no),
                                "Servicename": item.product_service,
                                "SAC_HSCode": item.product_Hscode,
                                "Numberofservices": parseInt(item.product_qnty),
                                "Unitprice": parseInt(item.product_price),
                                "qty": parseInt(item.product_qnty),
                                "Amount": parseInt(item.product_amt)
                            }, UPDATE_PRICE_TABLE_URL);
                            // if no pricing id  create single row and store pricing id in localstorage
                        } else {
                            UPDATE_PRICE_ROW({
                                "Pricingid": "",
                                "Id": item.product_id,
                                "PurchaseorderID": PurchaseorderID,
                                "SNO": parseInt(item.s_no),
                                "Servicename": item.product_service,
                                "SAC_HSCode": item.product_Hscode,
                                "Numberofservices": parseInt(item.product_qnty),
                                "Unitprice": parseInt(item.product_price),
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
    function getPurchaseorderedit() {
        $.ajax({
            url: `${UPDATE_SERVICE_VIEW_URL}?AdminID=${ADMIN_AUTH}&ID=${TemplateId}`,
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

                $("#invoiceOn option:selected").text(data.poraisedby);
                $("#quoteNumber").val(data.POOn);
                /*       $("#vendorName").val(data.vendorname).change();*/
                $("#vendorName option").each(function () {
                    if ($(this).text() === data.vendorname) {
                        $(this).prop("selected", true);
                    }
                });
                $("#companyName").val(data.companyname);
                $("#companyAddress").val(data.address);
                $("#companyEmail").val(data.emailid);
                $("#companyPhone").val(data.phone);
                $("#companyGstNumber").val(data.GSTNumber);
                $("#companyBankAcNo").val(data.ToBank_Account);
                $("#companyBankName").val(data.ToBankName);
                $("#companyIfscCode").val(data.ToBank_IFSC_Code);
                if (data.Materialreceivedon != null) {
                    var completedDate = new Date(parseInt(data.Materialreceivedon.replace("/Date(", "").replace(")/")));
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0! 
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }

                    var Materialreceivedon = yyyy + '-' + mm + '-' + dd;

                }
                else {
                    Materialreceivedon = "";
                }
                $("#Materialreceivedon").val(Materialreceivedon);
                $("#CorrespondingInvoice").val(data.Invoiceno);
                if (data.Invoicecopy != null) {
                    var invoice = '<a target="_blank" href="' + data.Invoicecopy + '"><button class="btn btn-primary" type="button">View</button></a>';
                    $("#invoicepdf").hide();
                }
                else {
                    var invoice = '';
                }

                $("#yourDivId").append(invoice);
                $("#teamMemberName").val(data.team_membername);
                $("#teamEmail").val(data.Team_emailid);
                $("#teamPhone").val(data.Team_phone);
                $("#teamAddress").val(data.Team_Address);
                $("#teamCompanyName").val(data.Teamcompany);
                $("#teamGstNumber").val(data.Team_GSTNo);
                $("#teamBankAcNo").val(data.fromBank_Account);
                $("#teamBankName").val(data.fromBankName);
                $("#teamIfscCode").val(data.fromBank_IFSC_Code);
                $("#termsAndConditions").summernote('code', data.tandc);
                $('#scopeOfWorkDescription').summernote('code', data.scopeofwork);

                if (data.isscopeofwork) {
                    $("#scopeWorkCheckBox").attr('checked', true);
                    $('#scopeOfWorkDescription').summernote('enable');

                }

                if (data.ListPrice.length > 0) {
                    $("#pricingTable tbody").empty();
                    data.ListPrice.map((value) => {
                        let sno = value.sno;
                        let Servicename = value.Servicename;
                        let SAC_HSCode = value.SAC_HSCode;
                        let Numberofservices = value.Numberofservices;
                        let Unitprice = value.Unitprice;
                        let Amount = value.Amount;
                        localStorage.setItem("pricingId", value.ID);
                        let currentRow = `
                    <tr>
                        <td class="text-center"><input type="number"  class="form-control" value=${value.sno} id="s_no"></td>
                        <td class="d-none d-print-none"><input type="hidden" id="product_id" name="product_id" value=${value.ID}></td>
                        <td><textarea style="width:350px" id="product_service" class="form-control">${Servicename}</textarea>
                        </td>
                        <td><input type="text" value=${SAC_HSCode} id="product_Hscode" class="form-control">
                        </td>
                        <td ><input type="number" id="product_qnty" value=${Numberofservices} class="form-control pro_qnty${value.sno}">
                        </td>
                        <td><input type="number" id="product_price" value=${Unitprice} class="form-control pron_price${value.sno}">
                        </td>
                        <td id="product_amt" class="pro_amt${value.sno}"> ${Amount}</td>
                        <td class="deleteRow" amt=${Amount} id=${value.ID}><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></td>
                    </tr>
                    `;

                        $("#pricingTable tbody").append(currentRow);

                        $(`.pron_price${value.sno}`).keyup(() => {
                            let qnt = $(`.pro_qnty${value.sno}`).val();
                            let price = $(`.pron_price${value.sno}`).val();
                            if (qnt != "" && price != "") {
                                const amt = CALCULATE_AMOUNT(parseInt(qnt), parseInt(price));
                                $(`.pro_amt${value.sno}`).html(amt);
                            }
                        });

                        $(`.pro_qnty${value.sno}`).keyup(() => {
                            let qnt = $(`.pro_qnty${value.sno}`).val();
                            let price = $(`.pron_price${value.sno}`).val();
                            if (qnt != "" && price != "") {
                                const amt = CALCULATE_AMOUNT(parseInt(qnt), parseInt(price));
                                $(`.pro_amt${value.sno}`).html(amt);
                            }
                        })

                    });

                };

                if (data.ListPrice.length > 0) {
                    data.ListPrice.map((item) => {
                        debugger
                        localStorage.setItem("billId", data.getid);
                        $("#totalAmt").html(data.Amount);
                        $("#discountAmt").val(data.discount);
                        $("#toatlDiscountAmt").text(data.discountamount);
                        $("#toatlgstAmt").text(data.gstAmount);
                        $("#sgstVal").val(data.sgst);
                        $("#cgstVal").val(data.cgst);
                        $("#isgtval").val(data.igst);
                        $("#grandTotal").text(data.grandTotal);
                        $("#amtInString").val(data.amountInWords);


                        if (data.discount) {
                            $("#discountCheckBox").attr('checked', true);
                            $('#discountAmt').removeAttr('disabled');
                        }

                        if (data.sgst != 0 && data.cgst != 0) {
                            $("#gstType option[value='inState']").prop('selected', true);
                            $("#gstWithInState").show();
                        } else if (data.igst != 0) {
                            $("#gstType option[value='otherState']").prop('selected', true);
                            $("#gstOutsideState").show();
                        }

                        if (data.paid) {
                            $("#invoicePaidAmtcheckbox").attr('checked', true);
                            $('#invoicePaidAmt').removeAttr('disabled');
                            $("#invoicePaidAmt").val(item.paid)
                        }

                        if (data.balance) {
                            $("#invoiceDueAmtcheckbox").attr('checked', true);
                            $('#invoiceDueAmt').removeAttr('disabled');
                            $("#invoiceDueAmt").val(item.balance)
                        }
                    });


                }


                $("#fl_mainimgview").attr("src", data.poweredbylogo);
                $("#fl_img1view").attr("src", data.signature);
                $("#fl_img2view").attr("src", data.logo);

                debugger;
                CONVERT_IMAGE_TO_BASE64(data.logo, "templateLogo");
                CONVERT_IMAGE_TO_BASE64(data.poweredbylogo, "poweredbylogo");
                CONVERT_IMAGE_TO_BASE64(data.signature, "signatureLogo");


                if (data.poweredbylogo) {
                    $("#fl_mainimgview").css("background-image", "url('" + data.poweredbylogo + "')");
                }

                if (data.signature) {
                    $("#fl_img1view").css("background-image", "url('" + data.signature + "')");
                }

                if (data.logo) {
                    $("#fl_img2view").css("background-image", "url('" + data.logo + "')");
                }

            }
        });
    }
    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  END ---------------------------------------//



    $("#CalculateSum").click((e) => {
        e.preventDefault();
        CALCULATE_TOTAL_DSCOUNT_GRAND_TOTAL();
    });




    // Delete table row and calculate total amount
    $("#pricingTable").on("click", ".removeRow", function () {
        CALCULATE_TOTAL_DSCOUNT_GRAND_TOTAL();
        $(this).closest("tr").remove();
    });
    // ----------------------------------- UPDATE SERVICE OFFER START ---------------------------------------//

    $("#updateServiceSubmit").submit(function () {

        let typeOfInvoice = $("#invoiceOn option:selected").text();
        let vendorName = $("#vendorName").val();
        let companyName = $("#companyName").val();
        let companyAddress = $("#companyAddress").val();
        let companyEmail = $("#companyEmail").val();
        let companyPhone = $("#companyPhone").val();
        let companyGstNumber = $("#companyGstNumber").val();
        let companyBankAcNo = $("#companyBankAcNo").val();
        let companyBankName = $("#companyBankName").val();
        let companyIfscCode = $("#companyIfscCode").val();
        let Materialreceivedon = $("#Materialreceivedon").val();
        let CorrespondingInvoice = $("#CorrespondingInvoice").val();
        //let file4 = $("#invoicepdf").val();
        let teamMemberName = $("#teamMemberName").val();
        let teamEmail = $("#teamEmail").val();
        let teamPhone = $("#teamPhone").val();
        let teamAddress = $("#teamAddress").val();
        let teamCompanyName = $("#teamCompanyName").val();
        let teamGstNumber = $("#teamGstNumber").val();
        let teamBankAcNo = $("#teamBankAcNo").val();
        let teamBankName = $("#teamBankName").val();
        let teamIfscCode = $("#teamIfscCode").val();
        let scopeOfWorkDescription = $("#scopeOfWorkDescription").val();
        let termsAndConditions = $("#termsAndConditions").val();
        let isScopeOfWork = "";

        if ($("#scopeWorkCheckBox").is(':checked')) {
            isScopeOfWork = true;
        }
        else {
            isScopeOfWork = false;
        }
        let templateLogo = "";
        let poweredbylogo = "";
        let signature = "";
        let PotemplateLogo = localStorage.getItem("templateLogo");
        let PocompanyLogo = localStorage.getItem("poweredbylogo");
        let Posignature = localStorage.getItem("signatureLogo");

        let file = $("#imgfile")[0].files[0];
        let file1 = $("#imgfile1")[0].files[0];
        let file2 = $("#imgfile2")[0].files[0];

        if (file) {
            poweredbylogo = $("#fl_mainimgview").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        } else if (PocompanyLogo) {
            poweredbylogo = PocompanyLogo;
        }


        if (file1) {
            signature = $("#fl_img1view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        } else if (Posignature) {
            signature = Posignature;
        }


        if (file2) {
            templateLogo = $("#fl_img2view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        } else if (PotemplateLogo) {
            templateLogo = PotemplateLogo;
        }

        var file4 = $("#invoicepdf").get(0).files;
        const PONumber = $("#quoteNumber").val();
        var fileData = new FormData();
        fileData.append('ID', TemplateId);
        fileData.append('AdminID', ADMIN_AUTH);
        fileData.append('POOn', PONumber)
        fileData.append('poraisedby', typeOfInvoice);
        fileData.append('vendorname', vendorName);
        fileData.append('companyname', companyName);
        fileData.append('address', companyAddress);
        fileData.append('emailid', companyEmail);
        fileData.append('phone', companyPhone);
        fileData.append('GSTNumber', companyGstNumber);
        fileData.append('ToBank_Account', companyBankAcNo);
        fileData.append('ToBankName', companyBankName);
        fileData.append('ToBank_IFSC_Code', companyIfscCode);
        fileData.append('Materialreceivedon', Materialreceivedon);
        fileData.append('Invoiceno', CorrespondingInvoice);
        fileData.append("file", file4[0]);
        fileData.append('InvoiceCode', typeOfInvoice);
        fileData.append('team_membername', teamMemberName);
        fileData.append('Team_emailid', teamEmail);
        fileData.append('Team_phone', teamPhone);
        fileData.append('Teamcompany', teamCompanyName);
        fileData.append('Team_Address', teamAddress);
        fileData.append('Team_GSTNo', teamGstNumber);
        fileData.append('fromBank_Account', teamBankAcNo);
        fileData.append('fromBankName', teamBankName);
        fileData.append('fromBank_IFSC_Code', teamIfscCode);
        fileData.append('tandc', termsAndConditions);
        fileData.append('isscopeofwork', isScopeOfWork);
        fileData.append('scopeofwork', scopeOfWorkDescription);
        fileData.append('poweredbylogo', poweredbylogo);
        fileData.append('signature', signature);
        fileData.append('logo', templateLogo);




        $.ajax({
            url: UPDATE_PO_URL,
            type: "POST",
            async: false,
            data: fileData,
            dataType: "json",
            processData: false,
            crossDomain: true,
            cache: false,
            contentType: false,
            beforeSend: function () {
                // Show the spinner before the AJAX call starts
                $("#spinner").show();
            },
            complete: function () {
                // Hide the spinner after the AJAX call completes (regardless of success or failure)
                $("#spinner").hide();
            },
            success: (data) => {
                if (data.responsecode === 1) {
                    localStorage.setItem("templateID", data.responseObject);
                    priceAndBillUpdation(data.responseObject);

                } else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            }
        });

    });
    // ----------------------------------- UPDATE SERVICE OFFER END ---------------------------------------//


    // ----------------------------------- DELETE PRICING TABLE DATA START ---------------------------------------//

    $("#pricingTable tbody").on('click', '.deleteRow', function () {
        debugger;
        let Id = $(this).attr("ID");
        let result = confirm("Are you Sure? You Want to Delete this Row");
        if (result) {
            $.ajax({
                url: `${DELETE_PRICING_DATA_URL}?AdminId=${ADMIN_AUTH}&ID=${Id}`,
                type: "GET",
                async: false,
                dataType: "JSON",
                crossDomain: true,
                success: (data) => {
                    if (data.responsecode == 1) {

                        $("#" + Id).closest("tr").css("background", "tomato");
                        $("#" + Id).closest("tr").css("color", "#fff");
                        $("#" + Id).closest("tr").fadeOut(1000, function () {
                            $(this).remove();
                            updateTotals()
                        });
                        SUCCESS_MESSAGE("Row Deleted Successfully");
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


});