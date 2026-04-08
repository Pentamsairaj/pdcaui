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
    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;
    const GET_DATA_FROM_FORM = getServiceFormData;
    const CONVERT_NUMBER_INTO_STRING = convertIntToEnglish;



    const CLIENT_AUTH = localStorage.getItem("Client_auth");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');
    if (ADMIN_NAME != "Admin" && ADMIN_NAME != "Manager") {
        $(".btn-primary").hide();
    };
$(document).ready(function () {
    
    const CLIENT_AUTH = localStorage.getItem("Client_auth");
    $("#ddjobid").hide();
    getlist();
    function getlist() {
        debugger;
        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/ClientQualitylist?ClientID=" + CLIENT_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                
                $("#table-id tbody").empty();
                var sno = 1;
            
                $.each(data, function (index, values) {
                    var completedDate = new Date(parseInt(values.createdon.replace("/Date(", "").replace(")/")));
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0! 
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }
                    var datef = + dd + '/' + mm + '/' + yyyy;
                    var datefs = "";
                    if (values.modifiedon != null) {
                        var completedDates = new Date(parseInt(values.modifiedon.replace("/Date(", "").replace(")/")));
                        var dds = completedDates.getDate();
                        var mms = completedDates.getMonth() + 1; //January is 0! 
                        var yyyys = completedDates.getFullYear();
                        if (dds < 10) { dds = '0' + dds }
                        if (mms < 10) { mms = '0' + mms }
                        datefs = + dds + '/' + mms + '/' + yyyys;
                    }
                    else {

                        values.modifiedon = "-";
                        values.modifiedperson = "-";
                        datefs = "-"

                    }
                    var datedd = "";
                    if (values.DueDate != null) {
                        var completedDates = new Date(parseInt(values.DueDate.replace("/Date(", "").replace(")/")));
                        var dds = completedDates.getDate();
                        var mms = completedDates.getMonth() + 1; //January is 0! 
                        var yyyys = completedDates.getFullYear();
                        if (dds < 10) { dds = '0' + dds }
                        if (mms < 10) { mms = '0' + mms }
                        datedd = + dds + '/' + mms + '/' + yyyys;
                    }
                    else {

                        values.DueDate = "-";
                        datedd = "-"

                    }
                    var license = ""
                    var EmployeeName = values.EmployeeName;
                    if (values.EmployeeName == null) {
                        EmployeeName = "N/A"
                    }
                    var license = ""
                    if (values.certificatecopy == null) {
                        license = "N/A"
                    }
                    else {
                        license = "<a href='" + values.certificatecopy + "' target='_blank'><button class='btn btn-primary' type='button'>View</button> </a>"
                    }
                    if (values.Noofworkdaystaken != null && values.Noofworkdaystaken != "-") {
                        if (values.Noofworkdaystaken < "0.23: 59: 59") {
                            values.Noofworkdaystaken = 1;
                        }
                        var timeRegex = /(\d+)\.(\d{2}):(\d{2}):(\d{2})/;
                        if (values.Noofworkdaystaken == "1") {
                            var match = 1;
                        }
                        else {
                            var match = values.Noofworkdaystaken.match(timeRegex);
                        }
                        if (match == null) {
                            match = 0;
                            var days = 0;
                            var hours = 0;
                            var minutes = 0;
                            var seconds = 0;
                        }
                        else if (match == "1") {
                            match = 1;
                            var days = 1;
                            var hours = 1;
                            var minutes = 1;
                            var seconds = 1;
                        }
                        // Extract the number of days, hours, minutes, and seconds
                        else {
                            var days = parseInt(match[1]);
                            var hours = parseInt(match[2]);
                            var minutes = parseInt(match[3]);
                            var seconds = parseInt(match[4]);
                        }
                    }
                    else {

                    }
                    // Calculate the total number of seconds in the given time
                    var totalSeconds = (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;

                    //// Convert the total number of seconds into days
                    var days = Math.floor(totalSeconds / 86400);
                    if (days === 0) {
                        days = 1;
                    }

                    let getdetails = `
  <tr>
    <td class="text-center" id="col0">${sno++}</td>
    <td id="col1">${values.CompanyName}</td>
    <td id="col2">${values.JobID}</td>
    <td>${EmployeeName}</td>
    <td>${datef}</td>
    <td>${datefs}</td>
    <td>${license}</td>
    <td>${datedd}</td>
    <td>${days}</td>
   <td>
    <span class="switch switch-primary">
        <label>
            <input type="checkbox" disabled class="status-checkbox" data-id="${values.ID}" 
                ${values.FinalStatus === "green" ? "checked" : ""}>
            <span></span>
        </label>
    </span>
</td>
    <td>
      <div class="form-group">
        <textarea class="form-control w-200px">${values.Remarks}</textarea>
      </div>
    </td>
    <td class="d-flex">
      <a href="/client/qualityCompliance/qualityDocumentationNew.html?id=${values.ID}" id="${values.ID}" class="btn edit">
        <i class="menu-icon flaticon2-edit text-info"></i>
      </a>
     
    </td>
  </tr>
`;
                    $("#table-id tbody").append(getdetails);
                })
            }
        });
    }
});

});

