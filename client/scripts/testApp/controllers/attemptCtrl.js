
testApp.controller("attemptCtrl",["$scope","$rootScope","$window","$routeParams","testOps","answerOps", "reviewOps",
function($scope, $rootScope, $window, $routeParams, testOps, answerOps, reviewOps){  
    // console.log("call");
    // console.log("$scope",$scope);
 
    $scope.revFlag = false;
    if($rootScope.loggedInT)$window.location.href = "#/dashboard"
    // var testEnd = false;
    // $scope.totalDuration;
    $scope.totalSeconds;
    $scope.totalMinutes;
    $scope.totalHours;
    var currentTime

    testOps.fetch(localStorage.testApp, $routeParams.testid).then((data)=>{
        // console.log("data",data);
        $scope.test = data.test
        // console.log("test ",$scope.test);
        // data.questions = shuffle(data.questions)
        $scope.questions = data.questions
        // console.log("questions",$scope.questions);
        $scope.answers = {}
        currentTime = data.test.duration;
        // console.log("curr",currentTime);

        $scope.totalSeconds= (data.test.duration%60).toFixed(0);  
        // console.log("sec",$scope.totalSeconds);
        $scope.totalMinutes = ((data.test.duration/60)%60).toFixed(0);
        // console.log("min",$scope.totalMinutes);
        $scope.totalHours = ((data.test.duration)/(60*60)).toFixed(0);
        // console.log("hr",$scope.totalHours);
        if($scope.totalSeconds/10 == 0) $scope.totalSeconds = "0"+$scope.totalSeconds;
        if($scope.totalMinutes/10 == 0) $scope.totalMinutes = "0"+$scope.totalMinutes;
        if($scope.totalHours/10 == 0) $scope.totalHours = "0"+$scope.totalHours;
      
       
        // $scope.totalDuration.seconds= data.test.duration%60;  
        // $scope.totalDuration.minutes = (data.test.duration/60)%60
        // $scope.totalDuration.hours = (data.test.duration)/(60*60)
        // if($scope.totalDuration.seconds/10 == 0) $scope.totalDuration.seconds = "0"+$scope.totalDuration.seconds
        // if($scope.totalDuration.minutes/10 == 0) $scope.totalDuration.minutes = "0"+$scope.totalDuration.minutes
        // if($scope.totalDuration.hours/10 == 0) $scope.totalDuration.hours = "0"+$scope.totalDuration.hours
       
        startTest()

    }).catch((err)=>{
        // console.log(err)
        $scope.error=err.message
        if(err.promptlogin)$window.location.href = "#/home"
    })



    $scope.submit = ()=>{
        // console.log("enter");
        // $(".atemptReview").slideToggle(250);
        // $(".atemptReview").slideToggle(250);
        // $("#aReviewsubmit").slideToggle(250);
        // $("#cancelReview").slideToggle(250);
        $(".atemptReview").slideDown(250);
        $("#aReviewsubmit").slideDown(250);
        $("#cancelReview").slideDown(250);
        console.log("submit called");
        $scope.revFlag= true;
        $scope.questions.forEach(element => {
            $scope.answers[element._id] = element["chosen"]
        });
        // console.log($scope.answers)
        
        answerOps.submit(localStorage.testApp, $routeParams.testid, $scope.answers).then((data)=>{
            // review?
            // clearTimeout(testEnd)
            // clearTimeout(timer)
            clearInterval(timer)
            // $scope.revFlag = true;
            // $window.location.href = "#/dashboard"
        }).catch((err)=>{
            // console.log(err)
            $scope.error = err.message
        })
    }

    function startTest(){
        // console.log("start test called");
        // testEnd = setTimeout($scope.submit, $scope.test.duration)
        $scope.currentIndex = 0
        $scope.currentQuestion = $scope.questions[$scope.currentIndex]
        // console.log("curr ques",$scope.currentQuestion);
        timer = setInterval(()=>{
            // console.log("current time",currentTime);
            
            if(currentTime>=0){
                var hours = Math.floor(currentTime/3600);
                var minutes = Math.floor((currentTime % (60 * 60))/60);
                var seconds = Math.floor(currentTime % (60));

                // var res=document.querySelector("#showTime");
                // // console.log("current time",currentTime);
                // $scope.seconds = (currentTime%60).toFixed(0);
                // var span=document.createElement("span");
                // span.innerHTML=$scope.seconds +"s";
                // // res.appendChild(span);
                // // console.log("curr sec",$scope.seconds);
                // $scope.hours = ((currentTime-$scope.seconds)/(60*60)).toFixed(0);
                // var span=document.createElement("span");
                // span.innerText=$scope.hours + "h";
                // // res.appendChild(span);
                // // console.log("curr hr",$scope.hours);
                // $scope.minutes = (((currentTime-$scope.seconds)/60)%60).toFixed(0);
                // var span=document.createElement("span");
                // span.innerText=$scope.minutes +"m";
                // // res.appendChild(span);
                // // console.log("curr min",$scope.minutes);
                // if($scope.seconds/10 == 0)$scope.seconds = "0"+$scope.seconds
                // if($scope.minutes/10 == 0)$scope.minutes = "0"+$scope.minutes
                // if($scope.hours/10 == 0)$scope.hours = "0"+$scope.hours
                if(seconds/10 == 0)seconds = "0"+seconds
                 if(minutes/10 == 0)minutes = "0"+minutes
                if(hours/10 == 0)hours = "0"+hours

                var doc=document.getElementById("showTime");
                doc.innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
                currentTime--
            }
            else {
                $scope.submit()
                // console.log("submit called");
                clearInterval(timer)
               
                // console.log("time",timer);
                // $window.location.href = "#/dashboard"
                // alert("Time is Over");
            }
        },1000)
    }

    $scope.next = ()=>{
        // $scope.mark()
        // console.log("ques length",$scope.questions.length);
        if($scope.currentIndex == $scope.questions.length-1) return
        $scope.currentIndex++;
        $scope.currentQuestion = $scope.questions[$scope.currentIndex]
        opts = document.querySelector(".opt").children
        // console.log(opts.children)
        for(li of opts){
            li = li.children[0];
            // console.log(li.id.slice(5));
            if($scope.currentQuestion.chosen == li.id.slice(5))li.checked=true;
            else li.checked = false;
        }
    }

    $scope.previous = ()=>{
        // $scope.mark()
        if($scope.currentIndex == 0) return
        $scope.currentIndex--;
        $scope.currentQuestion = $scope.questions[$scope.currentIndex]
        opts = document.querySelector(".opt").children
        // console.log(opts.children)
        for(li of opts){
            li = li.children[0];
            if($scope.currentQuestion.chosen == li.id.slice(5))li.checked=true;
            else li.checked = false;
        }
    }

    $scope.mark = (option)=>{
        $scope.questions[$scope.currentIndex].chosen = option  //$scope.currentQuestion.chosen
    }

    $scope.skip = ()=>{
        // $scope.mark()
        $scope.questions[$scope.currentIndex].chosen = undefined
        $scope.currentQuestion.chosen = undefined
        
        if($scope.currentIndex < $scope.questions.length-1)
        $scope.currentIndex++;
        $scope.currentQuestion = $scope.questions[$scope.currentIndex]
        opts = document.querySelector(".opt").children
        // console.log(opts.children)
        for(li of opts){
            li = li.children[0];
            if($scope.currentQuestion.chosen == li.id.slice(5))li.checked=true;
            else li.checked = false;
        }
        
    }

    $scope.sendReview=()=>{
        var review = $scope.review
        // console.log(review)
        // return;
        document.querySelector("#aReviewsubmit").disabled = true
        reviewOps.analyse(review).then((data)=>{
            var sentiment = data
            // console.log(sentiment)
            // return
            clearInterval(timer)
            reviewOps.sendRev(localStorage.testApp, $routeParams.testid, review, sentiment.sentiment).then((data)=>{
                $window.location.href = "#/dashboard"
            }).catch((err)=>{
                $scope.error = err.message
                document.querySelector("#aReviewsubmit").disabled = false
            })

        }).catch((err)=>{
            $scope.error = "Error in review analysis"
            // console.log(err)
            // document.querySelector("#aReviewsubmit").disabled = false
        })
    }

    $scope.cancel = ()=>{
        $window.location.href = "#/dashboard"
    }


    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

}])




