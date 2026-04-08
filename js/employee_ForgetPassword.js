$(document).ready(function () {
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");



    $("#frmforgot_psd").submit(function () {

        var customer_email = $("#txtusername").val();
        $.ajax({
            url: "https://api.pdca.in/Admin/Changepassword",
            type: "POST",
            data: { "id": ADMIN_AUTH, "email": customer_email },
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                alert("OTP send to your e-mail");
                window.location = "../teamlogin.html";
            },
            error: function () {
                alert("OTP send to your e-mail");
                window.location = "../teamlogin.html";
            }

        });

    });

});
