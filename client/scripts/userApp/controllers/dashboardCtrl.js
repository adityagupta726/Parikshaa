userApp.controller("dashboardCtrl",["$scope", "$rootScope", "$window","userOps","testDelete",
function($scope, $rootScope, $window,userOps, testDelete){

    function fetchProfile(){
        var promise = userOps.fetch(localStorage.testApp)
        promise.then((data)=>{
            $scope.profile=data.profile
            // console.log(data)
            if(data.profile.role=="teacher"){
                $rootScope.loggedInT=true;
                $scope.tests=data.tests
                $rootScope.loggedInS=false;
            }
            else{
                // console.log()
                $rootScope.loggedInS=true;
                $scope.attempted=data.attempted
                $scope.unattempted=data.unattempted
                $rootScope.loggedInT=false;
            }
        }).catch((err)=>{
            // console.log(err)
            $scope.error=err.message
            if(err.promptlogin)$window.location.href = "#/home"
        })
    }
    fetchProfile()

    $scope.delete = (testid)=>{
        var promise = testDelete.delete(localStorage.testApp, testid)
        promise.then((data)=>{
            fetchProfile()
        }).catch((err)=>{
            // console.log(err)
            $scope.error= err.message
        })
    }

    $scope.review = (testid)=>{
        $window.location.href = "#/review/"+testid
    }

    $scope.attempt = (testid)=>{
        $window.location.href = "#/attempt/"+testid;
    }

    $scope.update = ()=>{
        // console.log("hello");
        if($scope.userUp.oldPassword.trim().length==0)return;
        if($scope.userUp.newPassword != $scope.userUp.confirmPassword)return
        // console.log("email in update",$scope.userUp.newemail);
        var promise = userOps.update(localStorage.testApp, $scope.userUp.newPassword, $scope.userUp.oldPassword,$scope.userUp.newemail)
        promise.then((data)=>{
            $scope.response = data.message
            alert("Profile Updated");
        }).catch((err)=>{
            // console.log(err)
            $scope.error= err.message
        })
    }

    $scope.logOut=()=>{
        // console.log("enter");
        $rootScope.logOut();
        $window.location.href="#/home";
    }

    $rootScope.logOut=()=>{
        localStorage.clear();
        $rootScope.loggedInS=false;
        $rootScope.loggedInT=false;
       
    };

    $scope.create = ()=>{
        $window.location.href = "#/create"
    }
}])