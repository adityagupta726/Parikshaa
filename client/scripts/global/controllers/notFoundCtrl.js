app.controller("notFoundCtrl",["$scope","$window",
function($scope, $window){
    setTimeout(()=>{
        $window.location.href = "#/home"
    },5000)
}])