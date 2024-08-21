using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebsiteBanHang.Models;
using X.PagedList;

namespace WebsiteBanHang.Areas.Admin.Controllers
{
    [Area("admin")]
    [Route("admin")]
    [Route("admin/homeadmin")]
    public class HomeAdminController : Controller
    {
        WebSiteBanHangContext context = new WebSiteBanHangContext();
        [Route("index")]
        [Route("")]
        public IActionResult Index()
        {

            return View();
        }

        [Route("danhmucsanpham")]
        public IActionResult DanhMucSanPham(int? page)
        {
            int pageSize = 8;
            int pageNumber = page == null || page < 0 ? 1 : page.Value;
            var lstSanPham = context.TDanhMucSps.AsNoTracking().OrderBy(x => x.TenSp);
            PagedList<TDanhMucSp> lst = new PagedList<TDanhMucSp>(lstSanPham, pageNumber, pageSize);
            return View(lst);
        }

        [Route("ThemSanPhamMoi")]
        [HttpGet]
        public IActionResult ThemSanPhamMoi()
        {
            ViewBag.MaChatLieu= new SelectList(context.TChatLieus.ToList(), "MaChatLieu", "ChatLieu");
            ViewBag.MaHangSx= new SelectList(context.THangSxes.ToList(), "MaHangSx", "HangSx");
            ViewBag.MaNuocSx= new SelectList(context.TQuocGia.ToList(), "MaNuoc", "TenNuoc");
            ViewBag.MaLoai= new SelectList(context.TLoaiSps.ToList(), "MaLoai", "Loai");
            ViewBag.MaDt= new SelectList(context.TLoaiDts.ToList(), "MaDt", "TenLoai");
            return View();
        }

        [Route("ThemSanPhamMoi")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult ThemSanPhamMoi(TDanhMucSp sanPham)
        {
            if (ModelState.IsValid)
            {
                context.TDanhMucSps.Add(sanPham);
                context.SaveChanges();
                return RedirectToAction("DanhMucSanPham");
            }
            else
            {
                return View(sanPham);
            }
        }

        [Route("SuaSanPham")]
        [HttpGet]
        public IActionResult SuaSanPham(string maSanPham)
        {
            ViewBag.MaChatLieu = new SelectList(context.TChatLieus.ToList(), "MaChatLieu", "ChatLieu");
            ViewBag.MaHangSx = new SelectList(context.THangSxes.ToList(), "MaHangSx", "HangSx");
            ViewBag.MaNuocSx = new SelectList(context.TQuocGia.ToList(), "MaNuoc", "TenNuoc");
            ViewBag.MaLoai = new SelectList(context.TLoaiSps.ToList(), "MaLoai", "Loai");
            ViewBag.MaDt = new SelectList(context.TLoaiDts.ToList(), "MaDt", "TenLoai");
            var sanPham = context.TDanhMucSps.Find(maSanPham);
            return View(sanPham);
        }

        [Route("SuaSanPham")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult SuaSanPham(TDanhMucSp sanPham)
        {
            if (ModelState.IsValid)
            {
                context.Entry(sanPham).State = EntityState.Modified;
                context.SaveChanges();
                return RedirectToAction("DanhMucSanPham", "HomeAdmin");
            }
            else
            {
                return View(sanPham);
            }
        }

        [Route("XoaSanPham")]
        [HttpGet]
        public IActionResult XoaSanPham(string maSanPham)
        {
            var chiTietSanPham = context.TChiTietSanPhams.Where(x => x.MaSp == maSanPham).ToList();
            if (chiTietSanPham .Count > 0)
            {
                TempData["Message"] = "Can not delete this item";
                return RedirectToAction("DanhMucSanPham", "HomeAdmin");

            }
            
            var anhSanPham = context.TAnhSps.Where(x => x.MaSp==maSanPham).ToList();
            if (anhSanPham.Any()) context.RemoveRange(anhSanPham);
            context.SaveChanges();
            TempData["Message"] = "Delete this item";
            return RedirectToAction("DanhMucSanPham", "HomeAction");

        }
    }
}
