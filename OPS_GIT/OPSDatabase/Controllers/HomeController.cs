using OPSDatabase.DAL;
using OPSDatabase.DAL.IServices;
using OPSDatabase.DAL.Models;
using OPSDatabase.DAL.Services;
using OPSDatabase.Filters;
using OPSDatabase.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Resources;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Xml.Serialization;

namespace OPSDatabase.Controllers
{
    [IsAuthenticated]   
    public class HomeController : Controller
    {
        #region "member"
        public readonly IManageDowntime _IManageDowntime;
        public readonly IManageDataEntry _IManageDataEntry;
        #endregion
        
        #region "constructor intialize"
        public HomeController(IManageDowntime ManageDowntime, IManageDataEntry ManageDataEntry)
        {
            _IManageDowntime = ManageDowntime;
            _IManageDataEntry = ManageDataEntry;
        }
        #endregion

        #region "action methods"

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        public ActionResult ManageDowntime()
        {
            dynamic shiftID = _IManageDataEntry.checkShiftTime();
            Session["shiftID"] = shiftID;
            return View();
        }

        public ActionResult ManageAssets()
        {
            return View();
        }

        [SessionFilter]
        public ActionResult ManageDataEntry()
        {
            return View();
        }

        [SessionFilter]       
        public ActionResult ManageReporting()
        {
            return View();
        }

