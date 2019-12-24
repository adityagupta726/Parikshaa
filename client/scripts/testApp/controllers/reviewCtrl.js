testApp.controller("reviewCtrl",["$scope", "$rootScope", "$routeParams","testOps",
function($scope, $rootScope, $routeParams, testOps){
    testOps.fetch(localStorage.testApp, $routeParams.testid).then((data)=>{
        $scope.test = data.test
        console.log(data)
        
         var totalscore=0,score=0,correct=0;
        
        $scope.questions = data.questions
        $scope.answers = data.answers
        answers = data.answers
        questions=data.questions
        questions.forEach(function(question){
        totalscore+=question.score;
           });
         $scope.totalscore=totalscore;
        if(answers){
          answers.forEach(function(answer){
              
              score+=answer.score;
              if(answer.score!=0){
                  correct+=1;
              }
          })
        for(question of questions){
                for(answer of answers){
                    if(question._id==answer.questionid){
                      question["chosen"]=answer["chosen"]
                    }
                }
            }
        }

        $scope.score=score;
        $scope.correct = correct;

        google.charts.load("current",{packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        google.charts.setOnLoadCallback(drawChart2);

        $scope.mapper = {}
        $scope.questions.forEach(element => {
            $scope.mapper[element._id] = false;
        });

    }).catch((err)=>{
        console.log(err)
        $scope.error=err.message
        if(err.promptlogin)$window.location.href = "#/home"
    })

    $scope.toggler = (quesid)=>{
        $scope.mapper[quesid] = !$scope.mapper[quesid]
        // attach ng-show="mapper[q._id]"
    }

    function drawChart() {
        // console.log($scope.totalscore)
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Marks scored', $scope.score ],
          ['Marks lost',$scope.totalscore-$scope.score ]
        ]);
        var options={
          title:'Score',
          is3D: true,
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }
      
      function drawChart2(){
          var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Correct answers',  $scope.correct],
            ['incorrect answers', $scope.questions.length-$scope.correct]
          ]);
          var options={
            title:'Answers',
            is3D: true,
          };
          var chart2 = new google.visualization.PieChart(document.getElementById('piechart_3d2'));
          chart2.draw(data, options);
        }
}])