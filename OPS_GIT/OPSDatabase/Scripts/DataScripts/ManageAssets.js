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
    GetAssets();
}

$("#frmAddNewAsset").validate({
    ignore: [],
    debug: false,
    rules: {
        AssetType: {
            required: true
        }

    },
    messages: {
        AssetType: {
            required: "Required"
        }
    }
});



$("#btnSubmit").click(function () {
    var _url = $(this).data("request-url");
    if ($("#frmAddNewAsset").valid()) {
        AddNewAsset(_url);
    }
});

function AddNewAsset(_url) {
    $.ajax({
        type: "Post",
        url: _url, // "/Home/AddNewManageAsset",
        data: $("#frmAddNewAsset").serialize(),
        beforeSend: function () {
            //ajaxindicatorstart();
        },
        success: function (data) {
            // ajaxindicatorstop();
            if (data == 1) {
                GetAssets();
                $("#AddNewAssetModal").modal('hide');
                Clear();
            }
            else if (data == -2) {
                alert("Asset already exists!!");
            }
        },
        error: function () {
            // ajaxindicatorstop();
            // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
        }
    });
}


function editManageAsset(item, thiss) {
    var $tds = $(thiss).parent().parent().find('td');
    $("#AssetType").val($tds.eq(0).text());
    $("#Assets_Id").val(item);
    if (item > 0) {
        $("#AddNewAssetModalHeading").text("Edit Downtime");
        $("#btnSubmit").addClass("d-none");
        $("#btnUpdate").removeClass("d-none");
    }
    $("#AddNewAssetModal").modal('show');
}

function DeleteManageAssets(Id, Name) {
    $.ajax({
        type: "Post",
        url: $("#ManageAssets").data("delete-url"), //"/Home/DeleteManageAssets",
        data: { id: Id, name: Name },
        beforeSend: function () {
            //ajaxindicatorstart();
        },
        success: function (data) {
            // ajaxindicatorstop();
            if (data == 1) {
                GetAssets();
            }
            else if (data == 0) {
                alert("Sorry, You cannot delete this asset type.");
                //alert("Sorry, You cannot delete this asset because it has dependency");
            }
        },
        error: function () {
            // ajaxindicatorstop();
            // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
        }
    });
}

function deleteManageAssets(id, name) {   
    var conf = confirm("Record will be deleted. Are you sure?");
    if (conf == true) {
        DeleteManageAssets(id, name);
    }
   
}

$("#btnUpdate").click(function () {
    var _url = $(this).data("request-url");
    if ($("#frmAddNewAsset").valid()) {
        AddNewAsset(_url);
    }
});

function tableSearch() {    
        // Declare variables 
        var input, filter, table, tr, td, i;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        table = document.getElementById("customTable");      
        tr = table.getElementsByTagName("tr");      

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];         
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
}

function OpenAddNewAssetModal() {
    $("#Assets_Id").val(0);
    $("#AddNewAssetModalHeading").text("Add New Assets");
    $("#btnSubmit").removeClass("d-none");
    $("#btnUpdate").addClass("d-none");
    Clear();
    $("#AddNewAssetModal").modal('show');
}

function Clear() {
    $("form .form-control").val('');
}

function GetAssets() {
    $.ajax({
        type: "Get",
        url: $("#ManageAssets").data("get-url"), // "/Home/GetAssets",
        beforeSend: function () {
            //ajaxindicatorstart();
        },
        success: function (data) {
            // ajaxindicatorstop();          
            if (data.length > 0) {
                console.log(data);
                $('#ManageAssets').empty();                
                for (var i = 0; i < data.length; i++) {
                    tr = $('<tr/>');
                    tr.append("<td data-title='AssetType'>" + data[i].AssetType + "</td>");
                    tr.append('<td data-title="Actions"><i class="far fa-edit mr-4 editDataEntry" data-id="' + data[i].Assets_Id + '" onclick="editManageAsset(' + data[i].Assets_Id + ', this)"></i><i class="fas fa-times deleteDataEntry" data-id="' + data[i].Assets_Id + '" onclick="deleteManageAssets(' + data[i].Assets_Id + "," + "'" + data[i].AssetType + "'" + ')"></i><i class="fas fa-times back d-none"></i></td>');
                    $('#ManageAssets').append(tr);
                }
            }
        },
        error: function () {
            // ajaxindicatorstop();
            // swal("Sorry", "Something went wrong, please contact your site administrator", "error");
        }
    });

};

