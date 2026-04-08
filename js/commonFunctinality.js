"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';

import reUsableFunctions from './reUsableFunctions.js';
import { getDataFromForm } from './getFormData.js';
// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//

// ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
const PAGE_RELOAD = reUsableFunctions.pageReload;
const CALCULATE_AMOUNT = reUsableFunctions.calAmount;
const CALCULATE_GST = reUsableFunctions.calGST;
const CALCULATE_DISCOUNT = reUsableFunctions.calDiscount;
const CALCULATE_GRAND_TOTAL = reUsableFunctions.calGrandAmount;
const VALIDATE_EMAIL = reUsableFunctions.validateEmail;
const VALIDATE_PHONE = reUsableFunctions.validatePhone;
const VALIDATE_IMAGE_FORMATE = reUsableFunctions.validateImageFormate;
const GET_DATA_FROM_FORM = getDataFromForm;



const ADMIN_AUTH = localStorage.getItem("Admin_auth");

// ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//


// ----------------------------------- CANCEL TEMPLATE UPDATION START ---------------------------------------//

$("#cancelTamplate").click((e) => {
    e.preventDefault();
    PAGE_RELOAD();
})

// ----------------------------------- CANCEL TEMPLATE UPDATION END ---------------------------------------//



// ----------------------------------- ADD TABLE ROW DYNAMICALLY AND CALCULATE AMOUNT START ---------------------------------------//


$(".addRowBtn").click((e) => {
    e.preventDefault();
    // Table Row Count
    let rowCount = $("#pricingTable tbody tr").length;
    rowCount = rowCount + 1;

    // New Table Row
    let currentRow = `
        <tr>
            <td class="text-center"><input type="number"  class="form-control" value=${rowCount} id="s_no"></td>
            <td class="d-none d-print-none"><input type="hidden" id="product_id" name="product_id" value=${rowCount}></td>
            <td><input type="text" id="product_service" class="form-control">
            </td>
            <td><input type="text" id="product_Hscode" class="form-control">
            </td>
            <td ><input type="text" id="product_qnty" class="form-control pro_qnty${rowCount}">
            </td>
            <td><input type="text" id="product_price" class="form-control pron_price${rowCount}">
            </td>
            <td id="product_amt" class="pro_amt${rowCount}"></td>
            <td class="removeRow" rowCount =${rowCount}><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></td>
        </tr>
        `;
    $("#pricingTable tbody").append(currentRow);

    $(`.pron_price${rowCount}`).keyup(() => {
        let qnt = $(`.pro_qnty${rowCount}`).val();
        let price = $(`.pron_price${rowCount}`).val();
        if (qnt != "" && price != "") {
            const amt = CALCULATE_AMOUNT(parseInt(qnt), parseInt(price));
            $(`.pro_amt${rowCount}`).html(amt);
        }
        $("#gstType").prop("disabled", true);
        $("#sgstVal").val('');
        $("#cgstVal").val('');
        $("#isgtval").val('');
        $("#discountAmt").val('');
        $("#toatlgstAmt").html('');
        $("#totalAmt").html('');
        $("#toatlDiscountAmt").html('');
    });


    $(`.pro_qnty${rowCount}`).keyup(() => {
        let qnt = $(`.pro_qnty${rowCount}`).val();
        let price = $(`.pron_price${rowCount}`).val();
        if (qnt != "" && price != "") {
            const amt = CALCULATE_AMOUNT(parseInt(qnt), parseInt(price));
            $(`.pro_amt${rowCount}`).html(amt);
        }
        $("#gstType").prop("disabled", true);
        $("#sgstVal").val('');
        $("#cgstVal").val('');
        $("#isgtval").val('');
        $("#discountAmt").val('');
        $("#toatlgstAmt").html('');
        $("#totalAmt").html('');
        $("#toatlDiscountAmt").html('');
    });
});


