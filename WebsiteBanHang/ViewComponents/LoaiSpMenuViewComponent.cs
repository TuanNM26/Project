using WebsiteBanHang.Models;
using Microsoft.AspNetCore.Mvc;
using WebsiteBanHang.Repository;

namespace WebsiteBanHang.ViewComponents
{
    public class LoaiSpMenuViewComponent : ViewComponent
    {
        private readonly ILoaiSPRepository _loaiSp;

        public LoaiSpMenuViewComponent(ILoaiSPRepository loaiSpRepository)
        {
            _loaiSp = loaiSpRepository;
        }

        public IViewComponentResult Invoke()
        {
            var loaiSp = _loaiSp.GetAllLoaiSP().OrderBy(x => x.Loai);
            return View(loaiSp);
        }
    }
}