// testApp.controller("attemptCtrl",["$scope","$rootScope","$window","$routeParams","testOps","answerOps", "reviewOps",//"reviewOps",
// function($scope, $rootScope, $window, $routeParams, testOps, answerOps, reviewOps){  //reviewOps
//     console.log("call");
//     console.log("$scope",$scope);
 
//     $scope.revFlag = false;
//     if($rootScope.loggedInT)$window.location.href = "#/dashboard"
//     // var testEnd = false;
//     // $scope.totalDuration;
//     $scope.totalSeconds;
//     $scope.totalMinutes;
//     $scope.totalHours;
//     var currentTime

//     testOps.fetch(localStorage.testApp, $routeParams.testid).then((data)=>{
//         console.log("data",data);
//         $scope.test = data.test
//         console.log("test ",$scope.test);
//         $scope.questions = data.questions
//         console.log("questions",$scope.questions);
//         $scope.answers = {}
//         currentTime = data.test.duration;
//         console.log("curr",currentTime);

//         $scope.totalSeconds= (data.test.duration%60).toFixed(0);  
//         console.log("sec",$scope.totalSeconds);
//         $scope.totalMinutes = ((data.test.duration/60)%60).toFixed(0);
//         console.log("min",$scope.totalMinutes);
//         $scope.totalHours = ((data.test.duration)/(60*60)).toFixed(0);
//         console.log("hr",$scope.totalHours);
//         if($scope.totalSeconds/10 == 0) $scope.totalSeconds = "0"+$scope.totalSeconds;
//         if($scope.totalMinutes/10 == 0) $scope.totalMinutes = "0"+$scope.totalMinutes;
//         if($scope.totalHours/10 == 0) $scope.totalHours = "0"+$scope.totalHours;
      
       
//         // $scope.totalDuration.seconds= data.test.duration%60;  
//         // $scope.totalDuration.minutes = (data.test.duration/60)%60
//         // $scope.totalDuration.hours = (data.test.duration)/(60*60)
//         // if($scope.totalDuration.seconds/10 == 0) $scope.totalDuration.seconds = "0"+$scope.totalDuration.seconds
//         // if($scope.totalDuration.minutes/10 == 0) $scope.totalDuration.minutes = "0"+$scope.totalDuration.minutes
//         // if($scope.totalDuration.hours/10 == 0) $scope.totalDuration.hours = "0"+$scope.totalDuration.hours
       
