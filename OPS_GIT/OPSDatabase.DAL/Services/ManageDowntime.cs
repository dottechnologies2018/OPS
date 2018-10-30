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
    public class ManageDowntime : IManageDowntime
    {
        public int AddNewManageAsset(ManageAssetsModels _manageAssetsModels)
        {
            int result = 0;
            if (_manageAssetsModels.Assets_Id > 0)
            {

                using (opsdbEntities _dbContext = new opsdbEntities())
                {
                    var q = _dbContext.OPS_ManageAssets.FirstOrDefault(x => x.AssetType == _manageAssetsModels.AssetType);
                    if (q == null)
                    {
                        var query = _dbContext.OPS_ManageAssets.Find(_manageAssetsModels.Assets_Id);
                        if (query != null)
                        {
                            query.AssetType = _manageAssetsModels.AssetType;
                            query.ModifiedBy = HttpContext.Current.User.Identity.Name;
                            query.ModifiedDate = DateTime.Now;
                            _dbContext.SaveChanges();
                            result = 1;
                        }
                    }
                    else
                    {
                        result = -2;
                    }
                }
            }
            else
            {
                using (opsdbEntities _dbContext = new opsdbEntities())
                {
                    var q = _dbContext.OPS_ManageAssets.FirstOrDefault(x => x.AssetType == _manageAssetsModels.AssetType);
                    if (q == null)
                    {
                        OPS_ManageAssets _obj = new OPS_ManageAssets();
                        _obj.AssetType = _manageAssetsModels.AssetType;
                        _obj.CreatedBy = HttpContext.Current.User.Identity.Name;
                        _obj.CreatedDate = DateTime.Now;
                        _dbContext.OPS_ManageAssets.Add(_obj);
                        _dbContext.SaveChanges();
                        result = 1;
                    }
                    else
                    {
                        result = -2;
                    }
                }
            }
            return result;
        }

        public int AddNewManageDowntime(ManageDowntimeModels _manageDowntimeModels)
        {
            int result = 0;

            var ToDate = !string.IsNullOrWhiteSpace(_manageDowntimeModels.To) ? Convert.ToDateTime(DateTime.ParseExact(_manageDowntimeModels.To, "dd/MM/yyyy hh:mm tt", CultureInfo.InvariantCulture)
                     .ToString("MM/dd/yyyy hh:mm tt", CultureInfo.InvariantCulture)) : DateTime.Now;

            var FromDate = !string.IsNullOrWhiteSpace(_manageDowntimeModels.From) ? Convert.ToDateTime(DateTime.ParseExact(_manageDowntimeModels.From, "dd/MM/yyyy hh:mm tt", CultureInfo.InvariantCulture)
           .ToString("MM/dd/yyyy hh:mm tt", CultureInfo.InvariantCulture)) : DateTime.Now;

            var assetss = GetAssetType(Convert.ToInt32(_manageDowntimeModels.Assets));

            if (_manageDowntimeModels.ManageDowntime_Id > 0)
            {
                using (opsdbEntities _dbContext = new opsdbEntities())
                {
                    var query = _dbContext.OPS_ManageDowntime.Find(_manageDowntimeModels.ManageDowntime_Id);
                    if (query != null)
                    {
                        //TimeSpan duration = DateTime.Parse(_manageDowntimeModels.To).Subtract(DateTime.Parse(_manageDowntimeModels.From));
                        TimeSpan duration = ToDate.Subtract(FromDate);
                        
                        query.Assets = assetss;
                        query.Assets_Id = Convert.ToInt32(_manageDowntimeModels.Assets);
                        query.Status = _manageDowntimeModels.Status;
                        query.From = _manageDowntimeModels.From;
                        query.To = _manageDowntimeModels.To;
                        query.Reason = _manageDowntimeModels.Reason;
                        query.Time_Diff = Convert.ToInt32(duration.TotalSeconds);
                        query.ModifiedBy = HttpContext.Current.User.Identity.Name;
                        query.ModifiedDate = DateTime.Now;
                        query.FromDate = FromDate;
                        query.ToDate = ToDate;
                        _dbContext.SaveChanges();
                        result = 1;
                    }

                }
            }
            else
            {
                using (opsdbEntities _dbContext = new opsdbEntities())
                {
                    OPS_ManageDowntime _obj = new OPS_ManageDowntime();                   
                    TimeSpan duration = ToDate.Subtract(FromDate);
                    //TimeSpan duration = DateTime.Parse(_manageDowntimeModels.To).Subtract(DateTime.Parse(_manageDowntimeModels.From));                 
                    //var ts = TimeSpan.FromSeconds(duration.TotalSeconds);
                    //string dtf = string.Format("{0:D2} : {1:D2}",ts.Hours, ts.Minutes);
                    _obj.Assets = assetss;
                    _obj.Assets_Id = Convert.ToInt32(_manageDowntimeModels.Assets);
                    _obj.Status = _manageDowntimeModels.Status;
                    _obj.From = _manageDowntimeModels.From;
                    _obj.To = _manageDowntimeModels.To;
                    _obj.Reason = _manageDowntimeModels.Reason;
                    _obj.Time_Diff = Convert.ToInt32(duration.TotalSeconds);
                    _obj.CreatedBy = HttpContext.Current.User.Identity.Name;
                    _obj.CreatedDate = DateTime.Now;
                    _obj.FromDate = FromDate;
                    _obj.ToDate = ToDate;
                    _dbContext.OPS_ManageDowntime.Add(_obj);
                    _dbContext.SaveChanges();
                    result = 1;
                }
            }
            return result;
        }

        public int DeleteManageAssets(int id, string name)
        {
            int result = 0;
            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                var q = _dbContext.OPS_ManageDowntime.FirstOrDefault(x => x.Assets_Id == id);
                if (q == null)
                {
                    var query = _dbContext.OPS_ManageAssets.Find(id);
                    if (query != null)
                    {
                        query.IsDeleted = true;
                        query.ModifiedBy = HttpContext.Current.User.Identity.Name;
                        query.ModifiedDate = DateTime.Now;
                        _dbContext.SaveChanges();
                        result = 1;
                    }
                }

            }

            return result;
        }

        public int DeleteManageDowntime(int id)
        {
            int result = 0;
            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                var query = _dbContext.OPS_ManageDowntime.Find(id);
                if (query != null)
                {
                    query.IsDeleted = true;
                    query.ModifiedBy = HttpContext.Current.User.Identity.Name;
                    query.ModifiedDate = DateTime.Now;
                    _dbContext.SaveChanges();
                    result = 1;
                }
            }

            return result;
        }

        public void Dispose()
        {
            this.Dispose();
            GC.SuppressFinalize(this);
        }

        public List<OPS_ManageDowntime> GetAllManageDowntime()
        {
            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                return _dbContext.OPS_ManageDowntime.Where(x => x.IsDeleted == false || x.IsDeleted == null).OrderByDescending(x => x.CreatedDate).ToList();
            }
        }

        public string GetAssetType(int id)
        {
            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                var q = _dbContext.OPS_ManageAssets.FirstOrDefault(x => x.Assets_Id == id);
                return q.AssetType != null ? q.AssetType : string.Empty;
            }
        }

        public List<OPS_ManageAssets> GetManageAssets()
        {
            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                return _dbContext.OPS_ManageAssets.Where(x => x.IsDeleted == false || x.IsDeleted == null).ToList();
            }
        }

        public List<OPS_ManageDowntime> GetManageDowntime_ExcelSearch(int Assets_id, string selectedDate)
        {
            var filteredDate = !string.IsNullOrWhiteSpace(selectedDate) ? Convert.ToDateTime(DateTime.ParseExact(selectedDate, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                      .ToString("MM/dd/yyyy", CultureInfo.InvariantCulture)) : DateTime.Now;

            //string[] filteredDate = selectedDate.Split('/');

            //int _day = Convert.ToInt32(filteredDate[0]);
            //int _month = Convert.ToInt32(filteredDate[1]);
            //int _Year = Convert.ToInt32(filteredDate[2]);

            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                return _dbContext.OPS_ManageDowntime.Where(x => x.Assets_Id == Assets_id 
                && (x.FromDate.Value.Day == filteredDate.Day && x.FromDate.Value.Month == filteredDate.Month && x.FromDate.Value.Year == filteredDate.Year)
                && (x.IsDeleted == false || x.IsDeleted == null)).OrderByDescending(x => x.CreatedDate).ToList();
            }
        }

        public List<OPS_ManageDowntime> GetReporting_ManageDowntime(ReportDataEntryModels _reportDataEntryModels)
        {
            DateTime now = DateTime.Now;
            var lastHour = now.AddHours(-24);
            var lastWeek = now.AddDays(-7);
            var lastMonth = now.AddMonths(-1);

            var startDate = !string.IsNullOrWhiteSpace(_reportDataEntryModels.From) ? Convert.ToDateTime(DateTime.ParseExact(_reportDataEntryModels.From, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                        .ToString("MM/dd/yyyy", CultureInfo.InvariantCulture)) : DateTime.Now;
       
            var endDate = !string.IsNullOrWhiteSpace(_reportDataEntryModels.To) ? Convert.ToDateTime(DateTime.ParseExact(_reportDataEntryModels.To, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                      .ToString("MM/dd/yyyy", CultureInfo.InvariantCulture)) : DateTime.Now;
           
            using (opsdbEntities _dbContext = new opsdbEntities())
            {
                dynamic result;

                int MH = Convert.ToInt32(ConfigurationManager.AppSettings["MorningShift"]);

                int EH = Convert.ToInt32(ConfigurationManager.AppSettings["EveningShift"]);

                if (_reportDataEntryModels.Hours == "on")
                {
                    if (_reportDataEntryModels.SelectedShifts == "1")
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => (x.FromDate > lastHour && x.FromDate <= now) && (x.FromDate.Value.Hour < EH && x.FromDate.Value.Hour >= MH)).ToList();
                    }
                    else if (_reportDataEntryModels.SelectedShifts == "2")
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => (x.FromDate > lastHour && x.FromDate <= now) && (x.FromDate.Value.Hour >= EH && x.FromDate.Value.Hour < MH)).ToList();
                    }
                    else 
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => (x.FromDate > lastHour && x.FromDate <= now)).ToList();
                    }

                }
                else if (_reportDataEntryModels.Weeks == "on")
                {
                    if (_reportDataEntryModels.SelectedShifts == "1")
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => (x.FromDate > lastWeek && x.FromDate <= now) && (x.FromDate.Value.Hour < EH && x.FromDate.Value.Hour >= MH)).ToList();
                    }
                    else if (_reportDataEntryModels.SelectedShifts == "2")
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => (x.FromDate > lastWeek && x.FromDate <= now) && (x.FromDate.Value.Hour >= EH && x.FromDate.Value.Hour < MH)).ToList();
                    }
                    else
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => (x.FromDate > lastWeek && x.FromDate <= now)).ToList();
                    }                    
                }
                else if (_reportDataEntryModels.Monthly == "on")
                {
                    if (_reportDataEntryModels.SelectedShifts == "1")
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => (x.FromDate > lastMonth && x.FromDate <= now) && (x.FromDate.Value.Hour < EH && x.FromDate.Value.Hour >= MH)).ToList();
                    }
                    else if (_reportDataEntryModels.SelectedShifts == "2")
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => (x.FromDate > lastMonth && x.FromDate <= now) && (x.FromDate.Value.Hour >= EH && x.FromDate.Value.Hour < MH)).ToList();
                    }
                    else
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => (x.FromDate > lastMonth && x.FromDate <= now)).ToList();
                    }
                }
                else if (!string.IsNullOrEmpty(_reportDataEntryModels.From) && !string.IsNullOrEmpty(_reportDataEntryModels.To))
                {
                    if (_reportDataEntryModels.SelectedShifts == "1")
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => ((x.FromDate.Value.Day >= startDate.Day && x.FromDate.Value.Month >= startDate.Month && x.FromDate.Value.Year >= startDate.Year)
                                && (x.FromDate.Value.Hour < EH && x.FromDate.Value.Hour >= MH))
                                && ((x.ToDate.Value.Day <= endDate.Day && x.ToDate.Value.Month <= endDate.Month && x.ToDate.Value.Year <= endDate.Year)
                                && (x.ToDate.Value.Hour < EH && x.ToDate.Value.Hour >= MH))).ToList();
                    }
                    else if (_reportDataEntryModels.SelectedShifts == "2")
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => ((x.FromDate.Value.Day >= startDate.Day && x.FromDate.Value.Month >= startDate.Month && x.FromDate.Value.Year >= startDate.Year)
                                 && (x.FromDate.Value.Hour >= EH && x.FromDate.Value.Hour < MH))
                                 && ((x.ToDate.Value.Day <= endDate.Day && x.ToDate.Value.Month <= endDate.Month && x.ToDate.Value.Year <= endDate.Year)
                                 && (x.ToDate.Value.Hour >= EH && x.ToDate.Value.Hour < MH))).ToList();                       
                    }
                    else
                    {
                        result = _dbContext.OPS_ManageDowntime.Where(x => (x.FromDate.Value.Day >= startDate.Day && x.FromDate.Value.Month >= startDate.Month && x.FromDate.Value.Year >= startDate.Year)
                            && (x.ToDate.Value.Day <= endDate.Day && x.ToDate.Value.Month <= endDate.Month && x.ToDate.Value.Year <= endDate.Year)).ToList();
                    }
                   
                }
                else
                {
                    result = null;

                }
                return result;
            }
        }
    }
}
