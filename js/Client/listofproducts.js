"use strict";
// ----------------------------------- IMPORT STATEMENTS START ---------------------------------------//
import APIS from './api.js';
import reUsableFunctions from './reUsableFunctions.js';
import { convertIntToEnglish } from './reUsableFunctions.js';
import commonAjaxCalls from './commanAjaxCalls.js';


// ----------------------------------- IMPORT STATEMENTS END ---------------------------------------//
$(() => {



    debugger;
    const CLIENT_AUTH = localStorage.getItem("Client_auth");

    // ----------------------------------- GLOBAL DECLARATIONS  END ---------------------------------------//



    // ----------------------------------- APIs START ---------------------------------------//




    //const PRODUCE_LIST_URL = APIS.ListofProducts;
    const PRODUCT_LIST_URL = APIS.productList;
    const DELETE_PRODUCT_LIST_URL = APIS.deleteProductList;

    //const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    // ----------------------------------- APIs END ---------------------------------------//
    // -----------------------------------   list of product START ---------------------------------------//




    $.ajax({
        url: `${PRODUCT_LIST_URL}?ClientID=${CLIENT_AUTH}`,
        type: "GET",
        async: false,
        dataType: "JSON",
        crossDomain: true,
        success: (data) => {

            $("#table-id tbody").empty();
            if (Object.keys(data).length > 0) {

                $.each(data, (index, value) => {
                    const startDate = value.AnalysisStartDate ? moment(value.AnalysisStartDate).format('DD-MM-YYYY') : "N/A";
                    const endDate = value.AnalysisEndDate ? moment(value.AnalysisEndDate).format('DD-MM-YYYY') : "N/A";
                    var license = ""
                    if (value.Testreports == null) {
                        license = "N/A"
                    }
                    else {
                        license = "<a href='" + value.Testreports + "' target='_blank'><button class='btn btn-primary' type='button'>View</button> </a>"
                    }
                    let newRow = `<tr>
                                  <td>${++index}</td>
                                  <td>${value.Process_JobID}</td>
                                  <td>${value.productname}</td>
                                  <td>${value.CompanyName}</td>
                                  <td>${value.EmpName}</td>
                                  <td>${startDate}</td>
                                  <td>${endDate}</td>
                                  <td>${license}</td>
                                 <td>
    <span class="switch switch-primary">
        <label>
            <input type="checkbox" class="status-checkbox" disabled data-id="${value.ID}" 
                ${value.Status === "green" ? "checked" : ""}>
            <span></span>
        </label>
    </span>
</td>
                                 
                                 
                                  </tr>`;
                    $("#table-id tbody").append(newRow);
                });
            };
        }
    });

    // -----------------------------------   qualityjoblist END ---------------------------------------//


    // -----------------------------------   qualityjoblist DELETE START ---------------------------------------//

    
   

});
   // -----------------------------------   SERVICE OFFER DELETE END ---------------------------------------//
