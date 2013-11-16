using System.Web.Mvc;

namespace MyMovies.UI.Controllers
{
    using Application.Core.UI.Controllers;

    public class HomeController : BasicController
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }
    }
}
