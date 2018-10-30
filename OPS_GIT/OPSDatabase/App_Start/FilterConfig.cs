using OPSDatabase.Filters;
using System.Web;
using System.Web.Mvc;

namespace OPSDatabase
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            //filters.Add(new HandleErrorAttribute());
            filters.Add(new ExceptionHandler());
        }
    }
}
