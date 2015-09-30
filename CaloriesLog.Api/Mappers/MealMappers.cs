using CaloriesLog.Api.Models;
using CaloriesLog.Api.Poco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaloriesLog.Api.Mappers
{
    public static class MealMappers
    {

        public static MealPoco ToPoco(this MealModel model)
        {
            var poco = new MealPoco();
            poco.Calories = model.Calories;
            poco.DateTime = model.DateTime;
            poco.Text = model.Text;
            poco.Id = model.Id;
            return poco;
        }

        public static MealModel ToModel(this MealPoco poco)
        {
            var model = new MealModel();
            model.Calories = poco.Calories;
            model.DateTime = poco.DateTime;
            model.Text = poco.Text;
            model.Id = poco.Id;
            return model;
        }
    }
}