var app = angular.module('CalorieLogApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar',
    'ui.bootstrap', 'timepickerPop']);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.common = {};
    }
    $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
    $httpProvider.defaults.headers.common.Pragma = "no-cache";
    //$httpProvider.defaults.headers.common["If-Modified-Since"] = "0";
});

app.config(function ($routeProvider) {
 
    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "app/views/home.html"
    });
 
    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/views/login.html"
    });
 
    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "app/views/signup.html"
    });
 
    $routeProvider.when("/meals", {
        controller: "mealsController",
        templateUrl: "app/views/meals.html",
        reloadOnSearch: false
    });

    $routeProvider.when("/mealEdit", {
        controller: "mealEditController",
        templateUrl: "app/views/mealEdit.html"
    });
 
    $routeProvider.when("/userSettings", {
        controller: "userSettingsController",
        templateUrl: "app/views/userSettings.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });
});
 
app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);