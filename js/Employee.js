"use strict"

import reUsableFunctions from './reUsableFunctions.js';

$(() => {

    const PAGE_RELOAD = reUsableFunctions.pageReload;
    $("#btnUpdate").hide();
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const BASE_URL = "https://api.pioneerfoods.in/" /*BASEURL*/;

    if (ADMIN_AUTH == null) {
        window.location = "../teamlogin.html";
    }
    getemployeelist();
    getdatatable();
    /* $(".edit").click(function () {*/
    $(document).on('click', '.edit', function (e) {
        e.preventDefault();
        var getid = $(this).attr("id");
        $.ajax({
            url: BASE_URL + "/Admin/MyProfile?id=" + getid,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $("#addNewRole").modal("show");
                $("#empphone").val(data.phone);
                $("#empname").val(data.Name);
                $("#empemail").val(data.Email);
                $("#ddlrole").val(data.RoleId);
                $("#btnUpdate").show();
                $("#hiddenid").val(data.id);
                $("#btnCreate").hide();
            }
        });

    });
    getdatatable();
    function getemployeelist() {
        $.ajax({
            url: BASE_URL + "/Admin/EmployeeList?id=" + ADMIN_AUTH,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $("#table-id tbody").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<tr> <td>" + value.EmployeeID + " </td><td>" + value.Name + " </td><td>" + value.Email + "</td><td>" + value.phone + " </td><td>" + value.Rolename + " </td> </td><td><span class='edit' id='" + value.id + "'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></span> <span class='Delete' style='cursor:pointer' id='" + value.id + "'><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></span></td></tr>"
                    $("#table-id tbody").append(newrowContent);
                });
                $('#table-id').DataTable();
            }
        });
    }
    function getdatatable() {

        $.ajax({
            url: BASE_URL + "/Role/Index?AdminId=" + ADMIN_AUTH,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $("#ddlrole").empty();
                $.each(data, function (Index, value) {
                    var newrowContent = "<option value='" + value.id + "'> " + value.name + "</option> "
                    $("#ddlrole").append(newrowContent);
                });
            }
        });

    };

    $("#btnCreate").one("click", function (e) {
        e.preventDefault();
        var phone = $("#empphone").val();
        var name = $("#empname").val();
        var email = $("#empemail").val();
        var Roleid = $("#ddlrole").val();
        const submitButton = $("#btnCreate");
        submitButton.prop("disabled", true);
        $.ajax({
            url: BASE_URL + "/Admin/CreateEmployee",
            type: "POST",
            data: { "phone": phone, "Name": name, "Email": email, "RoleId": Roleid, "id": ADMIN_AUTH },
            dataType: "json",
            traditional: true,
            success: function (data) {
                if (data.responsecode == 1) {
                    $("#addNewRole").modal("hide");
                    getemployeelist();
                    PAGE_RELOAD();

                }
            },
            complete: () => {
                submitButton.prop("disabled", false);
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "/Admin/teamlogin.html";
                    return;
                }
            }

        });
    });

    $("#btnUpdate").click(function () {
        var Id = $("#hiddenid").val();
        var phone = $("#empphone").val();
        var name = $("#empname").val();
        var email = $("#empemail").val();
        var Roleid = $("#ddlrole").val();
        $.ajax({
            url: BASE_URL + "/Admin/UpdateEmployee",
            type: "POST",
            data: { "phone": phone, "Name": name, "Email": email, "RoleId": Roleid, "id": Id },
            dataType: "json",
            traditional: true,
            success: function (data) {
                if (data.responsecode == 1) {
                    $("#addNewRole").modal("hide");
                    PAGE_RELOAD();
                }
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.href = "/Admin/teamlogin.html";
                    return;
                }
            }

        });
        $("#btnUpdate").hide();

        $("#btnCreate").show();
    });

    $("#table-id").on('click', ".Delete", function () {
        var r = confirm("Are you sure do you want to Delete!");
        if (r == true) {
            var getid = $(this).attr("id");
            $.ajax({
                url: BASE_URL + "/Admin/Delete?Id=" + getid + "&AdminId=" + ADMIN_AUTH + "",
                type: "GET",
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