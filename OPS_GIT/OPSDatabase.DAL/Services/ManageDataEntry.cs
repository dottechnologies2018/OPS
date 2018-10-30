using OPSDatabase.DAL.IServices;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OPSDatabase.DAL.Models;
using System.Web;
using System.Globalization;

namespace OPSDatabase.DAL.Services
{
    public class ManageDataEntry : IManageDataEntry
    {
        TimeSpan now = DateTime.Now.TimeOfDay;
        public int AddNewDataEntry()
        {
            string[] shiftEndTime = ConfigurationManager.AppSettings["shiftEndTime"].Split(':');
            var shiftStartTime = checkShiftTime();
            var times = new List<string>();
            DateTime today = DateTime.Today.AddHours(shiftStartTime);
            DateTime tomorrow = today.AddHours(Convert.ToInt32(shiftEndTime[0])).AddMinutes(Convert.ToInt32(shiftEndTime[1])).AddSeconds(Convert.ToInt32(shiftEndTime[2]));
            for (var i = today; i < tomorrow; i = i.AddHours(1))
            {
                times.Add(i.ToString("hh:mm tt"));
                //times.Add(i.ToString("HH:mm:ss"));
            }

            //TimeSpan start = new TimeSpan(today.Hour, today.Minute, today.Second);
            //TimeSpan end = new TimeSpan(tomorrow.Hour, tomorrow.Minute, tomorrow.Second);
            //TimeSpan now = DateTime.Now.TimeOfDay;

            //if ((now > start) && (now < end))
            //{
            //    //match found
            //}

            if (times.Count > 0)
            {
                using (opsdbEntities _dbContext = new opsdbEntities())
                {
                    foreach (var item in times)
                    {
                        Guid id = Guid.NewGuid();
                        OPS_DataEntry _obj = new OPS_DataEntry();
                        _obj.ShiftTime = item;
                        _obj.CreatedBy = HttpContext.Current.User.Identity.Name;
                        _obj.CreatedDate = DateTime.Now;
                        _obj.ManageShifts_Id = GetManageShifts(shiftStartTime).ManageShifts_Id;
                        _obj.Unique_ID = id.ToString();
                        _dbContext.OPS_DataEntry.Add(_obj);
                    }

                    _dbContext.SaveChanges();

                }
            }

            return 1;
        }

        public int checkShiftTime()
        {
            int cTime = Convert.ToInt32(now.Hours);
            int MorningShift = Convert.ToInt32(ConfigurationManager.AppSettings["MorningShift"]);
            int EveningShift = Convert.ToInt32(ConfigurationManager.AppSettings["EveningShift"]);
            cTime = cTime < EveningShift && cTime >= MorningShift ? MorningShift : EveningShift;
            return cTime;
        }

        public void Dispose()
        {
            this.Dispose();
            GC.SuppressFinalize(this);
        }

