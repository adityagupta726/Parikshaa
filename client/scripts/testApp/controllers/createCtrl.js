testApp.controller("createCtrl",["$scope", "$rootScope", "$window", "testOps",
function($scope, $rootScope, $window, testOps){
    $scope.crudFlag = false;
                                                                         //change
    if($rootScope.loggedInS)$window.location.href = "#/dashboard"

    $scope.create = ()=>{
       
        // console.log(localStorage.testApp+"******"+$scope.test+"******"+$scope.questions)
        var testduration=$scope.test.duration.getHours()*(60*60)+$scope.test.duration.getMinutes()*60;
        $scope.test.newduration=testduration;
        // testOps.create(localStorage.testApp,$scope.test,testduration,$scope.questions)
        // return;
        // console.log($scope.test.duration.getHours()*(60*60)+$scope.test.duration.getMinutes()*60);
        testOps.create(localStorage.testApp, $scope.test,  $scope.questions).then((data)=>{
            $window.location.href = "#/dashboard"
        }).catch((err)=>{
            // console.log(err)
            $scope.error = err.message
            if(err.promptlogin)$window.location.href = "#/home"
        })
    }

    $scope.showCrud = ()=>{
        $scope.crudFlag = true;
        // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"+$scope.test.duration.getHours()*(60*60)+$scope.test.duration.getMinutes()*60);
    }

    $scope.questions = []
    $scope.ques = {"options":[]}
    $scope.addQues = ()=>{
        if($scope.ques.options.indexOf($scope.ques.correct)==-1){
            $scope.error = "Provided correct answers does not exist in options"
            alert("Provided correct answers does not exist in options");
            return
        }
        $scope.questions.push($scope.ques)
        $scope.ques = {"options":[]}
        // console.log($scope.questions)

    }

    $scope.addOption = ()=>{
        
        $scope.ques.options.push($scope.ques.opt)
        $scope.ques.opt = ""
        // console.log($scope.ques.options)
    }

    $scope.removeOption = (option)=>{
        // console.log(option);
        // console.log($scope.ques.options.indexOf(option));
        // return
        $scope.ques.options.splice($scope.ques.options.indexOf(option),1);
    }

    $scope.removeQues = (name)=>{
        $scope.questions.pop($scope.questions.indexOf(name))
    }

    $scope.clear = ()=>{
        // $scope.ques = {}
        $scope.ques = {"options":[]}
    }

    $scope.clearAll = ()=>{
        $scope.questions = []
    }



}])