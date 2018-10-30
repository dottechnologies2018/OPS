using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OPSDatabase.Filters
{
    public class SessionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {       
            HttpContext ctx = HttpContext.Current;
            if (HttpContext.Current.Session["shiftID"] == null || HttpContext.Current.Session["shiftID"].ToString() == "")
            {
                filterContext.Result = new RedirectResult("~/Account/Login");
                return;
            }
            
            base.OnActionExecuting(filterContext);
        }
    }
}