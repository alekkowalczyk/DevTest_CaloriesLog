using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CaloriesLog.Api.Models;
using Microsoft.AspNet.Identity;
using CaloriesLog.Api.Mappers;
using CaloriesLog.Api.Poco;
using CaloriesLog.Api.Utils;

namespace CaloriesLog.Api.Controllers
{
    [Authorize]
    [RoutePrefix("api/Meals")]
    public class MealsController : ApiController
    {
        private MealsContext db = new MealsContext();

        // GET: api/Meal
        public IQueryable<MealPoco> GetMealModels()
        {
            var queryStrings = this.Request.GetQueryStrings();
            var dateFrom = queryStrings.ContainsKey("dateFrom") ? queryStrings["dateFrom"].ToDateTimeNullable().SetTime(0,0,0) : null;
            var dateTo = queryStrings.ContainsKey("dateTo") ? queryStrings["dateTo"].ToDateTimeNullable().SetTime(23, 59, 59) : null;
            var timeFrom = queryStrings.ContainsKey("timeFrom") ? queryStrings["timeFrom"].ToDateTimeNullable() : null;
            var timeTo = queryStrings.ContainsKey("timeTo") ? queryStrings["timeTo"].ToDateTimeNullable() : null;
            List<MealPoco> pocoList = new List<MealPoco>();
            //only time compare
            var dbSet = from model in db.MealModels where
                            (dateFrom == null || model.DateTime > dateFrom.Value ) &&
                            (dateTo == null || model.DateTime < dateTo.Value) &&
                            (timeFrom == null || model.DateTime.Hour > timeFrom.Value.Hour || (model.DateTime.Hour == timeFrom.Value.Hour && model.DateTime.Minute > timeFrom.Value.Minute)) &&
                            (timeTo == null || model.DateTime.Hour < timeTo.Value.Hour || (model.DateTime.Hour == timeTo.Value.Hour && model.DateTime.Minute < timeTo.Value.Minute)) &&
                            model.UserId == User.Identity.Name
                            select model;
            foreach(var model in dbSet)
            {
                pocoList.Add(model.ToPoco());
            }
            return pocoList.AsQueryable();
        }

        // GET: api/Meal/5
        [ResponseType(typeof(MealPoco))]
        public IHttpActionResult GetMealModel(int id)
        {
            MealModel mealModel = db.MealModels.Find(id);
            if (mealModel == null)
            {
                return NotFound();
            }

            return Ok(mealModel.ToPoco());
        }

        // PUT: api/Meal/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMealModel(int id, MealPoco mealPoco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != mealPoco.Id)
            {
                return BadRequest();
            }

            var model = mealPoco.ToModel();
            model.UserId = User.Identity.Name;

            db.Entry(model).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealModelExists(id))
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

        // POST: api/Meal
        [ResponseType(typeof(MealPoco))]
        public IHttpActionResult PostMealModel(MealPoco mealPoco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var strCurrentUserId = User.Identity.Name;
            var mealModel = mealPoco.ToModel();
            mealModel.UserId = strCurrentUserId;
            db.MealModels.Add(mealModel);
            db.SaveChanges();
            var retPoco = mealModel.ToPoco();
            return CreatedAtRoute("DefaultApi", new { id = retPoco.Id }, retPoco);
        }

        // DELETE: api/Meal/5
        [ResponseType(typeof(MealModel))]
        public IHttpActionResult DeleteMealModel(int id)
        {
            MealModel mealModel = db.MealModels.Find(id);
            if (mealModel == null)
            {
                return NotFound();
            }

            db.MealModels.Remove(mealModel);
            db.SaveChanges();

            return Ok(mealModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MealModelExists(int id)
        {
            return db.MealModels.Count(e => e.Id == id) > 0;
        }
    }
}