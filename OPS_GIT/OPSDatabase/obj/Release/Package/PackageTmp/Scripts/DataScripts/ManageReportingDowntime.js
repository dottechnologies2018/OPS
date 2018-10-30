$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
    if (jqxhr.status === 401) {        
        window.location.href = "/Account/Login";
    } else {
        if (thrownError != null) {
            alert(thrownError);
        } else {
            alert("error");
        }
    }
});

$(document).ready(function () {

    ExcelSearch();

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


    $("#Search").click(function () {
        ExcelSearch();
    });

    function ExcelDownTimeSearch() {
        $.ajax({
            type: "Post",
            url: "/Home/Reporting_ManageDowntime",
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
                        $('#Result').append(tr);

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
                }

                else {
                    var tr;
                    tr = $("<tr/>");
                    tr.append('<td data-title="NoData" class="text-center" colspan="13">No Data Available test</td>');
                    $('#Result').append(tr);
                }
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