using System.Web;
using System.Web.Optimization;

namespace OPSDatabase
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));            

            bundles.Add(new ScriptBundle("~/bundles/ops").Include(
                      "~/Content/js/jquery.min.js",
                      "~/Content/js/bootstrap.min.js",
                      "~/Content/js/custom.js",
                      "~/Scripts/respond.js"
                     ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/css/bootstrap.min.css",
                      "~/Content/css/custom.css",
                      "~/Content/css/fontawesome-all.css"));

            bundles.Add(new ScriptBundle("~/bundles/manageassets").Include(
                     "~/Scripts/DataScripts/ManageAssets.js"));

            bundles.Add(new ScriptBundle("~/bundles/managedataentry").Include(
                    "~/Scripts/DataScripts/ManageDataEntry.js"));

            bundles.Add(new ScriptBundle("~/bundles/managedowntime").Include(
                    "~/Scripts/DataScripts/ManageDowntime.js"));

            bundles.Add(new ScriptBundle("~/bundles/managereporting").Include(
                    "~/Scripts/DataScripts/ManageReporting.js"));

            BundleTable.EnableOptimizations = true;
        }
    }
}
