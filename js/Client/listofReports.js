"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import commonAjaxCalls from './commanAjaxCalls.js';


// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {



    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
    const CLIENT_AUTH = localStorage.getItem("Client_auth");
    const Service_ID = localStorage.getItem("serviceid");

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//



    // ----------------------------------- APIs START ---------------------------------------//




    //const PRODUCE_LIST_URL = APIS.ListofProducts;
    const SERIVCE_LIST_URL = APIS.serviceList;
    const DELETE_PRODUCT_LIST_URL = APIS.deleteProductList;
    //const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    // ----------------------------------- APIs END ---------------------------------------//
    // -----------------------------------   list of product START ---------------------------------------//
$.ajax({
    url: `${SERIVCE_LIST_URL}?ClientID=${CLIENT_AUTH}`,
    type: "GET",
    async: false,
    dataType: "JSON",
    crossDomain: true,
    success: (data) => {
        console.log(data)
        $("#table-id tbody").empty(); 
        if (Object.keys(data).length > 0) {
            $.each(data, (index, value) => {
                var license = ""
                if (value.Outsourcedreport == null) {
                    license = "N/A"
                }
                else {
                    license = "<a href='" + value.Outsourcedreport + "' target='_blank'><i class='fa-solid fa-eye' style='color: #74C0FC;'></i></a>"
                }
                
                if (value.Reviewedby != null) {
                    const startDate = value.AnalysisStartDate ? moment(value.AnalysisStartDate).format('DD-MM-YYYY') : "-";
                    const endDate = value.AnalysisEndDate ? moment(value.AnalysisEndDate).format('DD-MM-YYYY') : "-";
                    let ReviewedOn = CONVERT_JSON_TO_NORMAL_DATE(value.ReviewedOn);
                    let Reportissuedon = CONVERT_JSON_TO_NORMAL_DATE(value.Reportissuedon);
                    let registation_date = CONVERT_JSON_TO_NORMAL_DATE(value.RegistraionDate);
                    if (registation_date == null) {
                        registation_date = '-';
                    }
                    let newRow = `<tr id=${value.ID}>
                                  <td>${++index}</td>
                                  <td>${value.Process_JobID}</td>
                                  <td>${registation_date}</td>
                                  <td>${value.CompanyName}</td>
                                  <td>${value.productname}</td>
                                  <td>${startDate}</td>
                                  <td>${endDate}</td>
                                   <td>
    <span class="switch switch-primary">
        <label>
            <input type="checkbox" class="status-checkbox" disabled data-id="${value.ID}" 
                ${value.Status === "green" ? "checked" : ""}>
            <span></span>
        </label>
    </span>
</td>
                                  <td><a target="_blank" href=createTestReportPreview.html?ID=${value.ID}><button class="btn btn-primary" type="button">View</button> </a></td>
                                  <td>${license}</td>
                                  
                                  <td>${value.Reviewedby}</td>
                                  <td>${ReviewedOn}</td>
                                  <td>${value.ReportIssuedby}</td>
                                  <td>${Reportissuedon}</td>
                                  <td>${startDate}</td>
                                  <td>${endDate}</td>
                                  <td>${value.Remarks}</td>
                                 
                                  </tr>`;
                    $("#table-id tbody").append(newRow);
                }
                else {
                    const startDate = value.AnalysisStartDate ? moment(value.AnalysisStartDate).format('DD-MM-YYYY') : "-";
                    const endDate = value.AnalysisEndDate ? moment(value.AnalysisEndDate).format('DD-MM-YYYY') : "-";
                    let registation_date = CONVERT_JSON_TO_NORMAL_DATE(value.RegistraionDate);
                    if (registation_date == null) {
                        registation_date = '-';
                    }
                    let newRow = `<tr id=${value.ID}>
                                  <td>${++index}</td>
                                  <td>${value.Process_JobID}</td>
                                 <td>${registation_date}</td>
                                  <td>${value.CompanyName}</td>
                                  <td>${value.productname}</td>
                                  <td>${startDate}</td>
                                  <td>${endDate}</td>
                                   <td>
    <span class="switch switch-primary">
        <label>
            <input type="checkbox" class="status-checkbox" disabled data-id="${value.ID}" 
                ${value.Status === "green" ? "checked" : ""}>
            <span></span>
        </label>
    </span>
</td>
                                  <td><a target="_blank" href=createTestReportPreview.html?ID=${value.ID}><button class="btn btn-primary" type="button">View</button> </a></td>
                                  <td>${license}</td>
                                 
                                  <td><input class="form-control Reviewedby"id=Reviewedby name="" disabled /></td>
                                  <td><input class="Reviewedon form-control"id=Reviewedon name=""type=date disabled /></td>
                                  <td><input class="form-control issuedby"id=issuedby name="" disabled /></td>
                                  <td><input class="issuedon form-control"id=issuedon name=""type=date disabled></td>
                                  <td><input class="fromDate form-control"id=fromDate name=""type=date disabled></td>
                                  <td><input class="toDate form-control"id=toDate name=""type=date disabled></td>
                                  <td><textarea class="form-control Remarks" id=Remarks name="" disabled type=text></textarea></td>
                                 
                                  </tr>`;
                    $("#table-id tbody").append(newRow);
                 
                }
                
                
                
            });
        };
       
    }
});
// -----------------------------------   SERVICE OFFER LIST END ---------------------------------------//

});