        public int EditManageDataEntry(OPS_DataEntry _obj)
        {
            int result = 0;
            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                var query = _dbContext.OPS_DataEntry.FirstOrDefault(x => x.Unique_ID == _obj.Unique_ID);

                if (_obj.IsDeleted == true)
                {
                    var q = _dbContext.OPS_DeletedDataEntry.FirstOrDefault(x => x.Unique_ID == _obj.Unique_ID);
                    if (q != null)
                    {
                        _dbContext.OPS_DeletedDataEntry.Remove(q);
                        _dbContext.SaveChanges();
                    }

                    OPS_DeletedDataEntry obj = new OPS_DeletedDataEntry();
                    obj.DataEntry_Id = query.DataEntry_Id;
                    obj.CV01 = query.CV01;
                    obj.Rougher = query.Rougher;
                    obj.HMC = query.HMC;
                    obj.FlocUse = query.FlocUse;
                    obj.FlocBatch = query.FlocBatch;
                    obj.Slime = query.Slime;
                    obj.SlimePer = query.SlimePer;
                    obj.Tails1 = query.Tails1;
                    obj.Tails2 = query.Tails2;
                    obj.Reason = query.Reason;
                    obj.IsDeleted = _obj.IsDeleted;
                    obj.CreatedBy = query.CreatedBy;
                    obj.CreatedDate = query.CreatedDate;
                    obj.ModifiedBy = HttpContext.Current.User.Identity.Name;
                    obj.ModifiedDate = DateTime.Now;
                    obj.ManageShifts_Id = query.ManageShifts_Id;
                    obj.AD_Id = query.AD_Id;
                    obj.Unique_ID = _obj.Unique_ID;
                    obj.ShiftTime = query.ShiftTime;
                    _dbContext.OPS_DeletedDataEntry.Add(obj);
                    _dbContext.SaveChanges();

                }


                if (query != null)
                {
                    query.CV01 = _obj.CV01;
                    query.Rougher = _obj.Rougher;
                    query.HMC = _obj.HMC;
                    query.FlocUse = _obj.FlocUse;
                    query.FlocBatch = _obj.FlocBatch;
                    query.Slime = _obj.Slime;
                    query.SlimePer = _obj.SlimePer;
                    query.Tails1 = _obj.Tails1;
                    query.Tails2 = _obj.Tails2;
                    query.Reason = _obj.Reason;
                    query.IsDeleted = _obj.IsDeleted;
                    query.ModifiedBy = HttpContext.Current.User.Identity.Name;
                    query.ModifiedDate = DateTime.Now;
                    result = 1;
                    _dbContext.SaveChanges();
                }




            }

            return result;
        }

