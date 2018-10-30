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
    GetAllData();
    ddl_GetAssets();
    var pathname = window.location.href.replace("/Home/ManageDowntime", "");
    //var dt = new Date();
    //alert(dt);
    //var secs = dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));
    //alert(secs);

    $("#frmAddNewDowntime").validate({
        ignore: [],
        debug: false,
        rules: {
            Assets: {
                required: true
            },

            Status: {
                required: true
            },

            From: {
                required: true
            },

            To: {
                required: true
            },

            Reason: {
                required: true
            }

        },
        messages: {
            Assets: {
                required: "Required"
            },

            Status: {
                required: "Required"
            },

            From: {
                required: "Required"
            },

            To: {
                required: "Required"
            },

            Reason: {
                required: "Required"
            }
        }
    });


    $("#btnSubmit").click(function () {
        if ($("#frmAddNewDowntime").valid()) {
            AddNewDowmTime();
        }
    });

    $("#btnUpdate").click(function () {
        if ($("#frmAddNewDowntime").valid()) {
            AddNewDowmTime();
        }
    });


    function AddNewDowmTime() {
        $.ajax({
            type: "Post",
            url: "/Home/AddNewManageDowntime",
            data: $("#frmAddNewDowntime").serialize(),
            beforeSend: function () {
                //ajaxindicatorstart();
            },
            success: function (data) {
                // ajaxindicatorstop();
                if (data == 1) {
                    //GetAllData()
                    //GetAllDataIframe();
                    $('#AddNewDownTimeModal', parent.document).find('.close').click();
                    parent.location.reload();
                    //("#AddNewDownTimeModal").modal('hide');
                    //ClearFrmAddNewDowntime();
                }
            },
            error: function () {
                // ajaxindicatorstop();
                // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
            }
        });
    }

    function GetAllData() {
        $.ajax({
            type: "Get",
            url: "/Home/GetAllData",
            beforeSend: function () {
                //ajaxindicatorstart();
            },
            success: function (data) {
                // ajaxindicatorstop();          
                if (data.length > 0) {
                    DataBind(data);
                }
            },
            error: function () {
                // ajaxindicatorstop();
                // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
            }
        });

    };

    function GetAllDataIframe() {
        $.ajax({
            type: "Get",
            url: "/Home/GetAllData",
            beforeSend: function () {
                //ajaxindicatorstart();
            },
            success: function (data) {
                // ajaxindicatorstop();          
                if (data.length > 0) {
                    $('#ManageDowntime', parent.document).empty();
                    var tr;
                    var edit = "<i class='far fa-edit mr-4' onclick='editManageDowntime()'></i>";
                    var remove = "<i class='fas fa-times'></i>";
                    for (var i = 0; i < data.length; i++) {
                        tr = $('<tr/>');
                        tr.append("<td data-title='Assets' data-id= " + data[i].Assets_Id + ">" + data[i].Assets + "</td>");
                        tr.append("<td data-title='Status'>" + data[i].Status + "</td>");
                        tr.append("<td data-title='From'>" + data[i].From + "</td>");
                        tr.append("<td data-title='To'>" + data[i].To + "</td>");
                        tr.append("<td data-title='TotalTime'>" + ConvertSecToHour(data[i].Time_Diff) + " hours" + "</td>");
                        tr.append("<td data-title='Reason'>" + data[i].Reason + "</td>");
                        tr.append("<td data-title='Actions'>" + "<i id='editItem' class='far fa-edit mr-4' onclick='editManageDowntime(" + data[i].ManageDowntime_Id + ", this)'></i>" + "<i class='fas fa-times' onclick='deleteManageDowntime(" + data[i].ManageDowntime_Id + ")'></i>" + "</td>");


                        //alert(JSON.stringify($('#ManageDowntime', parent.document).html(str)));
                        //$('#ManageDowntime', parent.document).append(JSON.stringify(tr));
                    }

                    $('#ManageDowntime', parent.document).html(JSON.stringify(str));



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
                    $('#ManageDowntime', parent.document).text(totalDownTime);
                }
            },
            error: function () {
                // ajaxindicatorstop();
                // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
            }
        });

    };

    window.editManageDowntime = function (item, thiss) {
        var $tds = $(thiss).parent().parent().find('td');
        var d = $tds.eq(0).text();

        sessionStorage.setItem("id", item);
        sessionStorage.setItem("assets_id", $tds.eq(0).data('id'));
        sessionStorage.setItem("status", $tds.eq(1).text());
        sessionStorage.setItem("from", $tds.eq(2).text());
        sessionStorage.setItem("to", $tds.eq(3).text());
        sessionStorage.setItem("reason", $tds.eq(5).text());
        $("#iframeAddNewDownTimeModal").attr("src", pathname + "/AddDowntime.html");
        if (item > 0) {
            $("#AddNewDownTimeModalHeading").text("Edit Downtime");
        }
        $("#AddNewDownTimeModal").modal('show');
    }

    function DeleteManageDowntime(ID) {
        $.ajax({
            type: "Post",
            url: "/Home/DeleteManageDowntime",
            data: { id: ID },
            beforeSend: function () {
                //ajaxindicatorstart();
            },
            success: function (data) {
                // ajaxindicatorstop();
                if (data == 1) {
                    GetAllData();
                }
            },
            error: function () {
                // ajaxindicatorstop();
                // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
            }
        });
    }

    window.deleteManageDowntime = function (item) {
        var conf = confirm("Record will be deleted. Are you sure?");
        if (conf == true) {
            DeleteManageDowntime(item);
        }
    }

    window.tableSearch = function () {

        if ($("#search").val() != '') {
            //alert($("#search").val());      
            $("#ddl_Assets").attr('disabled', true);
            $("#searchDate").attr('disabled', true);
            $("#SearchBtn").attr('disabled', true);

        }
        else {
            $("#ddl_Assets").removeAttr('disabled');
            $("#searchDate").removeAttr('disabled');
            $("#SearchBtn").removeAttr('disabled');
        }
        // Declare variables 
        ////var input, filter, table, tr, td, i;
        ////input = document.getElementById("search");
        ////filter = input.value.toUpperCase();
        ////table = document.getElementById("customTable");
        ////tr = table.getElementsByTagName("tr");

        ////// Loop through all table rows, and hide those who don't match the search query
        ////for (i = 0; i < tr.length; i++) {
        ////    td = tr[i].getElementsByTagName("td")[0];
        ////    if (td) {
        ////        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        ////            tr[i].style.display = "";
        ////        } else {
        ////            tr[i].style.display = "none";
        ////        }
        ////    }
        ////}


        var input, filter, found, table, tr, td, i, j;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        table = document.getElementById("customTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            for (j = 0; j < td.length; j++) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                }
            }
            if (found) {
                tr[i].style.display = "";
                found = false;
            } else {
                tr[i].style.display = "none";
            }
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

    window.OpenAddNewDownTimeModal = function () {
        //$("#ManageDowntime_Id").val(0);    
        sessionStorage.clear();
        $("#AddNewDownTimeModalHeading").text("Add New Downtime");
        $("#iframeAddNewDownTimeModal").attr("src", pathname + "/AddDowntime.html");
        //$("#btnSubmit").removeClass("d-none");
        //$("#btnUpdate").addClass("d-none");
        //ClearFrmAddNewDowntime();
        $("#AddNewDownTimeModal").modal('show');
    }

    function ClearFrmAddNewDowntime() {
        $("#frmAddNewDowntime .form-control").val('');
    }


    function ddl_GetAssets() {
        $.ajax({
            type: "Get",
            url: "/Home/GetAssets",
            beforeSend: function () {
                //ajaxindicatorstart();
            },
            success: function (data) {
                // ajaxindicatorstop();          
                if (data.length > 0) {
                    //console.log(data);
                    $('#ddl_Assets').empty();
                    $("#ddl_Assets").append("<option value='0'>Select Assets</option>");
                    $.each(data, function (key, val) {
                        $("#ddl_Assets").append("<option value=\"" + val.Assets_Id + "\">" + val.AssetType + "</option>");
                    });
                }
            },
            error: function () {
                // ajaxindicatorstop();
                // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
            }
        });
    };



    $("#SearchBtn").click(function () {
        ManageDowntime_ExcelSearch();
    });

    function ManageDowntime_ExcelSearch() {
        if ($("#ddl_Assets").val() > 0) {
            //alert($("#ddl_Assets").val());
            //alert($("#searchDate").val());
            $.ajax({
                type: "Post",
                url: "/Home/ManageDowntime_ExcelSearch",
                data: { Assets_Id: $("#ddl_Assets").val(), selectedDate: $("#searchDate").val() },
                beforeSend: function () {
                    //ajaxindicatorstart();
                },
                success: function (data) {
                    // ajaxindicatorstop(); 
                    //alert(data.length);
                    if (data.length > 0) {
                        DataBind(data);
                        //$('#Result').append(tr);
                    }
                    else {
                        $('#ManageDowntime').empty();
                        var tr;
                        tr = $("<tr/>");
                        tr.append('<td data-title="NoData" class="text-center" colspan="7">No Data Available</td>');
                        $('#ManageDowntime').append(tr);
                        $("#totalDownTime").text('N/A');
                        $("#totalRuntime").text('N/A');
                    }
                },
                error: function (response) {
                    // ajaxindicatorstop();
                    // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
                }
            });
        }
    }

    function DataBind(data) {
        $('#ManageDowntime').empty();
        var tr;
        var edit = "<i class='far fa-edit mr-4' onclick='editManageDowntime()'></i>";
        var remove = "<i class='fas fa-times'></i>";
        for (var i = 0; i < data.length; i++) {
            tr = $('<tr/>');
            tr.append("<td data-title='Assets' data-id= " + data[i].Assets_Id + ">" + data[i].Assets + "</td>");
            tr.append("<td data-title='Status'>" + data[i].Status + "</td>");
            tr.append("<td data-title='From'>" + data[i].From + "</td>");
            tr.append("<td data-title='To'>" + data[i].To + "</td>");
            tr.append("<td data-title='TotalTime'>" + ConvertSecToHour(data[i].Time_Diff) + " hours" + "</td>");
            tr.append("<td data-title='Reason'>" + data[i].Reason + "</td>");
            tr.append("<td data-title='Actions'>" + "<i id='editItem' class='far fa-edit mr-4' onclick='editManageDowntime(" + data[i].ManageDowntime_Id + ", this)'></i>" + "<i class='fas fa-times' onclick='deleteManageDowntime(" + data[i].ManageDowntime_Id + ")'></i>" + "</td>");
            $('#ManageDowntime').append(tr);
        }

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

        if ($("#ddl_Assets").val() > 0) {
            var searchDate = $("#searchDate").val();          

            //$.ajax({                
            //    url: "/Home/runtime",
            //    data: { searchDate: $("#searchDate").val(), total: total },
            //    beforeSend: function () {
            //        //ajaxindicatorstart();
            //    },
            //    success: function (data) {
            //        // ajaxindicatorstop(); 
            //        alert(data);                  
            //    },
            //    error: function (response) {
            //        // ajaxindicatorstop();
            //        // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
            //    }
            //});

            //return false;
            var splitSearchDate = searchDate.split("/");
            var formatedDate = splitSearchDate[1] + '/' + splitSearchDate[0] + '/' + splitSearchDate[2]
            var selectedDate = new Date(formatedDate);
            //alert(selectedDate);
            var curr_Date = new Date();
            var curr_selectedDate = new Date((curr_Date.getMonth() + 1) + '/' + curr_Date.getDate() + '/' + curr_Date.getFullYear());
            var convertSecs = curr_Date.getSeconds() + (60 * (curr_Date.getMinutes() + (60 * curr_Date.getHours())));          
        
            var shifts_Date = new Date((curr_Date.getMonth() + 1) + '/' + curr_Date.getDate() + '/' + curr_Date.getFullYear() + ' 07:00:00');
          
            var convertshiftsSecs = shifts_Date.getSeconds() + (60 * (shifts_Date.getMinutes() + (60 * shifts_Date.getHours())));           
            
            //alert(curr_selectedDate);
            //alert(curr_Date);
            var secs = "";
            var diff = "";
            if (selectedDate < curr_selectedDate) {
                secs = (3600 * 24);
                if (total > secs) {
                    diff = parseInt(convertSecs);
                    $("#totalRuntime").text('N/A');
                }
                else {
                    diff = parseInt(secs) - parseInt(total);
                    $("#totalRuntime").text(ConvertSecToHour(diff) + ' hours');
                }
             
            }
            else if (total > convertSecs) {
                diff = parseInt(convertSecs);
                $("#totalRuntime").text('N/A');
            }
            else {
                diff = parseInt(convertSecs - convertshiftsSecs) - parseInt(total);
                $("#totalRuntime").text(ConvertSecToHour(diff) + ' hours');
            }
           
        }
        else {
            $("#totalRuntime").text('N/A');
        }
    }

    $("#ResetBtn").click(function () {
        Reset();
        GetAllData();
    });

    function Reset() {
        $("#ddl_Assets").val('0');
        $("#searchDate").datepicker('setDate', 'now');
        $("#search").val('');
        $("#ddl_Assets").removeAttr('disabled');
        $("#searchDate").removeAttr('disabled');
        $("#SearchBtn").removeAttr('disabled');
    }

});