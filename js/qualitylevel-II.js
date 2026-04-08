$(document).ready(function () {
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    var joballocation_ID = localStorage.getItem("JobID");
    const url = window.location.search;
    const params = new URLSearchParams(url);
    getJObID();
    const ID = params.get("id");
    if (ID != null) {
        $("#ddjobid").attr('disabled', 'disabled');
        $('#ddjobid').val(ID);
        getlist(ID);
    }
    const gettemplateid = params.get("TemplateID");
    if (gettemplateid != null) {
        localStorage.setItem("Template_ID", gettemplateid)
        Getlistofalltablesdata(gettemplateid);
    }
    if (joballocation_ID != null) {
        $('#ddjobid').val(joballocation_ID);
        getlist(joballocation_ID);
        localStorage.removeItem("JobID");
    }
    function getJObID() {

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality/ListforJobID?AdminID=" + ADMIN_AUTH,
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
    $("#ddinternal").change(function () {
        var getvalue = $(this).val();
        if (getvalue.trim() == "External") {
            $("#myContent").show();
        }
        else {
            $("#myContent").hide();
        }
    })
    if ($('#auditDate').val() !== '') {
        $('#Edit_Featured').prop('checked', false); // Date is there, checkbox should be false
    } else {
        $('#Edit_Featured').prop('checked', true); // Date is not there, checkbox should be true
    }

    // Add event listener to auditDate input field
    $('#auditDate').on('change', function () {
        if ($(this).val() !== '') {
            $('#Edit_Featured').prop('checked', false); // Date is there, checkbox should be false
        } else {
            $('#Edit_Featured').prop('checked', true); // Date is not there, checkbox should be true
        }
    });
    $("#ddjobid").change(function () {

        var getjoballocationid = $(this).val();
        getlist(getjoballocationid);
    });
    function Getlistofalltablesdata(gettemplateid) {


        $.ajax({
            url: "https://api.pioneerfoods.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            // Not to process data
            //data: fileData,
            success: function (data) {
                $.each(data, function (index, values) {
                    $("#audit tbody").empty();
                    if (values.AuditSchedule_list && values.AuditSchedule_list.length > 0) {
                        var sno = 1;
                        var snos = 1;
                        $.each(values.AuditSchedule_list, function (index, values) {
                            var datef = "";
                            if (values.Date != null) {
                                var completedDate = new Date(parseInt(values.Date.replace("/Date(", "").replace(")/")));
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
                            if (values.Date == null) {
                                var datef = '<td><div class=form-group> <input type="date" name="" id="date" class="date form-control"></div></td>'
                            }
                            else {
                                var datef = '<td><div class=form-group> <input type="date" name="" id="date"  value="' + datef + '" class="date form-control"></div></td>';
                            }
                            if (values.TypeofAudit == null) {
                                var TypeofAudit = '<td><div class=form-group> <select name="" id="typeOfAudit" class="typeOfAudit form-control w-100px"> <option value="internal">Internal</option> <option value="external">External</option> </select></div></td>'
                            }
                            else {
                                var TypeofAudit = '<td><div class=form-group> <select name="" id="typeOfAudit' + values.ID + '" class="typeOfAudit form-control w-100px"> <option value="internal">Internal</option> <option value="external">External</option> </select></div></td>';
                            }
                            if (values.AuditScheduleFormat == null) {
                                var AuditScheduleFormat = '<td><input type="file" class="AuditScheduleFormatfile w-200px" id="AuditScheduleFormatfile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var AuditScheduleFormat = '<td><a class="alink" target="_blank"  href="' + values.AuditScheduleFormat + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.ApprovedAuditSchedule == null) {
                                var ApprovedAuditSchedule = '<td> <input type="file" class="ApprovedAuditSchedulefile w-200px" id="ApprovedAuditSchedulefile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var ApprovedAuditSchedule = '<td><a class="alink1" target="_blank"  href="' + values.ApprovedAuditSchedule + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.Remarks == null) {
                                var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px">' + values.Remarks + '</textarea></div></td>';
                            }
                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td> ' + datef + ' ' + TypeofAudit + '  ' + Remarks + '' + AuditScheduleFormat + ' ' + ApprovedAuditSchedule + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                                $("#audit tbody").append(getdetails);
                                $("#typeOfAudit" + values.ID).val(values.TypeofAudit.trim());
                            }
                            else {
                                var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td> ' + datef + ' ' + TypeofAudit + '  ' + Remarks + '' + AuditScheduleFormat + ' ' + ApprovedAuditSchedule + '</tr>';
                                $("#audit tbody").append(getdetails);
                                $("#typeOfAudit" + values.ID).val(values.TypeofAudit.trim());
                            }

                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = '<tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date form-control"> </div></td><td> <div class="form-group"> <select name="" id="typeOfAudit" class="typeOfAudit w-100px form-control"> <option value="internal">Internal</option> <option value="external">External</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="AuditScheduleFormatfile w-200px" id="AuditScheduleFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedAuditSchedulefile w-200px" id="ApprovedAuditSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#audit tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = '<tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date form-control"> </div></td><td> <div class="form-group"> <select name="" id="typeOfAudit" class="typeOfAudit w-100px form-control"> <option value="internal">Internal</option> <option value="external">External</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="AuditScheduleFormatfile w-200px" id="AuditScheduleFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedAuditSchedulefile w-200px" id="ApprovedAuditSchedulefile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                            $("#audit tbody").append(getrowcontent);
                        }

                    }
                });
            }

        });
        tableaudit();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $.each(data, function (index, values) {
                    $("#auditor tbody").empty();
                    if (values.AuditDetails_list && values.AuditDetails_list.length > 0) {
                        var sno = 1;
                        var snos = 1;
                        $.each(values.AuditDetails_list, function (index, values) {
                            if (values.auditorname == null) {
                                var auditorname = '<td><div class=form-group> <textarea type="text" name="" id="audtorName" class="audtorName form-control w-500px"></textarea></div></td>'
                            }
                            else {
                                var auditorname = '<td><div class=form-group><textarea type="text" name="" value="" id="audtorName" class="audtorName form-control w-500px">' + values.auditorname + '</textarea></div></td>';
                            }
                            if (values.auditorphotoupload == null) {
                                var auditorphotoupload = '<td>  <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var auditorphotoupload = '<td><a class="alink" target="_blank"  href="' + values.auditorphotoupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.auditoridupload == null) {
                                var auditoridupload = '<td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var auditoridupload = '<td><a class="alink1" target="_blank"  href="' + values.auditoridupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.QualificationUpload == null) {
                                var QualificationUpload = '<td>  <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var QualificationUpload = '<td><a class="alink2" target="_blank"  href="' + values.QualificationUpload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + auditorname + ' ' + auditorphotoupload + ' ' + auditoridupload + ' ' + QualificationUpload + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                                $("#auditor tbody").append(getdetails);
                            }
                            else {
                                var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + auditorname + ' ' + auditorphotoupload + ' ' + auditoridupload + ' ' + QualificationUpload + '</tr>';
                                $("#auditor tbody").append(getdetails);
                            }
                        });

                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="audtorName" class="audtorName form-control w-500px"></textarea> </div></td><td> <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#auditor tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="audtorName" class="audtorName form-control w-500px"></textarea> </div></td><td> <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                            $("#auditor tbody").append(getrowcontent);
                        }

                    }
                });
            }

        });
        tableauditor();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $.each(data, function (index, values) {
                    $("#auditmeet tbody").empty();
                    if (values.AuditAuditorMeeting_list && values.AuditAuditorMeeting_list.length > 0) {
                        var sno = 1;
                        var snos = 1;
                        $.each(values.AuditAuditorMeeting_list, function (index, values) {
                            var datef = "";
                            if (values.Date != null) {
                                var completedDate = new Date(parseInt(values.Date.replace("/Date(", "").replace(")/")));
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
                            if (values.Date == null) {
                                var datef = '<td><div class=form-group><input type="date" name="" id="date" class="date1 form-control"></div></td>'
                            }
                            else {
                                var datef = '<td><div class=form-group><input type="date" name="" value="' + datef + '" id="date" class="date1 form-control"></div></td>';
                            }
                            if (values.TypeofMeeting == null) {
                                var TypeofMeeting = '<td><div class=form-group> <select name="" id="TypeofMeeting" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select></div></td>'
                            }
                            else {
                                var TypeofMeeting = '<td><div class=form-group> <select name="" id="TypeofMeeting' + values.ID + '" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select></div></td>';
                            }
                            if (values.Attendencesheet == null) {
                                var Attendencesheet = '<td> <input type="file" class="Attendencesheetdownloadfile w-200px" id="Attendencesheetdownloadfile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var Attendencesheet = '<td><a class="alink" target="_blank"  href="' + values.Attendencesheet + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.SignedAttendence == null) {
                                var SignedAttendence = '<td>  <input type="file" class="SignedAttendenceuploadfile w-200px" id="SignedAttendenceuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var SignedAttendence = '<td><a class="alink1" target="_blank"  href="' + values.SignedAttendence + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + datef + ' ' + TypeofMeeting + ' ' + Attendencesheet + ' ' + SignedAttendence + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                                $("#auditmeet tbody").append(getdetails);
                                $("#TypeofMeeting" + values.ID).val(values.TypeofMeeting.trim());
                            }
                            else {
                                var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + datef + ' ' + TypeofMeeting + ' ' + Attendencesheet + ' ' + SignedAttendence + '</tr>';
                                $("#auditmeet tbody").append(getdetails);
                                $("#TypeofMeeting" + values.ID).val(values.TypeofMeeting.trim());
                            }

                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date1 form-control"> </div></td><td> <div class="form-group"> <select name="" id="TypeofMeeting" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select> </div></td><td> <input type="file" class="Attendencesheetdownloadfile w-200px" id="Attendencesheetdownloadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="SignedAttendenceuploadfile w-200px" id="SignedAttendenceuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#auditmeet tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date1 form-control"> </div></td><td> <div class="form-group"> <select name="" id="TypeofMeeting" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select> </div></td><td> <input type="file" class="Attendencesheetdownloadfile w-200px" id="Attendencesheetdownloadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="SignedAttendenceuploadfile w-200px" id="SignedAttendenceuploadfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                            $("#auditmeet tbody").append(getrowcontent);
                        }

                    }
                });
            }
        });
        tableauditmeet();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $.each(data, function (index, values) {
                    $("#standardTemplate tbody").empty();
                    if (values.AuditCheck_list && values.AuditCheck_list.length > 0) {
                        var sno = 1;
                        var snos = 1;
                        $.each(values.AuditCheck_list, function (index, values) {
                            if (values.clause == null) {
                                var clause = '<td><div class=form-group> <textarea type="text" name="" id="standardClause" class="standardClause form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var clause = '<td><div class=form-group><textarea type="text" name="" id="standardClause" value="" class="standardClause form-control w-200px">' + values.clause + '</textarea></div></td>';
                            }
                            if (values.Description == null) {
                                var Description = '<td><div class=form-group><textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var Description = '<td><div class=form-group><textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px">' + values.Description + '</textarea></div></td>';
                            }
                            if (values.Observations == null) {
                                var Observations = '<td><div class=form-group> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var Observations = '<td><div class=form-group> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px">' + values.Observations + '</textarea></div></td>';
                            }
                            if (values.Evidencesupload == null) {
                                var Evidencesupload = '<td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var Evidencesupload = '<td><a class="alink" target="_blank"  href="' + values.Evidencesupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.Auditordecision == null) {
                                var Auditordecision = '<td><div class=form-group><select name="" id="Auditor_decision" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select></div></td>'
                            }
                            else {
                                var Auditordecision = '<td><div class=form-group><select name="" id="Auditor_decision' + values.ID + '" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select></div></td>';
                            }
                            if (values.Remarks == null) {
                                var Remarks = '<td><div class=form-group><textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var Remarks = '<td><div class=form-group><textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px">' + values.Remarks + '</textarea></div></td>';
                            }
                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + clause + ' ' + Description + ' ' + Observations + '  ' + Auditordecision + ' ' + Remarks + '' + Evidencesupload + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                                $("#standardTemplate tbody").append(getdetails);
                                $("#Auditor_decision" + values.ID).val(values.Auditordecision.trim());
                            }
                            else {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + clause + ' ' + Description + ' ' + Observations + '  ' + Auditordecision + ' ' + Remarks + '' + Evidencesupload + '</tr>';
                                $("#standardTemplate tbody").append(getdetails);
                                $("#Auditor_decision" + values.ID).val(values.Auditordecision.trim());
                            }

                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="standardClause" class="standardClause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="Auditor_decision" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea> </div></td><td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#standardTemplate tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="standardClause" class="standardClause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="Auditor_decision" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea> </div></td><td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                            $("#standardTemplate tbody").append(getrowcontent);
                        }

                    }
                });
            }

        });
        tablestandardTemplate();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $.each(data, function (index, values) {
                    $("#nc-caDetails tbody").empty();
                    if (values.NCandCA_list && values.NCandCA_list.length > 0) {
                        var sno = 1;
                        var snos = 1;
                        $.each(values.NCandCA_list, function (index, values) {
                            var datef = "";
                            if (values.NCopenDate != null) {
                                var completedDate = new Date(parseInt(values.NCopenDate.replace("/Date(", "").replace(")/")));
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
                            var dateg = "";
                            if (values.NCcloseDate != null) {
                                var completedDate = new Date(parseInt(values.NCcloseDate.replace("/Date(", "").replace(")/")));
                                var dd = completedDate.getDate();
                                var mm = completedDate.getMonth() + 1; //January is 0! 
                                var yyyy = completedDate.getFullYear();
                                if (dd < 10) { dd = '0' + dd }
                                if (mm < 10) { mm = '0' + mm }
                                var dateg = yyyy + '-' + mm + '-' + dd;
                            }
                            else {
                                dateg = "";
                            }
                            if (values.AuditType == null) {
                                var AuditType = '<td><div class="form-group"><textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td>'
                            }
                            else {
                                var AuditType = '<td><div class="form-group"><textarea type="text" name=""  value="" id="audit_type" class="audit_type form-control w-150px">' + values.AuditType + '</textarea></div></td>';
                            }
                            if (datef == null) {
                                var datef = '<td><div class=form-group> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-150px"></div></td>'
                            }
                            else {
                                var datef = '<td><div class=form-group> <input type="date" value="' + datef + '" name="" id="nc-caDetail" class="nccaDetail form-control w-150px"></div></td>';
                            }
                            if (values.NCnumber == null) {
                                var NCnumber = '<td><div class=form-group><input type="text" name="" id="ncnumber" class="ncnumber form-control"></div></td>'
                            }
                            else {
                                var NCnumber = '<td><div class=form-group><input type="text" name="" id="ncnumber" value="' + values.NCnumber + '" class="ncnumber form-control w-200px"></div></td>';
                            }
                            if (values.NCRootcause == null) {
                                var NCRootcause = '<td><div class=form-group> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var NCRootcause = '<td><div class=form-group> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px">' + values.NCRootcause + '</textarea></div></td>';
                            }
                            if (values.CAProposed == null) {
                                var CAProposed = '<td><div class=form-group><textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var CAProposed = '<td><div class=form-group><textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px">' + values.CAProposed + '</textarea></div></td>';
                            }
                            if (values.CA_ApprovedbyAuditor == null) {
                                var CA_ApprovedbyAuditor = '<td><div class=form-group><textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var CA_ApprovedbyAuditor = '<td><div class=form-group><textarea type="text" name="" id="CAApprovedbyAuditor" value="" class="CAApprovedbyAuditor form-control w-200px">' + values.CA_ApprovedbyAuditor + '</textarea></div></td>';
                            }
                            if (values.Evidencesupload == null) {
                                var Evidencesupload = '<td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var Evidencesupload = '<td><a class="alink" target="_blank"  href="' + values.Evidencesupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.NCclosedby == null) {
                                var NCclosedby = '<td><div class=form-group><textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var NCclosedby = '<td><div class=form-group><textarea type="text" name="" value="" id="ncClosedby" class="ncClosedby form-control w-200px">' + values.NCclosedby + '</textarea></div></td>';
                            }
                            if (dateg == null) {
                                var dateg = '<td><div class=form-group> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"></div></td>'
                            }
                            else {
                                var dateg = '<td><div class=form-group><input type="date" name="" value="' + dateg + '" id="ncCloseDate" class="ncCloseDate form-control w-150px"></div></td>';
                            }
                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + AuditType +'' + datef + ' ' + NCnumber + ' ' + NCRootcause + ' ' + CAProposed + ' ' + CA_ApprovedbyAuditor + ' ' + Evidencesupload + ' ' + NCclosedby + ' ' + dateg + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                                $("#nc-caDetails tbody").append(getdetails);
                            }
                            else {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + AuditType +'' + datef + ' ' + NCnumber + ' ' + NCRootcause + ' ' + CAProposed + ' ' + CA_ApprovedbyAuditor + ' ' + Evidencesupload + ' ' + NCclosedby + ' ' + dateg + '</tr>';
                                $("#nc-caDetails tbody").append(getdetails);
                            }

                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = '<tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td><div class="form-group"><textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-100px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea></div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group">  <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#nc-caDetails tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = '<tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td><div class="form-group"><textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-100px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"><textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea> </div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group">  <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td></tr>';
                            $("#nc-caDetails tbody").append(getrowcontent);
                        }
                    }
                });
            }

        });
        tablecaDetails();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $.each(data, function (index, values) {
                    $("#managementReviewMeeting tbody").empty();
                    if (values.MRM_List && values.MRM_List.length > 0) {
                        var sno = 1;
                        var snos = 1;
                        $.each(values.MRM_List, function (index, values) {

                            var datef = "";
                            if (values.ReviewDate != null) {
                                var completedDate = new Date(parseInt(values.ReviewDate.replace("/Date(", "").replace(")/")));
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
                            //if (values.TypeofAudit == null) {
                            //    var TypeofAudit = '<td><div class=form-group> <input type="text" name="" id="auditType" class="auditType form-control w-200px"></div></td>'
                            //}
                            //else {
                            //    var TypeofAudit = '<td><div class=form-group> <input type="text" name="" id="auditType" value="' + values.TypeofAudit.trim() + '" class="auditType form-control w-200px"></div></td>';
                            //}
                            //if (values.Auditreportupload == null) {
                            //    var Auditreportupload = '<td>  <input type="file" class="Auditreportuploadfile w-200px" id="Auditreportuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                            //}
                            //else {
                            //    var Auditreportupload = '<td><a class="alink" target="_blank"  href="' + values.Auditreportupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            //}
                            if (datef == null) {
                                var datef = '<td><div class=form-group> <input type="date" name="" id="mrmDate" class="mrmDate form-control w-150px"></div></td>'
                            }
                            else {
                                var datef = '<td><div class=form-group> <input type="date" name="" id="mrmDate" value="' + datef + '" class="mrmDate form-control w-150px"></div></td>';
                            }
                            if (values.MRMformat == null) {
                                var MRMformat = '<td> <input type="file" class="mrmwordFormatfile w-200px" id="mrmwordFormatfile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var MRMformat = '<td><a class="alink" target="_blank"  href="' + values.MRMformat + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.ApprovedMRMSchedule == null) {
                                var ApprovedMRMSchedule = '<td> <input type="file" class="ApprovedMRMSchedulefile w-200px" id="ApprovedMRMSchedulefile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var ApprovedMRMSchedule = '<td><a class="alink" target="_blank"  href="' + values.ApprovedMRMSchedule + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.MoMupload == null) {
                                var MoMupload = '<td>  <input type="file" class="MoMuploadfile w-200px" id="MoMuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var MoMupload = '<td><a class="alink" target="_blank"  href="' + values.MoMupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td> ' + datef + ' ' + MRMformat + ' ' + ApprovedMRMSchedule + ' ' + MoMupload + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                                $("#managementReviewMeeting tbody").append(getdetails);
                            }
                            else {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td> ' + datef + ' ' + MRMformat + ' ' + ApprovedMRMSchedule + ' ' + MoMupload + '</tr>';
                                $("#managementReviewMeeting tbody").append(getdetails);
                            }

                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="mrmDate" class="mrmDate form-control W-150"> </div></td><td> <input type="file" class="mrmwordFormatfile w-200px" id="mrmwordFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedMRMSchedulefile w-200px" id="ApprovedMRMSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="MoMuploadfile w-200px" id="MoMuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#managementReviewMeeting tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="mrmDate" class="mrmDate form-control W-150"> </div></td><td> <input type="file" class="mrmwordFormatfile w-200px" id="mrmwordFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedMRMSchedulefile w-200px" id="ApprovedMRMSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="MoMuploadfile w-200px" id="MoMuploadfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                            $("#managementReviewMeeting tbody").append(getrowcontent);
                        }


                    }
                });
            }

        });
        tableReviewMeeting();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            success: function (data) {
                $.each(data, function (index, values) {
                    $("#auditrec tbody").empty();
                    if (values.Recomm_List && values.Recomm_List.length > 0) {
                        var sno = 1;
                        var snos = 1;
                        $.each(values.Recomm_List, function (index, values) {
                            if (values.Recommendationfor == null) {
                                var Recommendationfor = '<td><div class=form-group>  <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select></div></td>'
                            }
                            else {
                                var Recommendationfor = '<td><div class=form-group>  <select name="" id="Typeofauditt' + values.ID + '" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select></div></td>';
                            }
                            if (values.Auditorname == null) {
                                var Auditorname = '<td><div class=form-group> <textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea></div></td>'
                            }
                            else {
                                var Auditorname = '<td><div class=form-group> <textarea type="text" name="" id="NameoftheAuditor" value="" class="NameoftheAuditor form-control">' + values.Auditorname + '</textarea></div></td>';
                            }
                            if (values.RecommendedCertification == null) {
                                var RecommendedCertification = '<td><div class=form-group><textarea type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></textarea></div></td>'
                            }
                            else {
                                var RecommendedCertification = '<td><div class=form-group>  <textarea type="text" name="" id="RecommendationforCertification" value="" class="RecommendationforCertification form-control">' + values.RecommendedCertification + '</textarea></div></td>';
                            }
                            if (values.Comments == null) {
                                var Comments = '<td><div class=form-group> <textarea type="text" name="" id="comments" class="comments form-control"></textarea></div></td>'
                            }
                            else {
                                var Comments = '<td><div class=form-group> <textarea type="text" name="" id="comments" class="comments form-control">' + values.Comments + '</textarea></div></td>';
                            }
                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + Recommendationfor + ' ' + Auditorname + ' ' + RecommendedCertification + ' ' + Comments + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                                $("#auditrec tbody").append(getdetails);
                                $("#Typeofauditt" + values.ID).val(values.Recommendationfor.trim());
                            }
                            else {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + Recommendationfor + ' ' + Auditorname + ' ' + RecommendedCertification + ' ' + Comments + '</tr>';
                                $("#auditrec tbody").append(getdetails);
                                $("#Typeofauditt" + values.ID).val(values.Recommendationfor.trim());
                            }

                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" sno=' + snos++ + ' class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea> </div></td><td> <div class="form-group">  <textarea type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="comments" class="comments form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#auditrec tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" sno=' + snos++ + ' class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea> </div></td><td> <div class="form-group">  <textarea type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="comments" class="comments form-control"></textarea> </div></td></tr>';
                            $("#auditrec tbody").append(getrowcontent);
                        }


                    }
                });
            }

        });
        tableauditrec()

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $.each(data, function (index, values) {
                    $("#qualityStatus tbody").empty();
                    if (values.certificate_list && values.certificate_list.length > 0) {
                        var sno = 1;
                        var snos = 1;
                        $.each(values.certificate_list, function (index, values) {
                            var datef = "";
                            if (values.Nextsurveillanceaudit != null) {
                                var completedDate = new Date(parseInt(values.Nextsurveillanceaudit.replace("/Date(", "").replace(")/")));
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
                            if (values.certificatecopy == null) {
                                var certificatecopy = '<td>  <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria - describedby="inputGroupFileAddon01" ></td>'
                            }
                            else {
                                var certificatecopy = '<td><a class="alink" target="_blank"  href="' + values.certificatecopy + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.validity == null) {
                                var validity = '<td><div class=form-group> <textarea type="text" name="" id="validity" class="validity form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var validity = '<td><div class=form-group><textarea type="text" name="" value="" id="validity" class="w-200px validity form-control">' + values.validity + '</textarea></div></td>';
                            }
                            if (values.NeworSurveillance == null) {
                                var NeworSurveillance = '<td><div class=form-group> <textarea type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var NeworSurveillance = '<td><div class=form-group> <textarea type="text" name="" value="" id="NeworServeilience" class="w-200px NeworServeilience form-control">' + values.NeworSurveillance + '</textarea></div></td>';
                            }
                            if (values.Status == null) {
                                var Status = '<td><div class=form-group> <select name="" id="status" class="status form-control w-150px"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select></div></td>'
                            }
                            else {
                                var Status = '<td><div class=form-group>  <select name="" id="status' + values.ID + '" class="status w-150px form-control"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select></div></td>';
                            }
                            if (datef == null) {
                                var datef = '<td><div class=form-group> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"></div></td>'
                            }
                            else {
                                var datef = '<td><div class=form-group> <input type="date" name="" value="' + datef + '" id="NextSurveillanceAudit" class="w-200px NextSurveillanceAudit form-control"></div></td>';
                            }
                            if (values.Remarks == null) {
                                var Remarks = '<td><div class=form-group>  <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var Remarks = '<td><div class=form-group>  <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px">' + values.Remarks + '</textarea></div></td>';
                            }
                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td> ' + validity + ' ' + NeworSurveillance + ' ' + Status + ' ' + datef + ' ' + Remarks + '' + certificatecopy + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                                $("#qualityStatus tbody").append(getdetails);
                                $("#status" + values.ID).val(values.Status);
                            }
                            else {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td> ' + validity + ' ' + NeworSurveillance + ' ' + Status + ' ' + datef + ' ' + Remarks + '' + certificatecopy + '</tr>';
                                $("#qualityStatus tbody").append(getdetails);
                                $("#status" + values.ID).val(values.Status);
                            }

                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group">  <textarea type="text" name="" id="validity" class="validity form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="status" class="status form-control w-150px"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select> </div></td><td> <div class="form-group"> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea> </div></td><td> <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#qualityStatus tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group">  <textarea type="text" name="" id="validity" class="validity form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="status" class="status form-control w-150px"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select> </div></td><td> <div class="form-group"> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea> </div></td><td> <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                            $("#qualityStatus tbody").append(getrowcontent);
                        }

                    }
                });
            }

        });
        tableStatus()


    }
    function getlist(getjoballocationid) {

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality/AuditTypeList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $.each(data, function (index, values) {
                    debugger;
                    $("#txtid").text(values.ID);
                    $("#ddinternal").val(values.Audittype);
                    if (values.Audittype == "Internal") {
                        $("#myContent").hide();
                    }
                    else {
                        $("#myContent").show();
                    }
                    $('input[name="External"][value="' + values.Externals + '"]').prop('checked', true);
                    $("#Frequency").val(values.Frequency);
                    if (values.Previousauditdate != null) {
                        var completedDate = new Date(parseInt(values.Previousauditdate.replace("/Date(", "").replace(")/")));
                        var dd = completedDate.getDate();
                        var mm = completedDate.getMonth() + 1; //January is 0! 
                        var yyyy = completedDate.getFullYear();
                        if (dd < 10) { dd = '0' + dd }
                        if (mm < 10) { mm = '0' + mm }

                        var Previousauditdate = yyyy + '-' + mm + '-' + dd;

                    }
                    else {
                        ReportIssuedDate = "";
                    }
                    if (values.Previousauditdate) {
                        $('#Edit_Featured').prop('checked', false);
                    } else {
                        $('#Edit_Featured').prop('checked', true);
                    }
                    $("#auditDate").val(Previousauditdate);
                })
            }
        });
        $.ajax({
            url: "https://api.pioneerfoods.in/Quality/AuditScheduleList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            // Not to process data
            //data: fileData,
            success: function (data) {
                $("#audit tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        //var datef = "";
                        //if (values.Date != null) {
                        //    var completedDate = new Date(parseInt(values.Date.replace("/Date(", "").replace(")/")));
                        //    var dd = completedDate.getDate();
                        //    var mm = completedDate.getMonth() + 1; //January is 0! 
                        //    var yyyy = completedDate.getFullYear();
                        //    if (dd < 10) { dd = '0' + dd }
                        //    if (mm < 10) { mm = '0' + mm }
                        //    var datef = yyyy + '-' + mm + '-' + dd;
                        //}
                        //else {
                        //    datef = "";
                        //}
                        if (values.Date == null) {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="date" class="date form-control"></div></td>'
                        }
                        else {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="date"  value="' + values.Date + '" class="date form-control"></div></td>';
                        }
                        if (values.TypeofAudit == null) {
                            var TypeofAudit = '<td><div class=form-group> <select name="" id="typeOfAudit" class="typeOfAudit form-control w-100px"> <option value="internal">Internal</option> <option value="external">External</option> </select></div></td>'
                        }
                        else {
                            var TypeofAudit = '<td><div class=form-group> <select name="" id="typeOfAudit' + values.ID + '" class="typeOfAudit form-control w-100px"> <option value="internal">Internal</option> <option value="external">External</option> </select></div></td>';
                        }
                        if (values.AuditScheduleFormat == null) {
                            var AuditScheduleFormat = '<td><input type="file" class="AuditScheduleFormatfile w-200px" id="AuditScheduleFormatfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var AuditScheduleFormat = '<td><a class="alink" target="_blank"  href="' + values.AuditScheduleFormat + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.ApprovedAuditSchedule == null) {
                            var ApprovedAuditSchedule = '<td> <input type="file" class="ApprovedAuditSchedulefile w-200px" id="ApprovedAuditSchedulefile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var ApprovedAuditSchedule = '<td><a class="alink1" target="_blank"  href="' + values.ApprovedAuditSchedule + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px">' + values.Remarks + '</textarea></div></td>';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td> ' + datef + ' ' + TypeofAudit + '  ' + Remarks + '' + AuditScheduleFormat + ' ' + ApprovedAuditSchedule + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#audit tbody").append(getdetails);
                            $("#typeOfAudit" + values.ID).val(values.TypeofAudit.trim());
                        }
                        else {
                            var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td> ' + datef + ' ' + TypeofAudit + '  ' + Remarks + '' + AuditScheduleFormat + ' ' + ApprovedAuditSchedule + '</tr>';
                            $("#audit tbody").append(getdetails);
                            $("#typeOfAudit" + values.ID).val(values.TypeofAudit.trim());
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = '<tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date form-control"> </div></td><td> <div class="form-group"> <select name="" id="typeOfAudit" class="typeOfAudit w-100px form-control"> <option value="internal">Internal</option> <option value="external">External</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="AuditScheduleFormatfile w-200px" id="AuditScheduleFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedAuditSchedulefile w-200px" id="ApprovedAuditSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#audit tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = '<tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date form-control"> </div></td><td> <div class="form-group"> <select name="" id="typeOfAudit" class="typeOfAudit w-100px form-control"> <option value="internal">Internal</option> <option value="external">External</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="AuditScheduleFormatfile w-200px" id="AuditScheduleFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedAuditSchedulefile w-200px" id="ApprovedAuditSchedulefile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                        $("#audit tbody").append(getrowcontent);
                    }

                }
            }

        });
        tableaudit();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality/AuditorDetailsList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#auditor tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        if (values.auditorname == null) {
                            var auditorname = '<td><div class=form-group> <textarea type="text" name="" id="audtorName" class="audtorName form-control w-500px"></textarea></div></td>'
                        }
                        else {
                            var auditorname = '<td><div class=form-group><textarea type="text" name="" value="" id="audtorName" class="audtorName form-control w-500px">' + values.auditorname + '</textarea></div></td>';
                        }
                        if (values.auditorphotoupload == null) {
                            var auditorphotoupload = '<td>  <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var auditorphotoupload = '<td><a class="alink" target="_blank"  href="' + values.auditorphotoupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.auditoridupload == null) {
                            var auditoridupload = '<td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var auditoridupload = '<td><a class="alink1" target="_blank"  href="' + values.auditoridupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.QualificationUpload == null) {
                            var QualificationUpload = '<td>  <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var QualificationUpload = '<td><a class="alink2" target="_blank"  href="' + values.QualificationUpload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + auditorname + ' ' + auditorphotoupload + ' ' + auditoridupload + ' ' + QualificationUpload + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#auditor tbody").append(getdetails);
                        }
                        else {
                            var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + auditorname + ' ' + auditorphotoupload + ' ' + auditoridupload + ' ' + QualificationUpload + '</tr>';
                            $("#auditor tbody").append(getdetails);
                        }
                    });

                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="audtorName" class="audtorName form-control w-500px"></textarea> </div></td><td> <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#auditor tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group">  <textarea type="text" name="" id="audtorName" class="audtorName form-control w-500px"></textarea> </div></td><td> <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                        $("#auditor tbody").append(getrowcontent);
                    }

                }
            }

        });
        tableauditor();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality/AuditorMeetingDetailsList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#auditmeet tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        //var datef = "";
                        //if (values.Date != null) {
                        //    var completedDate = new Date(parseInt(values.Date.replace("/Date(", "").replace(")/")));
                        //    var dd = completedDate.getDate();
                        //    var mm = completedDate.getMonth() + 1; //January is 0! 
                        //    var yyyy = completedDate.getFullYear();
                        //    if (dd < 10) { dd = '0' + dd }
                        //    if (mm < 10) { mm = '0' + mm }
                        //    var datef = yyyy + '-' + mm + '-' + dd;

                        //}
                        //else {
                        //    datef = "";
                        //}
                        if (values.Date == null) {
                            var datef = '<td><div class=form-group><input type="date" name="" id="date" class="date1 form-control"></div></td>'
                        }
                        else {
                            var datef = '<td><div class=form-group><input type="date" name="" value="' + values.Date + '" id="date" class="date1 form-control"></div></td>';
                        }
                        if (values.TypeofMeeting == null) {
                            var TypeofMeeting = '<td><div class=form-group> <select name="" id="TypeofMeeting" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select></div></td>'
                        }
                        else {
                            var TypeofMeeting = '<td><div class=form-group> <select name="" id="TypeofMeeting' + values.ID + '" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select></div></td>';
                        }
                        if (values.Attendencesheet == null) {
                            var Attendencesheet = '<td> <input type="file" class="Attendencesheetdownloadfile w-200px" id="Attendencesheetdownloadfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Attendencesheet = '<td><a class="alink" target="_blank"  href="' + values.Attendencesheet + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.SignedAttendence == null) {
                            var SignedAttendence = '<td>  <input type="file" class="SignedAttendenceuploadfile w-200px" id="SignedAttendenceuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var SignedAttendence = '<td><a class="alink1" target="_blank"  href="' + values.SignedAttendence + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + datef + ' ' + TypeofMeeting + ' ' + Attendencesheet + ' ' + SignedAttendence + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#auditmeet tbody").append(getdetails);
                            $("#TypeofMeeting" + values.ID).val(values.TypeofMeeting.trim());
                        }
                        else {
                            var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + datef + ' ' + TypeofMeeting + ' ' + Attendencesheet + ' ' + SignedAttendence + '</tr>';
                            $("#auditmeet tbody").append(getdetails);
                            $("#TypeofMeeting" + values.ID).val(values.TypeofMeeting.trim());
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date1 form-control"> </div></td><td> <div class="form-group"> <select name="" id="TypeofMeeting" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select> </div></td><td> <input type="file" class="Attendencesheetdownloadfile w-200px" id="Attendencesheetdownloadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="SignedAttendenceuploadfile w-200px" id="SignedAttendenceuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#auditmeet tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date1 form-control"> </div></td><td> <div class="form-group"> <select name="" id="TypeofMeeting" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select> </div></td><td> <input type="file" class="Attendencesheetdownloadfile w-200px" id="Attendencesheetdownloadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="SignedAttendenceuploadfile w-200px" id="SignedAttendenceuploadfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                        $("#auditmeet tbody").append(getrowcontent);
                    }

                }
            }
        });
        tableauditmeet();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality/AuditChecklist?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#standardTemplate tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        if (values.clause == null) {
                            var clause = '<td><div class=form-group><textarea type="text" name="" id="standardClause" class="standardClause form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var clause = '<td><div class=form-group><textarea type="text" name="" id="standardClause" value="" class="standardClause form-control w-200px">' + values.clause + '</textarea></div></td>';
                        }
                        if (values.Description == null) {
                            var Description = '<td><div class=form-group><textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Description = '<td><div class=form-group><textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px">' + values.Description + '</textarea></div></td>';
                        }
                        if (values.Observations == null) {
                            var Observations = '<td><div class=form-group> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Observations = '<td><div class=form-group> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px">' + values.Observations + '</textarea></div></td>';
                        }
                        if (values.Evidencesupload == null) {
                            var Evidencesupload = '<td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Evidencesupload = '<td><a class="alink" target="_blank"  href="' + values.Evidencesupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.Auditordecision == null) {
                            var Auditordecision = '<td><div class=form-group><select name="" id="Auditor_decision" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select></div></td>'
                        }
                        else {
                            var Auditordecision = '<td><div class=form-group><select name="" id="Auditor_decision' + values.ID + '" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select></div></td>';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group><textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td><div class=form-group><textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px">' + values.Remarks + '</textarea></div></td>';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + clause + ' ' + Description + ' ' + Observations + '  ' + Auditordecision + ' ' + Remarks + '' + Evidencesupload + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#standardTemplate tbody").append(getdetails);
                            $("#Auditor_decision" + values.ID).val(values.Auditordecision.trim());
                        }
                        else {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + clause + ' ' + Description + ' ' + Observations + ' ' + Auditordecision + ' ' + Remarks + '' + Evidencesupload + '</tr>';
                            $("#standardTemplate tbody").append(getdetails);
                            $("#Auditor_decision" + values.ID).val(values.Auditordecision.trim());
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="standardClause" class="standardClause form-control w-200px"></textarea></div></td><td> <div class="form-group"> <textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="Auditor_decision" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea> </div></td><td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#standardTemplate tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"><textarea type="text" name="" id="standardClause" class="standardClause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="Auditor_decision" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea> </div></td><td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                        $("#standardTemplate tbody").append(getrowcontent);
                    }

                }
            }

        });
        tablestandardTemplate();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality/NCandCAtableList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#nc-caDetails tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        var datef = "";
                        if (values.NCopenDate != null) {
                            var completedDate = new Date(parseInt(values.NCopenDate.replace("/Date(", "").replace(")/")));
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
                        var dateg = "";
                        if (values.NCcloseDate != null) {
                            var completedDate = new Date(parseInt(values.NCcloseDate.replace("/Date(", "").replace(")/")));
                            var dd = completedDate.getDate();
                            var mm = completedDate.getMonth() + 1; //January is 0! 
                            var yyyy = completedDate.getFullYear();
                            if (dd < 10) { dd = '0' + dd }
                            if (mm < 10) { mm = '0' + mm }
                            var dateg = yyyy + '-' + mm + '-' + dd;
                        }
                        else {
                            dateg = "";
                        }
                        if (values.AuditType == null) {
                            var AuditType = '<td><div class="form-group"><textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td>'
                        }
                        else {
                            var AuditType = '<td><div class="form-group"><textarea type="text" name=""  value="" id="audit_type" class="audit_type form-control w-150px">' + values.AuditType + '</textarea></div></td>';
                        }
                        if (datef == null) {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-150px"></div></td>'
                        }
                        else {
                            var datef = '<td><div class=form-group> <input type="date" value="' + datef + '" name="" id="nc-caDetail" class="nccaDetail form-control w-150px"></div></td>';
                        }
                        if (values.NCnumber == null) {
                            var NCnumber = '<td><div class=form-group><input type="text" name="" id="ncnumber" class="ncnumber form-control"></div></td>'
                        }
                        else {
                            var NCnumber = '<td><div class=form-group><input type="text" name="" id="ncnumber" value="' + values.NCnumber + '" class="ncnumber form-control w-200px"></div></td>';
                        }
                        if (values.NCRootcause == null) {
                            var NCRootcause = '<td><div class=form-group> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var NCRootcause = '<td><div class=form-group> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px">' + values.NCRootcause + '</textarea></div></td>';
                        }
                        if (values.CAProposed == null) {
                            var CAProposed = '<td><div class=form-group><textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var CAProposed = '<td><div class=form-group><textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px">' + values.CAProposed + '</textarea></div></td>';
                        }
                        if (values.CA_ApprovedbyAuditor == null) {
                            var CA_ApprovedbyAuditor = '<td><div class=form-group><textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var CA_ApprovedbyAuditor = '<td><div class=form-group><textarea type="text" name="" id="CAApprovedbyAuditor" value="" class="CAApprovedbyAuditor form-control w-200px">' + values.CA_ApprovedbyAuditor + '</textarea></div></td>';
                        }
                        if (values.Evidencesupload == null) {
                            var Evidencesupload = '<td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Evidencesupload = '<td><a class="alink" target="_blank"  href="' + values.Evidencesupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.NCclosedby == null) {
                            var NCclosedby = '<td><div class=form-group> <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var NCclosedby = '<td><div class=form-group><textarea type="text" name="" value="" id="ncClosedby" class="ncClosedby form-control w-200px">' + values.NCclosedby + '</textarea></div></td>';
                        }
                        if (dateg == null) {
                            var dateg = '<td><div class=form-group> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"></div></td>'
                        }
                        else {
                            var dateg = '<td><div class=form-group><input type="date" name="" value="' + dateg + '" id="ncCloseDate" class="ncCloseDate form-control w-150px"></div></td>';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + AuditType + '' + datef + ' ' + NCnumber + ' ' + NCRootcause + ' ' + CAProposed + ' ' + CA_ApprovedbyAuditor + '  ' + NCclosedby + ' ' + dateg + '' + Evidencesupload + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#nc-caDetails tbody").append(getdetails);
                        }
                        else {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + AuditType + '' + datef + ' ' + NCnumber + ' ' + NCRootcause + ' ' + CAProposed + ' ' + CA_ApprovedbyAuditor + '  ' + NCclosedby + ' ' + dateg + '' + Evidencesupload + '</tr>';
                            $("#nc-caDetails tbody").append(getdetails);
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = '<tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td><div class="form-group"><textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-100px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#nc-caDetails tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = '<tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td><div class="form-group"><textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-100px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                        $("#nc-caDetails tbody").append(getrowcontent);
                    }
                }
            }

        });
        tablecaDetails();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality/ReviewMeetingList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#managementReviewMeeting tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {

                        var datef = "";
                        if (values.ReviewDate != null) {
                            var completedDate = new Date(parseInt(values.ReviewDate.replace("/Date(", "").replace(")/")));
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
                        //if (values.TypeofAudit == null) {
                        //    var TypeofAudit = '<td><div class=form-group> <input type="text" name="" id="auditType" class="auditType form-control w-200px"></div></td>'
                        //}
                        //else {
                        //    var TypeofAudit = '<td><div class=form-group> <input type="text" name="" id="auditType" value="' + values.TypeofAudit.trim() + '" class="auditType form-control w-200px"></div></td>';
                        //}
                        //if (values.Auditreportupload == null) {
                        //    var Auditreportupload = '<td>  <input type="file" class="Auditreportuploadfile w-200px" id="Auditreportuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                        //}
                        //else {
                        //    var Auditreportupload = '<td><a class="alink" target="_blank"  href="' + values.Auditreportupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        //}
                        if (datef == null) {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="mrmDate" class="mrmDate form-control w-150px"></div></td>'
                        }
                        else {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="mrmDate" value="' + datef + '" class="mrmDate form-control w-150px"></div></td>';
                        }
                        if (values.MRMformat == null) {
                            var MRMformat = '<td> <input type="file" class="mrmwordFormatfile w-200px" id="mrmwordFormatfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var MRMformat = '<td><a class="alink" target="_blank"  href="' + values.MRMformat + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.ApprovedMRMSchedule == null) {
                            var ApprovedMRMSchedule = '<td> <input type="file" class="ApprovedMRMSchedulefile w-200px" id="ApprovedMRMSchedulefile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var ApprovedMRMSchedule = '<td><a class="alink" target="_blank"  href="' + values.ApprovedMRMSchedule + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.MoMupload == null) {
                            var MoMupload = '<td>  <input type="file" class="MoMuploadfile w-200px" id="MoMuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var MoMupload = '<td><a class="alink" target="_blank"  href="' + values.MoMupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td> '+ datef + ' ' + MRMformat + ' ' + ApprovedMRMSchedule + ' ' + MoMupload + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#managementReviewMeeting tbody").append(getdetails);
                        }
                        else {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td> '+ datef + ' ' + MRMformat + ' ' + ApprovedMRMSchedule + ' ' + MoMupload + '</tr>';
                            $("#managementReviewMeeting tbody").append(getdetails);
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="mrmDate" class="mrmDate form-control W-150"> </div></td><td> <input type="file" class="mrmwordFormatfile w-200px" id="mrmwordFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedMRMSchedulefile w-200px" id="ApprovedMRMSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="MoMuploadfile w-200px" id="MoMuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#managementReviewMeeting tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="date" name="" id="mrmDate" class="mrmDate form-control W-150"> </div></td><td> <input type="file" class="mrmwordFormatfile w-200px" id="mrmwordFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedMRMSchedulefile w-200px" id="ApprovedMRMSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="MoMuploadfile w-200px" id="MoMuploadfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                        $("#managementReviewMeeting tbody").append(getrowcontent);
                    }


                }
            }

        });
        tableReviewMeeting();

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality/AuditorRecommendationList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            success: function (data) {
                $("#auditrec tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        if (values.Recommendationfor == null) {
                            var Recommendationfor = '<td><div class=form-group>  <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select></div></td>'
                        }
                        else {
                            var Recommendationfor = '<td><div class=form-group>  <select name="" id="Typeofauditt' + values.ID + '" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select></div></td>';
                        }
                        if (values.Auditorname == null) {
                            var Auditorname = '<td><div class=form-group> <textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea></div></td>'
                        }
                        else {
                            var Auditorname = '<td><div class=form-group> <textarea type="text" name="" id="NameoftheAuditor" value="" class="NameoftheAuditor form-control">' + values.Auditorname + '</textarea></div></td>';
                        }
                        if (values.RecommendedCertification == null) {
                            var RecommendedCertification = '<td><div class=form-group>  <textarea type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></textarea></div></td>'
                        }
                        else {
                            var RecommendedCertification = '<td><div class=form-group>  <textarea type="text" name="" id="RecommendationforCertification" value="" class="RecommendationforCertification form-control">' + values.RecommendedCertification + '</textarea></div></td>';
                        }
                        if (values.Comments == null) {
                            var Comments = '<td><div class=form-group> <textarea type="text" name="" id="comments" class="comments form-control"></textarea></div></td>'
                        }
                        else {
                            var Comments = '<td><div class=form-group> <textarea type="text" name="" id="comments" class="comments form-control">' + values.Comments + '</textarea></div></td>';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + Recommendationfor + ' ' + Auditorname + ' ' + RecommendedCertification + ' ' + Comments + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#auditrec tbody").append(getdetails);
                            $("#Typeofauditt" + values.ID).val(values.Recommendationfor.trim());
                        }
                        else {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td>' + Recommendationfor + ' ' + Auditorname + ' ' + RecommendedCertification + ' ' + Comments + '</tr>';
                            $("#auditrec tbody").append(getdetails);
                            $("#Typeofauditt" + values.ID).val(values.Recommendationfor.trim());
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" sno=' + snos++ + ' class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea> </div></td><td> <div class="form-group">  <textarea type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="comments" class="comments form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#auditrec tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" sno=' + snos++ + ' class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea> </div></td><td> <div class="form-group">  <textarea type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="comments" class="comments form-control"></textarea> </div></td></tr>';
                        $("#auditrec tbody").append(getrowcontent);
                    }


                }
            }

        });
        tableauditrec()

        $.ajax({
            url: "https://api.pioneerfoods.in/Quality/QualityStatusList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#qualityStatus tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        var datef = "";
                        if (values.Nextsurveillanceaudit != null) {
                            var completedDate = new Date(parseInt(values.Nextsurveillanceaudit.replace("/Date(", "").replace(")/")));
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
                        if (values.certificatecopy == null) {
                            var certificatecopy = '<td>  <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria - describedby="inputGroupFileAddon01" ></td>'
                        }
                        else {
                            var certificatecopy = '<td><a class="alink" target="_blank"  href="' + values.certificatecopy + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.validity == null) {
                            var validity = '<td><div class=form-group> <textarea type="text" name="" id="validity" class="validity form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var validity = '<td><div class=form-group><textarea type="text" name="" value="" id="validity" class="w-200px validity form-control">' + values.validity + '</textarea></div></td>';
                        }
                        if (values.NeworSurveillance == null) {
                            var NeworSurveillance = '<td><div class=form-group> <textarea type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var NeworSurveillance = '<td><div class=form-group> <textarea type="text" name="" value="" id="NeworServeilience" class="w-200px NeworServeilience form-control">' + values.NeworSurveillance + '</textarea></div></td>';
                        }
                        if (values.Status == null) {
                            var Status = '<td><div class=form-group> <select name="" id="status" class="status form-control w-150px"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select></div></td>'
                        }
                        else {
                            var Status = '<td><div class=form-group>  <select name="" id="status' + values.ID + '" class="status w-150px form-control"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select></div></td>';
                        }
                        if (datef == null) {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"></div></td>'
                        }
                        else {
                            var datef = '<td><div class=form-group> <input type="date" name="" value="' + datef + '" id="NextSurveillanceAudit" class="w-200px NextSurveillanceAudit form-control"></div></td>';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group>  <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td><div class=form-group>  <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px">' + values.Remarks + '</textarea></div></td>';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td> ' + validity + ' ' + NeworSurveillance + ' ' + Status + ' ' + datef + ' ' + Remarks + '' + certificatecopy + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#qualityStatus tbody").append(getdetails);
                            $("#status" + values.ID).val(values.Status);
                        }
                        else {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ sno=' + snos++ + ' type=button></td><td>' + sno++ + '</td> ' + validity + ' ' + NeworSurveillance + ' ' + Status + ' ' + datef + ' ' + Remarks + '' + certificatecopy + '</tr>';
                            $("#qualityStatus tbody").append(getdetails);
                            $("#status" + values.ID).val(values.Status);
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="validity" class="validity form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"></textarea></div></td><td> <div class="form-group"> <select name="" id="status" class="status form-control w-150px"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select> </div></td><td> <div class="form-group"> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea> </div></td><td> <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#qualityStatus tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="validity" class="validity form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="status" class="status form-control w-150px"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select> </div></td><td> <div class="form-group"> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea> </div></td><td> <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                        $("#qualityStatus tbody").append(getrowcontent);
                    }

                }
            }

        });
        tableStatus()
    }
    $("#createTemplateSubmit").submit(function () {
        $("#spinner").show();

        setTimeout(
            function () {
                debugger;
                var joballocation_ID = $("#ddjobid").val();
                var AdminID = ADMIN_AUTH;
                var ID = $("#txtid").text();
                var audittype = $("#ddinternal").val();
                var external = $(".External:checked").val();
                var Frequency = $("#Frequency").val();
                var auditDate = $("#auditDate").val();
                var joballocation_ID = joballocation_ID;

                var postdata = new FormData();
                postdata.append('Audittype', audittype);
                postdata.append('Externals', external);
                postdata.append('Frequency', Frequency);
                postdata.append('ID', ID);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('AdminID', AdminID);
                postdata.append('Previousauditdate', auditDate);

                $.ajax({
                    url: 'https://api.pioneerfoods.in/Quality/Create_AuditType',
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    //beforeSend: function () {
                    //    // Show the spinner before the AJAX call starts
                    //    $("#spinner").show();
                    //},
                    //complete: function () {
                    //    // Hide the spinner after the AJAX call completes (regardless of success or failure)
                    //    $("#spinner").hide();
                    //},
                    success: function (data) {

                        if (data.responsecode == 1) {
                            var joballocation_ID = data.responseObject;
                            Createauditschedule(joballocation_ID);
                            CreateAuditordetails(joballocation_ID);
                            CreateAuditorMeetingdetails(joballocation_ID);
                            CreateAuditChecklist(joballocation_ID);
                            CreateNCandCAtable(joballocation_ID);
                            CreateReviewMeeting(joballocation_ID);
                            CreateAuditorRecommendation(joballocation_ID);
                            CreateQualityStatus(joballocation_ID);
                            alert("Quality Certification Created Successfully");
                            window.location = "/qualityCompliance/QualityJobsList.html";
                        }
                    }
                });
            }, 5000);
    });
    /*data: { Audittype: audittype, Externals: external, Frequency: Frequency, Previousauditdate: auditDate },*/
    function Createauditschedule(joballocation_ID) {

        var gettablelength = $("#audit tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var file = ""
                var checkAuditSchedule = $("#audit tbody tr").eq(i).find(".alink").attr("href");
                if (checkAuditSchedule) {
                    var checkAuditSchedule = $("#audit tbody tr").eq(i).find(".alink").attr("href");
                }
                else {

                    var checkfiles = $("#audit tbody tr").eq(i).find(".AuditScheduleFormatfile").val();
                    if (checkfiles) {
                        file = $("#audit tbody tr").eq(i).find(".AuditScheduleFormatfile")[0].files[0];
                    }

                }
                var file1 = ""
                var checkApprovedAudit = $("#audit tbody tr").eq(i).find(".alink1").attr("href");
                if (checkApprovedAudit) {
                    var checkApprovedAudit = $("#audit tbody tr").eq(i).find(".alink1").attr("href");
                }
                else {

                    var checkfile1 = $("#audit tbody tr").eq(i).find(".ApprovedAuditSchedulefile").val();
                    if (checkfile1) {
                        file1 = $("#audit tbody tr").eq(i).find(".ApprovedAuditSchedulefile")[0].files[0];
                    }
                }
                var ID = $("#audit tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var Date = $("#audit tbody tr").eq(i).find(".date").val();
                var typeOfAudit = $("#audit tbody tr").eq(i).find(".typeOfAudit").val();
                var annualRemarks = $("#audit tbody tr").eq(i).find(".annualRemarks").val();
                var AdminID = ADMIN_AUTH;

                var joballocation_ID = joballocation_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                if (checkAuditSchedule != null) {
                    postdata.append('AuditScheduleFormat', checkAuditSchedule);
                } else {
                    postdata.append('file', file);
                }
                if (checkApprovedAudit != null) {
                    postdata.append('ApprovedAuditSchedule', checkApprovedAudit);
                } else {
                    postdata.append('file1', file1);
                }
                postdata.append('Date', Date);
                postdata.append('TypeofAudit', typeOfAudit);
                postdata.append('Remarks', annualRemarks);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('AdminID', AdminID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Create_auditschedule",
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
    function CreateAuditordetails(joballocation_ID) {

        var gettablelength = $("#auditor tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#auditor tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var file2 = ""
                var checkauditorphoto = $("#auditor tbody tr").eq(i).find(".alink").attr("href");
                if (checkauditorphoto) {
                    var checkauditorphoto = $("#auditor tbody tr").eq(i).find(".alink").attr("href");
                }
                else {

                    var checkfile2 = $("#auditor tbody tr").eq(i).find(".auditorphotofile").val();
                    if (checkfile2) {
                        file2 = $("#auditor tbody tr").eq(i).find(".auditorphotofile")[0].files[0];
                    }
                }

                var file3 = ""
                var checkauditorId = $("#auditor tbody tr").eq(i).find(".alink1").attr("href");
                if (checkauditorId) {
                    var checkauditorId = $("#auditor tbody tr").eq(i).find(".alink1").attr("href");
                }
                else {

                    var checkfile3 = $("#auditor tbody tr").eq(i).find(".auditorIdfile").val();
                    if (checkfile3) {
                        file3 = $("#auditor tbody tr").eq(i).find(".auditorIdfile")[0].files[0];
                    }
                }
                var file4 = ""
                var checkQualificationUp = $("#auditor tbody tr").eq(i).find(".alink2").attr("href");
                if (checkQualificationUp) {
                    var checkQualificationUp = $("#auditor tbody tr").eq(i).find(".alink2").attr("href");
                }
                else {

                    var checkfile4 = $("#auditor tbody tr").eq(i).find(".QualificationUploadfile").val();
                    if (checkfile4) {
                        file4 = $("#auditor tbody tr").eq(i).find(".QualificationUploadfile")[0].files[0];
                    }
                }
                var audtorName = $("#auditor tbody tr").eq(i).find(".audtorName").val();
                var AdminID = ADMIN_AUTH;
                var joballocation_ID = joballocation_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                if (checkauditorphoto != null) {
                    postdata.append('auditorphotoupload', checkauditorphoto);
                } else {
                    postdata.append('photoupload', file2);
                }
                if (checkauditorId != null) {
                    postdata.append('auditoridupload', checkauditorId);
                } else { 
                    postdata.append('idupload', file3);
                }
                if (checkQualificationUp != null) {
                    postdata.append('QualificationUpload', checkQualificationUp);
                } else {
                    postdata.append('Qualupload', file4);
                }
                postdata.append('auditorname', audtorName);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('AdminID', AdminID);


                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Create_Auditordetails",
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
    function CreateAuditorMeetingdetails(joballocation_ID) {

        var gettablelength = $("#auditmeet tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#auditmeet tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var file5 = ""
                var checkQualificationUp = $("#auditmeet tbody tr").eq(i).find(".alink").attr("href");
                if (checkQualificationUp) {
                    var checkQualificationUp = $("#auditmeet tbody tr").eq(i).find(".alink").attr("href");
                }
                else {

                    var checkfile5 = $("#auditmeet tbody tr").eq(i).find(".Attendencesheetdownloadfile").val();
                    if (checkfile5) {
                        file5 = $("#auditmeet tbody tr").eq(i).find(".Attendencesheetdownloadfile")[0].files[0];
                    }
                }
                var file6 = ""
                var checkSignedAttendenceup = $("#auditmeet tbody tr").eq(i).find(".alink1").attr("href");
                if (checkSignedAttendenceup) {
                    var checkSignedAttendenceup = $("#auditmeet tbody tr").eq(i).find(".alink1").attr("href");
                }
                else {

                    var checkfile6 = $("#auditmeet tbody tr").eq(i).find(".SignedAttendenceuploadfile").val();
                    if (checkfile6) {
                        file6 = $("#auditmeet tbody tr").eq(i).find(".SignedAttendenceuploadfile")[0].files[0];
                    }
                }
                var date1 = $("#auditmeet tbody tr").eq(i).find(".date1").val();
                var TypeofMeeting = $("#auditmeet tbody tr").eq(i).find(".TypeofMeeting").val();
                var AdminID = ADMIN_AUTH;
                var joballocation_ID = joballocation_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                if (checkQualificationUp != null) {
                    postdata.append('Attendencesheet', checkQualificationUp);
                } else {
                    postdata.append('file', file5);
                }
                if (checkSignedAttendenceup != null) {
                    postdata.append('SignedAttendence', checkSignedAttendenceup);
                } else {
                    postdata.append('file1', file6);
                }
                postdata.append('Date', date1);
                postdata.append('TypeofMeeting', TypeofMeeting);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('AdminID', AdminID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Create_AuditorMeetingdetails",
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
    function CreateAuditChecklist(joballocation_ID) {

        var gettablelength = $("#standardTemplate tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#standardTemplate tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var standardClause = $("#standardTemplate tbody tr").eq(i).find(".standardClause").val();
                var file7 = ""
                var checkuploadEvidences = $("#standardTemplate tbody tr").eq(i).find(".alink").attr("href");
                if (checkuploadEvidences) {
                    var checkuploadEvidences = $("#standardTemplate tbody tr").eq(i).find(".alink").attr("href");
                }
                else {

                    var checkfile7 = $("#standardTemplate tbody tr").eq(i).find(".uploadEvidencesfile").val();
                    if (checkfile7) {
                        file7 = $("#standardTemplate tbody tr").eq(i).find(".uploadEvidencesfile")[0].files[0];
                    }
                }
                var standardDescription = $("#standardTemplate tbody tr").eq(i).find(".standardDescription").val();
                var Observations = $("#standardTemplate tbody tr").eq(i).find(".Observations").val();
                var Auditordecision = $("#standardTemplate tbody tr").eq(i).find(".Auditor_decision").val();
                var annualRemarks1 = $("#standardTemplate tbody tr").eq(i).find(".annualRemarks2").val();
                var AdminID = ADMIN_AUTH;
                var joballocation_ID = joballocation_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('clause', standardClause);
                if (checkuploadEvidences != null) {
                    postdata.append('Evidencesupload', checkuploadEvidences);
                } else {
                    postdata.append('Evidenceupload', file7);
                }
                postdata.append('Description', standardDescription);
                postdata.append('Observations', Observations);
                postdata.append('Auditordecision', Auditordecision);
                postdata.append('Remarks', annualRemarks1);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('AdminID', AdminID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Create_AuditChecklist",
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
    function CreateNCandCAtable(joballocation_ID) {

        var gettablelength = $("#nc-caDetails tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var file8 = ""
                var checkEvidencesupload = $("#nc-caDetails tbody tr").eq(i).find(".alink").attr("href");
                if (checkEvidencesupload) {
                    var checkEvidencesupload = $("#nc-caDetails tbody tr").eq(i).find(".alink").attr("href");
                }
                else {

                    var checkfile8 = $("#nc-caDetails tbody tr").eq(i).find(".Evidencesuploadfile").val();
                    if (checkfile8) {
                        file8 = $("#nc-caDetails tbody tr").eq(i).find(".Evidencesuploadfile")[0].files[0];
                    }
                }
                var ID = $("#nc-caDetails tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var audit_type = $("#nc-caDetails tbody tr").eq(i).find(".audit_type").val();
                var nccaDetail = $("#nc-caDetails tbody tr").eq(i).find(".nccaDetail").val();
                var rootcause = $("#nc-caDetails tbody tr").eq(i).find(".rootcause").val();
                var ncnumber = $("#nc-caDetails tbody tr").eq(i).find(".ncnumber").val();
                var CAProposed = $("#nc-caDetails tbody tr").eq(i).find(".CAProposed").val();
                var CAApprovedbyAuditor = $("#nc-caDetails tbody tr").eq(i).find(".CAApprovedbyAuditor").val();
                var ncClosedby = $("#nc-caDetails tbody tr").eq(i).find(".ncClosedby").val();
                var ncCloseDate = $("#nc-caDetails tbody tr").eq(i).find(".ncCloseDate").val();
                var AdminID = ADMIN_AUTH;
                var joballocation_ID = joballocation_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                if (checkEvidencesupload != null) {
                    postdata.append('Evidencesupload', checkEvidencesupload);
                } else {
                    postdata.append('file', file8);
                }
                postdata.append('AuditType', audit_type);
                postdata.append('NCopenDate', nccaDetail);
                postdata.append('NCnumber', ncnumber);
                postdata.append('CAProposed', CAProposed);
                postdata.append('NCRootcause', rootcause),
                    postdata.append('CA_ApprovedbyAuditor', CAApprovedbyAuditor);
                postdata.append('NCclosedby', ncClosedby);
                postdata.append('NCcloseDate', ncCloseDate);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('AdminID', AdminID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Create_NCandCAtable",
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
    function CreateReviewMeeting(joballocation_ID) {

        var gettablelength = $("#managementReviewMeeting tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#managementReviewMeeting tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                //var file9 = ""
                //var checkAuditreportupload = $("#managementReviewMeeting tbody tr").eq(i).find(".alink").attr("href");
                //if (checkAuditreportupload) {
                //    var checkAuditreportupload = $("#managementReviewMeeting tbody tr").eq(i).find(".alink").attr("href");
                //}
                //else {

                //    var checkfile9 = $("#managementReviewMeeting tbody tr").eq(i).find(".Auditreportuploadfile").val();
                //    if (checkfile9) {
                //        file9 = $("#managementReviewMeeting tbody tr").eq(i).find(".Auditreportuploadfile")[0].files[0];
                //    }
                //}
                var file10 = ""
                var checkmrmwordFormat = $("#managementReviewMeeting tbody tr").eq(i).find(".alink1").attr("href");
                if (checkmrmwordFormat) {
                    var checkmrmwordFormat = $("#managementReviewMeeting tbody tr").eq(i).find(".alink1").attr("href");
                }
                else {

                    var checkfile10 = $("#managementReviewMeeting tbody tr").eq(i).find(".mrmwordFormatfile").val();
                    if (checkfile10) {
                        file10 = $("#managementReviewMeeting tbody tr").eq(i).find(".mrmwordFormatfile")[0].files[0];
                    }
                }
                var file11 = ""
                var checkApprovedMRMSchedule = $("#managementReviewMeeting tbody tr").eq(i).find(".alink2").attr("href");
                if (checkApprovedMRMSchedule) {
                    var checkApprovedMRMSchedule = $("#managementReviewMeeting tbody tr").eq(i).find(".alink2").attr("href");
                }
                else {

                    var checkfile11 = $("#managementReviewMeeting tbody tr").eq(i).find(".ApprovedMRMSchedulefile").val();
                    if (checkfile11) {
                        file11 = $("#managementReviewMeeting tbody tr").eq(i).find(".ApprovedMRMSchedulefile")[0].files[0];
                    }
                }
                var file12 = ""
                var checkMoMuploadfile = $("#managementReviewMeeting tbody tr").eq(i).find(".alink3").attr("href");
                if (checkMoMuploadfile) {
                    var checkMoMuploadfile = $("#managementReviewMeeting tbody tr").eq(i).find(".alink3").attr("href");
                }
                else {

                    var checkfile12 = $("#managementReviewMeeting tbody tr").eq(i).find(".MoMuploadfile").val();
                    if (checkfile12) {
                        file12 = $("#managementReviewMeeting tbody tr").eq(i).find(".MoMuploadfile")[0].files[0];
                    }
                }
               /* var auditType = $("#managementReviewMeeting tbody tr").eq(i).find(".auditType").val();*/
                var mrmDate = $("#managementReviewMeeting tbody tr").eq(i).find(".mrmDate").val();
                var AdminID = ADMIN_AUTH;
                var joballocation_ID = joballocation_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                //if (checkAuditreportupload != null) {
                //    postdata.append('Auditreportupload', checkAuditreportupload);
                //} else {
                //    postdata.append('Auditreportfile', file9);
                //}
                if (checkmrmwordFormat != null) {
                    postdata.append('MRMformat', checkmrmwordFormat);
                } else {
                    postdata.append('format', file10);
                }
                if (checkApprovedMRMSchedule != null) {
                    postdata.append('ApprovedMRMSchedule', checkApprovedMRMSchedule);
                } else {
                    postdata.append('MrMschfile', file11);
                }
                if (checkMoMuploadfile != null) {
                    postdata.append('MoMupload', checkMoMuploadfile);
                } else {
                    postdata.append('MoMfile', file12);
                }
                /*postdata.append('TypeofAudit', auditType);*/
                postdata.append('ReviewDate', mrmDate);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('AdminID', AdminID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Create_ReviewMeeting",
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
    function CreateAuditorRecommendation(joballocation_ID) {

        var gettablelength = $("#auditrec tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#auditrec tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var TypeofMeeting1 = $("#auditrec tbody tr").eq(i).find(".Typeofauditt").val();
                var NameoftheAuditor = $("#auditrec tbody tr").eq(i).find(".NameoftheAuditor").val();
                var RecommendationforCertification = $("#auditrec tbody tr").eq(i).find(".RecommendationforCertification").val();
                var comments = $("#auditrec tbody tr").eq(i).find(".comments").val();
                var joballocation_ID = joballocation_ID;
                var AdminID = ADMIN_AUTH;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('Recommendationfor', TypeofMeeting1);
                postdata.append('Auditorname', NameoftheAuditor);
                postdata.append('RecommendedCertification', RecommendationforCertification);
                postdata.append('Comments', comments);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('AdminID', AdminID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Create_AuditorRecommendation",
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
    function CreateQualityStatus(joballocation_ID) {

        var gettablelength = $("#qualityStatus tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var file13 = ""
                var checkcertificationCopy = $("#qualityStatus tbody tr").eq(i).find(".alink").attr("href");
                if (checkcertificationCopy) {
                    var checkcertificationCopy = $("#qualityStatus tbody tr").eq(i).find(".alink").attr("href");
                }
                else {

                    var checkfile13 = $("#qualityStatus tbody tr").eq(i).find(".certificationCopyfile").val();
                    if (checkfile13) {
                        file13 = $("#qualityStatus tbody tr").eq(i).find(".certificationCopyfile")[0].files[0];
                    }
                }
                var ID = $("#qualityStatus tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var validity = $("#qualityStatus tbody tr").eq(i).find(".validity").val();
                var NeworServeilience = $("#qualityStatus tbody tr").eq(i).find(".NeworServeilience").val();
                var status = $("#qualityStatus tbody tr").eq(i).find(".status").val();
                var NextSurveillanceAudit = $("#qualityStatus tbody tr").eq(i).find(".NextSurveillanceAudit").val();
                var Remarks1 = $("#qualityStatus tbody tr").eq(i).find(".Remarks1").val();
                var AdminID = ADMIN_AUTH;
                var joballocation_ID = joballocation_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                if (checkcertificationCopy != null) {
                    postdata.append('certificatecopy', checkcertificationCopy);
                } else {
                    postdata.append('file1', file13);
                }
                postdata.append('validity', validity);
                postdata.append('NeworSurveillance', NeworServeilience);
                postdata.append('Status', status);
                postdata.append('Nextsurveillanceaudit', NextSurveillanceAudit);
                postdata.append('Remarks', Remarks1);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('AdminID', AdminID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Create_QualityStatus",
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
                        }
                    }
                });
            };
        }
    }

    $("#audit").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Delete_AuditSchedule?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });
    $("#auditor").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Delete_Auditordetails?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });
    $("#auditmeet").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Delete_AuditorMeetingdetails?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });
    $("#standardTemplate").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Delete_AuditChecklist?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });
    $("#nc-caDetails").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Delete_NCandCAtable?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });
    $("#managementReviewMeeting").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Delete_ReviewMeeting?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });
    $("#auditrec").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Delete_AuditorRecommendation?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });
    $("#qualityStatus").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pioneerfoods.in/Quality/Delete_QualityStatus?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });


    function tableaudit() {
        var currentSno1 = parseInt($("#audit .addrow:last").attr("sno")) + 1;
        var currentSnos1 = 2;
        $("#audit").on("click", ".addrow", function () {
            if (currentSno1 >= 1) {
                var getvalue = currentSno1++;
            } else {

                var getvalue = currentSnos1++;
            }
            var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date form-control"> </div></td><td> <div class="form-group"> <select name="" id="typeOfAudit" class="typeOfAudit form-control w-100px"> <option value="internal">Internal</option> <option value="external">External</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="AuditScheduleFormatfile w-200px" id="AuditScheduleFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedAuditSchedulefile w-200px" id="ApprovedAuditSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#audit tbody").append(getrowcontent);
        });
        $("#audit").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos1 = 2;
    $("#audit").on("click", ".addrow1", function () {

        var getvalue = currentSnos1++;
        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date form-control"> </div></td><td> <div class="form-group"> <select name="" id="typeOfAudit" class="typeOfAudit form-control w-100px"> <option value="internal">Internal</option> <option value="external">External</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="AuditScheduleFormatfile w-200px" id="AuditScheduleFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedAuditSchedulefile w-200px" id="ApprovedAuditSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#audit tbody").append(getrowcontent);
    });
    $("#audit").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });


    function tableauditor() {
        var currentSno2 = parseInt($("#auditor .addrow:last").attr("sno")) + 1;
        var currentSnos2 = 2;
        $("#auditor").on("click", ".addrow", function () {
            if (currentSno2 >= 1) {
                var getvalue = currentSno2++;
            } else {

                var getvalue = currentSnos2++;
            }
            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <textarea type="text" name="" id="audtorName" class="audtorName form-control w-500px"></textarea> </div></td><td> <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#auditor tbody").append(getrowcontent);
        });
        $("#auditor").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos2 = 2;
    $("#auditor").on("click", ".addrow1", function () {

        var getvalue = currentSnos2++;
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group">  <textarea type="text" name="" id="audtorName" class="audtorName form-control w-500px"></textarea> </div></td><td> <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#auditor tbody").append(getrowcontent);
    });
    $("#auditor").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });


    function tableauditmeet() {
        var currentSno3 = parseInt($("#auditmeet .addrow:last").attr("sno")) + 1;
        var currentSnos3 = 2;
        $("#auditmeet").on("click", ".addrow", function () {
            if (currentSno3 >= 1) {
                var getvalue = currentSno3++;
            } else {

                var getvalue = currentSnos3++;
            }
            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date1 form-control"> </div></td><td> <div class="form-group"> <select name="" id="TypeofMeeting" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select> </div></td><td> <input type="file" class="Attendencesheetdownloadfile w-200px" id="Attendencesheetdownloadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="SignedAttendenceuploadfile w-200px" id="SignedAttendenceuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#auditmeet tbody").append(getrowcontent);
        });
        $("#auditmeet").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos3 = 2;
    $("#auditmeet").on("click", ".addrow1", function () {
        var getvalue = currentSnos3++;
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="date" name="" id="date" class="date1 form-control"> </div></td><td> <div class="form-group"> <select name="" id="TypeofMeeting" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select> </div></td><td> <input type="file" class="Attendencesheetdownloadfile w-200px" id="Attendencesheetdownloadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="SignedAttendenceuploadfile w-200px" id="SignedAttendenceuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#auditmeet tbody").append(getrowcontent);
    });
    $("#auditmeet").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });


    function tablestandardTemplate() {
        var currentSno4 = parseInt($("#standardTemplate .addrow:last").attr("sno")) + 1;
        var currentSnos4 = 2;
        $("#standardTemplate").on("click", ".addrow", function () {
            if (currentSno4 >= 1) {
                var getvalue = currentSno4++;
            } else {

                var getvalue = currentSnos4++;
            }
            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <textarea type="text" name="" id="standardClause" class="standardClause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="Auditor_decision" class="Auditordecision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea> </div></td><td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#standardTemplate tbody").append(getrowcontent);
        });
        $("#standardTemplate").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos4 = 2;
    $("#standardTemplate").on("click", ".addrow1", function () {
        var getvalue = currentSnos4++;
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <textarea type="text" name="" id="standardClause" class="standardClause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="Auditor_decision" class="Auditordecision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea> </div></td><td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#standardTemplate tbody").append(getrowcontent);
    });
    $("#standardTemplate").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });




    function tablecaDetails() {
        var currentSno5 = parseInt($("#nc-caDetails .addrow:last").attr("sno")) + 1;
        var currentSnos5 = 2;
        $("#nc-caDetails").on("click", ".addrow", function () {
            if (currentSno5 >= 1) {
                var getvalue = currentSno5++;
            } else {

                var getvalue = currentSnos5++;
            }
            var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td><div class="form-group"><textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-150px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#nc-caDetails tbody").append(getrowcontent);
        });
        $("#nc-caDetails").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos5 = 2;
    $("#nc-caDetails").on("click", ".addrow1", function () {
        var getvalue = currentSnos5++;

        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td><div class="form-group"><textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-150px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#nc-caDetails tbody").append(getrowcontent);
    });
    $("#nc-caDetails").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });

    function tableReviewMeeting() {
        var currentSno6 = parseInt($("#managementReviewMeeting .addrow:last").attr("sno")) + 1;
        var currentSnos6 = 2;
        $("#managementReviewMeeting").on("click", ".addrow", function () {
            if (currentSno6 >= 1) {
                var getvalue = currentSno6++;
            } else {

                var getvalue = currentSnos6++;
            }
            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="date" name="" id="mrmDate" class="mrmDate form-control W-150"> </div></td><td> <input type="file" class="mrmwordFormatfile w-200px" id="mrmwordFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedMRMSchedulefile w-200px" id="ApprovedMRMSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="MoMuploadfile w-200px" id="MoMuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#managementReviewMeeting tbody").append(getrowcontent);
        });
        $("#managementReviewMeeting").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos6 = 2;
    $("#managementReviewMeeting").on("click", ".addrow1", function () {
      var getvalue = currentSnos6++;
        
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="date" name="" id="mrmDate" class="mrmDate form-control W-150"> </div></td><td> <input type="file" class="mrmwordFormatfile w-200px" id="mrmwordFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedMRMSchedulefile w-200px" id="ApprovedMRMSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="MoMuploadfile w-200px" id="MoMuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#managementReviewMeeting tbody").append(getrowcontent);
    });
    $("#managementReviewMeeting").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });

    function tableauditrec() {
        var currentSno7 = parseInt($("#auditrec .addrow:last").attr("sno")) + 1;
        var currentSnos7 = 2;
        $("#auditrec").on("click", ".addrow", function () {
            if (currentSno7 >= 1) {
                var getvalue = currentSno7++;
            } else {

                var getvalue = currentSnos7++;
            }
            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select> </div></td><td> <div class="form-group"><textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="comments" class="comments form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#auditrec tbody").append(getrowcontent);
        });
        $("#auditrec").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos7 = 2;
    $("#auditrec").on("click", ".addrow1", function () {
       var getvalue = currentSnos7++;
        
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></textarea></div></td><td> <div class="form-group"> <textarea type="text" name="" id="comments" class="comments form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#auditrec tbody").append(getrowcontent);
    });
    $("#auditrec").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });


    function tableStatus() { 
    var currentSno8 = parseInt($("#qualityStatus .addrow:last").attr("sno")) + 1;
    var currentSnos8 = 2;
    $("#qualityStatus").on("click", ".addrow", function () {
        if (currentSno8 >= 1) {
            var getvalue = currentSno8++;
        } else {

            var getvalue = currentSnos8++;
        }
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <textarea type="text" name="" id="validity" class="validity form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="status" class="status form-control w-150px">  <option value="">Select Status </option> <option value="red">Red</option> <option value="green">Green</option> </select> </div></td><td> <div class="form-group"> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea> </div></td><td> <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#qualityStatus tbody").append(getrowcontent);
    })
    $("#qualityStatus").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    }
    var currentSnos8 = 2;
    $("#qualityStatus").on("click", ".addrow1", function () {
       var getvalue = currentSnos8++;
        
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <textarea type="text" name="" id="validity" class="validity form-control w-200px"></textarea> </div></td><td> <div class="form-group"><textarea type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"></textarea></div></td><td> <div class="form-group"> <select name="" id="status" class="status form-control w-150px">  <option value="">Select Status </option> <option value="red">Red</option> <option value="green">Green</option> </select> </div></td><td> <div class="form-group"> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea> </div></td><td> <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#qualityStatus tbody").append(getrowcontent);
    })
    $("#qualityStatus").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
})