        [HttpGet]       
        public JsonResult GetAllData()
        {
            dynamic result = "";
            try
            {
                //List<OPS_ManageDowntime> ls = new List<OPS_ManageDowntime>();
                var queryResult = _IManageDowntime.GetAllManageDowntime();
                //foreach (var item in queryResult)
                //{
                //    OPS_ManageDowntime obj = new OPS_ManageDowntime();
                //    obj.Assets = _IManageDowntime.GetAssetType(item.Assets_Id ?? 0);
                //    obj.Assets_Id = item.Assets_Id;
                //    obj.CreatedBy = item.CreatedBy;
                //    obj.CreatedDate = item.CreatedDate;
                //    obj.From = item.From;
                //    obj.IsDeleted = item.IsDeleted;
                //    obj.ManageDowntime_Id = item.ManageDowntime_Id;
                //    obj.ModifiedBy = item.ModifiedBy;
                //    obj.ModifiedDate = item.ModifiedDate;
                //    obj.Reason = item.Reason;
                //    obj.Status = item.Status;
                //    obj.Time_Diff = item.Time_Diff;
                //    obj.To = item.To;
                //    ls.Add(obj);
                //}

                result = queryResult;
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = null;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetAssetType(int id)
        {
            dynamic result = "";
            try
            {
                result = _IManageDowntime.GetAssetType(id);
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = null;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAssets()
        {
            dynamic result = "";
            try
            {
                result = _IManageDowntime.GetManageAssets();
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = null;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult AddNewManageDowntime(ManageDowntimeModels _manageDowntimeModels)
        {
            dynamic result;

            try
            {
                result = _IManageDowntime.AddNewManageDowntime(_manageDowntimeModels);
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = -1;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddNewManageAsset(ManageAssetsModels _manageAssetsModels)
        {
            dynamic result;

            try
            {
                result = _IManageDowntime.AddNewManageAsset(_manageAssetsModels);
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = -1;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteManageAssets(int id, string name)
        {
            dynamic result;

            try
            {
                result = _IManageDowntime.DeleteManageAssets(id, name);
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = -1;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteManageDowntime(int id)
        {
            dynamic result;

            try
            {
                result = _IManageDowntime.DeleteManageDowntime(id);
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = -1;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddNewDataEntry()
        {
            dynamic result;

            try
            {
                var validate = _IManageDataEntry.ValidateDataEntry();
                if (!validate)
                {
                    result = _IManageDataEntry.AddNewDataEntry();
                }
                else
                {
                    result = 0;
                }

            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = -1;
            }

            return Json(result, JsonRequestBehavior.AllowGet);

        }

        [HttpGet]
        public JsonResult GetDataEntryByDay()
        {
            dynamic result = "";
            try
            {
                result = _IManageDataEntry.GetDataEntryByDay();
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = null;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditManageDataEntry(OPS_DataEntry _obj)
        {
            dynamic result;

            try
            {
                result = _IManageDataEntry.EditManageDataEntry(_obj);
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = -1;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteManageDataEntry(int id)
        {
            dynamic result;

            try
            {
                result = _IManageDowntime.DeleteManageDowntime(id);
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = -1;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ExportToExcel(ReportDataEntryModels _reportDataEntryModels)
        {
            var fName = string.Format("Downtime-{0}", DateTime.Now.ToString("s"));

            var data = _IManageDowntime.GetAllManageDowntime();

            if (_reportDataEntryModels.ddl_Assets > 0)
            {
                data = _IManageDowntime.GetManageDowntime_ExcelSearch(_reportDataEntryModels.ddl_Assets, _reportDataEntryModels.searchDate);
            }

            StringBuilder text = new StringBuilder();

            //text.Append("Created By:" + "," + User.Identity.Name + "," + "Created Date:" + "," + DateTime.Now + "," + "\r\n");

            text.Append("Assets, Status, From, To, Total Time, Reason, \r\n");
            foreach (var record in data)
            {
                text.Append(record.Assets + "," + record.Status + "," + record.From + "," + record.To + "," + ConvertSecToHour(record.Time_Diff.ToString()) + "," + record.Reason + "\r\n");
            }

            byte[] fileContents = Encoding.UTF8.GetBytes(text.ToString());
            return File(fileContents, "text/csv", fName + ".csv");
        }

        [HttpPost]
        public JsonResult ExcelSearchParam(ReportDataEntryModels _reportDataEntryModels)
        {
            dynamic result = "";
            try
            {
                result = _IManageDataEntry.GetDataEntryReport(_reportDataEntryModels);
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = null;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ExportToExcelParam(ReportDataEntryModels _reportDataEntryModels)
        {
            var fName = string.Format("Reporting-{0}", DateTime.Now.ToString("s"));
            var data = _IManageDataEntry.GetDataEntryReport(_reportDataEntryModels);
            string shift = string.Empty;
            StringBuilder text = new StringBuilder();

            if (_reportDataEntryModels.SelectedShifts == "1")
            {
                shift = "Day Shift";
            }
            else if (_reportDataEntryModels.SelectedShifts == "2")
            {
                shift = "Night Shift";
            }

            // Start Shift Data Report //

            //if (_reportDataEntryModels.SelectedShifts != "0")
            //{
            //    Response.Write("Shift:" + "," + shift + ", " + "Created By:" + "," + User.Identity.Name + "," + "Created Date:" + "," + DateTime.Now + "," + "\r\n");
            //    text.Append("Shift:" + "," + shift + ", " + "Created By:" + "," + User.Identity.Name + "," + "Created Date:" + "," + DateTime.Now + "," + "\r\n");
            //}
            //else
            //{
            //    Response.Write("Created By:" + "," + User.Identity.Name + "," + "Created Date:" + "," + DateTime.Now + "," + "\r\n");
            //    text.Append("Created By:" + "," + User.Identity.Name + "," + "Created Date:" + "," + DateTime.Now + "," + "\r\n");
            //}
            text.Append("ShiftData" + "," + "\r\n");
            text.Append("ShiftTime, CV01, Rougher, HMC, FlocUse, FlocBatch, Slime, SlimePer, Tails1, Tails2, Reason, \r\n");

            if (data.Count() > 0)
            {
                foreach (var record in data)
                {
                    text.Append(record.ShiftTime + "," + record.CV01 + "," + record.Rougher + "," + record.HMC + "," + record.FlocUse + "," + record.FlocBatch + "," + record.Slime + "," + record.SlimePer + "," + record.Tails1 + "," + record.Tails2 + "," + record.Reason + "," + "\r\n");
                }

                text.Append("Total" + "," + data.Sum(x => Convert.ToDecimal(x.CV01)) + "," + data.Sum(x => Convert.ToDecimal(x.Rougher)) + "," + data.Sum(x => Convert.ToDecimal(x.HMC)) + "," + data.Sum(x => Convert.ToDecimal(x.FlocUse)) + "," + string.Empty + "," + data.Sum(x => Convert.ToDecimal(x.Slime)) + "," + data.Sum(x => Convert.ToDecimal(x.SlimePer)) + "," + data.Sum(x => Convert.ToDecimal(x.Tails1)) + "," + data.Sum(x => Convert.ToDecimal(x.Tails2)) + "," + "\r\n");

            }
            else
            {
                text.Append("No Data Available");
            }

          
            text.Append(Environment.NewLine);
            text.Append(Environment.NewLine);
            // End Shift Data Report //

            /*
            var addSecs = 60 * 60;
            int total = data.Count();
            total = total * addSecs;

            int CV01 = data.Where(x => x.CV01 != null || x.CV01 != string.Empty).ToList().Count() * addSecs;
            int Rougher = data.Where(x => x.Rougher != null || x.Rougher != string.Empty).ToList().Count() * addSecs;
            int HMC = data.Where(x => x.HMC != null || x.HMC != string.Empty).ToList().Count() * addSecs;
            int FlocUse = data.Where(x => x.FlocUse != null || x.FlocUse != string.Empty).ToList().Count() * addSecs;
            int Slime = data.Where(x => x.Slime != null || x.Slime != string.Empty).ToList().Count() * addSecs;
            int SlimePer = data.Where(x => x.SlimePer != null || x.SlimePer != string.Empty).ToList().Count() * addSecs;
            int Tails1 = data.Where(x => x.Tails1 != null || x.Tails1 != string.Empty).ToList().Count() * addSecs;
            int Tails2 = data.Where(x => x.Tails2 != null || x.Tails2 != string.Empty).ToList().Count() * addSecs;

            text.Append("Total Downtime" + "," + ConvertSecToHour(Convert.ToString(total - CV01)) + "," + ConvertSecToHour(Convert.ToString(total - Rougher)) + "," + ConvertSecToHour(Convert.ToString(total - HMC)) + "," + ConvertSecToHour(Convert.ToString(total - FlocUse)) + "," + string.Empty + "," + ConvertSecToHour(Convert.ToString(total - Slime)) + "," + ConvertSecToHour(Convert.ToString(total - SlimePer)) + "," + ConvertSecToHour(Convert.ToString(total - Tails1)) + "," + ConvertSecToHour(Convert.ToString(total - Tails2)) + "," + "\r\n");

            text.Append("Total Runtime" + "," + ConvertSecToHour(Convert.ToString(CV01)) + "," + ConvertSecToHour(Convert.ToString(Rougher)) + "," + ConvertSecToHour(Convert.ToString(HMC)) + "," + ConvertSecToHour(Convert.ToString(FlocUse)) + "," + string.Empty + "," + ConvertSecToHour(Convert.ToString(Slime)) + "," + ConvertSecToHour(Convert.ToString(SlimePer)) + "," + ConvertSecToHour(Convert.ToString(Tails1)) + "," + ConvertSecToHour(Convert.ToString(Tails2)) + "," + "\r\n");
            */

            // Start Downtime Report //

            text.Append("Downtime" + "," + "\r\n");
            var ddata = _IManageDowntime.GetReporting_ManageDowntime(_reportDataEntryModels);

            text.Append("Assets, Status, From, To, Total Time, Reason, \r\n");
            if (ddata.Count() > 0)
            {
                foreach (var record in ddata)
                {
                    text.Append(record.Assets + "," + record.Status + "," + record.From + "," + record.To + "," + ConvertSecToHour(record.Time_Diff.ToString()) + "," + record.Reason + "\r\n");
                }

                text.Append("\r\nTotal Downtime" + "," + ConvertSecToHour(ddata.Sum(x => x.Time_Diff).ToString()));

                var total = ddata.Sum(x => x.Time_Diff);
                var calculateRuntime = runtime(_reportDataEntryModels, total ?? 0);
                text.Append("\r\nTotal Runtime" + "," + calculateRuntime);
            }
            else
            {
                text.Append("No Data Available");
            }

            // End Downtime Report //

            byte[] fileContents = Encoding.UTF8.GetBytes(text.ToString());
            return File(fileContents, "text/csv", fName + ".csv");
        }

        [HttpPost]
        public JsonResult ExcelSearchTotal(ReportDataEntryModels _reportDataEntryModels)
        {
            var data = _IManageDataEntry.GetDataEntryReport(_reportDataEntryModels);
            if (data.Count() > 0)
            {
                OPS_DataEntry _objTotal = new OPS_DataEntry();
                _objTotal.CV01 = data.Sum(x => Convert.ToDecimal(x.CV01)).ToString();
                _objTotal.Rougher = data.Sum(x => Convert.ToDecimal(x.Rougher)).ToString();
                _objTotal.HMC = data.Sum(x => Convert.ToDecimal(x.HMC)).ToString();
                _objTotal.FlocUse = data.Sum(x => Convert.ToDecimal(x.FlocUse)).ToString();
                _objTotal.FlocBatch = string.Empty;
                _objTotal.Slime = data.Sum(x => Convert.ToDecimal(x.Slime)).ToString();
                _objTotal.SlimePer = data.Sum(x => Convert.ToDecimal(x.SlimePer)).ToString();
                _objTotal.Tails1 = data.Sum(x => Convert.ToDecimal(x.Tails1)).ToString();
                _objTotal.Tails2 = data.Sum(x => Convert.ToDecimal(x.Tails2)).ToString();
                return Json(_objTotal, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("0", JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult SearchDataEntry(int id, string searchDate)
        {
            dynamic result = "";
            try
            {
                result = _IManageDataEntry.SearchDataEntry(id, searchDate);
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = null;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ManageDowntime_ExcelSearch(int Assets_Id, string selectedDate)
        {
            dynamic result = "";
            try
            {
                result = _IManageDowntime.GetManageDowntime_ExcelSearch(Assets_Id, selectedDate);
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = null;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult Reporting_ManageDowntime(ReportDataEntryModels _reportDataEntryModels)
        {
            dynamic result = "";
            try
            {
                result = _IManageDowntime.GetReporting_ManageDowntime(_reportDataEntryModels);
            }
            catch (Exception ex)
            {
                Common.LogError(ex);
                result = null;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Reporting_ExportDowntime(ReportDataEntryModels _reportDataEntryModels)
        {
            var fName = string.Format("Reporting-Downtime-{0}", DateTime.Now.ToString("s"));

            var data = _IManageDowntime.GetReporting_ManageDowntime(_reportDataEntryModels);

            StringBuilder text = new StringBuilder();

            //text.Append("Created By:" + "," + User.Identity.Name + "," + "Created Date:" + "," + DateTime.Now + "," + "\r\n");

            text.Append("Assets, Status, From, To, Total Time, Reason, \r\n");
            if (data.Count() > 0)
            {
                foreach (var record in data)
                {
                    text.Append(record.Assets + "," + record.Status + "," + record.From + "," + record.To + "," + ConvertSecToHour(record.Time_Diff.ToString()) + "," + record.Reason + "\r\n");
                }

                text.Append("\r\nTotal Downtime" + "," + ConvertSecToHour(data.Sum(x => x.Time_Diff).ToString()));

                var total = data.Sum(x => x.Time_Diff);
                var calculateRuntime = runtime(_reportDataEntryModels, total ?? 0);
                text.Append("\r\nTotal Runtime" + "," + calculateRuntime);
            }
            else
            {
                text.Append("No Data Available");
            }
            byte[] fileContents = Encoding.UTF8.GetBytes(text.ToString());
            return File(fileContents, "text/csv", fName + ".csv");
        }
        
        public string ConvertSecToHour(string sec, int chk = 0)
        {
            if (chk == 1)
            {
                return "N/A";
            }
            else
            {
                decimal sec_num = Convert.ToInt32(sec);
                decimal hours = Math.Floor(sec_num / 3600);
                decimal minutes = Math.Floor((sec_num - (hours * 3600)) / 60);
                decimal seconds = sec_num - (hours * 3600) - (minutes * 60);
                string h = string.Empty;
                string m = string.Empty;
                string s = string.Empty;
                if (hours < 10)
                {
                    h = "0" + hours.ToString();
                }
                else
                {
                    h = hours.ToString();
                }

                if (minutes < 10)
                {
                    m = "0" + minutes.ToString();
                }
                else
                {
                    m = minutes.ToString();
                }

                return h + ":" + m + " hours";
            }
        }
        public string runtime(ReportDataEntryModels _reportDataEntryModels, int total)
        {
            DateTime now = DateTime.Now;
            var lastHour = now.AddHours(-24);
            var lastWeek = now.AddDays(-7);
            var lastMonth = now.AddMonths(-1);
            int diff = 0;

            if (_reportDataEntryModels.Hours == "on")
            {
                TimeSpan duration = now.Subtract(lastHour);
                diff = Convert.ToInt32(duration.TotalSeconds) - total;
            }
            else if (_reportDataEntryModels.Weeks == "on")
            {
                TimeSpan duration = now.Subtract(lastWeek);
                diff = Convert.ToInt32(duration.TotalSeconds) - total;
            }
            else if (_reportDataEntryModels.Monthly == "on")
            {
                TimeSpan duration = now.Subtract(lastMonth);
                diff = Convert.ToInt32(duration.TotalSeconds) - total;
            }
            else if (_reportDataEntryModels.From != null && _reportDataEntryModels.To != null)
            {
                var FromDate = !string.IsNullOrWhiteSpace(_reportDataEntryModels.From) ? Convert.ToDateTime(DateTime.ParseExact(_reportDataEntryModels.From, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                      .ToString("MM/dd/yyyy", CultureInfo.InvariantCulture)) : DateTime.Now;

                var ToDate = !string.IsNullOrWhiteSpace(_reportDataEntryModels.To) ? Convert.ToDateTime(DateTime.ParseExact(_reportDataEntryModels.To, "dd/MM/yyyy", CultureInfo.InvariantCulture)
                          .ToString("MM/dd/yyyy", CultureInfo.InvariantCulture)) : DateTime.Now;

                ToDate = ToDate.AddHours(24);

                TimeSpan duration = ToDate.Subtract(FromDate);
                var currentDate = DateTime.Now;
               
                if (FromDate.Day == currentDate.Day && FromDate.Month == currentDate.Month && FromDate.Year == currentDate.Year)
                {
                    //DateTime dt = new DateTime(currentDate.Year, currentDate.Month, currentDate.Day, 7, 0, 0);
                    int convertSecs = Convert.ToInt32(currentDate.TimeOfDay.TotalSeconds);
                    diff = convertSecs - total;
                }
                else
                {
                    diff = Convert.ToInt32(duration.TotalSeconds) - total;
                }
            }

            


            var result = ConvertSecToHour(diff.ToString());
            return result;
        }
        
        #endregion
    }
}