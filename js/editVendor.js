$(document).ready(function () {
    const url = window.location.search;
    const params = new URLSearchParams(url);

    const VendorId = params.get("VendorID");
    $("#dvService").hide();
    $("#dvProduct").hide();
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    Actegorylist(ADMIN_AUTH);
    Categorylist(ADMIN_AUTH);
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

    function getDetails() {
        $.ajax({
            url: "https://api.pdca.in/Vendor/VendorGetDetails?AdminId=" + ADMIN_AUTH + "&ClientId=" + VendorId,
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
                $("#IFSC_Code").val(data.IFSC_Code);
                $("#BankName").val(data.BankName);
                $("#Bank_Account").val(data.Bank_Account);
                $("#drivelink").val(data.drivelink);
                $("#txtid").val(data.ClientID);
                $("#ddlbusinesstype").val(data.TypeofBusiness);
                var array = data.Servicename.split(',');
                $('#ddlServicename').multiselect('destroy');
                $("#ddlServicename").multiselect('select', array, true);
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
                    $("#lblGST").html("<a target='_blank' href='" + data.GSTDocUrl + "'>View</a>");

                }
                if (data.FirmregistrationdocURL) {
                    $("#lblfirmregistraionfile").html("<a target='_blank' href='" + data.FirmregistrationdocURL + "'>View</a>");

                }
                if (data.PartnershipdeepURL) {
                    $("#lblpartnershifirm").html("<a target='_blank' href='" + data.PartnershipdeepURL + "'>View</a>");

                }
                if (data.CertificateofIncorpURL) {
                    $("#lblCertificatefrim").html("<a target='_blank' href='" + data.CertificateofIncorpURL + "'>View</a>");

                }
                
                if (data.MOA) {
                    $("#lblMOA").html("<a target='_blank' href='" + data.MOA + "'>View</a>");

                }
                if (data.AOAUrl) {
                    $("#lblAOA").html("<a target='_blank' href='" + data.AOAUrl + "'>View</a>");

                }
                if (data.IECCOdeUrl) {
                    $("#lblIEC").html("<a target='_blank' href='" + data.IECCOdeUrl + "'>View</a>");

                }
                
                $.ajax({
                    url: "https://api.pdca.in/Vendor/GetDetailsClienttype?AdminId=" + ADMIN_AUTH + "&ClientId=" + VendorId,
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    //data: fileData,
                    success: function (dataC) {
                        if (data.clientype == 1) {
                            $("#dvService").hide();
                            $("#dvProduct").show();
                            $("#PddlCategory").val(dataC.Categoryname);
                            $("#PActivity").val(dataC.Activity);
                            $("#PProductname").val(dataC.ProductName);
                            $("#Pcapacity").val(dataC.Capacity);
                            $("#pCustomerName").val(dataC.Customernames);

                        }
                        else {
                            $("#dvService").show();
                            $("#dvProduct").hide();
                            $("#Scategoryddl").val(dataC.Categoryname);
                            $("#sActivityDDl").val(dataC.Activity);
                            $("#txtsservice").val(dataC.Services);
                            $("#txtscustomername").val(dataC.Customernames);

                        }
                    }
                });
            }
        });
    }
    $("#ddlbusinesstype").change(function () {
        
        var selected = $(this).val(); // get selected options value.
        if (selected == "Product") {
            localStorage.setItem("BusinessType", selected);
            $("#dvService").hide();
            $("#dvProduct").show();
        }
        else if (selected == "Service") {
            localStorage.setItem("BusinessType", selected);
            $("#dvService").show();
            $("#dvProduct").hide();

        }
    });

    $("#frmcat").submit(function () {
        const ADMIN_AUTH = localStorage.getItem("Admin_auth");
        var catname = $("#txtCategory").val();
        $.ajax({
            url: "https://api.pdca.in/Vendor/CreateCategory",
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
        const ADMIN_AUTH = localStorage.getItem("Admin_auth");

        $.ajax({
            url: "https://api.pdca.in/Vendor/DeleteCategory",
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
        const AdminId = localStorage.getItem("Admin_auth");
        var catname = $("#txtactivity").val();
        $.ajax({
            url: "https://api.pdca.in/Vendor/VendorActivityCreate",
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
        const ADMIN_AUTH = localStorage.getItem("Admin_auth");
        $.ajax({
            url: "https://api.pdca.in/Vendor/DeleteVendorActivity",
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


    function Categorylist(ADMIN_AUTH) {
        $.ajax({
            url: "https://api.pdca.in/Vendor/CategoryList?AdminId=" + ADMIN_AUTH,
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
            url: "https://api.pdca.in/Vendor/VendorActivityList?AdminId=" + ADMIN_AUTH,
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


    $("#fileuploads").click(function () {
        $("#imagestr").val("");
        $("#imagestr1").val("");
        $("#imagestr2").val("");
        $("#imagestr3").val("");
        $("#imagestr4").val("");
        $("#imagestr5").val("");
        $("#imagestr6").val("");
        var file = $("#inputGroupFile01")[0].files[0];
        var file1 = $("#firmregistraionfile")[0].files[0];
        var file2 = $("#partnershipfirm")[0].files[0];
        var file3 = $("#certificatefirm")[0].files[0];
        var file4 = $("#MOA")[0].files[0];
        var file5 = $("#AOA")[0].files[0];
        var file6 = $("#IEC")[0].files[0];
        if (file) {

            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {

                $("#imagestr").val(reader.result);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
        if (file1) {
            var reader1 = new FileReader();
            reader1.readAsDataURL(file1);
            reader1.onload = function () {
                //console.log(reader.result);
                //
                $("#imagestr1").val(reader1.result);
            };
            reader1.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
        if (file2) {
            // imagestr2 = $("#dvpartnershipfirm").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
            var reader2 = new FileReader();
            reader2.readAsDataURL(file2);
            reader2.onload = function () {
                //console.log(reader.result);
                //
                $("#imagestr2").val(reader2.result);
            };
            reader2.onerror = function (error) {
                console.log('Error: ', error);
            };


        }
        if (file3) {
            // imagestr3 = $("#dvcertificatefirm").css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');

            var reader3 = new FileReader();
            reader3.readAsDataURL(file3);
            reader3.onload = function () {
                //console.log(reader.result);
                //
                // imagestr3 = reader.result;
                $("#imagestr3").val(reader3.result);
            };
            reader3.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
        if (file4) {
            
            var reader4 = new FileReader();
            reader4.readAsDataURL(file4);
            reader4.onload = function () {
                //console.log(reader.result);
                //
                //imagestr4 = reader.result;
                $("#imagestr4").val(reader4.result);
            };
            reader4.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
        if (file5) {
            var reader5 = new FileReader();
            reader5.readAsDataURL(file5);
            reader5.onload = function () {
                //console.log(reader.result);
                //
                // imagestr5 = reader.result;
                $("#imagestr5").val(reader5.result);

            };
            reader5.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
        if (file6) {
            var reader6 = new FileReader();
            reader6.readAsDataURL(file6);
            reader6.onload = function () {
                //console.log(reader.result);
                //
                // imagestr5 = reader.result;
                $("#imagestr6").val(reader6.result);

            };
            reader6.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
        alert("Uploaded files Submitted Successfully!")

    });
    $("#VendorCreate").submit(function (e) {
        e.preventDefault();

        const ComapnayName = $("#txtcompanyname").val();
        var clntid = $("#txtid").val();
        const CompanyAddress = $("#txtcompanyaddress").val();
        const Email = $("#txtemail").val();
        const Phone = $("#txtphone").val();
        const drivelink = $("#drivelink").val();
        const GST = $("#txtGST").val();
        const IFSC_Code = $("#IFSC_Code").val();
        const BankName = $("#BankName").val();
        const Bank_Account = $("#Bank_Account").val();

        var imagestr = $("#imagestr").val();
        var imagestr1 = $("#imagestr1").val();
        var imagestr2 = $("#imagestr2").val();
        var imagestr3 = $("#imagestr3").val();
        var imagestr4 = $("#imagestr4").val();
        var imagestr5 = $("#imagestr5").val();
        var imagestr6 = $("#imagestr6").val();

        var ddlbusinesstype = $("#ddlbusinesstype").val();
        var clienttype = (ddlbusinesstype == "Product") ? 1 : 0;

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

        var postdata = {
            "AdminId": ADMIN_AUTH,
            "id": VendorId,
            "Companyname": ComapnayName,
            "ClientID": clntid,
            "Address": CompanyAddress,
            "email": Email,
            "phonenumber": Phone,
            "GSTNumber": GST,
            "Bank_Account": Bank_Account,
            "BankName": BankName,
            "IFSC_Code": IFSC_Code,
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
            "clientype": clienttype,
            "drivelink": drivelink
        };

        $.ajax({
            url: "https://api.pdca.in/Vendor/Update",
            type: "POST",
            data: postdata,
            dataType: "json",
            traditional: true,
            crossDomain: true,

            // 🔵 SHOW LOADER + FREEZE UI
            beforeSend: function () {
                $("#spinnerOverlay").css("display", "flex");
                $("body").css("pointer-events", "none");
            },

            success: function (data) {

                if (data.responsecode == 1) {
                    var getid = data.responseObject;
                    var PostDataClienttype = "";

                    if (data.responsemessage == "1") {

                        PostDataClienttype = {
                            "AdminId": ADMIN_AUTH,
                            "ClientId": getid,
                            "ProductName": $("#PProductname").val(),
                            "Activity": $("#PActivity").val(),
                            "Customernames": $("#pCustomerName").val(),
                            "Capacity": $("#Pcapacity").val(),
                            "Categoryname": $("#PddlCategory").val()
                        };

                    } else {

                        PostDataClienttype = {
                            "AdminId": ADMIN_AUTH,
                            "ClientId": getid,
                            "Services": $("#txtsservice").val(),
                            "Activity": $("#sActivityDDl").val(),
                            "Customernames": $("#txtscustomername").val(),
                            "Categoryname": $("#Scategoryddl").val()
                        };
                    }

                    // 🔁 SECOND API CALL
                    $.ajax({
                        url: "https://api.pdca.in/Vendor/TypeUpdate",
                        type: "POST",
                        data: PostDataClienttype,
                        dataType: "json",
                        traditional: true,
                        crossDomain: true,

                        success: function (data) {
                            if (data.responsecode == 1) {
                                window.location = "/leadManagement/VendorList.html";
                            }
                        },

                        error: function () {
                            alert("Error in Type Update API");
                        },

                        complete: function () {
                            $("#spinnerOverlay").hide();
                            $("body").css("pointer-events", "auto");
                        }
                    });
                }
            },

            error: function () {
                alert("Something went wrong!");
            },

            complete: function () {
                // fallback safety
                $("#spinnerOverlay").hide();
                $("body").css("pointer-events", "auto");
            }
        });

    });
});