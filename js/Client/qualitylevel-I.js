$(document).ready(function () {
    const CLIENT_AUTH = localStorage.getItem("Client_auth");
    const url = window.location.search;
    const params = new URLSearchParams(url);
    getJObID();
    const ID = params.get("id");
    if (ID != null) {
        $("#ddjobid").attr('disabled', 'disabled');
        $('#ddjobid').val(ID);
        $("#client").hide();
        $("#jobnum").hide();
        $("#Employee").hide();
        Getlistofalltables(ID);
    }



    function getJObID() {

        $.ajax({
            url: "https://api.pdca.in/ClientQuality/ListforJobID?ClientID=" + CLIENT_AUTH,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {

                $("#ddjobid").empty();
                var defaultoption = '<option value="0">Select Job ID</option>';
                $("#ddjobid").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.ID + '">' + val.JOBID + '</option>'
                    $("#ddjobid").append(getdetails);
                });


            }
        });
    }
    $("#ddclient").change(function () {
        var getvalue = $(this).val();
        if (getvalue.trim() == "0") {
            $("#jobid").show();
        }
        else {
            $("#jobid").hide();
        }
    })
    $("#ddjobid").change(function () {
        var getvalue = $(this).val();
        if (getvalue.trim() == "0") {
            $("#client").show();
        }
        else {
            $("#client").hide();
        }
    })
    $("#ddjobid").change(function () {
        var getvalue = $(this).val();
        if (getvalue.trim() == "0") {
            $("#jobnum").show();
        }
        else {
            $("#jobnum").hide();
        }
    })
    $("#ddjobid").change(function () {
        var getvalue = $(this).val();
        if (getvalue.trim() == "0") {
            $("#Employee").show();
        }
        else {
            $("#Employee").hide();
        }
    })
    $("#ddjobid").change(function () {
        var getjoballocationid = $(this).val();
        Getlistofalltables(getjoballocationid);
    });


    function Getlistofalltables(getjoballocationid) {

        $.ajax({
            url: "https://api.pdca.in/ClientQuality/QualityStandardList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#table-iddoc tbody").empty();
                if (data != 0) {
                    $.each(data, function (index, values) {
                        if (values.STANDARD != null) {
                            var STANDARD = '<td><div class=form-group><input class="form-control standard"id=standard name="" value="' + values.STANDARD + '" disabled></div></td>'

                        }
                        else {
                            var STANDARD = '<td> <div class=form-group> <input type="text" name="" id="standard" class="standard form-control"></div></td> ';

                        }
                        if (values.Document != null) {
                            var Document = '<td> <div class=form-group><a class="alink" target="_blank" href="' + values.Document + '"><button class="btn btn-primary" type="button">View</button></a></div></td>'

                        }
                        else {
                            var Document = '<td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file></td> ';

                        }
                        if (values.link != null) {
                            var link = '<td><div class=form-group><input type="url" name="" id="standardlink" class="standardlink form-control"  value="' + values.link + '" disabled></div></td>'

                        }
                        else {
                            var link = '<td><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></td>';

                        }
                        var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+></td>' + STANDARD + '' + Document + '' + link + '</tr>';
                        $("#table-iddoc tbody").append(getdetails);
                    });
                }
                else {
                    var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+><td><div class=form-group><input class="form-control standard"id=standard name=""></div><td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></div> </tr>';
                    $("#table-iddoc tbody").append(getrowcontent);
                }
            }
        });

        $.ajax({
            url: "https://api.pdca.in/ClientQuality/QualityDocsList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#table-quality tbody").empty();
                if (data != 0) {
                    $.each(data, function (index, values) {
                        if (values.Draftformat == null) {
                            var Draftformat = '<td><input aria-describedby=inputGroupFileAddon01 class="Draftformatfile w-200px"id=Draftformatfile type=file>'
                        }
                        else {
                            var Draftformat = '<td><a class="alink" target="_blank"  href="' + values.Draftformat + '"><button class="btn btn-primary" type="button">View</button></a></td>'
                        }
                        if (values.Approveddocupload == null) {
                            var Approveddocupload = '<td><input class="w-200px Apporveddocuploadfile"id=Apporveddocuploadfile aria-describedby=inputGroupFileAddon01 type=file></td>'
                        }
                        else {
                            var Approveddocupload = '<td><a class="alink1" target="_blank"  href="' + values.Approveddocupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.NameoftheDoc == null) {
                            var NameoftheDoc = '<td> <input type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control w-200px"> </div></td>'
                        }
                        else {
                            var NameoftheDoc = '<td><div class="form-group">  <input type="text" name="" id="NameoftheDoc" value="' + values.NameoftheDoc + '" disabled class="NameoftheDoc form-control w-200px"> </div></td>';
                        }
                        if (values.Type == null) {
                            var Type = '<td><div class="form-group"> <select name="" id="typepfDocument" class="typepfDocument form-control w-150px"> <option value="level1">Level 1</option> <option value="level2">Level 2</option> <option value="level3">Level 3</option> <option value="level4">Level 4</option> </select> </div></td>'
                        }
                        else {
                            var Type = '<td><div class="form-group"> <select name="" id="typepfDocument' + values.ID + '" class="typepfDocument form-control w-150px" disabled><option value="level1">Level1</option> <option value="level2">Level 2</option> <option value="level3">Level 3</option> <option value="level4">Level 4</option> </select> </div></td>';
                        }
                        if (values.clause == null) {
                            var clause = '<td> <div class="form-group"><input type="text" name="" id="ClauseNo" class="ClauseNo form-control w-150px"></div></td>'
                        }
                        else {
                            var clause = '<td><div class=form-group><input class="form-control ClauseNo w-150px" name="" value="' + values.clause + '" id=ClauseNo disabled></div></td>';
                        }
                        //if (values.ClientApproval == null) {
                        //    var ClientApproval = '<td><div class=form-group><input type="text" name="" id="clientApproval" class="clientApproval form-control w-200px"></div></td>'
                        //}
                        //else {
                        //    var ClientApproval = '<td><div class=form-group><input class="form-control clientApproval w-200px" name="" value="' + values.ClientApproval + '" id="clientApproval" disabled></div></td>';
                        //}
                        if (values.ClientRemarks == null) {
                            var ClientRemarks = '<td><div class=form-group><textarea type="text" name="" id="clientRemarks" class="clientRemarks form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var ClientRemarks = '<td><div class=form-group><textarea type="text" name="" id="clientRemarks" class="clientRemarks form-control w-200px" disabled>' + values.ClientRemarks + '</textarea></div></td>';
                        }
                        var getdetails = ' <tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm" name=&plus value=+ type=button></td>' + NameoftheDoc + '' + Type.trim() + '' + Draftformat + '' + clause + '' + Approveddocupload + '' + ClientRemarks + '</tr>'
                        $("#table-quality tbody").append(getdetails);
                        $("#typepfDocument" + values.ID).val(values.Type.trim());
                    });
                }
                else {
                    var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/></td><td> <div class="form-group"> <input type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control w-200px"> </div></td><td> <div class="form-group"> <select name="" id="typepfDocument" class="typepfDocument form-control w-150px"> <option value="level1">Level 1</option> <option value="level2">Level 2</option> <option value="level3">Level 3</option> <option value="level4">Level 4</option> </select> </div></td><td> <input type="file" class="Draftformatfile w-200px" id="Draftformatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="ClauseNo" class="ClauseNo form-control w-150px"> </div></td><td> <input type="file" class="Apporveddocuploadfile w-200px" id="Apporveddocuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="clientRemarks" class="clientRemarks form-control w-200px"></textarea> </div></td></tr>'
                    $("#table-quality tbody").append(getrowcontent);
                }
            }
        });


        //$.ajax({
        //    url: "https://api.pdca.in/ClientQuality/AnnualTrainingList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
        //    type: "GET",
        //    async: false,
        //    contentType: false, // Not to set any content header
        //    processData: false, // Not to process data
        //    //data: fileData,
        //    success: function (data) {
        //        $("#table-AunalTraining tbody").empty();
        //        if (data != 0) {
        //            $.each(data, function (index, values) {
        //                if (values.Year == null) {
        //                    var Year = '<td><div class=form-group><input class="form-control year"id=year name=""></div></td>'
        //                }
        //                else {
        //                    var Year = '<td><div class=form-group><input class="form-control year"id=year value="' + values.Year + '" name="" disabled></div></td>';
        //                }
        //                if (values.AnnualTrainingpalnner == null) {
        //                    var AnnualTrainingpalnner = '<td><input type="file" class="DraftTrainingplannerfile w-200px" id="DraftTrainingplannerfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                }
        //                else {
        //                    var AnnualTrainingpalnner = '<td><a class="alink" target="_blank"  href="' + values.AnnualTrainingpalnner + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                }
        //                if (values.ApprovedAnnualTraining == null) {
        //                    var ApprovedAnnualTraining = '<td><input type="file" class="ApprovedAnnualTrainingfile w-200px" id="ApprovedAnnualTrainingfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                }
        //                else {
        //                    var ApprovedAnnualTraining = '<td><a class="alink1" target="_blank"  href="' + values.ApprovedAnnualTraining + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                }
        //                if (values.Remarks == null) {
        //                    var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control"></textarea></div></td>'
        //                }
        //                else {
        //                    var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control" disabled>' + values.Remarks + '</textarea></div></td>';
        //                }
        //                var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus value=+></td> ' + Year + ' ' + AnnualTrainingpalnner + '' + ApprovedAnnualTraining + ' ' + Remarks + '</tr>'
        //                $("#table-AunalTraining tbody").append(getdetails);
        //            });
        //        }
        //        else {
        //            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus value=+></td><td><div class=form-group><input class="form-control year"id=year name=""></div></td><input class="w-200px DraftTrainingplannerfile"id=DraftTrainingplannerfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-200px ApprovedAnnualTrainingfile"id=ApprovedAnnualTrainingfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group><textarea class="form-control annualRemarks"id=annualRemarks name=""type=text></textarea></div></td> </tr>';
        //            $("#table-AunalTraining tbody").append(getrowcontent);

        //        }
        //    }

        //});


        //$.ajax({
        //    url: "https://api.pdca.in/ClientQuality/MonthlyTrainingList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
        //    type: "GET",
        //    contentType: false, // Not to set any content header
        //    processData: false, // Not to process data
        //    async: false,
        //    //data: fileData,
        //    success: function (data) {
        //        $("#table-Training tbody").empty();
        //        if (data != 0) {
        //            $.each(data, function (index, values) {

        //                if (values.Dateoftrainingconducted != null) {
        //                    var completedDate = new Date(parseInt(values.Dateoftrainingconducted.replace("/Date(", "").replace(")/")));
        //                    var dd = completedDate.getDate();
        //                    var mm = completedDate.getMonth() + 1; //January is 0! 
        //                    var yyyy = completedDate.getFullYear();
        //                    if (dd < 10) { dd = '0' + dd }
        //                    if (mm < 10) { mm = '0' + mm }
        //                    var datef = yyyy + '-' + mm + '-' + dd;
        //                }
        //                else {
        //                    datef = "";
        //                }
        //                if (datef == null || datef == "") {
        //                    var datef = '<td><div class=form-group><input type="date" name="" id="dateOfTraining" class="dateOfTraining form-control w-200px"></div></td>'
        //                }
        //                else {
        //                    var datef = '<td><div class=form-group><input type="date" name="" id="dateOfTraining" value="' + datef + '" class="dateOfTraining form-control w-200px" disabled></div></td>';
        //                }
        //                if (values.topicoftraining == null) {
        //                    var topicoftraining = '<td><div class=form-group><input type="text" name="" id="topicName" class="topicName form-control w-200px"></div></td>'
        //                }
        //                else {
        //                    var topicoftraining = '<td> <div class=form-group><input type="text" name="" id="topicName" class="topicName form-control w-200px" value="' + values.topicoftraining + '" disabled></div></td>';
        //                }
        //                if (values.Attendenceformat == null) {
        //                    var Attendenceformat = '<td> <input type="file" class="Attendenceformatfile w-150px" id="Attendenceformatfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                }
        //                else {
        //                    var Attendenceformat = '<td><a class="alink" target="_blank" href="' + values.Attendenceformat + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                }
        //                if (values.Evaluationdoc == null) {
        //                    var Evaluationdoc = '<td>  <input type="file" class="Evaluationpaperdownloadfile w-150px" id="Evaluationpaperdownloadfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                }
        //                else {
        //                    var Evaluationdoc = '<td><a class="alink1" target="_blank"  href="' + values.Evaluationdoc + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                }
        //                if (values.Uploadfilledtrainingdocs == null) {
        //                    var Uploadfilledtrainingdocs = '<td>  <input type="file" class="UploadfilledTrainingDocsfile w-150px" id="UploadfilledTrainingDocsfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                }
        //                else {
        //                    var Uploadfilledtrainingdocs = '<td><a class="alink2" target="_blank"  href="' + values.Uploadfilledtrainingdocs + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                }
        //                if (values.Remarks == null) {
        //                    var Remarks = '<td><div class="form-group"><textarea type="text" name="" id="monthlyRemarks" class="monthlyRemarks form-control w-200px"></textarea></div></td>'
        //                }
        //                else {
        //                    var Remarks = '<td><div class="form-group"><textarea type="text" name="" id="monthlyRemarks" class="monthlyRemarks form-control w-200px" disabled>' + values.Remarks + '</textarea></div></td>';
        //                }
        //                var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus value=+></td>' + datef + ' ' + topicoftraining + ' ' + Attendenceformat + ' ' + Evaluationdoc + ' ' + Uploadfilledtrainingdocs + '  ' + Remarks + '</tr>'
        //                $("#table-Training tbody").append(getdetails);

        //            });
        //        }
        //        else {

        //            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus value=+><td><div class=form-group><input class="form-control dateOfTraining w-200px"id=dateOfTraining type="date" name=""></div><td><div class=form-group><input class="form-control topicName w-200px"id=topicName name=""></div><td><input class="w-150px Attendenceformatfile"id=Attendenceformatfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px Evaluationpaperdownloadfile"id=Evaluationpaperdownloadfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px UploadfilledTrainingDocsfile"id=UploadfilledTrainingDocsfile type=file aria-describedby=inputGroupFileAddon01><td><div class=form-group><textarea class="form-control monthlyRemarks w-200px"id=monthlyRemarks name=""type=text></textarea></div></td></tr>';
        //            $("#table-Training tbody").append(getrowcontent);

        //        }
        //    }

        //});


        //$.ajax({
        //    url: "https://api.pdca.in/ClientQuality/SkillMatrixList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
        //    type: "GET",
        //    contentType: false, // Not to set any content header
        //    processData: false, // Not to process data
        //    async: false,
        //    success: function (data) {
        //        $("#table-skill tbody").empty();
        //        if (data != 0) {
        //            $.each(data, function (index, values) {
        //                if (values.EmpName == null) {
        //                    var EmpName = '<td><div class=form-group> <input type="text" name="" id="employeeName" class="employeeName form-control w-200px"></div></td>'
        //                }
        //                else {
        //                    var EmpName = '<td><div class=form-group> <input type="text" name="" id="employeeName" value = "' + values.EmpName + '" class="employeeName form-control w-200px" disabled></div></td>';
        //                }
        //                if (values.EmpID == null) {
        //                    var EmpID = '<td><div class=form-group> <input type="text" name="" id="employeeId" class="employeeId form-control w-200px"></div></td>'
        //                }
        //                else {
        //                    var EmpID = '<td><div class=form-group><input type="text" name="" id="employeeId"  value = "' + values.EmpID + '" class="employeeId form-control w-200px" disabled></div></td>';
        //                }
        //                if (values.JobRole == null) {
        //                    var JobRole = '<td> <div class=form-group><input type="text" name="" id="jobRole" class="jobRole form-control w-200px"></div></td>'
        //                }
        //                else {
        //                    var JobRole = '<td><div class=form-group><input type="text" name="" id="jobRole" value = "' + values.JobRole + '" class="jobRole form-control w-200px" disabled></div></td>';
        //                }
        //                if (values.Evidencesupload == null) {
        //                    var Evidencesupload = '<td> <input type="file" class="Evidencesuploadfile w-150px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                }
        //                else {
        //                    var Evidencesupload = '<td><a class="alink" target="_blank"  href="' + values.Evidencesupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                }
        //                if (values.JDupload == null) {
        //                    var JDupload = '<td><input type="file" class="JDUploadFile w-150px" id="JDUploadFile" aria-describedby="inputGroupFileAddon01"></td>'
        //                }
        //                else {
        //                    var JDupload = '<td><a class="alink" target="_blank"  href="' + values.JDupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                }
        //                if (values.Authupload == null) {
        //                    var Authupload = '<td><input type="file" class="AuthUploadFile w-150px" id="AuthUploadFile" aria-describedby="inputGroupFileAddon01"></td>'
        //                }
        //                else {
        //                    var Authupload = '<td><a class="alink" target="_blank"  href="' + values.Authupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                }

        //                var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+>' + EmpName + ' ' + EmpID + ' ' + JobRole + ' ' + Evidencesupload + ' ' + JDupload + ' ' + Authupload + '</tr>'
        //                $("#table-skill tbody").append(getdetails);
        //            });
        //        }
        //        else {

        //            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+><td><div class=form-group><input class="form-control employeeName w-200px"id=employeeName name=""></div><td><div class=form-group><input class="form-control employeeId w-200px"id=employeeId name=""></div><td><div class=form-group><input class="form-control jobRole w-200px"id=jobRole name=""></div><td><input class="w-150px Evidencesuploadfile"id=Evidencesuploadfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px JDUploadFile"id=JDUploadFile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px AuthUploadFile"id=AuthUploadFile aria-describedby=inputGroupFileAddon01 type=file></tr>';
        //            $("#table-skill tbody").append(getrowcontent);

        //        }
        //    }

        //});

    }

    $("#createTemplateSubmit").submit(function () {
        var checkexisting = $("#ddjobid").val();
        if (checkexisting == "0") {

            var CompanyName = $("#ddclient option:selected").text();
            var JobNo = $("#ddjobno").val();
            var ClientID = $("#ddclient").val();
            var EmpID = $("#ddlEmployee").val();
            var jobID = $("#ddjobid").val();
            var ClientID = CLIENT_AUTH;

            var postdata = {
                "CompanyName": CompanyName,
                "JobNo": JobNo,
                "ClientID": ClientID,
                "EmpID": EmpID,
                "JobID": jobID,
                "ClientID": ClientID
            }
            $.ajax({
                url: "https://api.pdca.in/ClientQuality/Create_Joballocation",
                type: "POST",
                data: postdata,
                dataType: "json",
                traditional: true,
                crossDomain: true,
                success: function (data) {
                    if (data.responsecode == 1) {
                        var joballocation_ID = data.responseObject;
                        standardajax(joballocation_ID);
                        qualitydocs(joballocation_ID);
                        //CreateAnnualtraining(joballocation_ID);
                        //CreateMonthlytraining(joballocation_ID);
                        //localStorage.setItem("JobID", joballocation_ID)
                        //CreateSkillMatrix(joballocation_ID);
                        alert("Quality for Business Created Successfully");
                        window.location = "/client/qualityCompliance/QualityExecution.html?id=" + joballocation_ID;
                    }
                    else {
                        alert(data.responsemessage);
                    }
                }
            });
        }
        else {
            var joballocation_ID = checkexisting;
            standardajax(joballocation_ID);
            qualitydocs(joballocation_ID);
            //CreateAnnualtraining(joballocation_ID);
            //CreateMonthlytraining(joballocation_ID);
            //localStorage.setItem("JobID", joballocation_ID)
            //CreateSkillMatrix(joballocation_ID);
            alert("Quality for Business Updated Successfully");
            window.location = "/client/qualityCompliance/QualityExecution.html?id=" + joballocation_ID;
        }
    });

    function standardajax(joballocation_ID) {
        debugger;
        var gettablelength = $("#table-iddoc tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var files = ""
                var checkqualityStandard = $("#table-iddoc tbody tr").eq(i).find(".alink").attr("href");
                if (checkqualityStandard) {
                    //do nothing
                }
                else {

                    var checkfiles = $("#table-iddoc tbody tr").eq(i).find(".qualityStandardDocumentfile").val();
                    if (checkfiles) {
                        files = $("#table-iddoc tbody tr").eq(i).find(".qualityStandardDocumentfile")[0].files[0];
                    }

                }
                var STANDARD = $("#table-iddoc tbody tr").eq(i).find(".standard").val();
                var standardlink = $("#table-iddoc tbody tr").eq(i).find(".standardlink").val();
                var joballocation_ID = joballocation_ID;
                var ClientID = CLIENT_AUTH;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', files);
                postdata.append('STANDARD', STANDARD);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('ClientID', ClientID);
                postdata.append('link', standardlink);


                $.ajax({
                    url: "https://api.pdca.in/ClientQuality/Update_Qualitystandard",
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
                            var joballocation_ID = data.responseObject;
                        }

                    }
                });
            };
        }
    };
    function qualitydocs(joballocation_ID) {

        var gettablelength = $("#table-quality tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-quality tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var file = ""
                var checkDraftformat = $("#table-quality tbody tr").eq(i).find(".alink").attr("href");
                if (checkDraftformat) {
                    //do nothing
                }
                else {

                    var checkfile2 = $("#table-quality tbody tr").eq(i).find(".Draftformatfile").val();
                    if (checkfile2) {
                        file = $("#table-quality tbody tr").eq(i).find(".Draftformatfile")[0].files[0];
                    }

                }
                var file1 = ""
                var checkdocapproved = $("#table-quality tbody tr").eq(i).find(".alink1").attr("href");
                if (checkdocapproved) {
                    //do nothing
                }
                else {

                    var checkfile = $("#table-quality tbody tr").eq(i).find(".Apporveddocuploadfile").val();
                    if (checkfile) {
                        file1 = $("#table-quality tbody tr").eq(i).find(".Apporveddocuploadfile")[0].files[0];
                    }

                }
                var NameoftheDoc = $("#table-quality tbody tr").eq(i).find(".NameoftheDoc").val();
                var typepfDocument = $("#table-quality tbody tr").eq(i).find(".typepfDocument").val();
                var ClauseNo = $("#table-quality tbody tr").eq(i).find(".ClauseNo").val();
              /*  var clientApproval = $("#table-quality tbody tr").eq(i).find(".clientApproval").val();*/
                var clientRemarks = $("#table-quality tbody tr").eq(i).find(".clientRemarks").val();
                var joballocation_ID = joballocation_ID;

                var postdata = new FormData();
                if (ID != null) {
                    postdata.append('ID', ID);
                }
                else {
                    //do nothing
                }
                postdata.append("file", file);
                postdata.append("file1", file1);
                postdata.append('NameoftheDoc', NameoftheDoc);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('Type', typepfDocument);
               /* postdata.append('ClientApproval', clientApproval);*/
                postdata.append('ClientRemarks', clientRemarks);
                postdata.append('clause', ClauseNo);
                postdata.append('ClientID', CLIENT_AUTH);
                $.ajax({
                    url: "https://api.pdca.in/ClientQuality/Update_QualityDocs",
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
                            var joballocation_ID = data.responseObject;

                        }
                    }
                });


            };
        }

    }
    //function CreateAnnualtraining(joballocation_ID) {

    //    var gettablelength = $("#table-AunalTraining tbody tr").length;
    //    if (gettablelength > 0) {
    //        for (var i = 0; i < gettablelength; i++) {
    //            var ID = $("#table-AunalTraining tbody tr").eq(i).find(".txtid").val();
    //            if (ID == undefined) {
    //                ID = null;
    //            }
    //            var file2 = ""
    //            var checkDraftTraining = $("#table-AunalTraining tbody tr").eq(i).find(".alink").attr("href");
    //            if (checkDraftTraining) {
    //                //do nothing
    //            }
    //            else {

    //                var checkfile2 = $("#table-AunalTraining tbody tr").eq(i).find(".DraftTrainingplannerfile").val();
    //                if (checkfile2) {
    //                    file2 = $("#table-AunalTraining tbody tr").eq(i).find(".DraftTrainingplannerfile")[0].files[0];
    //                }

    //            }
    //            var file3 = ""
    //            var checkDraftTraining = $("#table-AunalTraining tbody tr").eq(i).find(".alink1").attr("href");
    //            if (checkDraftTraining) {
    //                //do nothing
    //            }
    //            else {

    //                var checkfile3 = $("#table-AunalTraining tbody tr").eq(i).find(".ApprovedAnnualTrainingfile").val();
    //                if (checkfile3) {
    //                    file3 = $("#table-AunalTraining tbody tr").eq(i).find(".ApprovedAnnualTrainingfile")[0].files[0];
    //                }

    //            }
    //            var year = $("#table-AunalTraining tbody tr").eq(i).find(".year").val();
    //            var annualRemarks = $("#table-AunalTraining tbody tr").eq(i).find(".annualRemarks").val();

    //            var joballocation_ID = joballocation_ID;

    //            var postdata = new FormData();
    //            postdata.append('file', file2);
    //            postdata.append('ID', ID);
    //            postdata.append('file1', file3);
    //            postdata.append('Remarks', annualRemarks);
    //            postdata.append('Year', year);
    //            postdata.append('joballocation_ID', joballocation_ID)
    //            postdata.append('ClientID', CLIENT_AUTH);
    //            $.ajax({
    //                url: "https://api.pdca.in/ClientQuality/Update_Annualtraining",
    //                type: "POST",
    //                data: postdata,
    //                async: false,
    //                dataType: "json",
    //                processData: false,
    //                crossDomain: true,
    //                cache: false,
    //                contentType: false,
    //                success: function (data) {

    //                    if (data.responsecode == 1) {
    //                        var joballocation_ID = data.responseObject;

    //                    }
    //                }
    //            });
    //        };
    //    }
    //}
    //function CreateMonthlytraining(joballocation_ID) {

    //    var gettablelength = $("#table-Training tbody tr").length;
    //    if (gettablelength > 0) {
    //        for (var i = 0; i < gettablelength; i++) {
    //            var ID = $("#table-Training tbody tr").eq(i).find(".txtid").val();
    //            if (ID == undefined) {
    //                ID = null;
    //            }
    //            var file4 = ""
    //            var checkAttendenceformat = $("#table-Training tbody tr").eq(i).find(".alink").attr("href");
    //            if (checkAttendenceformat) {
    //                //do nothing
    //            }
    //            else {

    //                var checkfile4 = $("#table-Training tbody tr").eq(i).find(".Attendenceformatfile").val();
    //                if (checkfile4) {
    //                    file4 = $("#table-Training tbody tr").eq(i).find(".Attendenceformatfile")[0].files[0];
    //                }

    //            }
    //            var file5 = ""
    //            var checkEvaluationpaperdown = $("#table-Training tbody tr").eq(i).find(".alink1").attr("href");
    //            if (checkEvaluationpaperdown) {
    //                //do nothing
    //            }
    //            else {

    //                var checkfile5 = $("#table-Training tbody tr").eq(i).find(".Evaluationpaperdownloadfile").val();
    //                if (checkfile5) {
    //                    file5 = $("#table-Training tbody tr").eq(i).find(".Evaluationpaperdownloadfile")[0].files[0];
    //                }

    //            }
    //            var file6 = ""
    //            var checkUploadfilledTraining = $("#table-Training tbody tr").eq(i).find(".alink2").attr("href");
    //            if (checkUploadfilledTraining) {
    //                //do nothing
    //            }
    //            else {

    //                var checkfile6 = $("#table-Training tbody tr").eq(i).find(".UploadfilledTrainingDocsfile").val();
    //                if (checkfile6) {
    //                    file6 = $("#table-Training tbody tr").eq(i).find(".UploadfilledTrainingDocsfile")[0].files[0];
    //                }

    //            }
    //            var dateOfTraining = $("#table-Training tbody tr").eq(i).find(".dateOfTraining").val();
    //            var topicName = $("#table-Training tbody tr").eq(i).find(".topicName").val();
    //            var monthlyRemarks = $("#table-Training tbody tr").eq(i).find(".monthlyRemarks").val();

    //            var joballocation_ID = joballocation_ID;
    //            var postdata = new FormData();
    //            postdata.append('file', file4);
    //            postdata.append('ID', ID);
    //            postdata.append('file1', file5);
    //            postdata.append('file2', file6);
    //            postdata.append('Dateoftrainingconducted', dateOfTraining);
    //            postdata.append('topicoftraining', topicName);
    //            postdata.append('Remarks', monthlyRemarks)
    //            postdata.append('joballocation_ID', joballocation_ID);
    //            postdata.append('ClientID', CLIENT_AUTH);


    //            $.ajax({
    //                url: "https://api.pdca.in/ClientQuality/Update_Monthlytraining",
    //                type: "POST",
    //                data: postdata,
    //                async: false,
    //                dataType: "json",
    //                processData: false,
    //                crossDomain: true,
    //                cache: false,
    //                contentType: false,
    //                success: function (data) {

    //                    if (data.responsecode == 1) {
    //                        var joballocation_ID = data.responseObject;

    //                    }
    //                }
    //            });


    //        };
    //    }

    //}
    //function CreateSkillMatrix(joballocation_ID) {

    //    var gettablelength = $("#table-skill tbody tr").length;
    //    if (gettablelength > 0) {
    //        for (var i = 0; i < gettablelength; i++) {
    //            var ID = $("#table-skill tbody tr").eq(i).find(".txtid").val();
    //            if (ID == undefined) {
    //                ID = null;
    //            }
    //            var file7 = ""
    //            var checkEvidencesupload = $("#table-skill tbody tr").eq(i).find(".alink").attr("href");
    //            if (checkEvidencesupload) {
    //                //do nothing
    //            }
    //            else {

    //                var checkfile7 = $("#table-skill tbody tr").eq(i).find(".Evidencesuploadfile").val();
    //                if (checkfile7) {
    //                    file7 = $("#table-skill tbody tr").eq(i).find(".Evidencesuploadfile")[0].files[0];
    //                }
    //            }
    //            var file8 = ""
    //            var checkJDUploadFile = $("#table-skill tbody tr").eq(i).find(".alink1").attr("href");
    //            if (checkJDUploadFile) {
    //                //do nothing
    //            }
    //            else {

    //                var checkfile8 = $("#table-skill tbody tr").eq(i).find(".JDUploadFile").val();
    //                if (checkfile8) {
    //                    file8 = $("#table-skill tbody tr").eq(i).find(".JDUploadFile")[0].files[0];
    //                }
    //            }
    //            var file9 = ""
    //            var checkAuthUploadFile = $("#table-skill tbody tr").eq(i).find(".alink2").attr("href");
    //            if (checkAuthUploadFile) {
    //                //do nothing
    //            }
    //            else {

    //                var checkfile9 = $("#table-skill tbody tr").eq(i).find(".AuthUploadFile").val();
    //                if (checkfile9) {
    //                    file9 = $("#table-skill tbody tr").eq(i).find(".AuthUploadFile")[0].files[0];
    //                }
    //            }
    //            var employeeNamee = $("#table-skill tbody tr").eq(i).find(".employeeName").val();
    //            var employeeIdd = $("#table-skill tbody tr").eq(i).find(".employeeId").val();
    //            var jobRolee = $("#table-skill tbody tr").eq(i).find(".jobRole").val();
    //            var joballocation_ID = joballocation_ID;


    //            var joballocation_ID = joballocation_ID;
    //            var postdata = new FormData();
    //            postdata.append('Evidencefile', file7);
    //            postdata.append('ID', ID);
    //            postdata.append('JDfile', file8);
    //            postdata.append('Authfile', file9);
    //            postdata.append('EmpName', employeeNamee);
    //            postdata.append('EmpID', employeeIdd);
    //            postdata.append('JobRole', jobRolee)
    //            postdata.append('joballocation_ID', joballocation_ID);
    //            postdata.append('ClientID', CLIENT_AUTH);

    //            $.ajax({
    //                url: "https://api.pdca.in/ClientQuality/Update_SkillMatrix",
    //                type: "POST",
    //                data: postdata,
    //                async: false,
    //                dataType: "json",
    //                processData: false,
    //                crossDomain: true,
    //                cache: false,
    //                contentType: false,
    //                success: function (data) {

    //                    if (data.responsecode == 1) {
    //                        var joballocation_ID = data.responseObject;

    //                    }
    //                }
    //            });

    //        };
    //    }
    //}

    //$("#table-iddoc").on("click", ".deleteRow", function () {
    //    ;
    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pdca.in/Quality/Delete_Quality_standard?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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

    //$("#table-quality").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pdca.in/Quality/Delete_QualityDocs?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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

    //$("#table-AunalTraining").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pdca.in/Quality/Delete_StandardAnnualTraining?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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

    //$("#table-Training").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pdca.in/Quality/Delete_StandardMonthlyTraining?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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

    //$("#table-skill").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pdca.in/Quality/Delete_SkillMatrix?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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



    $("#table-iddoc").on("click", ".addrow", function () {
        var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+><td><div class=form-group><input class="form-control standard"id=standard name=""></div><td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td> </tr>';
        $("#table-iddoc tbody").append(getrowcontent);
    });
    $("#table-iddoc").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    $("#table-quality").on("click", ".addrow", function () {
        var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+><td><div class=form-group><input class="form-control NameoftheDoc w-200px"id=NameoftheDoc name=""></div><td><div class=form-group><select class="form-control typepfDocument w-150px"id=typepfDocument name=""><option value="level1">Level 1<option value="level2">Level 2<option value="level3">Level 3<option value="level4">Level 4</select></div><td><input class="w-200px Draftformatfile"id=Draftformatfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group><input class="form-control ClauseNo w-150px"id=ClauseNo name=""></div><td><input class="w-200px Apporveddocuploadfile"id=Apporveddocuploadfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group><textarea class="form-control clientRemarks w-200px"id=clientRemarks name=""type=text></textarea></div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-quality tbody").append(getrowcontent);
    });
    $("#table-quality").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    //$("#table-AunalTraining").on("click", ".addrow", function () {
    //    var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus value=+><td><div class=form-group><input class="form-control year"id=year name=""></div><td><input class="w-200px DraftTrainingplannerfile"id=DraftTrainingplannerfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-200px ApprovedAnnualTrainingfile"id=ApprovedAnnualTrainingfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group><textarea class="form-control annualRemarks"id=annualRemarks name=""type=text></textarea></div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td> </tr>';
    //    $("#table-AunalTraining tbody").append(getrowcontent);
    //});
    //$("#table-AunalTraining").on("click", ".deleterow", function () {
    //    $(this).closest("tr").remove();
    //});
    //$("#table-Training").on("click", ".addrow", function () {
    //    var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus value=+><td><div class=form-group><input class="form-control dateOfTraining w-200px"id=dateOfTraining type="date" name=""></div><td><div class=form-group><input class="form-control topicName w-200px"id=topicName name=""></div><td><input class="w-150px Attendenceformatfile"id=Attendenceformatfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px Evaluationpaperdownloadfile"id=Evaluationpaperdownloadfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px UploadfilledTrainingDocsfile"id=UploadfilledTrainingDocsfile type=file aria-describedby=inputGroupFileAddon01><td><div class=form-group><textarea class="form-control monthlyRemarks w-200px"id=monthlyRemarks name=""type=text></textarea></div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //    $("#table-Training tbody").append(getrowcontent);
    //});
    //$("#table-Training").on("click", ".deleterow", function () {
    //    $(this).closest("tr").remove();
    //});
    //$("#table-skill").on("click", ".addrow", function () {
    //    var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+><td><div class=form-group><input class="form-control employeeName w-200px"id=employeeName name=""></div><td><div class=form-group><input class="form-control employeeId w-200px"id=employeeId name=""></div><td><div class=form-group><input class="form-control jobRole w-200px"id=jobRole name=""></div><td><input class="w-150px Evidencesuploadfile"id=Evidencesuploadfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px JDUploadFile"id=JDUploadFile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px AuthUploadFile"id=AuthUploadFile aria-describedby=inputGroupFileAddon01 type=file></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //    $("#table-skill tbody").append(getrowcontent);
    //})
    //$("#table-skill").on("click", ".deleterow", function () {
    //    $(this).closest("tr").remove();
    //});
});