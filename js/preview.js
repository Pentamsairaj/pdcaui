$(() => {


    let templateData = JSON.parse(localStorage.getItem("templateData"));
    let pricingData = JSON.parse(localStorage.getItem("pricingData"));
    let totalAmount = localStorage.getItem("totalAmount");
    let logo = localStorage.getItem("templateLogo");
    let companyLogo = localStorage.getItem("companyLogo");
    let signature = localStorage.getItem("signatureLogo");


    document.title = `PDCA4M | ${templateData.templatename}`


    if (templateData.logo != "") {
        $("#templateLogo").attr("src", `${templateData.logo}`);
    } else {
        $("#templateLogo").attr("src", `${logo}`);
    }

    if (templateData.companylogo != "") {
        $("#companyLogo").attr("src", `${templateData.companylogo}`);
    } else {
        $("#companyLogo").attr("src", `${companyLogo}`);
    }

    if (templateData.signature) {
        $("#signature").attr("src", `${templateData.signature}`);
    } else {
        $("#signature").attr("src", `${signature}`);
    }


    $("#templateTitle").html(templateData.templatename);
    $("#company").html(templateData.company);
    $("#address").html(templateData.address);
    $("#emailid").html(templateData.emailid);
    $("#phone").html(templateData.phone);
    $("#GSTNumber").html(templateData.GSTNumber);
    $("#team_membername").html(templateData.team_membername);
    $("#Team_emailid").html(templateData.Team_emailid);
    $("#Team_phone").html(templateData.Team_phone);
    $("#CompanyName").html(templateData.CompanyName);
    $("#Team_Address").html(templateData.Team_Address);
    $("#Team_GSTNumber").html(templateData.Team_GSTNumber);
    $("#TeamBank").html(templateData.TeamBank);
    $("#TeamBank_Account").html(templateData.TeamBank_Account);
    $("#Team_IFSC_Code").html(templateData.Team_IFSC_Code);

    if (templateData.isscopeofwork == false) {
        $("#isscopeofwork").hide();
    } else {
        let scopeOfWork = $(templateData.scopeofwork);
        $("#scopeofwork").html(scopeOfWork);
    }

    pricingData.map((item) => {
        let newRow = `<tr><td>${item.s_no}</td><td>${item.product_service}</td><td>${item.product_Hscode}</td><td>${item.product_price}</td><td>${item.product_qnty}</td><td>${item.product_amt}</td></tr>`;

        $(".pricing_details tbody").append(newRow);
    })

    let tandc = $(templateData.tandc);
    $("#tandC").html(tandc);


    $("#totalAmt").html(totalAmount);

});
