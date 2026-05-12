
"use strict";

import APIS from './api.js';

$(() => {

    const REGULATION_CSV_DOWNLOAD = APIS.GetjobExportExport
    const REGULATION_CSV_DOWNLOAD_EMP = APIS.GetjobExportExportemp
    const logoUrl = 'data:image/png;base64,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'; // Change this to your logo URL

    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');
    if (ADMIN_NAME != "Admin" && ADMIN_NAME != "Manager" && ADMIN_NAME != "CRM Executive") {
        $(".btn-primary").hide();
    };
    $("#txtjobid").hide();
    getlist();
    function getlist() {
        debugger;
        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1" || ADMIN_AUTH == "8d12f95b-e288-40f0-862d-035ba875162b") {
            $.ajax({
                url: "https://api.pdca.in/Job/GetjobList?AdminId=" + ADMIN_AUTH,
                type: "GET",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                //data: fileData,
                beforesend: () => {
                    $(".spinner_loading").show();
                    $("#kt_content, .card").css("opacity", "0.1");

                },
                success: function (data) {

                    $("#table-id tbody").empty();
                    var sno = 1;
                    $.each(data, function (index, values) {
                        if (values.AnnualDuedate !== "N/A") {
                            var AnnualDuedate = values.AnnualDuedate
                                ? moment(values.AnnualDuedate, [
                                    "DD-MM-YYYY HH:mm:ss Z",  // Matches "31-03-2025 00:00:00 +00:00"
                                    "M/D/YYYY h:mm:ss A Z"    // Matches "3/31/2025 12:00:00 AM +00:00"
                                ]).format("DD-MM-YYYY")
                                : "N/A";
                        } else {
                            var AnnualDuedate = "N/A";
                        }

                        if (values.LicenceDuedate != "N/A") {
                            var LicenceDuedate = values.LicenceDuedate ? moment(values.LicenceDuedate, "YYYY-MM-DD").format('DD-MM-YYYY') : "N/A";
                        } else {
                            var LicenceDuedate = "N/A";
                        }
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
                        var license = ""
                        if (values.licensecopyupload == "NA") {
                            license = "N/A"
                        }
                        else {
                            license = "<a href='" + values.licensecopyupload + "' target='_blank'>Download</a>"
                        }
                        if (values.Days != null && values.Days != "-") {
                            if (values.Days < "0.23: 59: 59") {
                                values.Days = 1;
                            }
                            var timeRegex = /(\d+)\.(\d{2}):(\d{2}):(\d{2})/;
                            if (values.Days == "1") {
                                var match = 1;
                            }
                            else {
                                var match = values.Days.match(timeRegex);
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
                        if (ADMIN_AUTH === "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr>' +
                                '<td class="text-center" id="col0">' + sno++ + '</td>' +
                                '<td id="col1">' + values.clientuserid + '</td>' +
                                '<td id="col2">' + values.companyname + '</td>' +
                                '<td>' + values.jobid + '</td>' +
                                '<td>' + values.Employee + '</td>' +
                                '<td>' + datef + '</td>' +
                                '<td>' + datefs + '</td>' +
                                '<td>' + LicenceDuedate + '</td>' +
                                '<td>' + AnnualDuedate + '</td>' +
                                '<td>' + days + '</td>' +
                                '<td>' + license + '</td>' +
                                '<td>' +
                                '<span class="switch switch-primary">' +
                                '<label>' +
                                '<input type="checkbox" class="status-checkbox" data-id="' + values.id + '" ' +
                                (values.status === "green" ? "checked" : "") + '>' +
                                '<span></span>' +
                                '</label>' +
                                '</span>' +
                                '</td>' +
                                '<td class="d-flex">' +
                                '<a href="/regulations/editjob.html?id=' + values.id + '" id="' + values.id + '" class="btn edit">' +
                                '<i class="menu-icon flaticon2-edit text-info"></i></a>' +
                                '<span class="deleteRow mx-3" style="cursor:pointer" id="' + values.id + '">' +
                                '<i class="menu-icon flaticon2-rubbish-bin text-danger"></i></span>' +
                                '</td>' +
                                '</tr>';
                        } else {
                            var getdetails = '<tr>' +
                                '<td class="text-center" id="col0">' + sno++ + '</td>' +
                                '<td id="col1">' + values.clientuserid + '</td>' +
                                '<td id="col2">' + values.companyname + '</td>' +
                                '<td>' + values.jobid + '</td>' +
                                '<td>' + values.Employee + '</td>' +
                                '<td>' + datef + '</td>' +
                                '<td>' + datefs + '</td>' +
                                '<td>' + LicenceDuedate + '</td>' +
                                '<td>' + AnnualDuedate + '</td>' +
                                '<td>' + days + '</td>' +
                                '<td>' + license + '</td>' +
                                '<td>' +
                                '<span class="switch switch-primary">' +
                                '<label>' +
                                '<input type="checkbox" class="status-checkbox" data-id="' + values.id + '" ' +
                                (values.status === "green" ? "checked" : "") + '>' +
                                '<span></span>' +
                                '</label>' +
                                '</span>' +
                                '</td>' +
                                '<td>' +
                                '<a href="/regulations/editjob.html?id=' + values.id + '" id="' + values.id + '" class="btn edit">' +
                                '<i class="menu-icon flaticon2-edit text-info"></i></a>' +
                                '</td>' +
                                '</tr>';
                        }


                        $("#table-id tbody").append(getdetails);
                    })
                    $('#table-id').DataTable();
                },
                complete: () => {
                    $(".spinner_loading").hide();
                    $("#kt_content, .card").css("opacity", "")

                },

            });
        } else {
            $.ajax({
                url: "https://api.pdca.in/EmpJob/EmpJobsList?EmpID=" + ADMIN_AUTH,
                type: "GET",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                //data: fileData,
                beforesend: () => {
                    $(".spinner_loading").show();
                    $("#kt_content, .card").css("opacity", "0.1");

                },
                success: function (data) {

                    $("#table-id tbody").empty();
                    var sno = 1;
                    $.each(data, function (index, values) {
                        if (values.AnnualDuedate !== "N/A") {
                            var AnnualDuedate = values.AnnualDuedate
                                ? moment(values.AnnualDuedate, [
                                    "DD-MM-YYYY HH:mm:ss Z",  // Matches "31-03-2025 00:00:00 +00:00"
                                    "M/D/YYYY h:mm:ss A Z"    // Matches "3/31/2025 12:00:00 AM +00:00"
                                ]).format("DD-MM-YYYY")
                                : "N/A";
                        } else {
                            var AnnualDuedate = "N/A";
                        }


                        if (values.LicenceDuedate != "N/A") {
                            var LicenceDuedate = values.LicenceDuedate ? moment(values.LicenceDuedate, "YYYY-MM-DD").format('DD-MM-YYYY') : "N/A";
                        } else {
                            var LicenceDuedate = "N/A";
                        }
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
                        var license = ""
                        if (values.licensecopyupload == "NA") {
                            license = "N/A"
                        }
                        else {
                            license = "<a href='" + values.licensecopyupload + "' target='_blank'>Download</a>"
                        }
                        debugger;



                        if (values.Days != null && values.Days != "-") {
                            if (values.Days < "0.23: 59: 59") {
                                values.Days = 1;
                            }
                            var timeRegex = /(\d+)\.(\d{2}):(\d{2}):(\d{2})/;
                            if (values.Days == "1") {
                                var match = 1;
                            }
                            else {
                                var match = values.Days.match(timeRegex);
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
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td class="text-center" id="col0">' + sno++ + '</td><td id="col1">' + values.clientuserid + '</td><td id="col2">' + values.companyname + '</td><td>' + values.jobid + '</td><td>' + values.Employee + '</td><td>' + datef + '</td><td>' + datefs + '</td><td>' + LicenceDuedate + '</td><td>' + AnnualDuedate + '</td><td>' + days + '</td><td>' + license + '</td><td class"d-flex"><span class="switch switch-primary"><label> <input type="checkbox" class="status-checkbox" data-id="' + values.id + '" ' +(values.status === "green" ? "checked" : "") + '><span></span></label></span></td><td><a href="/regulations/editjob.html?id=' + values.id + '" id="' + values.id + '"  class="btn edit"><i class="menu-icon flaticon2-edit text-info"></i></a> <span class="deleteRow mx-3" style="cursor:pointer" id="' + values.id + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></span></td></tr>';
                        }
                        else {
                            var getdetails = '<tr><td class="text-center" id="col0">' + sno++ + '</td><td id="col1">' + values.clientuserid + '</td><td id="col2">' + values.companyname + '</td><td>' + values.jobid + '</td><td>' + values.Employee + '</td><td>' + datef + '</td><td>' + datefs + '</td><td>' + LicenceDuedate + '</td><td>' + AnnualDuedate + '</td><td>' + days + '</td><td>' + license + '</td><td><span class="switch switch-primary"><label> <input type="checkbox" class="status-checkbox" data-id="' + values.id + '" ' + (values.status === "green" ? "checked" : "") + ' disabled><span></span></label></span></td><td><a href="/regulations/editjob.html?id=' + values.id + '" id="' + values.id + '"  class="btn edit"><i class="menu-icon flaticon2-edit text-info"></i></a> </td></tr>';
                        }


                        $("#table-id tbody").append(getdetails);
                    })
                    $('#table-id').DataTable();
                },
                complete: () => {
                    $(".spinner_loading").hide();
                    $("#kt_content, .card").css("opacity", "")

                },

            });
        }
    }


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
            url: "https://api.pdca.in/Job/update_job_status?AdminId=" + ADMIN_AUTH + "&id=" + id + "&status=" + status,
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
            }, complete: function () {
                $("#spinnerOverlay").hide();
                $("body").css("pointer-events", "auto");
            }
        });
    });

    $("#table-id").on("click", ".download_pdf", function () {
        const row = $(this).closest("tr");
        const data = {
            clientuserid: row.find("td:eq(1)").text(),
            ProductName: row.find("td:eq(2)").text(),
            CompanyName: row.find("td:eq(3)").text(),
            EmployeeName: row.find("td:eq(4)").text(),
            createdon: row.find("td:eq(5)").text(),
            modifiedon: row.find("td:eq(6)").text(),
            License: row.find("td:eq(7)").text(),
            Status: $(this).text()
        };

        // Generate PDF using jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add left-side logo (replace the image source with your logo URL or base64)

        doc.addImage(logoUrl, 'PNG', 10, 10); // Position and size the logo

        // Set title
        doc.setFontSize(18);
        doc.text("List of Product", 60, 20);

        // Add data as table format
        const tableHeaders = ["Property", "Value"];
        const tableData = [
            ["Product ID", data.clientuserid],
            ["Product Name", data.ProductName],
            ["Company Name", data.CompanyName],
            ["Employee Name", data.EmployeeName],
            ["From Date", data.createdon],
            ["End Date", data.modifiedon],
            ["License", data.License],
            ["Status", data.Status]
        ];

        // Add the table
        doc.autoTable({
            head: [tableHeaders],  // Table headers
            body: tableData,       // Table rows
            startY: 50,            // Position the table
            theme: 'grid',         // Table style
            headStyles: { fillColor: [22, 160, 133] }, // Header style (optional)
            margin: { top: 2 }    // Margins for the table
        });

        // Get current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();  // Formats as 'MM/DD/YYYY, HH:MM:SS'

        // Add date and time at the bottom
        doc.setFontSize(10);
        doc.text(`Generated on: ${formattedDate}`, 10, doc.internal.pageSize.height - 10);

        // Save the PDF
        doc.save(`Row-${data.JobID}.pdf`);
    });

    $("#table-id").on("click", ".deleteRow", function () {
        var id = $(this).attr("id");
        $.ajax({
            url: "https://api.pdca.in/Job/Job_Delete?AdminId=" + ADMIN_AUTH + "&id=" + id + "",
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $(this).closest("tr").remove();
                getlist();
            }
        });
    });

    $("#btnexportService").on('click', () => {
        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
            $.ajax({
                url: `${REGULATION_CSV_DOWNLOAD}?AdminID=${ADMIN_AUTH}&downloadCsv =${true}`,
                type: "GET",
                dataType: "JSON",
                async: true,
                crossDomain: true,
                beforesend: () => {
                    $(".spinner_loading").show();
                },
                success: function (data) {
                    var jsonObject = JSON.stringify(data);
                    var ReportName = new Date().toString();
                    Export_JSON_to_CSV(jsonObject, ReportName, true);
                    /*  $('#csv').text(ConvertToCSV(jsonObject));*/
                },
                complete: () => {
                    $(".spinner_loading").hide();

                }
            });
            return false;
        } else {
            $.ajax({
                url: `${REGULATION_CSV_DOWNLOAD_EMP}?EmpID=${ADMIN_AUTH}&downloadCsv =${true}`,
                type: "GET",
                dataType: "JSON",
                async: true,
                crossDomain: true,
                beforesend: () => {
                    $(".spinner_loading").show();
                },
                success: function (data) {
                    var jsonObject = JSON.stringify(data);
                    var ReportName = new Date().toString();
                    Export_JSON_to_CSV(jsonObject, ReportName, true);
                    /*  $('#csv').text(ConvertToCSV(jsonObject));*/
                },
                complete: () => {
                    $(".spinner_loading").hide();

                }
            });
            return false;
        }
    })

    function Export_JSON_to_CSV(JSONString, ReportName, isShowHeader) {
        // Show the spinner
        document.querySelector(".spinner_loading").style.display = "block";

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
                document.querySelector(".spinner_loading").style.display = "none";
            }
        }, 100); // Give time for spinner to render
    }

});