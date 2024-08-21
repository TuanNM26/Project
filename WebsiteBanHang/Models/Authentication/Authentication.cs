using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebsiteBanHang.Models.Authentication
{
    public class Authentication : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var userName = context.HttpContext.Session.GetString("UserName");
            var userRole = context.HttpContext.Session.GetInt32("UserRole"); // Assuming the role is stored as an integer

            if (userName == null && userRole == 0)
            {
                context.Result = new RedirectToRouteResult(
                    new RouteValueDictionary
                    {
                        {"Controller", "Access" },
                        {"Action", "Login" }
                    });
            }
            else if (userRole == 1)
            {
                context.Result = new RedirectToRouteResult(
                    new RouteValueDictionary
                    {
                        {"Controller", "HomeAdmin" }, // Assuming your controller is named "Product"
                        {"Action", "DanhMucSanPham" }
                    });
            }
        }
    }
}
