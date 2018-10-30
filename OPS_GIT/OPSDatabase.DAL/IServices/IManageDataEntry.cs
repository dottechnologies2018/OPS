using OPSDatabase.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPSDatabase.DAL.IServices
{
    public interface IManageDataEntry : IDisposable
    {
        OPS_ManageShifts GetManageShifts(int id);

        int checkShiftTime();

        int AddNewDataEntry();

        List<OPS_DataEntry> GetDataEntryByDay();

        bool ValidateDataEntry();

        int EditManageDataEntry(OPS_DataEntry _obj);

        List<OPS_DataEntry> GetDataEntryReport(ReportDataEntryModels _reportDataEntryModels);

        List<OPS_DataEntry> SearchDataEntry(int id, string searchDate);

    }
}
