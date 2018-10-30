using OPSDatabase.Controllers;
using OPSDatabase.DAL.IServices;
using OPSDatabase.DAL.Services;
using System.Web.Mvc;
using Unity;
using Unity.Injection;
using Unity.Mvc5;

namespace OPSDatabase
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<AccountController>(new InjectionConstructor()); 
            container.RegisterType<ManageController>(new InjectionConstructor());          
            container.RegisterType<IManageDowntime, ManageDowntime>();
            container.RegisterType<IManageDataEntry, ManageDataEntry>();
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}