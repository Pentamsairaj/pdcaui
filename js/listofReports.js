"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import commonAjaxCalls from './commanAjaxCalls.js';


// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {
    const CONVERT_JSON_TO_NORMAL_DATE = reUsableFunctions.ConvertJsonDateString;
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const Service_ID = localStorage.getItem("serviceid");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');
    if (ADMIN_NAME != "Admin" && ADMIN_NAME != "Manager") {
        $(".btn-primary").hide();
    };
    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//
    // ----------------------------------- APIs START ---------------------------------------//

    //const PRODUCE_LIST_URL = APIS.ListofProducts;
    const SERIVCE_LIST_URL = APIS.serviceList;
    const DELETE_PRODUCT_LIST_URL = APIS.deleteProductList;
    const LISTOFREPORT_CSV_DOWNLOAD = APIS.ListofReportExportExport
    //const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    // ----------------------------------- APIs END ---------------------------------------//
    // -----------------------------------   list of product START ---------------------------------------//
    $.ajax({
        url: `${SERIVCE_LIST_URL}?AdminID=${ADMIN_AUTH}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        beforeSend: function () {
            $("#spinnerOverlay").css("display", "flex");
            $("body").css("pointer-events", "none");
        },
        success: (data) => {
            console.log(data)
            $("#table-id tbody").empty();
            if (Object.keys(data).length > 0) {
                debugger;
                $.each(data, (index, value) => {
                    var license = ""
                    if (value.Outsourcedreport == null) {
                        license = "N/A"
                    }
                    else {
                        license = "<a href='" + value.Outsourcedreport + "' target='_blank'><button class='btn btn-primary' type='button'>View</button></a>"
                    }
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
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
            <input type="checkbox" class="status-checkbox" data-id="${value.ID}" 
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
                                  <td class="d-flex" ID=${value.ID}><button type="button" class="btn btn-success" ID="btnrowsave${value.ID}">save</button><a href='serviceSheetAllocation.html?ID=${value.ID}' class='btn edit'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> <span ID=${value.ID} class='Delete'><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></span></td>
                                  </tr>`;
                            $("#table-id tbody").append(newRow);
                        }
                        else {
                            let registation_date = CONVERT_JSON_TO_NORMAL_DATE(value.RegistraionDate);
                            if (registation_date == null) {
                                registation_date = '-';
                            }
                            const startDate = value.AnalysisStartDate ? moment(value.AnalysisStartDate).format('DD-MM-YYYY') : "-";
                            const endDate = value.AnalysisEndDate ? moment(value.AnalysisEndDate).format('DD-MM-YYYY') : "-";
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
            <input type="checkbox" class="status-checkbox" data-id="${value.ID}" 
                ${value.Status === "green" ? "checked" : ""}>
            <span></span>
        </label>
    </span>
</td>
                                  <td><a target="_blank" href=createTestReportPreview.html?ID=${value.ID}><button class="btn btn-primary" type="button">View</button> </a></td>
                                  <td>${license}</td>
                                 
                                  <td><input class="form-control Reviewedby"id=Reviewedby name=""></td>
                                  <td><input class="Reviewedon form-control"id=Reviewedon name=""type=date></td>
                                  <td><input class="form-control issuedby"id=issuedby name=""></td>
                                  <td><input class="issuedon form-control"id=issuedon name=""type=date></td>
                                  <td><input class="fromDate form-control"id=fromDate name=""type=date></td>
                                  <td><input class="toDate form-control"id=toDate name=""type=date></td>
                                  <td><textarea class="form-control Remarks" id=Remarks name="" type=text></textarea></td>
                                  <td class="d-flex" ID=${value.ID}><button type="button" class="btn btn-success" ID="btnrowsave${value.ID}">save</button><a href='serviceSheetAllocation.html?ID=${value.ID}' class='btn edit'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> <span ID=${value.ID} class='Delete'><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></span></td>
                                  </tr>`;
                            $("#table-id tbody").append(newRow);
                            $("#table-id tbody").on("click", `#btnrowsave${value.ID}`, function (e) {
                                debugger;
                                e.preventDefault();
                                var Reviewedby = $(this).closest("tr").find(".Reviewedby").val();
                                var Reviewedon = $(this).closest("tr").find(".Reviewedon").val();
                                var issuedby = $(this).closest("tr").find(".issuedby").val();
                                var issuedon = $(this).closest("tr").find(".issuedon").val();
                                var Remarks = $(this).closest("tr").find(".Remarks").val();
                                var AnalysisStartDate = $(this).closest("tr").find(".fromDate").val();
                                var AnalysisEndDate = $(this).closest("tr").find(".toDate").val();
                                var AdminID = ADMIN_AUTH;
                                var postdata = new FormData();

                                postdata.append('Reviewedby', Reviewedby);
                                postdata.append('ReviewedOn', Reviewedon);
                                postdata.append('ReportIssuedby', issuedby);
                                postdata.append('Reportissuedon', issuedon);
                                postdata.append('AnalysisEndDate', AnalysisEndDate);
                                postdata.append('AnalysisStartDate', AnalysisStartDate);
                                postdata.append('Remarks', Remarks);
                                postdata.append('Service_ID', Service_ID);
                                postdata.append('AdminID', ADMIN_AUTH);
                                $.ajax({
                                    url: "https://api.pdca.in/Process/UpdateReport_FromList",
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
                                            var Service_ID = data.responseObject;
                                            location.reload();
                                        }
                                    }
                                });
                            })
                        }
                    }
                    else if (ADMIN_AUTH == "8d12f95b-e288-40f0-862d-035ba875162b") {
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
            <input type="checkbox" class="status-checkbox" data-id="${value.ID}" 
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
                                  <td class="d-flex" ID=${value.ID}><button type="button" class="btn btn-success" ID="btnrowsave${value.ID}">save</button><a href='serviceSheetAllocation.html?ID=${value.ID}' class='btn edit'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a></td>
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
            <input type="checkbox" class="status-checkbox" data-id="${value.ID}" 
                ${value.Status === "green" ? "checked" : ""}>
            <span></span>
        </label>
    </span>
</td>
                                  <td><a target="_blank" href=createTestReportPreview.html?ID=${value.ID}><button class="btn btn-primary" type="button">View</button> </a></td>
                                  <td>${license}</td>
                                 
                                  <td><input class="form-control Reviewedby"id=Reviewedby name=""></td>
                                  <td><input class="Reviewedon form-control"id=Reviewedon name=""type=date></td>
                                  <td><input class="form-control issuedby"id=issuedby name=""></td>
                                  <td><input class="issuedon form-control"id=issuedon name=""type=date></td>
                                  <td><input class="fromDate form-control"id=fromDate name=""type=date></td>
                                  <td><input class="toDate form-control"id=toDate name=""type=date></td>
                                  <td><textarea class="form-control Remarks" id=Remarks name="" type=text></textarea></td>
                                  <td class="d-flex" ID=${value.ID}><button type="button" class="btn btn-success" ID="btnrowsave${value.ID}">save</button><a href='serviceSheetAllocation.html?ID=${value.ID}' class='btn edit'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> </td>
                                  </tr>`;
                            $("#table-id tbody").append(newRow);
                            $("#table-id tbody").on("click", `#btnrowsave${value.ID}`, function (e) {
                                debugger;
                                e.preventDefault();
                                var Reviewedby = $(this).closest("tr").find(".Reviewedby").val();
                                var Reviewedon = $(this).closest("tr").find(".Reviewedon").val();
                                var issuedby = $(this).closest("tr").find(".issuedby").val();
                                var issuedon = $(this).closest("tr").find(".issuedon").val();
                                var Remarks = $(this).closest("tr").find(".Remarks").val();
                                var AnalysisStartDate = $(this).closest("tr").find(".fromDate").val();
                                var AnalysisEndDate = $(this).closest("tr").find(".toDate").val();
                                var AdminID = ADMIN_AUTH;
                                var postdata = new FormData();

                                postdata.append('Reviewedby', Reviewedby);
                                postdata.append('ReviewedOn', Reviewedon);
                                postdata.append('ReportIssuedby', issuedby);
                                postdata.append('Reportissuedon', issuedon);
                                postdata.append('AnalysisEndDate', AnalysisEndDate);
                                postdata.append('AnalysisStartDate', AnalysisStartDate);
                                postdata.append('Remarks', Remarks);
                                postdata.append('Service_ID', Service_ID);
                                postdata.append('AdminID', ADMIN_AUTH);
                                $.ajax({
                                    url: "https://api.pdca.in/Process/UpdateReport_FromList",
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
                                            var Service_ID = data.responseObject;
                                            location.reload();
                                        }
                                    }
                                });
                            })
                        }
                    } else {
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
            <input type="checkbox" class="status-checkbox" data-id="${value.ID}" 
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
                                  <td class="d-flex" ID=${value.ID}><button type="button" class="btn btn-success" ID="btnrowsave${value.ID}">save</button><a href='serviceSheetAllocation.html?ID=${value.ID}' class='btn edit'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a></td>
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
            <input type="checkbox" class="status-checkbox" data-id="${value.ID}" 
                ${value.Status === "green" ? "checked" : ""} disabled>
            <span></span>
        </label>
    </span>
</td>
                                  <td><a target="_blank" href=createTestReportPreview.html?ID=${value.ID}><button class="btn btn-primary" type="button">View</button> </a></td>
                                  <td>${license}</td>
                                 
                                  <td><input class="form-control Reviewedby"id=Reviewedby name=""></td>
                                  <td><input class="Reviewedon form-control"id=Reviewedon name=""type=date></td>
                                  <td><input class="form-control issuedby"id=issuedby name=""></td>
                                  <td><input class="issuedon form-control"id=issuedon name=""type=date></td>
                                  <td><input class="fromDate form-control"id=fromDate name=""type=date></td>
                                  <td><input class="toDate form-control"id=toDate name=""type=date></td>
                                  <td><textarea class="form-control Remarks" id=Remarks name="" type=text></textarea></td>
                                  <td class="d-flex" ID=${value.ID}><button type="button" class="btn btn-success" ID="btnrowsave${value.ID}">save</button><a href='serviceSheetAllocation.html?ID=${value.ID}' class='btn edit'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> </td>
                                  </tr>`;
                            $("#table-id tbody").append(newRow);
                            $("#table-id tbody").on("click", `#btnrowsave${value.ID}`, function (e) {
                                debugger;
                                e.preventDefault();
                                var Reviewedby = $(this).closest("tr").find(".Reviewedby").val();
                                var Reviewedon = $(this).closest("tr").find(".Reviewedon").val();
                                var issuedby = $(this).closest("tr").find(".issuedby").val();
                                var issuedon = $(this).closest("tr").find(".issuedon").val();
                                var Remarks = $(this).closest("tr").find(".Remarks").val();
                                var AnalysisStartDate = $(this).closest("tr").find(".fromDate").val();
                                var AnalysisEndDate = $(this).closest("tr").find(".toDate").val();
                                var AdminID = ADMIN_AUTH;
                                var postdata = new FormData();

                                postdata.append('Reviewedby', Reviewedby);
                                postdata.append('ReviewedOn', Reviewedon);
                                postdata.append('ReportIssuedby', issuedby);
                                postdata.append('Reportissuedon', issuedon);
                                postdata.append('AnalysisEndDate', AnalysisEndDate);
                                postdata.append('AnalysisStartDate', AnalysisStartDate);
                                postdata.append('Remarks', Remarks);
                                postdata.append('Service_ID', Service_ID);
                                postdata.append('AdminID', ADMIN_AUTH);
                                $.ajax({
                                    url: "https://api.pdca.in/Process/UpdateReport_FromList",
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
                                            var Service_ID = data.responseObject;
                                            location.reload();
                                        }
                                    }
                                });
                            })
                        }
                    }

                });
            };
            $('#table-id').DataTable();
        },
        complete: function () {
            $("#spinnerOverlay").hide();
            $("body").css("pointer-events", "auto");
        }
    });
    // -----------------------------------   SERVICE OFFER LIST END ---------------------------------------//

    $(document).on("change", ".status-checkbox", function () {
        let checkbox = $(this);
        let status = checkbox.prop("checked") ? "green" : "red";
        let row = checkbox.closest("tr");
        let id = checkbox.data("id");

        if (status === "green") {
            row.css("background-color", "#d4edda");
        } else {
            row.css("background-color", "#f8d7da");
        }
        // AJAX request to update status
        $.ajax({
            url: "http://localhost:56901/Process/update_status?AdminId=" + ADMIN_AUTH + "&id=" + id + "&status=" + status,
            type: "POST",
            //data: postdata,
            dataType: "json",
            traditional: true,
            crossDomain: true,
            beforeSend: function () {
                $("#spinnerOverlay").css("display", "flex");
                $("body").css("pointer-events", "none");
            },
            success: function (response) {
                console.log("Status updated successfully:", response);
            },
            error: function (xhr, status, error) {
                console.error("Error updating status:", error);
                alert("Failed to update status!");
            },
            complete: function () {
                $("#spinnerOverlay").hide();
                $("body").css("pointer-events", "auto");
            }
        });
    });
    // -----------------------------------   SERVICE OFFER DELETE START ---------------------------------------//
    $("#table-id").on("click", ".Delete", function () {
        debugger
        var id = $(this).attr("id");
        var result = confirm("Are you Sure? You Want to Delete");
        if (result) {
            $.ajax({
                url: "https://api.pdca.in/Process/Deleteproductlist?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                /*data: fileData,*/
                success: function (data) {
                    $(this).closest("tr").remove();
                    location.reload();
                }
            });
        }
    });

    $("#btnexportService").click(() => {

        $.ajax({
            url: `${LISTOFREPORT_CSV_DOWNLOAD}?AdminID=${ADMIN_AUTH}&downloadCsv =${true}`,
            type: "GET",
            dataType: "JSON",
            async: true,
            crossDomain: true,

            success: function (data) {
                var jsonObject = JSON.stringify(data);
                var ReportName = new Date().toString();
                Export_JSON_to_CSV(jsonObject, ReportName, true);
                /*  $('#csv').text(ConvertToCSV(jsonObject));*/
            },
        });
        return false;
    })

    function Export_JSON_to_CSV(JSONString, ReportName, isShowHeader) {
        // Show spinner
        $("#spinnerOverlay").css("display", "flex");
        $("body").css("pointer-events", "none");
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
                // Hide spinner
                $("#spinnerOverlay").hide();
                $("body").css("pointer-events", "auto");
            }
        }, 100); // Give time for spinner to render
    }

});


