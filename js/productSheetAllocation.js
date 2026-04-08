$(document).ready(function () {
    const ADMIN_AUTH = localStorage.getItem("Admin_auth");
    const url = window.location.search;
    const params = new URLSearchParams(url);
    getProcess_JobID();
    const ID = params.get("ID");
    if (ID != null) {
        $("#ddjobid").attr('disabled', 'disabled');
        $('#ddjobid').val(ID);
        $("#prdname").hide();
        $("#client").hide();
        $("#jobnum").hide();
        $("#Employee").hide();
        $("#from").hide();
        $("#to").hide();
        Getlistofalltables(ID);
    }
    getclients();
    getEmployees();

    function getclients() {
        $.ajax({
            url: "https://api.pdca.in/Client/GetList?AdminId=" + ADMIN_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#CLientCompName").empty();
                var defaultoption = '<option value="">Select Client</option>';
                $("#CLientCompName").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.ClientID + '">' + val.Companyname + '</option>'
                    $("#CLientCompName").append(getdetails);
                });
            }
        });
    }
    function getEmployees() {
        $.ajax({
            url: "https://api.pdca.in/Admin/EmployeeList?id=" + ADMIN_AUTH,
            type: "GET",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#ProductEmpName").empty();
                var defaultoption = '<option value="" >Select Employee</option>';
                $("#ProductEmpName").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.id + '">' + val.Name + '</option>'

                    $("#ProductCompName").append(getdetails);

                });
            }
        });
    }
    function getProcess_JobID() {

        $.ajax({
            url: "https://api.pdca.in/Process/ListforProcessJobID?AdminID=" + ADMIN_AUTH + "&type=" + true,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {

                $("#ddjobid").empty();
                var defaultoption = '<option value="0">Select Product ID</option>';
                $("#ddjobid").append(defaultoption);

                $.each(data, function (index, val) {
                    var getdetails = '<option value="' + val.ID + '">' + val.Process_JobID + '</option>'
                    $("#ddjobid").append(getdetails);
                });


            }
        });
    }
    $("#CLientCompName").change(function () {
        var getvalue = $(this).val();
        if (getvalue.trim() == "0") {
            $("#jobid").show();
        }
        else {
            $("#jobid").hide();
        }
    })
    $("#ddjobid").change(function () {
        var getvalue = $(this).val();
        if (getvalue.trim() == "0") {
            $("#prdname").show();
            $("#to").show();
            $("#from").show();
        }
        else {
            $("#prdname").hide();
            $("#to").hide();
            $("#from").hide();
        }
    })
    $("#ddjobid").change(function () {
        var getvalue = $(this).val();
        if (getvalue.trim() == "0") {
            $("#client").show();
        }
        else {
            $("#client").hide();
        }
    })
    $("#ddjobid").change(function () {
        var getvalue = $(this).val();
        if (getvalue.trim() == "0") {
            $("#jobnum").show();
        }
        else {
            $("#jobnum").hide();
        }
    })
    $("#ddjobid").change(function () {
        var getvalue = $(this).val();
        if (getvalue.trim() == "0") {
            $("#Employee").show();
        }
        else {
            $("#Employee").hide();
        }
    })
    $("#ddjobid").change(function () {
        debugger;
        var getjoballocationid = $(this).val();
        Getlistofalltables(getjoballocationid);
    });
    function Getlistofalltables(getjoballocationid) {

        $.ajax({
            url: "https://api.pdca.in/Process/PrototypeList?AdminID=" + ADMIN_AUTH + "&product_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false,
            success: function (data) {
                $("#table-iddoc1 tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        if (values.productname == null) {
                            var productname = '<td><div class=form-group><input type="text" name="" id="name_of_product" class="name_of_product form-control"></div></td>'
                        }
                        else {
                            var productname = '<td> <div class=form-group> <input type="text" name="" value="' + values.productname + '" id="name_of_product" class="name_of_product form-control"></div></td> ';
                        }
                        if (values.Ingredientname == null) {
                            var Ingredientname = '<td><div class=form-group><input type="text" name="" id="ingredient_name" class="ingredient_name form-control"></div></td>'
                        }
                        else {
                            var Ingredientname = '<td> <div class=form-group> <input type="text" name="" value="' + values.Ingredientname + '" id="ingredient_name" class="ingredient_name form-control"></div></td> ';
                        }
                        if (values.Specrequirement == null) {
                            var Specrequirement = '<td><div class=form-group> <textarea type="text" name="" id="spec_req" class="spec_req form-control"></textarea></div></td>'
                        }
                        else {
                            var Specrequirement = '<td> <div class=form-group> <textarea type="text" name="" id="spec_req" class="spec_req form-control">' + values.Specrequirement + '</textarea></div></td> ';
                        }
                        if (values.Sourcedetails == null) {
                            var Sourcedetails = '<td><div class=form-group><textarea type="text" name="" id="source_details" class="source_details form-control"></textarea></div></td>'
                        }
                        else {
                            var Sourcedetails = '<td> <div class=form-group><textarea type="text" name="" id="source_details" class="source_details form-control">' + values.Sourcedetails + '</textarea></div></td> ';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr> <td> <input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + productname + ' ' + Ingredientname + ' ' + Specrequirement + ' ' + Sourcedetails + ' <td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#table-iddoc1 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = '<tr> <td> <input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"><input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + productname + ' ' + Ingredientname + ' ' + Specrequirement + ' ' + Sourcedetails + '</tr>';
                            $("#table-iddoc1 tbody").append(getdetails);
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="text" name="" id="name_of_product" class="name_of_product form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ingredient_name" class="ingredient_name form-control"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="spec_req" class="spec_req form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="source_details" class="source_details form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc1 tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="text" name="" id="name_of_product" class="name_of_product form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ingredient_name" class="ingredient_name form-control"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="spec_req" class="spec_req form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="source_details" class="source_details form-control"></textarea> </div></td></tr>';
                        $("#table-iddoc1 tbody").append(getrowcontent);
                    }


                }
            }

        });
        tableiddoc();
        $.ajax({
            url: "https://api.pdca.in/Process/MaterialstockList?AdminID=" + ADMIN_AUTH + "&product_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false,
            success: function (data) {
                $("#table-iddoc2 tbody").empty();
                if (data.length > 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        var datef = "";
                        if (values.Dispensedon != null) {
                            var completedDate = new Date(parseInt(values.Dispensedon.replace("/Date(", "").replace(")/")));
                            var dd = completedDate.getDate();
                            var mm = completedDate.getMonth() + 1; //January is 0! 
                            var yyyy = completedDate.getFullYear();
                            if (dd < 10) { dd = '0' + dd }
                            if (mm < 10) { mm = '0' + mm }
                            var datef = yyyy + '-' + mm + '-' + dd;

                        }
                        else {
                            datef = "";
                        }
                        if (values.materialname == null) {
                            var materialname = '<td><div class=form-group><input type="text" name="" id="Name_of_Material" class="Name_of_Material form-control w-200px"></div></td>'
                        }
                        else {
                            var materialname = '<td> <div class=form-group><input type="text" name="" id="Name_of_Material" value="' + values.materialname + '" class="Name_of_Material form-control w-200px"></div></td> ';
                        }
                        if (values.openingstock == null) {
                            var openingstock = '<td><div class=form-group><input type="text" name="" id="Opening_stock" class="Opening_stock form-control w-200px"></div></td>'
                        }
                        else {
                            var openingstock = '<td> <div class=form-group><input type="text" name="" id="Opening_stock" value="' + values.openingstock + '" class="Opening_stock form-control w-200px"></div></td> ';
                        }
                        if (values.DispensedBatchno == null) {
                            var DispensedBatchno = '<td><div class=form-group> <input type="text" name="" id="DispensedforBatchNo" class="DispensedforBatchNo form-control w-200px"></div></td>'
                        }
                        else {
                            var DispensedBatchno = '<td> <div class=form-group> <input type="text" name="" id="DispensedforBatchNo" value="' + values.DispensedBatchno + '" class="DispensedforBatchNo form-control w-200px"></div></td> ';
                        }
                        if (datef == null) {
                            var datef = '<td><div class=form-group><input type="date" name="" id="Dispensed_on" class="Dispensed_on form-control"></div></td>'
                        }
                        else {
                            var datef = '<td> <div class=form-group><input type="date" name="" id="Dispensed_on" value="' + datef + '" class="Dispensed_on form-control"></div></td> ';
                        }
                        if (values.Dispensedkgs == null) {
                            var Dispensedkgs = '<td><div class=form-group><input type="text" name="" id="Dispensed_kgs" class="Dispensed_kgs form-control w-200px"></div></td>'
                        }
                        else {
                            var Dispensedkgs = '<td> <div class=form-group><input type="text" name="" id="Dispensed_kgs" value="' + values.Dispensedkgs + '" class="Dispensed_kgs form-control w-200px"></div></td> ';
                        }
                        if (values.Closingstock == null) {
                            var Closingstock = '<td><div class=form-group><input type="text" name="" id="Closing_stock" class="Closing_stock form-control w-200px"></div></td>'
                        }
                        else {
                            var Closingstock = '<td> <div class=form-group><input type="text" name="" id="Closing_stock" value="' + values.Closingstock + '" class="Closing_stock form-control w-200px"></div></td> ';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr> <td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td> ' + materialname + ' ' + openingstock + ' ' + DispensedBatchno + ' ' + datef + ' ' + Dispensedkgs + ' ' + Closingstock + ' <td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#table-iddoc2 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = '<tr> <td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td> ' + materialname + ' ' + openingstock + ' ' + DispensedBatchno + ' ' + datef + ' ' + Dispensedkgs + ' ' + Closingstock + '</tr>';
                            $("#table-iddoc2 tbody").append(getdetails);
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="text" name="" id="Name_of_Material" class="Name_of_Material form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Opening_stock" class="Opening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="DispensedforBatchNo" class="DispensedforBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="Dispensed_on" class="Dispensed_on form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Dispensed_kgs" class="Dispensed_kgs form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Closing_stock" class="Closing_stock form-control w-200px"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc2 tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="text" name="" id="Name_of_Material" class="Name_of_Material form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Opening_stock" class="Opening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="DispensedforBatchNo" class="DispensedforBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="Dispensed_on" class="Dispensed_on form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Dispensed_kgs" class="Dispensed_kgs form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Closing_stock" class="Closing_stock form-control w-200px"> </div></td></tr>';
                        $("#table-iddoc2 tbody").append(getrowcontent);
                    }

                }
            }

        });
        tablequality();
        $.ajax({
            url: "https://api.pdca.in/Process/ProcessflowList?AdminID=" + ADMIN_AUTH + "&product_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false,
            success: function (data) {
                $("#table-iddoc3 tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        if (values.Processflowformat == null) {
                            var Processflowformat = '<td><input type="file" class="processflowfile w-200px" id="processflowfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Processflowformat = '<td> <a class="alink" target="_blank" href="' + values.Processflowformat + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.Trail == null) {
                            var Trail = '<td><div class=form-group> <input type="text" name="" id="trail" class="trail form-control w-200px"></div></td>'
                        }
                        else {
                            var Trail = '<td> <div class=form-group> <input type="text" name="" value="' + values.Trail + '" id="trail" class="trail form-control w-200px"></div></td> ';
                        }
                        if (values.Sensorydata == null) {
                            var Sensorydata = '<td><input type="file" class="sensoryDatafile w-200px" id="sensoryDatafile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Sensorydata = '<td> <a class="alink1" target="_blank" href="' + values.Sensorydata + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="processFlowRemarks" class="processFlowRemarks form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td> <div class=form-group> <textarea type="text" name="" id="processFlowRemarks" class="processFlowRemarks form-control w-200px">' + values.Remarks + '</textarea></div></td> ';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr> <td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + Processflowformat + ' ' + Trail + ' ' + Sensorydata + ' ' + Remarks + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#table-iddoc3 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = '<tr> <td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + Processflowformat + ' ' + Trail + ' ' + Sensorydata + ' ' + Remarks + '</tr>';
                            $("#table-iddoc3 tbody").append(getdetails);
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <input type="file" class="processflowfile w-200px" id="processflowfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="trail" class="trail form-control w-200px"> </div></td><td> <input type="file" class="sensoryDatafile w-200px" id="sensoryDatafile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="processFlowRemarks" class="processFlowRemarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc3 tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <input type="file" class="processflowfile w-200px" id="processflowfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="trail" class="trail form-control w-200px"> </div></td><td> <input type="file" class="sensoryDatafile w-200px" id="sensoryDatafile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="processFlowRemarks" class="processFlowRemarks form-control w-200px"></textarea> </div></td></tr>';
                        $("#table-iddoc3 tbody").append(getrowcontent);
                    }

                }
            }

        });
        tableAunalTraining();
        $.ajax({
            url: "https://api.pdca.in/Process/ProductFinalizedList?AdminID=" + ADMIN_AUTH + "&product_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#table-iddoc4 tbody").empty();
                if (data != 0) {
                    $.each(data, function (index, values) {
                        if (values.FreezedFormula == null) {
                            var FreezedFormula = '<td><div class=form-group><textarea type="text" name="" id="freezed_formula" class="freezed_formula form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var FreezedFormula = '<td> <div class=form-group><textarea type="text" name="" id="freezed_formula" class="freezed_formula form-control w-200px">' + values.FreezedFormula + '</textarea></div></td> ';
                        }
                        if (values.Finalizedformulaformat == null) {
                            var Finalizedformulaformat = '<td><input type="file" class="final_formula_Formatfile w-200px" id="final_formula_Formatfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Finalizedformulaformat = '<td> <a class="alink" target="_blank" href="' + values.Finalizedformulaformat + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.Sensorydata == null) {
                            var Sensorydata = '<td><input type="file" class="productfinalsensoryDatafile w-200px" id="productfinalsensoryDatafile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Sensorydata = '<td> <a class="alink1" target="_blank" href="' + values.Sensorydata + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group> <textarea type="text" name="" id="productfinalRemarks" class="productfinalRemarks form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td> <div class=form-group> <textarea type="text" name="" id="productfinalRemarks" class="productfinalRemarks form-control w-200px">' + values.Remarks + '</textarea></div></td> ';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = '<tr> <input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '">' + FreezedFormula + '' + Finalizedformulaformat + ' ' + Sensorydata + ' ' + Remarks + ' </tr>';
                            $("#table-iddoc4 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = '<tr> <input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '">' + FreezedFormula + '' + Finalizedformulaformat + ' ' + Sensorydata + ' ' + Remarks + ' </tr>';
                            $("#table-iddoc4 tbody").append(getdetails);
                        }

                    });
                }
                else {
                    var getrowcontent = '<tr> <td> <div class="form-group"> <textarea type="text" name="" id="freezed_formula" class="freezed_formula form-control w-200px"></textarea> </div></td><td> <input type="file" class="final_formula_Formatfile w-200px" id="final_formula_Formatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="productfinalsensoryDatafile w-200px" id="productfinalsensoryDatafile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="productfinalRemarks" class="productfinalRemarks form-control w-200px"></textarea> </div></td></tr>';
                    $("#table-iddoc4 tbody").append(getrowcontent);
                }
            }

        });

        $.ajax({
            url: "https://api.pdca.in/Process/FinalizedPackingList?AdminID=" + ADMIN_AUTH + "&product_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            //data: fileData,
            success: function (data) {
                $("#table-iddoc5 tbody").empty();
                if (data != 0) {
                    $.each(data, function (index, values) {
                        if (values.Finalizedpackingformat == null) {
                            var Finalizedpackingformat = '<td><input type="file" class="finalpackingfile w-200px" id="finalpackingfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Finalizedpackingformat = '<td> <a class="alink" target="_blank" href="' + values.Finalizedpackingformat + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.Typeofpackingmaterial == null) {
                            var Typeofpackingmaterial = '<td><div class=form-group><input type="text" name="" id="finalpackingmaterial" class="finalpackingmaterial form-control w-200px"></div></td>'
                        }
                        else {
                            var Typeofpackingmaterial = '<td> <div class=form-group><input type="text" name="" id="finalpackingmaterial" value="' + values.Typeofpackingmaterial + '" class="finalpackingmaterial form-control w-200px"></div></td> ';
                        }
                        if (values.Specification == null) {
                            var Specification = '<td><input type="file" class="finalpackingspecificationfile w-200px" id="finalpackingspecificationfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Specification = '<td> <a class="alink1" target="_blank" href="' + values.Specification + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group><textarea type="text" name="" id="finalpackingRemarks" class="finalpackingRemarks form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td> <div class=form-group><textarea type="text" name="" id="finalpackingRemarks" class="finalpackingRemarks form-control w-200px">' + values.Remarks + '</textarea></div></td> ';
                        }
                        var getdetails = ' <tr><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '">' + Finalizedpackingformat + ' ' + Typeofpackingmaterial + ' ' + Specification + ' ' + Remarks + ' </tr>';
                        $("#table-iddoc5 tbody").append(getdetails);
                    });
                }
                else {
                    var getrowcontent = ' <tr> <td> <input type="file" class="finalpackingfile w-200px" id="finalpackingfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="finalpackingmaterial" class="finalpackingmaterial form-control w-200px"> </div></td><td> <input type="file" class="finalpackingspecificationfile w-200px" id="finalpackingspecificationfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="finalpackingRemarks" class="finalpackingRemarks form-control w-200px"></textarea> </div></td></tr>';
                    $("#table-iddoc5 tbody").append(getrowcontent);
                }
            }

        });

        $.ajax({
            url: "https://api.pdca.in/Process/ShelflifestudyList?AdminID=" + ADMIN_AUTH + "&product_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false,
            //data: fileData,
            success: function (data) {
                $("#table-iddoc6 tbody").empty();
                if (data != 0) {
                    $.each(data, function (index, values) {
                        if (values.BatchNo == null) {
                            var BatchNo = '<td><div class=form-group><input type="text" name="" id="batch_no" class="batch_no form-control w-200px"></div></td>'
                        }
                        else {
                            var BatchNo = '<td> <div class=form-group><input type="text" name="" id="batch_no" value="' + values.BatchNo + '" class="batch_no form-control w-200px"></div></td> ';
                        }
                        if (values.Batchsize == null) {
                            var Batchsize = '<td><div class=form-group><input type="text" name="" id="batch_size" class="batch_size form-control w-200px"></div></td>'
                        }
                        else {
                            var Batchsize = '<td> <div class=form-group><input type="text" name="" id="batch_size" value="' + values.Batchsize + '" class="batch_size form-control w-200px"></div></td> ';
                        }
                        if (values.Protocoloftesting == null) {
                            var Protocoloftesting = '<td><input type="file" class="protocolnfrequencyfile w-200px" id="protocolnfrequencyfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Protocoloftesting = '<td> <a class="alink" target="_blank" href="' + values.Protocoloftesting + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.NoofPackings == null) {
                            var NoofPackings = '<td><div class=form-group> <input type="text" name="" id="numofpackings" class="numofpackings form-control w-200px"></div></td>'
                        }
                        else {
                            var NoofPackings = '<td> <div class=form-group> <input type="text" name="" id="numofpackings" value="' + values.NoofPackings + '" class="numofpackings form-control w-200px"></div></td> ';
                        }
                        if (values.Packingmaterial == null) {
                            var Packingmaterial = '<td><div class=form-group> <textarea type="text" name="" id="packing_material" class="packing_material form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Packingmaterial = '<td> <div class=form-group> <textarea type="text" name="" id="packing_material" class="packing_material form-control w-200px">' + values.Packingmaterial + '</textarea></div></td> ';
                        }
                        if (values.Testreports == null) {
                            var Testreports = '<td><input type="file" class="testreportsfile w-200px" id="testreportsfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Testreports = '<td> <a class="alink1" target="_blank" href="' + values.Testreports + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = ' <tr> <input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> ' + BatchNo + ' ' + Batchsize + ' ' + Protocoloftesting + ' ' + NoofPackings + ' ' + Packingmaterial + ' ' + Testreports + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#table-iddoc6 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = ' <tr> <input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> ' + BatchNo + ' ' + Batchsize + ' ' + Protocoloftesting + ' ' + NoofPackings + ' ' + Packingmaterial + ' ' + Testreports + '</tr>';
                            $("#table-iddoc6 tbody").append(getdetails);
                        }

                    });
                }
                else {
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr>  <td> <div class="form-group"> <input type="text" name="" id="batch_no" class="batch_no form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="batch_size" class="batch_size form-control w-200px"> </div></td><td> <input type="file" class="protocolnfrequencyfile w-200px" id="protocolnfrequencyfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="numofpackings" class="numofpackings form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="packing_material" class="packing_material form-control w-200px"></textarea> </div></td><td> <input type="file" class="testreportsfile w-200px" id="testreportsfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc6 tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr>  <td> <div class="form-group"> <input type="text" name="" id="batch_no" class="batch_no form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="batch_size" class="batch_size form-control w-200px"> </div></td><td> <input type="file" class="protocolnfrequencyfile w-200px" id="protocolnfrequencyfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="numofpackings" class="numofpackings form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="packing_material" class="packing_material form-control w-200px"></textarea> </div></td><td> <input type="file" class="testreportsfile w-200px" id="testreportsfile" aria-describedby="inputGroupFileAddon01"> </td></tr>';
                        $("#table-iddoc6 tbody").append(getrowcontent);
                    }


                }
            }

        });
        tableTraining();
        $.ajax({
            url: "https://api.pdca.in/Process/ManufacturingMaterialstockList?AdminID=" + ADMIN_AUTH + "&product_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false,
            //data: fileData,
            success: function (data) {
                $("#table-iddoc7 tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        var datef = "";
                        if (values.Dispensedon != null) {
                            var completedDate = new Date(parseInt(values.Dispensedon.replace("/Date(", "").replace(")/")));
                            var dd = completedDate.getDate();
                            var mm = completedDate.getMonth() + 1; //January is 0! 
                            var yyyy = completedDate.getFullYear();
                            if (dd < 10) { dd = '0' + dd }
                            if (mm < 10) { mm = '0' + mm }
                            var datef = yyyy + '-' + mm + '-' + dd;

                        }
                        else {
                            datef = "";
                        }
                        if (values.MaterialName == null) {
                            var MaterialName = '<td><div class=form-group><input type="text" name="" id="MaterialName_of_Material" class="MaterialName_of_Material form-control w-200px"></div></td>'
                        }
                        else {
                            var MaterialName = '<td> <div class=form-group><input type="text" name="" id="MaterialName_of_Material" value="' + values.MaterialName + '" class="MaterialName_of_Material form-control w-200px"></div></td> ';
                        }
                        if (values.Openingstock == null) {
                            var Openingstock = '<td><div class=form-group> <input type="text" name="" id="MaterialOpening_stock" class="MaterialOpening_stock form-control w-200px"></div></td>'
                        }
                        else {
                            var Openingstock = '<td> <div class=form-group><input type="text" name="" id="MaterialOpening_stock" value="' + values.Openingstock + '" class="MaterialOpening_stock form-control w-200px"></div></td> ';
                        }
                        if (values.DispensedBatchno == null) {
                            var DispensedBatchno = '<td><div class=form-group><input type="text" name="" id="MaterialDispensedforBatchNo" class="MaterialDispensedforBatchNo form-control w-200px"></div></td>'
                        }
                        else {
                            var DispensedBatchno = '<td> <div class=form-group><input type="text" name="" id="MaterialDispensedforBatchNo" value="' + values.DispensedBatchno + '" class="MaterialDispensedforBatchNo form-control w-200px"></div></td> ';
                        }
                        if (datef == null) {
                            var datef = '<td><div class=form-group> <input type="date" name="" id="MaterialDispensed_on"  class="MaterialDispensed_on form-control"></div></td>'
                        }
                        else {
                            var datef = '<td> <div class=form-group>  <input type="date" name="" id="MaterialDispensed_on" value="' + datef + '" class="MaterialDispensed_on form-control"></div></td> ';
                        }
                        if (values.Dispensedqty == null) {
                            var Dispensedqty = '<td><div class=form-group><input type="text" name="" id="MaterialDispensed_kgs" class="MaterialDispensed_kgs form-control w-200px"></div></td>'
                        }
                        else {
                            var Dispensedqty = '<td> <div class=form-group> <input type="text" name="" id="MaterialDispensed_kgs" value="' + values.Dispensedqty + '" class="MaterialDispensed_kgs form-control w-200px"></div></td> ';
                        }
                        if (values.Closingstock == null) {
                            var Closingstock = '<td><div class=form-group><input type="text" name="" id="MaterialClosing_stock" class="MaterialClosing_stock form-control w-200px"></div></td>'
                        }
                        else {
                            var Closingstock = '<td> <div class=form-group><input type="text" name="" id="MaterialClosing_stock" value="' + values.Closingstock + '" class="MaterialClosing_stock form-control w-200px"></div></td> ';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = ' <tr> <td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + MaterialName + ' ' + Openingstock + ' ' + DispensedBatchno + ' ' + datef + ' ' + Dispensedqty + ' ' + Closingstock + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#table-iddoc7 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = ' <tr> <td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + MaterialName + ' ' + Openingstock + ' ' + DispensedBatchno + ' ' + datef + ' ' + Dispensedqty + ' ' + Closingstock + '</tr>';
                            $("#table-iddoc7 tbody").append(getdetails);
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="text" name="" id="MaterialName_of_Material" class="MaterialName_of_Material form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialOpening_stock" class="MaterialOpening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialDispensedforBatchNo" class="MaterialDispensedforBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="MaterialDispensed_on" class="MaterialDispensed_on form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialDispensed_kgs" class="MaterialDispensed_kgs form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialClosing_stock" class="MaterialClosing_stock form-control w-200px"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc7 tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="text" name="" id="MaterialName_of_Material" class="MaterialName_of_Material form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialOpening_stock" class="MaterialOpening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialDispensedforBatchNo" class="MaterialDispensedforBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="MaterialDispensed_on" class="MaterialDispensed_on form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialDispensed_kgs" class="MaterialDispensed_kgs form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialClosing_stock" class="MaterialClosing_stock form-control w-200px"> </div></td></tr>';
                        $("#table-iddoc7 tbody").append(getrowcontent);
                    }

                }
            }

        });
        tableskill();
        $.ajax({
            url: "https://api.pdca.in/Process/BatchSheetList?AdminID=" + ADMIN_AUTH + "&product_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false,
            success: function (data) {
                $("#table-iddoc8 tbody").empty();
                if (data != 0) {
                    var sno = 1;
                    var snos = 1;
                    $.each(data, function (index, values) {
                        if (values.Batchno == null) {
                            var Batchno = '<td><div class=form-group><input type="text" name="" id="sheet_batch_no" class="sheet_batch_no form-control w-200px"></div></td>'
                        }
                        else {
                            var Batchno = '<td> <div class=form-group> <input type="text" name="" id="sheet_batch_no" value="' + values.Batchno + '" class="sheet_batch_no form-control w-200px"></div></td> ';
                        }
                        if (values.MPCRFormat == null) {
                            var MPCRFormat = '<td><input type="file" class="mpcrformatfile w-200px" id="mpcrformatfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var MPCRFormat = '<td> <a class="alink" target="_blank" href="' + values.MPCRFormat + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.Flowchart == null) {
                            var Flowchart = '<td> <input type="file" class="flowchatfile w-200px" id="flowchatfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var Flowchart = '<td> <a class="alink1" target="_blank" href="' + values.Flowchart + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.BatchRecord == null) {
                            var BatchRecord = '<td><input type="file" class="process_recordfile w-200px" id="process_recordfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var BatchRecord = '<td> <a class="alink2" target="_blank" href="' + values.BatchRecord + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.TestReports == null) {
                            var TestReports = '<td><input type="file" class="batchtestreportsfile w-200px" id="batchtestreportsfile" aria-describedby="inputGroupFileAddon01"></td>'
                        }
                        else {
                            var TestReports = '<td> <a class="alink3" target="_blank" href="' + values.TestReports + '"><button class="btn btn-primary" type="button">View</button></a></td> ';
                        }
                        if (values.Remarks == null) {
                            var Remarks = '<td><div class=form-group><textarea type="text" name="" id="batchremarks" class="batchremarks form-control w-200px"></textarea></div></td>'
                        }
                        else {
                            var Remarks = '<td> <div class=form-group><textarea type="text" name="" id="batchremarks" class="batchremarks form-control w-200px">' + values.Remarks + '</textarea></div></td> ';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = ' <tr> <td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + Batchno + ' ' + MPCRFormat + ' ' + Flowchart + ' ' + BatchRecord + ' ' + TestReports + ' ' + Remarks + '<td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#table-iddoc8 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = ' <tr> <td><input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '"> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td>' + Batchno + ' ' + MPCRFormat + ' ' + Flowchart + ' ' + BatchRecord + ' ' + TestReports + ' ' + Remarks + '</tr>';
                            $("#table-iddoc8 tbody").append(getdetails);
                        }

                    });
                }
                else {
                    var sno = 1;
                    var snos = 1;
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="text" name="" id="sheet_batch_no" class="sheet_batch_no form-control w-200px"> </div></td><td> <input type="file" class="mpcrformatfile w-200px" id="mpcrformatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="flowchatfile w-200px" id="flowchatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="process_recordfile w-200px" id="process_recordfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="batchtestreportsfile w-200px" id="batchtestreportsfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="batchremarks" class="batchremarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc8 tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm" sno=' + snos++ + '></td><td>' + sno++ + '</td><td> <div class="form-group"> <input type="text" name="" id="sheet_batch_no" class="sheet_batch_no form-control w-200px"> </div></td><td> <input type="file" class="mpcrformatfile w-200px" id="mpcrformatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="flowchatfile w-200px" id="flowchatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="process_recordfile w-200px" id="process_recordfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="batchtestreportsfile w-200px" id="batchtestreportsfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="batchremarks" class="batchremarks form-control w-200px"></textarea> </div></td></tr>';
                        $("#table-iddoc8 tbody").append(getrowcontent);
                    }

                }
            }

        });

        $.ajax({
            url: "https://api.pdca.in/Process/DispatchdetailsList?AdminId=" + ADMIN_AUTH + "&product_ID=" + getjoballocationid,
            type: "GET",
            async: false,
            contentType: false, // Not to set any content header
            processData: false,
            //data: fileData,
            success: function (data) {
                $("#table-iddoc9 tbody").empty();
                if (data != 0) {
                    $.each(data, function (index, values) {
                        var datef = "";
                        if (values.Dispatchedon != null) {
                            var completedDate = new Date(parseInt(values.Dispatchedon.replace("/Date(", "").replace(")/")));
                            var dd = completedDate.getDate();
                            var mm = completedDate.getMonth() + 1; //January is 0! 
                            var yyyy = completedDate.getFullYear();
                            if (dd < 10) { dd = '0' + dd }
                            if (mm < 10) { mm = '0' + mm }
                            var datef = yyyy + '-' + mm + '-' + dd;

                        }
                        else {
                            datef = "";
                        }
                        if (values.BatchNo == null) {
                            var BatchNo = '<td><div class=form-group> <input type="text" name="" id="dispatchBatchNo" class="dispatchBatchNo form-control w-200px"></div></td>'
                        }
                        else {
                            var BatchNo = '<td> <div class=form-group> <input type="text" name="" id="dispatchBatchNo" value="' + values.BatchNo + '" class="dispatchBatchNo form-control w-200px"></div></td> ';
                        }
                        if (values.Openingstock == null) {
                            var Openingstock = '<td><div class=form-group><input type="text" name="" id="dispatchOpening_stock" class="dispatchOpening_stock form-control w-200px"></div></td>'
                        }
                        else {
                            var Openingstock = '<td> <div class=form-group><input type="text" name="" id="dispatchOpening_stock" value="' + values.Openingstock + '" class="dispatchOpening_stock form-control w-200px"></div></td> ';
                        }
                        if (values.Dispatchedto == null) {
                            var Dispatchedto = '<td><div class=form-group><input type="text" name="" id="dispatchedto" class="dispatchedto form-control w-200px"></div></td>'
                        }
                        else {
                            var Dispatchedto = '<td> <div class=form-group><input type="text" name="" id="dispatchedto" value="' + values.Dispatchedto + '" class="dispatchedto form-control w-200px"></div></td> ';
                        }
                        if (values.Dispatchedqty == null) {
                            var Dispatchedqty = '<td><div class=form-group><input type="text" name="" id="dispatchedQty" class="dispatchedQty form-control w-200px"></div></td>'
                        }
                        else {
                            var Dispatchedqty = '<td> <div class=form-group><input type="text" name="" id="dispatchedQty" value="' + values.Dispatchedqty + '" class="dispatchedQty form-control w-200px"></div></td> ';
                        }
                        if (datef == null) {
                            var datef = '<td><div class=form-group><input type="date" name="" id="dispatchedOn" class="dispatchedOn form-control"></div></td>'
                        }
                        else {
                            var datef = '<td> <div class=form-group><input type="date" name="" value="' + datef + '" id="dispatchedOn" class="dispatchedOn form-control"></div></td> ';
                        }
                        if (values.Closingstock == null) {
                            var Closingstock = '<td><div class=form-group><input type="text" name="" id="dispatchClosing_stock" class="dispatchClosing_stock form-control w-200px"></div></td>'
                        }
                        else {
                            var Closingstock = '<td> <div class=form-group><input type="text" name="" id="dispatchClosing_stock" value="' + values.Closingstock + '" class="dispatchClosing_stock form-control w-200px"></div></td> ';
                        }
                        if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                            var getdetails = ' <tr>  <input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '">' + BatchNo + ' ' + Openingstock + ' ' + Dispatchedto + ' ' + Dispatchedqty + ' ' + datef + ' ' + Closingstock + ' <td> <div class="deleteRow" style="cursor:pointer" id="' + values.ID + '"><i class="menu-icon flaticon2-rubbish-bin  text-danger"></i></div></td></tr>';
                            $("#table-iddoc9 tbody").append(getdetails);
                        }
                        else {
                            var getdetails = ' <tr> <input class="txtid" id="' + values.ID + '" type="hidden" value="' + values.ID + '">' + BatchNo + ' ' + Openingstock + ' ' + Dispatchedto + ' ' + Dispatchedqty + ' ' + datef + ' ' + Closingstock + ' </tr>';
                            $("#table-iddoc9 tbody").append(getdetails);
                        }


                    });
                }
                else {
                    if (ADMIN_AUTH == "2d4ac65e-ff99-407a-a729-ccde60c7d5f1") {
                        var getrowcontent = ' <tr> <td> <div class="form-group"> <input type="text" name="" id="dispatchBatchNo" class="dispatchBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchOpening_stock" class="dispatchOpening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchedto" class="dispatchedto form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchedQty" class="dispatchedQty form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="dispatchedOn" class="dispatchedOn form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchClosing_stock" class="dispatchClosing_stock form-control w-200px"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
                        $("#table-iddoc9 tbody").append(getrowcontent);
                    }
                    else {
                        var getrowcontent = ' <tr> <td> <div class="form-group"> <input type="text" name="" id="dispatchBatchNo" class="dispatchBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchOpening_stock" class="dispatchOpening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchedto" class="dispatchedto form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchedQty" class="dispatchedQty form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="dispatchedOn" class="dispatchedOn form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchClosing_stock" class="dispatchClosing_stock form-control w-200px"> </div></td></tr>';
                        $("#table-iddoc9 tbody").append(getrowcontent);
                    }


                }
            }

        });

    }

    $("#createTemplateSubmit").submit(function () {
        // 🔹 SHOW loader immediately
        $("#spinnerOverlay").css("display", "flex");
        $("body").css("pointer-events", "none");

        setTimeout(
            function () {
                var checkexisting = $("#ddjobid").val();
                if (checkexisting == "0") {
                    var ProductName = $("#Product_name").val();
                    var fromDate = $("#fromDate").val();
                    var toDate = $("#toDate").val();
                    var clientcompanyname = $("#CLientCompName").val();
                    var jobno = $("#jobNum").val();
                    var productcompanyname = $("#ProductCompName").val();
                    var jobID = $("#ddjobid").val();
                    var AnalysisStartDate = $("#fromDate").val();
                    var AnalysisEndDate = $("#toDate").val();
                    var AdminID = ADMIN_AUTH;
                    var type = true;
                    var postdata = {
                        "productname": ProductName,
                        "clientcompany": clientcompanyname,
                        "jobno": jobno,
                        "employeename": productcompanyname,
                        "Process_JobID": jobID,
                        "AdminID": AdminID,
                        "Type": type,
                        "fromDate": fromDate,
                        "toDate": toDate,
                        "AnalysisStartDate": AnalysisStartDate,
                        "AnalysisEndDate": AnalysisEndDate
                    }

                    $.ajax({
                        url: "https://api.pdca.in/Process/Create_SheetAllocation",
                        type: "POST",
                        data: postdata,
                        dataType: "json",
                        traditional: true,
                        crossDomain: true,
                        //beforeSend: function () {
                        //    // Show the spinner before the AJAX call starts
                        //    $("#spinner").show();
                        //},
                        //complete: function () {
                        //    // Hide the spinner after the AJAX call completes (regardless of success or failure)
                        //    $("#spinner").hide();
                        //},
                        success: function (data) {

                            if (data.responsecode == 1) {
                                var product_ID = data.responseObject;
                                Prototypedajax(product_ID);
                                CreateMaterialstock(product_ID);
                                CreateProcessflow(product_ID);
                                CreateProductFinalized(product_ID);
                                CreateFinalizedPacking(product_ID);
                                CreateShelflifestudy(product_ID);
                                CreateMaterialStock(product_ID);
                                CreateBatchSheet(product_ID);
                                CreateDispatchDetails(product_ID);
                                alert("Product SheetAllocation Created Successfully");
                                window.location = "/process/listofProducts.html";
                            }
                            else {
                                alert(data.responsemessage);
                            }
                        },
                        complete: function () {
                            // 🔹 HIDE loader properly
                            $("#spinnerOverlay").hide();
                            $("body").css("pointer-events", "auto");
                        }
                    });
                }
                else {
                    var product_ID = checkexisting;
                    Prototypedajax(product_ID);
                    CreateMaterialstock(product_ID);
                    CreateProcessflow(product_ID);
                    CreateProductFinalized(product_ID);
                    CreateFinalizedPacking(product_ID);
                    CreateShelflifestudy(product_ID);
                    CreateMaterialStock(product_ID);
                    CreateBatchSheet(product_ID);
                    CreateDispatchDetails(product_ID);
                    alert("Product SheetAllocation Updated Successfully");
                    window.location = "/process/listofProducts.html";
                    // 🔹 HIDE loader for else case
                    $("#spinnerOverlay").hide();
                    $("body").css("pointer-events", "auto");
                }
            }, 1000);
    });

    function Prototypedajax(product_ID) {
        var gettablelength = $("#table-iddoc1 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {

                var ID = $("#table-iddoc1 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var name_of_product = $("#table-iddoc1 tbody tr").eq(i).find(".name_of_product").val();
                var ingredient_name = $("#table-iddoc1 tbody tr").eq(i).find(".ingredient_name").val();
                var spec_req = $("#table-iddoc1 tbody tr").eq(i).find(".spec_req").val();
                var source_details = $("#table-iddoc1 tbody tr").eq(i).find(".source_details").val();
                var product_ID = product_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('productname', name_of_product);
                postdata.append('Ingredientname', ingredient_name);
                postdata.append('Sourcedetails', source_details);
                postdata.append('product_ID', product_ID);
                postdata.append('Specrequirement', spec_req);
                postdata.append('AdminID', ADMIN_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/Process/CreatePrototype",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {
                        if (data.responsecode == 1) {

                            var product_ID = data.responseObject;

                        }
                    }
                });


            };
        }
    }
    function CreateMaterialstock(product_ID) {

        var gettablelength = $("#table-iddoc2 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {

                var ID = $("#table-iddoc2 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var Name_of_Material = $("#table-iddoc2 tbody tr").eq(i).find(".Name_of_Material").val();
                var Opening_stock = $("#table-iddoc2 tbody tr").eq(i).find(".Opening_stock").val();
                var DispensedforBatchNo = $("#table-iddoc2 tbody tr").eq(i).find(".DispensedforBatchNo").val();
                var Dispensed_on = $("#table-iddoc2 tbody tr").eq(i).find(".Dispensed_on").val();
                var Dispensed_kgs = $("#table-iddoc2 tbody tr").eq(i).find(".Dispensed_kgs").val();
                var Closing_stock = $("#table-iddoc2 tbody tr").eq(i).find(".Closing_stock").val();
                var product_ID = product_ID;

                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('materialname', Name_of_Material);
                postdata.append('openingstock', Opening_stock);
                postdata.append('DispensedBatchno', DispensedforBatchNo);
                postdata.append('Dispensedon', Dispensed_on);
                postdata.append('Dispensedkgs', Dispensed_kgs);
                postdata.append('Closingstock', Closing_stock);
                postdata.append('product_ID', product_ID);
                postdata.append('AdminID', ADMIN_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/Process/CreateMaterialStock",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {

                        if (data.responsecode == 1) {
                            var product_ID = data.responseObject;

                        }
                    }
                });


            };
        }

    }
    function CreateProcessflow(product_ID) {
        var gettablelength = $("#table-iddoc3 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc3 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var file = ""
                var checkprocessflow = $("#table-iddoc3 tbody tr").eq(i).find(".alink").attr("href");
                if (checkprocessflow) {
                    //do nothing
                }
                else {

                    var checkfiles = $("#table-iddoc3 tbody tr").eq(i).find(".processflowfile").val();
                    if (checkfiles) {
                        file = $("#table-iddoc3 tbody tr").eq(i).find(".processflowfile")[0].files[0];
                    }
                }
                var file1 = ""
                var checksensoryData = $("#table-iddoc3 tbody tr").eq(i).find(".alink1").attr("href");
                if (checksensoryData) {
                    //do nothing
                }
                else {

                    var checkfile1 = $("#table-iddoc3 tbody tr").eq(i).find(".sensoryDatafile").val();
                    if (checkfile1) {
                        file1 = $("#table-iddoc3 tbody tr").eq(i).find(".sensoryDatafile")[0].files[0];
                    }
                }
                var trail = $("#table-iddoc3 tbody tr").eq(i).find(".trail").val();
                var processFlowRemarks = $("#table-iddoc3 tbody tr").eq(i).find(".processFlowRemarks").val();
                var product_ID = product_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file', file);
                postdata.append('file1', file1);
                postdata.append('Trail', trail);
                postdata.append('Remarks', processFlowRemarks);
                postdata.append('product_ID', product_ID);
                postdata.append('AdminID', ADMIN_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/Process/CreateProcessflow",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {
                        if (data.responsecode == 1) {
                            var product_ID = data.responseObject;

                        }
                    }
                });


            };
        }

    }
    function CreateProductFinalized(product_ID) {

        var gettablelength = $("#table-iddoc4 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc4 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var file2 = ""
                var checkfinal_formula = $("#table-iddoc4 tbody tr").eq(i).find(".alink").attr("href");
                if (checkfinal_formula) {
                    //do nothing
                }
                else {

                    var checkfile2 = $("#table-iddoc4 tbody tr").eq(i).find(".final_formula_Formatfile").val();
                    if (checkfile2) {
                        file2 = $("#table-iddoc4 tbody tr").eq(i).find(".final_formula_Formatfile")[0].files[0];
                    }
                }
                var file3 = ""
                var checkproductfinal = $("#table-iddoc4 tbody tr").eq(i).find(".alink1").attr("href");
                if (checkproductfinal) {
                    //do nothing
                }
                else {

                    var checkfile3 = $("#table-iddoc4 tbody tr").eq(i).find(".productfinalsensoryDatafile").val();
                    if (checkfile3) {
                        file3 = $("#table-iddoc4 tbody tr").eq(i).find(".productfinalsensoryDatafile")[0].files[0];
                    }
                }
                var freezed_formula = $("#table-iddoc4 tbody tr").eq(i).find(".freezed_formula").val();
                var productfinalRemarks = $("#table-iddoc4 tbody tr").eq(i).find(".productfinalRemarks").val();
                var product_ID = product_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file1', file2);
                postdata.append('file', file3);
                postdata.append('FreezedFormula', freezed_formula);
                postdata.append('Remarks', productfinalRemarks);
                postdata.append('product_ID', product_ID);
                postdata.append('AdminID', ADMIN_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/Process/CreateProductFinalized",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {

                        if (data.responsecode == 1) {
                            var product_ID = data.responseObject;

                        }
                    }
                });

            };
        }

    }
    function CreateFinalizedPacking(product_ID) {

        var gettablelength = $("#table-iddoc5 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc5 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var file4 = ""
                var checkfinalpacking = $("#table-iddoc5 tbody tr").eq(i).find(".alink").attr("href");
                if (checkfinalpacking) {
                    //do nothing
                }
                else {

                    var checkfile4 = $("#table-iddoc5 tbody tr").eq(i).find(".finalpackingfile").val();
                    if (checkfile4) {
                        file4 = $("#table-iddoc5 tbody tr").eq(i).find(".finalpackingfile")[0].files[0];
                    }
                }
                var file5 = ""
                var checkspecificationfile = $("#table-iddoc5 tbody tr").eq(i).find(".alink1").attr("href");
                if (checkspecificationfile) {
                    //do nothing
                }
                else {

                    var checkfile5 = $("#table-iddoc5 tbody tr").eq(i).find(".finalpackingspecificationfile").val();
                    if (checkfile5) {
                        file5 = $("#table-iddoc5 tbody tr").eq(i).find(".finalpackingspecificationfile")[0].files[0];
                    }
                }
                var finalpackingmaterial = $("#table-iddoc5 tbody tr").eq(i).find(".finalpackingmaterial").val();
                var finalpackingRemarks = $("#table-iddoc5 tbody tr").eq(i).find(".finalpackingRemarks").val();
                var product_ID = product_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file1', file4);
                postdata.append('file', file5);
                postdata.append('Typeofpackingmaterial', finalpackingmaterial);
                postdata.append('Remarks', finalpackingRemarks);
                postdata.append('product_ID', product_ID);
                postdata.append('AdminID', ADMIN_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/Process/CreateFinalizedPacking",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {

                        if (data.responsecode == 1) {
                            var product_ID = data.responseObject;

                        }
                    }
                });

            };
        }

    }
    function CreateShelflifestudy(product_ID) {

        var gettablelength = $("#table-iddoc6 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc6 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var file6 = ""
                var checkprotocolnfrequency = $("#table-iddoc6 tbody tr").eq(i).find(".alink").attr("href");
                if (checkprotocolnfrequency) {
                    //do nothing
                }
                else {

                    var checkfile6 = $("#table-iddoc6 tbody tr").eq(i).find(".protocolnfrequencyfile").val();
                    if (checkfile6) {
                        file6 = $("#table-iddoc6 tbody tr").eq(i).find(".protocolnfrequencyfile")[0].files[0];
                    }
                }
                var file7 = ""
                var checktestreportsfile = $("#table-iddoc6 tbody tr").eq(i).find(".alink1").attr("href");
                if (checktestreportsfile) {
                    //do nothing
                }
                else {

                    var checkfile7 = $("#table-iddoc6 tbody tr").eq(i).find(".testreportsfile").val();
                    if (checkfile7) {
                        file7 = $("#table-iddoc6 tbody tr").eq(i).find(".testreportsfile")[0].files[0];
                    }
                }
                var batch_no = $("#table-iddoc6 tbody tr").eq(i).find(".batch_no").val();
                var batch_size = $("#table-iddoc6 tbody tr").eq(i).find(".batch_size").val();
                var numofpackings = $("#table-iddoc6 tbody tr").eq(i).find(".numofpackings").val();
                var packing_material = $("#table-iddoc6 tbody tr").eq(i).find(".packing_material").val();
                var product_ID = product_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file1', file6);
                postdata.append('file', file7);
                postdata.append('BatchNo', batch_no);
                postdata.append('Batchsize', batch_size);
                postdata.append('NoofPackings', numofpackings);
                postdata.append('Packingmaterial', packing_material);
                postdata.append('product_ID', product_ID);
                postdata.append('AdminID', ADMIN_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/Process/CreateShelflifestudy",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {
                        if (data.responsecode == 1) {
                            var product_ID = data.responseObject;

                        }
                    }
                });

            };
        }

    }
    function CreateMaterialStock(product_ID) {

        var gettablelength = $("#table-iddoc7 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {

                var ID = $("#table-iddoc7 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var MaterialName_of_Material = $("#table-iddoc7 tbody tr").eq(i).find(".MaterialName_of_Material").val();
                var MaterialOpening_stock = $("#table-iddoc7 tbody tr").eq(i).find(".MaterialOpening_stock").val();
                var MaterialDispensedforBatchNo = $("#table-iddoc7 tbody tr").eq(i).find(".MaterialDispensedforBatchNo").val();
                var MaterialDispensed_on = $("#table-iddoc7 tbody tr").eq(i).find(".MaterialDispensed_on").val();
                var MaterialDispensed_kgs = $("#table-iddoc7 tbody tr").eq(i).find(".MaterialDispensed_kgs").val();
                var MaterialClosing_stock = $("#table-iddoc7 tbody tr").eq(i).find(".MaterialClosing_stock").val();
                var Process_JobID = Process_JobID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('MaterialName', MaterialName_of_Material);
                postdata.append('Openingstock', MaterialOpening_stock);
                postdata.append('DispensedBatchno', MaterialDispensedforBatchNo);
                postdata.append('Dispensedon', MaterialDispensed_on);
                postdata.append('Dispensedqty', MaterialDispensed_kgs);
                postdata.append('Closingstock', MaterialClosing_stock);
                postdata.append('product_ID', product_ID);
                postdata.append('AdminID', ADMIN_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/Process/CreateManufacturingMaterialstock",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {

                        if (data.responsecode == 1) {
                            var product_ID = data.responseObject;

                        }
                    }
                });

            };
        }

    }
    function CreateBatchSheet(product_ID) {

        var gettablelength = $("#table-iddoc8 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc8 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var file8 = ""
                var checkmpcrformatfile = $("#table-iddoc8 tbody tr").eq(i).find(".alink").attr("href");
                if (checkmpcrformatfile) {
                    //do nothing
                }
                else {

                    var checkfile8 = $("#table-iddoc8 tbody tr").eq(i).find(".mpcrformatfile").val();
                    if (checkfile8) {
                        file8 = $("#table-iddoc8 tbody tr").eq(i).find(".mpcrformatfile")[0].files[0];
                    }
                }
                var file9 = ""
                var checkflowchatfile = $("#table-iddoc8 tbody tr").eq(i).find(".alink1").attr("href");
                if (checkflowchatfile) {
                    //do nothing
                }
                else {

                    var checkfile9 = $("#table-iddoc8 tbody tr").eq(i).find(".flowchatfile").val();
                    if (checkfile9) {
                        file9 = $("#table-iddoc8 tbody tr").eq(i).find(".flowchatfile")[0].files[0];
                    }
                }
                var file10 = ""
                var checkrecordfile = $("#table-iddoc8 tbody tr").eq(i).find(".alink1").attr("href");
                if (checkrecordfile) {
                    //do nothing
                }
                else {

                    var checkfile10 = $("#table-iddoc8 tbody tr").eq(i).find(".process_recordfile").val();
                    if (checkfile10) {
                        file10 = $("#table-iddoc8 tbody tr").eq(i).find(".process_recordfile")[0].files[0];
                    }
                }
                var file11 = ""
                var checkbatchtestreportsfile = $("#table-iddoc8 tbody tr").eq(i).find(".alink1").attr("href");
                if (checkbatchtestreportsfile) {
                    //do nothing
                }
                else {

                    var checkfile11 = $("#table-iddoc8 tbody tr").eq(i).find(".batchtestreportsfile").val();
                    if (checkfile11) {
                        file11 = $("#table-iddoc8 tbody tr").eq(i).find(".batchtestreportsfile")[0].files[0];
                    }
                }
                var sheet_batch_no = $("#table-iddoc8 tbody tr").eq(i).find(".sheet_batch_no").val();
                var batchremarks = $("#table-iddoc8 tbody tr").eq(i).find(".batchremarks").val();
                var product_ID = product_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('file2', file8);
                postdata.append('file3', file9);
                postdata.append('file', file10);
                postdata.append('file1', file11);
                postdata.append('Batchno', sheet_batch_no);
                postdata.append('Remarks', batchremarks);
                postdata.append('product_ID', product_ID);
                postdata.append('AdminID', ADMIN_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/Process/CreateBatchSheet",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {

                        if (data.responsecode == 1) {
                            var product_ID = data.responseObject;

                        }
                    }
                });

            };
        }

    }
    function CreateDispatchDetails(product_ID) {

        var gettablelength = $("#table-iddoc9 tbody tr").length; var gettablelength = $("#table-iddoc9 tbody tr").length;
        if (gettablelength > 0) {
            for (var i = 0; i < gettablelength; i++) {
                var ID = $("#table-iddoc9 tbody tr").eq(i).find(".txtid").val();
                if (ID == undefined) {
                    ID = null;
                }
                var dispatchBatchNo = $("#table-iddoc9 tbody tr").eq(i).find(".dispatchBatchNo").val();
                var dispatchOpening_stock = $("#table-iddoc9 tbody tr").eq(i).find(".dispatchOpening_stock").val();
                var dispatchedto = $("#table-iddoc9 tbody tr").eq(i).find(".dispatchedto").val();
                var dispatchedQty = $("#table-iddoc9 tbody tr").eq(i).find(".dispatchedQty").val();
                var dispatchedOn = $("#table-iddoc9 tbody tr").eq(i).find(".dispatchedOn").val();
                var dispatchClosing_stock = $("#table-iddoc9 tbody tr").eq(i).find(".dispatchClosing_stock").val();
                var product_ID = product_ID;
                var postdata = new FormData();
                postdata.append('ID', ID);
                postdata.append('BatchNo', dispatchBatchNo);
                postdata.append('Openingstock', dispatchOpening_stock);
                postdata.append('Dispatchedto', dispatchedto);
                postdata.append('Dispatchedqty', dispatchedQty);
                postdata.append('Dispatchedon', dispatchedOn);
                postdata.append('Closingstock', dispatchClosing_stock);
                postdata.append('product_ID', product_ID);
                postdata.append('AdminID', ADMIN_AUTH);

                $.ajax({
                    url: "https://api.pdca.in/Process/CreateDispatchDetails",
                    type: "POST",
                    data: postdata,
                    async: false,
                    dataType: "json",
                    processData: false,
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    success: function (data) {

                        if (data.responsecode == 1) {
                            var product_ID = data.responseObject;
                        }
                    }
                });

            };
        }
    }

    $("#table-iddoc1").on("click", ".deleteRow", function () {
        debugger
        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Process/DeletePrototype?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });

    $("#table-iddoc2").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Process/DeleteMaterialstock?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });

    $("#table-iddoc3").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Process/DeleteProcessflow?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });

    $("#table-iddoc6").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Process/DeleteShelflifestudy?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });

    $("#table-iddoc7").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Process/DeleteManufacturingMaterialstock?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });

    $("#table-iddoc8").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Process/DeleteBatchSheet?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });

    $("#table-iddoc9").on("click", ".deleteRow", function () {

        var id = $(this).attr("id");
        if (id != undefined) {
            var result = confirm("Are you Sure? You Want to Delete");
            if (result) {
                $.ajax({
                    url: "https://api.pdca.in/Process/DeleteDispatchdetails?AdminID=" + ADMIN_AUTH + "&ID=" + id + "",
                    type: "GET",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    /*data: fileData,*/
                    success: function (data) {
                        if (data.responsecode == 1) {
                            $("#" + id).closest("tr").remove();
                            alert("Record Deleted Succesfuly")
                        }
                    }
                });
            }
        }
        else {
            $(this).closest("tr").remove();
        }
    });


    function tableiddoc() {
        var currentSno1 = parseInt($("#table-iddoc1 .addrow:last").attr("sno")) + 1;

        var currentSnos1 = 2;
        $("#table-iddoc1").on("click", ".addrow", function () {
            if (currentSno1 >= 1) {
                var getvalue = currentSno1++;
            } else {

                var getvalue = currentSnos1++;
            }
            var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="text" name="" id="name_of_product" class="name_of_product form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ingredient_name" class="ingredient_name form-control"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="spec_req" class="spec_req form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="source_details" class="source_details form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-iddoc1 tbody").append(getrowcontent);
        });
        $("#table-iddoc1").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos1 = 2;
    $("#table-iddoc1").on("click", ".addrow1", function () {
        var getvalue = currentSnos1++;

        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="text" name="" id="name_of_product" class="name_of_product form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="ingredient_name" class="ingredient_name form-control"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="spec_req" class="spec_req form-control"></textarea> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="source_details" class="source_details form-control"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-iddoc1 tbody").append(getrowcontent);
    });
    $("#table-iddoc1").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });


    function tablequality() {
        var currentSno2 = parseInt($("#table-iddoc2 .addrow:last").attr("sno1")) + 1;
        var currentSnos2 = 2;
        $("#table-iddoc2").on("click", ".addrow", function () {
            if (currentSno2 >= 1) {
                var getvalue = currentSno2++;
            } else {

                var getvalue = currentSnos2++;
            }
            var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="text" name="" id="Name_of_Material" class="Name_of_Material form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Opening_stock" class="Opening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="DispensedforBatchNo" class="DispensedforBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="Dispensed_on" class="Dispensed_on form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Dispensed_kgs" class="Dispensed_kgs form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Closing_stock" class="Closing_stock form-control w-200px"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-iddoc2 tbody").append(getrowcontent);
        });
        $("#table-iddoc2").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos2 = 2;
    $("#table-iddoc2").on("click", ".addrow1", function () {
        var getvalue = currentSnos2++;

        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="text" name="" id="Name_of_Material" class="Name_of_Material form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Opening_stock" class="Opening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="DispensedforBatchNo" class="DispensedforBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="Dispensed_on" class="Dispensed_on form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Dispensed_kgs" class="Dispensed_kgs form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="Closing_stock" class="Closing_stock form-control w-200px"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-iddoc2 tbody").append(getrowcontent);
    });
    $("#table-iddoc2").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });


    function tableAunalTraining() {
        var currentSno3 = parseInt($("#table-iddoc3 .addrow:last").attr("sno2")) + 1;
        var currentSnos3 = 2;
        $("#table-iddoc3").on("click", ".addrow", function () {
            if (currentSno3 >= 1) {
                var getvalue = currentSno3++;
            } else {

                var getvalue = currentSnos3++;
            }
            var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <input type="file" class="processflowfile w-200px" id="processflowfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="trail" class="trail form-control w-200px"> </div></td><td> <input type="file" class="sensoryDatafile w-200px" id="sensoryDatafile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="processFlowRemarks" class="processFlowRemarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-iddoc3 tbody").append(getrowcontent);
        });
        $("#table-iddoc3").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos3 = 2;
    $("#table-iddoc3").on("click", ".addrow1", function () {
        var getvalue = currentSnos3++;

        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <input type="file" class="processflowfile w-200px" id="processflowfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="trail" class="trail form-control w-200px"> </div></td><td> <input type="file" class="sensoryDatafile w-200px" id="sensoryDatafile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="processFlowRemarks" class="processFlowRemarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-iddoc3 tbody").append(getrowcontent);
    });
    $("#table-iddoc3").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });


    //$("#table-iddoc6").on("click", ".addrow", function () {

    //    var getrowcontent = ' <tr> <td> <div class="form-group"> <input type="text" name="" id="batch_no" class="batch_no form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="batch_size" class="batch_size form-control w-200px"> </div></td><td> <input type="file" class="protocolnfrequencyfile w-200px" id="protocolnfrequencyfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <input type="text" name="" id="numofpackings" class="numofpackings form-control w-200px"> </div></td><td> <div class="form-group"> <textarea type="text" name="" id="packing_material" class="packing_material form-control w-200px"></textarea> </div></td><td> <input type="file" class="testreportsfile w-200px" id="testreportsfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //    $("#table-iddoc6 tbody").append(getrowcontent);
    //});
    //$("#table-iddoc6").on("click", ".deleterow", function () {
    //    $(this).closest("tr").remove();
    //});

    function tableTraining() {
        var currentSno4 = parseInt($("#table-iddoc7 .addrow:last").attr("sno3")) + 1;
        var currentSnos4 = 2;
        $("#table-iddoc7").on("click", ".addrow", function () {
            if (currentSno4 >= 1) {
                var getvalue = currentSno4++;
            } else {

                var getvalue = currentSnos4++;
            }
            var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="text" name="" id="MaterialName_of_Material" class="MaterialName_of_Material form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialOpening_stock" class="MaterialOpening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialDispensedforBatchNo" class="MaterialDispensedforBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="MaterialDispensed_on" class="MaterialDispensed_on form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialDispensed_kgs" class="MaterialDispensed_kgs form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialClosing_stock" class="MaterialClosing_stock form-control w-200px"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-iddoc7 tbody").append(getrowcontent);
        });
        $("#table-iddoc7").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos4 = 2;
    $("#table-iddoc7").on("click", ".addrow1", function () {
        var getvalue = currentSnos4++;

        var getrowcontent = ' <tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="text" name="" id="MaterialName_of_Material" class="MaterialName_of_Material form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialOpening_stock" class="MaterialOpening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialDispensedforBatchNo" class="MaterialDispensedforBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="MaterialDispensed_on" class="MaterialDispensed_on form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialDispensed_kgs" class="MaterialDispensed_kgs form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="MaterialClosing_stock" class="MaterialClosing_stock form-control w-200px"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-iddoc7 tbody").append(getrowcontent);
    });
    $("#table-iddoc7").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });


    function tableskill() {
        var currentSno5 = parseInt($("#table-iddoc8 .addrow:last").attr("sno4")) + 1;
        var currentSnos5 = 2;
        $("#table-iddoc8").on("click", ".addrow", function () {
            if (currentSno5 >= 1) {
                var getvalue = currentSno5++;
            } else {

                var getvalue = currentSnos5++;
            }
            var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="text" name="" id="sheet_batch_no" class="sheet_batch_no form-control w-200px"> </div></td><td> <input type="file" class="mpcrformatfile w-200px" id="mpcrformatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="flowchatfile w-200px" id="flowchatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="process_recordfile w-200px" id="process_recordfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="batchtestreportsfile w-200px" id="batchtestreportsfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="batchremarks" class="batchremarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
            $("#table-iddoc8 tbody").append(getrowcontent);
        });
        $("#table-iddoc8").on("click", ".deleterow", function () {
            $(this).closest("tr").remove();
        });
    }
    var currentSnos5 = 2;
    $("#table-iddoc8").on("click", ".addrow1", function () {
        var getvalue = currentSnos5++;

        var getrowcontent = '<tr> <td> <input type="button" name="&plus" value="+" class="addrow1 border-0 add btn btn-icon btn-light btn-sm"/> </td><td>' + getvalue + '</td><td> <div class="form-group"> <input type="text" name="" id="sheet_batch_no" class="sheet_batch_no form-control w-200px"> </div></td><td> <input type="file" class="mpcrformatfile w-200px" id="mpcrformatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="flowchatfile w-200px" id="flowchatfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="process_recordfile w-200px" id="process_recordfile" aria-describedby="inputGroupFileAddon01"> </td><td> <input type="file" class="batchtestreportsfile w-200px" id="batchtestreportsfile" aria-describedby="inputGroupFileAddon01"> </td><td> <div class="form-group"> <textarea type="text" name="" id="batchremarks" class="batchremarks form-control w-200px"></textarea> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
        $("#table-iddoc8 tbody").append(getrowcontent);
    });
    $("#table-iddoc8").on("click", ".deleterow", function () {
        $(this).closest("tr").remove();
    });


    //function tableskill() {
    //    var currentSno6 = parseInt($("#table-skill .addrow:last").attr("sno4")) + 1;
    //    var currentSnos6 = 2;
    //    $("#table-iddoc9").on("click", ".addrow", function () {
    //        if (currentSno6 >= 1) {
    //            var getvalue = currentSno6++;
    //        } else {

    //            var getvalue = currentSnos6++;
    //        }
    //        var getrowcontent = '<tr> <td> <div class="form-group"> <input type="text" name="" id="dispatchBatchNo" class="dispatchBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchOpening_stock" class="dispatchOpening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchedto" class="dispatchedto form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchedQty" class="dispatchedQty form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="dispatchedOn" class="dispatchedOn form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchClosing_stock" class="dispatchClosing_stock form-control w-200px"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //        $("#table-iddoc9 tbody").append(getrowcontent);
    //    })
    //    $("#table-iddoc9").on("click", ".deleterow", function () {
    //        $(this).closest("tr").remove();
    //    });
    //}
    //var currentSnos6 = 2;
    //$("#table-iddoc9").on("click", ".addrow", function () {
    //   var getvalue = currentSnos6++;

    //    var getrowcontent = '<tr> <td> <div class="form-group"> <input type="text" name="" id="dispatchBatchNo" class="dispatchBatchNo form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchOpening_stock" class="dispatchOpening_stock form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchedto" class="dispatchedto form-control w-200px"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchedQty" class="dispatchedQty form-control w-200px"> </div></td><td> <div class="form-group"> <input type="date" name="" id="dispatchedOn" class="dispatchedOn form-control"> </div></td><td> <div class="form-group"> <input type="text" name="" id="dispatchClosing_stock" class="dispatchClosing_stock form-control w-200px"> </div></td><td> <div class="deleterow" style="cursor:pointer" id="delete"><i class="menu-icon flaticon2-rubbish-bin text-danger"></i></div></td></tr>';
    //    $("#table-iddoc9 tbody").append(getrowcontent);
    //})
    //$("#table-iddoc9").on("click", ".deleterow", function () {
    //    $(this).closest("tr").remove();
    //});
});