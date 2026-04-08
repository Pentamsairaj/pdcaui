"use strict";

import APIS from './api.js';
$(() => {
    debugger;
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
        getDocId();
        getEmployees();
        getJObID();
        getclients();
        getlist();

    }
    getQualityControl();
    getQualityControl1();
    getQualityControl1main();
    //getQualityControl2()
    //getQualityControl3()
    //getQualityControl4()
    getQualityControl5()
    const job_ID = params.get("id");
    if (job_ID != null) {
        $("#ddjobid").attr('disabled', 'disabled');
        $('#ddjobid').val(job_ID);
        $("#company_data").hide();
        $("#template_div").hide();
        getQualitySystemExecutionData()
    }
    function getQualityControl(value) {
        debugger;
        const tableBody = $("#table-quality tbody");
        const currentRowCount = tableBody.children("tr").length;
        const getIndex = currentRowCount + 1;

        if (value != null) {
            const options = `<option value="">Level</option>` + Level_data.map((item) => `<option value="${item.id}" ${value.level == item.id ? "selected" : ""}>Level ${item.name}</option>`).join("");
            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+"></td><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Name of Document" value="" edit_id=' + value.ID + '>' + value.NameoftheDoc + ' </textarea></div></td><td><div class="form-group"><select class="form-control level level_styles" id="level" name =""> ' + options + '</select ></div ></td><td><div class="form-group"><input class="form-control DocId level_styles" id="DocId" name="" style="" placeholder="Doc ID." value=' + value.DocId + '></div></td><td><button class="btn btn-success btn-sm" type="button">Create Document</button></td><td><div class="form-group"><input class="form-control clause level_styles" id="clause" name="" style="" placeholder="Clause No." value=' + value.clause + '></div></td><td><div class=form-group><a class="alink" target="_blank" href="' + Document + '"><button class="btn btn-primary" type="button">View</button></a></div></td><td><div class="deleterow mt-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr > ';
            $("#table-quality tbody").append(getrowcontent);
        }
        else {
            const options = `<option value="">Level</option>` + Level_data.map((item) => `<option value="${item.id}">Level ${item.name}</option>`).join("");
            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+"></td><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Name of Document" value=""></textarea></div></td><td><div class="form-group"><select class="form-control level level_styles" id="level" name ="" > ' + options + '</select ></div ></td><td><div class="form-group"><input class="form-control DocId level_styles docId_duplicate" id="DocId" name="" style="" placeholder="Doc ID." value=""></div></td><td><button class="btn btn-success btn-sm openCreateDocument" data-toggle="modal" data-target="#createDocumentModalOpen" type="button">Create Document</button></td><td><div class="form-group"><input class="form-control clause level_styles" id="clause" name="" style="" placeholder="Clause No."></div></td><td><div class=form-group><a class="alink" target="_blank" href="' + Document + '"><button class="btn btn-primary" type="button">View</button></a></div></td><td><div class="deleterow mt-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr > ';
            $("#table-quality tbody").append(getrowcontent);
        };
    }
    $("#table-quality").on("click", ".addrow", function () {
        getQualityControl();
    });

    $("#table-quality").on("blur", ".docId_duplicate", function () {
        //var DocId = $(".DocId").val()
        const DocIdInput = $(this).closest("tr").find(".DocId").val();
        $.each(docIdData, function (index, data) {
            if (data == DocId) {
                this.value = ''
                alert('Doc ID is already there');
                return false; // Exit the loop
            }
        });

    });

    $("#table-quality").on("click", ".openCreateDocument", function () {
        const docId = $(this).closest("tr").find(".DocId").val();
        $("#docId").val(docId)
        $("#createDocumentModalOpen").modal("show");
    });

    $("#table-quality").on("click", ".deleterow", function () {
        //if (editId) {
        //    var id = $(this).attr("id");
        //    var result = confirm("Are you Sure? You Want to Delete");
        //    if (result) {
        //        $.ajax({
        //            url: "https://api.pioneerfoods.in/NewQualityManagement/DeleteQualityDoc?AdminId=" + ADMIN_AUTH + "&docID=" + id + "",
        //            type: "POST",
        //            contentType: false,
        //            processData: false,
        //            /*data: fileData,*/
        //            success: function (data) {
        //                if (data.responsecode == 1) {
        //                    $("#" + id).closest("tr").remove();
        //                    alert("Record Deleted Succesfuly")
        //                }
        //            }
        //        });
        //    }
        //}
        //else {
        $(this).closest("tr").remove();

        //}

    });

    /*table quality ends*/

    /*table quality 1 starts*/

    function getQualityControl1(value) {
        debugger;
        const tableBody = $("#table-quality1 tbody");
        const currentRowCount = tableBody.children("tr").length;
        const getIndex = currentRowCount + 1;

        if (value != null) {
            const startDate = value.Dateoftrainingstart ? moment(value.Dateoftrainingstart).format("YYYYY-MM-DD") : "N/A";
            const endDate = value.topcoftrainingEnd ? moment(value.topcoftrainingEnd).format('DD-MM-YYYY') : "N/A";
            const options = `<option value="">Level</option>` + Level_data.map((item) => `<option value="${item.id}" ${value.TypeOfTraining == item.id ? "selected" : ""}>Level ${item.name}</option>`).join("");
            var getrowcontent = '<tr><td><input class="add addrow1 border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+"></td><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="DocumentName" class="DocumentName form-control nameofdocument_styles" placeholder="Name of the Document" value="" edit_id=' + value.ID + '> ' + value.DocumentName + ' </textarea></div></td><td><div class="form-group"><select class="form-control TypeOfTraining level_styles" id="TypeOfTraining" name="">' + options + '</select></div></td><td><div class="form-group"><input type="date" name="" id="Dateoftrainingstart" class="nccaDetail form-control level_styles Dateoftrainingstart"  value=' + startDate + '></div></td><td><div class="form-group"><input type="date" name="" id="topicoftrainingEnd" class="nccaDetail form-control level_styles topicoftrainingEnd" value=' + value.topcoftrainingEnd + '></div></td><td><input class="w-250px DocUpload my-2" id="DocUpload" aria-describedby="inputGroupFileAddon01" type="file"><a href=' + value.DocUpload + ' target="_blank" class="btn btn-link"><button class="btn btn-primary" type="button">View</button></a></td><td><div class="deleterow1 mt-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-quality1 tbody").append(getrowcontent);
        }
        else {
            const options = `<option value="">Level</option>` + Level_data.map((item) => `<option value="${item.id}">Level ${item.name}</option>`).join("");
            var getrowcontent = '<tr><td><input class="add addrow1 border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+"></td><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="DocumentName" class="DocumentName form-control nameofdocument_styles" placeholder="Name of the Document"></textarea></div></td><td><div class="form-group"><select class="form-control TypeOfTraining level_styles" id="TypeOfTraining" name="">' + options + '</select></div></td><td><div class="form-group"><input type="date" name="" id="Dateoftrainingstart" class="nccaDetail form-control level_styles Dateoftrainingstart"></div></td><td><div class="form-group"><input type="date" name="" id="topicoftrainingEnd" class="nccaDetail form-control level_styles topicoftrainingEnd"></div></td><td><input class="w-250px DocUpload my-2" id="DocUpload" aria-describedby="inputGroupFileAddon01" type="file"><a href="#" class="btn btn-primary viewButton disabled" >View</a></td><td><div class="deleterow1 mt-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
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
            window.open(fileURL, '_blank'); // Open the file in a new tab
        }
    });

    $("#table-quality1").on("click", ".addrow1", function () {
        getQualityControl1();

    });

    $("#table-quality1").on("click", ".deleterow1", function () {
        $(this).closest("tr").remove();

    });

    function getQualityControl1main(value) {
        debugger;
        const tableBody = $("#table-quality1-main tbody");
        const currentRowCount = tableBody.children("tr").length;
        const getIndex = currentRowCount + 1;

        if (value != null) {
            var getrowcontent = '<tr><td><input class="add addrow1-main border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+" ></td><td>' + getIndex + '</td><td><div class="form-group"><input type="text" class="form-control EmployeeName" id="EmployeeName" style="width:270px" placeholder="Employee Name" value=' + value.EmployeeName + '></div></td><td><div class="form-group"><input type="text" class="form-control EmployeeID" id="EmployeeID" style="width:270px" placeholder="Employee ID" value=' + value.EmployeeID + '></div></td><td><div class="form-group"><input type="text" class="form-control Designation" id="Designation" style="width:270px" placeholder="Designation" value=' + value.Designation + '></div></td><td><div class="form-group"><input type="text" class="form-control Qualification" id="Qualification" style="width:270px" placeholder="Qualification/No of Years Experience" edit_id=' + value.ID + ' value=' + value.Qualification + '></div></td><td><input class="w-250px uploadFile my-2" id="uploadFile" aria-describedby="inputGroupFileAddon01" type="file"><a href=' + value.JDupload + ' target="_blank" class="btn btn-link"><button class="btn btn-primary" type="button">View</button></a></td><td><div class="deleterow1-main mt-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-quality1-main tbody").append(getrowcontent);
        }
        else {
            var getrowcontent = '<tr><td><input class="add addrow1-main border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+"></td><td>' + getIndex + '</td><td><div class="form-group"><input type="text" class="form-control EmployeeName" id="EmployeeName" style="width:270px" placeholder="Employee Name"></div></td><td><div class="form-group"><input type="text" class="form-control EmployeeID" id="EmployeeID" style="width:270px" placeholder="Employee ID"></div></td><td><div class="form-group"><input type="text" class="form-control Designation" id="Designation" style="width:270px" placeholder="Designation"></div></td><td><div class="form-group"><input type="text" class="form-control Qualification" id="Qualification" style="width:270px" placeholder="Qualification/No of Years Experience"></div></td><td><input class="w-250px uploadFile my-2" id="uploadFile" aria-describedby="inputGroupFileAddon01" type="file"> <a href="#" id="viewButton" class="btn btn-primary viewButton disabled">View</a></td><td><div class="deleterow1-main my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
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

    $("#table-quality1-main").on("click", ".deleterow1-main", function () {
        $(this).closest("tr").remove();
    });
    /*table quality 1 ends*/

    $("#ddclient").change((event) => {
        var getvalue = $(event.target).val();
        if (getvalue.trim() == "0") {
            $("#company_data").show();
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
        }
        else {
            $("#company_data").hide();
        }
    })
    function getAllTabsData(ID) {
        getJObID()
        var Id = ID
        $("#jobid_data").show();
        $("#ddjobid").val(Id)
        $(".ddjobid").prop("disabled", true);
    }

    $("#createTemplateSubmit").submit((event) => {
        debugger;
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
                    url: "https://api.pioneerfoods.in/Quality/Create_Joballocation",
                    type: "POST",
                    data: postdata,
                    dataType: "json",
                    traditional: true,
                    crossDomain: true,
                    success: function (data) {
                        debugger;
                        if (data.responsecode == 1) {
                            var joballocation_ID = data.responseObject;
                            ID = joballocation_ID;
                            standardajax(joballocation_ID);
                            alert("Quality Documentation and Control Created Successfully");
                            var Template = localStorage.getItem("TemplateID")
                            getDocId();
                            $(".spinner").hide();
                            getAllTabsData(ID);
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
                debugger;
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
        debugger;
        var gettablelength = $("#table-quality tbody tr").length;
        if (gettablelength > 0) {
            var completedRequests = 0;
            for (var i = 0; i < gettablelength; i++) {
                var joballocation_ID = joballocation_ID;
                var postdata = new FormData();

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
                    url: "https://api.pioneerfoods.in/NewQualityManagement/CreateOrUpdateQualityDoc",
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
        debugger;
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

                var file = ""
                file = $("#table-quality1 tbody tr").eq(i).find(".DocUpload")[0].files;
                var DocumentName = $("#table-quality1 tbody tr").eq(i).find(".DocumentName").val().trim();
                var TypeOfTraining = $("#table-quality1 tbody tr").eq(i).find(".TypeOfTraining").val().trim();
                var Dateoftrainingstart = $("#table-quality1 tbody tr").eq(i).find(".Dateoftrainingstart").val().trim();
                var topicoftrainingEnd = $("#table-quality1 tbody tr").eq(i).find(".topicoftrainingEnd").val().trim();
                const level1 = parseInt(TypeOfTraining);
                var ClauseNo = $("#ddclause").val().trim();
                postdata.append('DocUpload', file);
                postdata.append('JobID', jobID);
                postdata.append('DocumentName', DocumentName);
                postdata.append('TypeOfTraining', level1);
                postdata.append('Dateoftrainingstart', Dateoftrainingstart);
                postdata.append('topicoftrainingEnd', topicoftrainingEnd);
                postdata.append('AdminId', ADMIN_AUTH);
                postdata.append('ClauseNo', ClauseNo);
                $.ajax({
                    url: "https://api.pioneerfoods.in/NewQualityManagement/CreateOrUpdateTrainingDoc",
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
        debugger;
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

                var file = ""
                file = $("#table-quality1-main tbody tr").eq(i).find(".uploadFile")[0].files;
                var EmployeeName = $("#table-quality1-main tbody tr").eq(i).find(".EmployeeName").val().trim();
                var EmployeeID = $("#table-quality1-main tbody tr").eq(i).find(".EmployeeID").val().trim();
                var Designation = $("#table-quality1-main tbody tr").eq(i).find(".Designation").val().trim();
                var Qualification = $("#table-quality1-main tbody tr").eq(i).find(".Qualification").val().trim();
                var ClauseNo = $("#ddclause").val().trim();

                postdata.append('JDupload', file);
                postdata.append('JobID', jobID);
                postdata.append('EmployeeName', EmployeeName);
                postdata.append('EmployeeID', EmployeeID);
                postdata.append('Designation', Designation);
                postdata.append('Qualification', Qualification);
                postdata.append('AdminId', ADMIN_AUTH);
                postdata.append('ClauseNo', ClauseNo);
                $.ajax({
                    url: "https://api.pioneerfoods.in/NewQualityManagement/CreateOrUpdateSkillDoc",
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

        let matchedData = [];
        let unmatchedData = [];

        if (match_tab2 != null) {
            $.each(match_tab2, function (index, data) {
                if (data?.firs_table_ROWID == value.ID) {
                    value.multidoc = data.multidoc;
                    matchedData.push(value);
                }
                else {
                    unmatchedData.push(value);
                }
            });
        }
        $.each(matchedData, function (index, value) {
            const tableBody = $("#table-quality2 tbody");
            const currentRowCount = tableBody.children("tr").length;
            const getIndex = currentRowCount + 1;
            let multidocViewButtons = '';
            if (value.multidoc != null) {
                const multidocUrls = value.multidoc.split(',');
                multidocUrls.forEach(function (url, i) {
                    multidocViewButtons += `<a href="${url.trim()}" target="_blank" class="btn btn-primary btn-sm my-1">View ${i + 1}</a><br>`;
                });
            }
            var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary" > View</a ></div></td><td><input class="w-250px Draftformatfile my-2" id="certificateformatfile" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple><div>' + multidocViewButtons + '</div></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-quality2 tbody").append(getrowcontent);
        });

        $.each(unmatchedData, function (index, value) {
            const tableBody = $("#table-quality2 tbody");
            const currentRowCount = tableBody.children("tr").length;
            const getIndex = currentRowCount + 1;
            var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary" > View</a ></div></td><td><input class="w-250px Draftformatfile my-2" id="certificateformatfile" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-quality2 tbody").append(getrowcontent);
        });

        var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary" > View</a ></div></td><td><input class="w-250px Draftformatfile my-2" id="certificateformatfile" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-quality2 tbody").append(getrowcontent);

    }

    //$("#table-quality2").on("click", ".deleterow2", function () {
    //    $(this).closest("tr").remove();
    //});

    /*table quality 2 ends*/

    function getQualityControl2_Data() {
        const tableBody1 = $("#table-quality2 tbody");
        tableBody1.empty();
        if (getQualityControl_data_all.length > 0)
            if (getQualityControl_data_all[0].ExecutionDocs.length != null) {
                getQualityControl_data_all[0].ExecutionDocs?.forEach((data) => {
                    match_tab2.push(data)
                })
                getQualityControl_data_all[0].QualityDocs?.forEach((value) => {
                    getQualityControl2(value);
                })
            }
            else {
                getQualityControl_data_all[0].QualityDocs?.forEach((value) => {
                    getQualityControl2(value);
                })
            }
    }

    function getQualityControl3_Data() {
        const tableBody1 = $("#table-quality3 tbody");
        tableBody1.empty();
        if (getQualityControl_data_all.length > 0)
            if (getQualityControl_data_all[0].InternalAudits.length > 0) {
                getQualityControl_data_all[0].InternalAudits?.forEach((data) => {
                    match_tab3.push(data)
                })
                getQualityControl_data_all[0].QualityDocs?.forEach((value) => {
                    getQualityControl3(value);
                })
            }
            else {
                getQualityControl_data_all[0].QualityDocs?.forEach((value) => {
                    getQualityControl3(value);
                })
            }
    }

    function getQualityControl4_Data() {
        const tableBody1 = $("#table-quality3 tbody");
        tableBody1.empty();
        if (getQualityControl_data_all.length > 0)
            if (getQualityControl_data_all[0].ExternalAudits.length > 0) {
                getQualityControl_data_all[0].ExternalAudits?.forEach((data) => {
                    match_tab4.push(data)
                })
                getQualityControl_data_all[0].QualityDocs?.forEach((value) => {
                    getQualityControl4(value);
                })
            }
            else {
                getQualityControl_data_all[0].QualityDocs?.forEach((value) => {
                    getQualityControl4(value);
                })
            }
    }

    function getQualityControl3(value) {
        const tableBody = $("#table-quality3 tbody");
        const currentRowCount = tableBody.children("tr").length;
        const getIndex = currentRowCount + 1;

        let matchedData = [];
        let unmatchedData = [];

        if (match_tab3 != null) {
            $.each(match_tab3, function (index, data) {

                console.log('0000', data);
                if (data?.firs_table_ROWID == value.ID) {
                    value.multidoc = data.multidoc;
                    matchedData.push(value);
                } else {
                    unmatchedData.push(value);
                }
            });
        }
        $.each(matchedData, function (index, value) {
            const tableBody = $("#table-quality3 tbody");
            const currentRowCount = tableBody.children("tr").length;
            const getIndex = currentRowCount + 1;

            let multidocViewButtons = '';
            if (value.multidoc != null) {
                const multidocUrls = value.multidoc.split(',');
                multidocUrls.forEach(function (url, i) {
                    multidocViewButtons += `<a href="${url.trim()}" target="_blank" class="btn btn-primary btn-sm my-1">View ${i + 1}</a><br>`;
                });
            }
            var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc1" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type1" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo1" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="w-250px Draftformatfile my-2" id="certificateformatfile1" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple><div>' + multidocViewButtons + '</div></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-quality3 tbody").append(getrowcontent);
        });

        $.each(unmatchedData, function (index, value) {
            const tableBody = $("#table-quality3 tbody");
            const currentRowCount = tableBody.children("tr").length;
            const getIndex = currentRowCount + 1;

            var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc1" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type1" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo1" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="w-250px Draftformatfile my-2" id="certificateformatfile1" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-quality3 tbody").append(getrowcontent);
        });

        var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc1" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type1" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo1" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="w-250px Draftformatfile my-2" id="certificateformatfile1" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-quality3 tbody").append(getrowcontent);

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

        let matchedData = [];
        let unmatchedData = [];

        if (match_tab4 != null) {
            $.each(match_tab4, function (index, data) {
                if (data?.firs_table_ROWID == value.ID) {
                    value.multidoc = data.multidoc;
                    matchedData.push(value);
                } else {
                    unmatchedData.push(value);
                }
            });
        }
        $.each(matchedData, function (index, value) {
            const tableBody = $("#table-quality4 tbody");
            const currentRowCount = tableBody.children("tr").length;
            const getIndex = currentRowCount + 1;

            let multidocViewButtons = '';
            if (value.multidoc != null) {
                const multidocUrls = value.multidoc.split(',');
                multidocUrls.forEach(function (url, i) {
                    multidocViewButtons += `<a href="${url.trim()}" target="_blank" class="btn btn-primary btn-sm my-1">View ${i + 1}</a><br>`;
                });
            }
            var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc2" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type2" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo2" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="w-250px Draftformatfile my-2" id="certificateformatfile2" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple><div>' + multidocViewButtons + '</div></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-quality4 tbody").append(getrowcontent);
        });

        $.each(unmatchedData, function (index, value) {
            const tableBody = $("#table-quality4 tbody");
            const currentRowCount = tableBody.children("tr").length;
            const getIndex = currentRowCount + 1;

            var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc2" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type2" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo2" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="w-250px Draftformatfile my-2" id="certificateformatfile2" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-quality4 tbody").append(getrowcontent);
        });
        var getrowcontent = '<tr><td>' + getIndex + '</td><td><div class="form-group"><textarea type="text" name="" id="NameoftheDoc2" class="NameoftheDoc form-control nameofdocument_styles" value="" edit_id="' + value.ID + '" placeholder="Name of Document"> ' + value.NameoftheDoc + '</textarea></div></td><td><div class="form-group"><input class="form-control type level_styles" id="type2" name="" value=' + value.DocId + ' style="" placeholder="Type 4 Doc ID"></div></td><td><div class="form-group"><input class="form-control ClauseNo level_styles" id="ClauseNo2" value=' + value.clause + ' name="" style="" placeholder="Clause No."></div></td><td><div><a href = ' + value.UploadMultiDocView + ' target = "_blank" class="btn btn-primary btn-sm" >View</a></div></td><td><input class="w-250px Draftformatfile my-2" id="certificateformatfile2" aria-describedby="inputGroupFileAddon01" type="file" value_id=' + value.ID + ' accept="application/*" multiple></td><td><div class="deleterow2 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-quality4 tbody").append(getrowcontent);

    }
    //$("#table-quality4").on("click", ".deleterow4", function () {
    //    $(this).closest("tr").remove();
    //});

    /*table quality 4 ends*/

    /*table quality 5 starts*/
    function getQualityControl5(value) {
        const tableBody = $("#table-quality5 tbody");
        const currentRowCount = tableBody.children("tr").length;
        const getIndex = currentRowCount + 1;

        if (value != null) {
            const issuedOn = value.IssuedOn ? moment(value.IssuedOn).format("YYYYY-MM-DD") : "N/A";
            const nextDueOn = value.NextDueOn ? moment(value.NextDueOn).format("YYYYY-MM-DD") : "N/A";
            const options = `<option value="">Certificate Type</option>` + certificateType.map((item) => `<option value="${item.type}" ${item.type == value.TypeOfCertificate ? "selected" : ""}> ${item.type}</option>`).join("");
            var getrowcontent = '<tr><td><input class="add addrow5 border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+" ></td><td>' + getIndex + '</td><td><input class="w-250px Draftformatfile my-2" id="certificateformatfile3" aria-describedby="inputGroupFileAddon01" type="file" accept="application/*"><a href=' + value.CertificateDoc + ' class="btn btn-primary">View</a></td><td><div class="form-group"><select class="form-control typepfDocument level_styles" id="typepfDocument3" name =""> ' + options + '</select ></div ></td><td><div class="form-group"><input type="date" name="" id="issuedOn3" class="form-control level_styles" value=' + issuedOn + '></div></td><td><div class="form-group"><input type="date" name="" id="nextDueOn3" class="form-control level_styles" value=' + nextDueOn + '></div></td><td><div class="form-group"><textarea type="text" name="" id="remarks3" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Remarks" style="" edit_id=' + value.Id + '>' + value.Remarks + '</textarea></div></td><td><div class="deleterow5 mt-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-quality5 tbody").append(getrowcontent);
        }
        else {
            const options = `<option value="">Certificate Type</option>` + certificateType.map((item) => `<option value="${item.type}"> ${item.type}</option>`).join("");
            var getrowcontent = '<tr><td><input class="add addrow5 border-0 btn btn-icon btn-light btn-sm" name="&plus;" type="button" value="+" ></td><td>' + getIndex + '</td><td><input class="w-250px Draftformatfile my-2" id="certificateformatfile3" aria-describedby="inputGroupFileAddon01" type="file" accept="application/*"><a href="#" class="btn btn-primary viewButton disabled" >View</a></td><td><div class="form-group"><select class="form-control typepfDocument level_styles" id="typepfDocument3" name ="" > ' + options + '</select ></div ></td><td><div class="form-group"><input type="date" name="" id="issuedOn3" class="form-control level_styles"></div></td><td><div class="form-group"><input type="date" name="" id="nextDueOn3" class="form-control level_styles"></div></td><td><div class="form-group"><textarea type="text" name="" id="remarks3" class="NameoftheDoc form-control nameofdocument_styles" placeholder="Remarks" style=""> </textarea></div></td><td><div class="deleterow5 my-2" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
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

    $("#table-quality5").on("click", ".deleterow5", function () {
        $(this).closest("tr").remove();
    });

    /*table quality 5 ends*/

    $("#createTemplateSubmit2").submit((event) => {
        $(".spinner").show();
        event.preventDefault()
        debugger;
        var gettablelength = $("#table-quality2 tbody tr").length;
        if (gettablelength > 0) {
            var completedRequests = 0;
            for (var i = 0; i < gettablelength; i++) {
                var postdata = new FormData();
                var firs_table_ROWID = $("#table-quality2 tbody tr").eq(i).find("#NameoftheDoc").attr("edit_id");
                if (firs_table_ROWID != null) postdata.append('firs_table_ROWID', firs_table_ROWID);
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
                    url: "https://api.pioneerfoods.in/NewQualityManagement/CreateOrUpdateQualityTemplateExecution",
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
        debugger;
        var gettablelength = $("#table-quality3 tbody tr").length;
        if (gettablelength > 0) {
            var completedRequests = 0;
            for (var i = 0; i < gettablelength; i++) {
                var postdata = new FormData();
                var firs_table_ROWID = $("#table-quality3 tbody tr").eq(i).find("#NameoftheDoc1").attr("edit_id");
                if (firs_table_ROWID != null) postdata.append('firs_table_ROWID', firs_table_ROWID);
                var ID = $("#table-quality3 tbody tr").eq(i).find("#NameoftheDoc1").attr("edit_id");
                if (ID != null) postdata.append('ID', ID);
                var multiDocs = $("#table-quality3 tbody tr").eq(i).find("#certificateformatfile1")[0].files;
                for (var j = 0; j < multiDocs.length; j++) {
                    postdata.append("file" + j, multiDocs[j]);
                }

                var DocumentName = $("#table-quality3 tbody tr").eq(i).find("#NameoftheDoc1").val();
                var TypeOfTraining = $("#table-quality3 tbody tr").eq(i).find("#type1").val();
                var ClauseNo = $("#table-quality3 tbody tr").eq(i).find("#ClauseNo1").val();
                var jobID = $("#ddjobid").val();

                postdata.append('JobID', jobID);
                postdata.append('Nameofthedoc', DocumentName);
                postdata.append('level4pdf', TypeOfTraining);
                postdata.append('AdminId', ADMIN_AUTH);
                postdata.append('clause', ClauseNo);
                $.ajax({
                    url: "https://api.pioneerfoods.in/NewQualityManagement/CreateOrUpdateInternalAuditMRM",
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
        debugger;
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

                var DocumentName = $("#table-quality4 tbody tr").eq(i).find("#NameoftheDoc2").val();
                var TypeOfTraining = $("#table-quality4 tbody tr").eq(i).find("#type2").val();
                var ClauseNo = $("#table-quality4 tbody tr").eq(i).find("#ClauseNo2").val();
                var jobID = $("#ddjobid").val();

                postdata.append('JobID', jobID);
                postdata.append('Nameofthedoc', DocumentName);
                postdata.append('TypeOfTraining', TypeOfTraining);
                postdata.append('AdminId', ADMIN_AUTH);
                postdata.append('clause', ClauseNo);
                $.ajax({
                    url: "https://api.pioneerfoods.in/NewQualityManagement/CreateOrUpdateExternalAuditMRM",
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
        debugger;
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

                var file = $("#table-quality5 tbody tr").eq(i).find("#certificateformatfile3")[0].files;
                var TypeOfCertificate = $("#table-quality5 tbody tr").eq(i).find("#typepfDocument3").val();
                var IssuedOn = $("#table-quality5 tbody tr").eq(i).find("#issuedOn3").val();
                var NextDueOn = $("#table-quality5 tbody tr").eq(i).find("#nextDueOn3").val();
                var Remarks = $("#table-quality5 tbody tr").eq(i).find("#remarks3").val();
                var jobID = $("#ddjobid").val();

                postdata.append('CertificateDoc', file);
                postdata.append('JobID', jobID);
                postdata.append('TypeOfCertificate', TypeOfCertificate);
                postdata.append('AdminId', ADMIN_AUTH);
                postdata.append('IssuedOn', IssuedOn);
                postdata.append('NextDueOn', NextDueOn);
                postdata.append('Remarks', Remarks);
                $.ajax({
                    url: "https://api.pioneerfoods.in/NewQualityManagement/CreateOrUpdateQualityCertificate",
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
        debugger;
        $(".spinner").show();
        var jobID = $("#ddjobid").val();
        $.ajax({
            url: "https://api.pioneerfoods.in/NewQualityManagement/ListAllQualityData?jobId=" + jobID,
            type: "GET",
            async: false,
            contentType: false,
            processData: false,
            success: function (data) {
                getQualityControl_data_all.push(data);
                getQualityData_from_Jobid(data)
            },

        })
        $(".spinner").hide();

    }
    function getQualityData_from_Jobid(data) {
        debugger;
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

        if (data?.TrainingDocs.length > 0) {
            data?.TrainingDocs?.forEach((value) => {
                getQualityControl1(value);
            });
        }
        else {
            getQualityControl1();
        }

        const tableBody2 = $("#table-quality1-main tbody");
        tableBody2.empty();

        if (data?.SkillDocs.length > 0) {
            data?.SkillDocs?.forEach((value) => {
                getQualityControl1main(value);
            })
        }
        else {
            getQualityControl1main();
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
            url: "https://api.pioneerfoods.in/Quality_Template/List_Template?AdminId=" + ADMIN_AUTH,
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
            url: "https://api.pioneerfoods.in/Client/GetList?AdminId=" + ADMIN_AUTH,
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

    function getDocId() {
        $.ajax({
            url: "https://api.pioneerfoods.in/NewQualityManagement/DocID?AdminId=" + ADMIN_AUTH,
            type: "GET",
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                docIdData = data;
                $("#ddclause").empty();
                var defaultoption = '<option value="" >Select Doc ID.</option>';
                $("#ddclause").append(defaultoption);

                $.each(data, function (index, value) {
                    var getdetails = '<option value="' + value + '">' + value + '</option>';
                    $("#ddclause").append(getdetails);
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
            url: "https://api.pioneerfoods.in/Quality/ListforJobID?AdminID=" + ADMIN_AUTH,
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

});