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

window.onload = function () {
    AddNewDataEntry();
}

function AddNewDataEntry() {
    $.ajax({
        type: "Post",
        url: "/Home/AddNewDataEntry",
        beforeSend: function () {
            //ajaxindicatorstart();
        },
        success: function (data) {
            // ajaxindicatorstop();          
            GetDataEntryByDay();
        },
        error: function () {
            // ajaxindicatorstop();
            // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
        }
    });
}

function GetDataEntryByDay() {
    $.ajax({
        type: "Get",
        url: "/Home/GetDataEntryByDay",
        beforeSend: function () {
            //ajaxindicatorstart();
        },
        success: function (data) {
            // ajaxindicatorstop(); 
            if (data.length > 0) {
                $('#ManageDataEntry').empty();
                var tr;
                var edit = "<i class='far fa-edit mr-4' onclick='editManageDowntime()'></i>";
                var remove = "<i class='fas fa-times'></i>";
                for (var i = 0; i < data.length; i++) {
                    tr = $("<tr/>");
                    tr.append('<td data-title="ShiftTime">' + data[i].ShiftTime + '</td>');
                    tr.append('<td data-title="CV01"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].CV01) + '"/><label for="CV01" class="error d-none">Required</label></td>');
                    tr.append('<td data-title="Rougher"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].Rougher) + '"/><label for="Rougher" class="error d-none">Required</label></td>');
                    tr.append('<td data-title="HMC"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].HMC) + '"/><label for="HMC" class="error d-none">Required</label></td>');
                    tr.append('<td data-title="FlocUse"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].FlocUse) + '"/><label for="FlocUse" class="error d-none">Required</label></td>');
                    tr.append('<td data-title="FlocBatch"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].FlocBatch) + '"/><label for="FlocBatch" class="error d-none">Required</label></td>');
                    tr.append('<td data-title="Slime"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].Slime) + '"/><label for="Slime" class="error d-none">Required</label></td>');
                    tr.append('<td data-title="SlimePer" style="position:relative;"><input type="number" disabled  class="form-control form-control-sm SlimePer" value="' + chkNull(data[i].SlimePer) + '"/><label for="SlimePer" class="error d-none SlimePer-error">Invalid</label></td>');
                    tr.append('<td data-title="Tails1"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].Tails1) + '"/><label for="Tails1" class="error d-none">Required</label></td>');
                    tr.append('<td data-title="Tails2"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].Tails2) + '"/><label for="Tails2" class="error d-none">Required</label></td>');
                    tr.append('<td data-title="Reason"><input type="text" disabled class="form-control form-control-sm" style="width:180px;" value="' + chkNull(data[i].Reason) + '" /></td>');
                    tr.append('<td class="d-none" data-title="ManageShifts_Id">"' + data[i].ManageShifts_Id + '"</td>');
                    tr.append('<td class="d-none" data-title="Unique_ID">"' + data[i].Unique_ID + '"</td>');
                    tr.append('<td data-title="Actions"><i class="far fa-edit mr-4 editDataEntry" data-id="' + data[i].Unique_ID + '"></i><i class="fas fa-times deleteDataEntry ' + enableDisableDeleteBtn(data[i]) + '" data-id="' + data[i].Unique_ID + '"></i><i class="fas fa-times back d-none"></i></td>');
                    //if (sessionStorage.getItem("IsAdmin") == null || sessionStorage.getItem("IsAdmin") === undefined) {
                    //    tr.append('<td data-title="Actions"><i class="far fa-edit mr-4 editDataEntry" data-id="' + data[i].Unique_ID + '"></i><i class="fas fa-times deleteDataEntry ' + enableDisableDeleteBtn(data[i]) + '" data-id="' + data[i].Unique_ID + '"></i><i class="fas fa-times back d-none"></i></td>');
                    //}
                    //else {
                    //    tr.append('<td data-title="Actions"><i class="far fa-edit mr-4 editDataEntry d-none" data-id="' + data[i].Unique_ID + '"></i><i class="fas fa-times deleteDataEntry ' + enableDisableDeleteBtn(data[i]) + '" data-id="' + data[i].Unique_ID + '"></i><i class="fas fa-times back d-none"></i></td>');
                    //}
                    
                    $('#ManageDataEntry').append(tr);
                }

                //var CV01_total = 0;
                //$.each(data, function (item, value) {
                //    value
                //    if (CV01_total == 0) {
                //        CV01_total = value.CV01;
                //    }
                //    else {
                //        CV01_total += value.CV01;
                //    }
                //});


                //ConvertSecToHour(CV01_total);

            }
        },
        error: function () {
            // ajaxindicatorstop();
            // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
        }
    });
};



$('body').delegate(".SlimePer", "keyup", function () {
    if ($(this).val() > 100) {
        $(this).parent('td').find(".SlimePer-error").removeClass("d-none");
    }
    else {
        $(this).parent('td').find(".SlimePer-error").addClass("d-none");
    }
});

//$('body').delegate("input[type='number']", "keyup", function () {  
//    if ($(this).hasClass('SlimePer') == true) {
//    }
//    else {       
//        if ($(this).val().length > 0) {
//            $(this).parent('td').find(".error").addClass("d-none");
//        }
//        else {
//            $(this).parent('td').find(".error").removeClass("d-none");
//        }

//    }
//});

function enableDisableDeleteBtn(obj) {
    if (chkNull(obj.CV01) == "" && chkNull(obj.Rougher) == "" && chkNull(obj.HMC) == "" && chkNull(obj.FlocUse) == "" &&
        chkNull(obj.FlocBatch) == "" && chkNull(obj.Slime) == "" && chkNull(obj.SlimePer) == "" && chkNull(obj.Tails1) == "" &&
        chkNull(obj.Tails2) == "" && chkNull(obj.Reason) == "") {
        return "n";
    }
    else {
        return "y";
    }
}

$('body').delegate(".editDataEntry", "click", function () {
    if ($(this).hasClass('far fa-edit')) {
        $(this).parent().parent().find('td').find('input[type="number"]').attr('disabled', false);
        $(this).parent().parent().find('td').find('input[type="text"]').attr('disabled', false);
        $(this).removeClass('far fa-edit');
        $(this).addClass('fas fa-check');
        $(this).parent().find('.back').removeClass('d-none');
        $(this).parent().find('.deleteDataEntry').addClass('d-none');
    }
    else if ($(this).hasClass('fas fa-check')) {
        var $tds = $(this).parent().parent();
        //var value = 0;
        //if ($tds.find('td:eq(1) input[type="number"]').val() == "") {
        //    $tds.find('td:eq(1) input[type="number"]').parent().find('.error').removeClass('d-none');
        //    value = value + 1;
        //}

        //if ($tds.find('td:eq(2) input[type="number"]').val() == "") {
        //    $tds.find('td:eq(2) input[type="number"]').parent().find('.error').removeClass('d-none');
        //    value = value + 1;
        //}

        //if ($tds.find('td:eq(3) input[type="number"]').val() == "") {
        //    $tds.find('td:eq(3) input[type="number"]').parent().find('.error').removeClass('d-none');
        //    value = value + 1;
        //}

        //if ($tds.find('td:eq(4) input[type="number"]').val() == "") {
        //    $tds.find('td:eq(4) input[type="number"]').parent().find('.error').removeClass('d-none');
        //    value = value + 1;
        //}

        //if ($tds.find('td:eq(5) input[type="number"]').val() == "") {
        //    $tds.find('td:eq(5) input[type="number"]').parent().find('.error').removeClass('d-none');
        //    value = value + 1;
        //}

        //if ($tds.find('td:eq(6) input[type="number"]').val() == "") {
        //    $tds.find('td:eq(6) input[type="number"]').parent().find('.error').removeClass('d-none');
        //    value = value + 1;
        //}

        //if ($tds.find('td:eq(7) input[type="number"]').val() == "") {
        //    $tds.find('td:eq(7) input[type="number"]').parent().find('.error').removeClass('d-none');
        //    value = value + 1;
        //}

        //if ($tds.find('td:eq(8) input[type="number"]').val() == "") {
        //    $tds.find('td:eq(8) input[type="number"]').parent().find('.error').removeClass('d-none');
        //    value = value + 1;
        //}

        //if ($tds.find('td:eq(9) input[type="number"]').val() == "") {
        //    $tds.find('td:eq(9) input[type="number"]').parent().find('.error').removeClass('d-none');
        //    value = value + 1;
        //}

        //if (value > 0) {
        //    return false;
        //}
        //else {
            $(this).parent().parent().find('td').find('.form-control').attr('disabled', true);
            $(this).removeClass('fas fa-check');
            $(this).addClass('far fa-edit');
            var id = $(this).attr('data-id');

            var obj = {};
            obj.CV01 = $tds.find('td:eq(1) input[type="number"]').val();
            obj.Rougher = $tds.find('td:eq(2) input[type="number"]').val();
            obj.HMC = $tds.find('td:eq(3) input[type="number"]').val();
            obj.FlocUse = $tds.find('td:eq(4) input[type="number"]').val();
            obj.FlocBatch = $tds.find('td:eq(5) input[type="number"]').val();
            obj.Slime = $tds.find('td:eq(6) input[type="number"]').val();
            obj.SlimePer = $tds.find('td:eq(7) input[type="number"]').val();
            obj.Tails1 = $tds.find('td:eq(8) input[type="number"]').val();
            obj.Tails2 = $tds.find('td:eq(9) input[type="number"]').val();
            obj.Reason = $tds.find('td:eq(10) input[type="text"]').val();
            obj.Unique_ID = id;
            obj.IsDeleted = false;
            console.log(obj);
            EditDataEntry(obj);
        //}
    }

})

$('body').delegate(".deleteDataEntry", "click", function () {
    if ($(this).hasClass('y')) {
        var conf = confirm("Record will be deleted. Are you sure?");
        if (conf == true) {
            var id = $(this).attr('data-id');
            var $tds = $(this).parent().parent();
            var obj = {};
            obj.Unique_ID = id;
            obj.IsDeleted = true;
            console.log(obj);
            EditDataEntry(obj);
        }
    }
    else {
        //alert("Sorry, You are not eligible");
    }
});

$('body').delegate(".back", "click", function () {
    GetDataEntryByDay();
});

function chkNull(value) {
    return value == null ? "" : value;
}

function EditDataEntry(obj) {
    $.ajax({
        type: "Post",
        url: "/Home/EditManageDataEntry",
        data: { _obj: obj },
        beforeSend: function () {
            //ajaxindicatorstart();
        },
        success: function (data) {
            // ajaxindicatorstop();
            if (data == 1) {
               // GetDataEntryByDay();
            }
        },
        error: function () {
            // ajaxindicatorstop();
            // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
        }
    });
}

function DeleteDataEntry(ID) {
    return false;
    $.ajax({
        type: "Post",
        url: "/Home/DeleteDataEntry",
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

function ConvertSecToHour(item) {
    var sec_num = parseInt(item); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    //alert(hours + ' : ' + minutes);
    return hours + ' : ' + minutes;
}

$("#searchDataEntryFrm").validate({
    ignore: [],
    debug: false,
    rules: {
        searchDate: {
            required: true
        }
    },
    messages: {
        searchDate: {
            required: "Required"
        }
    }
});

function searchDataEntry() {
        $.ajax({
            type: "Post",
            url: "/Home/SearchDataEntry",
            data: { id: $("#SelectedShifts").val(), searchDate: $("#searchDate").val() },
            beforeSend: function () {
                //ajaxindicatorstart();
            },
            success: function (data) {
                // ajaxindicatorstop();
                $('#ManageDataEntry').empty();
                if (data.length > 0) {                    
                    var tr;
                    var edit = "<i class='far fa-edit mr-4' onclick='editManageDowntime()'></i>";
                    var remove = "<i class='fas fa-times'></i>";
                    for (var i = 0; i < data.length; i++) {
                        tr = $("<tr/>");
                        tr.append('<td data-title="ShiftTime">' + data[i].ShiftTime + '</td>');
                        tr.append('<td data-title="CV01"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].CV01) + '"/><label for="CV01" class="error d-none">Required</label></td>');
                        tr.append('<td data-title="Rougher"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].Rougher) + '"/><label for="Rougher" class="error d-none">Required</label></td>');
                        tr.append('<td data-title="HMC"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].HMC) + '"/><label for="HMC" class="error d-none">Required</label></td>');
                        tr.append('<td data-title="FlocUse"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].FlocUse) + '"/><label for="FlocUse" class="error d-none">Required</label></td>');
                        tr.append('<td data-title="FlocBatch"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].FlocBatch) + '"/><label for="FlocBatch" class="error d-none">Required</label></td>');
                        tr.append('<td data-title="Slime"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].Slime) + '"/><label for="Slime" class="error d-none">Required</label></td>');
                        tr.append('<td data-title="SlimePer" style="position:relative;"><input type="number" disabled  class="form-control form-control-sm SlimePer" value="' + chkNull(data[i].SlimePer) + '"/><label for="SlimePer" class="error d-none SlimePer-error">Invalid</label></td>');
                        tr.append('<td data-title="Tails1"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].Tails1) + '"/><label for="Tails1" class="error d-none">Required</label></td>');
                        tr.append('<td data-title="Tails2"><input type="number" disabled class="form-control form-control-sm" value="' + chkNull(data[i].Tails2) + '"/><label for="Tails2" class="error d-none">Required</label></td>');
                        tr.append('<td data-title="Reason"><input type="text" disabled class="form-control form-control-sm" style="width:180px;" value="' + chkNull(data[i].Reason) + '" /></td>');
                        tr.append('<td class="d-none" data-title="ManageShifts_Id">"' + data[i].ManageShifts_Id + '"</td>');
                        tr.append('<td class="d-none" data-title="Unique_ID">"' + data[i].Unique_ID + '"</td>');
                        tr.append('<td data-title="Actions"><i class="far fa-edit mr-4 editDataEntry" data-id="' + data[i].Unique_ID + '"></i><i class="fas fa-times deleteDataEntry ' + enableDisableDeleteBtn(data[i]) + '" data-id="' + data[i].Unique_ID + '"></i><i class="fas fa-times back d-none"></i></td>');
                        $('#ManageDataEntry').append(tr);
                    }
                }
                else {
                    var tr;
                    tr = $("<tr/>");
                    tr.append('<td data-title="NoData" class="text-center" colspan="14">No Data Available</td>');
                    $('#ManageDataEntry').append(tr);
                }

            },
            error: function () {
                // ajaxindicatorstop();
                // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
            }
        });
}

$('body').delegate("#Search", "click", function () {
    if ($("#searchDataEntryFrm").valid()) {
        searchDataEntry();
    }
    
});