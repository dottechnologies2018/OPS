using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace OPSDatabase.Filters
{
    public class IsAuthenticated: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie != null)
            {
                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                if (authTicket != null && !authTicket.Expired)
                {
                    var roles = authTicket.UserData.Split(',');
                    HttpContext.Current.User = new System.Security.Principal.GenericPrincipal(new FormsIdentity(authTicket), roles);
                }
                else
                {
                    if (filterContext.HttpContext.Request.IsAjaxRequest())
                    {
                        filterContext.HttpContext.Response.ClearContent();
                        filterContext.HttpContext.Items["AjaxPermissionDenied"] = true;
                    }
                    
                    else
                    {
                        filterContext.Result = new RedirectResult("~/Account/Login");
                    }

                    FormsAuthentication.SignOut();
                    HttpContext.Current.Session.Abandon();
                    HttpContext.Current.Session.Clear();                   
                    return;
                }
            }
            else
            {
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.HttpContext.Response.ClearContent();
                    filterContext.HttpContext.Items["AjaxPermissionDenied"] = true;
                }

                else
                {
                    filterContext.Result = new RedirectResult("~/Account/Login");
                }

                FormsAuthentication.SignOut();
                HttpContext.Current.Session.Abandon();
                HttpContext.Current.Session.Clear();               
                return;
            }
            base.OnActionExecuting(filterContext);
        }
    }
}