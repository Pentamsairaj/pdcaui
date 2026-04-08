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
    $("#ddjobid").change(function () {

        var getjoballocationid = $(this).val();
        getlist(getjoballocationid);
    });
    function getlist(getjoballocationid) {

        $.ajax({
            url: "https://api.pioneerfoods.in/ClientQuality/QualityExecutionList?ClientID=" + CLIENT_AUTH + "&joballocation_ID=" + getjoballocationid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#execution tbody").empty();
                if (data != 0) {
                    debugger;
                    $.each(data, function (index, values) {
                        if (values.nameofthedoc == null) {
                            var nameofthedoc = '<td><div class=form-group><input type="text" name="" id="eName" class="eName form-control w-200px"></div></td>'
                        }
                        else {
                            var nameofthedoc = '<td><div class=form-group><input type="text" name="" id="eName" value="' + values.nameofthedoc + '" class="eName form-control w-200px" disabled></div></td>';
                        }
                        if (values.level4pdf == null) {
                            var level4pdf = '<td><input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var level4pdf = '<td><a class="alink" target="_blank"  href="' + values.level4pdf + '"><button class="btn btn-primary" type="button">View</button></a></td>';
                        }
                        if (values.clause == null) {
                            var clause = '<td><div class=form-group><input type="text" name="" id="clause" class="clause form-control  w-150px"></div></td>'
                        }
                        else {
                            var clause = '<td><div class=form-group><input type="text" name="" id="clause" value="' + values.clause + '" class="clause form-control  w-150px" disabled></div></td>';
                        }
                        if (values.taskfrequency == null) {
                            var taskfrequency = '<td><div class=form-group><select name="" id="taskFreq" class="taskFreq form-control w-150px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select></div></td>'
                        }
                        else {
                            var taskfrequency = '<td><div class=form-group><select name="" id="taskFreq' + values.ID + '" class="taskFreq  form-control w-150px" disabled> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select></div></td>';
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
                            var Remarks = '<td><div class=form-group><textarea type="text" name="" id="annualRemarks" class="annualRemarks form-control w-200px" disabled>' + values.Remarks + '</textarea></div></td>';
                        }
                        var getdetails = '<tr><td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td>' + nameofthedoc + ' ' + level4pdf + ' ' + clause + ' ' + taskfrequency + ' ' + uploadpdf + ' ' + Remarks + ' </tr>';
                        $("#execution tbody").append(getdetails);
                        $("#taskFreq" + values.ID).val(values.taskfrequency);
                    });
                }
                else {

                    var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="text" name="" id="eName" class="eName form-control w-200px"> </div></td><td> <input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="clause" class="clause form-control w-150px"> </div></td><td> <div class="form-group"> <select name="" id="taskFreq" class="taskFreq form-control w-150px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select> </div></td><td> <div class="form-group"> <input   type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"></div> </td></tr>';
                    $("#execution tbody").append(getrowcontent);

                }
            }

        });


    }
    $("#createTemplateSubmit").submit(function () {

        debugger;
        var joballocation_ID = $("#ddjobid").val();
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
                var joballocation_ID = joballocation_ID;
                var ID = $("#execution tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var postdata = new FormData();
                postdata.append('level4file', file);
                postdata.append('pdffile', file1);
                postdata.append('nameofthedoc', eName);
                postdata.append('joballocation_ID', joballocation_ID);
                postdata.append('clause', clause);
                postdata.append('ID', ID);
                postdata.append('taskfrequency', taskFreq);
                postdata.append('Remarks', annualRemark);
                localStorage.setItem("JobID", joballocation_ID)
                postdata.append('ClientID', CLIENT_AUTH);


                $.ajax({
                    url: "https://api.pioneerfoods.in/ClientQuality/Update_QualityExecution",
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
            alert("Quality Execution Created Successfully");
            window.location = "/client/qualityCompliance/QualityLevel-II.html?id=" + joballocation_ID;
        }

    });
    //$("#execution").on("click", ".deleteRow", function () {

    //    var id = $(this).attr("id");
    //    if (id != undefined) {
    //        var result = confirm("Are you Sure? You Want to Delete");
    //        if (result) {
    //            $.ajax({
    //                url: "https://api.pioneerfoods.in/Quality/Delete_QualityExecution?ClientID=" + CLIENT_AUTH + "&ID=" + id + "",
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

    $("#execution").on("click", ".addrow", function () {

        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td> <div class="form-group"> <input type="text" name="" id="eName" class="eName form-control w-200px"> </div></td><td> <input type="file" class="level4pdffile w-200px" id="level4pdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="clause" class="clause form-control w-150px"> </div></td><td> <div class="form-group"> <select name="" id="taskFreq" class="taskFreq form-control w-150px"> <option value="daily">Daily</option> <option value="monthly">Monthly</option> <option value="quarterly">Quarterly</option> <option value="halfYea">Half Yearly</option> <option value="yearly">Yearly</option> </select> </div></td><td> <input type="file" class="annualpdffile w-200px" id="annualpdffile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea  type="text" name="" id="annualRemarks" class="annualRemarks w-200px form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#execution tbody").append(getrowcontent);
    });
    $("#execution").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });

});

