using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPSDatabase.DAL.Models
{
   public class ManageDowntimeModels
    {
        public int ManageDowntime_Id { get; set; }
       
        public string Assets { get; set; }
      
        public string Status { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public string Reason { get; set; }
    }
}
