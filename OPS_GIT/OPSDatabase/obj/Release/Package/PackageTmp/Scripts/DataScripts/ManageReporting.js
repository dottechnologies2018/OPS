$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
    if (jqxhr.status === 401) {     
        window.location.href = "/Account/Login";
    } else {
        if (thrownError != null) {
            console.log("Reporting Page:" + thrownError);
        } else {
            console.log("Reporting Page:" + "error");
        }
    }
});

$(document).ready(function () {

    ExcelSearch();
    ExcelDownTimeSearch();

    $(".checkbox-wrapper input[type=checkbox]").click(function () {
        if (this.checked) {
            $(".checkbox-wrapper input[type=checkbox]").attr('checked', false);
            this.checked = true;
            $(".range-wrapper").find("input[type=text]").attr('disabled', true);
            $(".range-wrapper").find("input[type=text]").val('');
        }
        else {
            $(".range-wrapper").find("input[type=text]").removeAttr('disabled');
        }
    });


    $(".range-wrapper input[type=text]").click(function () {
        $(".checkbox-wrapper").find("input[type=checkbox]").attr('checked', false);
    });

    $("#Export").click(function () {
        //if ($("#To").val() != "") {
        //    if ($("#From").val() == "") {
        //        $('.Fromerror').removeClass('d-none');
        //    }                   
        //}

        //if ($("#From").val() != "") {
        //    if ($("#To").val() == "") {
        //        $('.Toerror').removeClass('d-none');
        //    }
        //}
    });


    $("#Search").click(function () {
        ExcelSearch();
        ExcelDownTimeSearch();
    });

    function ExcelSearch() {
        $.ajax({
            type: "Post",
            url: $("#customTable").data("request-url"), // "/Home/ExcelSearchParam",
            data: $("#frmExcel").serialize(),
            beforeSend: function () {
                //ajaxindicatorstart();
            },
            success: function (data) {
                // ajaxindicatorstop();     
                //debugger;
                $("#customTable").removeClass('d-none');
                $('#Result').empty();
                if (data.length > 0) {
                    var tr;
                    var odd = "test";
                    var even = "test2";
                    for (var i = 0; i < data.length; i++) {
                        //var classname = (i % 2 == 0 ? "odd" : "even");
                        //console.log(classname)
                        //tr = $('<tr class='+classname+' />');
                        tr = $('<tr/>');
                        tr.append('<td data-title="ShiftTime">' + data[i].ShiftTime + '</td>');
                        tr.append('<td data-title="CV01">' + chkNull(data[i].CV01) + '</td>');
                        tr.append('<td data-title="Rougher">' + chkNull(data[i].Rougher) + '</td>');
                        tr.append('<td data-title="HMC">' + chkNull(data[i].HMC) + '</td>');
                        tr.append('<td data-title="FlocUse">' + chkNull(data[i].FlocUse) + '</td>');
                        tr.append('<td data-title="FlocBatch">' + chkNull(data[i].FlocBatch) + '</td>');
                        tr.append('<td data-title="Slime">' + chkNull(data[i].Slime) + '</td>');
                        tr.append('<td data-title="SlimePer">' + chkNull(data[i].SlimePer) + '</td>');
                        tr.append('<td data-title="Tails1">' + chkNull(data[i].Tails1) + '</td>');
                        tr.append('<td data-title="Tails2">' + chkNull(data[i].Tails2) + '</td>');
                        tr.append('<td data-title="Reason">' + chkNull(data[i].Reason) + '</td>');
                        tr.append('<td class="d-none" data-title="ManageShifts_Id">"' + data[i].ManageShifts_Id + '"</td>');
                        tr.append('<td class="d-none" data-title="Unique_ID">"' + data[i].Unique_ID + '"</td>');
                        $('#Result').append(tr);
                    }
                    //ExcelSearchTotal();
                    ExcelSearchTotalRuntime(data);
                    //$('#Result').append(tr);
                }

                else {
                    var tr;
                    tr = $("<tr/>");
                    tr.append('<td data-title="NoData" class="text-center" colspan="13">No Data Available</td>');
                    $('#Result').append(tr);
                }
            },
            error: function (response) {
                ////if (response.status == 401)   {
                ////    alert('Session Timed Out');
                ////    window.location.href = "/Account/Login";
                ////}
                //console.log(response);
                // ajaxindicatorstop();
                // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
            }
        });
    }


    function ExcelSearchTotal() {

        $.ajax({
            type: "Post",
            url: "/Home/ExcelSearchTotal",
            data: $("#frmExcel").serialize(),
            beforeSend: function () {
                //ajaxindicatorstart();
            },
            success: function (data) {
                // ajaxindicatorstop();               
                console.log(data);
                var total;
                total = $("<tr class='font-weight-bold'/>");
                total.append('<td data-title="ShiftTime">Total</td>');
                total.append('<td data-title="CV01">' + chkNull(data.CV01) + '</td>');
                total.append('<td data-title="Rougher">' + chkNull(data.Rougher) + '</td>');
                total.append('<td data-title="HMC">' + chkNull(data.HMC) + '</td>');
                total.append('<td data-title="FlocUse">' + chkNull(data.FlocUse) + '</td>');
                total.append('<td data-title="FlocBatch">' + chkNull(data.FlocBatch) + '</td>');
                total.append('<td data-title="Slime">' + chkNull(data.Slime) + '</td>');
                total.append('<td data-title="SlimePer">' + chkNull(data.SlimePer) + '</td>');
                total.append('<td data-title="Tails1">' + chkNull(data.Tails1) + '</td>');
                total.append('<td data-title="Tails2">' + chkNull(data.Tails2) + '</td>');
                total.append('<td data-title="Reason">' + chkNull(data.Reason) + '</td>');
                total.append('<td class="d-none" data-title="ManageShifts_Id"></td>');
                total.append('<td class="d-none" data-title="Unique_ID"></td>');
                $('#Result').append(total);
            },
            error: function () {
                // ajaxindicatorstop();
                // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
            }
        });




    }

    function ExcelSearchTotalRuntime(data) {
        var CV01 = [];
        var Rougher = [];
        var HMC = [];
        var FlocUse = [];
        var Slime = [];
        var SlimePer = [];
        var Tails1 = [];
        var Tails2 = [];

        var total = data.length;
        total = total * 60 * 60;

        var runtimeCV01, runtimeRougher, runtimeHMC, runtimeFlocUse, runtimeSlime, runtimeSlimePer, runtimeTails1, runtimeTails2 = 0;
        var downtimeCV01, downtimeRougher, downtimeHMC, downtimeFlocUse, downtimeSlime, downtimeSlimePer, downtimeTails1, downtimeTails2 = 0;

        for (var i = 0; i < data.length; i++) {
            if (data[i].CV01 != null) {
                CV01.push(parseFloat(chkNull_Numeric(data[i].CV01)));
            }

            if (data[i].Rougher != null) {
                Rougher.push(parseFloat(chkNull_Numeric(data[i].Rougher)));
            }

            if (data[i].HMC != null) {
                HMC.push(parseFloat(chkNull_Numeric(data[i].HMC)));
            }

            if (data[i].FlocUse != null) {
                FlocUse.push(parseFloat(chkNull_Numeric(data[i].FlocUse)));
            }

            if (data[i].Slime != null) {
                Slime.push(parseFloat(chkNull_Numeric(data[i].Slime)));
            }

            if (data[i].SlimePer != null) {
                SlimePer.push(parseFloat(chkNull_Numeric(data[i].SlimePer)));
            }

            if (data[i].Tails1 != null) {
                Tails1.push(parseFloat(chkNull_Numeric(data[i].Tails1)));
            }

            if (data[i].Tails2 != null) {
                Tails2.push(parseFloat(chkNull_Numeric(data[i].Tails2)));
            }

            //CV01.push(parseFloat(chkNull_Numeric(data[i].CV01)));
            //Rougher.push(parseFloat(chkNull_Numeric(data[i].Rougher)));
            //HMC.push(parseFloat(chkNull_Numeric(data[i].HMC)));
            //FlocUse.push(parseFloat(chkNull_Numeric(data[i].FlocUse)));
            //Slime.push(parseFloat(chkNull_Numeric(data[i].Slime)));
            //SlimePer.push(parseFloat(chkNull_Numeric(data[i].SlimePer)));
            //Tails1.push(parseFloat(chkNull_Numeric(data[i].Tails1)));
            //Tails2.push(parseFloat(chkNull_Numeric(data[i].Tails2)));
        }

        function getSum(total, num) {
            return total + num;
        }

        var t;
        t = $("<tr class='font-weight-bold'/>");
        t.append('<td data-title="ShiftTime">Total</td>');
        t.append('<td data-title="CV01">' + chkInteger(CV01.reduce(getSum)) + '</td>');
        t.append('<td data-title="Rougher">' + chkInteger(Rougher.reduce(getSum)) + '</td>');
        t.append('<td data-title="HMC">' + chkInteger(HMC.reduce(getSum)) + '</td>');
        t.append('<td data-title="FlocUse">' + chkInteger(FlocUse.reduce(getSum)) + '</td>');
        t.append('<td data-title="FlocBatch"></td>');
        t.append('<td data-title="Slime">' + chkInteger(Slime.reduce(getSum)) + '</td>');
        t.append('<td data-title="SlimePer">' + chkInteger(SlimePer.reduce(getSum)) + '</td>');
        t.append('<td data-title="Tails1">' + chkInteger(Tails1.reduce(getSum)) + '</td>');
        t.append('<td data-title="Tails2" colspan="4">' + chkInteger(Tails2.reduce(getSum)) + '</td>');     
        $('#Result').append(t);

        ////var addSecs = 60 * 60;
        ////runtimeCV01 = CV01.length * addSecs;
        ////runtimeRougher = Rougher.length * addSecs;
        ////runtimeHMC = HMC.length * addSecs;
        ////runtimeFlocUse = FlocUse.length * addSecs;
        ////runtimeSlime = Slime.length * addSecs;
        ////runtimeSlimePer = SlimePer.length * addSecs;
        ////runtimeTails1 = Tails1.length * addSecs;
        ////runtimeTails2 = Tails2.length * addSecs;

        //console.log(total);
        //console.log(runtimeCV01);

        ////downtimeCV01 = total - runtimeCV01;
        ////downtimeRougher = total - runtimeRougher;
        ////downtimeHMC = total - runtimeHMC;
        ////downtimeFlocUse = total - runtimeFlocUse;
        ////downtimeSlime = total - runtimeSlime;
        ////downtimeSlimePer = total - runtimeSlimePer;
        ////downtimeTails1 = total - runtimeTails1;
        ////downtimeTails2 = total - runtimeTails2;

        //console.log(downtimeCV01);
        //console.log(downtimeRougher);

        ////var totalDowntime;
        ////var h = 'hours';
        ////totalDowntime = $("<tr class='font-weight-bold'/>");
        ////totalDowntime.append('<td data-title="ShiftTime">Total Downtime</td>');
        ////totalDowntime.append('<td data-title="CV01">' + ConvertSecToHour(downtimeCV01) + " " + h + '</td>');
        ////totalDowntime.append('<td data-title="Rougher">' + ConvertSecToHour(downtimeRougher) + " " + h + '</td>');
        ////totalDowntime.append('<td data-title="HMC">' + ConvertSecToHour(downtimeHMC) + " " + h + '</td>');
        ////totalDowntime.append('<td data-title="FlocUse">' + ConvertSecToHour(downtimeFlocUse) + " " + h + '</td>');
        ////totalDowntime.append('<td data-title="FlocBatch"></td>');
        ////totalDowntime.append('<td data-title="Slime">' + ConvertSecToHour(downtimeSlime) + " " + h + '</td>');
        ////totalDowntime.append('<td data-title="SlimePer">' + ConvertSecToHour(downtimeSlimePer) + " " + h + '</td>');
        ////totalDowntime.append('<td data-title="Tails1">' + ConvertSecToHour(downtimeTails1) + " " + h + '</td>');
        ////totalDowntime.append('<td data-title="Tails2" colspan="4">' + ConvertSecToHour(downtimeTails2) + " " + h + '</td>');
        ////$('#Result').append(totalDowntime);

        ////var totalRuntime;
        ////totalRuntime = $("<tr class='font-weight-bold'/>");
        ////totalRuntime.append('<td data-title="ShiftTime">Total Runtime</td>');
        ////totalRuntime.append('<td data-title="CV01">' + ConvertSecToHour(runtimeCV01) + " " + h + '</td>');
        ////totalRuntime.append('<td data-title="Rougher">' + ConvertSecToHour(runtimeRougher) + " " + h + '</td>');
        ////totalRuntime.append('<td data-title="HMC">' + ConvertSecToHour(runtimeHMC) + " " + h + '</td>');
        ////totalRuntime.append('<td data-title="FlocUse">' + ConvertSecToHour(runtimeFlocUse) + " " + h + '</td>');
        ////totalRuntime.append('<td data-title="FlocBatch"></td>');
        ////totalRuntime.append('<td data-title="Slime">' + ConvertSecToHour(runtimeSlime) + " " + h + '</td>');
        ////totalRuntime.append('<td data-title="SlimePer">' + ConvertSecToHour(runtimeSlimePer) + " " + h + '</td>');
        ////totalRuntime.append('<td data-title="Tails1">' + ConvertSecToHour(runtimeTails1) + " " + h + '</td>');
        ////totalRuntime.append('<td data-title="Tails2" colspan="4">' + ConvertSecToHour(runtimeTails2) + " " + h + '</td>');
        ////$('#Result').append(totalRuntime);
    }

    function ExcelDownTimeSearch() {
        //alert();
        $.ajax({
            type: "Post",
            url: $("#customTable_Downtime").data("request-url"), // "/Home/Reporting_ManageDowntime",
            data: $("#frmExcel").serialize(),
            beforeSend: function () {
                //ajaxindicatorstart();
            },
            success: function (data) {
                // ajaxindicatorstop();     
                //debugger;
                $("#customTable_Downtime").removeClass('d-none');
                $('#Result_Downtime').empty();
                console.log(data);
                if (data.length > 0) {
                    var tr;
                    for (var i = 0; i < data.length; i++) {
                        tr = $('<tr/>');
                        tr.append("<td data-title='Assets' data-id= " + data[i].Assets_Id + ">" + data[i].Assets + "</td>");
                        tr.append("<td data-title='Status'>" + data[i].Status + "</td>");
                        tr.append("<td data-title='From'>" + data[i].From + "</td>");
                        tr.append("<td data-title='To'>" + data[i].To + "</td>");
                        tr.append("<td data-title='TotalTime'>" + ConvertSecToHour(data[i].Time_Diff) + " hours" + "</td>");
                        tr.append("<td data-title='Reason'>" + data[i].Reason + "</td>");
                        $('#Result_Downtime').append(tr);

                        var total = 0;
                        $.each(data, function (item, value) {
                            if (total == 0) {
                                total = value.Time_Diff;
                            }
                            else {
                                total += value.Time_Diff;
                            }
                        });

                        var totalDownTime = ConvertSecToHour(total);
                        $("#totalDownTime").text(totalDownTime + ' hours');
                    }

                    GetRuntime(total);
                }

                else {
                    var tr;
                    tr = $("<tr/>");
                    tr.append('<td data-title="NoData" class="text-center" colspan="6">No Data Available</td>');
                    $('#Result_Downtime').append(tr);
                    $("#totalDownTime").text('N/A');
                    $("#totalRuntime").text('N/A');
                }
            },
            error: function (response) {

            }
        });
    }

    function GetRuntime(total) {
        $.ajax({
            type: "Get",
            url: $("#totalRuntime").data("request-url"), // "/Home/runtime",
            data: $("#frmExcel").serialize() + "&total=" + total,
            beforeSend: function () {
                //ajaxindicatorstart();
            },
            success: function (data) {
                // ajaxindicatorstop();     
                //debugger;               
                console.log(data);
                $("#totalRuntime").text(data);
            },
            error: function (response) {

            }
        });
    }

    function chkNull(value) {
        return value == null ? "" : value;
    }

    function chkNull_Numeric(value) {
        return value == null ? 0 : value;
    }

    function chkInteger(value) {
        if (value == Math.floor(value)) {
            return value;
        }
        else {
            return value.toFixed(2);
        }
    }

    function ConvertSecToHour(item) {
        var sec_num = parseInt(item); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ' : ' + minutes;
    }

});