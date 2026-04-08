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

    const TemplateId = params.get("ID");
    // ----------------------------------- DATA FROM PARAMETERS END ---------------------------------------//


    // ----------------------------------- APIs START ---------------------------------------//

    const UPDATE_TEMPLATE_VIEW_URL = APIS.poDetailsEditView;
    const SAVE_PO_PDF = APIS.savePoPDF;

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
    debugger;
    // -----------------------------------  TEMPLATE FOR SERVICE OFFER VIEW  START ---------------------------------------//
    $.ajax({
        url: `${UPDATE_TEMPLATE_VIEW_URL}?AdminID=${ADMIN_AUTH}&ID=${TemplateId}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {
            debugger;

            document.title = `PDCA4M | ${data.POOn}`


            CONVERT_IMAGE_TO_BASE64(data.logo, "templateLogo");
            CONVERT_IMAGE_TO_BASE64(data.poweredbylogo, "poweredbylogo");
            CONVERT_IMAGE_TO_BASE64(data.signature, "signatureLogo");


            if (data.logo != "") {
                $("#templateLogo").attr("src", `${data.logo}`);
            }

            if (data.poweredbylogo != "") {
                $("#companyLogo").attr("src", `${data.poweredbylogo}`);
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
            $("#q_no").html(data.POOn);
            $("#vendor").html(data.vendorname);
            $("#company").html(data.companyname);
            $("#address").html(data.address);
            $("#emailid").html(data.emailid);
            $("#phone").html(data.phone);
            $("#GSTNumber").html(data.GSTNumber);
            $("#team_membername").html(data.team_membername);
            $("#Team_emailid").html(data.Team_emailid);
            $("#Team_phone").html(data.Team_phone);
            $("#CompanyName").html(data.Teamcompany);
            $("#Team_Address").html(data.Team_Address);
            $("#Team_GSTNumber").html(data.ToBank_IFSC_Code);
            $("#ToBank_Account").html(data.ToBank_Account);
            $("#TeamBank").html(data.fromBankName);
            $("#TeamBank_Account").html(data.fromBank_Account);
            $("#Team_IFSC_Code").html(data.fromBank_IFSC_Code);

            if (data.ListPrice.length > 0) {
                $("#totalAmt").html(data.Amount);

                if (data.discount == 0) {
                    $("#discountRow").hide();
                } else {
                    $("#discountPercent").html(`(${data.discount}%)`);
                    $("#discountAmount").html(data.discountamount);
                }

                if (data.igst != 0) {
                    $("#inState").hide();
                    $("#isgtPercent").html(`(${data.igst}%)`);
                    $("#igstAmount").html(data.gstAmount);
                } else if (data.sgst != 0 || data.cgst != 0) {
                    $("#outState").hide();
                    $("#gstPercent").html(`(SGST: ${data.sgst}% &nbsp; CSGT: ${data.cgst}%)`);
                    $("#gstAmount").html(data.gstAmount);
                }

                if (data.paid) {
                    $("#spamount").text("Paid Amount: " + data.paid);
                }
                else {
                    $("#spamount").hide();
                }
                if (data.balance) {
                    $("#spdue").text("Due:" + data.balance);
                }
                else {
                    $("#spdue").hide();
                }
                $("#total").html(data.grandTotal);
                $("#amtInwords").html(`${data.amountInWords} Rupess only/-`)
            }

            data.ListPrice.map((item) => {
                let newRow = `<tr><td>${item.sno}</td><td style="word-break:break-word">${item.Servicename}</td><td>${item.SAC_HSCode}</td><td>${item.Numberofservices}</td><td>${item.Unitprice}</td><td>${item.Amount}</td></tr>`;

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



        //    setTimeout(() => {

        //        debugger;
        //        let logo = localStorage.getItem("templateLogo");
        //        let poweredbylogo = localStorage.getItem("poweredbylogo");
        //        let signature = localStorage.getItem("signatureLogo");


        //        if (logo != "") {
        //            $("#templateLogo").attr("src", `${logo}`);
        //        }

        //        if (companyLogo != "") {
        //            $("#companyLogo").attr("src", `${poweredbylogo}`);
        //        }

        //        if (signature) {
        //            $("#signature").attr("src", `${signature}`);
        //        }

        //    }, 2500);

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

        var element = document.getElementById("download_section");
        showLoader();
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

                // ⭐ FIX: force white background
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
            formData.append("file", pdfBlob, "PurchaseOrder.pdf");
            formData.append("AdminID", ADMIN_AUTH);
            formData.append("ID", TemplateId);

            $.ajax({
                url: SAVE_PO_PDF,
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    alert("PDF saved successfully!");
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });

        }).catch (function (error) {
            hideLoader(); // ⭐ ALSO HANDLE ERROR
            console.error(error);
        });

    });
});
