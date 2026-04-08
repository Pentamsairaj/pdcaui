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
        $("#template_div").hide();
        Getlistofalltables(ID);
    }
    getclients();
    getEmployees();

    getlist();
   
    function getlist() {
        $.ajax({
            url: "https://api.pdca.in/Quality_Template/List_Template?AdminId=" + ADMIN_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
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
            url: "https://api.pdca.in/Quality/ListforJobID?AdminID=" + ADMIN_AUTH,
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
            $("#template_div").show();
        }
        else {
            $("#template_div").hide();
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



    $("#ddlqulitylist").change(function () {
        var gettemplateid = $(this).val();
        localStorage.setItem("TemplateID", gettemplateid)
        Getlistofalltablesdata(gettemplateid);
    });


    function Getlistofalltablesdata(gettemplateid) {

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
                                var STANDARD = '<td style="width:37%"><div class=form-group><textarea class="form-control standard"id=standard name="" >' + values.Standard + '</textarea></div></td>'

                            }
                            else {
                                var STANDARD = '<td style="width:37%"> <div class=form-group> <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td> ';

                            }
                            if (values.Document != null) {
                                var Document = '<td> <div class=form-group><a class="alink" target="_blank" href="' + values.Document + '"><button class="btn btn-primary" type="button">View</button></a></div></td>'

                            }
                            else {
                                var Document = '<td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file style="width:100%"></td> ';

                            }
                            if (values.Link != null) {
                                var link = '<td style="width:30%"><div class=form-group><input type="url" name="" id="standardlink" class="standardlink form-control"  value="' + values.Link + '" ></div></td>'

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
                            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td style="width:37%"> <div class=form-group> <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td><td style="width:30%"><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></div> </td><td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 style="width:100%" type=file></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#table-iddoc tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td style="width:37%"> <div class=form-group> <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td style="width:30%"><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></div> </td><td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file style="width:100%"></td></tr>';
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
                                var NameoftheDoc = '<td> <textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control" style="width:630px"> </textarea></div></td>'
                            }
                            else {
                                var NameoftheDoc = '<td><div class="form-group">  <textarea type="text" name="" id="NameoftheDoc" value="" class="NameoftheDoc form-control" style="width:630px">' + values.NameoftheDoc + '</textarea> </div></td>';
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
                                var clause = '<td><div class=form-group><input class="form-control ClauseNo" name="" value="' + values.clause + '" id=ClauseNo  style="width:110px"></div></td>';
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
                            var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" sno1=' + snos++ + ' class="addrow border-0 add btn btn-icon btn-light btn-sm"/></td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control" style="width:630px"> </textarea> </div></td><td> <div class="form-group"> <select name="" id="typepfDocument" class="typepfDocument form-control w-95px"> <option value="level1">Level 1</option> <option value="level2">Level 2</option> <option value="level3">Level 3</option> <option value="level4">Level 4</option> </select> </div></td><td> <div class="form-group"> <input type="text" name="" id="ClauseNo" class="ClauseNo form-control" style="width:630px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="clientRemarks" class="clientRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="Apporveddocuploadfile w-200px" id="Apporveddocuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="Draftformatfile w-200px" id="Draftformatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>'
                            $("#table-quality tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" sno1=' + snos++ + ' class="addrow border-0 add btn btn-icon btn-light btn-sm"/></td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control" style="width:630px"> </textarea> </div></td><td> <div class="form-group"> <select name="" id="typepfDocument" class="typepfDocument form-control w-95px"> <option value="level1">Level 1</option> <option value="level2">Level 2</option> <option value="level3">Level 3</option> <option value="level4">Level 4</option> </select> </div></td><td> <div class="form-group"> <input type="text" name="" id="ClauseNo" class="ClauseNo form-control" style="width:630px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="clientRemarks" class="clientRemarks form-control w-200px"></textarea> </div></td><td> <input type="file" class="Apporveddocuploadfile w-200px" id="Apporveddocuploadfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="Draftformatfile w-200px" id="Draftformatfile" aria-describedby="inputGroupFileAddon01"> </td></tr>'
                            $("#table-quality tbody").append(getrowcontent);
                        }
                    }
                });
            }
        });
        tablequality();

    }



    function Getlistofalltables(getjoballocationid) {

        $.ajax({
            url: "https://api.pdca.in/Quality/QualityStandardList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            success: function (data) {
                $("#table-iddoc tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        if (values.STANDARD != null) {
                            var STANDARD = '<td style="width:37%"><div class=form-group><textarea class="form-control standard"id=standard name="" >' + values.STANDARD + '</textarea></div></td>'

                        }
                        else {
                            var STANDARD = '<td style="width:37%"> <div class=form-group> <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td> ';

                        }
                        if (values.Document != null) {
                            var Document = '<td> <div class=form-group><a class="alink" target="_blank" href="' + values.Document + '"><button class="btn btn-primary" type="button">View</button></a></div></td>'

                        }
                        else {
                            var Document = '<td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file style="width:100%"></td> ';

                        }
                        if (values.link != null) {
                            var link = '<td style="width:30%"><div class=form-group><input type="url" name="" id="standardlink" class="standardlink form-control"  value="' + values.link + '"></div></td>'

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
                        var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td style="width:37%"> <div class=form-group> <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td><td style="width:30%"><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></div> </td><td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file style="width:100%"></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td style="width:37%"> <div class=form-group> <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td><td style="width:30%"><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></div> </td><td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file style="width:100%"></td></tr>';
                        $("#table-iddoc tbody").append(getrowcontent);
                    }
                }
            }

        });
        tableiddoc();


        $.ajax({
            url: "https://api.pdca.in/Quality/QualityDocsList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#table-quality tbody").empty();
                if (data != 0) {

                    var sno = 1;
                    var snos = 1;
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
                            var NameoftheDoc = '<td> <textarea type="text" name="" id="NameoftheDoc" class="NameoftheDoc form-control" style="width:630px"> </textarea></div></td>'
                        }
                        else {
                            var NameoftheDoc = '<td><div class="form-group">  <textarea type="text" name="" id="NameoftheDoc" value="" class="NameoftheDoc form-control" style="width:630px">' + values.NameoftheDoc + ' </textarea></div></td>';
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
            }
        });
        tablequality();
        //$.ajax({
        //    url: "https://api.pdca.in/Quality/AnnualTrainingList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
        //    type: "GET",
        //    async: false,
        //    contentType: false, // Not to set any content header
        //    processData: false, // Not to process data
        //    success: function (data) {
        //        $("#table-AunalTraining tbody").empty();
        //        if (data != 0) {
        //            var sno = 1;
        //            var snos = 1;
        //            $.each(data, function (index, values) {
        //                if (values.Year == null) {
        //                    var Year = '<td><div class=form-group><input class="form-control year"id=year name=""></div></td>'
        //                }
        //                else {
        //                    var Year = '<td><div class=form-group><input class="form-control year"id=year value="' + values.Year + '" name=""></div></td>';
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
        //                    var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control">' + values.Remarks + '</textarea></div></td>';
        //                }
        //                if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                    var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno2=' + snos++ + ' value=+></td><td>' + sno++ + '</td> ' + Year + ' ' + AnnualTrainingpalnner + '' + ApprovedAnnualTraining + ' ' + Remarks + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>'
        //                    $("#table-AunalTraining tbody").append(getdetails);
        //                }
        //                else {
        //                    var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno2=' + snos++ + ' value=+></td><td>' + sno++ + '</td> ' + Year + ' ' + AnnualTrainingpalnner + '' + ApprovedAnnualTraining + ' ' + Remarks + '</tr>'
        //                    $("#table-AunalTraining tbody").append(getdetails);
        //                }
        //            });
        //        }
        //        else {
        //            var sno = 1;
        //            var snos = 1;
        //            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno2=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control year"id=year name=""></div></td><input class="w-200px DraftTrainingplannerfile"id=DraftTrainingplannerfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-200px ApprovedAnnualTrainingfile"id=ApprovedAnnualTrainingfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group><textarea class="form-control annualRemarks"id=annualRemarks name=""type=text></textarea></div></td> <td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //                $("#table-AunalTraining tbody").append(getrowcontent);
        //            }
        //            else {
        //                var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno2=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control year"id=year name=""></div></td><input class="w-200px DraftTrainingplannerfile"id=DraftTrainingplannerfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-200px ApprovedAnnualTrainingfile"id=ApprovedAnnualTrainingfile aria-describedby=inputGroupFileAddon01 type=file><td><div class=form-group><textarea class="form-control annualRemarks"id=annualRemarks name=""type=text></textarea></div></td></tr>';
        //                $("#table-AunalTraining tbody").append(getrowcontent);
        //            }
        //        }
        //    }

        //});
        //tableAunalTraining()

        //$.ajax({
        //    url: "https://api.pdca.in/Quality/MonthlyTrainingList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
        //    type: "GET",
        //    async: false,
        //    contentType: false, // Not to set any content header
        //    processData: false, // Not to process data
        //    //data: fileData,
        //    success: function (data) {
        //        $("#table-Training tbody").empty();
        //        if (data != 0) {
        //            var sno = 1;
        //            var snos = 1;
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
        //                if (datef == null) {
        //                    var datef = '<td><div class=form-group><input type="date" name="" id="dateOfTraining" class="dateOfTraining form-control w-200px"></div></td>'
        //                }
        //                else {
        //                    var datef = '<td><div class=form-group><input type="date" name="" id="dateOfTraining" value="' + datef + '" class="dateOfTraining form-control w-200px"></div></td>';
        //                }
        //                if (values.topicoftraining == null) {
        //                    var topicoftraining = '<td><div class=form-group><input type="text" name="" id="topicName" class="topicName form-control w-200px"></div></td>'
        //                }
        //                else {
        //                    var topicoftraining = '<td> <div class=form-group><input type="text" name="" id="topicName" class="topicName form-control w-200px" value="' + values.topicoftraining + '" ></div></td>';
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
        //                    var Remarks = '<td><div class="form-group"><textarea type="text" name="" id="monthlyRemarks" class="monthlyRemarks form-control w-200px">' + values.Remarks + '</textarea></div></td>';
        //                }
        //                if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                    var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno3=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + datef + ' ' + topicoftraining + ' ' + Attendenceformat + ' ' + Evaluationdoc + ' ' + Uploadfilledtrainingdocs + '  ' + Remarks + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>'
        //                    $("#table-Training tbody").append(getdetails);
        //                }
        //                else {
        //                    var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno3=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + datef + ' ' + topicoftraining + ' ' + Attendenceformat + ' ' + Evaluationdoc + ' ' + Uploadfilledtrainingdocs + '  ' + Remarks + '</tr>'
        //                    $("#table-Training tbody").append(getdetails);
        //                }


        //            });
        //        }
        //        else {
        //            var sno = 1;
        //            var snos = 1;
        //            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno3=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control dateOfTraining w-200px"id=dateOfTraining type="date" name=""></div><td><div class=form-group><input class="form-control topicName w-200px"id=topicName name=""></div><td><input class="w-150px Attendenceformatfile"id=Attendenceformatfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px Evaluationpaperdownloadfile"id=Evaluationpaperdownloadfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px UploadfilledTrainingDocsfile"id=UploadfilledTrainingDocsfile type=file aria-describedby=inputGroupFileAddon01><td><div class=form-group><textarea class="form-control monthlyRemarks w-200px"id=monthlyRemarks name=""type=text></textarea></div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //                $("#table-Training tbody").append(getrowcontent);
        //            }
        //            else {
        //                var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"type=button name=&plus sno3=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control dateOfTraining w-200px"id=dateOfTraining type="date" name=""></div><td><div class=form-group><input class="form-control topicName w-200px"id=topicName name=""></div><td><input class="w-150px Attendenceformatfile"id=Attendenceformatfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px Evaluationpaperdownloadfile"id=Evaluationpaperdownloadfile type=file aria-describedby=inputGroupFileAddon01><td><input class="w-150px UploadfilledTrainingDocsfile"id=UploadfilledTrainingDocsfile type=file aria-describedby=inputGroupFileAddon01><td><div class=form-group><textarea class="form-control monthlyRemarks w-200px"id=monthlyRemarks name=""type=text></textarea></div></td></tr>';
        //                $("#table-Training tbody").append(getrowcontent);
        //            }


        //        }
        //    }

        //});
        //tableTraining()

        //$.ajax({
        //    url: "https://api.pdca.in/Quality/SkillMatrixList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
        //    type: "GET",
        //    async: false,
        //    contentType: false, // Not to set any content header
        //    processData: false, // Not to process data
        //    success: function (data) {
        //        $("#table-skill tbody").empty();
        //        if (data != 0) {
        //            var sno = 1;
        //            var snos = 1;
        //            $.each(data, function (index, values) {
        //                if (values.EmpName == null) {
        //                    var EmpName = '<td><div class=form-group> <input type="text" name="" id="employeeName" class="employeeName form-control w-200px"></div></td>'
        //                }
        //                else {
        //                    var EmpName = '<td><div class=form-group> <input type="text" name="" id="employeeName" value = "' + values.EmpName + '" class="employeeName form-control w-200px"></div></td>';
        //                }
        //                if (values.EmpID == null) {
        //                    var EmpID = '<td><div class=form-group> <input type="text" name="" id="employeeId" class="employeeId form-control w-200px"></div></td>'
        //                }
        //                else {
        //                    var EmpID = '<td><div class=form-group><input type="text" name="" id="employeeId"  value = "' + values.EmpID + '" class="employeeId form-control w-200px"></div></td>';
        //                }
        //                if (values.JobRole == null) {
        //                    var JobRole = '<td> <div class=form-group><input type="text" name="" id="jobRole" class="jobRole form-control w-200px"></div></td>'
        //                }
        //                else {
        //                    var JobRole = '<td><div class=form-group><input type="text" name="" id="jobRole" value = "' + values.JobRole + '" class="jobRole form-control w-200px"></div></td>';
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
        //                if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                    var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno4=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + EmpName + ' ' + EmpID + ' ' + JobRole + ' ' + Evidencesupload + ' ' + JDupload + ' ' + Authupload + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>'
        //                    $("#table-skill tbody").append(getdetails);
        //                }
        //                else {
        //                    var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno4=' + snos++ + ' value=+></td><td>' + sno++ + '</td>' + EmpName + ' ' + EmpID + ' ' + JobRole + ' ' + Evidencesupload + ' ' + JDupload + ' ' + Authupload + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>'
        //                    $("#table-skill tbody").append(getdetails);
        //                }

        //            });
        //        }
        //        else {
        //            var sno = 1;
        //            var snos = 1;
        //            if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
        //                var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno4=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control employeeName w-200px"id=employeeName name=""></div><td><div class=form-group><input class="form-control employeeId w-200px"id=employeeId name=""></div><td><div class=form-group><input class="form-control jobRole w-200px"id=jobRole name=""></div><td><input class="w-150px Evidencesuploadfile"id=Evidencesuploadfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px JDUploadFile"id=JDUploadFile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px AuthUploadFile"id=AuthUploadFile aria-describedby=inputGroupFileAddon01 type=file></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        //                $("#table-skill tbody").append(getrowcontent);
        //            }
        //            else {
        //                var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button sno4=' + snos++ + ' value=+></td><td>' + sno++ + '</td><td><div class=form-group><input class="form-control employeeName w-200px"id=employeeName name=""></div><td><div class=form-group><input class="form-control employeeId w-200px"id=employeeId name=""></div><td><div class=form-group><input class="form-control jobRole w-200px"id=jobRole name=""></div><td><input class="w-150px Evidencesuploadfile"id=Evidencesuploadfile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px JDUploadFile"id=JDUploadFile aria-describedby=inputGroupFileAddon01 type=file><td><input class="w-150px AuthUploadFile"id=AuthUploadFile aria-describedby=inputGroupFileAddon01 type=file></td></tr>';
        //                $("#table-skill tbody").append(getrowcontent);
        //            }
        //        }
        //    }

        //});
        //tableskill()
    }

    $("#createTemplateSubmit").submit(function () {
        $("#spinner").show();

        setTimeout(
            function () {
                var checkexisting = $("#ddjobid").val();
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
                                standardajax(joballocation_ID);
                                qualitydocs(joballocation_ID);
                                //CreateAnnualtraining(joballocation_ID);
                                //CreateMonthlytraining(joballocation_ID);
                                //localStorage.setItem("JobID", joballocation_ID)
                                //CreateSkillMatrix(joballocation_ID);
                                alert("Quality for Business Created Successfully");
                                var Template = localStorage.getItem("TemplateID")
                                window.location = "/qualityCompliance/QualityExecution.html?id=" + joballocation_ID + "&TemplateID=" + Template;
                            }
                            else {
                                alert(data.responsemessage);
                            }
                        }
                    });
                }
                else {
                    var joballocation_ID = checkexisting;


                    // Your code for updating the job (without AJAX)
                    // ...

                    standardajax(joballocation_ID);
                    qualitydocs(joballocation_ID);
                    //CreateAnnualtraining(joballocation_ID);
                    //CreateMonthlytraining(joballocation_ID);
                    //localStorage.setItem("JobID", joballocation_ID);
                    //CreateSkillMatrix(joballocation_ID);
                    // After the update logic is complete, hide the spinner

                    alert("Quality for Business Updated Successfully");
                    window.location = "/qualityCompliance/QualityExecution.html?id=" + joballocation_ID;
                }
            }, 5000);


        /* $("#spinner").hide();*/
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
                    var checkqualityStandard = $("#table-iddoc tbody tr").eq(i).find(".alink").attr("href");
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
                var AdminID = ADMIN_AUTH;
                var postdata = new FormData();
                postdata.append('ID', ID);
                if (checkqualityStandard != null) {
                    postdata.append('Document', checkqualityStandard);
                } else {
                    postdata.append('file', files);
                }
                postdata.append('STANDARD', STANDARD);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('AdminID', AdminID);
                postdata.append('link', standardlink);


                $.ajax({
                    url: "https://api.pdca.in/Quality/Create_Standard",
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
                    var checkDraftformat = $("#table-quality tbody tr").eq(i).find(".alink").attr("href");
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
                    var checkdocapproved = $("#table-quality tbody tr").eq(i).find(".alink1").attr("href");
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
                if (checkDraftformat != null) {
                    postdata.append("Draftformat", checkDraftformat);
                } else {
                    postdata.append("file", file);
                }
                if (checkdocapproved != null) {
                    postdata.append("Approveddocupload", checkdocapproved);
                }else {
                    postdata.append("file", file);
                }
                postdata.append('NameoftheDoc', NameoftheDoc);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('Type', typepfDocument);
                /* postdata.append('ClientApproval', clientApproval);*/
                postdata.append('ClientRemarks', clientRemarks);
                postdata.append('clause', ClauseNo);
                postdata.append('AdminID', ADMIN_AUTH);
                $.ajax({
                    url: "https://api.pdca.in/Quality/Create_QualityDocs",
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
    //            postdata.append('AdminID', ADMIN_AUTH);
    //            $.ajax({
    //                url: "https://api.pdca.in/Quality/Create_Annualtraining",
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
    //            postdata.append('AdminID', ADMIN_AUTH);


    //            $.ajax({
    //                url: "https://api.pdca.in/Quality/Create_Monthlytraining",
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
    //            postdata.append('AdminID', ADMIN_AUTH);

    //            $.ajax({
    //                url: "https://api.pdca.in/Quality/Create_SkillMatrix",
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

    $("#table-iddoc").on("click", ".deleteRow", function () {
        ;
        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Quality/Delete_Quality_standard?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
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

    $("#table-quality").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Quality/Delete_QualityDocs?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
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

    //$("#table-AunalTraining").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pdca.in/Quality/Delete_StandardAnnualTraining?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
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
    //                url: "https://api.pdca.in/Quality/Delete_StandardMonthlyTraining?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
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
    //                url: "https://api.pdca.in/Quality/Delete_SkillMatrix?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
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

    function tableiddoc() {
        var currentSno1 = parseInt($("#table-iddoc .addrow:last").attr("sno")) + 1;

        var currentSnos1 = 2;

        $("#table-iddoc").on("click", ".addrow", function () {

            if (currentSno1 >= 1) {
                var getvalue = currentSno1++;
            } else {

                var getvalue = currentSnos1++;
            }
            var getrowcontent = '<tr><td><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus type=button value=+></td><td>' + getvalue + '</td><td style="width:37%"> <div class=form-group> <textarea type="text" name="" id="standard" class="standard form-control"></textarea></div></td><td style="width:30%"><div class=form-group> <input type="url" name="" id="standardlink" class="standardlink form-control"></div> </td><td><input class="fileinput qualityStandardDocumentfile" id=qualityStandardDocumentfile aria-describedby=inputGroupFileAddon01 type=file style="width:100%"></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
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
});