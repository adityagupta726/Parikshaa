userApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/home",{
        templateUrl:"./views/auth.html",
        controller:"homeCtrl"
    }).when("/dashboard",{
        templateUrl:"views/dashboard.html",
        controller:"dashboardCtrl"
    })
}])

testApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("")
    $routeProvider.when("/attempt/:testid", {
        templateUrl:"./views/attempt.html",
        controller:"attemptCtrl"
    }).when("/create", {
        templateUrl:"./views/create.html",
        controller:"createCtrl"
    }).when("/review/:testid", {
        templateUrl:"./views/review.html",
        controller:"reviewCtrl"
    })
}])

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("")
    $routeProvider.when("/", {
        templateUrl:"./views/description.html",
        controller:"descriptionCtrl"
    }).otherwise({
        templateUrl:"./views/notFound.html",
        controller:"notFoundCtrl"
    })
}])