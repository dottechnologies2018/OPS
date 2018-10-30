using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(OPSDatabase.Startup))]
namespace OPSDatabase
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
