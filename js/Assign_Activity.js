$(document).ready(function () {
    const AUTHOR_ID = localStorage.getItem("Admin_auth");
    const BASE_URL = "https://api.pioneerfoods.in/" /*BASEURL*/;
 
    var ProjectAuth = AUTHOR_ID;
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var msg = params.get('param');
    if (msg != null) {

        $("#validationdiv").text(msg);
        $("#validationdiv").slideDown();
        $("#validationdiv").delay(10000).slideUp();
        $("#validationdiv").css("background", "orange");
    }
    getassignedroleslist();
    getdatatable();
    function getdatatable() {
        
        $.ajax({
            url: BASE_URL +"/Role/Index?AdminId=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
         
            crossDomain: true,
            success: function (data) {
                $("#ddlrole").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<option value='" + value.id + "'> " + value.name + "</option> "
                    $("#ddlrole").append(newrowContent);
                });
            }
        });
        $.ajax({
            url: BASE_URL +"/Activity/Index?AdminId=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async:false,
            crossDomain: true,
            success: function (data) {
                $("#ddlactivity").empty();
                $.each(data, function (Index, value) {
                    var newrowContentass = "<option value='" + value.id + "'> " + value.name + "</option> "
                    $("#ddlactivity").append(newrowContentass);
                });
             /*   $('#ddlactivity').multiselect('rebuild');*/
            }
        });
    };

    $("#assignrole").submit(function () {
        var getrole = $("#ddlrole").find(":selected").val();
        var selectedactivities = $("#ddlactivity").val();
        var idlst = "";
        $.each(selectedactivities, function (key, value) {
            idlst += value + ",";
        })
        idlst = idlst.replace(/,\s*$/, "");
        $.ajax({
            url: BASE_URL+"/Role/Assignrole",
            type: "POST",
            data: { "role_id": getrole, "activity_id": idlst, "AdminId": ProjectAuth },
            dataType: "json",
            traditional: true,
            success: function (data) {
                if (data.responsecode == 1) {
                    $("#addNewActivity").modal("hide");
                    window.location.href = "/roleManagement/assignActivity.html";
                }
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "/Admin/teamlogin.html";
                    return;
                }
            }

        }); 
    });
    //---------------------------------------Category List Method-----------------------------------------//
    function getassignedroleslist() {
        
        $.ajax({
            url: BASE_URL+"/Role/Assignactivitylist?AdminId=" + ProjectAuth,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                
                $("#tblassign tbody").empty();
                $("#table-id tbody").empty();
                
                $.each(data, function (Index, value) {
                    $.ajax({
                        url: BASE_URL +"/Role/Edit?AdminId=" + ProjectAuth + "&id=" + value.role_id,
                        type: "GET",
                        dataType: "JSON",
                        async: false,
                        crossDomain: true,
                        success: function (datasec) {
                           
                            $.ajax({
                                url: BASE_URL+"/Activity/Edit?AdminId=" + ProjectAuth + "&id=" + value.activities_id,
                                type: "GET",
                                dataType: "JSON",
                                async: false,
                                crossDomain: true,
                                success: function (response) {
                                    var newrowContent = "<tr><td> " + datasec.name + " </td><td> " + response.name + " </td><td><button id=" + value.id + " class='btn assign_Delete'><i class='fa fa-trash'></i>&nbsp;&nbsp;</button></td></tr>"
                                    $("#table-id tbody").append(newrowContent);
                                }
                            });
                        }
                    });
                });
                $('#table-id').DataTable();
            }
        });
    };

    //---------------------------------------Delete Method-----------------------------------------//
    $("#table-id").on('click', ".assign_Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: BASE_URL+"/Role/AssignDelete?id" + getid + "&AdminId=" + ProjectAuth + "",
                type: "POST",
                data: { "id": getid },
                dataType: "JSON",
                crossDomain: true,
                success: function (data) {
                    if (data.responsecode == 1) {
                        $("#" + getid).closest("tr").css("background", "tomato");
                        $("#" + getid).closest("tr").css("color", "#fff");
                        $("#" + getid).closest("tr").fadeOut(1000, function () {
                            $(this).remove();
                        });
                    }

                },
                error: function (xhr) {
                    //
                }
            });
        }
    });



});

