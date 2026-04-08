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
            url: "https://api.pdca.in/Quality/ListforJobID?AdminID=" + ADMIN_AUTH,
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
    $("#ddjobid").change(function () {
        var getjoballocationid = $(this).val();
        getlist(getjoballocationid);
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
                    $("#execution tbody").empty();
                    var sno = 1;
                    var snos = 1;
                    if (values.execution_list && values.execution_list.length > 0) {
                        debugger;

                        $.each(values.execution_list, function (index, values) {
                            if (values.Nameofthedoc == null) {
                                var nameofthedoc = '<td><div class=form-group><textarea type="text" name="" id="eName" class="eName form-control" style="width:527px"></textarea></div></td>'
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
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td>' + nameofthedoc + '  ' + clause + ' ' + taskfrequency + '  ' + Remarks + ' ' + level4pdf + '' + uploadpdf + '</td><td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                                $("#execution tbody").append(getdetails);
                                $("#taskFreq" + values.ID).val(values.taskfrequency);
                            }
                            else {
                                var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td>' + nameofthedoc + '  ' + clause + ' ' + taskfrequency + ' ' + Remarks + '' + level4pdf + '' + uploadpdf + ' </tr>';
                                $("#execution tbody").append(getdetails);
                                $("#taskFreq" + values.ID).val(values.taskfrequency);
                            }

                        });
                    }
                    else {
                        var sno = 1;
                        var snos = 1;
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getrowcontent = '<tr> <td> <input sno=' + snos++ + ' type="button" name="&plus" value="+"  class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="eName" class="eName form-control" style="width:527px"></textarea> </div></td><td> <div class="form-group"> <input type="text" name="" id="clause" class="clause form-control" style="width:110px"> </div></td><td> <div class="form-group"> <select name="" id="taskFreq" class="taskFreq form-control" style="width:120px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select> </div></td><td> <div class="form-group"> <textarea  type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px "></textarea> </div></td><td> <input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input   type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                            $("#execution tbody").append(getrowcontent);
                        }
                        else {
                            var getrowcontent = '<tr> <td> <input sno=' + snos++ + ' type="button" name="&plus" value="+"  class="addrow border-0 add btn btn-icon btn-light btn-sm" /> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="eName" class="eName form-control" style="width:527px"></textarea> </div></td><td> <div class="form-group"> <input type="text" name="" id="clause" class="clause form-control" style="width:110px"> </div></td><td> <div class="form-group"> <select name="" id="taskFreq" class="taskFreq form-control" style="width:120px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select> </div></td><td> <div class="form-group"> <textarea  type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px "></textarea> </div></td><td> <input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input   type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"></div> </td></tr>';
                            $("#execution tbody").append(getrowcontent);
                        }
                    }
                });
            }

        });
        tableexecution();

      
    }
    function getlist(getjoballocationid) {

        $.ajax({
            url: "https://api.pdca.in/Quality/QualityExecutionList?AdminId=" + ADMIN_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            success: function (data) {
                $("#execution tbody").empty();
                var sno = 1;
                var snos = 1;
                if (data != 0) {
                    debugger;
                 
                    $.each(data, function (index, values) {
                        if (values.nameofthedoc == null) {
                            var nameofthedoc = '<td><div class=form-group><textarea type="text" name="" id="eName" class="eName form-control" style="width:527px"></textarea></div></td>'
                        }
                        else {
                            var nameofthedoc = '<td><div class=form-group><textarea type="text" name="" id="eName" value="" class="eName form-control" style="width:527px">' + values.nameofthedoc + '</textarea></div></td>';
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
                            var Remarks = '<td><div class=form-group><textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px "></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td><div class=form-group><textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px ">' + values.Remarks + '</textarea></div></td>';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td>' + nameofthedoc + ' ' + clause + ' ' + taskfrequency + ' ' + Remarks + '  ' + level4pdf + ' ' + uploadpdf + '</td><td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#execution tbody").append(getdetails);
                            $("#taskFreq" + values.ID).val(values.taskfrequency);
                        }
                        else {
                            var getdetails = '<tr><td><input type="hidden" class="txtid" id="' + values.ID + '" value="' + values.ID + '"><input class="add addrow border-0 btn btn-icon btn-light btn-sm"name=&plus sno=' + snos++ + ' type=button value=+></td><td>' + sno++ + '</td>' + nameofthedoc + '  ' + clause + ' ' + taskfrequency + '  ' + Remarks + '' + level4pdf + '' + uploadpdf + '</tr>';
                            $("#execution tbody").append(getdetails);
                            $("#taskFreq" + values.ID).val(values.taskfrequency);
                        }
                        
                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = '<tr> <td> <input sno=' + snos++ + ' type="button" name="&plus" value="+"  class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + sno++ + '</td><td> <div class="form-group"> <textarea type="text" name="" id="eName" class="eName form-control" style="width:527px"></textarea> </div></td><td> <div class="form-group"> <input type="text" name="" id="clause" class="clause form-control" style="width:110px"> </div></td><td> <div class="form-group"> <select name="" id="taskFreq" class="taskFreq form-control" style="width:120px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select> </div></td><td> <div class="form-group"> <textarea  type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px "></textarea> </div></td><td> <input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input   type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"></div> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#execution tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = '<tr> <td> <input sno=' + snos++ + ' type="button" name="&plus" value="+"  class="addrow border-0 add btn btn-icon btn-light btn-sm" /> </td><td>' + sno++ + '</td><td> <div class="form-group"><textarea type="text" name="" id="eName" class="eName form-control" style="width:527px"></textarea> </div></td><td> <div class="form-group"> <input type="text" name="" id="clause" class="clause form-control" style="width:110px"> </div></td><td> <div class="form-group"> <select name="" id="taskFreq" class="taskFreq form-control" style="width:120px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select> </div></td><td> <div class="form-group"> <textarea  type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px "></textarea> </div></td><td> <input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input   type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"></div> </td></tr>';
                        $("#execution tbody").append(getrowcontent);
                    }
                }
            }

        });
        tableexecution();

    }
    $("#createTemplateSubmit").submit(function () {
        $("#spinner").show();

        setTimeout(
            function () {
        debugger;
        var joballocation_ID = $("#ddjobid").val();
        var gettablelength = $("#execution tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var file = ""
                var checklevel4pdf = $("#execution tbody tr").eq(i).find(".alink").attr("href");
                if (checklevel4pdf) {
                    var checklevel4pdf = $("#execution tbody tr").eq(i).find(".alink").attr("href");
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
                    var checkannualpdf = $("#execution tbody tr").eq(i).find(".alink1").attr("href");
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
                var joballocation_ID = joballocation_ID;
                var ID = $("#execution tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var postdata = new FormData();
                if (checklevel4pdf != null) {
                    postdata.append('level4pdf', checklevel4pdf);
                } else {
                    postdata.append('level4file', file);
                }
                if (checkannualpdf != null) {
                    postdata.append('uploadpdf', checkannualpdf);
                } else {
                    postdata.append('pdffile', file1);
                }
                postdata.append('nameofthedoc', eName);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('clause', clause);
                postdata.append('ID', ID);
                postdata.append('taskfrequency', taskFreq);
                postdata.append('Remarks', annualRemark);
                //localStorage.setItem("JobID", joballocation_ID)
                postdata.append('AdminID', ADMIN_AUTH);


                $.ajax({
                    url: "https://api.pdca.in/Quality/CreateQualityExecution",
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
                            
                        }
                    }
                });


            };
            alert("Quality Execution Created Successfully");
            var Template = localStorage.getItem("Template_ID")
            window.location = "../qualityCompliance/QualityLevel-II.html?id=" + joballocation_ID + "&TemplateID=" + Template;
        }
            }, 5000);
    });
    $("#execution").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Quality/Delete_QualityExecution?AdminId=" + ADMIN_AUTH + "&ID=" + id + "",
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
    var currentSnos1 = 2;
    $("#execution").on("click", ".addrow1", function () {

      var getvalue = currentSnos1++;
        
        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <textarea type="text" name="" id="eName" class="eName form-control" style="width:527px"></textarea> </div></td><td> <div class="form-group"> <input type="text" name="" id="clause" class="clause form-control" style="width:110px"> </div></td><td> <div class="form-group"> <select name="" id="taskFreq" class="taskFreq form-control" style="width:120px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select> </div></td><td> <div class="form-group"> <textarea  type="text" name="" id="annualRemarks" class="annualRemarks w-200px form-control"></textarea> </div></td><td> <input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#execution tbody").append(getrowcontent);
    });
    $("#execution").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });
});

