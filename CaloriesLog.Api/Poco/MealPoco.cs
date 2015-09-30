using CaloriesLog.Api.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaloriesLog.Api.Poco
{
    public class MealPoco
    {
        public int? Id { get; set; }

         //[JsonConverter(typeof(JsonDateTimeConverter))]
        public DateTime DateTime { get; set; }
        public string Text { get; set; }
        public int Calories { get; set; }
    }
}