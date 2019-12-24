userApp.controller("homeCtrl",["$scope", "$rootScope", "$window","userOps",
function($scope, $rootScope, $window, userOps){
    
    // console.log(Object.keys(userOps))
    $scope.showLogin = true;
    fun1();
    // var registerFlag = true;

    $scope.login = ()=>{
        // console.log("flag in login:"+$scope.showLogin)
        if($scope.showLogin){
            var promise = userOps.login($scope.userL)
            promise.then((data)=>{
                // console.log(data)
                localStorage.testApp=data.token;
                $window.location.href = "#/dashboard"; 
            }).catch((err)=>{
                // console.log(err)
                $scope.userL.password=""
                $scope.resp1="User Not Found";
                $scope.error = err.message
               
            })
        }
        else fun1()
    }
    // $scope.validation = (valid)=>{
    //         if(valid){
    //             $scope.msg = 'Form is Valid';
    //             $scope.flag= false;
    //         }
    //         else{
    //             $scope.msg = 'Form is Invalid Please check the fields';
    //         }
    //     }
        $scope.regist=()=>{
        //  console.log("regist called")
        if(!$scope.showLogin){
            // console.log("1");
            fun2();
        }
        else if($scope.Reg.$invalid){
            // console.log("2");
            fun2();
        return;
        }
        
        else{
            // console.log("3");
            $scope.register();
        }
        //  if($scope.Reg.$invalid)return;
        // else $scope.register();
        // if(!$scope.reg)$scope.reg=true;
        // else if($scope.Reg.$invalid)return;
        // else $scope.register();
       
    }
    $scope.register = ()=>{
        // console.log("flag in register:"+$scope.showLogin)
        if(!$scope.showLogin){
            // console.log($scope.userR);
            if($scope.userR.confirmPassword != $scope.userR.password){alert("Passwords do not match");  return;}
            var promise = userOps.register($scope.userR)
            promise.then((data)=>{
                // console.log(data)
                $scope.userL.username=$scope.userR.username
                $scope.userL.password=$scope.userR.password
                $scope.login()
                // $scope.resp="Registration successful, please check your email to get started    [Redirecting you to Home]";
                // setTimeout(()=>{
                //     $window.location.href="#/home";
                //     },5000
                // );
            }).catch((err)=>{
                // console.log("4");
                if(err.userconflict)$scope.resp="Username already occupied";
                else $scope.resp="User registered successfully.Please Login to continue";
                // else $scope.resp="Account could not be created due to some error";
                // $scope.userR.password=""
                // $scope.userR.confirmPassword=""
                // $scope.error = err.message
            })
        }
        else fun2()
    }

    function fun1(){
        // console.log("fun1: "+$scope.showLogin)
        $scope.showLogin =true;
        //  console.log("fun1: "+$scope.showLogin)
         
     // $("#login").click(function() {
         $("#Lsection").slideDown(1000);//show
     // });
     // $("#register").click(function() {
         $("#Rsection").slideUp(1000);//hide
     // });
    }
 
    function fun2(){
        //  console.log("fun2: "+$scope.showLogin)
         $scope.showLogin =false;
        //  console.log("fun2: "+$scope.showLogin)
        //  $("#login").click(function() {
             $("#Lsection").slideUp(1000);//hide
         // });
         // $("#register").click(function() {
             $("#Rsection").slideDown(1000);//show
         // }); 
     }

        // }

        }])

//  $("#auth").ready(function(){
//      console.log("ready")
  
//});

// $("#hide").click(function() {
//     $("div").slideUp(2000);
// });
// $("#show").click(function() {
//     $("div").slideDown(2000);
// });



