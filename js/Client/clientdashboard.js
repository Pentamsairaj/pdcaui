$(document).ready(function () {
    const CLIENT_AUTH = localStorage.getItem("Client_auth");
    debugger;
    let startDate = $("#startdate").val();
    let endDate = $("#enddate").val();
    $.ajax({
        url: "https://api.pdca.in/Dashboard/ClientDashboard?ClientID=" + CLIENT_AUTH,
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
    $(".loading").hide();
    $("#applyFilter").click(() => {
        let startDate = $("#startdate").val();
        let endDate = $("#enddate").val();
        $.ajax({
            url: "https://api.pdca.in/Dashboard/ClientDashboard?ClientID=" + ADMIN_AUTH + "&fromdate=" + startDate + "&todate=" + endDate,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
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
            }
        });
    })
    $(".loading").hide();
})