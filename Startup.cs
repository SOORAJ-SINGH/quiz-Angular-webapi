using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MyQuiz.Startup))]
namespace MyQuiz
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
