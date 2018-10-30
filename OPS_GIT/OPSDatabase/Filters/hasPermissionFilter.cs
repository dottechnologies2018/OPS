using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OPSDatabase.Filters
{
    public class hasPermissionFilter : ActionFilterAttribute
    {
        public string actionName { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!HttpContext.Current.User.IsInRole(actionName))
            {                
                filterContext.Result = new RedirectResult("~/Home/ManageDowntime");
            }
        }
    }
}