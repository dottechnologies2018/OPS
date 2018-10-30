using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPSDatabase.DAL.Models
{
    public class ReportDataEntryModels
    {
        public string Hours { get; set; }

        public string Weeks { get; set; }

        public string Monthly { get; set; }

        public string SelectedShifts { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public int ddl_Assets { get; set; }

        public string searchDate { get; set; }
    }
}
