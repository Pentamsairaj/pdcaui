$(document).ready(function () {
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");


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
    getclients();
    getEmployees();


    function getclients() {
        $.ajax({
            url: "https://api.pdca.in/Client/GetList?AdminId=" + ADMIN_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#ddclient").empty();
                var defaultoption = '<option value="" >Select Client</option>'; // Add the "required" attribute to the default option
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
            url: "https://api.pdca.in/Admin/EmployeeList?id=" + ADMIN_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#ddlEmployee").empty();
                var defaultoption = '<option value="" >Select Employee</option>';
                $("#ddlEmployee").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.id + '">' + val.Name + '</option>'
                    $("#ddlEmployee").append(getdetails);
                });
            }
        });
    }
    function getJObID() {

        $.ajax({
            url: "https://api.pdca.in/Quality_Template/ListforJobID?AdminID=" + ADMIN_AUTH,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            //beforeSend: function () {
            //    $('#spinner').show();
            //},
            success: function (data) {

                $("#ddjobid").empty();
                var defaultoption = '<option value="0">Select Job ID</option>';
                $("#ddjobid").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.ID + '">' + val.JOBID + '</option>'
                    $("#ddjobid").append(getdetails);
                });
            },
            //complete: function () {
            //    $('#spinner').hide();
            //}
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

    /*-----------------------------Featch Data in Tables start----------------------------------------------*/

    $("#ddjobid").change(function () {
        var gettemplateid = $(this).val();
        Getlistofalltables(gettemplateid);
    });


    function Getlistofalltables(gettemplateid) {

        $.ajax({
            url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            success: function (data) {
                $.each(data, function (index, values) {

                    $("#qulty_tem_name").val(values.TemplateName).prop('readonly', true);


                    $("#table-iddoc tbody").empty();
                    if (values.standard_list && values.standard_list.length > 0) {
                        var sno = 1;
                        var snos = 1;
                        $.each(values.standard_list, function (index, values) {
                            if (values.Standard != null) {
                                var STANDARD = '<td style="width:37%"><div class=form-group><textarea class="form-control standard"id=standard name="" value="">' + values.Standard + '</textarea></div></td>'

                            }
                            else {
                                var STANDARD = '<td style="width:37%"> <div class=form-group>  <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td> ';

                            }
                            if (values.Document != null) {
                                var Document = '<td> <div class=form-group><a class="alink" target="_blank" href="' + values.Document + '"><button class="btn btn-primary" type="button">View</button></a></div></td>'

                            }
                            else {
                                var Document = '<td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file style="width:100%"></td> ';

                            }
                            if (values.Link != null) {
                                var link = '<td style="width:30%"><div class=form-group><input type="url" name="" id="standardlink" class="standardlink form-control"  value="' + values.Link + '"></div></td>'

                            }
                            else {
                                var link = '<td style="width:30%"><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></td>';

                            }

                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td>' + STANDARD + '' + link + '' + Document + '</td> <td><div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                                $("#table-iddoc tbody").append(getdetails);
                            }
                            else {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td>' + STANDARD + '' + link + '' + Document + '</tr>';
                                $("#table-iddoc tbody").append(getdetails);
                            }
                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td style="width:37%"> <div class=form-group>  <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td><td style="width:30%"><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></div> </td><td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file style="width:100%"></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#table-iddoc tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td style="width:37%"> <div class=form-group>  <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td><td style="width:30%"><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></div> </td><td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file style="width:100%"></td></tr>';
                            $("#table-iddoc tbody").append(getrowcontent);
                        }
                    }
                });
            }

        });
        tableiddoc();


        $.ajax({
            url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $.each(data, function (index, values) {
                    $("#table-quality tbody").empty();
                    if (values.document_list && values.document_list.length > 0) {

                        var sno = 1;
                        var snos = 1;
                        $.each(values.document_list, function (index, values) {
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
                                var NameoftheDoc = '<td> <textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control" style="width:630px"> </textarea> </div></td>'
                            }
                            else {
                                var NameoftheDoc = '<td><div class="form-group">  <textarea type="text" name="" id="NameoftheDoc" value="" class="NameoftheDoc form-control " style="width:630px">' + values.NameoftheDoc + ' </textarea></div></td>';
                            }
                            if (values.Type == null) {
                                var Type = '<td><div class="form-group"> <select name="" id="typepfDocument" class="typepfDocument form-control w-95px"> <option value="level1">Level 1</option> <option value="level2">Level 2</option> <option value="level3">Level 3</option> <option value="level4">Level 4</option> </select> </div></td>'
                            }
                            else {
                                var Type = '<td><div class="form-group"> <select name="" id="typepfDocument' + values.ID + '" class="typepfDocument form-control w-95px"><option value="level1">Level1</option> <option value="level2">Level 2</option> <option value="level3">Level 3</option> <option value="level4">Level 4</option> </select> </div></td>';
                            }
                            if (values.clause == null) {
                                var clause = '<td> <div class="form-group"><input type="text" name="" id="ClauseNo" class="ClauseNo form-control" style="width:110px"></div></td>'
                            }
                            else {
                                var clause = '<td><div class=form-group><input class="form-control ClauseNo" name="" value="' + values.clause + '" id=ClauseNo style="width:110px"></div></td>';
                            }
                            //if (values.ClientApproval == null) {
                            //    var ClientApproval = '<td><div class=form-group><input type="text" name="" id="clientApproval" class="clientApproval form-control w-200px"></div></td>'
                            //}
                            //else {
                            //    var ClientApproval = '<td><div class=form-group><input class="form-control clientApproval w-200px" name="" value="' + values.ClientApproval + '" id=clientApproval></div></td>';
                            //}
                            if (values.ClientRemarks == null) {
                                var ClientRemarks = '<td><div class=form-group><textarea type="text" name="" id="clientRemarks" class="clientRemarks form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var ClientRemarks = '<td><div class=form-group><textarea type="text" name="" id="clientRemarks" class="clientRemarks form-control w-200px">' + values.ClientRemarks + '</textarea></div></td>';
                            }
                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                var getdetails = ' <tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm" name=&plus sno1=' + snos++ + ' value=+ type=button></td><td>' + sno++ + '</td>' + NameoftheDoc + '' + Type.trim() + '' + clause + '' + ClientRemarks + '' + Approveddocupload + '' + Draftformat + '</td><td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>'
                                $("#table-quality tbody").append(getdetails);
                                $("#typepfDocument" + values.ID).val(values.Type.trim());
                            }
                            else {
                                var getdetails = ' <tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm" name=&plus sno1=' + snos++ + ' value=+ type=button></td><td>' + sno++ + '</td>' + NameoftheDoc + '' + Type.trim() + '' + clause + '' + ClientRemarks + '' + Approveddocupload + '' + Draftformat + '</tr>'
                                $("#table-quality tbody").append(getdetails);
                                $("#typepfDocument" + values.ID).val(values.Type.trim());
                            }
                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" sno1=' + snos++ + ' class="addrow border-0 add btn btn-icon btn-light btn-sm"/></td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control" style="width:630px"> </textarea> </div></td><td> <div class="form-group"> <select name="" id="typepfDocument" class="typepfDocument form-control w-95px"> <option value="level1">Level 1</option> <option value="level2">Level 2</option> <option value="level3">Level 3</option> <option value="level4">Level 4</option> </select> </div></td><td> <div class="form-group"> <input type="text" name="" id="ClauseNo" class="ClauseNo form-control" style="width:110px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="clientRemarks" class="clientRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="Apporveddocuploadfile w-200px" id="Apporveddocuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="Draftformatfile w-200px" id="Draftformatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>'
                            $("#table-quality tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" sno1=' + snos++ + ' class="addrow border-0 add btn btn-icon btn-light btn-sm"/></td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control" style="width:630px"> </textarea> </div></td><td> <div class="form-group"> <select name="" id="typepfDocument" class="typepfDocument form-control w-95px"> <option value="level1">Level 1</option> <option value="level2">Level 2</option> <option value="level3">Level 3</option> <option value="level4">Level 4</option> </select> </div></td><td> <div class="form-group"> <input type="text" name="" id="ClauseNo" class="ClauseNo form-control" style="width:110px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="clientRemarks" class="clientRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="Apporveddocuploadfile w-200px" id="Apporveddocuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="Draftformatfile w-200px" id="Draftformatfile" aria-describedby="inputGroupFileAddon01"> </td></tr>'
                            $("#table-quality tbody").append(getrowcontent);
                        }
                    }
                });
            }
        });
        tablequality();


        //$.ajax({
        //    url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
        //    type: "GET",
        //    async: false,
        //    contentType: false, // Not to set any content header
        //    processData: false, // Not to process data
        //    success: function (data) {
        //        $.each(data, function (index, values) {
        //            $("#table-AunalTraining tbody").empty();
        //            if (data != 0) {
        //                var sno = 1;
        //                var snos = 1;
        //                $.each(data, function (index, values) {
        //                    if (values.Year == null) {
        //                        var Year = '<td><div class=form-group><input class="form-control year"id=year name=""></div></td>'
        //                    }
        //                    else {
        //                        var Year = '<td><div class=form-group><input class="form-control year"id=year value="' + values.Year + '" name=""></div></td>';
        //                    }
        //                    if (values.AnnualTrainingpalnner == null) {
        //                        var AnnualTrainingpalnner = '<td><input type="file" class="DraftTrainingplannerfile w-200px" id="DraftTrainingplannerfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                    }
        //                    else {
        //                        var AnnualTrainingpalnner = '<td><a class="alink" target="_blank"  href="' + values.AnnualTrainingpalnner + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                    }
        //                    if (values.ApprovedAnnualTraining == null) {
        //                        var ApprovedAnnualTraining = '<td><input type="file" class="ApprovedAnnualTrainingfile w-200px" id="ApprovedAnnualTrainingfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                    }
        //                    else {
        //                        var ApprovedAnnualTraining = '<td><a class="alink1" target="_blank"  href="' + values.ApprovedAnnualTraining + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                    }
        //                    if (values.Remarks == null) {
        //                        var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control"></textarea></div></td>'
        //                    }
        //                    else {
        //                        var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control">' + values.Remarks + '</textarea></div></td>';
        //                    }
        //                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                        var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno2=' + snos++ + ' value=+></td><td>' + sno++ + '</td> ' + Year + ' ' + AnnualTrainingpalnner + '' + ApprovedAnnualTraining + ' ' + Remarks + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>'
        //                        $("#table-AunalTraining tbody").append(getdetails);
        //                    }
        //                    else {
        //                        var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno2=' + snos++ + ' value=+></td><td>' + sno++ + '</td> ' + Year + ' ' + AnnualTrainingpalnner + '' + ApprovedAnnualTraining + ' ' + Remarks + '</tr>'
        //                        $("#table-AunalTraining tbody").append(getdetails);
        //                    }
        //                });
        //            }
        //            else {
        //                var sno = 1;
        //                var snos = 1;
        //                if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                    var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno2=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control year"id=year name=""></div></td><input class="w-200px DraftTrainingplannerfile"id=DraftTrainingplannerfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-200px ApprovedAnnualTrainingfile"id=ApprovedAnnualTrainingfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group><textarea class="form-control annualRemarks"id=annualRemarks name=""type=text></textarea></div></td> <td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //                    $("#table-AunalTraining tbody").append(getrowcontent);
        //                }
        //                else {
        //                    var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno2=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control year"id=year name=""></div></td><input class="w-200px DraftTrainingplannerfile"id=DraftTrainingplannerfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-200px ApprovedAnnualTrainingfile"id=ApprovedAnnualTrainingfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group><textarea class="form-control annualRemarks"id=annualRemarks name=""type=text></textarea></div></td></tr>';
        //                    $("#table-AunalTraining tbody").append(getrowcontent);
        //                }
        //            }
        //        });
        //    }

        //});
        //tableAunalTraining()

        //$.ajax({
        //    url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
        //    type: "GET",
        //    async: false,
        //    contentType: false, // Not to set any content header
        //    processData: false, // Not to process data
        //    //data: fileData,
        //    success: function (data) {
        //        $.each(data, function (index, values) {
        //            $("#table-Training tbody").empty();
        //            if (data != 0) {
        //                var sno = 1;
        //                var snos = 1;
        //                $.each(data, function (index, values) {

        //                    if (values.Dateoftrainingconducted != null) {
        //                        var completedDate = new Date(parseInt(values.Dateoftrainingconducted.replace("/Date(", "").replace(")/")));
        //                        var dd = completedDate.getDate();
        //                        var mm = completedDate.getMonth() + 1; //January is 0! 
        //                        var yyyy = completedDate.getFullYear();
        //                        if (dd < 10) { dd = '0' + dd }
        //                        if (mm < 10) { mm = '0' + mm }
        //                        var datef = yyyy + '-' + mm + '-' + dd;
        //                    }
        //                    else {
        //                        datef = "";
        //                    }
        //                    if (datef == null) {
        //                        var datef = '<td><div class=form-group><input type="date" name="" id="dateOfTraining" class="dateOfTraining form-control w-200px"></div></td>'
        //                    }
        //                    else {
        //                        var datef = '<td><div class=form-group><input type="date" name="" id="dateOfTraining" value="' + datef + '" class="dateOfTraining form-control w-200px"></div></td>';
        //                    }
        //                    if (values.topicoftraining == null) {
        //                        var topicoftraining = '<td><div class=form-group><input type="text" name="" id="topicName" class="topicName form-control w-200px"></div></td>'
        //                    }
        //                    else {
        //                        var topicoftraining = '<td> <div class=form-group><input type="text" name="" id="topicName" class="topicName form-control w-200px" value="' + values.topicoftraining + '" ></div></td>';
        //                    }
        //                    if (values.Attendenceformat == null) {
        //                        var Attendenceformat = '<td> <input type="file" class="Attendenceformatfile w-150px" id="Attendenceformatfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                    }
        //                    else {
        //                        var Attendenceformat = '<td><a class="alink" target="_blank" href="' + values.Attendenceformat + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                    }
        //                    if (values.Evaluationdoc == null) {
        //                        var Evaluationdoc = '<td>  <input type="file" class="Evaluationpaperdownloadfile w-150px" id="Evaluationpaperdownloadfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                    }
        //                    else {
        //                        var Evaluationdoc = '<td><a class="alink1" target="_blank"  href="' + values.Evaluationdoc + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                    }
        //                    if (values.Uploadfilledtrainingdocs == null) {
        //                        var Uploadfilledtrainingdocs = '<td>  <input type="file" class="UploadfilledTrainingDocsfile w-150px" id="UploadfilledTrainingDocsfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                    }
        //                    else {
        //                        var Uploadfilledtrainingdocs = '<td><a class="alink2" target="_blank"  href="' + values.Uploadfilledtrainingdocs + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                    }
        //                    if (values.Remarks == null) {
        //                        var Remarks = '<td><div class="form-group"><textarea type="text" name="" id="monthlyRemarks" class="monthlyRemarks form-control w-200px"></textarea></div></td>'
        //                    }
        //                    else {
        //                        var Remarks = '<td><div class="form-group"><textarea type="text" name="" id="monthlyRemarks" class="monthlyRemarks form-control w-200px">' + values.Remarks + '</textarea></div></td>';
        //                    }
        //                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                        var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno3=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + datef + ' ' + topicoftraining + ' ' + Attendenceformat + ' ' + Evaluationdoc + ' ' + Uploadfilledtrainingdocs + '  ' + Remarks + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>'
        //                        $("#table-Training tbody").append(getdetails);
        //                    }
        //                    else {
        //                        var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno3=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + datef + ' ' + topicoftraining + ' ' + Attendenceformat + ' ' + Evaluationdoc + ' ' + Uploadfilledtrainingdocs + '  ' + Remarks + '</tr>'
        //                        $("#table-Training tbody").append(getdetails);
        //                    }


        //                });
        //            }
        //            else {
        //                var sno = 1;
        //                var snos = 1;
        //                if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                    var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno3=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control dateOfTraining w-200px"id=dateOfTraining type="date" name=""></div><td><div class=form-group><input class="form-control topicName w-200px"id=topicName name=""></div><td><input class="w-150px Attendenceformatfile"id=Attendenceformatfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px Evaluationpaperdownloadfile"id=Evaluationpaperdownloadfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px UploadfilledTrainingDocsfile"id=UploadfilledTrainingDocsfile type=file aria-describedby=inputGroupFileAddon01><td><div class=form-group><textarea class="form-control monthlyRemarks w-200px"id=monthlyRemarks name=""type=text></textarea></div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //                    $("#table-Training tbody").append(getrowcontent);
        //                }
        //                else {
        //                    var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno3=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control dateOfTraining w-200px"id=dateOfTraining type="date" name=""></div><td><div class=form-group><input class="form-control topicName w-200px"id=topicName name=""></div><td><input class="w-150px Attendenceformatfile"id=Attendenceformatfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px Evaluationpaperdownloadfile"id=Evaluationpaperdownloadfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px UploadfilledTrainingDocsfile"id=UploadfilledTrainingDocsfile type=file aria-describedby=inputGroupFileAddon01><td><div class=form-group><textarea class="form-control monthlyRemarks w-200px"id=monthlyRemarks name=""type=text></textarea></div></td></tr>';
        //                    $("#table-Training tbody").append(getrowcontent);
        //                }


        //            }
        //        });
        //    }

        //});
        //tableTraining()

        //$.ajax({
        //    url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
        //    type: "GET",
        //    async: false,
        //    contentType: false, // Not to set any content header
        //    processData: false, // Not to process data
        //    success: function (data) {
        //        $.each(data, function (index, values) {
        //            $("#table-skill tbody").empty();
        //            if (data != 0) {
        //                var sno = 1;
        //                var snos = 1;
        //                $.each(data, function (index, values) {
        //                    if (values.EmpName == null) {
        //                        var EmpName = '<td><div class=form-group> <input type="text" name="" id="employeeName" class="employeeName form-control w-200px"></div></td>'
        //                    }
        //                    else {
        //                        var EmpName = '<td><div class=form-group> <input type="text" name="" id="employeeName" value = "' + values.EmpName + '" class="employeeName form-control w-200px"></div></td>';
        //                    }
        //                    if (values.EmpID == null) {
        //                        var EmpID = '<td><div class=form-group> <input type="text" name="" id="employeeId" class="employeeId form-control w-200px"></div></td>'
        //                    }
        //                    else {
        //                        var EmpID = '<td><div class=form-group><input type="text" name="" id="employeeId"  value = "' + values.EmpID + '" class="employeeId form-control w-200px"></div></td>';
        //                    }
        //                    if (values.JobRole == null) {
        //                        var JobRole = '<td> <div class=form-group><input type="text" name="" id="jobRole" class="jobRole form-control w-200px"></div></td>'
        //                    }
        //                    else {
        //                        var JobRole = '<td><div class=form-group><input type="text" name="" id="jobRole" value = "' + values.JobRole + '" class="jobRole form-control w-200px"></div></td>';
        //                    }
        //                    if (values.Evidencesupload == null) {
        //                        var Evidencesupload = '<td> <input type="file" class="Evidencesuploadfile w-150px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"></td>'
        //                    }
        //                    else {
        //                        var Evidencesupload = '<td><a class="alink" target="_blank"  href="' + values.Evidencesupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                    }
        //                    if (values.JDupload == null) {
        //                        var JDupload = '<td><input type="file" class="JDUploadFile w-150px" id="JDUploadFile" aria-describedby="inputGroupFileAddon01"></td>'
        //                    }
        //                    else {
        //                        var JDupload = '<td><a class="alink" target="_blank"  href="' + values.JDupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                    }
        //                    if (values.Authupload == null) {
        //                        var Authupload = '<td><input type="file" class="AuthUploadFile w-150px" id="AuthUploadFile" aria-describedby="inputGroupFileAddon01"></td>'
        //                    }
        //                    else {
        //                        var Authupload = '<td><a class="alink" target="_blank"  href="' + values.Authupload + '"><button class="btn btn-primary" type="button">View</button></a></td>';
        //                    }
        //                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                        var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno4=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + EmpName + ' ' + EmpID + ' ' + JobRole + ' ' + Evidencesupload + ' ' + JDupload + ' ' + Authupload + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>'
        //                        $("#table-skill tbody").append(getdetails);
        //                    }
        //                    else {
        //                        var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno4=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + EmpName + ' ' + EmpID + ' ' + JobRole + ' ' + Evidencesupload + ' ' + JDupload + ' ' + Authupload + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>'
        //                        $("#table-skill tbody").append(getdetails);
        //                    }

        //                });
        //            }
        //            else {
        //                var sno = 1;
        //                var snos = 1;
        //                if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                    var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno4=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control employeeName w-200px"id=employeeName name=""></div><td><div class=form-group><input class="form-control employeeId w-200px"id=employeeId name=""></div><td><div class=form-group><input class="form-control jobRole w-200px"id=jobRole name=""></div><td><input class="w-150px Evidencesuploadfile"id=Evidencesuploadfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px JDUploadFile"id=JDUploadFile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px AuthUploadFile"id=AuthUploadFile aria-describedby=inputGroupFileAddon01 type=file></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //                    $("#table-skill tbody").append(getrowcontent);
        //                }
        //                else {
        //                    var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno4=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control employeeName w-200px"id=employeeName name=""></div><td><div class=form-group><input class="form-control employeeId w-200px"id=employeeId name=""></div><td><div class=form-group><input class="form-control jobRole w-200px"id=jobRole name=""></div><td><input class="w-150px Evidencesuploadfile"id=Evidencesuploadfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px JDUploadFile"id=JDUploadFile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px AuthUploadFile"id=AuthUploadFile aria-describedby=inputGroupFileAddon01 type=file></td></tr>';
        //                    $("#table-skill tbody").append(getrowcontent);
        //                }
        //            }
        //        });
        //    }

        //});
        //tableskill()

        $.ajax({
            url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            success: function (data) {
                $.each(data, function (index, values) {
                    $("#execution tbody").empty();
                    var sno = 1;
                    var snos = 1;
                    if (values.execution_list && values.execution_list.length > 0) {
                        debugger;

                        $.each(values.execution_list, function (index, values) {
                            if (values.Nameofthedoc == null) {
                                var nameofthedoc = '<td><div class=form-group>  <textarea type="text" name="" id="eName" class="eName form-control" style="width:527px"></textarea></div></td>'
                            }
                            else {
                                var nameofthedoc = '<td><div class=form-group><textarea type="text" name="" id="eName" value="" class="eName form-control" style="width:527px">' + values.Nameofthedoc + '</textarea></div></td>';
                            }
                            if (values.level4pdf == null) {
                                var level4pdf = '<td><input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var level4pdf = '<td><a class="alink" target="_blank"  href="' + values.level4pdf + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.clause == null) {
                                var clause = '<td><div class=form-group><input type="text" name="" id="clause" class="clause form-control" style="width:110px"></div></td>'
                            }
                            else {
                                var clause = '<td><div class=form-group><input type="text" name="" id="clause" value="' + values.clause + '" class="clause form-control" style="width:110px"></div></td>';
                            }
                            if (values.taskfrequency == null) {
                                var taskfrequency = '<td><div class=form-group><select name="" id="taskFreq" class="taskFreq form-control" style="width:120px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select></div></td>'
                            }
                            else {
                                var taskfrequency = '<td><div class=form-group><select name="" id="taskFreq' + values.ID + '" class="taskFreq  form-control" style="width:120px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select></div></td>';
                            }
                            if (values.uploadpdf == null) {
                                var uploadpdf = '<td> <input type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"></td>'
                            }
                            else {
                                var uploadpdf = '<td><a class="alink1" target="_blank"  href="' + values.uploadpdf + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                            }
                            if (values.Remarks == null) {
                                var Remarks = '<td><div class=form-group><textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea></div></td>'
                            }
                            else {
                                var Remarks = '<td><div class=form-group><textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px">' + values.Remarks + '</textarea></div></td>';
                            }
                            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td>' + nameofthedoc + '  ' + clause + ' ' + taskfrequency + '  ' + Remarks + '' + level4pdf + '' + uploadpdf + ' </td><td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                                $("#execution tbody").append(getdetails);
                                $("#taskFreq" + values.ID).val(values.taskfrequency);
                            }
                            else {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td>' + nameofthedoc + '  ' + clause + ' ' + taskfrequency + ' ' + Remarks + '' + level4pdf + ' ' + uploadpdf + '</tr>';
                                $("#execution tbody").append(getdetails);
                                $("#taskFreq" + values.ID).val(values.taskfrequency);
                            }

                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = '<tr> <td> <input sno=' + snos++ + ' type="button" name="&plus" value="+"  class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="text" name="" id="eName" class="eName form-control" style="width:527px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="clause" class="clause form-control" style="width:110px"> </div></td><td> <div class="form-group"> <select name="" id="taskFreq" class="taskFreq form-control" style="width:120px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select> </div></td><td> <div class="form-group"> <textarea  type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input   type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#execution tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = '<tr> <td> <input sno=' + snos++ + ' type="button" name="&plus" value="+"  class="addrow border-0 add btn btn-icon btn-light btn-sm" /> </td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="text" name="" id="eName" class="eName form-control" style="width:527px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="clause" class="clause form-control" style="width:110px"> </div></td><td> <div class="form-group"> <select name="" id="taskFreq" class="taskFreq form-control" style="width:120px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select> </div></td><td> <div class="form-group"> <textarea  type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input   type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"></div> </td></tr>';
                            $("#execution tbody").append(getrowcontent);
                        }
                    }
                });
            }

        });
        tableexecution();



        $.ajax({
            url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
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
                                var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td> ' + datef + ' ' + TypeofAudit + ' ' + Remarks + ' ' + AuditScheduleFormat + ' ' + ApprovedAuditSchedule + '</tr>';
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
            url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
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
            url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
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
            url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
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
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group">  <textarea type="text" name="" id="standardClause" class="standardClause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="Auditor_decision" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea> </div></td><td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                            $("#standardTemplate tbody").append(getrowcontent);
                        }

                    }
                });
            }

        });
        tablestandardTemplate();

        $.ajax({
            url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
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
                                var AuditType = '<td><div class="form-group"> <textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td>'
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
                                var NCclosedby = '<td><div class=form-group>  <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea></div></td>'
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
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + AuditType + '' + datef + ' ' + NCnumber + ' ' + NCRootcause + ' ' + CAProposed + ' ' + CA_ApprovedbyAuditor + ' ' + NCclosedby + ' ' + dateg + ' ' + Evidencesupload + '</tr>';
                                $("#nc-caDetails tbody").append(getdetails);
                            }

                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = '<tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td><div class="form-group"><textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-100px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea> </div></td><td> <div class="form-group">  <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#nc-caDetails tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = '<tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td><div class="form-group"><textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-100px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea> </div></td><td> <div class="form-group">  <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                            $("#nc-caDetails tbody").append(getrowcontent);
                        }
                    }
                });
            }

        });
        tablecaDetails();

        $.ajax({
            url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
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
            url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
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
                                var Auditorname = '<td><div class=form-group>  <textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea></div></td>'
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
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" sno=' + snos++ + ' class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea> </div></td><td> <div class="form-group">  <textarea type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></textarea></div></td><td> <div class="form-group"> <textarea type="text" name="" id="comments" class="comments form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
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
            url: "https://api.pdca.in/Quality_Template/Get_Template_Data?AdminId=" + ADMIN_AUTH + "&TemplateID=" + gettemplateid,
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
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="validity" class="validity form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="status" class="status form-control w-150px"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select> </div></td><td> <div class="form-group"> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea> </div></td><td> <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#qualityStatus tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" sno=' + snos++ + ' value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="validity" class="validity form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="status" class="status form-control w-150px"> <option value="">Select Status </option><option value="red">Red</option> <option value="green">Green</option> </select> </div></td><td> <div class="form-group"> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea> </div></td><td> <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                            $("#qualityStatus tbody").append(getrowcontent);
                        }

                    }
                });
            }

        });
        tableStatus()


    }

    /*-----------------------------Featch Data in Tables Ends----------------------------------------------*/

    /*-----------------------------Create Tables start----------------------------------------------*/



    $("#createTemplateSubmit").submit(function () {
        $("#spinner").show();

        setTimeout(
            function () {
                var checkexisting = ID;
                if (checkexisting) {
                    var template_ID = checkexisting;


                    // Your code for updating the job (without AJAX)
                    // ...

                    standardajax(template_ID);
                    qualitydocs(template_ID);
                    //CreateAnnualtraining(template_ID);
                    //CreateMonthlytraining(template_ID);
                    //localStorage.setItem("JobID", template_ID);
                    //CreateSkillMatrix(template_ID);
                    execution(template_ID);


                    Createauditschedule(template_ID);
                    CreateAuditordetails(template_ID);
                    CreateAuditorMeetingdetails(template_ID);
                    CreateAuditChecklist(template_ID);
                    CreateNCandCAtable(template_ID);
                    CreateReviewMeeting(template_ID);
                    CreateAuditorRecommendation(template_ID);
                    CreateQualityStatus(template_ID);
                    // After the update logic is complete, hide the spinner

                    alert("Quality Template Updated Successfully");
                    window.location = "/qualityCompliance/Qualitytem_list.html";


                }
                else {

                    var qulty_tem_name = $("#qulty_tem_name").val();
                    var AdminID = ADMIN_AUTH;

                    var postdata = {

                        "TemplateName": qulty_tem_name,
                        "authorid": AdminID
                    }

                    $.ajax({
                        url: "https://api.pdca.in/Quality_Template/Create_QualityTemplate",
                        type: "POST",
                        data: postdata,
                        dataType: "json",
                        traditional: true,
                        crossDomain: true,
                        //beforeSend: function () {
                        //    // Show the spinner before the AJAX call starts
                        //    $("#spinner").show();
                        //},
                        //complete: function () {
                        //    // Hide the spinner after the AJAX call completes (regardless of success or failure)
                        //    $("#spinner").hide();
                        //},
                        success: function (data) {
                            if (data.responsecode == 0) {
                                var template_ID = data.responseObject;
                                standardajax(template_ID);
                                qualitydocs(template_ID);
                                //CreateAnnualtraining(template_ID);
                                //CreateMonthlytraining(template_ID);
                                //localStorage.setItem("JobID", template_ID)
                                //CreateSkillMatrix(template_ID);
                                execution(template_ID);

                                Createauditschedule(template_ID);
                                CreateAuditordetails(template_ID);
                                CreateAuditorMeetingdetails(template_ID);
                                CreateAuditChecklist(template_ID);
                                CreateNCandCAtable(template_ID);
                                CreateReviewMeeting(template_ID);
                                CreateAuditorRecommendation(template_ID);
                                CreateQualityStatus(template_ID);
                                alert("Quality Template Created Successfully");
                                window.location = "/qualityCompliance/Qualitytem_list.html";
                            }
                            else {
                                alert(data.responsemessage);
                            }
                        }
                    });

                }
            }, 5000);


        /* $("#spinner").hide();*/
    });


    function standardajax(template_ID) {
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
                var TemplateID = template_ID;
                var AdminID = ADMIN_AUTH;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', files);
                postdata.append('Standard', STANDARD);
                postdata.append('TemplateID', TemplateID);
                postdata.append('authorid', AdminID);
                postdata.append('link', standardlink);


                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Create_QualityStandard",
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
                            var TemplateID = data.responseObject;
                        }

                    }
                });
            };
        }
    };
    function qualitydocs(template_ID) {

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
                var TemplateID = template_ID;

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
                postdata.append('TemplateID', TemplateID);
                postdata.append('Type', typepfDocument);
                /* postdata.append('ClientApproval', clientApproval);*/
                postdata.append('ClientRemarks', clientRemarks);
                postdata.append('clause', ClauseNo);
                postdata.append('authorid', ADMIN_AUTH);
                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Create_QualityTemplate_Document",
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
                            var TemplateID = data.responseObject;

                        }
                    }
                });


            };
        }

    }
    //function CreateAnnualtraining(template_ID) {

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

    //            var TemplateID = template_ID;

    //            var postdata = new FormData();
    //            postdata.append('file', file2);
    //            postdata.append('ID', ID);
    //            postdata.append('file1', file3);
    //            postdata.append('Remarks', annualRemarks);
    //            postdata.append('Year', year);
    //            postdata.append('TemplateID', TemplateID)
    //            postdata.append('authorid', ADMIN_AUTH);
    //            $.ajax({
    //                url: "https://api.pdca.in/Quality_Template/Create_QualityTemplate_Annual",
    //                type: "POST",
    //                data: postdata,
    //                async: false,
    //                dataType: "json",
    //                processData: false,
    //                crossDomain: true,
    //                cache: false,
    //                contentType: false,
    //                success: function (data) {

    //                    if (data.responsecode == 0) {
    //                        var TemplateID = data.responseObject;

    //                    }
    //                }
    //            });
    //        };
    //    }
    //}
    //function CreateMonthlytraining(template_ID) {

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

    //            var TemplateID = template_ID;
    //            var postdata = new FormData();
    //            postdata.append('file', file4);
    //            postdata.append('ID', ID);
    //            postdata.append('file1', file5);
    //            postdata.append('file2', file6);
    //            postdata.append('Dateoftrainingconducted', dateOfTraining);
    //            postdata.append('topicoftraining', topicName);
    //            postdata.append('Remarks', monthlyRemarks)
    //            postdata.append('TemplateID', TemplateID);
    //            postdata.append('authorid', ADMIN_AUTH);


    //            $.ajax({
    //                url: "https://api.pdca.in/Quality_Template/Create_QualityTemplate_Monthly",
    //                type: "POST",
    //                data: postdata,
    //                async: false,
    //                dataType: "json",
    //                processData: false,
    //                crossDomain: true,
    //                cache: false,
    //                contentType: false,
    //                success: function (data) {

    //                    if (data.responsecode == 0) {
    //                        var TemplateID = data.responseObject;

    //                    }
    //                }
    //            });


    //        };
    //    }

    //}
    //function CreateSkillMatrix(template_ID) {

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
    //            var TemplateID = template_ID;


    //            var postdata = new FormData();
    //            postdata.append('file', file7);
    //            postdata.append('ID', ID);
    //            postdata.append('file1', file8);
    //            postdata.append('file2', file9);
    //            postdata.append('EmployeeName', employeeNamee);
    //            postdata.append('EmployeeID', employeeIdd);
    //            postdata.append('JobRole', jobRolee)
    //            postdata.append('TemplateID', TemplateID);
    //            postdata.append('authorid', ADMIN_AUTH);

    //            $.ajax({
    //                url: "https://api.pdca.in/Quality_Template/Create_Template_SkillMatrix",
    //                type: "POST",
    //                data: postdata,
    //                async: false,
    //                dataType: "json",
    //                processData: false,
    //                crossDomain: true,
    //                cache: false,
    //                contentType: false,
    //                success: function (data) {
    //                    if (data.responsecode == 0) {
    //                        var TemplateID = data.responseObject;

    //                    }
    //                }
    //            });

    //        };
    //    }
    //}

    function execution(template_ID) {


        var gettablelength = $("#execution tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var file = ""
                var checklevel4pdf = $("#execution tbody tr").eq(i).find(".alink").attr("href");
                if (checklevel4pdf) {
                    //do nothing
                }
                else {

                    var checkfile = $("#execution tbody tr").eq(i).find(".level4pdffile").val();
                    if (checkfile) {
                        file = $("#execution tbody tr").eq(i).find(".level4pdffile")[0].files[0];
                    }

                }
                var file1 = ""
                var checkannualpdf = $("#execution tbody tr").eq(i).find(".alink1").attr("href");
                if (checkannualpdf) {
                    //do nothing
                }
                else {

                    var checkfile1 = $("#execution tbody tr").eq(i).find(".annualpdffile").val();
                    if (checkfile1) {
                        file1 = $("#execution tbody tr").eq(i).find(".annualpdffile")[0].files[0];
                    }

                }
                var eName = $("#execution tbody tr").eq(i).find(".eName").val();
                var clause = $("#execution tbody tr").eq(i).find(".clause").val();
                var taskFreq = $("#execution tbody tr").eq(i).find(".taskFreq").val();
                var annualRemark = $("#execution tbody tr").eq(i).find("#annualRemarks").val();
                var TemplateID = template_ID;
                var ID = $("#execution tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var postdata = new FormData();
                postdata.append('file1', file);
                postdata.append('file', file1);
                postdata.append('Nameofthedoc', eName);
                postdata.append('clause', clause);
                postdata.append('ID', ID);
                postdata.append('taskfrequency', taskFreq);
                postdata.append('Remarks', annualRemark);
                postdata.append('TemplateID', TemplateID);
                postdata.append('authorid', ADMIN_AUTH);


                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Create_Template_Execution",
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
                        if (data.responsecode == 0) {
                            var template_ID = data.responseObject;

                        }
                    }
                });

            };
        }
    }


    function Createauditschedule(template_ID) {

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
                var Date1 = $("#audit tbody tr").eq(i).find(".date").val();
                var typeOfAudit = $("#audit tbody tr").eq(i).find(".typeOfAudit").val();
                var annualRemarks = $("#audit tbody tr").eq(i).find(".annualRemarks").val();
                var AdminID = ADMIN_AUTH;

                var TemplateID = template_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', file);
                postdata.append('file1', file1);
                postdata.append('Date', Date1);
                postdata.append('TypeofAudit', typeOfAudit);
                postdata.append('Remarks', annualRemarks);
                postdata.append('TemplateID', TemplateID);
                postdata.append('authorid', AdminID);

                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Create_Template_AuditSchedule",
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
                            var TemplateID = data.responseObject;

                        }
                    }
                });
            };
        }

    }
    function CreateAuditordetails(template_ID) {

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
                var AdminID = ADMIN_AUTH;
                var TemplateID = template_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', file2);
                postdata.append('file1', file3);
                postdata.append('file2', file4);
                postdata.append('auditorname', audtorName);
                postdata.append('TemplateID', TemplateID);
                postdata.append('authorid', AdminID);


                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Create_Template_Auditordetails",
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
                            var TemplateID = data.responseObject;

                        }
                    }
                });
            };
        }

    }
    function CreateAuditorMeetingdetails(template_ID) {

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
                var AdminID = ADMIN_AUTH;
                var TemplateID = template_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', file5);
                postdata.append('file1', file6);
                postdata.append('Date', date1);
                postdata.append('TypeofMeeting', TypeofMeeting);
                postdata.append('TemplateID', TemplateID);
                postdata.append('authorid', AdminID);

                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Create_Template_AuditorMeeting",
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
                            var TemplateID = data.responseObject;

                        }
                    }
                });
            };
        }

    }
    function CreateAuditChecklist(template_ID) {

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
                var AdminID = ADMIN_AUTH;
                var TemplateID = template_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('clause', standardClause);
                postdata.append('file', file7);
                postdata.append('Description', standardDescription);
                postdata.append('Observations', Observations);
                postdata.append('Auditordecision', Auditordecision);
                postdata.append('Remarks', annualRemarks1);
                postdata.append('TemplateID', TemplateID);
                postdata.append('authorid', AdminID);

                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Create_Template_AuditChecklist",
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
                            var TemplateID = data.responseObject;

                        }
                    }
                });


            };
        }

    }
    function CreateNCandCAtable(template_ID) {

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
                var audit_type = $("#nc-caDetails tbody tr").eq(i).find(".audit_type").val();
                var nccaDetail = $("#nc-caDetails tbody tr").eq(i).find(".nccaDetail").val();
                var rootcause = $("#nc-caDetails tbody tr").eq(i).find(".rootcause").val();
                var ncnumber = $("#nc-caDetails tbody tr").eq(i).find(".ncnumber").val();
                var CAProposed = $("#nc-caDetails tbody tr").eq(i).find(".CAProposed").val();
                var CAApprovedbyAuditor = $("#nc-caDetails tbody tr").eq(i).find(".CAApprovedbyAuditor").val();
                var ncClosedby = $("#nc-caDetails tbody tr").eq(i).find(".ncClosedby").val();
                var ncCloseDate = $("#nc-caDetails tbody tr").eq(i).find(".ncCloseDate").val();
                var AdminID = ADMIN_AUTH;
                var TemplateID = template_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', file8);
                postdata.append('AuditType', audit_type);
                postdata.append('NCopenDate', nccaDetail);
                postdata.append('NCnumber', ncnumber);
                postdata.append('CAProposed', CAProposed);
                postdata.append('NCRootcause', rootcause),
                    postdata.append('CA_ApprovedbyAuditor', CAApprovedbyAuditor);
                postdata.append('NCclosedby', ncClosedby);
                postdata.append('NCcloseDate', ncCloseDate);
                postdata.append('TemplateID', TemplateID);
                postdata.append('authorid', AdminID);

                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Create_Template_NCC",
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
                            var TemplateID = data.responseObject;

                        }
                    }
                });

            };
        }

    }
    function CreateReviewMeeting(template_ID) {

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
                /*var auditType = $("#managementReviewMeeting tbody tr").eq(i).find(".auditType").val();*/
                var mrmDate = $("#managementReviewMeeting tbody tr").eq(i).find(".mrmDate").val();
                var AdminID = ADMIN_AUTH;
                var TemplateID = template_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                /*postdata.append('file', file9);*/
                postdata.append('file1', file10);
                postdata.append('file2', file11);
                postdata.append('file3', file12);
               /* postdata.append('TypeofAudit', auditType);*/
                postdata.append('ReviewDate', mrmDate);
                postdata.append('TemplateID', TemplateID);
                postdata.append('authorid', AdminID);

                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Create_Template_MRM",
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
                            var TemplateID = data.responseObject;

                        }
                    }
                });
            };
        }

    }
    function CreateAuditorRecommendation(template_ID) {

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
                var TemplateID = template_ID;
                var AdminID = ADMIN_AUTH;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('Recommendationfor', TypeofMeeting1);
                postdata.append('Auditorname', NameoftheAuditor);
                postdata.append('RecommendedCertification', RecommendationforCertification);
                postdata.append('Comments', comments);
                postdata.append('TemplateID', TemplateID);
                postdata.append('authorid', AdminID);

                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Create_Template_AuditorRecommendation",
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
                            var TemplateID = data.responseObject;

                        }
                    }
                });
            };
        }

    }
    function CreateQualityStatus(template_ID) {

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
                var AdminID = ADMIN_AUTH;
                var TemplateID = template_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', file13);
                postdata.append('validity', validity);
                postdata.append('NeworSurveillance', NeworServeilience);
                postdata.append('Status', status);
                postdata.append('Nextsurveillanceaudit', NextSurveillanceAudit);
                postdata.append('Remarks', Remarks1);
                postdata.append('TemplateID', TemplateID);
                postdata.append('authorid', AdminID);

                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Create_Template_Certification",
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
                        }
                    }
                });
            };
        }
    }


    /*-----------------------------Create Tables Ends----------------------------------------------*/



    /*-----------------------------Delete Tables start----------------------------------------------*/
    $("#table-iddoc").on("click", ".deleteRow", function () {
        ;
        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Delete_QualityStandard?Adminid=" + ADMIN_AUTH + "&id=" + id + "",
                    type: "POST",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 0) {
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

    $("#table-quality").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Delete_QualityTemplate_Document?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "POST",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 0) {
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

    //$("#table-AunalTraining").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pdca.in/Quality_Template/Delete_QualityTemplate_Annual?AdminID=" + ADMIN_AUTH + "&Id=" + id + "",
    //type: POST,
    //contentType: false, // Not to set any content header
    //                processData: false, // Not to process data
    //                /*data: fileData,*/
    //                success: function (data) {
    //                    if (data.responsecode == 0) {
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
    //                url: "https://api.pdca.in/Quality_Template/Delete_QualityTemplate_Monthly?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
    //                type: "POST",
    //                contentType: false, // Not to set any content header
    //                processData: false, // Not to process data
    //                /*data: fileData,*/
    //                success: function (data) {
    //                    if (data.responsecode == 0) {
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
    //                url: "https://api.pdca.in/Quality_Template/Delete_Template_SkillMatrix?AdminID=" + ADMIN_AUTH + "&Id=" + id + "",
    //                type: "POST",
    //                contentType: false, // Not to set any content header
    //                processData: false, // Not to process data
    //                /*data: fileData,*/
    //                success: function (data) {
    //                    if (data.responsecode == 0) {
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

    $("#execution").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Delete_Template_Execution?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "POST",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 0) {
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

    $("#audit").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Delete_Template_AuditSchedule?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "POST",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 0) {
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
            var postdata = new FormData();
            postdata.append('ID', id);
            postdata.append('authorid', ADMIN_AUTH);
           
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Delete_Template_Auditordetails",
                    type: "POST",
                    data: postdata,
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 0) {
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
                    url: "https://api.pdca.in/Quality_Template/Delete_Template_AuditorMeeting",
                    type: "POST",
                    data: { "authorid": ADMIN_AUTH, "ID": id },
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 0) {
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
                    url: "https://api.pdca.in/Quality_Template/Delete_Template_AuditChecklist",
                    type: "POST",
                    data: { "authorid": ADMIN_AUTH, "ID": id },
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 0) {
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
                    url: "https://api.pdca.in/Quality_Template/Delete_Template_NCC?AdminId",
                    type: "POST",
                    data: { "authorid": ADMIN_AUTH, "ID": id },
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 0) {
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
            var postdata = new FormData();
            postdata.append('ID', id);
            postdata.append('authorid', ADMIN_AUTH);
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Quality_Template/Delete_Template_MRM",
                    type: "POST",
                    data: postdata,
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 0) {
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
                    url: "https://api.pdca.in/Quality_Template/Delete_Template_AuditorRecommendation",
                    type: "POST",
                    data: { "authorid": ADMIN_AUTH, "ID": id },
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 0) {
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
                    url: "https://api.pdca.in/Quality_Template/Delete_Template_Certification",
                    type: "POST",
                    data: { "authorid": ADMIN_AUTH, "ID": id },
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 0) {
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


    /*-----------------------------Delete Tables start----------------------------------------------*/


    /*-----------------------------Add Rows start----------------------------------------------*/
    function tableiddoc() {
        var currentSno1 = parseInt($("#table-iddoc .addrow:last").attr("sno")) + 1;

        var currentSnos1 = 2;

        $("#table-iddoc").on("click", ".addrow", function () {

            if (currentSno1 >= 1) {
                var getvalue = currentSno1++;
            } else {

                var getvalue = currentSnos1++;
            }
            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+></td><td>' + getvalue + '</td><td style="width:37%"> <div class=form-group> <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td style="width:30%"> <td><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></div> </td><td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file style="width:100%"></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-iddoc tbody").append(getrowcontent);
        });
        $("#table-iddoc").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos1 = 2;
    $("#table-iddoc").on("click", ".addrow1", function () {

        var getvalue = currentSnos1++;

        var getrowcontent = '<tr><td><input class="add addrow1 border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+></td><td>' + getvalue + '</td><td style="width:37%"> <div class=form-group> <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td><td style="width:30%"><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></div> </td><td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file style="width:100%"></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-iddoc tbody").append(getrowcontent);
    });
    $("#table-iddoc").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });

    function tablequality() {
        var currentSno2 = parseInt($("#table-quality .addrow:last").attr("sno1")) + 1;
        var currentSnos2 = 2;
        $("#table-quality").on("click", ".addrow", function () {

            if (currentSno2 >= 1) {
                var getvalue = currentSno2++;
            } else {

                var getvalue = currentSnos2++;
            }
            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm" name=&plus; type=button value=+></td><td>' + getvalue + '</td><td><div class=form-group><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control" style="width:630px"> </textarea></div><td><div class=form-group><select class="form-control typepfDocument w-95px" id=typepfDocument name=""><option value="level1">Level 1<option value="level2">Level 2<option value="level3">Level 3<option value="level4">Level 4</select></div></td><td><div class=form-group><input class="form-control ClauseNo" id=ClauseNo name="" style="width:110px"></div></td><td><div class=form-group><textarea class="form-control clientRemarks w-200px" id=clientRemarks name=""type=text></textarea></div></td><td><input class="w-200px Apporveddocuploadfile" id=Apporveddocuploadfile aria-describedby=inputGroupFileAddon01 type=file></td><td><input class="w-200px Draftformatfile" id=Draftformatfile aria-describedby=inputGroupFileAddon01 type=file></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-quality tbody").append(getrowcontent);
        });
        $("#table-quality").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos2 = 2;
    $("#table-quality").on("click", ".addrow1", function () {



        var getvalue = currentSnos2++;

        var getrowcontent = '<tr><td><input class="add addrow1 border-0 btn btn-icon btn-light btn-sm" name=&plus; type=button value=+></td><td>' + getvalue + '</td><td><div class=form-group><textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control" style="width:630px"> </textarea></div><td><div class=form-group><select class="form-control typepfDocument w-95px" id=typepfDocument name=""><option value="level1">Level 1<option value="level2">Level 2<option value="level3">Level 3<option value="level4">Level 4</select></div></td><td><div class=form-group><input class="form-control ClauseNo" id=ClauseNo name="" style="width:110px"></div></td><td><div class=form-group><textarea class="form-control clientRemarks w-200px" id=clientRemarks name=""type=text></textarea></div></td><td><input class="w-200px Apporveddocuploadfile" id=Apporveddocuploadfile aria-describedby=inputGroupFileAddon01 type=file></td><td><input class="w-200px Draftformatfile" id=Draftformatfile aria-describedby=inputGroupFileAddon01 type=file></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-quality tbody").append(getrowcontent);
    });
    $("#table-quality").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });

    //function tableAunalTraining() {
    //    var currentSno3 = parseInt($("#table-AunalTraining .addrow:last").attr("sno2")) + 1;
    //    var currentSnos3 = 2;
    //    $("#table-AunalTraining").on("click", ".addrow", function () {
    //        if (currentSno3 >= 1) {
    //            var getvalue = currentSno3++;
    //        } else {

    //            var getvalue = currentSnos3++;
    //        }
    //        var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus value=+></td><td>' + getvalue + '</td><td><div class=form-group><input class="form-control year"id=year name=""></div><td><input class="w-200px DraftTrainingplannerfile"id=DraftTrainingplannerfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-200px ApprovedAnnualTrainingfile"id=ApprovedAnnualTrainingfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group><textarea class="form-control annualRemarks"id=annualRemarks name=""type=text></textarea></div></td> <td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //        $("#table-AunalTraining tbody").append(getrowcontent);
    //    });
    //    $("#table-AunalTraining").on("click", ".deleterow", function () {
    //        $(this).closest("tr").remove();
    //    });
    //}
    //var currentSnos3 = 2;
    //$("#table-AunalTraining").on("click", ".addrow1", function () {

    //    var getvalue = currentSnos3++;

    //    var getrowcontent = '<tr><td><input class="add addrow1 border-0 btn btn-icon btn-light btn-sm"type=button name=&plus value=+></td><td>' + getvalue + '</td><td><div class=form-group><input class="form-control year"id=year name=""></div><td><input class="w-200px DraftTrainingplannerfile"id=DraftTrainingplannerfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-200px ApprovedAnnualTrainingfile"id=ApprovedAnnualTrainingfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group><textarea class="form-control annualRemarks"id=annualRemarks name=""type=text></textarea></div></td> <td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //    $("#table-AunalTraining tbody").append(getrowcontent);
    //});
    //$("#table-AunalTraining").on("click", ".deleterow", function () {
    //    $(this).closest("tr").remove();
    //});

    //function tableTraining() {
    //    var currentSno4 = parseInt($("#table-Training .addrow:last").attr("sno3")) + 1;
    //    var currentSnos4 = 2;
    //    $("#table-Training").on("click", ".addrow", function () {
    //        if (currentSno4 >= 1) {
    //            var getvalue = currentSno4++;
    //        } else {

    //            var getvalue = currentSnos4++;
    //        }
    //        var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus value=+></td><td>' + getvalue + '</td><td><div class=form-group><input class="form-control dateOfTraining w-200px"id=dateOfTraining type="date" name=""></div><td><div class=form-group><input class="form-control topicName w-200px"id=topicName name=""></div><td><input class="w-150px Attendenceformatfile"id=Attendenceformatfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px Evaluationpaperdownloadfile"id=Evaluationpaperdownloadfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px UploadfilledTrainingDocsfile"id=UploadfilledTrainingDocsfile type=file aria-describedby=inputGroupFileAddon01><td><div class=form-group><textarea class="form-control monthlyRemarks w-200px"id=monthlyRemarks name=""type=text></textarea></div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //        $("#table-Training tbody").append(getrowcontent);
    //    });
    //    $("#table-Training").on("click", ".deleterow", function () {
    //        $(this).closest("tr").remove();
    //    });
    //}
    //var currentSnos4 = 2;
    //$("#table-Training").on("click", ".addrow1", function () {
    //    var getvalue = currentSnos4++;
    //    var getrowcontent = '<tr><td><input class="add addrow1 border-0 btn btn-icon btn-light btn-sm"type=button name=&plus value=+></td><td>' + getvalue + '</td><td><div class=form-group><input class="form-control dateOfTraining w-200px"id=dateOfTraining type="date" name=""></div><td><div class=form-group><input class="form-control topicName w-200px"id=topicName name=""></div><td><input class="w-150px Attendenceformatfile"id=Attendenceformatfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px Evaluationpaperdownloadfile"id=Evaluationpaperdownloadfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px UploadfilledTrainingDocsfile"id=UploadfilledTrainingDocsfile type=file aria-describedby=inputGroupFileAddon01><td><div class=form-group><textarea class="form-control monthlyRemarks w-200px"id=monthlyRemarks name=""type=text></textarea></div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //    $("#table-Training tbody").append(getrowcontent);
    //});
    //$("#table-Training").on("click", ".deleterow", function () {
    //    $(this).closest("tr").remove();
    //});

    //function tableskill() {
    //    var currentSno5 = parseInt($("#table-skill .addrow:last").attr("sno4")) + 1;
    //    var currentSnos5 = 2;
    //    $("#table-skill").on("click", ".addrow", function () {
    //        if (currentSno5 >= 1) {
    //            var getvalue = currentSno5++;
    //        } else {

    //            var getvalue = currentSnos5++;
    //        }
    //        var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+></td><td>' + getvalue + '</td><td><div class=form-group><input class="form-control employeeName w-200px"id=employeeName name=""></div><td><div class=form-group><input class="form-control employeeId w-200px"id=employeeId name=""></div><td><div class=form-group><input class="form-control jobRole w-200px"id=jobRole name=""></div><td><input class="w-150px Evidencesuploadfile"id=Evidencesuploadfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px JDUploadFile"id=JDUploadFile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px AuthUploadFile"id=AuthUploadFile aria-describedby=inputGroupFileAddon01 type=file><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //        $("#table-skill tbody").append(getrowcontent);
    //    })
    //    $("#table-skill").on("click", ".deleterow", function () {
    //        $(this).closest("tr").remove();
    //    });
    //}
    //var currentSnos5 = 2;
    //$("#table-skill").on("click", ".addrow1", function () {
    //    var getvalue = currentSnos5++;
    //    var getrowcontent = '<tr><td><input class="add addrow1 border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+></td><td>' + getvalue + '</td><td><div class=form-group><input class="form-control employeeName w-200px"id=employeeName name=""></div><td><div class=form-group><input class="form-control employeeId w-200px"id=employeeId name=""></div><td><div class=form-group><input class="form-control jobRole w-200px"id=jobRole name=""></div><td><input class="w-150px Evidencesuploadfile"id=Evidencesuploadfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px JDUploadFile"id=JDUploadFile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px AuthUploadFile"id=AuthUploadFile aria-describedby=inputGroupFileAddon01 type=file><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //    $("#table-skill tbody").append(getrowcontent);
    //})
    //$("#table-skill").on("click", ".deleterow", function () {
    //    $(this).closest("tr").remove();
    //});


    function tableexecution() {

        var currentSno1 = parseInt($("#execution .addrow:last").attr("sno")) + 1;
        var currentSnos1 = 2;
        $("#execution").on("click", ".addrow", function () {

            if (currentSno1 >= 1) {
                var getvalue = currentSno1++;
            } else {

                var getvalue = currentSnos1++;
            }
            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <textarea type="text" name="" id="eName" class="eName form-control" style="width:527px"></textarea> </div></td><td> <div class="form-group"> <input type="text" name="" id="clause" class="clause form-control" style="width:110px"> </div></td><td> <div class="form-group"> <select name="" id="taskFreq" class="taskFreq form-control" style="width:120px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select> </div></td><td> <div class="form-group"> <textarea  type="text" name="" id="annualRemarks" class="annualRemarks w-200px form-control"></textarea> </div></td><td> <input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#execution tbody").append(getrowcontent);
        });
        $("#execution").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos11 = 2;
    $("#execution").on("click", ".addrow1", function () {

        var getvalue = currentSnos11++;

        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <textarea type="text" name="" id="eName" class="eName form-control" style="width:527px"></textarea> </div></td><td> <div class="form-group"> <input type="text" name="" id="clause" class="clause form-control" style="width:110px"> </div></td><td> <div class="form-group"> <select name="" id="taskFreq" class="taskFreq form-control" style="width:120px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select> </div></td><td> <div class="form-group"> <textarea  type="text" name="" id="annualRemarks" class="annualRemarks w-200px form-control"></textarea> </div></td><td> <input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#execution tbody").append(getrowcontent);
    });
    $("#execution").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
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
    var currentSnos12 = 2;
    $("#audit").on("click", ".addrow1", function () {

        var getvalue = currentSnos12++;
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
            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <textarea type="text" name="" id="audtorName" class="audtorName form-control w-500px"></textarea></div></td><td> <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#auditor tbody").append(getrowcontent);
        });
        $("#auditor").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos22 = 2;
    $("#auditor").on("click", ".addrow1", function () {

        var getvalue = currentSnos22++;
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <textarea type="text" name="" id="audtorName" class="audtorName form-control w-500px"></textarea> </div></td><td> <input type="file" class="auditorphotofile w-200px" id="auditorphotofile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="auditorIdfile w-200px" id="auditorIdfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="QualificationUploadfile w-200px" id="QualificationUploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
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
    var currentSnos33 = 2;
    $("#auditmeet").on("click", ".addrow1", function () {
        var getvalue = currentSnos33++;
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
            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group">  <textarea type="text" name="" id="standardClause" class="standardClause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="Auditor_decision" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea> </div></td><td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#standardTemplate tbody").append(getrowcontent);
        });
        $("#standardTemplate").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos44 = 2;
    $("#standardTemplate").on("click", ".addrow1", function () {
        var getvalue = currentSnos44++;
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group">  <textarea type="text" name="" id="standardClause" class="standardClause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="standardDescription" class="standardDescription form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Observations" class="Observations form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="Auditor_decision" class="Auditor_decision form-control w-130px"> <option value="">Select Type </option> <option value="Observation">Observation</option> <option value="Compliance">Compliance</option> <option value="NCMinor">NC-Minor</option> <option value="NCMajor">NC-Major</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="annualRemarks" class="annualRemarks2 form-control w-200px"></textarea> </div></td><td> <input type="file" class="uploadEvidencesfile w-200px" id="uploadEvidencesfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
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
            var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td><div class="form-group"> <textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-150px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea></div></td><td> <div class="form-group">  <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#nc-caDetails tbody").append(getrowcontent);
        });
        $("#nc-caDetails").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos55 = 2;
    $("#nc-caDetails").on("click", ".addrow1", function () {
        var getvalue = currentSnos55++;

        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td><div class="form-group"> <textarea type="text" name="" id="audit_type" class="audit_type form-control w-150px"></textarea></div></td><td> <div class="form-group"> <input type="date" name="" id="nc-caDetail" class="nccaDetail form-control w-150px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ncnumber" class="ncnumber form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="rootcause" class="rootcause form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAProposed" class="CAProposed form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="CAApprovedbyAuditor" class="CAApprovedbyAuditor form-control w-200px"></textarea></div></td><td> <div class="form-group"> <textarea type="text" name="" id="ncClosedby" class="ncClosedby form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <input type="date" name="" id="ncCloseDate" class="ncCloseDate form-control w-150px"> </div></td><td> <input type="file" class="Evidencesuploadfile w-200px" id="Evidencesuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
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
    var currentSnos66 = 2;
    $("#managementReviewMeeting").on("click", ".addrow1", function () {
        var getvalue = currentSnos66++;

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
            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea> </div></td><td> <div class="form-group">  <textarea type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="comments" class="comments form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#auditrec tbody").append(getrowcontent);
        });
        $("#auditrec").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos77 = 2;
    $("#auditrec").on("click", ".addrow1", function () {
        var getvalue = currentSnos77++;

        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <select name="" id="Typeofauditt" class="Typeofauditt form-control"> <option value="">Select Type </option> <option value="InternalAudit">Internal Audit</option> <option value="ExternalAudit">External Audit</option> </select> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheAuditor" class="NameoftheAuditor form-control"></textarea> </div></td><td> <div class="form-group">  <textarea type="text" name="" id="RecommendationforCertification" class="RecommendationforCertification form-control"></textarea></div></td><td> <div class="form-group"> <textarea type="text" name="" id="comments" class="comments form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
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
    var currentSnos88 = 2;
    $("#qualityStatus").on("click", ".addrow1", function () {
        var getvalue = currentSnos88++;

        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <textarea type="text" name="" id="validity" class="validity form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="NeworServeilience" class="NeworServeilience form-control w-200px"></textarea> </div></td><td> <div class="form-group"> <select name="" id="status" class="status form-control w-150px">  <option value="">Select Status </option> <option value="red">Red</option> <option value="green">Green</option> </select> </div></td><td> <div class="form-group"> <input type="date" name="" id="NextSurveillanceAudit" class="NextSurveillanceAudit form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="Remarks1" class="Remarks1 form-control w-200px"></textarea> </div></td><td> <input type="file" class="certificationCopyfile w-200px" id="certificationCopyfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#qualityStatus tbody").append(getrowcontent);
    })
    $("#qualityStatus").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
    /*-----------------------------Add Rows Ends----------------------------------------------*/
});