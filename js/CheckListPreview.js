"use strict";
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getServiceFormData } from './getFormData.js';
import { getPagination } from './pagination.js';
import commonAjaxCalls from './commanAjaxCalls.js';

$(document).ready(function () {
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const url = window.location.search;
    const params = new URLSearchParams(url);
    $("#lblname").text();
    const TemplateId = params.get("id");
    const title = params.get("title");
    $("#lblname").text(title);
    $.ajax({
        url: "https://api.pioneerfoods.in/Regulation/GetcheckListDocs?AdminId=" + ADMIN_AUTH + "&Id=" + TemplateId,
        type: "GET",
        contentType: false, // Not to set any content header
        processData: false, // Not to process data
        //data: fileData,
        success: function (data) {
            var sno = 1;
            if ($("#printTable").length > 0) {
                $("#printTable tbody").empty();
                $.each(data, function (index, values) {
                    var getdetails = '<tr><td>' + sno++ + '</td><td id="col1" style="width:80%"><textarea placeholder="document name" class="form-control txtdocname" >' + values.checklisttitle + '</textarea></td></tr>';
                    $("#printTable tbody").append(getdetails);
                })
            } else {
                $("#pricingTable tbody").empty();
                $.each(data, function (index, values) {
                    var getdetails = '<tr><td>' + sno++ + '</td><td id="col1" style="width:80%"><textarea placeholder="document name" class="form-control txtdocname" >' + values.checklisttitle + '</textarea></td><td> <span class="deleteRow" style="cursor:pointer" id="' + values.id + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></span><span class="mx-md-3" style="cursor:pointer" id="' + values.id + '"><a href="' + values.modelformat + '"><button class="btn btn-primary" type="button">View</button></a></span></td></tr>';
                    $("#pricingTable tbody").append(getdetails);
                });
            }
        }
    });

});