$(document).ready(function () {
    debugger;
    const CLIENT_AUTH = localStorage.getItem("Client_auth");
    $("#txtjobid").hide();
        $.ajax({
            url: "https://api.pdca.in/ClientJob/ClientJobsList?ClientID=" + CLIENT_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
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
                            '<input type="checkbox" disabled class="status-checkbox" data-id="' + values.id + '" ' +
                            (values.status === "green" ? "checked" : "") + '>' +
                            '<span></span>' +
                            '</label>' +
                            '</span>' +
                            '</td>' +
                            '<td class="d-flex">' +
                            '<a href="/client/regulations/editjob.html?id=' + values.id + '" id="' + values.id + '" class="btn edit">' +
                            '<i class="menu-icon flaticon2-edit text-info"></i></a>' +
                            '</td>' +
                            '</tr>';
                    


                    $("#table-id tbody").append(getdetails);
                })
            }
        });
    

    
});