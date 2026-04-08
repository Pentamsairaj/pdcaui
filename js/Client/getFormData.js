"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//

import reUsableFunctions from './reUsableFunctions.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//


// ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

const GET_DATA_FROM_TABLE = reUsableFunctions.getDataFromTable;

// ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//



const getDataFromForm = () => {
    let titleOfTemplate = $("#titleOfTemplate").val();
    let companyName = $("#companyName").val();
    let companyAddress = $("#companyAddress").val();
    let companyEmail = $("#companyEmail").val();
    let companyPhone = $("#companyPhone").val();
    let companyGstNumber = $("#companyGstNumber").val();
    let referredBy = $("#referredBy").val();
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
    let isScopeOfWork = '';
    let templateLogo = "";
    let companyLogo = "";
    let signature = "";

    let templatetemplateLogo = localStorage.getItem("templateTemplateLogo");
    let templatecompanyLogo = localStorage.getItem("templatecompanyLogo");
    let templatesignature = localStorage.getItem("templatesignatureLogo");

    let file = $("#imgfile")[0].files[0];
    let file1 = $("#imgfile1")[0].files[0];
    let file2 = $("#imgfile2")[0].files[0];

    if (file) {
        companyLogo = $("#fl_mainimgview").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    } else if (templatecompanyLogo) {
        companyLogo = templatecompanyLogo;
    }


    if (file1) {
        signature = $("#fl_img1view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    } else if (templatesignature) {
        signature = templatesignature;
    }


    if (file2) {
        templateLogo = $("#fl_img2view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    } else if (templatetemplateLogo) {
        templateLogo = templatetemplateLogo;
    }


    if ($("#scopeWorkCheckBox").is(':checked')) {
        isScopeOfWork = true;
    }
    else {
        isScopeOfWork = false;
    }

    let tableBody = $("#rowData [id^=product_id]");
    let pricingData = GET_DATA_FROM_TABLE(tableBody);

    let totalAmount = $("#totalAmt").text();



    const templateData = {
        "company": companyName,
        "address": companyAddress,
        "emailid": companyEmail,
        "phone": companyPhone,
        "GSTNumber": companyGstNumber,
        "Refferedby": referredBy,
        "templatename": titleOfTemplate,
        "team_membername": teamMemberName,
        "Team_emailid": teamEmail,
        "Team_phone": teamPhone,
        "CompanyName": teamCompanyName,
        "Team_Address": teamAddress,
        "Team_GSTNumber": teamGstNumber,
        "TeamBank_Account": teamBankAcNo,
        "TeamBank": teamBankName,
        "BankName": teamBankName,
        "Team_IFSC_Code": teamIfscCode,
        "isscopeofwork": isScopeOfWork,
        "scopeofwork": scopeOfWorkDescription,
        "tandc": termsAndConditions,
        "companylogo": companyLogo,
        "signature": signature,
        "logo": templateLogo,
    }

    return { templateData, pricingData, totalAmount }

}


const getServiceFormData = () => {
    let titleOfTemplate = $("#serviceTemplateSelect option:selected").text();
    let companyName = $("#companyName").val();
    let companyAddress = $("#companyAddress").val();
    let companyEmail = $("#companyEmail").val();
    let companyPhone = $("#companyPhone").val();
    let companyGstNumber = $("#companyGstNumber").val();
    let referredBy = $("#referredBy").val();
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


    let templateLogo = localStorage.getItem("templateLogo");
    let companyLogo = localStorage.getItem("companyLogo");;
    let signature = localStorage.getItem("signatureLogo");;

    const templateData = {
        "company": companyName,
        "address": companyAddress,
        "emailid": companyEmail,
        "phone": companyPhone,
        "GSTNumber": companyGstNumber,
        "Refferedby": referredBy,
        "templatename": titleOfTemplate,
        "team_membername": teamMemberName,
        "Team_emailid": teamEmail,
        "Team_phone": teamPhone,
        "CompanyName": teamCompanyName,
        "Team_Address": teamAddress,
        "Team_GSTNumber": teamGstNumber,
        "TeamBank_Account": teamBankAcNo,
        "TeamBank": teamBankName,
        "BankName": teamBankName,
        "Team_IFSC_Code": teamIfscCode,
        "isscopeofwork": isScopeOfWork,
        "scopeofwork": scopeOfWorkDescription,
        "tandc": termsAndConditions,
        "companylogo": companyLogo,
        "signature": signature,
        "logo": templateLogo,
    }


    return templateData;
}


const getInvoiceCommonFormData = () => {
    let typeOfInvoice = $("#invoiceOn option:selected").text();
    let quoteNumber = $("#quoteNumber").val();
    let companyName = $("#companyName").val();
    let companyAddress = $("#companyAddress").val();
    let companyEmail = $("#companyEmail").val();
    let companyPhone = $("#companyPhone").val();
    let companyGstNumber = $("#companyGstNumber").val();
    let referredBy = $("#referredBy").val();
    let teamMemberName = $("#teamMemberName").val();
    let teamEmail = $("#teamEmail").val();
    let teamPhone = $("#teamPhone").val();
    let teamAddress = $("#teamAddress").val();
    let teamCompanyName = $("#teamCompanyName").val();
    let teamGstNumber = $("#teamGstNumber").val();
    let teamBankAcNo = $("#teamBankAcNo").val();
    let teamBankName = $("#teamBankName").val();
    let teamIfscCode = $("#teamIfscCode").val();
    let termsAndConditions = $("#termsAndConditions").val();
    let templateLogo = "";
    let companyLogo = "";
    let signature = "";

    let QuotetemplateLogo = localStorage.getItem("templateLogo");
    let QuotecompanyLogo = localStorage.getItem("companyLogo");
    let Quotesignature = localStorage.getItem("signatureLogo");

    let file = $("#imgfile")[0].files[0];
    let file1 = $("#imgfile1")[0].files[0];
    let file2 = $("#imgfile2")[0].files[0];

    if (file) {
        companyLogo = $("#fl_mainimgview").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    } else if (QuotecompanyLogo) {
        companyLogo = QuotecompanyLogo;
    }


    if (file1) {
        signature = $("#fl_img1view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    } else if (Quotesignature) {
        signature = Quotesignature;
    }


    if (file2) {
        templateLogo = $("#fl_img2view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    } else if (QuotetemplateLogo) {
        templateLogo = QuotetemplateLogo;
    }

    const templateData = {
        "company": companyName,
        "address": companyAddress,
        "emailid": companyEmail,
        "phone": companyPhone,
        "GSTNumber": companyGstNumber,
        "Refferedby": referredBy,
        "InvoiceCode": typeOfInvoice,
        "quotenumber": quoteNumber,
        "team_membername": teamMemberName,
        "Team_emailid": teamEmail,
        "Team_phone": teamPhone,
        "CompanyName": teamCompanyName,
        "Team_Address": teamAddress,
        "Team_GSTNumber": teamGstNumber,
        "TeamBank_Account": teamBankAcNo,
        "TeamBank": teamBankName,
        "BankName": teamBankName,
        "Team_IFSC_Code": teamIfscCode,
        "tandc": termsAndConditions,
        "companylogo": companyLogo,
        "signature": signature,
        "logo": templateLogo,
    }


    return templateData;
}

const getPoCommonFormData = () => {
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
    let teamMemberName = $("#teamMemberName").val();
    let teamEmail = $("#teamEmail").val();
    let teamPhone = $("#teamPhone").val();
    let teamAddress = $("#teamAddress").val();
    let teamCompanyName = $("#teamCompanyName").val();
    let teamGstNumber = $("#teamGstNumber").val();
    let teamBankAcNo = $("#teamBankAcNo").val();
    let teamBankName = $("#teamBankName").val();
    let teamIfscCode = $("#teamIfscCode").val();
    let termsAndConditions = $("#termsAndConditions").val();
    let templateLogo = "";
    let companyLogo = "";
    let signature = "";

    let QuotetemplateLogo = localStorage.getItem("templateLogo");
    let QuotecompanyLogo = localStorage.getItem("companyLogo");
    let Quotesignature = localStorage.getItem("signatureLogo");

    let file = $("#imgfile")[0].files[0];
    let file1 = $("#imgfile1")[0].files[0];
    let file2 = $("#imgfile2")[0].files[0];

    if (file) {
        companyLogo = $("#fl_mainimgview").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    } else if (QuotecompanyLogo) {
        companyLogo = QuotecompanyLogo;
    }


    if (file1) {
        signature = $("#fl_img1view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    } else if (Quotesignature) {
        signature = Quotesignature;
    }


    if (file2) {
        templateLogo = $("#fl_img2view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    } else if (QuotetemplateLogo) {
        templateLogo = QuotetemplateLogo;
    }

    const templateData = {
        "poraisedby": typeOfInvoice,
        "vendorname": vendorName,
        "companyname": companyName,
        "address": companyAddress,
        "emailid": companyEmail,
        "phone": companyPhone,
        "GSTNumber": companyGstNumber,
        "ToBank_Account": companyBankAcNo,
        "ToBankName": companyBankName,
        "ToBank_IFSC_Code": companyIfscCode,
        "Materialreceivedon": Materialreceivedon,
        "Invoiceno": CorrespondingInvoice,
        "InvoiceCode": typeOfInvoice,
        //"quotenumber": quoteNumber,
        "team_membername": teamMemberName,
        "Team_emailid": teamEmail,
        "Team_phone": teamPhone,
        "CompanyName": teamCompanyName,
        "Team_Address": teamAddress,
        "Team_GSTNumber": teamGstNumber,
        "TeamBank_Account": teamBankAcNo,
        "TeamBank": teamBankName,
        "Team_IFSC_Code": teamIfscCode,
        "tandc": termsAndConditions,
        "companylogo": companyLogo,
        "signature": signature,
        "logo": templateLogo,
    }


    return templateData;
}




const getBillData = () => {

    let totalAmt = $("#totalAmt").text();
    let discount = $("#discountAmt").val();
    let discountAmount = $("#toatlDiscountAmt").text();
    let gstAmount = $("#toatlgstAmt").text();
    let sgst = $("#sgstVal").val();
    let cgst = $("#cgstVal").val();
    let igst = $("#isgtval").val();
    let grandToatl = $("#grandTotal").text();
    let amtInWords = $("#amtInString").val();

    const billData = {
        "Amount": Number(totalAmt),
        "discount": Number(discount),
        "discountAmount": Number(Math.round(discountAmount)),
        "gstAmount": Number(Math.round(gstAmount)),
        "sgst": Number(sgst),
        "cgst": Number(cgst),
        "igst": Number(igst),
        "grandTotal": Number(grandToatl),
        "amountInWords": amtInWords
    }

    return billData;
}

export { getDataFromForm, getServiceFormData, getInvoiceCommonFormData, getPoCommonFormData, getBillData }