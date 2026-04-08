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
    const CLIENT_AUTH = localStorage.getItem("Client_auth");

    const SUCCESS_MESSAGE = reUsableFunctions.SuccessMessage;
    const ERROR_MESSAGE = reUsableFunctions.ErrorMessage;
    const PHONE_NUMBER = reUsableFunctions.validatePhone;
    const EMAIL_VALIDATE = reUsableFunctions.validateEmail;

    const request = [
        { Id: 'Service-PFS', value: "Service-PFS" },
        { Id: 'Product-SFL', value: "Product-SFL" },
    ];
    const ServiceType = [
        {
            Id: 'Regulatory - FSSAI License support', value: "Regulatory - FSSAI License support"
        },
        {
            Id: 'Regulatory - BIS registration support', value: "Regulatory - BIS registration support"
        },
        {
            Id: 'Regulatory - AGMARK certification support', value: "Regulatory - AGMARK certification support"
        },
        {
            Id: 'Regulatory - APEDA Registration support', value: "Regulatory - APEDA Registration support"
        },
        {
            Id: 'Regulatory - SPECEBOARD registration support', value: "Regulatory - SPECEBOARD registration support"
        },
        {
            Id: 'Regulatory - EIC / EIA registration support', value: "Regulatory - EIC / EIA registration support"
        },
        {
            Id: 'Regulatory - USFDA facility registration', value: "Regulatory - USFDA facility registration"
        },

        {
            Id: 'QUALITY - HACCP', value: "QUALITY - HACCP"
        },
        {
            Id: 'QUALITY - BRC', value: "QUALITY - BRC"
        },
        {
            Id: 'QUALITY - ISO22000', value: "QUALITY - ISO22000"
        },
        {
            Id: 'QUALITY - FAMI QS', value: "QUALITY - FAMI QS"
        },
        {
            Id: 'QUALITY - FSSC22000', value: "QUALITY - FSSC22000"
        },

        {
            Id: 'QUALITY - HALAL', value: "QUALITY - HALAL"
        },
        {
            Id: 'QUALITY - KOSHER', value: "QUALITY - KOSHER"
        },

    ]
    const ProductType = [
        { Id: 'Food Product Development - Product Prototype', value: "Food Product Development - Product Prototype" },
        { Id: 'Food Product Development - Product Formula Improvement', value: "Food Product Development - Product Formula Improvement" },
        { Id: 'Food Product Development - Product Applications', value: "Food Product Development - Product Applications" },
        { Id: 'Food Testing - Microbiological Testing', value: "Food Testing - Microbiological Testing" },
        { Id: 'Food Testing - Chemical Testing', value: "Food Testing - Chemical Testing" },
        { Id: 'Food Testing - Physical Testing', value: "Food Testing - Physical Testing" },
        { Id: 'Food Testing - Packaging Testing', value: "Food Testing - Packaging Testing" },
        { Id: 'Food Testing - Sensory Testing', value: "Food Testing - Sensory Testing" },
        { Id: 'Food Shelf life Study-Accelerated', value: "Food Shelf life Study-Accelerated" },
        { Id: 'Food Shelf life Study - Real Time', value: "Food Shelf life Study - Real Time" },
        { Id: 'Food Industry labelling/Menu - Food Formulator check', value: "Food Industry labelling/Menu - Food Formulator check" },
        { Id: 'Food Industry labelling/Menu - Nutritional calculator', value: "Food Industry labelling/Menu - Nutritional calculator" },

    ]
    getProductRequestList();
    function getProductRequestList() {
        debugger;
        $.ajax({
            url: "https://api.pioneerfoods.in/Client/ClientRequestlist?AuthorId=" + CLIENT_AUTH,
            type: "GET",
            contentType: false,
            processData: false,
            success: (data) => {
                $("#Project-forms-list tbody").empty();
                $.each(data, (index, value) => {
                    let newRow = `<tr>
                                  <td>${++index}</td>
                                  <td>${value.requesttype}</td>
                                  <td>${value.Servicetype}</td>
                                  <td>${value.Varient}</td>
                                  </tr>`;
                    $("#Project-forms-list tbody").append(newRow);
                });

                $("#Project-forms-list").DataTable();
            },
        });
    }


    $("#Phone").blur(function () {
        const phone = $(this).val();
        if (PHONE_NUMBER(phone)) {
            $("#phoneFeedback").hide();
            $(this).removeClass("is-invalid").addClass("is-valid");
        } else {
            $("#phoneFeedback").show();
            $(this).removeClass("is-valid").addClass("is-invalid");
        }
    });

    $("#Email").blur(function () {
        const email = $(this).val();
        if (EMAIL_VALIDATE(email)) {
            $(this).removeClass("is-invalid").addClass("is-valid");
        } else {
            $(this).removeClass("is-valid").addClass("is-invalid");
        }
    });

    $("#requestType").html(
        `<option value="">Request Type</option>` + request.map((item) => `<option value="${item.Id}">${item.value}</option>`).join("")
    );

    $("#requestType").on('change', function () {
        const type = $("#requestType").val();
        let productType;
        if (type == "Service-PFS") {
            productType = `<option value="">Service Type</option>` + ServiceType.map((item) => `<option value="${item.Id}">${item.value}</option>`).join("");
        }
        else if (type == "Product-SFL") {
            productType = `<option value="">Service Type</option>` + ProductType.map((item) => `<option value="${item.Id}">${item.value}</option>`).join("");
        }
        else {
            productType = `<option value="">Please Choose </option>`;
        }
        $("#serviceType").html(productType);
        $("#serviceType").selectpicker('refresh');

    })
    $("#createRequestForm").submit((event) => {
        debugger;
        event.preventDefault();
        var selectedactivities = $("#serviceType").val();
        var idlst = "";
        $.each(selectedactivities, function (key, value) {
            idlst += value + ",";
        })
        idlst = idlst.replace(/,\s*$/, "");
        var requestData = {
            Varient: $("#Variant").val(),
            AuthorId: CLIENT_AUTH,
            requesttype: $("#requestType").val(),
            Servicetype: idlst,
        }
        $.ajax({
            url: "https://api.pioneerfoods.in/Client/CreateRequest",
            type: "POST",
            data: requestData,
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {
                if (data.responsecode == 1) {
                    SUCCESS_MESSAGE("Successfully submitted request");
                    setTimeout(() => {
                        location.href = './ProductRequestFormList.html';
                    }, 1000)

                }
                else {
                    ERROR_MESSAGE(data.responsemessage);
                }
            },
        });
    });
});
