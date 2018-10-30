using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OPSDatabase.Controllers
{
    public class ReportingController : Controller
    {       
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Downtime()
        {
            return View();
        }
        public ActionResult DataEntry()
        {
            return View();
        }
    }
}