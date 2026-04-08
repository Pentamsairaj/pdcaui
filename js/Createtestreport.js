"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';

import { getPagination } from './pagination.js';
import commonAjaxCalls from './commanAjaxCalls.js';

// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {

    const GET_PAGINATION = getPagination;
    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const Service_ID = localStorage.getItem("serviceid");
    const url = window.location.search;
    const params = new URLSearchParams(url);
    getProcess_JobID();
    const CID = params.get("id");
    if (CID != null) {
        $("#ddjobid").attr('disabled', 'disabled');
        $('#ddjobid').val(CID);
        getlist(CID);
    };

    if (Service_ID != null) {
        $('#ddjobid').val(Service_ID);
        getlist(Service_ID);
        localStorage.removeItem("serviceid");
    };

    function getProcess_JobID() {
        debugger;
        $.ajax({
            url: "https://api.pdca.in/Process/ListforProcessJobID?AdminID=" + ADMIN_AUTH + "&type=" + false,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {

                $("#ddjobid").empty();
                var defaultoption = '<option value="0">Select Registration ID</option>';
                $("#ddjobid").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.ID + '">' + val.Process_JobID + '</option>'
                    $("#ddjobid").append(getdetails);
                });


            }
        });
    }

    $("#ddjobid").on('change', function () {
        var getProcess_JobID = $(this).val();
        getlist(getProcess_JobID);
    });

    function getlist(getProcess_JobID) {
        $.ajax({
            url: "https://api.pdca.in/Process/Testreportpreview?AdminID=" + ADMIN_AUTH + "&Service_ID=" + getProcess_JobID,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#TestReport").val(data.ReportNo);
                if (data.ReportNo != null) {
                    $("#TestReport").attr('disabled', 'disabled');
                }
                $("#ULRNo").val(data.ULRNo);
                if (data.ULRNo != null) {
                    $("#ULRNo").attr('disabled', 'disabled');
                }
                if (data.ReportIssuedDate != null) {
                    var completedDate = new Date(parseInt(data.ReportIssuedDate.replace("/Date(", "").replace(")/")));
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0! 
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }

                    var ReportIssuedDate = yyyy + '-' + mm + '-' + dd;

                }
                else {
                    ReportIssuedDate = "";
                }
                $("#IssuedDate").val(ReportIssuedDate);
                $("#txtid").val(data.ID)
                $("#name").val(data.Name);
                $("#address").val(data.Address);
                $("#email").val(data.Email);
                $("#mobile").val(data.ContactNumber);
                $("#discipline").val(data.Discipline);
                $("#grp").val(data.ProductGroup);
                if (data.SampleReceiptDate != null) {
                    var completedDate = new Date(parseInt(data.SampleReceiptDate.replace("/Date(", "").replace(")/")));
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0! 
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }

                    var SampleReceiptDate = yyyy + '-' + mm + '-' + dd;

                }
                else {
                    SampleReceiptDate = "";
                }
                $("#SampleReceiptDate").val(SampleReceiptDate);
                if (data.SampleRegistrationDate != null) {
                    var completedDate = new Date(parseInt(data.SampleRegistrationDate.replace("/Date(", "").replace(")/")));
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0! 
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }

                    var SampleRegistrationDate = yyyy + '-' + mm + '-' + dd;

                }
                else {
                    SampleRegistrationDate = "";
                }
                $("#SampleRegistrationDate").val(SampleRegistrationDate);
                $("#SampleID").val(data.SampleID);
                $("#SampleName").val(data.SampleName);
                $("#CustomerReference").val(data.CustomerReference);
                $("#SamplePackingType").val(data.SamplePackingType);
                $("#SampleQuantityReceived").val(data.SampleQuantityReceived);
                $("#BatchLotNo").val(data.Batch_Lotno);
                if (data.DateofMfg != null) {
                    var completedDate = new Date(parseInt(data.DateofMfg.replace("/Date(", "").replace(")/")));
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0! 
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }

                    var DateofMfg = yyyy + '-' + mm + '-' + dd;

                }
                else {
                    DateofMfg = "";
                }
                $("#DateofMfgPkg").val(DateofMfg);
                if (data.DateofExpiry != null) {
                    var completedDate = new Date(parseInt(data.DateofExpiry.replace("/Date(", "").replace(")/")));
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0! 
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }

                    var DateofExpiry = yyyy + '-' + mm + '-' + dd;

                }
                else {
                    DateofExpiry = "";
                }
                $("#Dateofexpiry").val(DateofExpiry);
                if (data.AnalysisStartingDate != null) {
                    var completedDate = new Date(parseInt(data.AnalysisStartingDate.replace("/Date(", "").replace(")/")));
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0! 
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }

                    var AnalysisStartingDate = yyyy + '-' + mm + '-' + dd;

                }
                else {
                    AnalysisStartingDate = "";
                }
                $("#AnalysisStartingDate").val(AnalysisStartingDate);
                if (data.AnalysisCompletionDate != null) {
                    var completedDate = new Date(parseInt(data.AnalysisCompletionDate.replace("/Date(", "").replace(")/")));
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0! 
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }

                    var AnalysisCompletionDate = yyyy + '-' + mm + '-' + dd;

                }
                else {
                    AnalysisCompletionDate = "";
                }
                $("#Analysiscompletiondate").val(AnalysisCompletionDate);
                $("#fl_img1view").attr("src", data.AuthSign);
                $("#disclaimer").summernote('code', data.TermsandConditions);
                CONVERT_IMAGE_TO_BASE64(data.AuthSign, "signatureLogo");
                if (data.AuthSign) {
                    $("#fl_img1view").css("background-image", "url('" + data.AuthSign + "')");
                }
                if (data.TestResult.length > 0) {
                    $("#table-iddoc30 tbody").empty();
                    data.TestResult.map((value) => {
                        let TestParameter = value.TestParameter;
                        let Unit = value.Unit;
                        let Results = value.Results;
                        let TestMethod = value.TestMethod;
                        let LOQ_LOD = value.LOQ_LOD;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = '<div class="deleteRow" style="cursor:pointer" id="' + value.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div>';
                        }
                        else {
                            var getrowcontent = "";
                        }
                        let currentRow = `
                        <tr>
                            <td><input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" /></td>
                            <td class="d-none d-print-none"><input type="hidden" class="txtid" id="product_id" name="product_id" value=${value.ID}></td>
                       <td><div class="form-group"><input type="text" name="" value="${TestParameter}" id="testParameter" class="testParameter form-control"></div></td>
                       <td><div class="form-group"><input type="text" name="" value="${Unit}" id="unit" class="unit form-control"></div></td>
                       <td><div class="form-group"><input type="text" name="" value="${Results}" id="results" class="results form-control"></div></td>
                       <td><div class="form-group"><input type="text" name="" value="${TestMethod}" id="testMethod" class="testMethod form-control"></div></td>
                       <td> <div class="form-group"> <input type="text" name="" value="${LOQ_LOD}" id="LOQ_LOD" class="LOQ_LOD form-control"> </div></td>
                       <td>${getrowcontent}</td>
                        </tr>
                        `;

                        $("#table-iddoc30 tbody").append(currentRow);

                    });
                };

            }
        });
    };

    $("#dvpdf").one("submit", function (e) {
        e.preventDefault();
        const submitButton = $("#dvpdf button[type='submit']");
        submitButton.prop("disabled", true);
        var TestReport = $("#TestReport").val();
        var ULRNo = $("#ULRNo").val();
        var IssuedDate = $("#IssuedDate").val();
        var name = $("#name").val();
        var address = $("#address").val();
        var email = $("#email").val();
        var mobile = $("#mobile").val();
        var discipline = $("#discipline").val();
        var grp = $("#grp").val();
        var SampleReceiptDate = $("#SampleReceiptDate").val();
        var SampleRegistrationDate = $("#SampleRegistrationDate").val();
        var SampleID = $("#SampleID").val();
        var SampleName = $("#SampleName").val();
        var CustomerReference = $("#CustomerReference").val();
        var SamplePackingType = $("#SamplePackingType").val();
        var SampleQuantityReceived = $("#SampleQuantityReceived").val();
        var BatchLotNo = $("#BatchLotNo").val();
        var DateofMfgPkg = $("#DateofMfgPkg").val();
        var Dateofexpiry = $("#Dateofexpiry").val();
        var AnalysisStartingDate = $("#AnalysisStartingDate").val();
        var Analysiscompletiondate = $("#Analysiscompletiondate").val();
        var disclaimer = $("#disclaimer").val();
        var AdminID = ADMIN_AUTH;
        var Service_ID = CID;
        var ID = $("#txtid").val();
        if (ID == undefined) {
            ID = null;
        }
        let signature = "";
        let Posignature = localStorage.getItem("signatureLogo");
        let file1 = $("#imgfile1")[0].files[0];
        if (file1) {
            signature = $("#fl_img1view").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        } else if (Posignature) {
            signature = Posignature;
        }
        var postdata = {
            "ReportNo": TestReport,
            "ULRNo": ULRNo,
            "ReportIssuedDate": IssuedDate,
            "Name": name,
            "Address": address,
            "Email": email,
            "ContactNumber": mobile,
            "Discipline": discipline,
            "ProductGroup": grp,
            "SampleReceiptDate": SampleReceiptDate,
            "SampleRegistrationDate": SampleRegistrationDate,
            "SampleID": SampleID,
            "SampleName": SampleName,
            "CustomerReference": CustomerReference,
            "SamplePackingType": SamplePackingType,
            "SampleQuantityReceived": SampleQuantityReceived,
            "Batch_Lotno": BatchLotNo,
            "DateofMfg": DateofMfgPkg,
            "DateofExpiry": Dateofexpiry,
            "AnalysisStartingDate": AnalysisStartingDate,
            "AnalysisCompletionDate": Analysiscompletiondate,
            "TermsandConditions": disclaimer,
            "AuthSign": signature,
            "AdminID": AdminID,
            "Service_ID": Service_ID,
            "ID": ID,

        }

        $.ajax({
            url: "https://api.pdca.in/Process/CreateTestReport",
            type: "POST",
            data: postdata,
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {
                if (data.responsecode == 1) {
                    var Service = data.responseObject;
                    localStorage.setItem("serviceid", CID);
                    standardajax(Service_ID);
                    alert("Test Report Created Successfully");
                    window.location = "/process/listofReports.html";
                }
            },
            complete: () => {
                submitButton.prop("disabled", false);
            },
        });

    });
    function standardajax(Service_ID) {
        var gettablelength = $("#table-iddoc30 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc30 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var testParameter = $("#table-iddoc30 tbody tr").eq(i).find(".testParameter").val();
                var unit = $("#table-iddoc30 tbody tr").eq(i).find(".unit").val();
                var results = $("#table-iddoc30 tbody tr").eq(i).find(".results").val();
                var testMethod = $("#table-iddoc30 tbody tr").eq(i).find(".testMethod").val();
                var LOQ_LOD = $("#table-iddoc30 tbody tr").eq(i).find(".LOQ_LOD").val();
                var Service_ID = CID;
                var AdminID = ADMIN_AUTH;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('Results', results);
                postdata.append('TestParameter', testParameter);
                postdata.append('Service_ID', Service_ID);
                postdata.append('TestMethod', testMethod);
                postdata.append('LOQ_LOD', LOQ_LOD);
                postdata.append('AdminID', AdminID);
                postdata.append('Unit', unit);
                $.ajax({
                    url: "https://api.pdca.in/Process/CreateTestResult",
                    type: "POST",
                    data: postdata,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {
                        if (data.responsecode == 1) {
                            localStorage.setItem("serviceid", CID);
                        }

                    }
                });
            };
        }
    };

    $("#table-iddoc30").on("click", ".deleteRow", function () {

        var id = $(this).attr("ID");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Process/DeleteTestResult?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });

    $("#table-iddoc30").on("click", ".addrow", function () {
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="text" name="" id="testParameter" class="testParameter form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="unit" class="unit form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="results" class="results form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="testMethod" class="testMethod form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="LOQ_LOD" class="LOQ_LOD form-control"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-iddoc30 tbody").append(getrowcontent);
    });

    $("#table-iddoc30").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });

});