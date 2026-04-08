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



    const ADMIN_AUTH = localStorage.getItem("Admin_auth");

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//


    // ----------------------------------- APIs START ---------------------------------------//


    const SERVICE_LIST_URL = APIS.ServiceExportExport;
    const INVOICE_INVOICE_URL = APIS.InvoiceListExport;
    const PURCHASE_ORDER_URL = APIS.PurchaseOrderExport;
    const EMP_LIST_URL = APIS.EmplistExport;
    const CLIENT_LIST_URL = APIS.ClientExport;
    const REGULARTY_LIST_URL = APIS.GetjobExportExport;
    const QUALITY_LIST_URL = APIS.qualityExport;
    const PRODUCT_LIST_URL = APIS.ListofProductsexportExport;
    const REPORT_LIST_URL = APIS.ListofReportExportExport;
    const VENDOR_LIST_URL = APIS.VendorExport;

    // ----------------------------------- APIs END ---------------------------------------//


    debugger;
    let startDate = "";
    let endDate = "";
    $.ajax({
        url: "https://api.pdca.in/Dashboard/AdminDashboard?AdminID=" + ADMIN_AUTH,
        type: "GET",
        contentType: false, // Not to set any content header                      
        processData: false, // Not to process data
        //data: fileData,
        beforeSend: function () {
            $('.spinner').show();
            $("#kt_content,.card").css("opacity", "0.1")
        },
        success: function (data) {
            $("#srivoffcount").html(data.TotalServiceOffers);
            $("#invcount").html(data.Totaltaxinvoice);
            $("#purcount").html(data.TotalPurchaseorder);
            $("#templist").html(data.TotalEmployeelist);
            $("#freecount").html(data.Totalnooffreelancer);
            $("#tnoempcount").html(data.Totalnoofemp);
            $("#clicount").html(data.TotalClientlist);
            $("#vendorcount").html(data.Totalvendorlist);
            $("#regcount").html(data.TotalReglist);
            $("#pregcount").html(data.Totalpendingreg);
            $("#cregcount").html(data.Totalcompletereg);
            $("#tqytcount").html(data.TotalQuality);
            $("#pqytcount").html(data.TotalpendingQuality);
            $("#cqytcount").html(data.TotalcompleteQuality);
            $("#prodcount").html(data.TotalProduct);
            $("#cprodcount").html(data.Totalcompprod);
            $("#pprodcount").html(data.Totalpendrep);
            $("#tsmpcount").html(data.Totalservice);
            $("#ttrepcount").html(data.Totaltestreport);
            $("#tpreocount").html(data.Totalpendingreport);
            $('.countani').each(function () {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });

        },
        complete: function () {
            $('.spinner').hide();
            $("#kt_content,.card").css("opacity", "")

        }
    });
    $("#applyFilter").click(() => {
        startDate = $("#startdate").val();
        endDate = $("#enddate").val();

        $.ajax({
            url: "https://api.pdca.in/Dashboard/AdminDashboard?AdminID=" + ADMIN_AUTH + "&fromdate=" + startDate + "&todate=" + endDate,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            beforeSend: function () {
                $('.spinner').show();
                $("#kt_content,.card").css("opacity", "0.1")

            },
            success: function (data) {
                $("#srivoffcount").html(data.TotalServiceOffers);
                $("#invcount").html(data.Totaltaxinvoice);
                $("#purcount").html(data.TotalPurchaseorder);
                $("#templist").html(data.TotalEmployeelist);
                $("#freecount").html(data.Totalnooffreelancer);
                $("#tnoempcount").html(data.Totalnoofemp);
                $("#clicount").html(data.TotalClientlist);
                $("#regcount").html(data.TotalReglist);
                $("#pregcount").html(data.Totalpendingreg);
                $("#cregcount").html(data.Totalcompletereg);
                $("#tqytcount").html(data.TotalQuality);
                $("#pqytcount").html(data.TotalpendingQuality);
                $("#cqytcount").html(data.TotalcompleteQuality);
                $("#prodcount").html(data.TotalProduct);
                $("#cprodcount").html(data.Totalcompprod);
                $("#pprodcount").html(data.Totalpendrep);
                $("#tsmpcount").html(data.Totalservice);
                $("#ttrepcount").html(data.Totaltestreport);
                $("#tpreocount").html(data.Totalpendingreport);
                $("#vendorcount").html(data.Totalvendorlist);

                $('.countani').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 1000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
            },
            complete: function () {
                $('.spinner').hide();
                $("#kt_content,.card").css("opacity", "");
            }
        });
    })

    $("#btnexportService").click(function () {
        debugger;
        $(".spinner").show();

        $.ajax({
            url: `${SERVICE_LIST_URL}?AdminID=${ADMIN_AUTH}&fromdate=${startDate}&todate=${endDate}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: function () {
                $('.spinner').show();
                $("#kt_content,.card").css("opacity", "0.1")

            },
            success: ((data) => {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
            }),
            complete: (() => {
                $('.spinner').hide();
                $("#kt_content,.card").css("opacity", "")

            }),
        });
        return false;
    })
    $("#btnexportinvoices").click(() => {

        //$(".loader").show();

        $.ajax({
            url: `${INVOICE_INVOICE_URL}?AdminID=${ADMIN_AUTH}&fromdate=${startDate}&todate=${endDate}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: (() => {
                $('.spinner').show();
                $("#kt_content,.card").css("opacity", "0.1")
            }),
            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
                //$(".loader").hide();
            },
            complete: (() => {
                $('.spinner').hide();
                $("#kt_content,.card").css("opacity", "")
            }),
        });
        return false;
    })
    $("#btnexportPurchase").click(function () {
        $.ajax({
            url: `${PURCHASE_ORDER_URL}?AdminID=${ADMIN_AUTH}&fromdate=${startDate}&todate=${endDate}&downloadCsv=${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: (() => {
                $('.spinner').show();
                $("#kt_content,.card").css("opacity", "0.1")

            }),
            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
            },
            complete: (() => {
                $('.spinner').hide();
                $("#kt_content,.card").css("opacity", "")
            }),
        });
        return false;
    })
    $("#btnexportEmployee").click(() => {

        $.ajax({
            url: `${EMP_LIST_URL}?AdminID=${ADMIN_AUTH}&fromdate=${startDate}&todate=${endDate}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: (() => {
                $('.spinner').show();
                $("#kt_content,.card").css("opacity", "0.1")

            }),
            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
            },
            complete: (() => {
                $('.spinner').hide();
                $("#kt_content,.card").css("opacity", "")

            }),
        });
        return false;
    })
    $("#btnexportClients").click(function () {
        debugger;
        $.ajax({
            url: `${CLIENT_LIST_URL}?AdminID=${ADMIN_AUTH}&fromdate=${startDate}&todate=${endDate}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: (() => {
                $('.spinner').show();
                $("#kt_content,.card").css("opacity", "0.1")

            }),
            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
            },
            complete: (() => {
                $('.spinner').hide();
                $("#kt_content,.card").css("opacity", "")

            }),
        });
        return false;
    });

    $("#btnexportVendor").click(function () {
        debugger;
        $.ajax({
            url: `${VENDOR_LIST_URL}?AdminID=${ADMIN_AUTH}&fromdate=${startDate}&todate=${endDate}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: (() => {
                $('.spinner').show();
                $("#kt_content,.card").css("opacity", "0.1")

            }),
            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
            },
              complete: (() => {
                $('.spinner').hide();
                $("#kt_content,.card").css("opacity", "")

            }),
        });
        return false;
    })
    $("#btnexportRegulatory").click(function () {

        $.ajax({
            url: `${REGULARTY_LIST_URL}?AdminID=${ADMIN_AUTH}&fromdate=${startDate}&todate=${endDate}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: (() => {
                $('.spinner').show();
                $("#kt_content,.card").css("opacity", "0.1")

            }),
            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
            },
            complete: (() => {
                $('.spinner').hide();
                $("#kt_content,.card").css("opacity", "")

            }),
        });
        return false;
    })
    $("#btnexportQuality").click(function () {

        $.ajax({
            url: `${QUALITY_LIST_URL}?AdminID=${ADMIN_AUTH}&fromdate=${startDate}&todate=${endDate}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: (() => {
                $(".spinner").show();
                    $("#kt_content,.card").css("opacity", "0.1");
            }),
            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
                $(".loader").hide();
            },
            complete: (() => {
                $(".spinner").hide();
                $("#kt_content,.card").css("opacity", "");
            })
        });
        return false;
    })
    $("#btnexportProducts").click(function () {

        $.ajax({
            url: `${PRODUCT_LIST_URL}?AdminID=${ADMIN_AUTH}&fromdate=${startDate}&todate=${endDate}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: (() => {
                $(".spinner").show();
                $("#kt_content,.card").css("opacity", "0.1");
            }),
            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
            },
            complete: (() => {
                $(".spinner").hide();
                $("#kt_content,.card").css("opacity", "");
            })
        });
        return false;
    })
    $("#btnexportReport").click(function () {

        $.ajax({
            url: `${REPORT_LIST_URL}?AdminID=${ADMIN_AUTH}&fromdate=${startDate}&todate=${endDate}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            beforeSend: (() => {
                $(".spinner").show();
                $("#kt_content,.card").css("opacity", "0.1");
            }),
            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
            },
            complete: (() => {
                $(".spinner").hide();
                $("#kt_content,.card").css("opacity", "");
            })
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
        }, 100);
    }

})