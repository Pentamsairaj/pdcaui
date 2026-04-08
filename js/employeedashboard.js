$(document).ready(function () {
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    debugger;
    let startDate = $("#startdate").val();
    let endDate = $("#enddate").val();
    $.ajax({
        url: "https://api.pdca.in/Dashboard/EmpDashboard?EmpID=" + ADMIN_AUTH,
        type: "GET",
        contentType: false, // Not to set any content header                      
        processData: false, // Not to process data
        //data: fileData,
        beforeSend: function () {
            $('#spinner').show();
        },
        success: function (data) {
            $("#regcount").html(data.TotalReglist);
            $("#pregcount").html(data.Totalpendingreg);
            $("#cregcount").html(data.Totalcompletereg);
            $("#tqytcount").html(data.TotalQuality);
            $("#pqytcount").html(data.TotalpendingQuality);
            $("#cqytcount").html(data.TotalcompleteQuality);
            $("#prodcount").html(data.TotalProduct);
            $("#cprodcount").html(data.Totalcompprod);
            $("#pprodcount").html(data.Totalpendrep);
            $("#tsmpcount").html(data.Totalservice);
            $("#ttrepcount").html(data.Totaltestreport);
            $("#tpreocount").html(data.Totalpendingreport);
            $('.countani').each(function () {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        },
        complete: function () {
            $('#spinner').hide();
        }
    });
    $("#applyFilter").click(() => {
        let startDate = $("#startdate").val();
        let endDate = $("#enddate").val();
        $.ajax({
            url: "https://api.pdca.in/Dashboard/EmpDashboard?EmpID=" + ADMIN_AUTH + "&fromdate=" + startDate + "&todate=" + endDate,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            beforeSend: function () {
                $('#spinner').show();
            },
            success: function (data) {
                $("#regcount").html(data.TotalReglist);
                $("#pregcount").html(data.Totalpendingreg);
                $("#cregcount").html(data.Totalcompletereg);
                $("#tqytcount").html(data.TotalQuality);
                $("#pqytcount").html(data.TotalpendingQuality);
                $("#cqytcount").html(data.TotalcompleteQuality);
                $("#prodcount").html(data.TotalProduct);
                $("#cprodcount").html(data.Totalcompprod);
                $("#pprodcount").html(data.Totalpendrep);
                $("#tsmpcount").html(data.Totalservice);
                $("#ttrepcount").html(data.Totaltestreport);
                $("#tpreocount").html(data.Totalpendingreport);
                $('.countani').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 1000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
            },
            complete: function () {
                $('#spinner').hide();
            }
        });
    })
})