'use strict';
app.controller('mealsController', ['$scope', '$location', 'mealsService', function ($scope, $location, mealsService) {

    $scope.meals = [];
    $scope.filter = mealsService.filter;
    $scope.errorWrapper = mealsService.errorWrapper;

    var refreshFunction = function () {
        mealsService.refreshMeals().then(function () {
            $scope.meals = mealsService.meals;
        }, function (error) {
        });
    };
   
    refreshFunction();

    $scope.refreshMeals = refreshFunction;

    $scope.addMeal = function () {
        mealsService.displayEditMeal();
    };

    $scope.editMeal = function (meal) {
        mealsService.displayEditMeal(meal);
    };

    $scope.deleteMeal = function (meal) {
        mealsService.deleteMeal(meal);
    };

    $scope.filterClicked = function ($event) {
        $scope.filter.isFilterActive = !$scope.filter.isFilterActive;
        if (!$scope.filter.isFilterActive) {
            $scope.filter.clearDates();
            $scope.filter.clearTimes();
            $scope.filter.exportToQueryString();
            $scope.refreshMeals();
        }
    };

    $scope.filterDateClicked = function ($event) {
        $scope.filter.isFilterDateActive = !$scope.filter.isFilterDateActive;
        if (!$scope.filter.isFilterDateActive) {
            $scope.filter.clearDates();
            $scope.filter.exportToQueryString();
            $scope.refreshMeals();
        }
    };

    $scope.filterTimeClicked = function ($event) {
        $scope.filter.isFilterTimeActive = !$scope.filter.isFilterTimeActive;
        if (!$scope.filter.isFilterTimeActive) {
            $scope.filter.clearTimes();
            $scope.filter.exportToQueryString();
            $scope.refreshMeals();
        }
    };

    $scope.datePicker = {};
    $scope.datePicker.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        if($event.srcElement.id=="from")
            $scope.openedFrom = true;
        else
            $scope.openedTo = true;
    };

    $scope.datePicker.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };

    $scope.timeChanged = function()
    {
        if ($scope.filter.timeFrom != null || $scope.filter.timeTo != null)
            $scope.filter.isFilteredDataLoaded = false;
    }
}]);