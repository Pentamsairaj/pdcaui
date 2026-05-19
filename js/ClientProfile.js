$(document).ready(function () {
    $("#dvService").hide();
    $("#dvProduct").hide();
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    Actegorylist(ADMIN_AUTH);
    Categorylist(ADMIN_AUTH);

    const url = window.location.search;
    const params = new URLSearchParams(url);

    // Get values
    const Client_Name = params.get("name");
    const company_Name = params.get("companyName");
    const phonenum = params.get("phone");
    const emailID = params.get("email");
    const type = params.get("type");
    const address = params.get("address");
    const gst_Number = params.get("gstNumber");

    function setIfExists(selector, value) {
        if (value) {
            $(selector).val(value);
        }
    }

    setIfExists("#txtcompanyname", company_Name);
    setIfExists("#txtcompanyaddress", address);
    setIfExists("#txtemail", emailID);
    setIfExists("#txtphone", phonenum);
    setIfExists("#txtClientName", Client_Name);
    setIfExists("#txtGST", gst_Number);





    $("#ddlbusinesstype").change(function () {
        debugger;
        var selected = $(this).val();
        if (selected == "Product") {
            $("#dvService").hide();
            $("#dvProduct").show();
        }
        else if (selected == "Service") {
            $("#dvService").show();
            $("#dvProduct").hide();

        }
    });

    $("#frmcat").submit(function () {
        const ADMIN_AUTH = localStorage.getItem("Admin_auth");
        var catname = $("#txtCategory").val();
        $.ajax({
            url: "https://api.pdca.in/Client/CreateCategory",
            type: "POST",
            data: { "AdminId": ADMIN_AUTH, "name": catname },
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {

                if (data.responsecode == 1) {
                    alert("Category added successfully");
                    Categorylist(ADMIN_AUTH);
                }
            }
        });
    });

    $("#tblcategory ").on('click', ".btndelete", function () {
        var Id = $(this).attr("id");
        $.ajax({
            url: "https://api.pdca.in/Client/DeleteCategory",
            type: "POST",
            data: { "AdminId": ADMIN_AUTH, "Id": Id },
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {

                if (data.responsecode == 1) {
                    alert("Category deleted successfully");
                    Categorylist(ADMIN_AUTH);
                }
            }
        });
    });

    $("#frmact").submit(function () {
        var catname = $("#txtactivity").val();
        $.ajax({
            url: "https://api.pdca.in/Client/ClientActivityCreate",
            type: "POST",
            data: { "AdminId": AdminId, "name": catname },
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {
                if (data.responsecode == 1) {
                    alert("Activity added successfully");
                    Actegorylist(ADMIN_AUTH);
                }
            }
        });
    });

    $("#tblactivity").on('click', ".btndeleteact", function () {
        var Id = $(this).attr("id");
        $.ajax({
            url: "https://api.pdca.in/Client/DeleteClientActivity",
            type: "POST",
            data: { "AdminId": ADMIN_AUTH, "Id": Id },
            dataType: "json",
            traditional: true,
            crossDomain: true,
            success: function (data) {
                if (data.responsecode == 1) {
                    alert("Activity deleted successfully");
                    Actegorylist(ADMIN_AUTH);
                }
            }
        });
    });

    $("#pphone, #txtphone, #tphone").change(function () {
        var val = $(this).val();
        if (/^\d{10}$/.test(val)) {
        } else {
            alert("Invalid number; must be ten digits")
            return false
        }
    })
    function Categorylist(ADMIN_AUTH) {
        $.ajax({
            url: "https://api.pdca.in/Client/CategoryList?AdminId=" + ADMIN_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#tblcategory tbody").empty();
                $("#Scategoryddl").empty();
                $("#PddlCategory").empty();
                $.each(data, function (index, val) {
                    $("#tblcategory tbody").append("<tr><td>" + val.name + "</td><td><button id='" + val.id + "' class='btndelete'><span class='fa fa-trash'></span></button></td></tr>")
                    $("#Scategoryddl").append($("<option value=" + val.id + ">" + val.name + "</option>").attr("value", val.name).text(val.name));
                    $("#PddlCategory").append($("<option value=" + val.id + ">" + val.name + "</option>").attr("value", val.name).text(val.name));

                });
            }
        });
    }

    function Actegorylist(ADMIN_AUTH) {
        $.ajax({
            url: "https://api.pdca.in/Client/ClientActivityList?AdminId=" + ADMIN_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#tblactivity tbody").empty();
                $("#sActivityDDl").empty();
                $("#PActivity").empty();
                $.each(data, function (index, val) {

                    $("#tblactivity tbody").append("<tr><td>" + val.name + "</td><td><button id='" + val.id + "' class='btndeleteact'><span class='fa fa-trash'></span></button></td></tr>")
                    $("#PActivity").append($("<option value=" + val.id + ">" + val.name + "</option>").attr("value", val.name).text(val.name));
                    $("#sActivityDDl").append($("<option value=" + val.id + ">" + val.name + "</option>").attr("value", val.name).text(val.name));

                })
            }
        });
    }


    let isSubmitting = false;

    $("#ClientCreate").submit(function (e) {
        e.preventDefault();

        // 🚫 Prevent multiple submissions
        if (isSubmitting) return;

        isSubmitting = true;

        const submitButton = $("#createInvoiceSubmit button[type='submit']");
        submitButton.prop("disabled", true);

        $("#spinnerOverlay").css("display", "flex");
        $("body").css("pointer-events", "none");

        // ================= GET FORM VALUES =================

        const ComapnayName = $("#txtcompanyname").val();
        const CompanyAddress = $("#txtcompanyaddress").val();
        const Email = $("#txtemail").val();
        const Phone = $("#txtphone").val();
        const GST = $("#txtGST").val();

        var imagestr = $("#inputGroupFile01").val();
        var imagestr1 = $("#firmregistraionfile").val();
        var imagestr2 = $("#partnershipfirm").val();
        var imagestr3 = $("#certificatefirm").val();
        var imagestr4 = $("#MOA").val();
        var imagestr5 = $("#AOA").val();
        var imagestr6 = $("#IEC").val();

        var ddlbusinesstype = $("#ddlbusinesstype").val();

        var clienttype = ddlbusinesstype == "Product" ? 1 : 0;

        var servicename = $("#ddlServicename").val();

        var str = "";
        $.each(servicename, function (item, val) {
            str += val + ",";
        });

        str = str.replace(/,\s*$/, "");

        var subscription = $("#ddlSubscritption").val();

        var pname = $("#pname").val();
        var pdesignation = $("#pdesignation").val();
        var pphone = $("#pphone").val();
        var pEmail = $("#pEmail").val();

        var tTechnocalWorksName = $("#tTechnocalWorksName").val();
        var tDesignation = $("#tDesignation").val();
        var temail = $("#temail").val();
        var tphone = $("#tphone").val();

        var drivelink = $("#drivelink").val();

        // ================= FIRST API =================

        var postdata = {
            "AdminId": ADMIN_AUTH,
            "Companyname": ComapnayName,
            "drivelink": drivelink,
            "Address": CompanyAddress,
            "email": Email,
            "phonenumber": Phone,
            "GSTNumber": GST,
            "GSTDocUrl": imagestr,
            "TypeofBusiness": ddlbusinesstype,
            "Servicename": str,
            "SubscriptionType": subscription,
            "FirmregistrationdocURL": imagestr1,
            "PartnershipdeepURL": imagestr2,
            "CertificateofIncorpURL": imagestr3,
            "AOAUrl": imagestr5,
            "IECCOdeUrl": imagestr6,
            "NameAcc": pname,
            "DesignationAcc": pdesignation,
            "EmailidAcc": pEmail,
            "MOA": imagestr4,
            "PhoneAcc": pphone,
            "NameTW": tTechnocalWorksName,
            "PhoneTW": tphone,
            "DesignationTW": tDesignation,
            "EmailidTW": temail,
            "clientype": clienttype
        };

        $.ajax({
            url: "https://api.pdca.in/Client/Create",
            type: "POST",
            data: postdata,
            dataType: "json",
            traditional: true,
            crossDomain: true,

            success: function (data) {

                // ❌ API failed
                if (data.responsecode != 1) {

                    alert(data.responsemessage || "Something went wrong");

                    resetFormState();
                    return;
                }

                var getid = data.responseObject;

                // ================= SECOND API DATA =================

                var PostDataClienttype = {};

                if (data.responsemessage == "1") {

                    PostDataClienttype = {
                        "AdminId": ADMIN_AUTH,
                        "CLientId": getid,
                        "ProductName": $("#PProductname").val(),
                        "Activity": $("#PActivity").val(),
                        "Customernames": $("#pCustomerName").val(),
                        "Capacity": $("#Pcapacity").val(),
                        "Categoryname": $("#PddlCategory").val()
                    };

                } else {

                    PostDataClienttype = {
                        "AdminId": ADMIN_AUTH,
                        "CLientId": getid,
                        "Services": $("#txtsservice").val(),
                        "Activity": $("#sActivityDDl").val(),
                        "Customernames": $("#txtscustomername").val(),
                        "Categoryname": $("#Scategoryddl").val()
                    };
                }

                // ================= SECOND API =================

                $.ajax({
                    url: "https://api.pdca.in/Client/CreateClientType",
                    type: "POST",
                    data: PostDataClienttype,
                    dataType: "json",
                    traditional: true,
                    crossDomain: true,

                    success: function (response) {

                        if (response.responsecode == 1) {

                            alert("Client Created Successfully");

                            window.location.href = "/leadManagement/clientsList.html";

                        } else {

                            alert("Unable to save client details right now. Please try again.");

                            resetFormState();
                        }
                    },

                    error: function () {

                        alert("Something went wrong while creating the client. Please try again.");

                        resetFormState();
                    }
                });
            },

            error: function () {

                alert("Something went wrong while creating the client. Please try again.");

                resetFormState();
            }
        });

        // ================= RESET FUNCTION =================

        function resetFormState() {

            isSubmitting = false;

            submitButton.prop("disabled", false);

            $("#spinnerOverlay").hide();

            $("body").css("pointer-events", "auto");
        }
    });
});