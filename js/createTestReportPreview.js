"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//

import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//

$(() => {
    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;

    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//


    // ----------------------------------- DATA FROM PARAMETERS START ---------------------------------------//

    const url = window.location.search;
    const params = new URLSearchParams(url);

    const TemplateId = params.get("ID");
    // ----------------------------------- DATA FROM PARAMETERS END ---------------------------------------//


    // ----------------------------------- APIs START ---------------------------------------//

    const UPDATE_TEMPLATE_VIEW_URL = APIS.testReportPreview;
    const SAVE_TR_PDF = APIS.saveTRPdf;

    // ----------------------------------- APIs END ---------------------------------------//
    function showLoader() {
        $("#pdfLoader").css("display", "flex");
    }

    function hideLoader() {
        $("#pdfLoader").hide();
    }
    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  START ---------------------------------------//
    $.ajax({
        url: `${UPDATE_TEMPLATE_VIEW_URL}?AdminID=${ADMIN_AUTH}&Service_ID=${TemplateId}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {

            document.title = `PDCA4M | ${data.RegistrationNo}`


           
            CONVERT_IMAGE_TO_BASE64(data.AuthSign, "signatureLogo");


            

            if (data.AuthSign) {
                $("#signature").attr("src", `${data.AuthSign}`);
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

                let newRow = `<tr><td>${sno}</td><td>${item.TestParameter}</td><td>${item.Unit}</td><td>${item.Results}</td><td>${item.TestMethod}</td><td>${item.LOQ_LOD}</td></tr>`;

                $(".test_result tbody").append(newRow);
            })



            


            let TermsandConditions = $(data.TermsandConditions);
            $("#tandC").html(TermsandConditions);



            setTimeout(() => {


                
                let signature = localStorage.getItem("signatureLogo");


                

                if (signature) {
                    $("#signature").attr("src", `${signature}`);
                }

            }, 2500);

        }
    });
    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  END ---------------------------------------//
    $("#save_pdf_api").on("click", function () {

        showLoader(); // ⭐ SHOW LOADER

        var element = document.getElementById("download_section");

        html2canvas(element, {
            scale: 2,
            useCORS: true,
            scrollY: -window.scrollY,
            backgroundColor: "#ffffff"
        }).then(function (canvas) {

            var pdf = new jsPDF("p", "mm", "a4");

            var pageWidth = 210;
            var pageHeight = 297;
            var margin = 10;

            var imgWidth = pageWidth - margin * 2;

            var pxFullHeight = canvas.height;
            var pxPageHeight = Math.floor(canvas.width * (pageHeight / pageWidth));

            var pageCount = Math.ceil(pxFullHeight / pxPageHeight);

            for (var page = 0; page < pageCount; page++) {

                if (page > 0) pdf.addPage();

                var pageCanvas = document.createElement("canvas");
                var ctx = pageCanvas.getContext("2d");

                pageCanvas.width = canvas.width;
                pageCanvas.height = pxPageHeight;

                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

                ctx.drawImage(
                    canvas,
                    0,
                    page * pxPageHeight,
                    canvas.width,
                    pxPageHeight,
                    0,
                    0,
                    canvas.width,
                    pxPageHeight
                );

                var imgData = pageCanvas.toDataURL("image/jpeg", 0.95);

                var imgHeight = (pxPageHeight * imgWidth) / canvas.width;

                pdf.addImage(imgData, "JPEG", margin, margin, imgWidth, imgHeight);
            }

            var pdfBlob = pdf.output("blob");

            var formData = new FormData();
            formData.append("file", pdfBlob, "TestReport.pdf");
            formData.append("AdminID", ADMIN_AUTH);
            formData.append("Service_ID", TemplateId);

            $.ajax({
                url: SAVE_TR_PDF,
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,

                success: function (response) {
                    hideLoader(); // ⭐ HIDE LOADER
                    alert("PDF Sent successfully!");
                },
                error: function (xhr) {
                    hideLoader(); // ⭐ HIDE LOADER
                    console.log(xhr.responseText);
                }
            });

        }).catch(function (error) {
            hideLoader(); // ⭐ ALSO HANDLE ERROR
            console.error(error);
        });

    });

});
