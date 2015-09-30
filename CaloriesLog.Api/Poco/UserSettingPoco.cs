using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaloriesLog.Api.Poco
{
    public class UserSettingPoco
    {
        public string UserId { get; set; }
        public int CaloriesDayLimit { get; set; }
    }
}