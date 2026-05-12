"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getServiceFormData } from './getFormData.js';
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
    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;
    const GET_DATA_FROM_FORM = getServiceFormData;
    const CONVERT_NUMBER_INTO_STRING = convertIntToEnglish;
    const VENDOR_EXPORT_CSV = APIS.VendorExport;
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const CLIENT_AUTH = localStorage.getItem("Client_auth");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');
    if (ADMIN_NAME != "Admin" && ADMIN_NAME != "Manager" && ADMIN_NAME != "CRM Executive") {
        $(".VendorList").hide();
    };
    getlist();
    function getlist() {
        $.ajax({
            url: "https://api.pdca.in/Vendor/VendorGetList?AdminId=" + ADMIN_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            beforesend: () => {
                $(".spinner").show();
                $("#kt_content,.card").css("opacity", "0.1")
            },
            success: function (val) {
                $("#table-id tbody").empty();
                $.each(val, function (index, data) {

                    //const datef = data.createdon ? moment(data.createdon).format('DD-MM-YYYY') : "N/A";
                    if (data.createdon) {
                        var datef = data.createdon.split(" ")[0];
                    } else {
                        var datef = "-";
                    }
                    $("#table-id tbody").append("<tr><td>" + (index + 1) + "</td><td>" + data.Companyname + "</td><td>" + data.ClientID + "</td><td>" + datef + "</td><td>" + data.NameAcc + "</td><td>" + data.PhoneAcc + "</td><td>" + data.drivelink + "</td><td>" + data.GSTNumber + "</td><td>" + data.Servicename + "</td><td>" + data.SubscriptionType + "</td> <td><a href='../leadManagement/editVendor.html?VendorID=" + data.id + "'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a><span class='Delete mx-3' style='cursor:pointer' id='" + data.id + "'><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></span></td></tr>")
                });
                $('#table-id').DataTable();

            },
            complete: () => {
                $('.spinner').hide();
                $("#kt_content,.card").css("opacity", "")

            }
        });
    }

    $("#table-id").on("click", ".Delete", function () {
        var id = $(this).attr("id");
        var result = confirm("Are you Sure? You Want to Delete this Vendor");
        if (result) {
            $.ajax({
                url: "https://api.pdca.in/Vendor/VendorDelete?AdminId=" + ADMIN_AUTH + "&Id=" + id + "",
                type: "GET",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                //data: fileData,
                success: function (data) {
                    getlist();
                }
            });
        }
    })
    $("#btnexportService").click(() => {
        $.ajax({
            url: `${VENDOR_EXPORT_CSV}?AdminID=${ADMIN_AUTH}&downloadCsv=${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,
            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                $(".loader").hide();
            }
        });
        return false;
    })
    function Export_JSON_to_CSV(JSONString, ReportName, isShowHeader) {
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
})