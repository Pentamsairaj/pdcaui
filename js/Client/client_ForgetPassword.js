
$(document).ready(function () {
    const CLIENT_AUTH = localStorage.getItem("Client_auth");



    $("#frmforgot_psd").submit(function (e) {

        e.preventDefault(); // ✅ stop page reload

        var customer_email = $("#txtusername").val();

        $.ajax({
            url: "https://api.pdca.in/Client/ForgotPassword",
            type: "POST",
            data: { email: customer_email },
            dataType: "JSON",
            crossDomain: true,
            beforeSend: function () {
                $("#spinnerOverlay").css("display", "flex");
                $("body").css("pointer-events", "none");
            },
            success: function (data) {

                if (data.responsecode === 1) {
                    alert("OTP sent to your email");
                    window.location = "../client_otp.html?cust_email=" + encodeURIComponent(customer_email);
                } else {
                    alert(data.responsemessage);
                }
            },

            error: function (xhr) {
                alert("Error: " + xhr.status + " - Please try again");
            },
            complete: function () {
                $("#spinnerOverlay").hide();
                $("body").css("pointer-events", "auto");
            }

        });

    });
});
