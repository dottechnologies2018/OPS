//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OPSDatabase.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class OPS_DataEntry
    {
        public int DataEntry_Id { get; set; }
        public string CV01 { get; set; }
        public string Rougher { get; set; }
        public string HMC { get; set; }
        public string FlocUse { get; set; }
        public string FlocBatch { get; set; }
        public string Slime { get; set; }
        public string SlimePer { get; set; }
        public string Tails1 { get; set; }
        public string Tails2 { get; set; }
        public string Reason { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public Nullable<int> ManageShifts_Id { get; set; }
        public string AD_Id { get; set; }
        public string Unique_ID { get; set; }
        public string ShiftTime { get; set; }
    }
}
