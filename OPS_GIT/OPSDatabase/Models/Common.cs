using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace OPSDatabase.Models
{
    public static class Common
    {
        public static void LogError(Exception ex)
        {
            try
            {
                string strPath = HttpContext.Current.Server.MapPath("~/App_Data/Error.log");
                if (!File.Exists(strPath))
                {
                    File.Create(strPath).Dispose();
                }

                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", ex.Message);
                message += Environment.NewLine;
                message += string.Format("StackTrace: {0}", ex.StackTrace);
                message += Environment.NewLine;
                message += string.Format("Source: {0}", ex.Source);
                message += Environment.NewLine;
                message += string.Format("TargetSite: {0}", ex.TargetSite.ToString());
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                using (StreamWriter writer = new StreamWriter(strPath, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }
            }
            catch (Exception ex1)
            {

            }
        }
    }
}