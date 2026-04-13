$(document).ready(function () {
    const url = window.location.search;
    const params = new URLSearchParams(url);

    const ID = params.get("id");
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    getlist();
    function getlist() {
        $.ajax({
            url: "https://api.pdca.in/Job/GetJobDetails?AdminId=" + ADMIN_AUTH + "&Id=" + ID,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#txtclientid").val(data.clientuserid);
                $("#txtjobid").val(data.jobid);
                $("#txtcompanyname").val(data.companyname);
                $("#inputhidden").val(data.id);
                getdocs(data.id);

                $.ajax({
                    url: "https://api.pdca.in/Job/GetJobUploadDetails?AdminId=" + ADMIN_AUTH + "&Id=" + data.id,
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    async: false,
                    success: function (subdata) {
                        $("#licenseid").val(subdata.id);
                        $("#txtperson").val(subdata.pdcacontactperson);
                        $("#txtemail").val(subdata.email);
                        $("#txtphone").val(subdata.contactno);
                        $("#todate").val(subdata.todate);
                        $("#frmdate").val(subdata.fromdate);
                        const AnnualFilingDate = subdata.AnualFillingDate
                            ? moment(parseInt(subdata.AnualFillingDate.replace(/\/Date\((\d+)\)\//, '$1')))
                                .format('YYYY-MM-DD')
                            : "N/A";
                        const Duedate = subdata.Duedate
                            ? moment(parseInt(subdata.Duedate.replace(/\/Date\((\d+)\)\//, '$1')))
                                .format('YYYY-MM-DD')
                            : "N/A";
                        $("#fillingDate").val(AnnualFilingDate);
                        $("#dueDate").val(Duedate);
                        if (subdata.licencecopyupload) {
                            var licencedoc_view = '<a target="_blank" href="' + subdata.licencecopyupload + '"><button class="btn btn-primary" type="button">View</button></a>';
                            $("#licencedoc_view").append(licencedoc_view);
                        } else {
                            $("#licencedoc_view").append("No document uploaded");
                        }
                        if (subdata.annualfillingdoc) {
                            var annualfillingdoc = '<a target="_blank" href="' + subdata.annualfillingdoc + '"><button class="btn btn-primary" type="button">View</button></a>';
                            $('#annualfillingdoc_view').append(annualfillingdoc);
                        } else {
                            $("#annualfillingdoc_view").append("No document uploaded");
                        }
                    }
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


                if (currentRow.find("td:eq(3)").find("input").hasClass("Clientfile")) {
                    //var file = currentRow.find("td:eq(3)").find(".Clientfile")[0].files[0];
                    //var reader = new FileReader();
                    try {
                    //    reader.readAsDataURL(file);
                    //    reader.onload = function () {

                            const checklistid = getid;
                            const nameofthedocument = currentRow.find("td:eq(1)").find('textarea').val();
                        const modelformat = currentRow.find("td:eq(3)").find("input.Clientfile").val();
                            var status = "";
                            const RowId = currentRow.find("td:eq(0)").find(".addRow").attr("id");

                            if (currentRow.find("td:eq(2)").find('.chk').is(":checked")) {
                                status = "active";
                            }
                            else {
                                status = "inactive";
                            }


                            //const modelformat = reader.result;


                            var postdata = {
                                "jobforclientid": getid,
                                "nameofthedocument": nameofthedocument,
                                "filerequest": modelformat,
                                "AdminId": ADMIN_AUTH,
                                "tempid": RowId,
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
                        /*};*/
                    } catch (e) {
                        var reader = new FileReader();
                        const checklistid = getid;
                        const nameofthedocument = currentRow.find("td:eq(1)").find('textarea').val();
                        var status = "";
                        const RowId = currentRow.find("td:eq(0)").find(".addRow").attr("id");

                        if (currentRow.find("td:eq(2)").find('.chk').is(":checked")) {
                            status = "active";
                        }
                        else {
                            status = "inactive";
                        }


                        const modelformat = reader.result;


                        var postdata = {
                            "jobforclientid": getid,
                            "nameofthedocument": nameofthedocument,
                            "AdminId": ADMIN_AUTH,
                            "tempid": RowId,
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
                        "filerequest": modelformat,
                        "AdminId": ADMIN_AUTH,
                        "id": RowId,
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
                                    window.location = "../regulations/regulationStatus.html";
                                }
                            }
                        }
                    });
                }
            });
        }
    }

    function getdocs(id) {

        $.ajax({
            url: "https://api.pdca.in/Job/GetJobListDocs?AdminId=" + ADMIN_AUTH + "&Id=" + id,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#pricingTable tbody").empty();
                var showDvService = true;

                $.each(data, function (index, values) {
                    // Check if modalformat is null or empty
                    if (!values.document) {
                        showDvService = false;
                    }

                    var getdetails = '';
                    var docView = values.document != null ?
                        '<div class="py-2"><a target="_blank" href="' + values.document + '"><button class="btn btn-primary" type="button">View</button></a></div>'
                        : '';

                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        getdetails = '<tr>' +
                            '<td class="text-center" id="col0"><span class="btn btn-outline-primary border-0 addRow" id="' + values.id + '"><i class="fas fa-plus-circle"></i></span></td>' +
                            '<td id="col1" style="width:70%;"><textarea placeholder="document name" class="form-control txtdocname" style="width:100%;">' + values.nameofthedocument + '</textarea></td>' +
                            '<td id="col2"><a target="_blank" href="' + values.modalformat + '"><button class="btn btn-primary" type="button">View</button></a></td>' +
                            '<td><input type="url" class="form-control Clientfile"/>' + docView + '</td>' +
                            '<td><span class="deleteRows" style="cursor:pointer" id="' + values.id + '"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></span></td>' +
                            '</tr>';
                    } else {
                        getdetails = '<tr>' +
                            '<td class="text-center" id="col0"><span class="btn btn-outline-primary border-0 addRow" id="' + values.id + '"><i class="fas fa-plus-circle"></i></span></td>' +
                            '<td id="col1" style="width:70%;"><textarea placeholder="document name" class="form-control txtdocname" style="width:100%;">' + values.nameofthedocument + '</textarea></td>' +
                            '<td id="col2"><a target="_blank" href="' + values.modalformat + '"><button class="btn btn-primary" type="button">View</button></a></td>' +
                            '<td><input type="url" class="form-control Clientfile"/>' + docView + '</td>' +
                            '</tr>';
                    }

                    $("#pricingTable tbody").append(getdetails);
                });

                // After looping through all data
                if (!showDvService) {
                    $("#dvService").hide();
                } else {
                    $("#dvService").show();
                }


            }
        });

    }

    let isUpdating = false; // 🔒 lock flag

    $("#btnsave").click(function () {

        if (isUpdating) return; // 🚫 prevent multiple clicks

        const submitButton = $("#btnsave");

        var Id = $("#inputhidden").val();
        const companyname = $("#txtcompanyname").val();
        const client = $("#txtclientid").val();
        const checklisttemplate = $('#ddlchecklist :selected').text();
        const jobno = $('#txtjobid').val();
        var fillingDate = $("#fillingDate").val();
        var dueDate = $("#dueDate").val();

        var postdata = {
            "AdminId": ADMIN_AUTH,
            "id": Id,
            "companyname": companyname,
            "clientuserid": client,
            "jobno": jobno,
            "Duedate": dueDate,
            "AnualFillingDate": fillingDate
        };

        // 🔒 lock + disable button
        isUpdating = true;
        submitButton.prop("disabled", true);

        $.ajax({
            url: "https://api.pdca.in/Job/Job_Update",
            type: "POST",
            data: postdata,
            dataType: "json",
            traditional: true,
            crossDomain: true,

            beforeSend: function () {
                $("#spinner").css("display", "flex");
                $("body").css("pointer-events", "none");
            },

            success: function (data) {
                if (data.responsecode == 1) {
                    alert("Job Updated Successfully");
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
                isUpdating = false;

                // 🔵 restore UI
                $("#spinner").hide();
                $("body").css("pointer-events", "auto");
                submitButton.prop("disabled", false);
            }
        });

    });
    $("#btnupdate").click(function () {
        debugger;
        var fromdate = $("#frmdate").val();
        var id = $("#licenseid").val();
        var todate = $("#todate").val();
        var email = $("#txtemail").val();
        var person = $("#txtperson").val();
        var contactinfo = $("#txtphone").val();
        var file = $("#fileuploadli")[0].files[0];
        var file1 = $("#annualFilling")[0].files[0];
        var fillingDate = $("#fillingDate").val();
        var dueDate = $("#dueDate").val();

        var filedata = new FormData();
        filedata.append("fileup", file);

        var extension1 = $("#annualFilling").val().split('.').pop().toUpperCase();
        if (extension1 != "PNG" && extension1 != "JPG" && extension1 != "GIF" && extension1 != "JPEG" && extension1 != "PDF" && extension1 != "DOCX" && extension1 != "DOC" && extension1 != "XLSX") {
            alert('Invalid file format.');
            return false;
        }

        var extension = $("#fileuploadli").val().split('.').pop().toUpperCase();
        if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG" && extension != "PDF" && extension != "DOCX" && extension != "DOC" && extension != "XLSX") {
            alert('Invalid file format.');
            return false;
        }

        filedata.append('Duedate', dueDate),
        filedata.append('AnualFillingDate', fillingDate),
        filedata.append("AnualfileDoc", file1),
        filedata.append('todate', todate);
        filedata.append('fromdate', fromdate);
        filedata.append('jobforclientid', ID);
        filedata.append('AdminId', ADMIN_AUTH);
        filedata.append('contactno', contactinfo);
        filedata.append('licencecopyupload', file);
        filedata.append('id', id);
        filedata.append('email', email);
        filedata.append('pdcacontactperson', person);
        $(function () {
            $.ajax({
                url: "https://api.pdca.in/Job/JobLisenceUpload",
                type: "POST",
                data: filedata,
                async: false,
                dataType: "json",
                processData: false,
                crossDomain: true,
                cache: false,
                contentType: false,
                beforeSend: function () {
                    // Show the spinner before the AJAX call starts
                    $("#spinner").show();
                },
                complete: function () {
                    // Hide the spinner after the AJAX call completes (regardless of success or failure)
                    $("#spinner").hide();
                },
                success: function (data) {
                    if (data.responsecode == 1) {
                        alert("uploaded successfully");
                        $("#dvService").hide();
                    }
                }
            });
        })
    });
    $("#pricingTable").on("click", ".addRow", function () {
        var addrow = '<tr><td class="text-center" id="col0"><span class="btn btn-outline-primary border-0 addRow"><i class="fas fa-plus-circle"></i></span></td><td id="col1"><input type="text" name="" placeholder="document name" class="form-control txtdocname"></td><td id="col2" colspan="2"><div class="row"><div class="col-md-9"><input type="url" class="form-control fileupload"></div><div class="col-md-3"><input type="checkbox" class="chk" name="select" /></div></div></td><td> <span class="deleteRow" style="cursor:pointer"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></span></td></tr>'
        $("#pricingTable tbody").append(addrow);
    })
    $("#pricingTable").on("click", ".deleteRow", function () {
        $(this).closest("tr").remove();
    });
    $("#pricingTable").on("click", ".deleteRows", function () {
        $(this).closest("tr").remove();

        var Id = $(this).attr("id");
        $.ajax({
            url: "https://api.pdca.in/Job/Jobdocument_Delete?AdminId=" + ADMIN_AUTH + "&Id=" + Id,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                alert("Deleted Successfully");
                getdocs(ID);
            }
        });

    });
});