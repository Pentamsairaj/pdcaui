$(document).ready(function () {
    const CLIENT_AUTH = localStorage.getItem("Client_auth");
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
    if (joballocation_ID != null) {
        $('#ddjobid').val(joballocation_ID);
        getlist(joballocation_ID);
        localStorage.removeItem("JobID");
    }
    function getJObID() {

        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/ListforJobID?ClientID=" + CLIENT_AUTH,
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
    function getlist(getjoballocationid) {

        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/AuditTypeList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $.each(data, function (index, values) {
                    debugger;
                        $("#txtid").text(values.ID);
                    $("#ddinternal option:selected").text(values.Audittype).prop('disabled', true);
                    if (values.Audittype != null) {
                        $("#ddinternal").attr('disabled', 'disabled');
                    }
                    $('input[name="External"][value="' + values.Externals + '"]').prop('checked', true).prop('disabled', true);
                    if (values.Externals != null) {
                        $("#myContent").attr('disabled', 'disabled');
                    }
                    $("#Frequency option:selected").text(values.Frequency).attr('disabled', true);

                    if (values.Frequency != null) {
                        $("#Frequency").attr('disabled', 'disabled');
                    }
                    if (values.Previousauditdate != null || values.Previousauditdate == "") {
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
                    $("#auditDate").val(Previousauditdate).prop('disabled', true);
                    if (values.Previousauditdate) {
                        $('#Edit_Featured').prop('checked', false);
                    } else {
                        $('#Edit_Featured').prop('checked', true);
                    }
                    if (values.Previousauditdate != null) {
                        $("#auditDate").attr('disabled', 'disabled');
                    }
                })
            }
        });
        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/AuditScheduleList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false,
            async: false,
            // Not to process data
            //data: fileData,
            success: function (data) {
                $("#audit tbody").empty();
                if (data != 0) {
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
                        if (values.Date == null || values.Date == "") {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="date" class="date form-control"></div></td>'
                        }
                        else {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="date"  value="' + values.Date + '" class="date form-control" disabled></div></td>';
                        }
                        if (values.TypeofAudit == null) {
                            var TypeofAudit = '<td><div class=form-group> <select name="" id="typeOfAudit" class="typeOfAudit form-control w-100px"> <option value="internal">Internal</option> <option value="external">External</option> </select></div></td>'
                        }
                        else {
                            var TypeofAudit = '<td><div class=form-group> <select name="" id="typeOfAudit' + values.ID + '" class="typeOfAudit form-control w-100px" disabled> <option value="internal">Internal</option> <option value="external">External</option> </select></div></td>';
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
                            var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px" disabled>' + values.Remarks + '</textarea></div></td>';
                        }
                        var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+> ' + datef + ' ' + TypeofAudit + ' ' + AuditScheduleFormat + ' ' + ApprovedAuditSchedule + ' ' + Remarks + '</tr>';
                        $("#audit tbody").append(getdetails);
                        $("#typeOfAudit" + values.ID).val(values.TypeofAudit.trim());
                    });
                }
                else {
                    var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="date" name="" id="date" class="date form-control"> </div></td><td> <div class="form-group"> <select name="" id="typeOfAudit" class="typeOfAudit w-100px form-control"> <option value="internal">Internal</option> <option value="external">External</option> </select> </div></td><td> <input type="file" class="AuditScheduleFormatfile w-200px" id="AuditScheduleFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedAuditSchedulefile w-200px" id="ApprovedAuditSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea> </div></td></tr>';
                    $("#audit tbody").append(getrowcontent);
                }
            }

        });
        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/AuditorDetailsList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            async: false,
            //data: fileData,
            success: function (data) {
                $("#auditor tbody").empty();
                if (data != 0) {
                    $.each(data, function (index, values) {
                        if (values.auditorname == null) {
                            var auditorname = '<td><div class=form-group> <input type="text" name="" id="audtorName" class="audtorName form-control w-200px"></div></td>'
                        }
                        else {
                            var auditorname = '<td><div class=form-group><input type="text" name="" value="' + values.auditorname + '" id="audtorName" class="audtorName form-control w-200px" disabled></div></td>';
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
                        var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ type=button></td>' + auditorname + ' ' + auditorphotoupload + ' ' + auditoridupload + ' ' + QualificationUpload + '</tr>';
                        $("#auditor tbody").append(getdetails);

                    });

                }
                else {
                    var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="text" name="" id="audtorName" class="audtorName form-control w-200px"> </div></td><td> <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                    $("#auditor tbody").append(getrowcontent);
                }
            }

        });
        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/AuditorMeetingDetailsList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            async: false,
            //data: fileData,
            success: function (data) {
                $("#auditmeet tbody").empty();
                if (data != 0) {
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
                        if (values.Date == null || values.Date == "") {
                            var datef = '<td><div class=form-group><input type="date" name="" id="date" class="date1 form-control"></div></td>'
                        }
                        else {
                            var datef = '<td><div class=form-group><input type="date" name="" value="' + values.Date + '" id="date" class="date1 form-control" disabled></div></td>';
                        }
                        if (values.TypeofMeeting == null) {
                            var TypeofMeeting = '<td><div class=form-group> <select name="" id="TypeofMeeting" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select></div></td>'
                        }
                        else {
                            var TypeofMeeting = '<td><div class=form-group> <select name="" id="TypeofMeeting' + values.ID + '" class="TypeofMeeting form-control" disabled> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select></div></td>';
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
                        var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+></td>' + datef + ' ' + TypeofMeeting + ' ' + Attendencesheet + ' ' + SignedAttendence + '</tr>';
                        $("#auditmeet tbody").append(getdetails);
                        $("#TypeofMeeting" + values.ID).val(values.TypeofMeeting.trim());
                    });
                }
                else {

                    var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="date" name="" id="date" class="date1 form-control"> </div></td><td> <div class="form-group"> <select name="" id="TypeofMeeting" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select> </div></td><td> <input type="file" class="Attendencesheetdownloadfile w-200px" id="Attendencesheetdownloadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="SignedAttendenceuploadfile w-200px" id="SignedAttendenceuploadfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                    $("#auditmeet tbody").append(getrowcontent);
                }
            }
        });
        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/AuditChecklist?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            async: false,
            //data: fileData,
            success: function (data) {
                $("#standardTemplate tbody").empty();
                if (data != 0) {
                    $.each(data, function (index, values) {
                        if (values.clause == null) {
                            var clause = '<td><div class=form-group><input type="text" name="" id="standardClause" class="standardClause form-control w-200px"></div></td>'
                        }
                        else {
                            var clause = '<td><div class=form-group><input type="text" name="" id="standardClause" value="' + values.clause + '" class="standardClause form-control w-200px" disabled></div></td>';
                        }
                        if (values.Description == null) {
                            var Description = '<td><div class=form-group><textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Description = '<td><div class=form-group><textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px" disabled>' + values.Description + '</textarea></div></td>';
                        }
                        if (values.Observations == null) {
                            var Observations = '<td><div class=form-group> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Observations = '<td><div class=form-group> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px" disabled>' + values.Observations + '</textarea></div></td>';
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
                            var Auditordecision = '<td><div class=form-group><select name="" id="Auditor_decision' + values.ID + '" class="Auditor_decision form-control w-130px" disabled> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select></div></td>';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group><textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td><div class=form-group><textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px" disabled>' + values.Remarks + '</textarea></div></td>';
                        }
                        var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ type=button></td>' + clause + ' ' + Description + ' ' + Observations + ' ' + Evidencesupload + ' ' + Auditordecision + ' ' + Remarks + '</tr>';
                        $("#standardTemplate tbody").append(getdetails);
                        $("#Auditor_decision" + values.ID).val(values.Auditordecision.trim());
                    });
                }
                else {
                    var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="text" name="" id="standardClause" class="standardClause form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea> </div></td><td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <select name="" id="Auditor_decision" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea> </div></td></tr>';
                    $("#standardTemplate tbody").append(getrowcontent);
                }
            }

        });
        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/NCandCAtableList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            async: false,
            //data: fileData,
            success: function (data) {
                $("#nc-caDetails tbody").empty();
                if (data != 0) {
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
                            var AuditType = '<td><div class="form-group"><input type="text" name="" id="audit_type" class="audit_type form-control w-150px"></div></td>'
                        }
                        else {
                            var AuditType = '<td><div class="form-group"><input type="text" name=""  value="' + values.AuditType + '" id="audit_type" class="audit_type form-control w-150px"></div></td>';
                        }
                        if (datef == null || datef == "") {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-150px"></div></td>'
                        }
                        else {
                            var datef = '<td><div class=form-group> <input type="date" value="' + datef + '" name="" id="nc-caDetail" class="nccaDetail form-control w-150px" disabled></div></td>';
                        }
                        if (values.NCnumber == null) {
                            var NCnumber = '<td><div class=form-group><input type="text" name="" id="ncnumber" class="ncnumber form-control"></div></td>'
                        }
                        else {
                            var NCnumber = '<td><div class=form-group><input type="text" name="" id="ncnumber" value="' + values.NCnumber + '" class="ncnumber form-control w-200px" disabled></div></td>';
                        }
                        if (values.NCRootcause == null) {
                            var NCRootcause = '<td><div class=form-group> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var NCRootcause = '<td><div class=form-group> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px" disabled>' + values.NCRootcause + '</textarea></div></td>';
                        }
                        if (values.CAProposed == null) {
                            var CAProposed = '<td><div class=form-group><textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var CAProposed = '<td><div class=form-group><textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px" disabled>' + values.CAProposed + '</textarea></div></td>';
                        }
                        if (values.CA_ApprovedbyAuditor == null) {
                            var CA_ApprovedbyAuditor = '<td><div class=form-group><input type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></div></td>'
                        }
                        else {
                            var CA_ApprovedbyAuditor = '<td><div class=form-group><input type="text" name="" id="CAApprovedbyAuditor" value="' + values.CA_ApprovedbyAuditor + '" class="CAApprovedbyAuditor form-control w-200px" disabled></div></td>';
                        }
                        if (values.Evidencesupload == null) {
                            var Evidencesupload = '<td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Evidencesupload = '<td><a class="alink" target="_blank"  href="' + values.Evidencesupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.NCclosedby == null) {
                            var NCclosedby = '<td><div class=form-group><input type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></div></td>'
                        }
                        else {
                            var NCclosedby = '<td><div class=form-group><input type="text" name="" value="' + values.NCclosedby + '" id="ncClosedby" class="ncClosedby form-control w-200px" disabled></div></td>';
                        }
                        if (dateg == null || dateg == "") {
                            var dateg = '<td><div class=form-group> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"></div></td>'
                        }
                        else {
                            var dateg = '<td><div class=form-group><input type="date" name="" value="' + dateg + '" id="ncCloseDate" class="ncCloseDate form-control w-150px" disabled></div></td>';
                        }

                        var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+></td>' + AuditType +'' + datef + ' ' + NCnumber + ' ' + NCRootcause + ' ' + CAProposed + ' ' + CA_ApprovedbyAuditor + ' ' + Evidencesupload + ' ' + NCclosedby + ' ' + dateg + '</tr>';
                        $("#nc-caDetails tbody").append(getdetails);
                    });
                }
                else {

                    var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td><div class="form-group"><input type="text" name="" id="audit_type" class="audit_type form-control w-150px"></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-100px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"> </div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td></tr>';
                    $("#nc-caDetails tbody").append(getrowcontent);

                }
            }

        });
        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/ReviewMeetingList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            async: false,
            //data: fileData,
            success: function (data) {
                $("#managementReviewMeeting tbody").empty();
                if (data != 0) {
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
                        //    var TypeofAudit = '<td><div class=form-group> <input type="text" name="" id="auditType" value="' + values.TypeofAudit.trim() + '" class="auditType form-control w-200px" disabled></div></td>';
                        //}
                        //if (values.Auditreportupload == null) {
                        //    var Auditreportupload = '<td>  <input type="file" class="Auditreportuploadfile w-200px" id="Auditreportuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
                        //}
                        //else {
                        //    var Auditreportupload = '<td><a class="alink" target="_blank"  href="' + values.Auditreportupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        //}
                        if (datef == null || datef == "") {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="mrmDate" class="mrmDate form-control w-150px"></div></td>'
                        }
                        else {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="mrmDate" value="' + datef + '" class="mrmDate form-control w-150px" disabled></div></td>';
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
                        var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ type=button></td>  ' + datef + ' ' + MRMformat + ' ' + ApprovedMRMSchedule + ' ' + MoMupload + '</tr>';
                        $("#managementReviewMeeting tbody").append(getdetails);
                    });
                }
                else {

                    var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td>><td> <div class="form-group"> <input type="date" name="" id="mrmDate" class="mrmDate form-control W-150"> </div></td><td> <input type="file" class="mrmwordFormatfile w-200px" id="mrmwordFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedMRMSchedulefile w-200px" id="ApprovedMRMSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="MoMuploadfile w-200px" id="MoMuploadfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                    $("#managementReviewMeeting tbody").append(getrowcontent);

                }
            }

        });
        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/AuditorRecommendationList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            async: false,
            //data: fileData,
            success: function (data) {
                $("#auditrec tbody").empty();
                if (data != 0) {
                    $.each(data, function (index, values) {
                        if (values.Recommendationfor == null) {
                            var Recommendationfor = '<td><div class=form-group>  <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select></div></td>'
                        }
                        else {
                            var Recommendationfor = '<td><div class=form-group>  <select name="" id="Typeofauditt' + values.ID + '" class="Typeofauditt form-control" disabled> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select></div></td>';
                        }
                        if (values.Auditorname == null) {
                            var Auditorname = '<td><div class=form-group> <input type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></div></td>'
                        }
                        else {
                            var Auditorname = '<td><div class=form-group> <input type="text" name="" id="NameoftheAuditor" value="' + values.Auditorname + '" class="NameoftheAuditor form-control" disabled></div></td>';
                        }
                        if (values.RecommendedCertification == null) {
                            var RecommendedCertification = '<td><div class=form-group> <input type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></div></td>'
                        }
                        else {
                            var RecommendedCertification = '<td><div class=form-group>  <input type="text" name="" id="RecommendationforCertification" value="' + values.RecommendedCertification + '" class="RecommendationforCertification form-control" disabled></div></td>';
                        }
                        if (values.Comments == null) {
                            var Comments = '<td><div class=form-group> <textarea type="text" name="" id="comments" class="comments form-control"></textarea></div></td>'
                        }
                        else {
                            var Comments = '<td><div class=form-group> <textarea type="text" name="" id="comments" class="comments form-control" disabled>' + values.Comments + '</textarea></div></td>';
                        }

                        var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ type=button></td>' + Recommendationfor + ' ' + Auditorname + ' ' + RecommendedCertification + ' ' + Comments + '</tr>';
                        $("#auditrec tbody").append(getdetails);
                        $("#Typeofauditt" + values.ID).val(values.Recommendationfor.trim());
                    });
                }
                else {

                    var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select> </div></td><td> <div class="form-group"> <input type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="comments" class="comments form-control"></textarea> </div></td></tr>';
                    $("#auditrec tbody").append(getrowcontent);

                }
            }

        });
        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/QualityStatusList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            async: false,
            //data: fileData,
            success: function (data) {
                $("#qualityStatus tbody").empty();
                if (data != 0) {
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
                            var validity = '<td><div class=form-group> <input type="text" name="" id="validity" class="validity form-control w-200px"></div></td>'
                        }
                        else {
                            var validity = '<td><div class=form-group><input type="text" name="" value="' + values.validity + '" id="validity" class="w-200px validity form-control" disabled></div></td>';
                        }
                        if (values.NeworSurveillance == null) {
                            var NeworSurveillance = '<td><div class=form-group> <input type="text" name="" id="NeworServeilience" class="w-200px NeworServeilience form-control"></div></td>'
                        }
                        else {
                            var NeworSurveillance = '<td><div class=form-group> <input type="text" name="" value="' + values.NeworSurveillance + '" id="NeworServeilience" class="w-200px NeworServeilience form-control" disabled></div></td>';
                        }
                        if (values.Status == null) {
                            var Status = '<td><div class=form-group> <select name="" id="status" class="status form-control w-150px"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select></div></td>'
                        }
                        else {
                            var Status = '<td><div class=form-group>  <select name="" id="status' + values.ID + '" class="status w-150px form-control" disabled> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select></div></td>';
                        }
                        if (datef == null || datef == "") {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"></div></td>'
                        }
                        else {
                            var datef = '<td><div class=form-group> <input type="date" name="" value="' + datef + '" id="NextSurveillanceAudit" class="w-200px NextSurveillanceAudit form-control" disabled></div></td>';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group>  <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td><div class=form-group>  <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px" disabled>' + values.Remarks + '</textarea></div></td>';
                        }
                        var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus value=+ type=button></td>' + certificatecopy + ' ' + validity + ' ' + NeworSurveillance + ' ' + Status + ' ' + datef + ' ' + Remarks + '</tr>';
                        $("#qualityStatus tbody").append(getdetails);
                        $("#status" + values.ID).val(values.Status);
                    });
                }
                else {
                    var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="validity" class="validity form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"> </div></td><td> <div class="form-group"> <select name="" id="status" class="status form-control w-150px"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select> </div></td><td> <div class="form-group"> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea> </div></td></tr>';
                    $("#qualityStatus tbody").append(getrowcontent);
                }
            }

        });
    }
    $("#createTemplateSubmit").submit(function () {
        debugger;
        var joballocation_ID = $("#ddjobid").val();
        var ClientID = CLIENT_AUTH;

        var audittype = $("#ddinternal").val();
        var external = $(".External:checked").val();
        var Frequency = $("#Frequency").val();
        var auditDate = $("#auditDate").val();
        var ID = $("#txtid").text();

        var postdata = new FormData();
        postdata.append('Audittype', audittype);
        postdata.append('Externals', external);
        postdata.append('Frequency', Frequency);
        postdata.append('ID', ID);
        postdata.append('ClientID', ClientID);
        postdata.append('Previousauditdate', auditDate);

        $.ajax({
            url: 'https://api.pioneerfoods.in/ClientQuality/Update_Audittype',
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
                    Createauditschedule(joballocation_ID);
                    CreateAuditordetails(joballocation_ID);
                    CreateAuditorMeetingdetails(joballocation_ID);
                    CreateAuditChecklist(joballocation_ID);
                    CreateNCandCAtable(joballocation_ID);
                    CreateReviewMeeting(joballocation_ID);
                    CreateAuditorRecommendation(joballocation_ID);
                    CreateQualityStatus(joballocation_ID);
                    alert("Quality Certification Created Successfully");
                    window.location = "/client/qualityCompliance/QualityJobsList.html";
                }
            }
        });
    });
    /*data: { Audittype: audittype, Externals: external, Frequency: Frequency, Previousauditdate: auditDate },*/
    function Createauditschedule(joballocation_ID) {

        var gettablelength = $("#audit tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var file = ""
                var checkAuditSchedule = $("#audit tbody tr").eq(i).find(".alink").attr("href");
                if (checkAuditSchedule) {
                    //do nothing
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
                    //do nothing
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
                var ClientID = CLIENT_AUTH;

                var joballocation_ID = joballocation_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', file);
                postdata.append('file1', file1);
                postdata.append('Date', Date);
                postdata.append('TypeofAudit', typeOfAudit);
                postdata.append('Remarks', annualRemarks);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('ClientID', ClientID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/ClientQuality/Update_auditschedule",
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
                    //do nothing
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
                    //do nothing
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
                    //do nothing
                }
                else {

                    var checkfile4 = $("#auditor tbody tr").eq(i).find(".QualificationUploadfile").val();
                    if (checkfile4) {
                        file4 = $("#auditor tbody tr").eq(i).find(".QualificationUploadfile")[0].files[0];
                    }
                }
                var audtorName = $("#auditor tbody tr").eq(i).find(".audtorName").val();
                var ClientID = CLIENT_AUTH;
                var joballocation_ID = joballocation_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('photoupload', file2);
                postdata.append('idupload', file3);
                postdata.append('Qualupload', file4);
                postdata.append('auditorname', audtorName);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('ClientID', ClientID);


                $.ajax({
                    url: "https://api.pioneerfoods.in/ClientQuality/Update_Auditordetails",
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
                    //do nothing
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
                    //do nothing
                }
                else {

                    var checkfile6 = $("#auditmeet tbody tr").eq(i).find(".SignedAttendenceuploadfile").val();
                    if (checkfile6) {
                        file6 = $("#auditmeet tbody tr").eq(i).find(".SignedAttendenceuploadfile")[0].files[0];
                    }
                }
                var date1 = $("#auditmeet tbody tr").eq(i).find(".date1").val();
                var TypeofMeeting = $("#auditmeet tbody tr").eq(i).find(".TypeofMeeting").val();
                var ClientID = CLIENT_AUTH;
                var joballocation_ID = joballocation_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', file5);
                postdata.append('file1', file6);
                postdata.append('Date', date1);
                postdata.append('TypeofMeeting', TypeofMeeting);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('ClientID', ClientID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/ClientQuality/Update_AuditorMeetingdetails",
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
                    //do nothing
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
                var ClientID = CLIENT_AUTH;
                var joballocation_ID = joballocation_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('clause', standardClause);
                postdata.append('Evidenceupload', file7);
                postdata.append('Description', standardDescription);
                postdata.append('Observations', Observations);
                postdata.append('Auditordecision', Auditordecision);
                postdata.append('Remarks', annualRemarks1);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('ClientID', ClientID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/ClientQuality/Update_AuditChecklist",
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
                    //do nothing
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
                var nccaDetail = $("#nc-caDetails tbody tr").eq(i).find(".nccaDetail").val();
                var rootcause = $("#nc-caDetails tbody tr").eq(i).find(".rootcause").val();
                var ncnumber = $("#nc-caDetails tbody tr").eq(i).find(".ncnumber").val();
                var CAProposed = $("#nc-caDetails tbody tr").eq(i).find(".CAProposed").val();
                var CAApprovedbyAuditor = $("#nc-caDetails tbody tr").eq(i).find(".CAApprovedbyAuditor").val();
                var ncClosedby = $("#nc-caDetails tbody tr").eq(i).find(".ncClosedby").val();
                var ncCloseDate = $("#nc-caDetails tbody tr").eq(i).find(".ncCloseDate").val();
                var ClientID = CLIENT_AUTH;
                var joballocation_ID = joballocation_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', file8);
                postdata.append('NCopenDate', nccaDetail);
                postdata.append('NCnumber', ncnumber);
                postdata.append('CAProposed', CAProposed);
                postdata.append('NCRootcause', rootcause),
                    postdata.append('CA_ApprovedbyAuditor', CAApprovedbyAuditor);
                postdata.append('NCclosedby', ncClosedby);
                postdata.append('NCcloseDate', ncCloseDate);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('ClientID', ClientID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/ClientQuality/Update_NCandCAtable",
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
                //    //do nothing
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
                    //do nothing
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
                    //do nothing
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
                    //do nothing
                }
                else {

                    var checkfile12 = $("#managementReviewMeeting tbody tr").eq(i).find(".MoMuploadfile").val();
                    if (checkfile12) {
                        file12 = $("#managementReviewMeeting tbody tr").eq(i).find(".MoMuploadfile")[0].files[0];
                    }
                }
             /*   var auditType = $("#managementReviewMeeting tbody tr").eq(i).find(".auditType").val();*/
                var mrmDate = $("#managementReviewMeeting tbody tr").eq(i).find(".mrmDate").val();
                var ClientID = CLIENT_AUTH;
                var joballocation_ID = joballocation_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
              /*  postdata.append('Auditreportfile', file9);*/
                postdata.append('format', file10);
                postdata.append('MrMschfile', file11);
                postdata.append('MoMfile', file12);
               /* postdata.append('TypeofAudit', auditType);*/
                postdata.append('ReviewDate', mrmDate);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('ClientID', ClientID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/ClientQuality/Update_ReviewMeeting",
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
                var ClientID = CLIENT_AUTH;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('Recommendationfor', TypeofMeeting1);
                postdata.append('Auditorname', NameoftheAuditor);
                postdata.append('RecommendedCertification', RecommendationforCertification);
                postdata.append('Comments', comments);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('ClientID', ClientID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/ClientQuality/Update_AuditorRecommendation",
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
                    //do nothing
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
                var ClientID = CLIENT_AUTH;
                var joballocation_ID = joballocation_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file1', file13);
                postdata.append('validity', validity);
                postdata.append('NeworSurveillance', NeworServeilience);
                postdata.append('Status', status);
                postdata.append('Nextsurveillanceaudit', NextSurveillanceAudit);
                postdata.append('Remarks', Remarks1);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('ClientID', ClientID);

                $.ajax({
                    url: "https://api.pioneerfoods.in/ClientQuality/Update_QualityStatus",
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

    //$("#audit").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pioneerfoods.in/Quality/Delete_AuditSchedule?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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
    //$("#auditor").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pioneerfoods.in/Quality/Delete_Auditordetails?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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
    //$("#auditmeet").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pioneerfoods.in/Quality/Delete_AuditorMeetingdetails?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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
    //$("#standardTemplate").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pioneerfoods.in/Quality/Delete_AuditChecklist?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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
    //$("#nc-caDetails").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pioneerfoods.in/Quality/Delete_NCandCAtable?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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
    //$("#managementReviewMeeting").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pioneerfoods.in/Quality/Delete_ReviewMeeting?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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
    //$("#auditrec").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pioneerfoods.in/Quality/Delete_AuditorRecommendation?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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
    //$("#qualityStatus").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pioneerfoods.in/Quality/Delete_QualityStatus?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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
    $("#audit").on("click", ".addrow", function () {
        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="date" name="" id="date" class="date form-control"> </div></td><td> <div class="form-group"> <select name="" id="typeOfAudit" class="typeOfAudit form-control w-100px"> <option value="internal">Internal</option> <option value="external">External</option> </select> </div></td><td> <input type="file" class="AuditScheduleFormatfile w-200px" id="AuditScheduleFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedAuditSchedulefile w-200px" id="ApprovedAuditSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#audit tbody").append(getrowcontent);
    });
    $("#audit").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    $("#auditor").on("click", ".addrow", function () {

        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="text" name="" id="audtorName" class="audtorName form-control w-200px"> </div></td><td> <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#auditor tbody").append(getrowcontent);
    });
    $("#auditor").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    $("#auditmeet").on("click", ".addrow", function () {
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="date" name="" id="date" class="date1 form-control"> </div></td><td> <div class="form-group"> <select name="" id="TypeofMeeting" class="TypeofMeeting form-control"> <option value="">Select Type </option> <option value="Opening">Opening</option> <option value="Closing">Closing</option> </select> </div></td><td> <input type="file" class="Attendencesheetdownloadfile w-200px" id="Attendencesheetdownloadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="SignedAttendenceuploadfile w-200px" id="SignedAttendenceuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#auditmeet tbody").append(getrowcontent);
    });
    $("#auditmeet").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    $("#standardTemplate").on("click", ".addrow", function () {
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="text" name="" id="standardClause" class="standardClause form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea> </div></td><td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <select name="" id="Auditor_decision" class="Auditordecision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#standardTemplate tbody").append(getrowcontent);
    });
    $("#standardTemplate").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    $("#nc-caDetails").on("click", ".addrow", function () {
        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td><div class="form-group"><input type="text" name="" id="audit_type" class="audit_type form-control w-150px"></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-150px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"> </div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#nc-caDetails tbody").append(getrowcontent);
    });
    $("#nc-caDetails").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    $("#managementReviewMeeting").on("click", ".addrow", function () {
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="date" name="" id="mrmDate" class="mrmDate form-control W-150"> </div></td><td> <input type="file" class="mrmwordFormatfile w-200px" id="mrmwordFormatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="ApprovedMRMSchedulefile w-200px" id="ApprovedMRMSchedulefile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="MoMuploadfile w-200px" id="MoMuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#managementReviewMeeting tbody").append(getrowcontent);
    });
    $("#managementReviewMeeting").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    $("#auditrec").on("click", ".addrow", function () {
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select> </div></td><td> <div class="form-group"> <input type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="comments" class="comments form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#auditrec tbody").append(getrowcontent);
    });
    $("#auditrec").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    $("#qualityStatus").on("click", ".addrow", function () {
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="validity" class="validity form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"> </div></td><td> <div class="form-group"> <select name="" id="status" class="status form-control w-150px">  <option value="">Select Status </option> <option value="red">Red</option> <option value="green">Green</option> </select> </div></td><td> <div class="form-group"> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#qualityStatus tbody").append(getrowcontent);
    })
    $("#qualityStatus").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
})