        public List<OPS_DataEntry> GetDataEntryByDay()
        {
            int id = GetManageShifts(checkShiftTime()).ManageShifts_Id;
            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                return _dbContext.OPS_DataEntry.Where(x => x.CreatedDate.Value.Day == DateTime.Now.Day
                && x.CreatedBy == HttpContext.Current.User.Identity.Name
                && x.ManageShifts_Id == id).ToList();
            }
        }

        public List<OPS_DataEntry> SearchDataEntry(int id, string searchDate)
        {
            //int id = GetManageShifts(checkShiftTime()).ManageShifts_Id;
            var selectedDate = Convert.ToDateTime(DateTime.ParseExact(searchDate, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                       .ToString("MM/dd/yyyy", CultureInfo.InvariantCulture));

            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                return _dbContext.OPS_DataEntry.Where(x => (x.CreatedDate.Value.Day == selectedDate.Day
                && x.CreatedDate.Value.Month == selectedDate.Month && x.CreatedDate.Value.Year == selectedDate.Year)
                && x.CreatedBy == HttpContext.Current.User.Identity.Name
                && x.ManageShifts_Id == id).ToList();
            }
        }

        public List<OPS_DataEntry> GetDataEntryReport(ReportDataEntryModels _reportDataEntryModels)
        {
            DateTime now = DateTime.Now;
            var lastHour = now.AddHours(-24);
            var lastWeek = now.AddDays(-7);
            var lastMonth = now.AddMonths(-1);

            var startDate  =  !string.IsNullOrWhiteSpace(_reportDataEntryModels.From) ? Convert.ToDateTime(DateTime.ParseExact(_reportDataEntryModels.From, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                        .ToString("MM/dd/yyyy", CultureInfo.InvariantCulture)) : DateTime.Now;
            //var startDate = Convert.ToDateTime(_reportDataEntryModels.From);
            var endDate = !string.IsNullOrWhiteSpace(_reportDataEntryModels.To) ? Convert.ToDateTime(DateTime.ParseExact(_reportDataEntryModels.To, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                      .ToString("MM/dd/yyyy", CultureInfo.InvariantCulture)) : DateTime.Now; 
            //var endDate =Convert.ToDateTime(_reportDataEntryModels.To);

            dynamic result;

            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                if (_reportDataEntryModels.SelectedShifts != "0")
                {
                    int id = Convert.ToInt32(_reportDataEntryModels.SelectedShifts);

                    if (_reportDataEntryModels.SelectedShifts != "0" && _reportDataEntryModels.Hours == "on")
                    {
                        result = _dbContext.OPS_DataEntry.Where(x => (x.CreatedDate > lastHour && x.CreatedDate <= now) && x.ManageShifts_Id == id).ToList();
                    }
                    else if (_reportDataEntryModels.SelectedShifts != "0" && _reportDataEntryModels.Weeks == "on")
                    {
                        result = _dbContext.OPS_DataEntry.Where(x => (x.CreatedDate > lastWeek && x.CreatedDate <= now) && x.ManageShifts_Id == id).ToList();
                    }
                    else if (_reportDataEntryModels.SelectedShifts != "0" && _reportDataEntryModels.Monthly == "on")
                    {
                        result = _dbContext.OPS_DataEntry.Where(x => (x.CreatedDate > lastMonth && x.CreatedDate <= now) &&  x.ManageShifts_Id == id).ToList();
                    }
                    else if (_reportDataEntryModels.SelectedShifts != "0" && _reportDataEntryModels.From != null && _reportDataEntryModels.To != null)
                    {
                        result = _dbContext.OPS_DataEntry.Where(x => (x.CreatedDate.Value.Day >= startDate.Day && x.CreatedDate.Value.Month >= startDate.Month && x.CreatedDate.Value.Year >= startDate.Year)
                                 && (x.CreatedDate.Value.Day <= endDate.Day && x.CreatedDate.Value.Month <= endDate.Month && x.CreatedDate.Value.Year <= endDate.Year) && x.ManageShifts_Id == id).ToList();
                        // result = _dbContext.OPS_DataEntry.Where(x => (x.CreatedDate > startDate && x.CreatedDate <= endDate) && x.IsDeleted != true && x.ManageShifts_Id == id).ToList();
                    }
                    else
                    {
                        result = _dbContext.OPS_DataEntry.Where(x => x.ManageShifts_Id == id).ToList();
                    }
                }

                else if (_reportDataEntryModels.Hours == "on")
                {
                    result = _dbContext.OPS_DataEntry.Where(x => (x.CreatedDate > lastHour && x.CreatedDate <= now)).ToList();
                }
                else if (_reportDataEntryModels.Weeks == "on")
                {
                    result = _dbContext.OPS_DataEntry.Where(x => (x.CreatedDate > lastWeek && x.CreatedDate <= now)).ToList();
                }
                else if (_reportDataEntryModels.Monthly == "on")
                {
                    result = _dbContext.OPS_DataEntry.Where(x => (x.CreatedDate > lastMonth && x.CreatedDate <= now)).ToList();
                }
                else if ( _reportDataEntryModels.From != null && _reportDataEntryModels.To != null)
                {
                    result = _dbContext.OPS_DataEntry.Where(x => (x.CreatedDate.Value.Day >= startDate.Day && x.CreatedDate.Value.Month >= startDate.Month && x.CreatedDate.Value.Year >= startDate.Year)
                                && (x.CreatedDate.Value.Day <= endDate.Day && x.CreatedDate.Value.Month <= endDate.Month && x.CreatedDate.Value.Year <= endDate.Year)).ToList();

                    //result = _dbContext.OPS_DataEntry.Where(x => (x.CreatedDate >= startDate && x.CreatedDate <= endDate) && x.IsDeleted != true).ToList();
                }
                else
                {
                    result = null;
                }

                return result;
            }
        }

        public OPS_ManageShifts GetManageShifts(int shiftStartTime)
        {
            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                var query = _dbContext.OPS_ManageShifts.Where(x => x.Start_Time == shiftStartTime).FirstOrDefault();
                return query;
            }
        }

        public bool ValidateDataEntry()
        {
            int id = GetManageShifts(checkShiftTime()).ManageShifts_Id;
            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                return _dbContext.OPS_DataEntry.Where(x => x.CreatedDate.Value.Day == DateTime.Now.Day
                && x.CreatedBy == HttpContext.Current.User.Identity.Name
                && x.ManageShifts_Id == id).Any();
            }
        }
    }
}
