using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaloriesLog.Api.Utils
{
    public class LocalWebConfig
    {
        public static int DefaultCaloriesDayLimit
        {
            get
            {
                int ret = 300;
                int.TryParse(System.Configuration.ConfigurationManager.AppSettings["DefaultCaloriesDayLimit"], out ret);
                return ret;
            }
        }
    }
}