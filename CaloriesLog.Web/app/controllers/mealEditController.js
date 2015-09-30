'use strict';
app.controller('mealEditController', ['$scope', '$location', 'mealsService', function ($scope, $location, mealsService) {

    $scope.meal = mealsService.selectedMeal;
    $scope.errorWrapper = mealsService.errorWrapper;
    $scope.datePicker = {};
    $scope.datePicker.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.datePicker.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };

    $scope.backToList = function () {
        mealsService.setMeal();
        $location.path('/meals');
    };

    $scope.addEditMeal = function () {
        mealsService.saveMeal($scope.meal);
    };
    }]);