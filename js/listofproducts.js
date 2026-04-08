"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';


import commonAjaxCalls from './commanAjaxCalls.js';


// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const logoUrl = 'data:image/png;base64,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'; // Change this to your logo URL

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//

    // ----------------------------------- APIs START ---------------------------------------//

    //const PRODUCE_LIST_URL = APIS.ListofProducts;
    const PRODUCT_LIST_URL = APIS.productList;
    const PRODUCT_LIST_URL_EXPORT = APIS.ListofProductsexportExport;
    const DELETE_PRODUCT_LIST_URL = APIS.deleteProductList;

    //const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    // ----------------------------------- APIs END ---------------------------------------//
    // -----------------------------------   list of product START ---------------------------------------//

    $.ajax({
        url: `${PRODUCT_LIST_URL}?AdminID=${ADMIN_AUTH}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        beforeSend: function () {
            $("#spinnerOverlay").css("display", "flex");
            $("body").css("pointer-events", "none");
        },
        success: (data) => {

            $("#table-id tbody").empty();
            if (Object.keys(data).length > 0) {

                $.each(data, (index, value) => {
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        const startDate = value.AnalysisStartDate ? moment(value.AnalysisStartDate).format('DD-MM-YYYY') : "N/A";
                        const endDate = value.AnalysisEndDate ? moment(value.AnalysisEndDate).format('DD-MM-YYYY') : "N/A";
                        var license = ""
                        if (value.Testreports == null) {
                            license = "N/A"
                        }
                        else {
                            license = "<a href='" + value.Testreports + "' target='_blank'><button class='btn btn-primary' type='button'>View</button> </a>"
                        }
                        let newRow = `<tr>
                                  <td>${++index}</td>
                                  <td>${value.Process_JobID}</td>
                                  <td>${value.productname}</td>
                                  <td>${value.CompanyName}</td>
                                  <td>${value.EmpName}</td>
                                 <td>${startDate}</td>
                                  <td>${endDate}</td>
                                   <td>${license}</td>
                                <td>
    <span class="switch switch-primary">
        <label>
            <input type="checkbox" class="status-checkbox" data-id="${value.ID}" 
                ${value.Status === "green" ? "checked" : ""}>
            <span></span>
        </label>
    </span>
</td>
                                  <td ID=${value.ID} class="d-flex"><a href='productSheetAllocation.html?ID=${value.ID}'  class='btn edit'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> <span ID=${value.ID} class='Delete' style="cursor:pointer"><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></span></td>
                                 
                                  </tr>`;
                        $("#table-id tbody").append(newRow);
                    }
                    else if (ADMIN_AUTH == "8d12f95b-e288-40f0-862d-035ba875162b") {
                        const startDate = value.AnalysisStartDate ? moment(value.AnalysisStartDate).format('DD-MM-YYYY') : "N/A";
                        const endDate = value.AnalysisEndDate ? moment(value.AnalysisEndDate).format('DD-MM-YYYY') : "N/A";
                        var license = ""
                        if (value.Testreports == null) {
                            license = "N/A"
                        }
                        else {
                            license = "<a href='" + value.Testreports + "' target='_blank'><button class='btn btn-primary' type='button'>View</button> </a>"
                        }
                        let newRow = `<tr>
                                  <td>${++index}</td>
                                  <td>${value.Process_JobID}</td>
                                  <td>${value.productname}</td>
                                  <td>${value.CompanyName}</td>
                                  <td>${value.EmpName}</td>
                                  <td>${startDate}</td>
                                  <td>${endDate}</td>
                                  <td>${license}</td>
                                 <td>
    <span class="switch switch-primary">
        <label>
            <input type="checkbox" class="status-checkbox" data-id="${value.ID}" 
                ${value.Status === "green" ? "checked" : ""}>
            <span></span>
        </label>
    </span>
</td>
                                  <td ID=${value.ID} class="d-flex"><a href='productSheetAllocation.html?ID=${value.ID}'  class='btn edit'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> </td>
                                 
                                  </tr>`;
                        $("#table-id tbody").append(newRow);
                    } else {
                        {
                            const startDate = value.AnalysisStartDate ? moment(value.AnalysisStartDate).format('DD-MM-YYYY') : "N/A";
                            const endDate = value.AnalysisEndDate ? moment(value.AnalysisEndDate).format('DD-MM-YYYY') : "N/A";
                            var license = ""
                            if (value.Testreports == null) {
                                license = "N/A"
                            }
                            else {
                                license = "<a href='" + value.Testreports + "' target='_blank'><button class='btn btn-primary' type='button'>View</button> </a>"
                            }
                            let newRow = `<tr>
                                  <td>${++index}</td>
                                  <td>${value.Process_JobID}</td>
                                  <td>${value.productname}</td>
                                  <td>${value.CompanyName}</td>
                                  <td>${value.EmpName}</td>
                                  <td>${startDate}</td>
                                  <td>${endDate}</td>
                                  <td>${license}</td>
                                 <td>
    <span class="switch switch-primary">
        <label>
            <input type="checkbox" class="status-checkbox" data-id="${value.ID}" 
                ${value.Status === "green" ? "checked" : ""} disabled>
            <span></span>
        </label>
    </span>
</td>
                                  <td ID=${value.ID} class="d-flex"><a href='productSheetAllocation.html?ID=${value.ID}'  class='btn edit'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></a> </td>
                                 
                                  </tr>`;
                            $("#table-id tbody").append(newRow);
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

    // -----------------------------------   qualityjoblist END ---------------------------------------//

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
            url: "https://api.pioneerfoods.in/Process/update_status?AdminId=" + ADMIN_AUTH + "&id=" + id + "&status=" + status,
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

    // -----------------------------------   qualityjoblist DELETE START ---------------------------------------//

    $("#table-id").on("click", ".download_pdf", function () {
        const row = $(this).closest("tr");
        const data = {
            JobID: row.find("td:eq(1)").text(),
            ProductName: row.find("td:eq(2)").text(),
            CompanyName: row.find("td:eq(3)").text(),
            EmployeeName: row.find("td:eq(4)").text(),
            StartDate: row.find("td:eq(5)").text(),
            EndDate: row.find("td:eq(6)").text(),
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
        doc.text("Product Information", 60, 20);

        // Add data as table format
        const tableHeaders = ["Property", "Value"];
        const tableData = [
            ["Job ID", data.JobID],
            ["Product Name", data.ProductName],
            ["Company Name", data.CompanyName],
            ["Employee Name", data.EmployeeName],
            ["Start Date", data.StartDate],
            ["End Date", data.EndDate],
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

    $("#btnexportService").click(() => {

        $.ajax({
            url: `${PRODUCT_LIST_URL_EXPORT}?AdminID=${ADMIN_AUTH}&downloadCsv =${true}`,
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


    $("#table-id").on("click", ".Delete", function () {

        var id = $(this).attr("id");
        var result = confirm("Are you Sure? You Want to Delete");
        if (result) {
            $.ajax({
                url: "https://api.pioneerfoods.in/Process/Deleteproductlist?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
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
// -----------------------------------   SERVICE OFFER DELETE END ---------------------------------------//