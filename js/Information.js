"use strict";
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getServiceFormData } from './getFormData.js';
import { getPagination } from './pagination.js';
import commonAjaxCalls from './commanAjaxCalls.js';

$(document).ready(function () {

    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const ADMIN_NAME = localStorage.getItem('Admin_Name');
    if (ADMIN_NAME != "Admin" && ADMIN_NAME != "Manager") {
        $(".Informationlist").hide();
    };
    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    GetList();
    $("#table-id").on('click', ".Delete", function () {
        var Id = $(this).attr("id");
        const ADMIN_AUTH = localStorage.getItem("Admin_auth");
        $.ajax({
            url: "https://api.pdca.in/Regulation/Delete",
            type: "POST",
            data: { "AdminId": ADMIN_AUTH, "Id": Id },
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {
                
                if (data.responsecode == 1) {
                    $("#" + Id).closest("tr").css("background", "tomato");
                    $("#" + Id).closest("tr").css("color", "#fff");
                    $("#" + Id).closest("tr").fadeOut(1000, function () {
                        $(this).remove();
                    });
                    SUCCESS_MESSAGE("Service Deleted Successfully");

                } else {
                    ERROR_MESSAGE(data.responseObject)
                }

            }
        });
    });
    $("#table-id").on('click', ".edit", function () {

        var Id = $(this).attr("id");
        const ADMIN_AUTH = localStorage.getItem("Admin_auth");
        $.ajax({
            url: "https://api.pdca.in/Regulation/GetDetails?AdminId=" + ADMIN_AUTH +"&InfoId="+Id,
            type: "Get",
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {
                
                if (data != null) {
                    $("#addNewRole").modal("show");
                    $("#txtauthoname").val(data.authorityname);
                    $("#txtact").val(data.act);
                    $("#txtrules").val(data.Rules);
                    $("#txtRegulations").val(data.regulations);
                    $("#txtacturl").val(data.acturl);
                    $("#txtruleurl").val(data.ruleurl);
                    $("#txtregulationsurl").val(data.Regulationsurl);
                    $(".update").attr("id", data.id);
                    $(".update").show();
                    $("#addNewInfo").hide();
                }

            }
        });
    });
    $("#Infoform").submit(function () {
        const Authority = $("#txtauthoname").val();
        const ACT = $("#txtact").val();
        const rules = $("#txtrules").val();
        const Regualtions = $("#txtRegulations").val();
        const ACTURL = $("#txtacturl").val();
        const ruleurl = $("#txtruleurl").val();
        const Regulationsurl = $("#txtregulationsurl").val();
        
        var postdata = {
            "AdminId": ADMIN_AUTH,
            "authorityname": Authority,
            "act": ACT,
            "Rules": rules,
            "regulations": Regualtions,
            "acturl": ACTURL,
            "ruleurl": ruleurl,
            "Regulationsurl": Regulationsurl

        }
        $.ajax({
            url: "https://api.pdca.in/Regulation/Create",
            type: "POST",
            data: postdata,
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {

                if (data.responsecode == 1) {
                    $("#addNewRole").modal("hide");
                    GetList();
                }
            }
        });
    });
    $("#addNewCategoryBtn").click(function () {
        $(".update").hide();
        $("#addNewInfo").show();
        $("#addNewRole").modal("show");
        $(".txt").val("");
    })
    $(".update").click(function () {
        
        const id = $(this).attr("id");
        const Authority = $("#txtauthoname").val();
        const ACT = $("#txtact").val();
        const rules = $("#txtrules").val();
        const Regualtions = $("#txtRegulations").val();
        const ACTURL = $("#txtacturl").val();
        const ruleurl = $("#txtruleurl").val();
        const Regulationsurl = $("#txtregulationsurl").val();
        
        var postdata = {
            "id": id,
            "AdminId": ADMIN_AUTH,
            "authorityname": Authority,
            "act": ACT,
            "Rules": rules,
            "regulations": Regualtions,
            "acturl": ACTURL,
            "ruleurl": ruleurl,
            "Regulationsurl": Regulationsurl

        }
        $.ajax({
            url: "https://api.pdca.in/Regulation/Update",
            type: "POST",
            data: postdata,
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {

                if (data.responsecode == 1) {
                    $(".update").hide();
                    $("#addNewInfo").show();
                    $("#addNewRole").modal("hide");
                    GetList();
                }
            }
        });
    });
    function GetList() {
        $.ajax({
            url: "https://api.pdca.in/Regulation/GetList?AdminId=" + ADMIN_AUTH,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $("#table-id tbody").empty();
                var SNO = 1;
                $.each(data, function (Index, value) {
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var newrowContent = "<tr> <td>" + SNO++ + " </td><td>" + value.authorityname + " </td><td><a target='_blank' href='" + value.acturl + "'>" + value.act + "</a></td> <td><a  target='_blank' href='" + value.ruleurl + "'>" + value.Rules + " </td><td><a target='_blank' href='" + value.Regulationsurl + "'>" + value.regulations + "</a> </td><td><span class='edit' id='" + value.id + "'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></span> <span class='Delete' style='cursor:pointer' id='" + value.id + "'><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></span></td></tr>"
                        $("#table-id tbody").append(newrowContent);
                    }
                    else {
                        var newrowContent = "<tr> <td>" + SNO++ + " </td><td>" + value.authorityname + " </td><td><a target='_blank' href='" + value.acturl + "'>" + value.act + "</a></td> <td><a  target='_blank' href='" + value.ruleurl + "'>" + value.Rules + " </td><td><a target='_blank' href='" + value.Regulationsurl + "'>" + value.regulations + "</a> </td><td><span class='edit' id='" + value.id + "'><i class='menu-icon flaticon2-edit text-info cursor-pointer'></i></span></td></tr>"
                        $("#table-id tbody").append(newrowContent);
                    }
                    
                });
                $('#table-id').DataTable();
            }
        });
    }


});