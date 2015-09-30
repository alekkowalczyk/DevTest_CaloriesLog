using CaloriesLog.Api.Models;
using CaloriesLog.Api.Poco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaloriesLog.Api.Mappers
{
    public static class UserSettingMappers
    {
        public static UserSettingPoco ToPoco(this UserSettingModel model)
        {
            var poco = new UserSettingPoco();
            poco.UserId = model.UserId;
            poco.CaloriesDayLimit = model.CaloriesDayLimit;
            return poco;
        }

        public static UserSettingModel ToModel(this UserSettingPoco poco)
        {
            var model = new UserSettingModel();
            model.UserId = poco.UserId;
            model.CaloriesDayLimit = poco.CaloriesDayLimit;
            return model;
        }
    }
}