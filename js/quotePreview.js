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

    const UPDATE_TEMPLATE_VIEW_URL = APIS.serviceOfferDetailsEditView;
    const SAVE_PI_PDF = APIS.savePIPdf;

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

    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  START ---------------------------------------//
    $.ajax({
        url: `${UPDATE_TEMPLATE_VIEW_URL}?AdminId=${ADMIN_AUTH}&ServiceId=${TemplateId}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            debugger;
            document.title = `PDCA4M | ${data.quotenumber}`
            //const logo = 'data:logo/png;base64,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'; // Change this to your logo URL
            //const companylogo = 'data:companyLogo/png;base64,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'; // Change this to your logo URL
            //const signature = 'data:signature/png;base64,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'; // Change this to your logo URL
            CONVERT_IMAGE_TO_BASE64(data.logo, "templateLogo");
            CONVERT_IMAGE_TO_BASE64(data.companylogo, "companyLogo");
            CONVERT_IMAGE_TO_BASE64(data.signature, "signatureLogo");

            $("#templateLogo").attr("src", data.logo);

            $("#companyLogo").attr("src", data.companylogo);

            $("#signature").attr("src", data.signature);

            $("#templateTitle").html(data.templatename);
            var dateString = data.createdon.substr(6);
            var currentTime = new Date(parseInt(dateString));
            var month = currentTime.getMonth() + 1;
            var day = currentTime.getDate();
            var year = currentTime.getFullYear();
            var date = day + "/" + month + "/" + year;
            $("#d_no").html(date);
            $("#q_no").html(data.quotenumber);
            $("#company").html(data.company);
            $("#address").html(data.address);
            $("#emailid").html(data.emailid);
            $("#phone").html(data.phone);
            $("#GSTNumber").html(data.GSTNumber);
            $("#team_membername").html(data.team_membername);
            $("#Team_emailid").html(data.Team_emailid);
            $("#Team_phone").html(data.Team_phone);
            $("#CompanyName").html(data.CompanyName);
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

                $("#total").html(item.grandTotal);
                $("#amtInwords").html(`${item.amountInWords} Rupess only/-`)
            })

            data.T_PricingList.map((item) => {
                let newRow = `<tr><td>${item.SNO}</td><td style="word-break: break-word;">${item.name}</td><td>${item.SAC_HSCode}</td><td>${item.Numberofservices}</td><td>${item.UnitPricePer}</td><td>${item.Amount}</td></tr>`;

                $(".pricing_details tbody").append(newRow);
            })


            if (data.isscopeofwork == false) {
                $("#isscopeofwork").hide();
            } else {

                $("#scopeofwork").html(data.scopeofwork);
            }


            let tandc = $(data.tandc);
            $("#tandC").html(tandc).css('word-wrap', ' break-word');


            //setTimeout(() => {

            //    let logo = localStorage.getItem("templateLogo");
            //    let companyLogo = localStorage.getItem("companyLogo");
            //    let signature = localStorage.getItem("signatureLogo");


            //    if (logo != "") {
            //        $("#templateLogo").attr("src", `${logo}`);
            //    }

            //    if (companyLogo != "") {
            //        $("#companyLogo").attr("src", `${companyLogo}`);
            //    }

            //    if (signature != "") {
            //        $("#signature").attr("src", `${signature}`);
            //    }

            //}, 2500);

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
            formData.append("file", pdfBlob, "ServiceOffer.pdf");
            formData.append("AdminId", ADMIN_AUTH);
            formData.append("id", TemplateId);

            $.ajax({
                url: SAVE_PI_PDF,
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
