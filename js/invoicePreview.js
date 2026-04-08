"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//

import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//

$(() => {
    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;


    const ADMIN_AUTH = localStorage.getItem("Admin_auth");

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//


    // ----------------------------------- DATA FROM PARAMETERS START ---------------------------------------//

    const url = window.location.search;
    const params = new URLSearchParams(url);

    const TemplateId = params.get("TemplateId");
    // ----------------------------------- DATA FROM PARAMETERS END ---------------------------------------//


    // ----------------------------------- APIs START ---------------------------------------//

    const UPDATE_TEMPLATE_VIEW_URL = APIS.invoiceDetailsEditView;
    const SAVE_INVOICE_PDF = APIS.saveInvoicePdf;

    // ----------------------------------- APIs END ---------------------------------------//

    // ----------------------------------- WHATS APP ACCESS END ---------------------------------------//
    if (
        ADMIN_AUTH === "2d4ac65e-ff99-407a-a729-ccde60c7d5f1" ||
        ADMIN_AUTH === "8d12f95b-e288-40f0-862d-035ba875162b"
    ) {
        $("#save_pdf_api").show();
    } else {
        $("#save_pdf_api").hide();
    }


    // ----------------------------------- WHATS APP ACCESS END ---------------------------------------//

    // -----------

    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  START ---------------------------------------//
    $.ajax({
        url: `${UPDATE_TEMPLATE_VIEW_URL}?AdminId=${ADMIN_AUTH}&InvoiceId=${TemplateId}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {

            document.title = `PDCA4M | ${data.InvoiceNumber}`


            CONVERT_IMAGE_TO_BASE64(data.logo, "templateLogo");
            CONVERT_IMAGE_TO_BASE64(data.companylogo, "companyLogo");
            CONVERT_IMAGE_TO_BASE64(data.signature, "signatureLogo");


            if (data.logo != "") {
                $("#templateLogo").attr("src", `${data.logo}`);
            }

            if (data.companyLogo != "") {
                $("#companyLogo").attr("src", `${data.companylogo}`);
            }

            if (data.signature) {
                $("#signature").attr("src", `${data.signature}`);
            }

            var dateString = data.createdon.substr(6);
            var currentTime = new Date(parseInt(dateString));
            var month = currentTime.getMonth() + 1;
            var day = currentTime.getDate();
            var year = currentTime.getFullYear();
            var date = day + "/" + month + "/" + year;
            $("#d_no").html(date);
            $("#templateTitle").html(data.templatename);
            $("#q_no").html(data.InvoiceNumber);
            $("#company").html(data.company);
            $("#address").html(data.address);
            $("#emailid").html(data.emailid);
            $("#phone").html(data.phone);
            $("#GSTNumber").html(data.GSTNumber);
            $("#team_membername").html(data.team_membername);
            $("#Team_emailid").html(data.Team_emailid);
            $("#Team_phone").html(data.Team_phone);
            $("#CompanyName").html(data.Companyname);
            $("#Team_Address").html(data.Team_Address);
            $("#Team_GSTNumber").html(data.Team_GSTNumber);
            $("#TeamBank").html(data.TeamBank);
            $("#TeamBank_Account").html(data.TeamBank_Account);
            $("#Team_IFSC_Code").html(data.Team_IFSC_Code);

            data.LCBList.map((item) => {
                $("#totalAmt").html(item.Amount);

                if (item.discount == 0) {
                    $("#discountRow").hide();
                } else {
                    $("#discountPercent").html(`(${item.discount}%)`);
                    $("#discountAmount").html(item.discountAmount);
                }

                if (item.igst != 0) {
                    $("#inState").hide();
                    $("#isgtPercent").html(`(${item.igst}%)`);
                    $("#igstAmount").html(item.gstAmount);
                } else if (item.sgst != 0 || item.cgst != 0) {
                    $("#outState").hide();
                    $("#gstPercent").html(`(SGST: ${item.sgst}% &nbsp; CSGT: ${item.cgst}%)`);
                    $("#gstAmount").html(item.gstAmount);
                }

                $("#Total").html(item.grandTotal);
                if (item.paid) {
                    $("#spamount").text("Paid Amount: " + item.paid);
                }
                else {
                    $("#spamount").hide();
                }
                if (item.balance) {
                    $("#spdue").text("Due:" + item.balance);
                }
                else {
                    $("#spdue").hide();
                }

                $("#amtInwords").html(`${item.amountInWords} Rupess only/-`)
            })

            data.T_PricingList.map((item) => {
                let newRow = `<tr><td>${item.SNO}</td><td style="word-break: break-word;">${item.name}</td><td>${item.SAC_HSCode}</td><td>${item.Numberofservices}</td><td>${item.UnitPricePer}</td><td>${item.Amount}</td></tr>`;

                $(".pricing_details tbody").append(newRow);
            })


            if (data.isscopeofwork == false) {
                $("#isscopeofwork").hide();
            } else {
                let scopeOfWork = $(data.scopeofwork);
                $("#scopeofwork").html(scopeOfWork);
            }


            let tandc = $(data.tandc);
            $("#tandC").html(tandc);



            setTimeout(() => {


                let logo = localStorage.getItem("templateLogo");
                let companyLogo = localStorage.getItem("companyLogo");
                let signature = localStorage.getItem("signatureLogo");


                if (logo != "") {
                    $("#templateLogo").attr("src", `${logo}`);
                }

                if (companyLogo != "") {
                    $("#companyLogo").attr("src", `${companyLogo}`);
                }

                if (signature) {
                    $("#signature").attr("src", `${signature}`);
                }

            }, 2500);

        }
    });


    function showLoader() {
        $("#pdfLoader").css("display", "flex");
    }

    function hideLoader() {
        $("#pdfLoader").hide();
    }
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
            formData.append("file", pdfBlob, "TaxInvoice.pdf");
            formData.append("AdminId", ADMIN_AUTH);
            formData.append("id", TemplateId);

            $.ajax({
                url: SAVE_INVOICE_PDF,
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