$("#product_price").keyup(() => {
    let qnt = $("#product_qnty").val();
    let price = $("#product_price").val();

    if (qnt != "" && price != "") {
        const amt = CALCULATE_AMOUNT(parseInt(qnt), parseInt(price));
        $("#product_amt").html(amt);
    }
});


$("#product_qnty").keyup(() => {
    let qnt = $("#product_qnty").val();
    let price = $("#product_price").val();

    if (qnt != "" && price != "") {
        const amt = CALCULATE_AMOUNT(parseInt(qnt), parseInt(price));
        $("#product_amt").html(amt);
    }
});

$("#discountAmt").keyup(() => {
    $("#sgstVal").val('');
    $("#cgstVal").val('');
    $("#isgtval").val('');
    $("#toatlgstAmt").html('');
});
$("#CalculateSum").click((e) => {

    e.preventDefault();

    let rowCount = $("#pricingTable tbody tr").length; // Count table rows

    if (rowCount === 0) {
        ERROR_MESSAGE("Please add at least one pricing detail before calculating.");
        return;
    }

    let totalAmt = [];

    // Select all elements whose class starts with 'pro_amt' dynamically
    $("#pricingTable tbody").find("[class^='pro_amt']").each(function () {
        let em = $(this).text().trim();
        if ($.isNumeric(em)) {
            totalAmt.push(parseFloat(em));  // Convert to number and add to array
        }
    });

    let finalAmt = totalAmt.reduce((a, b) => +a + +b);
    $("#totalAmt").html(`${finalAmt}`);
    var toatlDiscountAmt = $("#toatlDiscountAmt").html();
    if (toatlDiscountAmt != null && toatlDiscountAmt != "") {
        var total = $("#toatlDiscountAmt").html();
        //localStorage.setItem('total', total);
    } else {
        var total = $("#totalAmt").html();
        //localStorage.setItem('total', total);
    }
    $("#gstType").prop("disabled", false);
    let gstType = $("#gstType option:selected").val();
    let amount = localStorage.getItem('total');

    if (amount == " " || amount == NaN) {
        ERROR_MESSAGE("Please Create atleast one Pricing details");
    } else {
        if (gstType == "inState") {


            let SGST = $("#sgstVal").val();
            let CGST = $("#cgstVal").val();
            if (SGST != "" && CGST != "") {
                let gst = parseInt(SGST) + parseInt(CGST);
                let gst_amt = CALCULATE_GST(parseInt(amount), parseInt(gst));
                $("#toatlgstAmt").html(gst_amt.toFixed(2));
                CALCULATE_GRAND_TOTAL();
            } else {
                ERROR_MESSAGE("Please Enter SGST & CGST values");
            }

        } else if (gstType == "otherState") {

            let ISGT = $("#isgtval").val();
            let gst_amt = CALCULATE_GST(parseInt(amount), parseInt(ISGT));
            $("#toatlgstAmt").html(gst_amt.toFixed(2));
            CALCULATE_GRAND_TOTAL();

        }
    }
    CALCULATE_GRAND_TOTAL();
});



// Delete table row and calculate total amount
$("#pricingTable").on("click", ".removeRow", function () {
    let rowCount = $(this).attr("rowCount");
    let amt = $(`.pro_amt${rowCount}`).html();
    let totalAmt = $("#totalAmt").text();
    let finalAmt = parseInt(totalAmt) - parseInt(amt);
    $("#totalAmt").html(`${finalAmt}`);
    $(this).closest("tr").remove();
});
// ----------------------------------- ADD TABLE ROW DYNAMICALLY AND CALCULATE AMOUNT END ---------------------------------------//


// --------------------------------------- TABLE SEARCH FUNCTIONALITY START --------------------------------------- //