//"use strict";
//// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
//import APIS from './api.js';
//import reUsableFunctions from './reUsableFunctions.js';
//import { convertIntToEnglish } from './reUsableFunctions.js';
//import { getServiceFormData } from './getFormData.js';
//import { getPagination } from './pagination.js';
//import commonAjaxCalls from './commanAjaxCalls.js';


//// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
//$(() => {
//    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

//    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
//    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
//    const PAGE_RELOAD = reUsableFunctions.pageReload;
//    const CLEAR_STORAGE = reUsableFunctions.clearStorage;
//    const CALCULATE_AMOUNT = reUsableFunctions.calAmount;
//    const GET_DATA_FROM_TABLE = reUsableFunctions.getDataFromTable;
//    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
//    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;
//    const GET_DATA_FROM_FORM = getServiceFormData;
//    const GET_PAGINATION = getPagination;
//    const CONVERT_NUMBER_INTO_STRING = convertIntToEnglish;



//    const ADMIN_AUTH = localStorage.getItem("Admin_auth");

//    $(document).ready(function () {
//        const ADMIN_AUTH = localStorage.getItem("Admin_auth");
//        $("#ddjobid").hide();
//        getlist();
//        function getlist() {
//            $.ajax({
//                url: "https://api.pdca.in/Process/ListofReports?AdminID=" + ADMIN_AUTH + "&ID="+ getjoballocationid,
//                type: "GET",
//                contentType: false, // Not to set any content header
//                processData: false, // Not to process data
//                //data: fileData,
//                success: function (data) {
//                    $("#table-id tbody").empty();
//                    var sno = 1;
//                    $.each(data, function (index, values) {
//                        var completedDate = new Date(parseInt(values.createdon.replace("/Date(", "").replace(")/")));
//                        var dd = completedDate.getDate();
//                        var mm = completedDate.getMonth() + 1; //January is 0! 
//                        var yyyy = completedDate.getFullYear();
//                        if (dd < 10) { dd = '0' + dd }
//                        if (mm < 10) { mm = '0' + mm }
//                        var datef = + dd + '/' + mm + '/' + yyyy;
//                        var datefs = "";
//                        if (values.modifiedon != null) {
//                            var completedDates = new Date(parseInt(values.modifiedon.replace("/Date(", "").replace(")/")));
//                            var dds = completedDates.getDate();
//                            var mms = completedDates.getMonth() + 1; //January is 0! 
//                            var yyyys = completedDates.getFullYear();
//                            if (dds < 10) { dds = '0' + dds }
//                            if (mms < 10) { mms = '0' + mms }
//                            datefs = + dds + '/' + mms + '/' + yyyys;
//                        }
//                        else {

//                            values.modifiedon = "-";
//                            values.modifiedperson = "-";
//                            datefs = "-"

//                        }


//                        var getdetails = '<tr><td class="text-center" id="col0">' + sno++ + '</td><td id="col1">' + values.jobno + '</td><td id="col2">' + values.CompanyName + '</td><td>' + values.productname + '</td><td>' + values.Testreport + '</td><td>' + values.Outsourcedreport + '</td><td><textarea type="text" name="" ></textarea></td><td><a href="/qualityCompliance/QualityLevel-I.html?id=' + values.ID + '" id="' + values.ID + '"  class="btn edit"><i class="menu-icon flaticon2-edit text-info"></i></a> <span class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></span></td></tr>';


//                        $("#table-id tbody").append(getdetails);
//                    })
//                    GET_PAGINATION("#table-id");
//                }
//            });
//        }

//        $("#table-id").on("click", ".deleteRow", function () {
//            var id = $(this).attr("id");
//            var result = confirm("Are you Sure? You Want to Delete");
//            if (result) {
//                $.ajax({
//                    url: "https://api.pdca.in/Process/Deleteproductlist?AdminId=" + ADMIN_AUTH + "&id=" + id + "",
//                    type: "GET",
//                    contentType: false, // Not to set any content header
//                    processData: false, // Not to process data
//                    /*data: fileData,*/
//                    success: function (data) {
//                        $(this).closest("tr").remove();
//                        getlist();
//                    }
//                });
//            }
//        });
//    });

//});