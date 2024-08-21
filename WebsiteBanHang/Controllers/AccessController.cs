using Microsoft.AspNetCore.Mvc;
using WebsiteBanHang.Models;
using WebsiteBanHang.Models.Authentication;

namespace WebsiteBanHang.Controllers
{
    public class AccessController : Controller
    {
        WebSiteBanHangContext context = new WebSiteBanHangContext();


        [HttpGet]
        public IActionResult Login()
        {
            if (HttpContext.Session.GetString("UserName") == null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
           
        }

        [Authentication]
        [HttpPost]
        public IActionResult Login(TUser user) 
        {
            if(HttpContext.Session.GetString("UserName") == null)
            {
                var u = context.TUsers.Where(x => x.Username.Equals(user.Username) && x.Password.Equals(user.Password)).FirstOrDefault();
                if (u != null)
                {
                    HttpContext.Session.SetString("UserName" , u.Username.ToString());
                    return RedirectToAction("Index", "Home");
                }
            }
            return View();
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            HttpContext.Session.Remove("UserName");
            return RedirectToAction("Login", "Access");
        }
    }
}
