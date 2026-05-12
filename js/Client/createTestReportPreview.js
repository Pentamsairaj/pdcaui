"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//

import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//

$(() => {
    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;

    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
    const CLIENT_AUTH = localStorage.getItem("Client_auth");

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//


    // ----------------------------------- DATA FROM PARAMETERS START ---------------------------------------//

    const url = window.location.search;
    const params = new URLSearchParams(url);

    const TemplateId = params.get("ID");
    // ----------------------------------- DATA FROM PARAMETERS END ---------------------------------------//


    // ----------------------------------- APIs START ---------------------------------------//

    const UPDATE_TEMPLATE_VIEW_URL = APIS.testReportPreview;

    // ----------------------------------- APIs END ---------------------------------------//

    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  START ---------------------------------------//
    $.ajax({
        url: `${UPDATE_TEMPLATE_VIEW_URL}?ClientID=${CLIENT_AUTH}&Service_ID=${TemplateId}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {

            document.title = `PDCA4M | ${data.RegistrationNo}`


           
            CONVERT_IMAGE_TO_BASE64(data.AuthSign, "signatureLogo");
            CONVERT_IMAGE_TO_BASE64(data.logo, "templateLogo");



            

            if (data.AuthSign) {
                $("#signature").attr("src", `${data.AuthSign}`);
            }
            if (data.Logo) {
                $("#logo").attr("src", `${data.Logo}`);
            }
            
            $("#templateTitle").html(data.templatename);

            $("#r_no").html(data.RegistrationNo);
            $("#t_no").html(data.ReportNo);
            $("#ulr_no").html(data.ULRNo);
            if (data.ReportIssuedDate != null) {
                var completedDate = new Date(parseInt(data.ReportIssuedDate.replace("/Date(", "").replace(")/")));
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0! 
                var yyyy = completedDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }

                var ReportIssuedDate = dd + '/' + mm + '/' + yyyy;

            }
            else {
                ReportIssuedDate = "";
            }
            $("#IssuedDate").val(ReportIssuedDate);
            $("#i_no").html(ReportIssuedDate);
            $("#Name").html(data.Name);
            $("#Address").html(data.Address);
            $("#Email").html(data.Email);
            $("#Contact").html(data.ContactNumber);
            $("#Discipline").html(data.Discipline);
            if (data.SampleReceiptDate != null) {
                var completedDate = new Date(parseInt(data.SampleReceiptDate.replace("/Date(", "").replace(")/")));
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0! 
                var yyyy = completedDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }

                var SampleReceiptDate = dd + '/' + mm + '/' + yyyy;

            }
            else {
                SampleReceiptDate = "";
            }
            $("#Sample_Receipt_Date").html(SampleReceiptDate);
            $("#Sample_ID").html(data.SampleID);
            $("#Customer_Reference").html(data.CustomerReference);
            $("#Sample_Quantity_Received").html(data.SampleQuantityReceived);
            if (data.DateofMfg != null) {
                var completedDate = new Date(parseInt(data.DateofMfg.replace("/Date(", "").replace(")/")));
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0! 
                var yyyy = completedDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }

                var DateofMfg = dd + '/' + mm + '/' + yyyy;

            }
            else {
                DateofMfg = "";
            }
            $("#Date_of_Mfg").html(DateofMfg);
            if (data.AnalysisStartingDate != null) {
                var completedDate = new Date(parseInt(data.AnalysisStartingDate.replace("/Date(", "").replace(")/")));
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0! 
                var yyyy = completedDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }

                var AnalysisStartingDate = dd + '/' + mm + '/' + yyyy;

            }
            else {
                AnalysisStartingDate = "";
            }
            $("#Analysis_Starting_Date").html(AnalysisStartingDate);
            $("#Product_Group").html(data.ProductGroup);
            if (data.SampleRegistrationDate != null) {
                var completedDate = new Date(parseInt(data.SampleRegistrationDate.replace("/Date(", "").replace(")/")));
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0! 
                var yyyy = completedDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }

                var SampleRegistrationDate = dd + '/' + mm + '/' + yyyy;

            }
            else {
                SampleRegistrationDate = "";
            }
            $("#Sample_Registration_Date").html(SampleRegistrationDate);
            $("#Sample_Name").html(data.SampleName);
            $("#Sample_Packing_Type").html(data.SamplePackingType);
            $("#Lot_No").html(data.Batch_Lotno);
            if (data.DateofExpiry != null) {
                var completedDate = new Date(parseInt(data.DateofExpiry.replace("/Date(", "").replace(")/")));
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0! 
                var yyyy = completedDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }

                var DateofExpiry = dd + '/' + mm + '/' + yyyy;

            }
            else {
                DateofExpiry = "";
            }
            $("#Date_of_expiry").html(DateofExpiry);
            if (data.AnalysisCompletionDate != null) {
                var completedDate = new Date(parseInt(data.AnalysisCompletionDate.replace("/Date(", "").replace(")/")));
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0! 
                var yyyy = completedDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }

                var AnalysisCompletionDate = dd + '/' + mm + '/' + yyyy;

            }
            else {
                AnalysisCompletionDate = "";
            }
            $("#Analysis_completion_date").html(AnalysisCompletionDate);

            

            data.TestResult.map((item, index) => {
                let sno = index + 1; // Calculate the serial number

                let newRow = `<tr><td>${sno}</td><td>${item.TestParameter}</td><td>${item.Unit}</td><td>${item.Results}</td><td>${item.TestMethod}</td></tr>`;

                $(".test_result tbody").append(newRow);
            })


            


            let TermsandConditions = $(data.TermsandConditions);
            $("#tandC").html(data.TermsandConditions);



            setTimeout(() => {


                
                let signature = localStorage.getItem("signatureLogo");

                let logo = localStorage.getItem("Logo");
                

                if (signature) {
                    $("#signature").attr("src", `${signature}`);
                }
                if (logo) {
                    $("#logo").attr("src", `${logo}`);
                }
            }, 2500);

        }
    });
    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  END ---------------------------------------//


});
