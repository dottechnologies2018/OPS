using OPSDatabase.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPSDatabase.DAL.IServices
{
    public interface IManageDowntime : IDisposable
    {
        List<OPS_ManageDowntime> GetAllManageDowntime();

        int AddNewManageDowntime(ManageDowntimeModels _manageDowntimeModels);

        int DeleteManageDowntime(int id);

        List<OPS_ManageAssets> GetManageAssets();

        int DeleteManageAssets(int id, string name);

        int AddNewManageAsset(ManageAssetsModels _manageAssetsModels);

        string GetAssetType(int id);

        List<OPS_ManageDowntime> GetManageDowntime_ExcelSearch(int Assets_id, string selectedDate);

        List<OPS_ManageDowntime> GetReporting_ManageDowntime(ReportDataEntryModels _reportDataEntryModels);
    }
}
