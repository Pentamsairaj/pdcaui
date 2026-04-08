"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import { getServiceFormData } from './getFormData.js';
import commonAjaxCalls from './commanAjaxCalls.js';


// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {
    // ----------------------------------- GLOBAL DECLARATIONS START ---------------------------------------//
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");

    getProductRequestList();
    function getProductRequestList() {
        debugger;
        $.ajax({
            url: "https://api.pioneerfoods.in/Client/ClientRequestlist?AuthorId=" + ADMIN_AUTH,
            type: "GET",
            contentType: false,
            processData: false,
            beforeSend: (() => {
                $(".spinner").show();
                $("#kt_content").css("opacity", "0.1");
            }),
            success: (data) => {
                $("#Project-forms-list tbody").empty();

                $.each(data, (index, value) => {
                    var createdon = value.createdon ? moment(value.createdon).format('DD-MM-YYYY') : "N/A";
                    let newRow = `<tr>
                                  <td>${++index}</td>
                                  <td>${createdon}</td>
                                  <td>${value?.Client?.NameAcc}</td>
                                  <td>${value?.Client?.PhoneAcc}</td>
                                  <td>${value?.Client?.ClientID}</td>
                                  <td>${value.requesttype}</td>
                                  <td>${value.Servicetype}</td>
                                  <td>${value.Varient}</td>
                                  </tr>`;
                    $("#Project-forms-list tbody").append(newRow);
                });

                $('#Project-forms-list').DataTable();
            },
            complete: (() => {
                $(".spinner").hide();
                $("#kt_content").css("opacity", "");
            }),
        });
    }
});
