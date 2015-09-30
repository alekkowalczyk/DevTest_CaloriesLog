'use strict';
app.factory('mealsService', ['$http', '$location', function ($http, $location) {

    var serviceBase = 'http://localhost:12355/';
    var mealsServiceFactory = {};
    mealsServiceFactory.selectedMeal = {};
    mealsServiceFactory.meals = [];
    mealsServiceFactory.errorWrapper = { error: "" };
    var filter = new Filter($location);

    filter.importFromQueryString();
    

    mealsServiceFactory.filter = filter;
    
    var _refreshMeals = function () {
        filter.exportToQueryString();
        filter.isFilteredDataLoaded = true;
        return $http.get(serviceBase + 'api/meals', {
            params:
                {
                    dateFrom: filter.dateFrom,
                    dateTo: filter.dateTo,
                    timeFrom: filter.timeFrom,
                    timeTo: filter.timeTo
                }
        }).success(function (results) {
            mealsServiceFactory.meals = results;
            mealsServiceFactory.errorWrapper.error = "";
        }).error(function (data) {
            mealsServiceFactory.errorWrapper.error = "An Error has occured while getting Meals! " + data.message;
        });
    };

    var _setMeal = function(meal)
    {
        if(meal)
        {
            mealsServiceFactory.selectedMeal = meal;
        }
        else
        {
            mealsServiceFactory.selectedMeal = {
                dateTime : new Date(),
                text : '',
                calories : 0
            }
        }
    }

    var _displayEditMeal = function (meal) {
        _setMeal(meal);
        $location.path('/mealEdit');
    }

    var _displayMeals = function()
    {
        $location.path('/meals');
    }

    var _saveMeal = function (meal) {
        if (meal.id == undefined) {
            meal.dateTime = meal.dateTime.toJSON();
            return $http.post(serviceBase + 'api/meals/', meal).success(function (data) {
                mealsServiceFactory.meals.push(data);
                mealsServiceFactory.errorWrapper.error = "";
                _displayMeals();
            }).error(function (data) {
                mealsServiceFactory.errorWrapper.error = "An Error has occured while Adding Meal! " + data.message;
            });
        }
        else {
            return $http.put(serviceBase + 'api/meals/' + meal.id, meal).success(function (data) {
                mealsServiceFactory.errorWrapper.error = "";
                _displayMeals();
            }).error(function (data) {
                mealsServiceFactory.errorWrapper.error = "An Error has occured while Saving Meal! " + data.message;
            });
        }
    };

    var _deleteMeal = function (meal) {
        if (meal.id != undefined)
        {
            return $http.delete(serviceBase + 'api/meals/' + meal.id).success(function (data) {
                var index = mealsServiceFactory.meals.indexOf(meal);
                mealsServiceFactory.meals.splice(index, 1);
            }).error(function (data) {
                mealsServiceFactory.errorWrapper.error = "An Error has occured while Deleting Meal! " + data.message;
            });
        }
    }

    

    mealsServiceFactory.refreshMeals = _refreshMeals;
    mealsServiceFactory.saveMeal = _saveMeal;
    mealsServiceFactory.deleteMeal = _deleteMeal;
    mealsServiceFactory.displayEditMeal = _displayEditMeal;
    mealsServiceFactory.displayMeals = _displayMeals;
    mealsServiceFactory.setMeal = _setMeal;

    return mealsServiceFactory;

}]);