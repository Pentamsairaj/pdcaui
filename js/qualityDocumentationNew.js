"use strict";

import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getServiceFormData } from './getFormData.js';
import { getPagination } from './pagination.js';
import commonAjaxCalls from './commanAjaxCalls.js';
$(() => {
    const CONVERT_TO_PDF = APIS.convertToPdf;
    const QUALITYDOC_CSV_DOWNLOAD = APIS.qualityDocExport;
    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const EMPLOYEEE_DATA = APIS.getEmployeeData;
    var getQualityControl_data_all = [];
    const urls = window.location.search;
    const params = new URLSearchParams(urls);
    var getJobData = false;
    var docIdData = []
    var match_tab2 = []
    var match_tab3 = []
    var match_tab4 = []
    getJObID();
    var ID = ""
    const Level_data = [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" }
    ];
    const certificateType = [{ type: "new" }, { type: "survillance" }]
    /*table quality starts*/

    if (ADMIN_AUTH) {
        //   getDocId();
        getEmployees();
        getJObID();
        getclients();
        getlist();

    }
   
    getQualityControl();
    getQualityControl1();
    getQualityControl1main();
    getQualityControl2()
    getQualityControl3()
    getQualityControl4()
    getQualityControl5()
    const job_ID = params.get("id");
    if (job_ID != null) {
        $("#ddjobid").attr('disabled', 'disabled');
        $('#ddjobid').val(job_ID);
        $("#company_data").hide();
        $("#template_div").hide();
        $("#btnexportquailtydoc").show();
        getQualitySystemExecutionData()
    } else {
        $(document).ready(function () {
            $("#btnexportquailtydoc").hide();
        });
    }
    function getDocId() {
        
        var jobID = $("#ddjobid").val();
        $.ajax({
            url: "https://api.pdca.in/NewQualityManagement/DocID?AdminId=" + ADMIN_AUTH + "&jobID=" + jobID + "&type=" + 0,
            type: "get",
            contenttype: false,
            async: false,
            processdata: false,
            success: function (data) {
                
                docIdData = data;
                $("#ddclause").empty();
                $("#ddclause2").empty();
                var defaultoption = '<option value="" >select Doc ID</option>';
                $("#ddclause").append(defaultoption);
                $("#ddclause2").append(defaultoption);

                $.each(data, function (index, value) {
                    var getdetails = '<option value="' + value + '">' + value + '</option>';
                    $("#ddclause").append(getdetails);
                    $("#ddclause2").append(getdetails);
                });
            }
        });
    }
    function getDocIdlevel4() {
        
        var jobID = $("#ddjobid").val();
        $.ajax({
            url: "https://api.pdca.in/NewQualityManagement/DocID?AdminId=" + ADMIN_AUTH + "&jobID=" + jobID + "&type=" + 4,
            type: "get",
            contenttype: false,
            async: false,
            processdata: false,
            success: function (data) {
                
                docIdData = data;
                $("#ddclause3").empty();
                $("#ddclause4").empty();
                var defaultoption = '<option value="" >select Doc ID</option>';
                $("#ddclause3").append(defaultoption);
                $("#ddclause4").append(defaultoption);

                $.each(data, function (index, value) {
                    var getdetails = '<option value="' + value + '">' + value + '</option>';
                    $("#ddclause3").append(getdetails);
                    $("#ddclause4").append(getdetails);
                });
            }
        });
    }
    function getQualityControl(value) {
        
        const tableBody = $("#table-quality tbody");
        const currentRowCount = tableBody.children("tr").length;
        const deleteIcon = currentRowCount > 0 ? addDeleteIcon() : '';

        if (value != null) {
            if (value.DraftView) {
                var draftview = '<a class="alink" target="_blank" href="' + value.DraftView + '"><button class="btn btn-primary" type="button">View</button></a>';
            } else {
                var draftview = '';
            }
            if (value.Approveddocupload) {
                var Approveddocupload = '<a class="alink2" target="_blank" href="' + value.Approveddocupload + '"><button class="btn btn-primary" type="button">View</button></a>';
            } else {
                var Approveddocupload = '';
            }
            $(".editQualityHeading").show();
            const options = `<option value="">Level</option>` + Level_data.map((item) => `<option value="${item.id}" ${value.level == item.id ? "selected" : ""}>Level ${item.name}</option>`).join("");
            var getrowcontent = '<tr data-row-id=' + value.ID + '><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+"></td><td class="serial">' + (currentRowCount + 1) + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Name of Document" value="" edit_id=' + value.ID + '>' + value.NameoftheDoc + ' </textarea></div></td><td><div class="form-group"><select class="form-control level level_styles" id="level" name =""> ' + options + '</select ></div ></td><td><div class="form-group"><input class="form-control DocId level_styles" id="DocId" name="" style="" placeholder="Doc ID." value="' + value.DocId + '"></div></td><td><input class="w-300px form-control DocUploadPdf mb-2" id="DocUpload" aria-describedby="inputGroupFileAddon" type="file"><div class=form-group id="draftdocview">' + draftview + '</div></td><td><div class="form-group"><input class="form-control clause level_styles" id="clause" name="" style="" placeholder="Clause No." value="' + value.clause + '"></div></td><td><div class=form-group><input class="w-300px form-control Approveddocupload mb-2" id="Approveddocupload" aria-describedby="inputGroupFileAddon" type="file">' + Approveddocupload + '</div></td><td>' + deleteIcon + '</td></tr > ';
            $("#table-quality tbody").append(getrowcontent);
        }
        else {
            const options = `<option value="">Level</option>` + Level_data.map((item) => `<option value="${item.id}">Level ${item.name}</option>`).join("");
            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+"></td><td class="serial">' + (currentRowCount + 1) + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Name of Document" value=""></textarea></div></td><td><div class="form-group"><select class="form-control level level_styles" id="level" name="">' + options + '</select></div></td><td><div class="form-group"><input class="form-control DocId level_styles docId_duplicate" id="DocId" name="" style="" placeholder="Doc ID." value=""></div></td><td><div class="form-group"><input class="form-control clause level_styles" id="clause" name="" style="" placeholder="Clause No."></div></td><td>' + deleteIcon + '</td></tr>';
            $("#table-quality tbody").append(getrowcontent);
        };
    }
    $("#table-quality tbody").on("click", ".addrow", function () {
        getQualityControl();
    });

    $("#table-quality tbody").on("click", ".deleterow", function () {
        
        if ($(this).closest("tr").attr("data-row-id")) {
            docIdData.push($(this).closest("tr").find(".DocId").val())
            var id = $(this).closest("tr").attr("data-row-id")
            $.ajax({
                url: "https://api.pdca.in/NewQualityManagement/DeleteQualityDoc?AdminId=" + ADMIN_AUTH + "&ID=" + id,
                type: "POST",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                /*data: fileData,*/
                success: function (data) {
                    if (data.responsecode == 0) {
                        $("tr[data-row-id='" + id + "']").remove();
                        alert("Record Deleted Succesfuly")
                    }
                }
            });
        } else {
            $(this).closest("tr").remove();
        } updateSerialNumbers();
    });

    function updateSerialNumbers() {
        
        $("#table-quality tbody tr").each(function (index) {
            $(this).find(".serial").text(index + 1);
        });
    }

    function addDeleteIcon() {
        
        return '<div class="deleterow mt-2" style="cursor:pointer"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div>'
    }

    $("#table-quality tbody").on("blur", ".docId_duplicate", function () {
        const DocIdInput = $(this).closest("tr").find(".DocId").val();
        $.each(docIdData, function (index, data) {
            if (data == DocIdInput) {
                this.value = ''
                alert('Doc ID is already there');
                return false;
            }
        });

    });

    //$('#table-quality').on('change', '.DocUploadPdf', function () {
    //    
    //    let $row = $(this).closest("tr");
    //    let file1 = $row.find(".DocUploadPdf")[0].files[0];
    //    let DocId = $row.find(".DocId").val();
    //    let ID = $row.find(".NameoftheDoc").attr("edit_id");
    //    var job_ID = $("#ddjobid").val();
    //    if (!file1) {
    //        alert("Please select a file.");
    //        return;
    //    }

    //    let formData = new FormData();
    //    formData.append("File", file1);
    //    formData.append("JobId", job_ID);
    //    formData.append("DocId", DocId);
    //    formData.append("ID", ID);

    //    $.ajax({
    //        url: "https://api.pdca.in/NewQualityManagement/ConvertToPdf",
    //        type: "POST",
    //        data: formData,
    //        contentType: false,
    //        processData: false,
    //        success: function (data) {
    //            if (data.responsecode === 1) {
    //                let $targetRow = $(`#table-quality tbody tr[data-row-id="${ID}"]`);
    //                if ($targetRow.length) {
    //                    $targetRow.find('.alink').attr('href', data.responseObject);
    //                }
    //                SUCCESS_MESSAGE(data.responsemessage)
    //            } else {
    //                ERROR_MESSAGE(data.responsemessage)
    //                alert("Error: " + data.responsemessage);
    //            }
    //        },
    //        error: function (xhr, status, error) {
    //            console.error(error);
    //            alert("An error occurred while processing the request.");
    //        }
    //    });
    //});

    /*table quality ends*/

    /*table quality 1 starts*/
    function getQualityControldata(getvalue) {
        
        var jobID = $("#ddjobid").val();
        $("#view_approv_document").empty();
        $.ajax({
            url: "https://api.pdca.in/NewQualityManagement/getQualityDocsList?AdminId=" + ADMIN_AUTH + "&jobID=" + jobID + "&DocId=" + getvalue,
            type: "get",
            contenttype: false,
            processdata: false,
            success: function (value) {
                if (value.Approveddocupload) {
                    var view_approv_doc = '<a href="' + value.Approveddocupload + '" target="_blank"><button class="btn btn-primary" type="button">View</button></a>'
                    $("#view_approv_document").append(view_approv_doc);
                } else {
                    $("#view_approv_document").empty();
                }
            }
        });
    }
    function getQualityControldataskill(getvalue) {
        
        var jobID = $("#ddjobid").val();
        $("#view_approv_Skill_document").empty();
        $.ajax({
            url: "https://api.pdca.in/NewQualityManagement/getQualityDocsList?AdminId=" + ADMIN_AUTH + "&jobID=" + jobID + "&DocId=" + getvalue,
            type: "get",
            contenttype: false,
            processdata: false,
            success: function (value) {
                if (value.Approveddocupload) {
                    var view_approv_doc = '<a href="' + value.Approveddocupload + '" target="_blank"><button class="btn btn-primary" type="button">View</button></a>'
                    $("#view_approv_Skill_document").append(view_approv_doc);
                } else {
                    $("#view_approv_Skill_document").empty();
                }
            }
        });
    }
    function getQualityControldataTAB4(getvalue) {
        
        var jobID = $("#ddjobid").val();

        // Ensure jobID is not null/undefined
        if (!jobID) {
            console.error("Job ID is missing!");
            return;
        }

        $.ajax({
            url: "https://api.pdca.in/NewQualityManagement/getQualityDocsList?AdminId=" + ADMIN_AUTH + "&jobID=" + jobID + "&DocId=" + getvalue,
            type: "GET",
            data: {
                AdminId: ADMIN_AUTH,
                jobID: jobID,
                DocId: getvalue
            },
            contentType: false,
            processData: false,
            success: function (value) {
                // Ensure value is valid
                if (!value) {
                    console.error("Invalid response from server");
                    return;
                }

                // Ensure `i` is defined
                var i = 0; // You may need to set this dynamically based on your table rows

                $("#table-quality3 tbody tr").eq(i).find("#NameoftheDoc1").val(value.NameoftheDoc);
                $("#table-quality3 tbody tr").eq(i).find("#ClauseNo1").val(value.clause);

                $(".view4tabdoc").empty();
                if (value.Approveddocupload) {
                    var view_approv_doc = '<a href="' + value.Approveddocupload + '" target="_blank">' +
                        '<button class="btn btn-primary" type="button">View</button></a>';
                    $(".view4tabdoc").append(view_approv_doc);
                } else {
                    $(".view4tabdoc").append('<p>No document available</p>');
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error: " + status + " - " + error);
            }
        });
    }
    function getQualityControldataTAB5(getvalue) {
        
        var jobID = $("#ddjobid").val();

        // Ensure jobID is not null/undefined
        if (!jobID) {
            console.error("Job ID is missing!");
            return;
        }

        $.ajax({
            url: "https://api.pdca.in/NewQualityManagement/getQualityDocsList?AdminId=" + ADMIN_AUTH + "&jobID=" + jobID + "&DocId=" + getvalue,
            type: "GET",
            data: {
                AdminId: ADMIN_AUTH,
                jobID: jobID,
                DocId: getvalue
            },
            contentType: false,
            processData: false,
            success: function (value) {
                // Ensure value is valid
                if (!value) {
                    console.error("Invalid response from server");
                    return;
                }

                // Ensure `i` is defined
                var i = 0; // You may need to set this dynamically based on your table rows

                $("#table-quality4 tbody tr").eq(i).find("#NameoftheDoc2").val(value.NameoftheDoc);
                $("#table-quality4 tbody tr").eq(i).find("#ClauseNo2").val(value.clause);

                $(".view5tabdoc").empty();
                if (value.Approveddocupload) {
                    var view_approv_doc = '<a href="' + value.Approveddocupload + '" target="_blank">' +
                        '<button class="btn btn-primary" type="button">View</button></a>';
                    $(".view5tabdoc").append(view_approv_doc);
                } else {
                    $(".view5tabdoc").append('<p>No document available</p>');
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error: " + status + " - " + error);
            }
        });
    }

    function getQualityControl1(value) {
        

        const tableBody = $("#table-quality1 tbody");
        const currentRowCount = tableBody.children("tr").length;
        const deleteIcon = currentRowCount > 0 ? addDeleteIcon1() : '';

        if (value != null) {
            if ($("#ddclause option[value='" + value.ClauseNo + "']").length > 0) {
                $("#ddclause").val(value.ClauseNo);
            }
            const startDate = value.Dateoftrainingstart ? moment(value.Dateoftrainingstart).format("YYYYY-MM-DD") : "N/A";
            const options = `<option value="">Level</option>` + Level_data.map((item) => `<option value="${item.id}" ${value.TypeOfTraining == item.id ? "selected" : ""}>Level ${item.name}</option>`).join("");
            var getrowcontent = '<tr data-row-id="' + value.ID + '"><td><input class="add addrow1 border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+"></td><td class="serial">' + (currentRowCount + 1) + '</td><td><div class="form-group"><textarea type="text" name="" id="DocumentName" class="DocumentName form-control nameofdocument_styles" placeholder="Name of the Document" value="" edit_id=' + value.ID + '> ' + value.DocumentName + ' </textarea></div></td><td><div class="form-group"><select class="form-control TypeOfTraining level_styles" id="TypeOfTraining" name="">' + options + '</select></div></td><td><div class="form-group"><input type="date" name="" id="Dateoftrainingstart" class="nccaDetail form-control level_styles Dateoftrainingstart"  value=' + startDate + '></div></td><td><div class="form-group"><input type="date" name="" id="topicoftrainingEnd" class="nccaDetail form-control level_styles topicoftrainingEnd" value=' + value.topcoftrainingEnd + '></div></td><td><input class="w-300px form-control DocUpload mb-2" id="DocUpload" aria-describedby="inputGroupFileAddon01" type="file"><a href="' + value.DocUpload + '" target="_blank" class="btn btn-link"><button class="btn btn-primary" type="button">View</button></a></td><td>' + deleteIcon + '</td></tr>';
            $("#table-quality1 tbody").append(getrowcontent);
        }
        else {
            const options = `<option value="">Level</option>` + Level_data.map((item) => `<option value="${item.id}">Level ${item.name}</option>`).join("");
            var getrowcontent = '<tr><td><input class="add addrow1 border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+"></td><td class="serial">' + (currentRowCount + 1) + '</td><td><div class="form-group"><textarea type="text" name="" id="DocumentName" class="DocumentName form-control nameofdocument_styles" placeholder="Name of the Document"></textarea></div></td><td><div class="form-group"><select class="form-control TypeOfTraining level_styles" id="TypeOfTraining" name="">' + options + '</select></div></td><td><div class="form-group"><input type="date" name="" id="Dateoftrainingstart" class="nccaDetail form-control level_styles Dateoftrainingstart"></div></td><td><div class="form-group"><input type="date" name="" id="topicoftrainingEnd" class="nccaDetail form-control level_styles topicoftrainingEnd"></div></td><td><input class="form-control w-300px DocUpload mb-2" id="DocUpload" aria-describedby="inputGroupFileAddon01" type="file"><a href="#" class="btn btn-primary viewButton disabled" >View</a></td><td>' + deleteIcon + '</td></tr>';
            $("#table-quality1 tbody").append(getrowcontent);
        }
    }

    $('#table-quality1').on('change', '.DocUpload', function () {
        
        const file = this.files[0];
        const viewButton = $(this).closest('tr').find('.viewButton');

        if (file.size > 3000000) {
            alert('Please choose a file less than 3MB')
            this.value = ''
            viewButton.removeData('fileURL').addClass('disabled');

        }
        else {
            if (file) {
                const fileURL = URL.createObjectURL(file);
                viewButton.data('fileURL', fileURL).removeClass('disabled');
            } else {
                viewButton.removeData('fileURL').addClass('disabled');
            }
        }

    });

    $('#table-quality1').on('click', '.viewButton', function () {
        const fileURL = $(this).data('fileURL');
        if (fileURL) {
            window.open(fileURL, '_blank');
        }
    });

    $("#table-quality1 tbody").on("click", ".addrow1", function () {
        getQualityControl1();

    });

    $("#table-quality1 tbody").on("click", ".deleterow1", function () {
        
        if ($(this).closest("tr").attr("data-row-id")) {
            docIdData.push($(this).closest("tr").find(".DocumentName").val())
            var id = $(this).closest("tr").attr("data-row-id")
            $.ajax({
                url: "https://api.pdca.in/NewQualityManagement/DeleteTrainingDoc?AdminID=" + ADMIN_AUTH + "&trainingDocID=" + id,
                type: "POST",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                /*data: fileData,*/
                success: function (data) {
                    if (data.responsecode == 0) {
                        $("tr[data-row-id='" + id + "']").remove();
                        alert("Record Deleted Succesfuly")
                    }
                }
            });
        } else {
            $(this).closest("tr").remove();
            setTimeout(() => {
                updateSerialNumbers1()
            }, 1000)
        }
    });

    function updateSerialNumbers1() {
        $("#table-quality1 tbody tr").each(function (index) {
            $(this).find(".serial").text(index + 1);
        });
    }

    function addDeleteIcon1() {
        return '<div class="deleterow1 mt-2" style="cursor:pointer"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div>'
    }

    function getQualityControl1main(value) {
        const tableBody = $("#table-quality1-main tbody");
        const currentRowCount = tableBody.children("tr").length;
        const deleteIcon = currentRowCount > 0 ? addDeleteIcon2() : '';

        if (value != null) {
            if ($("#ddclause2 option[value='" + value.ClauseNo + "']").length > 0) {
                $("#ddclause2").val(value.ClauseNo);
            }
            var getrowcontent = '<tr  data-row-id="' + value.ID + '"><td><input class="add addrow1-main border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+" ></td><td class="serial">' + (currentRowCount + 1) + '</td><td><div class="form-group"><input type="text" class="form-control EmployeeName" id="EmployeeName" style="width:270px" placeholder="Employee Name" value=' + value.EmployeeName + '></div></td><td><div class="form-group"><input type="text" class="form-control EmployeeID" id="EmployeeID" style="width:270px" placeholder="Employee ID" value=' + value.EmployeeID + '></div></td><td><div class="form-group"><input type="text" class="form-control Designation" id="Designation" style="width:270px" placeholder="Designation" value=' + value.Designation + '></div></td><td><div class="form-group"><input type="text" class="form-control Qualification" id="Qualification" style="width:270px" placeholder="Qualification/No of Years Experience" edit_id=' + value.ID + ' value=' + value.Qualification + '></div></td><td><input class="w-300px form-control uploadFile mb-2" id="uploadFile" aria-describedby="inputGroupFileAddon01" type="file"><a href="' + value.JDupload + '" target="_blank" class="btn btn-link"><button class="btn btn-primary" type="button">View</button></a></td><td>' + deleteIcon + '</td></tr>';
            $("#table-quality1-main tbody").append(getrowcontent);
        }
        else {
            var getrowcontent = '<tr><td><input class="add addrow1-main border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+"></td><td class="serial">' + (currentRowCount + 1) + '</td><td><div class="form-group"><input type="text" class="form-control EmployeeName" id="EmployeeName" style="width:270px" placeholder="Employee Name"></div></td><td><div class="form-group"><input type="text" class="form-control EmployeeID" id="EmployeeID" style="width:270px" placeholder="Employee ID"></div></td><td><div class="form-group"><input type="text" class="form-control Designation" id="Designation" style="width:270px" placeholder="Designation"></div></td><td><div class="form-group"><input type="text" class="form-control Qualification" id="Qualification" style="width:270px" placeholder="Qualification/No of Years Experience"></div></td><td><input class="w-300px form-control uploadFile mb-2" id="uploadFile" aria-describedby="inputGroupFileAddon01" type="file"> <a href="#" id="viewButton" class="btn btn-primary viewButton disabled">View</a></td><td>' + deleteIcon + '</td></tr>';
            $("#table-quality1-main tbody").append(getrowcontent);
        }

    }


    $('#table-quality1-main').on('change', '.uploadFile', function () {
        const file = this.files[0];
        const viewButton = $(this).closest('tr').find('.viewButton');

        if (file.size > 3000000) {
            alert('Please choose a file less than 3MB')
            this.value = ''
            viewButton.removeData('fileURL').addClass('disabled');

        }
        else {
            if (file) {
                const fileURL = URL.createObjectURL(file);
                viewButton.data('fileURL', fileURL).removeClass('disabled');
            } else {
                viewButton.removeData('fileURL').addClass('disabled');
            }
        }

    });
    $('#table-quality1-main').on('click', '.viewButton', function () {
        const fileURL = $(this).data('fileURL');
        if (fileURL) {
            window.open(fileURL, '_blank');
        }
    });

    $("#table-quality1-main").on("click", ".addrow1-main", function () {
        getQualityControl1main();
    });

    $("#table-quality1-main tbody").on("click", ".deleterow1-main", function () {
        if ($(this).closest("tr").attr("data-row-id")) {
            // docIdData.push($(this).closest("tr").find(".DocumentName").val())
            var id = $(this).closest("tr").attr("data-row-id")
            $.ajax({
                url: "https://api.pdca.in/NewQualityManagement/DeleteSkillDoc?AdminID=" + ADMIN_AUTH + "&skillDocID=" + id,
                type: "POST",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                /*data: fileData,*/
                success: function (data) {
                    if (data.responsecode == 0) {
                        $("tr[data-row-id='" + id + "']").remove();
                        alert("Record Deleted Succesfuly")
                    }
                }
            });
        } else {
            $(this).closest("tr").remove();
            setTimeout(() => {
                updateSerialNumbers2()
            }, 1000)
        }
    });

    function updateSerialNumbers2() {
        $("#table-quality1-main tbody tr").each(function (index) {
            $(this).find(".serial").text(index + 1);
        });
    }
    function addDeleteIcon2() {
        return '<div class="deleterow1-main mt-2" style="cursor:pointer"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div>'
    }
    /*table quality 1 ends*/

    $("#ddclient").change((event) => {
        var getvalue = $(event.target).val();
        if (getvalue.trim() == "0") {
            $("#company_data").show();
            $(document).ready(function () {
                $("#btnexportquailtydoc").hide();
            });
        }
        else {
            $("#jobid_data").hide();

        }
    });


    $("#ddjobid").change((event) => {
        getQualitySystemExecutionData();
        var getvalue = $(event.target).val();
        if (getvalue.trim() == "0") {
            $("#jobid_data").show();
            $(document).ready(function () {
                $("#btnexportquailtydoc").show();
            });
        }
        else {
            $("#company_data").hide();
            //getDocId();
        }
    })
    $(document).on("change", "#ddclause", (event) => {
        //var jobID = $("#ddjobid").val();
        var getvalue = $(event.target).val();

        getQualityControldata(getvalue);
        //if (getvalue.trim() == "0") {
        //    $("#jobid_data").show();
        //}
        //else {
        //    $("#company_data").hide();
        //    getDocId();
        //}
    })
    $(document).on("change", "#ddclause2", (event) => {
        var getvalue = $(event.target).val();

        getQualityControldataskill(getvalue);
    })
    $(document).on("change", "#ddclause3", (event) => {
        var getvalue = $(event.target).val();
        getQualityControldataTAB4(getvalue);
    });

    $(document).on("change", "#ddclause4", (event) => {
        var getvalue = $(event.target).val();

        getQualityControldataTAB5(getvalue);
    })
    function getAllTabsData(ID) {
        getJObID()
        var Id = ID
        $("#jobid_data").show();
        $("#ddjobid").val(Id)
        $("#btnexportquailtydoc").show();
        $(".ddjobid").prop("disabled", true);
        getDocId();
    }

    $("#createTemplateSubmit").submit((event) => {
        
        event.preventDefault();
        const form = $(event.target);
        if (form.data('isSubmitting')) {
            return;
        }

        form.data('isSubmitting', true);

        $(".spinner").show();
        setTimeout(() => {
            var checkexisting = $("#ddjobid").val();
            if (checkexisting == null || checkexisting == "null") {
                checkexisting = "0"
            }
            if (checkexisting == "0") {
                var CompanyName = $("#ddclient option:selected").text();
                var JobNo = $("#ddjobno").val();
                var ClientID = $("#ddclient").val();
                var EmpID = $("#ddlEmployee").val();
                var jobID = $("#ddjobid").val();
                var AdminID = ADMIN_AUTH;

                var postdata = {
                    "CompanyName": CompanyName,
                    "JobNo": JobNo,
                    "ClientID": ClientID,
                    "EmpID": EmpID,
                    "JobID": jobID,
                    "AdminID": AdminID
                }
                $.ajax({
                    url: "https://api.pdca.in/Quality/Create_Joballocation",
                    type: "POST",
                    data: postdata,
                    dataType: "json",
                    traditional: true,
                    crossDomain: true,
                    success: function (data) {
                        
                        if (data.responsecode == 1) {
                            var joballocation_ID = data.responseObject;
                            ID = joballocation_ID;
                            standardajax(joballocation_ID);
                            alert("Quality Documentation and Control Created Successfully");
                            var Template = localStorage.getItem("TemplateID")

                            $(".spinner").hide();
                            getAllTabsData(ID);
                            getDocId();
                            updateStep(2)
                        }
                        else {
                            alert(data.responsemessage);
                            updateStep(1)
                            $(".spinner").hide();
                        }
                    },
                    error: function () {
                        alert("An error occurred during the submission.");
                    },

                    complete: function () {
                        form.data('isSubmitting', false); // Reset flag
                    },
                });
            }
            else {
                
                var joballocation_ID = checkexisting;
                standardajax(joballocation_ID);
                ID = joballocation_ID;
                alert("Quality Documentation and Control Updated Successfully");
                getDocId();
                $(".spinner").hide();
                form.data('isSubmitting', false)
            }
        }, 2000);

    });

    function standardajax(joballocation_ID) {
        
        var gettablelength = $("#table-quality tbody tr").length;
        if (gettablelength > 0) {
            var completedRequests = 0;
            for (var i = 0; i < gettablelength; i++) {
                var joballocation_ID = joballocation_ID;
                var postdata = new FormData();

                //let fileLink = $("#table-quality tbody tr").eq(i).find(".alink").attr("href");

                //if (fileLink) {
                //    postdata.append('DraftView', fileLink);
                //} else {

                //}
                var fileInputElement = $("#table-quality tbody tr").eq(i).find(".DocUploadPdf")[0];
                var fileInputElement1 = $("#table-quality tbody tr").eq(i).find(".Approveddocupload")[0];

                if (fileInputElement && fileInputElement.files && fileInputElement.files.length > 0) {
                    postdata.append('DraftView', fileInputElement.files[0]);
                } else {
                    //console.warn("File input not found or no files selected.");
                }
                if (fileInputElement1 && fileInputElement1.files && fileInputElement1.files.length > 0) {
                    postdata.append('approveddoc', fileInputElement1.files[0]);
                } else {
                    //console.warn("File input not found or no files selected.");
                }

                var ID = $("#table-quality tbody tr").eq(i).find(".NameoftheDoc").attr("edit_id");

                if (ID != null) {
                    postdata.append('ID', ID);
                }

                else {
                    //do nothing
                }
                var NameoftheDoc = $("#table-quality tbody tr").eq(i).find(".NameoftheDoc").val();
                var level = $("#table-quality tbody tr").eq(i).find(".level").val();
                var DocId = $("#table-quality tbody tr").eq(i).find(".DocId").val();
                var clause = $("#table-quality tbody tr").eq(i).find(".clause").val();

                const level1 = parseInt(level);
                postdata.append('NameoftheDoc', NameoftheDoc);
                postdata.append('JobID', joballocation_ID);
                postdata.append('level', level1);
                postdata.append('DocId', DocId);
                postdata.append('clause', clause);
                postdata.append('AdminId', ADMIN_AUTH);
                $.ajax({
                    url: "https://api.pdca.in/NewQualityManagement/CreateOrUpdateQualityDoc",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {
                        if (data.responsecode == 0 || data.responsecode == 1) {
                            var joballocation_ID = data.responseObject;
                            completedRequests++
                        }
                        else {
                            console.error(data.responsemessage);
                        }
                    },
                    complete: function () {
                        if (completedRequests === gettablelength) {
                            setTimeout(() => {
                                $("#company_data").hide();
                            }, 1000)
                        }
                    }
                });
            }
        }
    }


    $("#createTemplateSubmit1").submit((event) => {
        event.preventDefault();
        const form = $(event.target);
        if (form.data('isSubmitting')) {
            return;
        }

        form.data('isSubmitting', true);
        $(".spinner").show();

        setTimeout(() => {
            training();
            form.data('isSubmitting', false);
        }, 2000);

    });
    function training() {
        
        var gettablelength = $("#table-quality1 tbody tr").length;
        if (gettablelength > 0) {
            var completedRequests = 0;
            for (var i = 0; i < gettablelength; i++) {
                var postdata = new FormData();
                var ID = $("#table-quality1 tbody tr").eq(i).find(".DocumentName").attr("edit_id");
                if (ID != null) {
                    postdata.append('ID', ID);
                }
                else {
                    //do nothing
                }
                var jobID = $("#ddjobid").val();

               
                var fileInputElement = $("#table-quality1 tbody tr").eq(i).find(".DocUpload")[0];

                if (fileInputElement && fileInputElement.files && fileInputElement.files.length > 0) {
                    postdata.append('DocUpload', fileInputElement.files[0]);
                } else {
                    //console.warn("File input not found or no files selected.");
                }
               
                var DocumentName = $("#table-quality1 tbody tr").eq(i).find(".DocumentName").val().trim();
                var TypeOfTraining = $("#table-quality1 tbody tr").eq(i).find(".TypeOfTraining").val().trim();
                var Dateoftrainingstart = $("#table-quality1 tbody tr").eq(i).find(".Dateoftrainingstart").val().trim();
                var topicoftrainingEnd = $("#table-quality1 tbody tr").eq(i).find(".topicoftrainingEnd").val().trim();
                const level1 = parseInt(TypeOfTraining);
                var ClauseNo = $("#ddclause").val().trim();
                //postdata.append('DocUpload', file);
                postdata.append('JobID', jobID);
                postdata.append('DocumentName', DocumentName);
                postdata.append('TypeOfTraining', level1);
                postdata.append('Dateoftrainingstart', Dateoftrainingstart);
                postdata.append('topicoftrainingEnd', topicoftrainingEnd);
                postdata.append('AdminId', ADMIN_AUTH);
                postdata.append('ClauseNo', ClauseNo);
                $.ajax({
                    url: "https://api.pdca.in/NewQualityManagement/CreateOrUpdateTrainingDoc",
                    type: "POST",
                    data: postdata,
                    async: true,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {

                        if (data.responsecode == 0) {
                            completedRequests++;
                        }
                        else {
                            setTimeout(() => {
                                alert(data.responsemessage);
                                $(".spinner").hide();
                                updateStep(2)

                            }, 1000)
                        }
                    },
                    error: function () {
                        alert('Something went wrong please try again later');
                        $(".spinner").hide();
                        updateStep(2)
                    },
                    complete: function () {
                        if (completedRequests === gettablelength) {
                            setTimeout(() => {
                                skillmatrix();
                            }, 1000)
                        }
                    }

                });
            }
        }
    }
    function skillmatrix() {
        
        var gettablelength = $("#table-quality1-main tbody tr").length;
        if (gettablelength > 0) {
            var completedRequests = 0;
            for (var i = 0; i < gettablelength; i++) {
                var postdata = new FormData();
                var ID = $("#table-quality1-main tbody tr").eq(i).find(".Qualification").attr("edit_id");
                if (ID != null) {
                    postdata.append('ID', ID);
                }
                else {
                    //do nothing
                }
                var jobID = $("#ddjobid").val();
                var fileInputElement = $("#table-quality1-main tbody tr").eq(i).find(".uploadFile")[0];

                if (fileInputElement && fileInputElement.files && fileInputElement.files.length > 0) {
                    postdata.append('JDupload', fileInputElement.files[0]);
                } else {
                    //console.warn("File input not found or no files selected.");
                }
                var EmployeeName = $("#table-quality1-main tbody tr").eq(i).find(".EmployeeName").val().trim();
                var EmployeeID = $("#table-quality1-main tbody tr").eq(i).find(".EmployeeID").val().trim();
                var Designation = $("#table-quality1-main tbody tr").eq(i).find(".Designation").val().trim();
                var Qualification = $("#table-quality1-main tbody tr").eq(i).find(".Qualification").val().trim();
                var ClauseNo = $("#ddclause2").val().trim();

                //postdata.append('JDupload', file);
                postdata.append('JobID', jobID);
                postdata.append('EmployeeName', EmployeeName);
                postdata.append('EmployeeID', EmployeeID);
                postdata.append('Designation', Designation);
                postdata.append('Qualification', Qualification);
                postdata.append('AdminId', ADMIN_AUTH);
                postdata.append('ClauseNo', ClauseNo);
                $.ajax({
                    url: "https://api.pdca.in/NewQualityManagement/CreateOrUpdateSkillDoc",
                    type: "POST",
                    data: postdata,
                    async: true,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {
                        if (data.responsecode == 0) {
                            completedRequests++;
                        }
                        else {
                            alert(data.responsemessage)
                            updateStep(2)

                        }
                    },
                    complete: function () {
                        if (completedRequests === gettablelength) {
                            //getJobData = true;
                            //if (ID == null) {
                            getQualitySystemExecutionData()
                            //getQualityControl2(value)
                            getQualityControl2_Data()
                            //getQualityControl2_Data();
                            //}
                            //else {
                            //    // this condition is usefull for when we edit data at that time 3rd tab records not overwrite
                            //}

                            $(".spinner").hide();
                            alert('Training and Skill Matrix Created Successfully')
                        }
                    }
                });
            }
        }

    }
    function getQualityControl2(value) {

        const tableBody = $("#table-quality2 tbody");
        const currentRowCount = tableBody.children("tr").length;
        const getIndex = currentRowCount + 1;
        if (value) {
            let multidocViewButtons = '';
            if (value.multidoc != null) {
                const multidocUrls = value.multidoc.split(',');
                multidocUrls.forEach(function (url, i) {
                    multidocViewButtons += `<a href="${url.trim()}" target="_blank" class="btn btn-primary btn-sm my-1">View ${i + 1}</a><br>`;
                });
            }
            if (value.Approveduplpdf) {
                var Approveduplpdf = '<a href=' + value.Approveduplpdf + ' target="_blank" class="btn btn-primary btn-sm" >View</a>';
            } else {
                var Approveduplpdf = '<a href="#" class="btn btn-primary viewButton disabled" >View</a>';
            }
            var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" tem_id="' + value.TemplateID + '" placeholder="Name of Document"> ' + value.Nameofthedoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type" name="" value="' + value.DocId + '" style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo" value="' + value.clause + '" name="" style="" placeholder="Clause No."></div></td><td><div>' + Approveduplpdf + '</div></td><td><input class="Draftformatfile w-300px form-control mb-2" id="certificateformatfile" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple><div>' + multidocViewButtons + '</div></td></tr>';
            $("#table-quality2 tbody").append(getrowcontent);
        }
        //const getIndex = currentRowCount + 1;
        //let matchedData = [];
        //let unmatchedData = [];

        //if (match_tab2 != null) {
        //    $.each(match_tab2, function (index, data) {
        //        if (data?.firs_table_ROWID == value.ID) {
        //            value.multidoc = data.multidoc;
        //            matchedData.push(value);
        //        }
        //        else {
        //            unmatchedData.push(value);
        //        }
        //    });
        //}
        //$.each(matchedData, function (index, value) {
        //    const tableBody = $("#table-quality2 tbody");
        //    const currentRowCount = tableBody.children("tr").length;
        //    const getIndex = currentRowCount + 1;
        //    let multidocViewButtons = '';
        //    if (value.multidoc != null) {
        //        const multidocUrls = value.multidoc.split(',');
        //        multidocUrls.forEach(function (url, i) {
        //            multidocViewButtons += `<a href="${url.trim()}" target="_blank" class="btn btn-primary btn-sm my-1">View ${i + 1}</a><br>`;
        //        });
        //    }
        //    var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary" > View</a ></div></td><td><input class="Draftformatfile w-300px form-control mb-2" id="certificateformatfile" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple><div>' + multidocViewButtons + '</div></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //    $("#table-quality2 tbody").append(getrowcontent);
        //});

        //$.each(unmatchedData, function (index, value) {
        //    const tableBody = $("#table-quality2 tbody");
        //    const currentRowCount = tableBody.children("tr").length;
        //    const getIndex = currentRowCount + 1;
        //    var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary" > View</a ></div></td><td><input class="Draftformatfile w-300px form-control mb-2" id="certificateformatfile" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //    $("#table-quality2 tbody").append(getrowcontent);
        //});

        //var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Name of Document"></textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo" placeholder="Clause No."></div></td><td><div><a href ="#" target = "_blank" class="btn btn-primary" >View</a></div></td><td><input class="Draftformatfile w-300px form-control mb-2" id="certificateformatfile" aria-describedby="inputGroupFileAddon01" type="file" accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //$("#table-quality2 tbody").append(getrowcontent);
        //var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary" > View</a ></div></td><td><input class="Draftformatfile w-300px form-control mb-2" id="certificateformatfile" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //$("#table-quality2 tbody").append(getrowcontent);
    }

    //$("#table-quality2").on("click", ".deleterow2", function () {
    //    $(this).closest("tr").remove();
    //});

    /*table quality 2 ends*/

    function getQualityControl2_Data() {
        const tableBody1 = $("#table-quality2 tbody");
        const currentRowCount = tableBody1.children("tr").length;
        const getIndex = currentRowCount + 1;
        tableBody1.empty();
        if (getQualityControl_data_all.length > 0) {
            if (getQualityControl_data_all[0].ExecutionDocs.length != null && getQualityControl_data_all[0].ExecutionDocs.length != 0) {
                $("#table-quality2 tbody").empty();
                getQualityControl_data_all[0].ExecutionDocs?.forEach((value) => {

                    getQualityControl2(value);
                })
            }
            else {
                const tableBody1 = $("#table-quality2 tbody");
                const currentRowCount = tableBody1.children("tr").length;
                const getIndex = currentRowCount + 1;
                var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Name of Document"></textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo" placeholder="Clause No."></div></td><td><div><a href="#" class="btn btn-primary viewButton disabled" >View</a></div></td><td><input class="Draftformatfile w-300px form-control mb-2" id="certificateformatfile" aria-describedby="inputGroupFileAddon01" type="file" accept="application/*" multiple></td></tr>';
                $("#table-quality2 tbody").append(getrowcontent);
            }
        } else {
            var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Name of Document"></textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo" placeholder="Clause No."></div></td><td><div><a href="#" class="btn btn-primary viewButton disabled" >View</a></div></td><td><input class="Draftformatfile w-300px form-control mb-2" id="certificateformatfile" aria-describedby="inputGroupFileAddon01" type="file" accept="application/*" multiple></td></tr>';
            $("#table-quality2 tbody").append(getrowcontent);
        }
    }

    function getQualityControl3_Data() {
        const tableBody1 = $("#table-quality3 tbody");
        const currentRowCount = tableBody1.children("tr").length;
        const getIndex = currentRowCount + 1;
        tableBody1.empty();
        if (getQualityControl_data_all.length > 0)
            if (getQualityControl_data_all[0].InternalAudits.length > 0) {
                $("#table-quality3 tbody").empty();
                getQualityControl_data_all[0].InternalAudits?.forEach((value) => {
                    getQualityControl3(value);
                })
                //getQualityControl_data_all[0].QualityDocs?.forEach((value) => {
                //    getQualityControl3(value);
                //})
            }
            else {
                $("#table-quality3 tbody").empty();
                const tableBody1 = $("#table-quality3 tbody");
                const currentRowCount = tableBody1.children("tr").length;
                const getIndex = currentRowCount + 1;
                var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc1" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Name of Document"></textarea></div></td><td><div class="col-md-12"><div class="form-group"><select id="ddclause3" class="form-control" ><option value="">Select DOC ID</option></select></div></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo1" style="" placeholder="Clause No."></div></td><td class="view4tabdoc"><div><a href="#" class="btn btn-primary viewButton disabled" >View</a></div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile1" aria-describedby="inputGroupFileAddon01" type="file" accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                $("#table-quality3 tbody").append(getrowcontent);
                getDocIdlevel4()
                $("#ddclause3").select2({
                    //placeholder: "Search here...",
                    allowClear: true,
                    width: '100%'
                });
            }
    }

    function getQualityControl4_Data() {
        const tableBody1 = $("#table-quality4 tbody");
        const currentRowCount = tableBody1.children("tr").length;
        const getIndex = currentRowCount + 1;
        tableBody1.empty();
        if (getQualityControl_data_all.length > 0)
            if (getQualityControl_data_all[0].ExternalAudits.length > 0) {
                $("#table-quality4 tbody").empty();
                getQualityControl_data_all[0].ExternalAudits?.forEach((value) => {
                    getQualityControl4(value);
                })
                //getQualityControl_data_all[0].QualityDocs?.forEach((value) => {
                //    getQualityControl4(value);
                //})
            }
            else {
                $("#table-quality4 tbody").empty();
                const tableBody1 = $("#table-quality4 tbody");
                const currentRowCount = tableBody1.children("tr").length;
                const getIndex = currentRowCount + 1;
                var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc2" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Name of Document"></textarea></div></td><td><div class="form-group"><select id="ddclause4" class="form-control" ><option value="">Select DOC ID</option></select></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo2" placeholder="Clause No."></div></td><td class="view5tabdoc"><div><a href="#" class="btn btn-primary viewButton disabled" >View</a></div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile2" aria-describedby="inputGroupFileAddon01" type="file" accept="application/*" multiple></td></tr>';
                $("#table-quality4 tbody").append(getrowcontent);
                getDocIdlevel4()
                $("#ddclause4").select2({
                    //placeholder: "Search here...",
                    allowClear: true,
                    width: '100%'
                });
            }
    }

    function getQualityControl3(value) {
        const tableBody = $("#table-quality3 tbody");
        const currentRowCount = tableBody.children("tr").length;
        const getIndex = currentRowCount + 1;
        if (value) {
            let multidocViewButtons = '';
            if (value.multidoc != null) {
                const multidocUrls = value.multidoc.split(',');
                multidocUrls.forEach(function (url, i) {
                    multidocViewButtons += `<a href="${url.trim()}" target="_blank" class="btn btn-primary btn-sm my-1">View ${i + 1}</a><br>`;
                });
            }
            if (value.ApprovedView) {
                var ApprovedView = '<a href=' + value.ApprovedView + ' target="_blank" class="btn btn-primary btn-sm" >View</a>';
            } else {
                var ApprovedView = '<a href="#" class="btn btn-primary viewButton disabled" >View</a>';
            }
            var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc1" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" tem_id="' + value.templateid + '" placeholder="Name of Document"> ' + value.NameOfDocument + '</textarea></div></td><td><div class="col-md-12"><div class="form-group"><select id="ddclause3" class="form-control ddclause3_' + value.ID + '" ></select></div></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo2" value="' + value.ClauseNo + '" placeholder="Clause No."></div></td><td class="view4tabdoc"><div> ' + ApprovedView + '</div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile1" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple><div>' + multidocViewButtons + '</div></td></tr>';
            $("#table-quality3 tbody").append(getrowcontent);
            getDocIdlevel4();
            $("#ddclause3").select2({
                //placeholder: "Search here...",
                allowClear: true,
                width: '100%'
            });
            // $(".ddclause3_" + value.ID).val(value.Level4.trim());
            setTimeout(() => {
                $(".ddclause3_" + value.ID).val(value.Level4.trim()).trigger("change");
            }, 100);

        }
        //let matchedData = [];
        //let unmatchedData = [];

        //if (match_tab3 != null) {
        //    $.each(match_tab3, function (index, data) {

        //        console.log('0000', data);
        //        if (data?.firs_table_ROWID == value.ID) {
        //            value.multidoc = data.multidoc;
        //            matchedData.push(value);
        //        } else {
        //            unmatchedData.push(value);
        //        }
        //    });
        //}
        //$.each(matchedData, function (index, value) {
        //    const tableBody = $("#table-quality3 tbody");
        //    const currentRowCount = tableBody.children("tr").length;
        //    const getIndex = currentRowCount + 1;

        //    let multidocViewButtons = '';
        //    if (value.multidoc != null) {
        //        const multidocUrls = value.multidoc.split(',');
        //        multidocUrls.forEach(function (url, i) {
        //            multidocViewButtons += `<a href="${url.trim()}" target="_blank" class="btn btn-primary btn-sm my-1">View ${i + 1}</a><br>`;
        //        });
        //    }
        //    var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc1" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type1" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo1" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile1" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple><div>' + multidocViewButtons + '</div></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //    $("#table-quality3 tbody").append(getrowcontent);
        //});

        //$.each(unmatchedData, function (index, value) {
        //    const tableBody = $("#table-quality3 tbody");
        //    const currentRowCount = tableBody.children("tr").length;
        //    const getIndex = currentRowCount + 1;

        //    var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc1" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type1" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo1" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile1" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //    $("#table-quality3 tbody").append(getrowcontent);
        //});

        //var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc1" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Name of Document"></textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type1" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo1" style="" placeholder="Clause No."></div></td><td><div><a href ="#" target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile1" aria-describedby="inputGroupFileAddon01" type="file" accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //$("#table-quality3 tbody").append(getrowcontent);

        //var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc1" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type1" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo1" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile1" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //$("#table-quality3 tbody").append(getrowcontent);

    }
    //$("#table-quality3").on("click", ".deleterow3", function () {
    //    $(this).closest("tr").remove();
    //});

    /*table quality 3 ends*/

    /*table quality 4 starts*/
    function getQualityControl4(value) {
        const tableBody = $("#table-quality4 tbody");
        const currentRowCount = tableBody.children("tr").length;
        const getIndex = currentRowCount + 1;
        if (value) {
            let multidocViewButtons = '';
            if (value.multidoc != null) {
                const multidocUrls = value.multidoc.split(',');
                multidocUrls.forEach(function (url, i) {
                    multidocViewButtons += `<a href="${url.trim()}" target="_blank" class="btn btn-primary btn-sm my-1">View ${i + 1}</a><br>`;
                });
            }
            //  let docIdOptions = '<option value="">Select DOC ID</option>';
            if (value.ApprovedView) {
                var ApprovedView = '<a href=' + value.ApprovedView + ' target="_blank" class="btn btn-primary btn-sm" >View</a>';
            } else {
                var ApprovedView = '<a href="#" class="btn btn-primary viewButton disabled" >View</a>';
            }
            var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc2" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" tem_id="' + value.templateid + '" placeholder="Name of Document"> ' + value.NameOfDocument + '</textarea></div></td><td><div class="form-group"><select id="ddclause4" class="form-control ddclause4_' + value.ID + '"></select ></div ></td ><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo2" value="' + value.ClauseNo + '" name="" style="" placeholder="Clause No."></div></td><td class="view5tabdoc"><div>' + ApprovedView + '</div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile2" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple><div>' + multidocViewButtons + '</div></td></tr > ';
            $("#table-quality4 tbody").append(getrowcontent);
            getDocIdlevel4()
            $("#ddclause4").select2({
                //placeholder: "Search here...",
                allowClear: true,
                width: '100%'
            });
            setTimeout(() => {
                $(".ddclause4_" + value.ID).val(value.Level4.trim()).trigger("change");
            }, 100);
        }

        //let matchedData = [];
        //let unmatchedData = [];

        //if (match_tab4 != null) {
        //    $.each(match_tab4, function (index, data) {
        //        if (data?.firs_table_ROWID == value.ID) {
        //            value.multidoc = data.multidoc;
        //            matchedData.push(value);
        //        } else {
        //            unmatchedData.push(value);
        //        }
        //    });
        //}
        //$.each(matchedData, function (index, value) {
        //    const tableBody = $("#table-quality4 tbody");
        //    const currentRowCount = tableBody.children("tr").length;
        //    const getIndex = currentRowCount + 1;

        //    let multidocViewButtons = '';
        //    if (value.multidoc != null) {
        //        const multidocUrls = value.multidoc.split(',');
        //        multidocUrls.forEach(function (url, i) {
        //            multidocViewButtons += `<a href="${url.trim()}" target="_blank" class="btn btn-primary btn-sm my-1">View ${i + 1}</a><br>`;
        //        });
        //    }
        //    var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc2" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type2" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo2" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile2" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple><div>' + multidocViewButtons + '</div></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //    $("#table-quality4 tbody").append(getrowcontent);
        //});

        //$.each(unmatchedData, function (index, value) {
        //    const tableBody = $("#table-quality4 tbody");
        //    const currentRowCount = tableBody.children("tr").length;
        //    const getIndex = currentRowCount + 1;

        //    var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc2" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type2" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo2" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile2" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td></tr>';
        //    $("#table-quality4 tbody").append(getrowcontent);
        //});

        //var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc2" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Name of Document"></textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type2" style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo2" placeholder="Clause No."></div></td><td><div><a href ="#" target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile2" aria-describedby="inputGroupFileAddon01" type="file" accept="application/*" multiple></td></tr>';
        //$("#table-quality4 tbody").append(getrowcontent);

        //var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc2" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type2" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo2" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile2" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td></tr>';
        //$("#table-quality4 tbody").append(getrowcontent);

    }
    //$("#table-quality4").on("click", ".deleterow4", function () {
    //    $(this).closest("tr").remove();
    //});

    /*table quality 4 ends*/

    /*table quality 5 starts*/
    function getQualityControl5(value) {
        const tableBody = $("#table-quality5 tbody");
        const currentRowCount = tableBody.children("tr").length;
        const deleteIcon = currentRowCount > 0 ? addDeleteIcon5() : '';

        if (value != null) {
            const issuedOn = value.IssuedOn ? moment(value.IssuedOn).format("YYYYY-MM-DD") : "N/A";
            const nextDueOn = value.NextDueOn ? moment(value.NextDueOn).format("YYYYY-MM-DD") : "N/A";
            const options = `<option value="">Certificate Type</option>` + certificateType.map((item) => `<option value="${item.type}" ${item.type == value.TypeOfCertificate ? "selected" : ""}> ${item.type}</option>`).join("");
            var getrowcontent = '<tr data-row-id="' + value.Id + '"><td><input class="add addrow5 border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+" ></td><td class="serial">' + (currentRowCount + 1) + '</td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile3" aria-describedby="inputGroupFileAddon01" type="file" accept="application/*"><a href=' + value.CertificateDoc + ' class="btn btn-primary">View</a></td><td><div class="form-group"><select class="form-control typepfDocument level_styles" id="typepfDocument3" name =""> ' + options + '</select ></div ></td><td><div class="form-group"><input type="date" name="" id="issuedOn3" class="form-control level_styles" value=' + issuedOn + '></div></td><td><div class="form-group"><input type="date" name="" id="nextDueOn3" class="form-control level_styles" value=' + nextDueOn + '></div></td><td><div class="form-group"><textarea id="remarks3" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Remarks" edit_id=' + value.Id + '>' + value.Remarks + '</textarea></div></td><td>' + deleteIcon + '</td></tr>';
            $("#table-quality5 tbody").append(getrowcontent);
        }
        else {
            const options = `<option value="">Certificate Type</option>` + certificateType.map((item) => `<option value="${item.type}"> ${item.type}</option>`).join("");
            var getrowcontent = '<tr><td><input class="add addrow5 border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+" ></td><td class="serial">' + (currentRowCount + 1) + '</td><td><input class="form-control Draftformatfile w-300px mb-2" id="certificateformatfile3" aria-describedby="inputGroupFileAddon01" type="file" accept="application/*"><a href="#" class="btn btn-primary viewButton disabled" >View</a></td><td><div class="form-group"><select class="form-control typepfDocument level_styles" id="typepfDocument3" name ="" > ' + options + '</select ></div ></td><td><div class="form-group"><input type="date" name="" id="issuedOn3" class="form-control level_styles"></div></td><td><div class="form-group"><input type="date" name="" id="nextDueOn3" class="form-control level_styles"></div></td><td><div class="form-group"><textarea id="remarks3" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Remarks"></textarea></div></td><td>' + deleteIcon + '</td></tr>';
            $("#table-quality5 tbody").append(getrowcontent);
        }

    }

    $('#table-quality5').on('change', '.Draftformatfile', function () {
        const file = this.files[0];
        const viewButton = $(this).closest('tr').find('.viewButton');

        if (file.size > 3000000) {
            alert('Please choose a file less than 3MB')
            this.value = ''
            viewButton.removeData('fileURL').addClass('disabled');

        }
        else {
            if (file) {
                const fileURL = URL.createObjectURL(file);
                viewButton.data('fileURL', fileURL).removeClass('disabled'); // Store URL in button data
            } else {
                viewButton.removeData('fileURL').addClass('disabled');
            }
        }

    });

    $('#table-quality5').on('click', '.viewButton', function () {
        const fileURL = $(this).data('fileURL');
        if (fileURL) {
            window.open(fileURL, '_blank');
        }
    });

    $("#table-quality5").on("click", ".addrow5", function () {
        getQualityControl5();
    });

    $("#table-quality5 tbody").on("click", ".deleterow5", function () {
        if ($(this).closest("tr").attr("data-row-id")) {
            // docIdData.push($(this).closest("tr").find(".DocumentName").val())
            var id = $(this).closest("tr").attr("data-row-id")
            $.ajax({
                url: "https://api.pdca.in/NewQualityManagement/DeleteQualityCertificate?adminID=" + ADMIN_AUTH + "&docID=" + id,
                type: "POST",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                /*data: fileData,*/
                success: function (data) {
                    if (data.responsecode == 0) {
                        $("tr[data-row-id='" + id + "']").remove();
                        alert("Record Deleted Succesfuly")
                    }
                }
            });
        } else {
            $(this).closest("tr").remove();
            setTimeout(() => {
                updateSerialNumbers3()
            }, 1000)
        }
    });

    function updateSerialNumbers3() {
        $("#table-quality5 tbody tr").each(function (index) {
            $(this).find(".serial").text(index + 1);
        });
    }
    function addDeleteIcon5() {
        return '<div class="deleterow5 mt-2" style="cursor:pointer"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div>'
    }

    /*table quality 5 ends*/

    $("#createTemplateSubmit2").submit((event) => {
        $(".spinner").show();
        event.preventDefault()
        
        var gettablelength = $("#table-quality2 tbody tr").length;
        if (gettablelength > 0) {
            var completedRequests = 0;
            for (var i = 0; i < gettablelength; i++) {
                var postdata = new FormData();
                var firs_table_ROWID = $("#table-quality2 tbody tr").eq(i).find("#NameoftheDoc").attr("edit_id");
                if (firs_table_ROWID != null) postdata.append('ID', firs_table_ROWID);
                var firs_table_tem_id = $("#table-quality2 tbody tr").eq(i).find("#NameoftheDoc").attr("tem_id");
                if (firs_table_tem_id != null) postdata.append('TemplateID', firs_table_tem_id);
                var ID = $("#table-quality2 tbody tr").eq(i).find("#NameoftheDoc").attr("edit_id");
                if (ID != null) postdata.append('ID', ID);
                var multiDocs = $("#table-quality2 tbody tr").eq(i).find("#certificateformatfile")[0].files;
                for (var j = 0; j < multiDocs.length; j++) {
                    postdata.append("file" + j, multiDocs[j]);
                }
                var DocumentName = $("#table-quality2 tbody tr").eq(i).find("#NameoftheDoc").val();
                var TypeOfTraining = $("#table-quality2 tbody tr").eq(i).find("#type").val();
                var ClauseNo = $("#table-quality2 tbody tr").eq(i).find("#ClauseNo").val();
                var jobID = $("#ddjobid").val();
                postdata.append('JobID', jobID);
                postdata.append('Nameofthedoc', DocumentName);
                postdata.append('level4pdf', TypeOfTraining);
                postdata.append('AdminId', ADMIN_AUTH);
                postdata.append('clause', ClauseNo);
                $.ajax({
                    url: "https://api.pdca.in/NewQualityManagement/CreateOrUpdateQualityTemplateExecution",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {

                        if (data.responsecode == 0) {
                            completedRequests++;
                        }
                        else {
                            setTimeout(() => {
                                alert(data.responsemessage);
                                console.error(data.responsemessage);
                                $(".spinner").hide();
                            }, 1000)

                        }
                    },
                    error: function () {
                        alert('Something went wrong please try again later');
                        $(".spinner").hide();

                    },
                    complete: function () {
                        if (completedRequests === gettablelength) {
                            setTimeout(() => {
                                getQualitySystemExecutionData()
                                getQualityControl3_Data();
                                alert('Quality System Execution Created Successfully');
                                $(".spinner").hide();
                            }, 1000)
                        }
                    }

                });
            }
        }
    })

    $("#createTemplateSubmit3").submit((event) => {
        $(".spinner").show();
        event.preventDefault()
        
        var gettablelength = $("#table-quality3 tbody tr").length;
        if (gettablelength > 0) {
            var completedRequests = 0;
            for (var i = 0; i < gettablelength; i++) {
                var postdata = new FormData();
                var firs_table_ROWID = $("#table-quality3 tbody tr").eq(i).find("#NameoftheDoc1").attr("edit_id");
                if (firs_table_ROWID != null) postdata.append('firs_table_ROWID', firs_table_ROWID);
                var firs_table_tem_id = $("#table-quality3 tbody tr").eq(i).find("#NameoftheDoc1").attr("tem_id");
                if (firs_table_tem_id != null) postdata.append('firs_table_ROWID', firs_table_tem_id);
                var ID = $("#table-quality3 tbody tr").eq(i).find("#NameoftheDoc1").attr("edit_id");
                if (ID != null) postdata.append('ID', ID);
                var multiDocs = $("#table-quality3 tbody tr").eq(i).find("#certificateformatfile1")[0].files;
                for (var j = 0; j < multiDocs.length; j++) {
                    postdata.append("file" + j, multiDocs[j]);
                }

                var hrefValue = $("#table-quality3 tbody tr").eq(i).find(".view4tabdoc a").attr("href");

                var DocumentName = $("#table-quality3 tbody tr").eq(i).find("#NameoftheDoc1").val();
                var TypeOfTraining = $("#table-quality3 tbody tr").eq(i).find("#ddclause3").val();
                var ClauseNo = $("#table-quality3 tbody tr").eq(i).find("#ClauseNo1").val();
                var jobID = $("#ddjobid").val();

                postdata.append('JobID', jobID);
                postdata.append('Nameofthedoc', DocumentName);
                postdata.append('level4pdf', TypeOfTraining);
                postdata.append('ApprovedView', hrefValue);
                postdata.append('AdminId', ADMIN_AUTH);
                postdata.append('ClauseNo', ClauseNo);
                $.ajax({
                    url: "https://api.pdca.in/NewQualityManagement/CreateOrUpdateInternalAuditMRM",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {

                        if (data.responsecode == 0) {
                            completedRequests++;
                        }
                        else {
                            setTimeout(() => {
                                alert(data.responsemessage);
                                console.error(data.responsemessage);
                                $(".spinner").hide();
                            }, 1000)

                        }
                    },
                    error: function () {
                        alert('Something went wrong please try again later');
                        $(".spinner").hide();

                    },
                    complete: function () {
                        if (completedRequests === gettablelength) {
                            setTimeout(() => {
                                getQualitySystemExecutionData();
                                getQualityControl4_Data();
                                alert('Internal Audit and MRM Created Successfully');
                                $(".spinner").hide();
                            }, 1000)
                        }
                    }

                });
            }
        }
    })

    $("#createTemplateSubmit4").submit((event) => {
        $(".spinner").show();
        event.preventDefault()
        
        var gettablelength = $("#table-quality4 tbody tr").length;
        if (gettablelength > 0) {
            var completedRequests = 0;
            for (var i = 0; i < gettablelength; i++) {
                var postdata = new FormData();
                var ID = $("#table-quality4 tbody tr").eq(i).find("#NameoftheDoc2").attr("edit_id");
                if (ID != null) postdata.append('ID', ID);

                var firs_table_ROWID = $("#table-quality4 tbody tr").eq(i).find("#NameoftheDoc2").attr("edit_id");
                if (firs_table_ROWID != null) postdata.append('firs_table_ROWID', firs_table_ROWID);

                var multiDocs = $("#table-quality4 tbody tr").eq(i).find("#certificateformatfile2")[0].files;

                for (var j = 0; j < multiDocs.length; j++) {
                    postdata.append("file" + j, multiDocs[j]);
                }
                var hrefValue = $("#table-quality4 tbody tr").eq(i).find(".view5tabdoc a").attr("href");
                var DocumentName = $("#table-quality4 tbody tr").eq(i).find("#NameoftheDoc2").val();
                var TypeOfTraining = $("#table-quality4 tbody tr").eq(i).find("#ddclause4").val();
                var ClauseNo = $("#table-quality4 tbody tr").eq(i).find("#ClauseNo2").val();
                var jobID = $("#ddjobid").val();

                postdata.append('JobID', jobID);
                postdata.append('Nameofthedoc', DocumentName);
                postdata.append('level4pdf', TypeOfTraining);
                postdata.append('ApprovedView', hrefValue);
                postdata.append('AdminId', ADMIN_AUTH);
                postdata.append('clause', ClauseNo);
                $.ajax({
                    url: "https://api.pdca.in/NewQualityManagement/CreateOrUpdateExternalAuditMRM",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {
                        if (data.responsecode == 0) {
                            completedRequests++;
                        }
                        else {
                            setTimeout(() => {
                                alert(data.responsemessage);
                                console.error(data.responsemessage);
                                $(".spinner").hide();
                            }, 1000)

                        }
                    },
                    error: function () {
                        alert('Something went wrong please try again later');
                        $(".spinner").hide();

                    },
                    complete: function () {
                        if (completedRequests === gettablelength) {
                            setTimeout(() => {
                                alert('External Audit and MRM Created Successfully');
                                $(".spinner").hide();
                            }, 1000)
                        }
                    }

                });
            }
        }
    })

    $("#createTemplateSubmit5").submit((event) => {
        $(".spinner").show();
        event.preventDefault()
        
        var gettablelength = $("#table-quality5 tbody tr").length;
        if (gettablelength > 0) {
            var completedRequests = 0;
            for (var i = 0; i < gettablelength; i++) {
                var postdata = new FormData();
                var ID = $("#table-quality5 tbody tr").eq(i).find("#remarks3").attr("edit_id");
                if (ID != null) {
                    postdata.append('ID', ID);
                }
                else {
                    //do nothing
                }

                //var file = $("#table-quality5 tbody tr").eq(i).find("#certificateformatfile3")[0].files;
                var TypeOfCertificate = $("#table-quality5 tbody tr").eq(i).find("#typepfDocument3").val();
                var IssuedOn = $("#table-quality5 tbody tr").eq(i).find("#issuedOn3").val();
                var NextDueOn = $("#table-quality5 tbody tr").eq(i).find("#nextDueOn3").val();
                var Remarks = $("#table-quality5 tbody tr").eq(i).find("#remarks3").val();
                var jobID = $("#ddjobid").val();

                var fileInput = $("#table-quality5 tbody tr").eq(i).find("#certificateformatfile3")[0].files;
                if (fileInput.length > 0) {
                    postdata.append('CertificateDoc', fileInput[0]); // Append first file
                }

                postdata.append('JobID', jobID);
                postdata.append('TypeOfCertificate', TypeOfCertificate);
                postdata.append('AdminId', ADMIN_AUTH);
                postdata.append('IssuedOn', IssuedOn);
                postdata.append('NextDueOn', NextDueOn);
                postdata.append('Remarks', Remarks);
                $.ajax({
                    url: "https://api.pdca.in/NewQualityManagement/CreateOrUpdateQualityCertificate",
                    type: "POST",
                    data: postdata,
                    async: true,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {

                        if (data.responsecode == 0) {
                            completedRequests++;
                        }
                        else {
                            setTimeout(() => {
                                alert(data.responsemessage);
                                console.error(data.responsemessage);
                                $(".spinner").hide();
                            }, 1000)

                        }
                    },
                    error: function () {
                        alert('Something went wrong please try again later');
                        $(".spinner").hide();

                    },
                    complete: function () {
                        if (completedRequests === gettablelength) {
                            setTimeout(() => {
                                alert('Quality Certificate Created Successfully');
                                location.href = "/qualityCompliance/QualityJobsList.html";
                                $(".spinner").hide();
                            }, 1000)
                        }
                    }

                });
            }
        }
    })
    function getQualitySystemExecutionData() {
        
        $(".spinner").show();
        var jobID = $("#ddjobid").val();
            $("#btnexportquailtydoc").show();
        $.ajax({
            url: "https://api.pdca.in/NewQualityManagement/ListAllQualityData?jobId=" + jobID,
            type: "GET",
            async: false,
            contentType: false,
            processData: false,
            success: function (data) {
                getQualityControl_data_all.length = 0;
                getQualityControl_data_all.push(data);
                getQualityData_from_Jobid(data)
            },

        })
        $(".spinner").hide();

    }
    function getQualityData_from_Jobid(data) {
        
        getDocId()
        const tableBody = $("#table-quality tbody");
        tableBody.empty();

        if (data?.QualityDocs.length > 0) {
            data?.QualityDocs?.forEach((value) => {
                getQualityControl(value);
            })
        }
        else {
            getQualityControl();
        }

        const tableBody1 = $("#table-quality1 tbody");
        tableBody1.empty();

        if (data.TrainingDocs.length > 0) {
            const clauseNo = data.TrainingDocs[0].ClauseNo;

            if ($("#ddclause option[value='" + clauseNo + "']").length > 0) {
                $("#ddclause").val(clauseNo);
                getQualityControldata(clauseNo);
            }

            data.TrainingDocs.forEach((value) => {
                getQualityControl1(value);
            });
        }
        else {
            getQualityControl1();
        }

        const tableBody2 = $("#table-quality1-main tbody");
        tableBody2.empty();

       
        if (data.SkillDocs.length > 0) {
            const clauseNo = data.SkillDocs[0].ClauseNo;

            if ($("#ddclause2 option[value='" + clauseNo + "']").length > 0) {
                $("#ddclause2").val(clauseNo);
                getQualityControldataskill(clauseNo);
            }

            data.SkillDocs.forEach((value) => {
                getQualityControl1main(value);
            });
        }
        else {
            getQualityControl1main();
        }
        const tableBody3 = $("#table-quality2 tbody");
        tableBody3.empty();

        if (data?.ExecutionDocs.length > 0) {
            data?.ExecutionDocs?.forEach((value) => {
                getQualityControl2_Data();
            })
        }
        else {
            getQualityControl2_Data();
        }
        const tableBody4 = $("#table-quality3 tbody");
        tableBody4.empty();

        if (data?.InternalAudits.length > 0) {
            data?.InternalAudits?.forEach((value) => {
                getQualityControl3_Data();
            })
        }
        else {
            getQualityControl3_Data();
        }
        const tableBody5 = $("#table-quality4 tbody");
        tableBody5.empty();

        if (data?.ExternalAudits.length > 0) {
            data?.ExternalAudits?.forEach((value) => {
                getQualityControl4_Data();
            })
        }
        else {
            getQualityControl4_Data();
        }
        const tableBody6 = $("#table-quality5 tbody");
        tableBody6.empty();

        if (data?.QualityCertificates.length > 0) {
            data?.QualityCertificates?.forEach((value) => {
                getQualityControl5(value);
            })
        }
        else {
            getQualityControl5();
        }

    }

    function getlist() {
        $.ajax({
            url: "https://api.pdca.in/Quality_Template/List_Template?AdminId=" + ADMIN_AUTH,
            type: "GET",
            contentType: false,
            processData: false,
            success: function (data) {
                $("#ddlqulitylist").empty();
                var defaultoption = '<option value="0">Select Checklist Template</option>';
                $("#ddlqulitylist").append(defaultoption);
                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.ID + '">' + val.TemplateName + '</option>'
                    $("#ddlqulitylist").append(getdetails);
                });
            }
        });
    }
    function getclients() {
        
        $.ajax({
            url: "https://api.pdca.in/Client/GetList?AdminId=" + ADMIN_AUTH,
            type: "GET",
            contentType: false,
            processData: false,

            success: function (data) {
                $("#ddclient").empty();
                var defaultoption = '<option value="">Select Client</option>';
                $("#ddclient").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.ClientID + '">' + val.Companyname + '</option>';
                    $("#ddclient").append(getdetails);
                });
            }
        });
    }



    function getEmployees() {
        $.ajax({
            url: EMPLOYEEE_DATA + ADMIN_AUTH,
            type: "GET",
            async: true,
            contentType: false,
            processData: false,
            success: function (data) {
                $("#ddlEmployee").empty().append('<option value="">Select Employee Name</option>');
                $.each(data, function (index, val) {
                    var nameOption = '<option value="' + val.id + '">' + val.Name + '</option>';
                    $("#ddlEmployee").append(nameOption);
                });
            }
        });
    }

    function getJObID() {

        $.ajax({
            url: "https://api.pdca.in/Quality/ListforJobID?AdminID=" + ADMIN_AUTH,
            type: "GET",
            async: false,
            contentType: false,
            processData: false,
            success: function (data) {

                $("#ddjobid").empty();
                var defaultoption = '<option value="0">Select Job ID</option>';
                $("#ddjobid").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.ID + '">' + val.JOBID + '</option>'
                    $("#ddjobid").append(getdetails);
                });
            },

        });
    }

    function updateStep(step) {
        // Hide all card containers
        $('.card-container').hide();

        // Show the current step card
        $(`.card-container[data-step="${step}"]`).show();
    }

    // Handle Next Step button
    $('.next-step').on('click', function () {
        const nextStep = $(this).data('next');
        if (nextStep) {
            updateStep(nextStep);
        }
    });

    // Handle Previous Step button
    $('.prev-step').on('click', function () {
        const prevStep = $(this).data('prev');
        if (prevStep) {
            updateStep(prevStep);
        }
    });



    
    $(document).off("click", "#btnexportquailtydoc").on("click", "#btnexportquailtydoc", function () {

        let btn = $(this);
        btn.prop("disabled", true);
        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {

            $.ajax({
                url: `${QUALITYDOC_CSV_DOWNLOAD}?AdminId=${ADMIN_AUTH}&jobGuid=${job_ID}`,
                type: "GET",
                xhrFields: {
                    responseType: 'blob'   // IMPORTANT
                },
                success: function (data) {

                    let blob = new Blob([data], { type: 'text/csv' });
                    let link = document.createElement('a');

                    link.href = window.URL.createObjectURL(blob);
                    link.download = "QualityDocsExport.csv";
                    link.click();
                },
                error: function (err) {
                    console.log("Error:", err);
                }
            });
        } else {
            $.ajax({
                url: "https://api.pdca.in/EmpQuality/EmpQuality_list?EmpID=" + ADMIN_AUTH + "&downloadCsv=" + true,
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
        }
        setTimeout(() => btn.prop("disabled", false), 3000);
    });

});