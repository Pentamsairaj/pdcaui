"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//


import { getPagination } from './pagination.js';


// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {
    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//

  
    const GET_PAGINATION = getPagination;
   

$(document).ready(function () {
    
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    $("#ddjobid").hide();
    getlist();
    function getlist() {
        debugger;
        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
            $.ajax({
                url: "https://api.pioneerfoods.in/Quality_Template/List_Template?AdminId=" + ADMIN_AUTH,
                type: "GET",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                //data: fileData,
                success: function (data) {

                    $("#table-id tbody").empty();
                    var sno = 1;
                    $.each(data, function (index, values) {
             
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td class="text-center" id="col0">' + sno++ + '</td><td id="col1">' + values.TemplateName + '</td><td><a href="/qualityCompliance/quality_Template.html?id=' + values.ID + '" id="' + values.ID + '"  class="btn edit"><i class="menu-icon flaticon2-edit text-info"></i></a> <span class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></span></td></tr>';
                        }
                        else {
                            var getdetails = '<tr><td class="text-center" id="col0">' + sno++ + '</td><td id="col1">' + values.TemplateName + '</td><td><a href="/qualityCompliance/quality_Template.html?id=' + values.ID + '" id="' + values.ID + '"  class="btn edit"><i class="menu-icon flaticon2-edit text-info"></i></a> </td></tr>';
                        }



                        $("#table-id tbody").append(getdetails);
                    })
                    GET_PAGINATION("#table-id");
                    $('#table-id').DataTable();
                }
            });
        } else {
            debugger;
            $.ajax({
                url: "https://api.pioneerfoods.in/Quality_Template/List_Template?EmpID=" + ADMIN_AUTH,
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
                        var license = ""
                        if (values.certificatecopy == null) {
                            license = "N/A"
                        }
                        else {
                            license = "<a href='" + values.certificatecopy + "' target='_blank'><i class='fa-solid fa-eye' style='color: #74C0FC;'></i></a>"
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

                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td class="text-center" id="col0">' + sno++ + '</td><td id="col1">' + values.CompanyName + '</td><td id="col2">' + values.JobID + '</td><td>' + values.EmployeeName + '</td><td>' + datef + '</td><td>' + datefs + '</td><td>' + license + '</td><td>' + days + '</td><td><button style="background:' + values.FinalStatus + '">' + values.FinalStatus + '</button></td><td><div class="form-group"><textarea type="text" name="" class="form-control w-200px" >' + values.Remarks + '</textarea></div></td><td><a href="/qualityCompliance/QualityLevel-I.html?id=' + values.ID + '" id="' + values.ID + '"  class="btn edit"><i class="menu-icon flaticon2-edit text-info"></i></a> <span class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></span></td></tr>';
                        }
                        else {
                            var getdetails = '<tr><td class="text-center" id="col0">' + sno++ + '</td><td id="col1">' + values.CompanyName + '</td><td id="col2">' + values.JobID + '</td><td>' + values.EmployeeName + '</td><td>' + datef + '</td><td>' + datefs + '</td><td>' + license + '</td><td>' + days + '</td><td><button style="background:' + values.FinalStatus + '">' + values.FinalStatus + '</button></td><td><div class="form-group"><textarea type="text" name="" class="form-control w-200px" >' + values.Remarks + '</textarea></div></td><td><a href="/qualityCompliance/QualityLevel-I.html?id=' + values.ID + '" id="' + values.ID + '"  class="btn edit"><i class="menu-icon flaticon2-edit text-info"></i></a> </td></tr>';
                        }



                        $("#table-id tbody").append(getdetails);
                    })
                    GET_PAGINATION("#table-id");
                    $('#table-id').DataTable();
                }
            });
        }
    }

    $("#table-id").on("click", ".deleteRow", function () {
       var id = $(this).attr("id");
       var result = confirm("Are you Sure? You Want to Delete");
       if (result) {
            $.ajax({
                url: "https://api.pioneerfoods.in/Quality_Template/Delete_Template?AdminId=" + ADMIN_AUTH + "&TemplateID=" + id + "",
                type: "POST",
                contentType: false, // Not to set any content header
           processData: false, // Not to process data
            /*data: fileData,*/
            success: function (data) {
                $(this).closest("tr").remove();
                location.reload();
                getlist();
             }
          });
       }
   });
});

});
//    $("#table-id").on("click", ".deleteRow", function () {
//        
//        var id = $(this).attr("id");
//        $.ajax({
//            url: "https://api.pioneerfoods.in/Quality/Deletelist?AdminId=" + ADMIN_AUTH + "&id=" + id + "",
//            type: "GET",
//            contentType: false, // Not to set any content header
//            processData: false, // Not to process data
//            //data: fileData,
//            success: function (data) {
//                $(this).closest("tr").remove();
//                getlist();
//            }
//        });
//    });
//});

