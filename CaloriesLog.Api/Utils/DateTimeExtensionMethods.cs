using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaloriesLog.Api.Utils
{
    public static class CommonExtensionMethods
    {
        public static DateTime? ToDateTimeNullable(this string s)
        {
            DateTime dt;
            if(DateTime.TryParse(s.Trim(new char[] {' ','"'}), out dt))
            {
                return dt;
            }
            return null;
        }

        public static DateTime? SetTime(this DateTime? dt, int h, int m, int s)
        {
            if (dt.HasValue)
                return new DateTime(dt.Value.Year, dt.Value.Month, dt.Value.Day, h, m, s);
            else
                return null;
        }
    }
}