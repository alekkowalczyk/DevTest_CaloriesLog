'use strict';
app.controller('userSettingsController', ['$http', '$scope', '$location', 'userSettingsService', function ($http, $scope, $location,  userSettingsService) {

    $scope.errorWrapper = userSettingsService.errorWrapper;
    userSettingsService.loadSettings().then(function () {
        $scope.model = userSettingsService.model;
    }, function (error) {
    });

    $scope.saveSettings = function () {
        userSettingsService.saveSettings();
    };
    }]);