//         startTest()

//     }).catch((err)=>{
//         console.log(err)
//         $scope.error=err.message
//         if(err.promptlogin)$window.location.href = "#/home"
//     })



//     $scope.submit = ()=>{
//         $scope.questions.forEach(element => {
//             $scope.answers[element._id] = element["chosen"]
//         });
//         answerOps.submit(localStorage.testApp, $routeParams.testid, $scope.answers).then((data)=>{
//             // review?
//             // clearTimeout(testEnd)
//             // clearTimeout(timer)
//             $scope.revFlag = true;
//             // $window.location.href = "#/dashboard"
//         }).catch((err)=>{
//             console.log(err)
//             $scope.error = err.message
//         })
//     }

//     function startTest(){
//         console.log("start test called");
//         // testEnd = setTimeout($scope.submit, $scope.test.duration)
//         $scope.currentIndex = 0
//         $scope.currentQuestion = $scope.questions[$scope.currentIndex]
//         console.log("curr ques",$scope.currentQuestion);
//         var timer = setInterval(()=>{
//             // console.log("current time",currentTime);
            
//             if(currentTime>=0){
//                 // console.log("current time",currentTime);
//                 $scope.seconds = (currentTime%60).toFixed(0);
//                 // console.log("curr sec",$scope.seconds);
//                 $scope.hours = ((currentTime-$scope.seconds)/(60*60)).toFixed(0);
//                 // console.log("curr hr",$scope.hours);
//                 $scope.minutes = (((currentTime-$scope.seconds)/60)%60).toFixed(0);
//                 // console.log("curr min",$scope.minutes);
//                 if($scope.seconds/10 == 0)$scope.seconds = "0"+$scope.seconds
//                 if($scope.minutes/10 == 0)$scope.minutes = "0"+$scope.minutes
//                 if($scope.hours/10 == 0)$scope.hours = "0"+$scope.hours
//                 currentTime--
//             }
//             else {
//                 $scope.submit()
//                 clearInterval(timer)
//             }
//         },1000)
//     }

//     $scope.next = ()=>{
//         // $scope.mark()
//         console.log("ques length",$scope.questions.length);
//         if($scope.currentIndex == $scope.questions.length-1) return
//         $scope.currentIndex++;
//         $scope.currentQuestion = $scope.questions[$scope.currentIndex]
//     }

//     $scope.previous = ()=>{
//         // $scope.mark()
//         if($scope.currentIndex == 0) return
//         $scope.currentIndex--;
//         $scope.currentQuestion = $scope.questions[$scope.currentIndex]
//     }

//     $scope.mark = ()=>{
//         $scope.questions[$scope.currentIndex] = $scope.currentQuestion.chosen
//     }

//     $scope.skip = ()=>{
//         // $scope.mark()
//         $scope.questions[$scope.currentIndex] = undefined
//         $scope.currentQuestion.chosen = undefined
//         if($scope.currentIndex == $scope.questions.length-1) return
//         $scope.currentIndex++;
//         $scope.currentQuestion = $scope.questions[$scope.currentIndex]
//     }

//     $scope.sendReview=()=>{
//         var review = $scope.review
//         document.querySelector("#review").disabled = true
//         reviewOps.analyse(review).then((data)=>{
//             var sentiment = data.result
//             reviewOps.sendRev(localStorage.testApp, $routeParams.testid, review, sentiment).then((data)=>{
//                 $window.location.href = "#/dashboard"
//             }).catch((err)=>{
//                 $scope.error = err.message
//                 document.querySelector("#review").disabled = false
//             })

//         }).catch((err)=>{
//             $scope.error = "Error in review analysis"
//             document.querySelector("#review").disabled = false
//         })
//     }

//     $scope.cancel = ()=>{
//         $window.location.href = "#/dashboard"
//     }

// }])