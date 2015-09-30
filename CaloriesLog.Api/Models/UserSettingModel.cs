using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CaloriesLog.Api.Models
{
    public class UserSettingModel
    {
        [Required]
        [Key]
        public string UserId { get; set; }

        [Required]
        [Display(Name = "Calories")]
        public int CaloriesDayLimit { get; set; }
    }
}