$(document).ready(function () {
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");



    $("#frmforgot_psd").submit(function () {

        var team_email = $("#txtusername").val();
        $.ajax({
            url: "https://api.pdca.in/Admin/Forgotpassword",
            type: "POST",
            data: { "email": team_email },
            dataType: "JSON",
            crossDomain: true,
            beforeSend: function () {
                $("#spinnerOverlay").css("display", "flex");
                $("body").css("pointer-events", "none");
            },
            success: function (data) {

                if (data.responsecode === 1) {
                    alert("OTP sent to your email");
                    window.location = "../team_otp.html?team_email=" + encodeURIComponent(team_email);
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
