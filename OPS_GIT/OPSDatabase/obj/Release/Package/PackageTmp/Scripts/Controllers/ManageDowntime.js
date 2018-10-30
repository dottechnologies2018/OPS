var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http, $location, $window) {

    $scope.init = function () {
        getallData();
    };

    $scope.ConvertSecToHour = function (item) {
        var sec_num = parseInt(item); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ' : ' + minutes;      
    }

    function getallData() {
        $http.get('/Home/GetAllData')
            .then(function (response) {
                $scope.ManageDowntimeList = response.data;
                //var date = new Date();               
                //var dateString = $scope.ManageDowntime[0].CreatedDate.substr(6);
                //var currentTime = new Date(parseInt(dateString));
                //var month = currentTime.getMonth() + 1;
                //var day = currentTime.getDate();
                //var year = currentTime.getFullYear();
                //var Hour = currentTime.getHours();
                //var Min = currentTime.getMinutes();
                //var date1 = day + "/" + month + "/" + year;  
                $scope.total = 0;
                angular.forEach($scope.ManageDowntimeList, function (item) {
                    if ($scope.total == 0) {
                        $scope.total = item.Time_Diff;
                    }
                    else {
                        $scope.total += item.Time_Diff;
                    }
                 
                });

                //alert($scope.total);                               
                $scope.totalDownTime = $scope.ConvertSecToHour($scope.total);
            })
            .catch(function (data) {
                $scope.message = 'Unexpected Error while loading data!!';
                console.log($scope.message);
            });
    };

    $scope.TotalTime = function (item) {
        var fromTime = item.From.split(":");
        var fromTimeHour = parseInt(fromTime[0]);
        var fromTimeMin = parseInt(fromTime[1]);
        var toTime = item.To.split(":");
        var toTimeHour = parseInt(toTime[0]);
        var toTimeMin = parseInt(toTime[1]);
        var min = parseInt(toTimeHour - fromTimeHour) > 10 ? parseInt(toTimeHour - fromTimeHour) : "0" + parseInt(toTimeHour - fromTimeHour);
        var hour = parseInt(toTimeMin - fromTimeMin) > 10 ? parseInt(toTimeMin - fromTimeMin) : "0" + parseInt(toTimeMin - fromTimeMin);
        return min + ":" + hour;
    }

    $scope.OpenAddNewDownTimeModal = function () {
        $("#AddNewDownTimeModal").modal('show');
        $scope.ManageDowntime = {};
    }

   

    //$scope.addNewManageDowntime = function (item) {
       
      
      
        return false;

        if (item.From == "" || item.To == "" || item.Assets == null || item.Status == null || item.Reason == null || item.Reason == "") {
            return false;
        }
        else {
            var d = new Date();
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            var str1 = item.To;
            var str2 = ampm;
            if (str1.indexOf(str2) != -1 || ampm == 'AM') {
                var fromTime = item.From.split(":");
                var fromTimeHour = parseInt(fromTime[0]);
                var fromTimeMin = parseInt(fromTime[1]);
                var toTime = item.To.split(":");
                var toTimeHour = parseInt(toTime[0]);
                var toTimeMin = parseInt(toTime[1]);
                var from = parseInt(fromTimeHour) + parseInt(fromTimeMin);
                var to = parseInt(toTimeHour) + parseInt(toTimeMin);
                if (to < from) {
                    return false;
                }
                else {
                    $http.post('/Home/AddNewManageDowntime', item)
                    .then(function (response) {
                        if (response.data == 1) {
                            $("#AddNewDownTimeModal").modal('hide');
                            $scope.ManageDowntime = {};
                            getallData();
                        }
                    })
                    .catch(function (data) {
                        $scope.message = 'Unexpected Error while loading data!!';
                        console.log($scope.message);
                    });
                }
            }
            else {
                alert("Please select " + ampm + " Meridiem");
            }
        }
    //}

});





