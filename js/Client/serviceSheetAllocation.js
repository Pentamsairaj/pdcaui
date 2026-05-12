$(document).ready(function () {
    const CLIENT_AUTH = localStorage.getItem("Client_auth");
    const url = window.location.search;
    const params = new URLSearchParams(url);
    getProcess_JobID();
    const ID = params.get("ID");
    if (ID != null) {
        $("#ddjobid").attr('disabled', 'disabled');
        $('#ddjobid').val(ID);
        $("#sername").hide();
        $("#client").hide();
        $("#jobnum").hide();
        $("#Employee").hide();
        $("#from").hide();
        $("#to").hide();
        Getlistofalltables(ID);
    }
   
    $("#serviceClientCompName").change(function () {
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
            $("#sername").show();
        }
        else {
            $("#sername").hide();
        }
    })
    $("#ddjobid").change(function () {
        var getvalue = $(this).val();
        if (getvalue.trim() == "0") {
            $("#client").show();
            $("#from").show();
            $("#to").show();
        }
        else {
            $("#client").hide();
            $("#from").hide();
            $("#to").hide();
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
    function getProcess_JobID() {

        $.ajax({
            url: "https://api.pdca.in/ClientProcess/ListforProcessJobID?ClientID=" + CLIENT_AUTH + "&type=" + false,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {

                $("#ddjobid").empty();
                var defaultoption = '<option value="0">Select Service ID</option>';
                $("#ddjobid").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.ID + '">' + val.Process_JobID + '</option>'
                    $("#ddjobid").append(getdetails);
                });


            }
        });
    }

    $("#ddjobid").change(function () {
        debugger;
        var getjoballocationid = $(this).val();
        Getlistofalltables(getjoballocationid);
    });

    function Getlistofalltables(getjoballocationid) {

        $.ajax({
            url: "https://api.pdca.in/ClientProcess/ServicereqformList?ClientID=" + CLIENT_AUTH + "&Service_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false,
            success: function (data) {
                $("#table-iddoc11 tbody").empty();
                if (data.length > 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        var datef = "";
                        if (values.SRFReceivedOn != null) {

                            var completedDate = new Date(parseInt(values.SRFReceivedOn.replace("/Date(", "").replace(")/")));
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
                        if (values.SRFDraftFormat == null) {
                            var SRFDraftFormat = '<td><div class="form-group"> <input disabled type="url" class="srfdraftFormatfile w-200px form-control" id="srfdraftFormatfile" aria-describedby="inputGroupFileAddon01"></div></td>'
                        }
                        else {
                            var SRFDraftFormat = '<td> <a class="alink" target="_blank" href="' + values.SRFDraftFormat + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.SRFForm == null) {
                            var SRFForm = '<td><div class=form-group> <input disabled type="text" name="" id="srfFrom" class="srfFrom form-control w-200px"></div></td>'
                        }
                        else {
                            var SRFForm = '<td> <div class=form-group>  <input disabled type="text" name="" value="' + values.SRFForm + '" id="srfFrom" class="srfFrom form-control w-200px"></div></td> ';
                        }
                        if (values.FilledSRFUpload == null) {
                            var FilledSRFUpload = '<td> <div class="form-group"><input disabled type="url" class="filledSRFfile w-200px form-control" id="filledSRFfile" aria-describedby="inputGroupFileAddon01"></div></td>'
                        }
                        else {
                            var FilledSRFUpload = '<td> <a class="alink1" target="_blank" href="' + values.FilledSRFUpload + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.SRFNo == null) {
                            var SRFNo = '<td><div class=form-group><input disabled type="text" name="" id="srfNo" class="srfNo form-control w-200px"></div></td>'
                        }
                        else {
                            var SRFNo = '<td> <div class=form-group><input disabled type="text" name="" id="srfNo" value="' + values.SRFNo + '" class="srfNo form-control w-200px"></div></td> ';
                        }
                        if (datef == null) {
                            var datef = '<td><div class=form-group><input disabled type="date" name="" id="srfReceivedNum" class="srfReceivedNum form-control w-200px"></div></td>'
                        }
                        else {
                            var datef = '<td> <div class=form-group><input disabled type="date" value="' + datef + '" name="" id="srfReceivedNum" class="srfReceivedNum form-control w-200px"></div></td> ';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group><textarea disabled type="text" name="" id="srfRemarks" class="srfRemarks form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td> <div class=form-group><textarea disabled type="text" name="" id="srfRemarks" class="srfRemarks form-control w-200px">' + values.Remarks + '</textarea></div></td> ';
                        }
                        if (CLIENT_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = ' <tr> <td><input disabled class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + SRFDraftFormat + ' ' + SRFForm + ' ' + FilledSRFUpload + ' ' + SRFNo + ' ' + datef + ' ' + Remarks + ' <td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#table-iddoc11 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = ' <tr> <td><input disabled class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + SRFDraftFormat + ' ' + SRFForm + ' ' + FilledSRFUpload + ' ' + SRFNo + ' ' + datef + ' ' + Remarks + ' </tr>';
                            $("#table-iddoc11 tbody").append(getdetails);
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (CLIENT_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td><div class="form-group"> <input disabled type="url" class="srfdraftFormatfile w-200px form-control" id="srfdraftFormatfile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="form-group"> <input disabled type="text" name="" id="srfFrom" class="srfFrom form-control w-200px"> </div></td><td><div class="form-group"> <input disabled type="url" class="filledSRFfile w-200px form-control" id="filledSRFfile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="form-group"> <input disabled type="text" name="" id="srfNo" class="srfNo form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="srfReceivedNum" class="srfReceivedNum form-control w-200px"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="srfRemarks" class="srfRemarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc11 tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td><div class="form-group"> <input disabled type="url" class="srfdraftFormatfile w-200px form-control" id="srfdraftFormatfile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="form-group"> <input disabled type="text" name="" id="srfFrom" class="srfFrom form-control w-200px"> </div></td><td><div class="form-group"> <input disabled type="url" class="filledSRFfile w-200px form-control" id="filledSRFfile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="form-group"> <input disabled type="text" name="" id="srfNo" class="srfNo form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="srfReceivedNum" class="srfReceivedNum form-control w-200px"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="srfRemarks" class="srfRemarks form-control w-200px"></textarea> </div></td></tr>';
                        $("#table-iddoc11 tbody").append(getrowcontent);
                    }


                }
            }

        });
        tableiddoc1();

        $.ajax({
            url: "https://api.pdca.in/ClientProcess/ServicereqformreviewList?ClientID=" + CLIENT_AUTH + "&Service_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false,
            success: function (data) {
                $("#table-iddoc22 tbody").empty();
                if (data.length > 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        var datef = "";
                        if (values.Reviewedon != null) {
                            var completedDate = new Date(parseInt(values.Reviewedon.replace("/Date(", "").replace(")/")));
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
                        if (values.SRFNo == null) {
                            var SRFNo = '<td><div class=form-group><input disabled type="text" name="" id="srfnum" class="srfnum form-control w-200px"></div></td>'
                        }
                        else {
                            var SRFNo = '<td> <div class=form-group><input disabled type="text" name="" id="srfnum" value="' + values.SRFNo + '" class="srfnum form-control w-200px"></div></td> ';
                        }
                        if (values.Reviewedby == null) {
                            var Reviewedby = '<td><div class=form-group><input disabled type="text" name="" id="reviewedBy" class="reviewedBy form-control w-200px"></div></td>'
                        }
                        else {
                            var Reviewedby = '<td> <div class=form-group><input disabled type="text" name="" id="reviewedBy" value="' + values.Reviewedby + '" class="reviewedBy form-control w-200px"></div></td> ';
                        }
                        if (datef == null) {
                            var datef = '<td><div class=form-group><input disabled type="date" name="" id="reviewedOn" class="reviewedOn form-control"></div></td>'
                        }
                        else {
                            var datef = '<td> <div class=form-group><input disabled type="date" name="" id="reviewedOn" value="' + datef + '" class="reviewedOn form-control"></div></td> ';
                        }
                        if (values.Approval == null) {
                            var Approval = '<td><div class=form-group><input disabled type="text" name="" id="approval" class="approval form-control w-200px"></div></td>'
                        }
                        else {
                            var Approval = '<td> <div class=form-group><input disabled type="text" name="" id="approval" value="' + values.Approval + '" class="approval form-control w-200px"></div></td> ';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group><textarea disabled type="text" name="" id="srfRemarks1" class="srfRemarks1 form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td> <div class=form-group><textarea disabled type="text" name="" id="srfRemarks1" class="srfRemarks1 form-control w-200px">' + values.Remarks + '</textarea></div></td> ';
                        }
                        if (CLIENT_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr> <td> <input disabled class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td>' + SRFNo + ' ' + Reviewedby + ' ' + datef + ' ' + Approval + ' ' + Remarks + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#table-iddoc22 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = '<tr> <td> <input disabled class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td>' + SRFNo + ' ' + Reviewedby + ' ' + datef + ' ' + Approval + ' ' + Remarks + '</tr>';
                            $("#table-iddoc22 tbody").append(getdetails);
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (CLIENT_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = '<tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td> <td> <div class="form-group"> <input disabled type="text" name="" id="srfnum" class="srfnum form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="reviewedBy" class="reviewedBy form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="reviewedOn" class="reviewedOn form-control"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="approval" class="approval form-control w-200px"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="srfRemarks1" class="srfRemarks1 form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc22 tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = '<tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <div class="form-group"> <input disabled type="text" name="" id="srfnum" class="srfnum form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="reviewedBy" class="reviewedBy form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="reviewedOn" class="reviewedOn form-control"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="approval" class="approval form-control w-200px"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="srfRemarks1" class="srfRemarks1 form-control w-200px"></textarea> </div></td></tr>';
                        $("#table-iddoc22 tbody").append(getrowcontent);
                    }

                }
            }

        });
        tableiddoc2();

        $.ajax({
            url: "https://api.pdca.in/ClientProcess/RegistrationList?ClientID=" + CLIENT_AUTH + "&Service_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false,
            //data: fileData,
            success: function (data) {
                $("#table-iddoc33 tbody").empty();
                if (data.length > 0) {

                    $.each(data, function (index, values) {
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
                        var dateg = "";
                        if (values.OutsourcedOn != null) {
                            var completedDate = new Date(parseInt(values.OutsourcedOn.replace("/Date(", "").replace(")/")));
                            var ddd = completedDate.getDate();
                            var mmm = completedDate.getMonth() + 1; //January is 0! 
                            var yyyyy = completedDate.getFullYear();
                            if (ddd < 10) { ddd = '0' + ddd }
                            if (mmm < 10) { mmm = '0' + mmm }
                            var dateg = yyyyy + '-' + mmm + '-' + ddd;

                        }
                        else {
                            dateg = "";
                        }
                        if (datef == null) {
                            var datef = '<td><div class=form-group><input disabled type="date" name="" id="regdate" class="regdate form-control"></div></td>'
                        }
                        else {
                            var datef = '<td> <div class=form-group><input disabled type="date" value="' + datef + '" name="" id="regdate" class="regdate form-control"></div></td> ';
                        }
                        if (values.RegistrationNo == null) {
                            var RegistrationNo = '<td><div class=form-group><input disabled type="text" name="" id="regNum" class="regNum form-control w-200px"></div></td>'
                        }
                        else {
                            var RegistrationNo = '<td> <div class=form-group><input disabled type="text" name="" value="' + values.RegistrationNo + '" id="regNum" class="regNum form-control w-200px"></div></td> ';
                        }
                        if (values.SRFNo == null) {
                            var SRFNo = '<td> <div class="form-group"> <input disabled type="text" name="" id="regsrfnum" class="regsrfnum form-control w-200px"> </div></td>'
                        }
                        else {
                            var SRFNo = '<td>  <div class="form-group"> <input disabled type="text" name="" id="regsrfnum"  value="' + values.SRFNo + '" class="regsrfnum form-control w-200px"> </div></td> ';
                        }
                        if (values.TestParametersIn == null) {
                            var TestParametersIn = '<td><div class=form-group><textarea disabled type="text" name="" id="testInhouse" class="testInhouse form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var TestParametersIn = '<td> <div class=form-group><textarea disabled type="text" name="" id="testInhouse" class="testInhouse form-control w-200px">' + values.TestParametersIn + '</textarea></div></td> ';
                        }
                        if (values.TestParametersOut == null) {
                            var TestParametersOut = '<td><div class=form-group> <textarea disabled type="text" name="" id="testOuthouse" class="testOuthouse form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var TestParametersOut = '<td> <div class=form-group> <textarea disabled type="text" name="" id="testOuthouse" class="testOuthouse form-control w-200px">' + values.TestParametersOut + '</textarea></div></td> ';
                        }
                        if (values.Outsourcedreport == null) {
                            var Outsourcedreport = '<td><input disabled type="file" class="Outsourcereport w-150px" id="Outsourcereport" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Outsourcedreport = '<td> <a class="alink" target="_blank" href="' + values.Outsourcedreport + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.OutsourcedTo == null) {
                            var OutsourcedTo = '<td><div class=form-group><input disabled type="text" name="" id="Outsourcedto" class="Outsourcedto form-control w-200px"></div></td>'
                        }
                        else {
                            var OutsourcedTo = '<td> <div class=form-group><input disabled type="text" name="" id="Outsourcedto" value="' + values.OutsourcedTo + '" class="Outsourcedto form-control w-200px"></div></td> ';
                        }
                        if (dateg == null) {
                            var dateg = '<td><div class=form-group><input disabled type="date" name="" id="Outsourcedon" class="Outsourcedon form-control"></div></td>'
                        }
                        else {
                            var dateg = '<td> <div class=form-group><input disabled type="date" name="" id="Outsourcedon" value="' + dateg + '" class="Outsourcedon form-control"></div></td> ';
                        }
                        if (CLIENT_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = ' <tr> <input disabled class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> ' + datef + '' + RegistrationNo + '' + SRFNo + ' ' + TestParametersIn + ' ' + TestParametersOut + ' ' + Outsourcedreport + '' + OutsourcedTo + ' ' + dateg + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#table-iddoc33 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = ' <tr> <input disabled class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> ' + datef + '' + RegistrationNo + '' + SRFNo + ' ' + TestParametersIn + ' ' + TestParametersOut + ' ' + Outsourcedreport + '' + OutsourcedTo + ' ' + dateg + '</tr>';
                            $("#table-iddoc33 tbody").append(getdetails);
                        }

                    });
                }
                else {

                    if (CLIENT_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr> <td> <div class="form-group"> <input disabled type="date" name="" id="regdate" class="regdate form-control"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="regNum" class="regNum form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="regsrfnum" class="regsrfnum form-control w-200px"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="testInhouse" class="testInhouse form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="testOuthouse" class="testOuthouse form-control w-200px"></textarea> </div></td><td> <input disabled type="file" class="Outsourcereport w-150px" id="Outsourcereport" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input disabled type="text" name="" id="Outsourcedto" class="Outsourcedto form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="Outsourcedon" class="Outsourcedon form-control"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc33 tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr><td> <div class="form-group"> <input disabled type="date" name="" id="regdate" class="regdate form-control"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="regNum" class="regNum form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="regsrfnum" class="regsrfnum form-control w-200px"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="testInhouse" class="testInhouse form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="testOuthouse" class="testOuthouse form-control w-200px"></textarea> </div></td><td> <input disabled type="file" class="Outsourcereport w-150px" id="Outsourcereport" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input disabled type="text" name="" id="Outsourcedto" class="Outsourcedto form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="Outsourcedon" class="Outsourcedon form-control"> </div></td></tr>';
                        $("#table-iddoc33 tbody").append(getrowcontent);
                    }


                }
            }

        });


        $.ajax({
            url: "https://api.pdca.in/ClientProcess/RawDataList?ClientID=" + CLIENT_AUTH + "&Service_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false,
            //data: fileData,
            success: function (data) {
                $("#table-iddoc44 tbody").empty();
                if (data.length > 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
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
                        var dateg = "";
                        if (values.Verifiedon != null) {
                            var completedDate = new Date(parseInt(values.Verifiedon.replace("/Date(", "").replace(")/")));
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
                        if (datef == null) {
                            var datef = '<td><div class=form-group><input disabled type="date" name="" id="regdate" class="regdate1 form-control"></div></td>'
                        }
                        else {
                            var datef = '<td> <div class=form-group><input disabled type="date" value="' + datef + '" name="" id="regdate" class="regdate1 form-control"></div></td> ';
                        }
                        if (values.RegistrationNo == null) {
                            var RegistrationNo = '<td><div class=form-group> <input disabled type="text" name="" id="regNum" class="regNum1 form-control w-200px"></div></td>'
                        }
                        else {
                            var RegistrationNo = '<td> <div class=form-group> <input disabled type="text" name="" id="regNum" value="' + values.RegistrationNo + '" class="regNum1 form-control w-200px"></div></td> ';
                        }
                        if (values.RawdataUpload == null) {
                            var RawdataUpload = '<td><div class="form-group"><input disabled type="url" class="rawdatafile w-200px form-control" id="rawdatafile" aria-describedby="inputGroupFileAddon01"></div></td>'
                        }
                        else {
                            var RawdataUpload = '<td> <a class="alink" target="_blank" href="' + values.RawdataUpload + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.Verifiedby == null) {
                            var Verifiedby = '<td><div class=form-group><input disabled type="text" name="" id="verifiedBy" class="verifiedBy form-control w-200px"></div></td>'
                        }
                        else {
                            var Verifiedby = '<td> <div class=form-group><input disabled type="text" name="" id="verifiedBy" value="' + values.Verifiedby + '" class="verifiedBy form-control w-200px"></div></td> ';
                        }
                        if (dateg == null) {
                            var dateg = '<td><div class=form-group><input disabled type="date" name="" id="verifiedOn" class="verifiedOn form-control"></div></td>'
                        }
                        else {
                            var dateg = '<td> <div class=form-group><input disabled type="date" name="" id="verifiedOn" value="' + dateg + '" class="verifiedOn form-control"></div></td> ';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group><textarea disabled type="text" name="" id="regRemarks" class="regRemarks form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td> <div class=form-group><textarea disabled type="text" name="" id="regRemarks" class="regRemarks form-control w-200px">' + values.Remarks + '</textarea></div></td> ';
                        }
                        if (CLIENT_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr> <td><input disabled class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + datef + ' ' + RegistrationNo + ' ' + RawdataUpload + ' ' + Verifiedby + ' ' + dateg + ' ' + Remarks + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#table-iddoc44 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = '<tr> <td><input disabled class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + datef + ' ' + RegistrationNo + ' ' + RawdataUpload + ' ' + Verifiedby + ' ' + dateg + ' ' + Remarks + '</tr>';
                            $("#table-iddoc44 tbody").append(getdetails);
                        }


                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (CLIENT_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = '<tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <div class="form-group"> <input disabled type="date" name="" id="regdate" class="regdate1 form-control"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="regNum" class="regNum1 form-control w-200px"> </div></td><td><div class="form-group"> <input disabled type="url" class="rawdatafile w-200px form-control" id="rawdatafile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="form-group"> <input disabled type="text" name="" id="verifiedBy" class="verifiedBy form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="verifiedOn" class="verifiedOn form-control"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="regRemarks" class="regRemarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc44 tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = '<tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <div class="form-group"> <input disabled type="date" name="" id="regdate" class="regdate1 form-control"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="regNum" class="regNum1 form-control w-200px"> </div></td><td><div class="form-group"> <input disabled type="url" class="rawdatafile w-200px form-control" id="rawdatafile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="form-group"> <input disabled type="text" name="" id="verifiedBy" class="verifiedBy form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="verifiedOn" class="verifiedOn form-control"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="regRemarks" class="regRemarks form-control w-200px"></textarea> </div></td></tr>';
                        $("#table-iddoc44 tbody").append(getrowcontent);
                    }

                }
            }

        });
        tableiddoc3();
    }

    $("#createTemplateSubmit").submit(function () {

        // 🔹 SHOW loader immediately
        $("#spinnerOverlay").css("display", "flex");
        $("body").css("pointer-events", "none");

        setTimeout(function () {

            var checkexisting = $("#ddjobid").val();

            if (checkexisting == "0") {

                var ProductName = $("#service_name").val();
                var clientcompanyname = $("#serviceClientCompName").val();
                var jobNum = $("#Registrationno").val();
                var productcompanyname = $("#serviceCompName").val();
                var jobID = $("#ddjobid").val();
                var AnalysisStartDate = $("#fromDate").val();
                var AnalysisEndDate = $("#toDate").val();
                var AdminID = CLIENT_AUTH;
                var type = false;

                var postdata = {
                    "productname": ProductName,
                    "clientcompany": clientcompanyname,
                    "jobno": jobNum,
                    "employeename": productcompanyname,
                    "Process_JobID": jobID,
                    "AdminID": AdminID,
                    "Type": type,
                    "AnalysisStartDate": AnalysisStartDate,
                    "AnalysisEndDate": AnalysisEndDate
                };

                $.ajax({
                    url: "https://api.pdca.in/ClientProcess/Create_SheetAllocation",
                    type: "POST",
                    data: postdata,
                    dataType: "json",
                    traditional: true,
                    crossDomain: true,

                    success: function (data) {

                        if (data.responsecode == 1) {
                            var Service_ID = data.responseObject;

                            CreateServiceReqForm(Service_ID);
                            CreateServiceReqFormReview(Service_ID);
                            CreateRegistration(Service_ID);
                            CreateRawdata(Service_ID);

                            alert("Service SheetAllocation Created Successfully");
                            window.location = "/process/Createtestreport.html?id=" + Service_ID;
                        }
                        else {
                            alert(data.responsemessage);
                        }
                    },

                    error: function () {
                        alert("Something went wrong");
                    },

                    complete: function () {
                        // 🔹 HIDE loader properly
                        $("#spinnerOverlay").hide();
                        $("body").css("pointer-events", "auto");
                    }
                });

            }
            else {

                // 🔹 (IMPORTANT) loader already shown above, so just process

                var Service_ID = checkexisting;

                CreateServiceReqForm(Service_ID);
                CreateServiceReqFormReview(Service_ID);
                CreateRegistration(Service_ID);
                CreateRawdata(Service_ID);

                alert("Service SheetAllocation Updated Successfully");
                window.location = "/process/Createtestreport.html?id=" + Service_ID;

                // 🔹 HIDE loader for else case
                $("#spinnerOverlay").hide();
                $("body").css("pointer-events", "auto");
            }

        }, 5000);
    });
    function CreateServiceReqForm(Service_ID) {
        var gettablelength = $("#table-iddoc11 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc11 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var file = ""
                var checksrfdraftFormatfile = $("#table-iddoc11 tbody tr").eq(i).find(".alink").attr("href");
                if (checksrfdraftFormatfile) {
                    //do nothing
                }
                else {

                    var checkfiles = $("#table-iddoc11 tbody tr").eq(i).find(".srfdraftFormatfile").val();
                    if (checkfiles) {
                        file = checkfiles;
                    }
                }
                var file1 = ""
                var checkfilledSRFfile = $("#table-iddoc11 tbody tr").eq(i).find(".alink1").attr("href");
                if (checkfilledSRFfile) {
                    //do nothing
                }
                else {

                    var checkfile1 = $("#table-iddoc11 tbody tr").eq(i).find(".filledSRFfile").val();
                    if (checkfile1) {
                        file1 = checkfile1;
                    }
                }
                var srfFrom = $("#table-iddoc11 tbody tr").eq(i).find(".srfFrom").val();
                var srfNo = $("#table-iddoc11 tbody tr").eq(i).find(".srfNo").val();
                var srfReceivedNum = $("#table-iddoc11 tbody tr").eq(i).find(".srfReceivedNum").val();
                var srfRemarks = $("#table-iddoc11 tbody tr").eq(i).find(".srfRemarks").val();

                var Service_ID = Service_ID;


                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', file);
                postdata.append('file1', file1);
                postdata.append('SRFForm', srfFrom);
                postdata.append('SRFNo', srfNo);
                postdata.append('SRFReceivedOn', srfReceivedNum);
                postdata.append('Remarks', srfRemarks);
                postdata.append('Service_ID', Service_ID);
                postdata.append('AdminID', CLIENT_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/ClientProcess/Createservicereqform",
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

                        }
                    }
                });


            };
        }

    }
    function CreateServiceReqFormReview(Service_ID) {
        var gettablelength = $("#table-iddoc22 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc22 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var srfnum = $("#table-iddoc22 tbody tr").eq(i).find(".srfnum").val();
                var reviewedBy = $("#table-iddoc22 tbody tr").eq(i).find(".reviewedBy").val();
                var reviewedOn = $("#table-iddoc22 tbody tr").eq(i).find(".reviewedOn").val();
                var approval = $("#table-iddoc22 tbody tr").eq(i).find(".approval").val();
                var srfRemarks1 = $("#table-iddoc22 tbody tr").eq(i).find(".srfRemarks1").val();
                var Service_ID = Service_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('SRFNo', srfnum);
                postdata.append('Reviewedby', reviewedBy);
                postdata.append('Reviewedon', reviewedOn);
                postdata.append('Approval', approval);
                postdata.append('Remarks', srfRemarks1);
                postdata.append('Service_ID', Service_ID);
                postdata.append('AdminID', CLIENT_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/ClientProcess/CreateServiceReqFormReview",
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

                        }
                    }
                });


            };
        }

    }
    function CreateRegistration(Service_ID) {
        var gettablelength = $("#table-iddoc33 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc33 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var regdate = $("#table-iddoc33 tbody tr").eq(i).find(".regdate").val();
                var regNum = $("#table-iddoc33 tbody tr").eq(i).find(".regNum").val();
                var regsrfnum = $("#table-iddoc33 tbody tr").eq(i).find(".regsrfnum").val();
                var testInhouse = $("#table-iddoc33 tbody tr").eq(i).find(".testInhouse").val();
                var testOuthouse = $("#table-iddoc33 tbody tr").eq(i).find(".testOuthouse").val();
                var file2 = ""
                var checkOutsourcereportfile = $("#table-iddoc33 tbody tr").eq(i).find(".alink").attr("href");
                if (checkOutsourcereportfile) {
                    //do nothing
                }
                else {

                    var checkfile2 = $("#table-iddoc33 tbody tr").eq(i).find(".Outsourcereport").val();
                    if (checkfile2) {
                        file2 = $("#table-iddoc33 tbody tr").eq(i).find(".Outsourcereport")[0].files[0];
                    }
                }
                var Outsourcedto = $("#table-iddoc33 tbody tr").eq(i).find(".Outsourcedto").val();
                var Outsourcedon = $("#table-iddoc33 tbody tr").eq(i).find(".Outsourcedon").val();
                var Service_ID = Service_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('Date', regdate);
                postdata.append('RegistrationNo', regNum);
                postdata.append('SRFNo', regsrfnum);
                postdata.append('TestParametersIn', testInhouse);
                postdata.append('TestParametersOut', testOuthouse);
                postdata.append('file', file2);
                postdata.append('OutsourcedTo', Outsourcedto);
                postdata.append('OutsourcedOn', Outsourcedon);
                postdata.append('Service_ID', Service_ID);
                postdata.append('AdminID', CLIENT_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/ClientProcess/CreateRegistration",
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

                        }
                    }
                });


            };
        }

    }
    function CreateRawdata(Service_ID) {
        var gettablelength = $("#table-iddoc44 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc44 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var file3 = ""
                var checkrawdatafile = $("#table-iddoc44 tbody tr").eq(i).find(".alink").attr("href");
                if (checkrawdatafile) {
                    //do nothing
                }
                else {

                    var checkfile3 = $("#table-iddoc44 tbody tr").eq(i).find(".rawdatafile").val();
                    if (checkfile3) {
                        file3 = checkfile3;
                    }
                }
                var regdate1 = $("#table-iddoc44 tbody tr").eq(i).find(".regdate1").val();
                var regNum1 = $("#table-iddoc44 tbody tr").eq(i).find(".regNum1").val();
                var verifiedBy = $("#table-iddoc44 tbody tr").eq(i).find(".verifiedBy").val();
                var verifiedOn = $("#table-iddoc44 tbody tr").eq(i).find(".verifiedOn").val();
                var regRemarks = $("#table-iddoc44 tbody tr").eq(i).find(".regRemarks").val();

                var Service_ID = Service_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', file3);
                postdata.append('Date', regdate1);
                postdata.append('RegistrationNo', regNum1);
                postdata.append('Verifiedby', verifiedBy);
                postdata.append('Verifiedon', verifiedOn);
                postdata.append('Remarks', regRemarks);
                postdata.append('Service_ID', Service_ID);
                postdata.append('AdminID', CLIENT_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/ClientProcess/CreateRawdata",
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
                            var Service = data.responseObject;
                            localStorage.setItem("serviceid", Service_ID);
                            window.location = "/process/Createtestreport.html";
                        }
                    }
                });


            };
        }
    }
    $("#table-iddoc11").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/ClientProcess/DeleteServicereqform?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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

    $("#table-iddoc22").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/ClientProcess/DeleteServiceReqFormReview?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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

    $("#table-iddoc33").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/ClientProcess/DeleteRegistration?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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

    $("#table-iddoc44").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/ClientProcess/DeleteRawData?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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


    function tableiddoc1() {
        var currentSno1 = parseInt($("#table-iddoc11 .addrow:last").attr("sno")) + 1;

        var currentSnos1 = 2;

        $("#table-iddoc11").on("click", ".addrow", function () {
            if (currentSno1 >= 1) {
                var getvalue = currentSno1++;
            } else {

                var getvalue = currentSnos1++;
            }
            var getrowcontent = ' <tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td><div class="form-group"> <input disabled type="url" class="srfdraftFormatfile w-200px form-control" id="srfdraftFormatfile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="form-group"> <input disabled type="text" name="" id="srfFrom" class="srfFrom form-control w-200px"> </div></td><td> <div class="form-group"><input disabled type="url" class="filledSRFfile w-200px form-control" id="filledSRFfile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="form-group"> <input disabled type="text" name="" id="srfNo" class="srfNo form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="srfReceivedNum" class="srfReceivedNum form-control w-200px"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="srfRemarks" class="srfRemarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-iddoc11 tbody").append(getrowcontent);
        });
        $("#table-iddoc11").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos1 = 2;

    $("#table-iddoc11").on("click", ".addrow1", function () {
        var getvalue = currentSnos1++;

        var getrowcontent = ' <tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td><div class="form-group">  <input disabled type="url" class="srfdraftFormatfile w-200px form-control" id="srfdraftFormatfile" aria-describedby="inputGroupFileAddon01"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="srfFrom" class="srfFrom form-control w-200px"> </div></td><td> <div class="form-group"><input disabled type="url" class="filledSRFfile w-200px form-control" id="filledSRFfile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="form-group"> <input disabled type="text" name="" id="srfNo" class="srfNo form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="srfReceivedNum" class="srfReceivedNum form-control w-200px"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="srfRemarks" class="srfRemarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-iddoc11 tbody").append(getrowcontent);
    });
    $("#table-iddoc11").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });

    function tableiddoc2() {
        var currentSno2 = parseInt($("#table-iddoc22 .addrow:last").attr("sno")) + 1;

        var currentSnos2 = 2;

        $("#table-iddoc22").on("click", ".addrow", function () {
            if (currentSno2 >= 1) {
                var getvalue = currentSno2++;
            } else {

                var getvalue = currentSnos2++;
            }
            var getrowcontent = '<tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input disabled type="text" name="" id="srfnum" class="srfnum form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="reviewedBy" class="reviewedBy form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="reviewedOn" class="reviewedOn form-control"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="approval" class="approval form-control w-200px"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="srfRemarks1" class="srfRemarks1 form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-iddoc22 tbody").append(getrowcontent);
        });
        $("#table-iddoc22").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos1 = 2;

    $("#table-iddoc22").on("click", ".addrow1", function () {
        var getvalue = currentSnos1++;

        var getrowcontent = '<tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input disabled type="text" name="" id="srfnum" class="srfnum form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="reviewedBy" class="reviewedBy form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="reviewedOn" class="reviewedOn form-control"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="approval" class="approval form-control w-200px"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="srfRemarks1" class="srfRemarks1 form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-iddoc22 tbody").append(getrowcontent);
    });
    $("#table-iddoc22").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    //$("#table-iddoc33").on("click", ".addrow", function () {

    //    var getrowcontent = ' <tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input disabled type="date" name="" id="regdate" class="regdate form-control"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="regNum" class="regNum form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="regsrfnum" class="regsrfnum form-control w-200px"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="testInhouse" class="testInhouse form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="testOuthouse" class="testOuthouse form-control w-200px"></textarea> </div></td><td> <input disabled type="file" class="Outsourcereport w-150px" id="Outsourcereport" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input disabled type="text" name="" id="Outsourcedto" class="Outsourcedto form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="Outsourcedon" class="Outsourcedon form-control"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //    $("#table-iddoc33 tbody").append(getrowcontent);
    //});
    //$("#table-iddoc33").on("click", ".deleterow", function () {
    //    $(this).closest("tr").remove();
    //});

    function tableiddoc3() {
        var currentSno3 = parseInt($("#table-iddoc22 .addrow:last").attr("sno")) + 1;

        var currentSnos3 = 2;

        $("#table-iddoc44").on("click", ".addrow", function () {
            if (currentSno3 >= 1) {
                var getvalue = currentSno3++;
            } else {

                var getvalue = currentSnos3++;
            }
            var getrowcontent = '<tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input disabled type="date" name="" id="regdate" class="regdate1 form-control"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="regNum" class="regNum1 form-control w-200px"> </div></td><td><div class="form-group"> <input disabled type="url" class="rawdatafile w-200px form-control" id="rawdatafile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="form-group"> <input disabled type="text" name="" id="verifiedBy" class="verifiedBy form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="verifiedOn" class="verifiedOn form-control"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="regRemarks" class="regRemarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-iddoc44 tbody").append(getrowcontent);
        })
        $("#table-iddoc44").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos3 = 2;

    $("#table-iddoc44").on("click", ".addrow1", function () {
        var getvalue = currentSnos3++;

        var getrowcontent = '<tr> <td> <input disabled type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input disabled type="date" name="" id="regdate" class="regdate1 form-control"> </div></td><td> <div class="form-group"> <input disabled type="text" name="" id="regNum" class="regNum1 form-control w-200px"> </div></td><td> <div class="form-group"><input disabled type="url" class="rawdatafile w-200px form-control" id="rawdatafile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="form-group"> <input disabled type="text" name="" id="verifiedBy" class="verifiedBy form-control w-200px"> </div></td><td> <div class="form-group"> <input disabled type="date" name="" id="verifiedOn" class="verifiedOn form-control"> </div></td><td> <div class="form-group"> <textarea disabled type="text" name="" id="regRemarks" class="regRemarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-iddoc44 tbody").append(getrowcontent);
    })
    $("#table-iddoc44").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
})