$("#searchData").on("keyup", function () {
    let value = $(this).val().toLowerCase();

    $("#table-id tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});

// --------------------------------------- TABLE SEARCH FUNCTIONALITY END --------------------------------------- //

// --------------------------------------- SUMMERNOTE START --------------------------------------- //

$('.summernote').summernote({
    height: 150
});

// --------------------------------------- SUMMERNOTE END --------------------------------------- //

// ----------------------------------- DISABLE AND ENABLE SCOPE OF WORK  START ---------------------------------------//

$('#scopeOfWorkDescription').summernote('disable');
$("#scopeWorkCheckBox").click(() => {

    if ($("#scopeWorkCheckBox").is(':checked')) {
        $('#scopeOfWorkDescription').summernote('enable');
    }
    else {
        $('#scopeOfWorkDescription').summernote('disable');
        $('#scopeOfWorkDescription').summernote('empty');
    }
})
// ----------------------------------- DISABLE AND ENABLE SCOPE OF WORK  END ---------------------------------------//

// -----------------------------------VALIDATIONS  START ---------------------------------------//
$("#companyEmail").change(() => {
    let email = $("#companyEmail").val();
    if (VALIDATE_EMAIL(email)) {
        $("#companyEmailError").hide();
    } else {
        $("#companyEmailError").show();
    }
});

$("#teamEmail").change(() => {
    let email = $("#teamEmail").val();
    if (VALIDATE_EMAIL(email)) {
        $("#teamEmailError").hide();
    } else {
        $("#teamEmailError").show();

    }
});


$("#companyPhone").change(() => {
    let phone = $("#companyPhone").val();

    if (phone.length != 10) {
        $("#phoneNumberError").show();

    } else if (VALIDATE_PHONE(phone)) {
        $("#phoneNumberError").hide();
    } else {
        $("#phoneNumberError").show();
    }

})

$("#teamPhone").change(() => {
    let phone = $("#teamPhone").val();

    if (phone.length != 10) {
        $("#teamphoneNumberError").show();

    } else if (VALIDATE_PHONE(phone)) {
        $("#teamphoneNumberError").hide();

    } else {
        $("#teamphoneNumberError").show();

    }
})

$("#imgfile2").change(() => {
    let result = VALIDATE_IMAGE_FORMATE('imgfile2');
    setTimeout(() => {
        if (result == false) {
            $("#fl_img2view").css("background-image", "");
        }
    }, 300);
});

$("#imgfile").change(() => {
    let result = VALIDATE_IMAGE_FORMATE('imgfile');
    setTimeout(() => {
        if (result == false) {
            $("#fl_mainimgview").css("background-image", "");
        }
    }, 300);
});

$("#imgfile1").change(() => {
    let result = VALIDATE_IMAGE_FORMATE('imgfile1');
    setTimeout(() => {
        if (result == false) {
            $("#fl_img1view").css("background-image", "");
        }
    }, 300);
});

// -----------------------------------VALIDATIONS  END ---------------------------------------//


// -----------------------------------  TEMPLATE PREVIEW START ---------------------------------------//

$("#templatePreview").click((e) => {
    e.preventDefault();

    const returnData = GET_DATA_FROM_FORM();
    const templateData = returnData.templateData;
    const pricingData = returnData.pricingData;
    const totalAmount = returnData.totalAmount;

    var Name = localStorage.getItem("Admin_Name");
    var Admin_auth = localStorage.getItem("Admin_auth");
    var Admin_UserName = localStorage.getItem("Admin_UserName");
    var Admin_Phone = localStorage.getItem("Admin_Phone");
    localStorage.clear();
    localStorage.setItem('Admin_Name', Name);
    localStorage.setItem('Admin_auth', Admin_auth);
    localStorage.setItem('Admin_UserName', Admin_UserName);
    localStorage.setItem("Admin_Phone", Admin_Phone);
    localStorage.setItem("templateData", JSON.stringify(templateData));
    localStorage.setItem("pricingData", JSON.stringify(pricingData));
    localStorage.setItem("totalAmount", totalAmount);

    window.open('./invoice.html');
});

// -----------------------------------  TEMPLATE PREVIEW END ---------------------------------------//

// ----------------------------------- DISABLE AND ENABLE DISCOUNT  START ---------------------------------------//

$("#discountCheckBox").click(() => {
    if ($("#discountCheckBox").is(':checked')) {
        $('#discountAmt').removeAttr('disabled');
    }
    else {
        $('#discountAmt').attr('disabled', true);
        $('#discountAmt').val("0");
        $("#toatlDiscountAmt").text("0");
        CALCULATE_GRAND_TOTAL();
    }
})

// ----------------------------------- DISABLE AND ENABLE DISCOUNT  END ---------------------------------------//

// ----------------------------------- SHOW AND HIDE GST TABLE ROWS BASED ON GST TYPE  START ---------------------------------------//
$("#gstWithInState").hide();
$("#gstOutsideState").hide();
$("#gstType").change(() => {
    let gstType = $("#gstType option:selected").val();

    if (gstType == "inState") {
        $("#gstWithInState").show();
        $("#gstOutsideState").hide();
        $("#toatlgstAmt").text("");
        $("#isgtval").val("");
        CALCULATE_GRAND_TOTAL();
    } else if (gstType == "otherState") {
        $("#gstWithInState").hide();
        $("#gstOutsideState").show();
        $("#toatlgstAmt").text("");
        $("#sgstVal").val("");
        $("#cgstVal").val("");
        CALCULATE_GRAND_TOTAL();
    } else {
        $("#gstWithInState").hide();
        $("#gstOutsideState").hide();
        $("#toatlgstAmt").text("");
        $("#sgstVal").val("");
        $("#cgstVal").val("");
        $("#isgtval").val("");
        CALCULATE_GRAND_TOTAL();
    }

})
// ----------------------------------- SHOW AND HIDE GST TABLE ROWS BASED ON GST TYPE  END ---------------------------------------//

// ----------------------------------- CALCULATE DISCOUNT APPEND DATA START ---------------------------------------//

$("#discountAmt").change(() => {
    let amount = $("#totalAmt").text();
    let discount = $("#discountAmt").val();

    if (amount == " " || amount == NaN) {
        ERROR_MESSAGE("Please Create atleast one Pricing details");
    } else {
        let discount_amt = CALCULATE_DISCOUNT(parseInt(amount), parseInt(discount));
        $("#toatlDiscountAmt").html(discount_amt.toFixed(2));
        CALCULATE_GRAND_TOTAL();
    }

})

// ----------------------------------- CALCULATE DISCOUNT APPEND DATA END ---------------------------------------//

// ----------------------------------- CALCULATE GST APPEND DATA START ---------------------------------------//

$("#gstType").change(() => {
    let gstType = $("#gstType option:selected").val();
    let amount = localStorage.getItem('total');

    if (amount == " " || amount == NaN) {
        ERROR_MESSAGE("Please Create atleast one Pricing details");
    } else {
        if (gstType == "inState") {

            $("#cgstVal").keyup(() => {
                let SGST = $("#sgstVal").val();
                let CGST = $("#cgstVal").val();
                if (SGST != "" && CGST != "") {
                    let gst = parseInt(SGST) + parseInt(CGST);
                    let gst_amt = CALCULATE_GST(parseInt(amount), parseInt(gst));
                    $("#toatlgstAmt").html(gst_amt.toFixed(2));
                    CALCULATE_GRAND_TOTAL();
                } else {
                   // ERROR_MESSAGE("Please Enter SGST & CGST values");
                }
            })
        } else if (gstType == "otherState") {
            $("#isgtval").keyup(() => {
                let ISGT = $("#isgtval").val();
                let gst_amt = CALCULATE_GST(parseInt(amount), parseInt(ISGT));
                $("#toatlgstAmt").html(gst_amt.toFixed(2));
                CALCULATE_GRAND_TOTAL();
            })
        }
    }
})

// ----------------------------------- CALCULATE GST APPEND DATA END ---------------------------------------//

// ----------------------------------- CALCULATE TOTAL AMOUNT, DSICOUNT, GRAND TOTAL END ---------------------------------------//

export const calculateTotalAndGrandTotal = () => {
    let rowCount = $("#pricingTable tbody tr").length;
    if (rowCount === 0) {
        ERROR_MESSAGE("Please add at least one pricing detail before calculating.");
        return;
    }

    let discount = $("#discountAmt").val();
    let gstType = $("#gstType option:selected").val();
    let paid = $("#invoicePaidAmt").val();
    let totalAmt = [];

    // Dynamically select all elements with class starting with 'pro_amt' inside the table
    $("#pricingTable tbody").find("[class^='pro_amt']").each(function () {
        let em = $(this).text().trim();
        if ($.isNumeric(em)) {
            totalAmt.push(parseFloat(em));
        }
    });

    let finalAmt = totalAmt.reduce((a, b) => +a + +b);
    $("#totalAmt").html(`${finalAmt}`);

    if (discount.trim() !== "") { 
        let discount_amt = CALCULATE_DISCOUNT(parseInt(finalAmt), parseInt(discount));
        $("#toatlDiscountAmt").html(discount_amt.toFixed(2));
        CALCULATE_GRAND_TOTAL();
    }

    if (gstType == "inState") {

        let SGST = $("#sgstVal").val();
        let CGST = $("#cgstVal").val();
        if (SGST != "" && CGST != "") {
            let gst = parseInt(SGST) + parseInt(CGST);
            let gst_amt = CALCULATE_GST(parseInt(finalAmt), parseInt(gst));
            $("#toatlgstAmt").html(gst_amt.toFixed(2));
            CALCULATE_GRAND_TOTAL();
        } else {
            ERROR_MESSAGE("Please Enter SGST & CGST values");
        }
    } else if (gstType == "otherState") {
        let ISGT = $("#isgtval").val();
        let gst_amt = CALCULATE_GST(parseInt(finalAmt), parseInt(ISGT));
        $("#toatlgstAmt").html(gst_amt.toFixed(2));
        CALCULATE_GRAND_TOTAL();
    }

    if (paid) {
        let total = $("#totalAmt").text();
        let balance = parseInt(total) - parseInt(paid);
        $("#invoiceDueAmt").val(balance);
    }

}

// ----------------------------------- CALCULATE TOTAL AMOUNT, DISCOUNT, GRAND TOTAL END ---------------------------------------//




// ----------------------------------- DISABLE AND ENABLE PAID AND DUE AMOUNT  START ---------------------------------------//

$("#invoicePaidAmtcheckbox").click(() => {
    if ($("#invoicePaidAmtcheckbox").is(':checked')) {
        $('#invoicePaidAmt').removeAttr('disabled');
    }
    else {
        $('#invoicePaidAmt').attr('disabled', true);
        $('#invoicePaidAmt').val("");
    }
})

$("#invoiceDueAmtcheckbox").click(() => {
    if ($("#invoiceDueAmtcheckbox").is(':checked')) {
        $('#invoiceDueAmt').removeAttr('disabled');
    }
    else {
        $('#invoiceDueAmt').attr('disabled', true);
        $('#invoiceDueAmt').val("");
    }
})

// ----------------------------------- DISABLE AND ENABLE PAID AND DUE AMOUNT  END ---------------------------------------//


// ----------------------------------- CALCULATE DUE AMOUNT  START ---------------------------------------//

$("#invoicePaidAmt").keyup(() => {
    let grandTotal = $("#grandTotal").text();
    let paidAmt = $("#invoicePaidAmt").val();

    if (grandTotal != "" && paidAmt != "") {
        let dueAmt = parseInt(grandTotal) - parseInt(paidAmt);
        $('#invoiceDueAmt').removeAttr('disabled');
        $('#invoiceDueAmt').val(dueAmt);
    }
})
$(document).on("input", "#product_qnty, #product_price", function () {
    this.value = this.value.replace(/[^0-9]/g, ''); // Allow only numbers
});

// ----------------------------------- CALCULATE DUE AMOUNT  END ---------------------------------------//