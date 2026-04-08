"use strict";
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getServiceFormData } from './getFormData.js';
import { getPagination } from './pagination.js';
import commonAjaxCalls from './commanAjaxCalls.js';

$(document).ready(function () {

    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    GetList();
    $("#table-iddoc").on('click', ".Delete", function () {
        var Id = $(this).attr("id");
        const ADMIN_AUTH = localStorage.getItem("Admin_auth");
        $.ajax({
            url: "https://api.pioneerfoods.in/Regulation/Checklist_Delete",
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
                    SUCCESS_MESSAGE("Checklist Deleted Successfully");

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
            url: "https://api.pioneerfoods.in/Regulation/GetcheckListDetails?AdminId=" + ADMIN_AUTH + "&Id=" + Id,
            type: "Get",
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {
                
                if (data != null) {

                    $(".update").attr("id", data.id);
                    $(".update").show();
                    $("#addNewInfo").hide();
                    $("#txttitlename").val(data.titlename);
                }

            }
        });
    });
    function uploadfiles() {
        var getid = localStorage.getItem("newchkid");
        var rowCount = $('#pricingTable tbody tr').length;
        var fixedcount = 0;
        if (getid) {
            $('#pricingTable tbody tr').each(function () {
                fixedcount++;
                var currentRow = $(this).closest("tr");
                var file = currentRow.find("td:eq(2)").find(".fileupload")[0].files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    
                    const checklistid = getid;
                    const checklisttitle = currentRow.find("td:eq(1)").find('input').val(); // get current row 1st TD
                   
                    const modelformat = reader.result;
                    var postdata = {
                        "checklistid": getid,
                        "checklisttitle": checklisttitle,
                        "modelformat": modelformat,
                        "AdminId": ADMIN_AUTH
                    }
                    $.ajax({
                        url: "https://api.pioneerfoods.in/Regulation/ChecklistDoc_Create",
                        type: "POST",
                        data: postdata,
                        dataType: "json",
                        traditional: true,
                        crossDomain: true,
                        success: function (data) {
                            if (data.responsecode == 1) {
                                if (fixedcount == rowCount) {
                                    window.location = "../regulations/checklist.html";
                                }
                            }
                        }
                    });
                };




            });
        }


    }

    $("#formsubmit").submit(function () {
        
        const titlename = $("#txttitlename").val();
        const docList = "";
        var postdata = {
            "titlename": titlename,
            "AdminId": ADMIN_AUTH
        }
        $.ajax({
            url: "https://api.pioneerfoods.in/Regulation/Checklist_Create",
            type: "POST",
            data: postdata,
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {
                if (data.responsecode == 1) {
                    localStorage.setItem("newchkid", data.responseObject);
                    uploadfiles();
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
            url: "https://api.pioneerfoods.in/Regulation/Update",
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
            url: "https://api.pioneerfoods.in/Regulation/GetcheckList?AdminId=" + ADMIN_AUTH,
            type: "GET",
            dataType: "JSON",
            async: false,
            crossDomain: true,
            success: function (data) {
                $("#table-iddoc tbody").empty();
                var SNO = 1;
                $.each(data, function (Index, value) {
                    
                    var completedDate = new Date(parseInt(value.createdon.replace("/Date(", "").replace(")/")));
                    var dd = completedDate.getDate();
                    var mm = completedDate.getMonth() + 1; //January is 0! 
                    var yyyy = completedDate.getFullYear();
                    if (dd < 10) { dd = '0' + dd }
                    if (mm < 10) { mm = '0' + mm }
                    var datef = + dd + '/' + mm + '/' + yyyy;
                    var newrowContent = "<tr> <td>" + SNO++ + " </td><td>" + value.titlename + " </td><td>" + datef + "</td> <td> <span class='Delete' style='cursor:pointer' id='" + value.id + "'><i class='menu-icon flaticon2-rubbish-bin  text-danger'></i></span><span><a target='_blank' href='../leadManagement/PreviewClient.html?ClientID=" + value.id + "''><i class='menu-icon flaticon-technology text-warning cursor-pointer'></i></a></span></td></tr>"
                    $("#table-iddoc tbody").append(newrowContent);
                });
            }
        });
    }
    $("#pricingTable").on("click",".addRow",function () {
        var addrow = '<tr><td class="text-center" id="col0"> <span class="btn btn-outline-primary border-0 addRow"  id="addRow"> <i class="fas fa-plus-circle"></i> </span> </td><td id="col1"><input type="text" name="" id="" class="form-control cco"></td><td id="col3">  <input type="file" class="fileupload" required /></td><td><span class="Delete deleteRow" style="cursor:pointer"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></span></td></tr>'
        $("#pricingTable tbody").append(addrow);
    })
    $("#pricingTable").on("click", ".deleteRow", function () {
        $(this).closest("tr").remove();
    });

});