$(document).ready(function () {
    const url = window.location.search;
    const params = new URLSearchParams(url);

    const ClientID = params.get("ClientID");
    $("#dvService").hide();
    $("#dvProduct").hide();
    const CLIENT_AUTH = localStorage.getItem("Client_auth");
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    //Actegorylist(ADMIN_AUTH);
    //Categorylist(ADMIN_AUTH);
    var getbusinesstype = localStorage.getItem("BusinessType");
    if (getbusinesstype != null) {
        if (getbusinesstype == "Product") {
            $("#dvService").hide();
            $("#dvProduct").show();
        }
        else if (getbusinesstype == "Service") {
            $("#dvService").show();
            $("#dvProduct").hide();
        }
    }
    getDetails();
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
    function getDetails() {
        $.ajax({
            url: "https://api.pdca.in/Client/ClientGetDetails?ClientID=" + CLIENT_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#txtcompanyname").val(data.Companyname);
                $("#txtcompanyaddress").val(data.Address);
                $("#txtemail").val(data.email);
                $("#txtphone").val(data.phonenumber);
                $("#txtGST").val(data.GSTNumber);
                $("#drive_link").val(data.drivelink);
                $("#ddlbusinesstype").val(data.TypeofBusiness);
                var array = data.Servicename.split(',');
                var loop="";

                $.each(array, function (index, val) {
                    if (val !="undefined") {

                        loop += "<li>" + val + "</li>" 
                    }
                })
                $("#ddlServicename").append(loop);
                $("#ddlSubscritption").val(data.SubscriptionType);
                $("#pname").val(data.NameAcc);
                $("#pdesignation").val(data.DesignationAcc);
                $("#pphone").val(data.PhoneAcc);
                $("#tTechnocalWorksName").val(data.NameTW);
                $("#tDesignation").val(data.DesignationTW);
                $("#temail").val(data.EmailidTW);
                $("#tphone").val(data.PhoneTW);
                $("#pEmail").val(data.EmailidAcc);
                if (data.GSTDocUrl) {
                    $("#lblGST").html("<a target='_blank' href='" + data.GSTDocUrl + "'>" + data.GSTDocUrl + "</a>");

                }
                if (data.FirmregistrationdocURL) {
                    $("#lblfirmregistraionfile").html("<a target='_blank' href='" + data.FirmregistrationdocURL + "'>"+ data.FirmregistrationdocURL +"</a>");

                }
                if (data.PartnershipdeepURL) {
                    $("#lblpartnershifirm").html("<a target='_blank' href='" + data.PartnershipdeepURL + "'>" + data.PartnershipdeepURL + "</a>");

                }
                if (data.CertificateofIncorpURL) {
                    $("#lblCertificatefrim").html("<a target='_blank' href='" + data.CertificateofIncorpURL + "'>" + data.CertificateofIncorpURL +"</a>");

                }
                
                if (data.MOA) {
                    $("#lblMOA").html("<a target='_blank' href='" + data.MOA + "'>" + data.MOA + "</a>");

                }
                if (data.AOAUrl) {
                    $("#lblAOA").html("<a target='_blank' href='" + data.AOAUrl + "'>" + data.AOAUrl+"</a>");

                }
                if (data.IECCOdeUrl) {
                    $("#lblIEC").html("<a target='_blank' href='" + data.IECCOdeUrl + "'>" + data.IECCOdeUrl + "</a>");

                }
                
                $.ajax({
                    url: "https://api.pdca.in/Client/ClientGetDetailsClienttype?ClientID=" + CLIENT_AUTH,
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    //data: fileData,
                    success: function (dataC) {
                        if (data.clientype == 1) {
                            $("#dvService").hide();
                            $("#dvProduct").show();
                            $("#PddlCategory").text(dataC.Categoryname);
                            $("#PActivity").text(dataC.Activity);
                            $("#PProductname").val(dataC.ProductName);
                            $("#Pcapacity").val(dataC.Capacity);
                            $("#pCustomerName").val(dataC.Customernames);

                        }
                        else {
                            $("#dvService").show();
                            $("#dvProduct").hide();
                            $("#Scategoryddl").text(dataC.Categoryname);
                            $("#sActivityDDl").text(dataC.Activity);
                            $("#txtsservice").val(dataC.Services);
                            $("#txtscustomername").val(dataC.Customernames);

                        }
                    }


                });


            }
        });
    }
   });