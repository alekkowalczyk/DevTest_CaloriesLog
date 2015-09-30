'use strict';
app.factory('userSettingsService', ['$http', '$location',  'authService', function ($http, $location, authService) {

    var serviceBase = 'http://localhost:12355/';
    var userSettingsServiceFactory = {};
    userSettingsServiceFactory.errorWrapper = { error: "" };

    userSettingsServiceFactory.loadSettings = function () {
      return $http.get(serviceBase + 'api/userSettings/' + authService.authentication.userName
            ).success(function (results) {
                userSettingsServiceFactory.model = results;
            }).error(function (data) {
                userSettingsServiceFactory.errorWrapper.error = "An Error has occured while getting User Setting! " + data.message;
            });
    };


    userSettingsServiceFactory.saveSettings = function () {
        $http.put(serviceBase + 'api/userSettings/' + authService.authentication.userName, userSettingsServiceFactory.model).success(function (data) {
            userSettingsServiceFactory.errorWrapper.error = "";
            $location.path('/home');
        }).error(function (data) {
            userSettingsServiceFactory.errorWrapper.error = "An Error has occured while Saving User Setting! " + data.message;
        });
    };

    return userSettingsServiceFactory;
}]);