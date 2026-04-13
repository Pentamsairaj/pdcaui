$(document).ready(function () {
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    getlist();
    getclients();
    getEmployees()
    function getlist() {
        $.ajax({
            url: "https://api.pdca.in/Regulation/GetcheckList?AdminId=" + ADMIN_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#ddlchecklist").empty();
                var defaultoption = '<option value="0">Select Checklist Template</option>';
                $("#ddlchecklist").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.id + '">' + val.titlename + '</option>'
                    $("#ddlchecklist").append(getdetails);
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
                $("#txtclientid").empty();
                var defaultoption = '<option value="0">Select Client</option>';
                $("#txtclientid").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.ClientID + '">' + val.Companyname + '</option>'
                    $("#txtclientid").append(getdetails);
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
                var defaultoption = '<option value="0">Select Employee</option>';
                $("#ddlEmployee").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.id + '">' + val.Name + '</option>'
                    $("#ddlEmployee").append(getdetails);
                });
            }
        });
    }
    function uploadfiles() {
        var getid = localStorage.getItem("newjobdoc");
        var rowCount = $('#pricingTable tbody tr').length;
        var fixedcount = 0;
        if (getid) {
            $('#pricingTable tbody tr').each(function () {
                fixedcount++;
                var currentRow = $(this).closest("tr");


                if (currentRow.find("td:eq(2)").find("input").hasClass("fileupload")) {
                    //var file = currentRow.find("td:eq(2)").find(".fileupload")[0].files[0];
                    //var reader = new FileReader();
                    //reader.readAsDataURL(file);
                    //reader.onload = function () {

                        const checklistid = getid;
                        const nameofthedocument = currentRow.find("td:eq(1)").find('textarea').val();
                    const modelformat = currentRow.find("td:eq(2)").find("input.fileupload").val();
                        var status = "";
                        const RowId = currentRow.find("td:eq(0)").find(".addRow").attr("id");

                        if (currentRow.find("td:eq(2)").find('.chk').is(":checked")) {
                            status = "active";
                        }
                        else {
                            status = "inactive";
                        }


                        /*const modelformat = reader.result;*/


                        var postdata = {
                            "jobforclientid": getid,
                            "nameofthedocument": nameofthedocument,
                            "filerequest": modelformat,
                            "AdminId": ADMIN_AUTH,
                            "tempid": RowId,
                            "statusgreenred": status
                        }

                        $.ajax({
                            url: "https://api.pdca.in/Job/Jobdocument_create",
                            type: "POST",
                            data: postdata,
                            async: false,
                            dataType: "json",
                            traditional: true,
                            crossDomain: true,
                            success: function (data) {
                                if (data.responsecode == 1) {
                                    if (fixedcount == rowCount) {
                                        window.location = "../regulations/jobslist.html";
                                    }
                                }
                            }
                        });
                    /*};*/

                }
                else {
                    const checklistid = getid;
                    const nameofthedocument = currentRow.find("td:eq(1)").find('textarea').val();
                    var status = "";
                    const RowId = currentRow.find("td:eq(0)").find(".addRow").attr("id");
                    const modelformat = currentRow.find("td:eq(2)").find("div div a").attr("href");
                    if (currentRow.find("td:eq(2)").find('.chk').is(":checked")) {
                        status = "active";
                    }
                    else {
                        status = "inactive";
                    }
                    var postdata = {
                        "jobforclientid": getid,
                        "nameofthedocument": nameofthedocument,
                        "modalformat": modelformat,
                        "AdminId": ADMIN_AUTH,
                        "id": RowId,
                        "statusgreenred": status
                    }
                    $.ajax({
                        url: "https://api.pdca.in/Job/Jobdocument_create",
                        type: "POST",
                        data: postdata,
                        async: false,
                        dataType: "json",
                        traditional: true,
                        crossDomain: true,
                        success: function (data) {
                            if (data.responsecode == 1) {
                                if (fixedcount == rowCount) {
                                    window.location = "../regulations/regulationStatus.html";
                                }
                            }
                        }
                    });
                }
            });
        }
    }

    $("#ddlchecklist").change(function () {
        var getid = $(this).val();
        localStorage.setItem("GetId", getid);
        var gettitle = $('#ddlchecklist :selected').text();
        $.ajax({
            url: "https://api.pdca.in/Regulation/GetcheckListDocs?AdminId=" + ADMIN_AUTH + "&Id=" + getid,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#pricingTable tbody").empty();
                $.each(data, function (index, values) {
                    var getdetails = '<tr><td class="text-center" id="col0"><span class="btn btn-outline-primary border-0 addRow" id="' + values.id + '"><i class="fas fa-plus-circle"></i></span></td><td id="col1" style="width:62%;"><textarea type="text" placeholder="document name" value= class="form-control txtdocname" style="width:100%; ">' + values.checklisttitle + '</textarea></td><td id="col2"><div class="row"><div class="col-md-6"><a href="' + values.modelformat + '"><button class="btn btn-primary" type="button">View</button></a></div><div class="col-md-6"><input type="checkbox" class="chk" name="select"></div></td><td><input type="file"  class="form-control Clientfile"/></td><td> <span class="deleteRow" style="cursor:pointer" id="' + values.id + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></span></td></tr>';

                    $("#pricingTable tbody").append(getdetails);
                })

            }
        });
    });

    let isSubmitting = false; // 🔒 global flag

    $("#btnsave").click(function () {

        if (isSubmitting) return; // 🚫 prevent double click

        const submitButton = $("#btnsave");

        var Id = localStorage.getItem("GetId");
        const clientuserid = $("#txtclientid").val();
        const companyname = $("#txtclientid :selected").text();
        const EmployeeId = $("#ddlEmployee").val();
        const checklisttemplate = $('#ddlchecklist :selected').text();
        const jobno = $('#ddljobno :selected').text();

        var postdata = {
            "checklisttemplate": checklisttemplate,
            "AdminId": ADMIN_AUTH,
            "checklisttemplateid": Id,
            "clientuserid": clientuserid,
            "companyname": companyname,
            "EmployeeId": EmployeeId,
            "jobno": jobno
        };

        // 🔒 lock + disable button
        isSubmitting = true;
        submitButton.prop("disabled", true);

        $.ajax({
            url: "https://api.pdca.in/Job/Job_Create",
            type: "POST",
            data: postdata,
            dataType: "json",
            traditional: true,
            crossDomain: true,

            beforeSend: function () {
                $("#spinnerOverlay").css("display", "flex");
                $("body").css("pointer-events", "none");
            },

            success: function (data) {
                if (data.responsecode == 1) {
                    alert("Job Created Successfully");
                    localStorage.setItem("newjobdoc", data.responseObject);
                    uploadfiles();
                } else {
                    alert(data.responsemessage);
                }
            },

            error: function (err) {
                console.error(err);
                alert("Something went wrong!");
            },

            complete: function () {
                // 🔓 unlock
                isSubmitting = false;

                // 🔵 restore UI
                $("#spinnerOverlay").hide();
                $("body").css("pointer-events", "auto");
                submitButton.prop("disabled", false);
            }
        });

    });

    $("#pricingTable").on("click", ".addRow", function () {
        var addrow = '<tr><td class="text-center"><span class="btn btn-outline-primary border-0 addRow"><i class="fas fa-plus-circle"></i></span></td><td><textarea type="text" name="" placeholder="document name" class="form-control txtdocname" style="width:400px"></textarea></td><td><input type="url" class="form-control fileupload"></td><td><span class="switch switch-primary"><label><input type="checkbox" id="chk" name="select"><span></span></label></span></td><td><span class="deleteRow" style="cursor:pointer"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></span></td></tr>'
        $("#pricingTable tbody").append(addrow);
    })
    $("#pricingTable").on("click", ".deleteRow", function () {
        $(this).closest("tr").remove();
    });
});