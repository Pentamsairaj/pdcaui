
$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("team_email");

    console.log(email);
    const CLIENT_AUTH = localStorage.getItem("Client_auth");

    function getOTP() {
        let otp = "";

        $(".otp-box").each(function () {
            otp += $(this).val();
        });

        return otp;
    }

    $("#frmforgot_psd").submit(function (e) {

        e.preventDefault(); // ✅ prevent page reload

        const otp = getOTP();

        if (otp.length !== 6) {
            alert("Please enter valid 6-digit OTP");
            return;
        }


        $.ajax({
            url: "https://api.pioneerfoods.in/Admin/VerifyOTP",
            type: "POST",
            data: { otp: otp, email: email },
            dataType: "JSON",
            beforeSend: function () {
                $("#spinnerOverlay").css("display", "flex");
                $("body").css("pointer-events", "none");
            },
            success: function (data) {

                if (data.responsecode === 1) {
                    alert(data.responsemessage);
                    window.location = "../team_setpassword.html?team_email=" + encodeURIComponent(email);
                } else {
                    alert(data.responsemessage);
                }
            },

            error: function () {
                alert("Something went wrong. Please try again.");
            },
             complete: function () {
                $("#spinnerOverlay").hide();
                $("body").css("pointer-events", "auto");
            }

        });

    });

    let isResending = false; // 🔒 lock

    $("#resendotp").click(function (e) {

        e.preventDefault();

        if (isResending) return; // 🚫 prevent multiple clicks

        const btn = $("#resendotp");

        isResending = true;
        btn.prop("disabled", true);

        $.ajax({
            url: "https://api.pioneerfoods.in/Admin/ForgotPassword", // ✅ fix URL
            type: "POST",
            data: { email: email },
            dataType: "JSON",
            crossDomain: true,

            beforeSend: function () {
                $("#spinner").css("display", "flex");
                $("body").css("pointer-events", "none");
            },

            success: function (data) {
                if (data.responsecode === 1) {
                    alert("OTP sent to your email");
                } else {
                    alert(data.responsemessage);
                }
            },

            error: function (xhr) {
                alert("Error: " + xhr.status + " - Please try again");
            },

            complete: function () {
                // 🔓 unlock
                isResending = false;

                // 🔵 restore UI
                $("#spinner").hide();
                $("body").css("pointer-events", "auto");
                btn.prop("disabled", false);
            }
        });

    });
});
