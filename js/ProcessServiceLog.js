"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getServiceFormData } from './getFormData.js';
import { getPagination } from './pagination.js';
import commonAjaxCalls from './commanAjaxCalls.js';

$(() => {

    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');
    if (ADMIN_NAME != "Admin" && ADMIN_NAME != "Manager" && ADMIN_NAME != "CRM Executive") {
        $(".processlog").hide();
    };
    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    var code = "";
    var LogType = "Service";
    const dispatched = [
        { ID: "Email", value: "Email" },
        { ID: "Hardcopy", value: "Hardcopy" },
        { ID: "Courier", value: "Courier" },
    ];

    const Log = [
        { ID: "Service", value: "Service" },
        { ID: "Product", value: "Product" },
    ]
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const ID = params.get("id");
    if (ID) {
        getProcessbyID();
    }

    getServiceLogs();
    function getServiceLogs() {
        const tableBody = $("#table-service-log tbody");
        const currentRowCount = tableBody.children("tr").length;
        const deleteIcon = currentRowCount > 0 ? addDeleteIcon() : '';
        const options = `<option value="">Select Dispatched</option>` + dispatched.map((item) => `<option value="${item.ID}">${item.value}</option>`).join("");
        const Logs = `<option value="">Select Registration Log</option>` + Log.map((item) => `<option value="${item.ID}">${item.value}</option>`).join("");
        var getrowcontent = '<tr><td class="serial">' + (currentRowCount + 1) + '</td><td><div class="form-group"><input type="date" class="form-control RegistrationDate" id="RegistrationDate"></div></td><td><div class="form-group"><select class="form-control Type" id="Type" style="width:200px"> ' + Logs + '</select ></div ></td><td><div class="form-group"><input type="text" class="form-control Number" placeholder="Registration Number" id="Number" style="width:200px" autocomplete="off"></div></td><td><div class="form-group"><input type="text" class="form-control Reference" placeholder="PRF Reference" id="Reference" style="width:200px" autocomplete="off"></div></td><td><div class="form-group"><input type="text" class="form-control Name" placeholder="Company Name" autocomplete="off" id="Name" style="width:300px"></div></td><td><div class="form-group"><input type="text" class="form-control ContactType" placeholder="Client email/mobile" id="ContactType" style="width:200px" autocomplete="off"></div></td><td><div class="form-group"><textarea type="text" class="Details form-control" id="Details" placeholder="Project Details" style="width:350px" autocomplete="off"></textarea></div></td><td><div class="form-group"><input type="text" class="form-control Timelines" placeholder="Timelines" id="Timelines" style="width:200px" autocomplete="off"></div></td><td><div class="form-group"><input type="date" class="form-control StartDate" id="StartDate"></div></td><td><div class="form-group"><input type="date" class="form-control EndDate" id="EndDate"></div></td><td><div class="form-group"><input type="text" class="form-control Perform" autocomplete="off" placeholder="Performed By" id="Perform" style="width:200px"></div></td><td><div class="form-group"><input type="date" class="form-control ReportIssuedDate" id="ReportIssuedDate" ></div></td><td><div class="form-group"><select class="form-control dispatched" style="width:200px"> ' + options + '</select ></div ></td><td>' + deleteIcon + '</td></tr > ';
        $("#table-service-log tbody").append(getrowcontent);
    }
    function getServiceLog(values) {
        const tableBody = $("#table-service-log tbody");
        const currentRowCount = tableBody.children("tr").length;
        const deleteIcon = currentRowCount > 0 ? addDeleteIcon() : '';
        if (values) {
            if (values.RegistrationDate != null) {
                var completedDate = new Date(parseInt(values.RegistrationDate.replace("/Date(", "").replace(")/")));
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0!
                var yyyy = completedDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }
                var datef = yyyy + '-' + mm + '-' + dd;
            }
            else {
                datef = "";
            }
            if (values.StartDate != null) {
                var completedDate = new Date(parseInt(values.StartDate.replace("/Date(", "").replace(")/")));
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0!
                var yyyy = completedDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }
                var StartDate = yyyy + '-' + mm + '-' + dd;
            }
            else {
                StartDate = "";
            }
            if (values.EndDate != null) {
                var completedDate = new Date(parseInt(values.EndDate.replace("/Date(", "").replace(")/")));
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0!
                var yyyy = completedDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }
                var EndDate = yyyy + '-' + mm + '-' + dd;
            }
            else {
                EndDate = "";
            }
            if (values.createdon != null) {
                var completedDate = new Date(parseInt(values.createdon.replace("/Date(", "").replace(")/")));
                var dd = completedDate.getDate();
                var mm = completedDate.getMonth() + 1; //January is 0!
                var yyyy = completedDate.getFullYear();
                if (dd < 10) { dd = '0' + dd }
                if (mm < 10) { mm = '0' + mm }
                var createdon = yyyy + '-' + mm + '-' + dd;
            }
            else {
                createdon = "";
            }
            const options = `<option value="">Select Dispatched</option>` + dispatched.map((item) => `<option value="${item.ID}">${item.value}</option>`).join("");
            const Logs = `<option value="">Select Registration Log</option>` + Log.map((item) => `<option value="${item.ID}">${item.value}</option>`).join("");
            var getrowcontent = '<tr><td class="serial">' + (currentRowCount + 1) + '<input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"></td><td><div class="form-group"><input type="date" class="form-control RegistrationDate" value=' + datef + ' id="RegistrationDate"></div></td><td><div class="form-group"><select class="form-control Type" id="Type' + values.ID + '" style="width:200px"> ' + Logs + '</select ></div ></td><td><div class="form-group"><input type="text" class="form-control Number" placeholder="Registration Number" id="Number" value=' + values.Number + ' style="width:200px" autocomplete="off"></div></td><td><div class="form-group"><input type="text" class="form-control Reference" placeholder="PRF Reference" value=' + values.Reference + ' id="Reference" style="width:200px" autocomplete="off"></div></td><td><div class="form-group"><input type="text" class="form-control Name" placeholder="Company Name" autocomplete="off" value=' + values.Name + ' id="Name" style="width:300px"></div></td><td><div class="form-group"><input type="text" class="form-control ContactType" value=' + values.ContactType + ' placeholder="Client email/mobile" id="ContactType" style="width:200px" autocomplete="off"></div></td><td><div class="form-group"><textarea type="text" class="Details form-control" id="Details" placeholder="Project Details" style="width:350px" autocomplete="off">' + values.Details + '</textarea></div></td><td><div class="form-group"><input type="text" class="form-control Timelines" placeholder="Timelines" value="' + values.Timelines + '" id="Timelines" style="width:200px" autocomplete="off"></div></td><td><div class="form-group"><input type="date" class="form-control StartDate" id="StartDate"value=' + StartDate + '></div></td><td><div class="form-group"><input type="date" class="form-control EndDate" id="EndDate" value=' + EndDate + '></div></td><td><div class="form-group"><input type="text" class="form-control Perform" autocomplete="off" placeholder="Performed By" value=' + values.Perform + ' id="Perform" style="width:200px"></div></td><td><div class="form-group"><input type="date" class="form-control ReportIssuedDate" value=' + values.IssuedBy + ' id="ReportIssuedDate" ></div></td><td><div class="form-group"><select class="form-control dispatched" id="dispatched' + values.ID + '" style="width:200px"> ' + options + '</select ></div ></td><td>' + deleteIcon + '</td></tr > ';
            $("#table-service-log tbody").append(getrowcontent);
            if (values.Type != null) {
                $("#Type" + values.ID).val(values.Type.trim());
            }
            if (values.Dispatched != null) {
                $("#dispatched" + values.ID).val(values.Dispatched.trim());
            }
        } 
    }
    $("#table-service-log tbody").on("click", ".addrow", function () {
        getServiceLogs();
    });

    $("#table-service-log tbody").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
        setTimeout(() => {
            updateSerialNumbers()
        }, 1000)
    });

    $("#createRegistrationLog").submit((event) => {
        event.preventDefault();
        var gettablelength = $("#table-service-log tbody tr").length;
        if (gettablelength > 0) {
            var completedRequests = 0;
            for (var i = 0; i < gettablelength; i++) {
                var row = $("#table-service-log tbody tr").eq(i);
                var requestData = {
                    RegistrationDate: row.find(".RegistrationDate").val(),
                    ID: row.find(".txtid").val(),
                    Type: row.find(".Type").val(),
                    Number: row.find(".Number").val(),
                    Reference: row.find(".Reference").val(),
                    Name: row.find(".Name").val(),
                    ContactType: row.find(".ContactType").val(),
                    Details: row.find(".Details").val(),
                    Timelines: row.find(".Timelines").val(),
                    StartDate: row.find(".StartDate").val(),
                    EndDate: row.find(".EndDate").val(),
                    Perform: row.find(".Perform").val(),
                    Dispatched: row.find(".dispatched").val(),
                    IssuedBy: row.find(".ReportIssuedDate").val(),
                    AuthorId: ADMIN_AUTH,
                }
                $.ajax({
                    url: "https://api.pdca.in/Process/CreateProcessLog",
                    type: "POST",
                    data: requestData,
                    dataType: "json",
                    traditional: true,
                    crossDomain: true,
                    success: function (data) {
                        if (data.responsecode == 1) {
                            code = data.responseObject
                            completedRequests++
                        }
                        else {
                            ERROR_MESSAGE(data.responsemessage);
                        }
                    },
                    complete: function () {
                        if (completedRequests === gettablelength) {
                            SUCCESS_MESSAGE("Successfully submitted Log");
                            setTimeout(() => {
                                if (code == LogType) {
                                    location.href = './ProcessServiceLogList.html';
                                } else {
                                    location.href = './ProcessProductsLogList.html';
                                }
                            }, 1000)
                        }
                    }
                });
            }
        }
    });

    // -----------------------------------   Processlog GET START ---------------------------------------//
    function getProcessbyID() {
        $.ajax({
            url: "https://api.pdca.in/Process/getLogProcessbyID?AuthorId=" + ADMIN_AUTH + "&ID=" + ID,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            success: function (data) {
                $.each(data, function (index, values) {

                    //$("#qulty_tem_name").val(values.TemplateName).prop('readonly', true);


                    $("#table-service-log tbody").empty();
                    getServiceLog(values)
                });
            }

        });
    }
    // -----------------------------------   Processlog GET END ---------------------------------------//

    function updateSerialNumbers() {
        $("#table-service-log tbody tr").each(function (index) {
            $(this).find(".serial").text(index + 1);
        });
    }

    function addDeleteIcon() {
        return '<div class="deleterow mt-2" style="cursor:pointer"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div>'
    }
});