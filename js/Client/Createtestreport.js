"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';

import commonAjaxCalls from './commanAjaxCalls.js';


// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {



    
    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
    const CONVERT_IMAGE_TO_BASE64 = reUsableFunctions.convertImageToBase64;

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//


    $(document).ready(function () {
        debugger;
        const CLIENT_AUTH = localStorage.getItem("Client_auth");
        const Service_ID = localStorage.getItem("serviceid");
        const url = window.location.search;
        const params = new URLSearchParams(url);
        getProcess_JobID();
        const CID = params.get("id");
        if (CID != null) {
            $("#ddjobid").attr('disabled', 'disabled');
            $('#ddjobid').val(CID);
            getlist(CID);
        }
        if (Service_ID != null) {
            $('#ddjobid').val(Service_ID);
            getlist(Service_ID);
            localStorage.removeItem("serviceid");
        }

        function getProcess_JobID() {
            debugger;
            $.ajax({
                url: "https://api.pdca.in/ClientProcess/ListforProcessJobID?ClientID=" + CLIENT_AUTH + "&type=" + false,
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

        $("#ddjobid").change(function () {
            var getProcess_JobID = $(this).val();
            getlist(getProcess_JobID);
        });

        function getlist(getProcess_JobID) {
            $.ajax({
                url: "https://api.pdca.in/ClientProcess/Testreportpreview?ClientID=" + CLIENT_AUTH + "&Service_ID=" + getProcess_JobID,
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
                    if (data.ReportIssuedDate != null || data.ReportIssuedDate == "") {
                        $("#IssuedDate").attr('disabled', 'disabled');
                    }
                    $("#txtid").val(data.ID);
                    $("#name").val(data.Name);
                    if (data.Name != null) {
                        $("#name").attr('disabled', 'disabled');
                    }
                    $("#address").val(data.Address);
                    if (data.Address != null) {
                        $("#address").attr('disabled', 'disabled');
                    }
                    $("#email").val(data.Email);
                    if (data.Email != null) {
                        $("#email").attr('disabled', 'disabled');
                    }
                    $("#mobile").val(data.ContactNumber);
                    if (data.ContactNumber != null) {
                        $("#mobile").attr('disabled', 'disabled');
                    }
                    $("#discipline").val(data.Discipline);
                    if (data.Discipline != null) {
                        $("#discipline").attr('disabled', 'disabled');
                    }
                    $("#grp").val(data.ProductGroup);
                    if (data.ProductGroup != null) {
                        $("#grp").attr('disabled', 'disabled');
                    }
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
                    if (data.SampleReceiptDate != null || data.SampleReceiptDate == "") {
                        $("#SampleReceiptDate").attr('disabled', 'disabled');
                    }
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
                    if (data.SampleRegistrationDate != null) {
                        $("#SampleRegistrationDate").attr('disabled', 'disabled');
                    }
                    $("#SampleID").val(data.SampleID);
                    if (data.SampleID != null) {
                        $("#SampleID").attr('disabled', 'disabled');
                    }
                    $("#SampleName").val(data.SampleName);
                    if (data.SampleName != null) {
                        $("#SampleName").attr('disabled', 'disabled');
                    }
                    $("#CustomerReference").val(data.CustomerReference);
                    if (data.CustomerReference != null) {
                        $("#CustomerReference").attr('disabled', 'disabled');
                    }
                    $("#SamplePackingType").val(data.SamplePackingType);
                    if (data.SamplePackingType != null) {
                        $("#SamplePackingType").attr('disabled', 'disabled');
                    }
                    $("#SampleQuantityReceived").val(data.SampleQuantityReceived);
                    if (data.SampleQuantityReceived != null) {
                        $("#SampleQuantityReceived").attr('disabled', 'disabled');
                    }
                    $("#BatchLotNo").val(data.Batch_Lotno);
                    if (data.Batch_Lotno != null) {
                        $("#BatchLotNo").attr('disabled', 'disabled');
                    }
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
                    if (data.DateofMfg != null || data.DateofMfg == "") {
                        $("#DateofMfgPkg").attr('disabled', 'disabled');
                    }
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
                    if (data.DateofExpiry != null || data.DateofExpiry == "") {
                        $("#Dateofexpiry").attr('disabled', 'disabled');
                    }
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
                    if (data.AnalysisStartingDate != null) {
                        $("#AnalysisStartingDate").attr('disabled', 'disabled');
                    }
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
                    if (data.AnalysisCompletionDate != null || data.AnalysisCompletionDate == "") {
                        $("#Analysiscompletiondate").attr('disabled', 'disabled');
                    }
                    $("#imgfile1").attr("src", data.AuthSign);
                    if (data.AuthSign != null) {
                        $("#imgfile1").attr('disabled', 'disabled');
                    }
                    $("#disclaimer").summernote('code', data.TermsandConditions);
                    if (data.TermsandConditions != null) {
                        $("#disclaimer").attr('disabled', 'disabled');
                    }
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
                            let currentRow = `
                        <tr>
                            <td><input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" /></td>
                       <td><div class="form-group"><input type="text" name="" value="${TestParameter}" id="testParameter" class="testParameter form-control" disabled></div></td>
                       <td><div class="form-group"><input type="text" name="" value="${Unit}" id="unit" class="unit form-control" disabled></div></td>
                       <td><div class="form-group"><input type="text" name="" value="${Results}" id="results" class="results form-control" disabled></div></td>
                       <td><div class="form-group"><input type="text" name="" value="${TestMethod}" id="testMethod" class="testMethod form-control" disabled></div></td>
                       <td> <div class="form-group"> <input type="text" name="" value="${LOQ_LOD}" id="LOQ_LOD" class="LOQ_LOD form-control" disabled> </div></td> 
                       </tr>
                        `;

                            $("#table-iddoc30 tbody").append(currentRow);

                        });
                    };

                }
            });
        }
        $("#dvpdf").submit(function () {
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
            var signature = $("#sifnaturefile").val();
            var ClientID = CLIENT_AUTH;
            var Service_ID = CID;
            var ID = $("#txtid").val();
            var ID = ID;
            if (ID == undefined) {
                ID = null;
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
                "file": signature,
                "ClientID": ClientID,
                "Service_ID": Service_ID,
                "ID": ID,

            }
            $.ajax({
                url: "https://api.pdca.in/ClientProcess/UpdateTestreport",
                type: "POST",
                data: postdata,
                dataType: "json",
                traditional: true,
                crossDomain: true,
                success: function (data) {
                    if (data.responsecode == 1) {
                        var Service_ID = data.responseObject;
                        localStorage.setItem("serviceid", Service_ID);
                        standardajax(Service_ID);
                        alert("Test Report Updated Successfully");
                        window.location = "/client/process/listofReports.html";
                    }
                }
            });
        });
        function standardajax(Service_ID) {
            debugger;
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
                    var ClientID = CLIENT_AUTH;
                    var postdata = new FormData();
                    postdata.append('ID', ID);
                    postdata.append('Results', results);
                    postdata.append('TestParameter', testParameter);
                    postdata.append('Service_ID', Service_ID);
                    postdata.append('TestMethod', testMethod);
                    postdata.append('LOQ_LOD', LOQ_LOD);
                    postdata.append('ClientID', ClientID);
                    postdata.append('Unit', unit);
                };

                $.ajax({
                    url: "https://api.pdca.in/ClientProcess/UpdateTestresult",
                    type: "POST",
                    data: postdata,
                    async: false,
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
            }
        };
        //$("#table-iddoc30").on("click", ".deleteRow", function () {

        //    var id = $(this).attr("id");
        //    if (id != undefined) {
        //        var result = confirm("Are you Sure? You Want to Delete");
        //        if (result) {
        //            $.ajax({
        //                url: "https://api.pdca.in/Process/DeleteTestResult?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
        //                type: "GET",
        //                contentType: false, // Not to set any content header
        //                processData: false, // Not to process data
        //                /*data: fileData,*/
        //                success: function (data) {
        //                    if (data.responsecode == 1) {
        //                        $("#" + id).closest("tr").remove();
        //                        alert("Record Deleted Succesfuly")
        //                    }
        //                }
        //            });
        //        }
        //    }
        //    else {
        //        $(this).closest("tr").remove();
        //    }
        //});
        $("#table-iddoc30").on("click", ".addrow", function () {
            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="text" name="" id="testParameter" class="testParameter form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="unit" class="unit form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="results" class="results form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="testMethod" class="testMethod form-control"> </div></td><td><div class="form-group"><input type="text" name="" id="LOQ_LOD" class="LOQ_LOD form-control"></div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-iddoc30 tbody").append(getrowcontent);
        })
        $("#table-iddoc30").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    });
    //    $("#dvpdf").submit(function () {
    //        debugger;

    //       /* alert("error");*/
    //        var htmlcontent = $("#dvpdf").html();
    //        var ClientID = CLIENT_AUTH;
    //        var Service_ID = Service_ID;
    //        $.ajax({
    //            url: 'https://api.pdca.in/Process/UpdateReport_FromList',
    //            data: { "testreport": htmlcontent, "Service_ID": Service_ID, "ClientID": ClientID },
    //            type: 'POST',
    //            success: function (data) {
    //                if (data.responsecode == 1) {
    //                    var Service_ID = data.responseObject;
    //                }
    //            }
    //        });
    //    });

    //});

});