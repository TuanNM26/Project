using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebsiteBanHang.Models;
using WebsiteBanHang.Models.ProductModels;

namespace WebsiteBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductAPI : ControllerBase
    {
        WebSiteBanHangContext context = new WebSiteBanHangContext();

        [HttpGet]
        public IEnumerable<Product> GetAllProduct()
        {
            var sp = (from p in context.TDanhMucSps
                      select new Product
                      {
                          MaSp = p.MaSp,
                          TenSp = p.TenSp,
                          MaLoai = p.MaLoai,
                          AnhDaiDien = p.AnhDaiDien,
                          GiaNhoNhat = p.GiaNhoNhat,
                      }).ToList();
            return sp;
        }

        [HttpGet("{maLoai}")]
        public IEnumerable<Product> GetProductByCategory(string maLoai)
        {
            var sp = (from p in context.TDanhMucSps where p.MaLoai == maLoai
                      select new Product
                      {
                          MaSp = p.MaSp,
                          TenSp = p.TenSp,
                          MaLoai = p.MaLoai,
                          AnhDaiDien = p.AnhDaiDien,
                          GiaNhoNhat = p.GiaNhoNhat,
                      }).ToList();
            return sp;
        }
    }
}
