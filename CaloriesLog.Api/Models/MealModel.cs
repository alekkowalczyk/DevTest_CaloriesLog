using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CaloriesLog.Api.Models
{
    public class MealModel
    {
        [Required]
        public string UserId { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }

        [Required(ErrorMessage="Date is required")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Datetime")]
        public DateTime DateTime{ get; set; }

        [Required]
        [DataType(DataType.Text)]
        [StringLength(100)]
        [Display(Name = "Description")]
        public string Text { get; set; }

        [Required]
        [Display(Name = "Calories")]
        public int Calories{ get; set; }
    }
}