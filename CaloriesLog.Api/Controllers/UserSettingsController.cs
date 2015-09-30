using CaloriesLog.Api.Models;
using CaloriesLog.Api.Poco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using CaloriesLog.Api.Mappers;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;
using System.Net;

namespace CaloriesLog.Api.Controllers
{
    [Authorize]
    [RoutePrefix("api/UserSettings")]
    public class UserSettingsController : ApiController
    {
        private MealsContext db = new MealsContext();

        // GET: api/Meal/5
        [ResponseType(typeof(UserSettingPoco))]
        public IHttpActionResult GetUserSetting(string id)
        {
            UserSettingModel userSettingModel = db.UserSettings.Find(id);
            if (userSettingModel == null)
            {
                return NotFound();
            }

            return Ok(userSettingModel.ToPoco());
        }

        // PUT: api/UserSettings/userId
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMealModel(string id, UserSettingPoco usPoco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != usPoco.UserId)
            {
                return BadRequest();
            }

            var model = usPoco.ToModel();
            model.UserId = User.Identity.Name;

            db.Entry(model).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserSettingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        private bool UserSettingExists(string id)
        {
            return db.UserSettings.Count(e => e.UserId == id) > 0;
        }
    }
}