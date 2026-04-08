$(document).ready(function () {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    
    const ID = params.get("id");

    const CLIENT_AUTH = localStorage.getItem("Client_auth");
    getlist();
    function getlist() {
        $.ajax({
            url: "https://api.pdca.in/ClientJob/GetJobDetails?ClientID=" + CLIENT_AUTH + "&Id=" + ID,
            type: "GET",
            async:false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#txtclientid").val(data.clientuserid);
                if (data.clientuserid != null) {
                    $("#txtclientid").attr('disabled', 'disabled');
                }
                $("#txtjobid").val(data.jobid);
                if (data.jobid != null) {
                    $("#txtjobid").attr('disabled', 'disabled');
                }
                $("#txtcompanyname").val(data.companyname);
                if (data.companyname != null) {
                    $("#txtcompanyname").attr('disabled', 'disabled');
                }
                $("#inputhidden").val(data.id);
                if (data.id != null) {
                    $("#inputhidden").attr('disabled', 'disabled');
                }
                getdocs(data.id);
                
                $.ajax({
                    url: "https://api.pdca.in/ClientJob/GetJobUploadDetails?ClientID=" + CLIENT_AUTH + "&Id=" + ID,
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    async: false,
                    success: function (subdata) {
                        $("#licenseid").val(subdata.id);
                        if (subdata.id != null) {
                            $("#licenseid").attr('disabled', 'disabled');
                        }
                        $("#txtperson").val(subdata.pdcacontactperson);
                        if (subdata.pdcacontactperson != null) {
                            $("#txtperson").attr('disabled', 'disabled');
                        }
                        $("#txtemail").val(subdata.email);
                        if (subdata.email != null) {
                            $("#txtemail").attr('disabled', 'disabled');
                        }
                        $("#txtphone").val(subdata.contactno);
                        if (subdata.contactno != null) {
                            $("#txtphone").attr('disabled', 'disabled');
                        }
                        $("#todate").val(subdata.todate);
                        if (subdata.todate != null) {
                            $("#todate").attr('disabled', 'disabled');
                        }
                        $("#frmdate").val(subdata.fromdate);
                        if (subdata.fromdate != null) {
                            $("#frmdate").attr('disabled', 'disabled');
                        }
                        const AnnualFilingDate = subdata.AnualFillingDate
                            ? moment(parseInt(subdata.AnualFillingDate.replace(/\/Date\((\d+)\)\//, '$1')))
                                .format('YYYY-MM-DD')
                            : "N/A";
                        const Duedate = subdata.Duedate
                            ? moment(parseInt(subdata.Duedate.replace(/\/Date\((\d+)\)\//, '$1')))
                                .format('YYYY-MM-DD')
                            : "N/A";
                        if (subdata.AnualFillingDate != null) {
                            $("#fillingDate").val(AnnualFilingDate);
                            $("#fillingDate").attr('disabled', 'disabled');
                        }
                       
                        if (subdata.Duedate != null) {
                            $("#fillingDate").val(Duedate);
                            $("#fillingDate").attr('disabled', 'disabled');
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
                    var file = currentRow.find("td:eq(3)").find(".Clientfile")[0].files[0];
                    var reader = new FileReader();
                    try {
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                            
                            const checklistid = getid;
                            const nameofthedocument = currentRow.find("td:eq(1)").find('input').val();
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
                        };
                    } catch (e) {
                        var reader = new FileReader();
                        const checklistid = getid;
                        const nameofthedocument = currentRow.find("td:eq(1)").find('input').val();
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
                    const nameofthedocument = currentRow.find("td:eq(1)").find('input').val();
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
                        "tempid":RowId,
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
            url: "https://api.pdca.in/ClientJob/JobDocsList?ClientID=" + CLIENT_AUTH + "&Id=" + ID,
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

                   
                        getdetails = '<tr>' +
                            '<td class="text-center" id="col0"><span class="btn btn-outline-primary border-0 addRow" id="' + values.id + '" disabled><i class="fas fa-plus-circle"></i></span></td>' +
                            '<td id="col1" style="width:70%;"><textarea placeholder="document name" class="form-control txtdocname" disabled style="width:100%;">' + values.nameofthedocument + '</textarea></td>' +
                            '<td id="col2"><a target="_blank" href="' + values.modalformat + '"><button class="btn btn-primary" type="button">View</button></a></td>' +
                            '<td><input type="file" class="form-control Clientfile" disabled/>' + docView + '</td>' +
                            '</tr>';
                    

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
    $("#btnsave").click(function () {
        
        var Id = $("#inputhidden").val();
        const companyname = $("#txtcompanyname").val();
        const client = $("#txtclientid").val();
        const checklisttemplate = $('#ddlchecklist :selected').text();
        const jobno = $('#ddljobno :selected').text();
        var postdata = {
            "AdminId": ADMIN_AUTH,
            "id": Id,
            "companyname": companyname,
            "clientuserid": client,
            "jobno": jobno
        }
        $.ajax({
            url: "https://api.pdca.in/Job/Job_Update",
            type: "POST",
            data: postdata,
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {
                if (data.responsecode == 1) {
                    alert("Job Updated Successfully");
                    localStorage.setItem("newjobdoc", data.responseObject);
                    uploadfiles();
                }
            }
        });

    });
    $("#btnupdate").click(function () {
        
        var fromdate = $("#frmdate").val();
        var id = $("#licenseid").val();
        var todate = $("#todate").val();
        var email = $("#txtemail").val();
        var person = $("#txtperson").val();
        var contactinfo = $("#txtphone").val();
        var file = $("#fileuploadli")[0].files[0];
        var filedata = new FormData();
        filedata.append("fileup", file);
        var extension = $("#fileuploadli").val().split('.').pop().toUpperCase();
        if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG" && extension != "PDF" && extension != "DOCX" && extension != "DOC" && extension != "XLSX") {
            alert('Invalid file format.');
            return false;
        }
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
        var addrow = '<tr><td class="text-center" id="col0"><span class="btn btn-outline-primary border-0 addRow"><i class="fas fa-plus-circle"></i></span></td><td id="col1"><input type="text" name="" placeholder="document name" class="form-control txtdocname"></td><td id="col2"><div class="row"><div class="col-md-6"><input type="file" class="form-control fileupload"></div><div class="col-md-6"><input type="checkbox" class="chk" name="select" /></div></div></td><td></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>'
        $("#pricingTable tbody").append(addrow);
        $("#pricingTable").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    })
    //$("#pricingTable").on("click", ".deleteRows", function () {
    //    $(this).closest("tr").remove();
     
    //    var Id = $(this).attr("id");
    //    $.ajax({
    //        url: "https://api.pdca.in/Job/Jobdocument_Delete?AdminId=" + ADMIN_AUTH + "&Id=" + Id,
    //        type: "GET",
    //        contentType: false, // Not to set any content header
    //        processData: false, // Not to process data
    //        //data: fileData,
    //        success: function (data) {
    //            alert("Deleted Successfully");
    //            getdocs(ID);
    //        }
    //    });
       
    //});
});

