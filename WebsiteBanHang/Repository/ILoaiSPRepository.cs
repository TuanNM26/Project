using WebsiteBanHang.Models;
namespace WebsiteBanHang.Repository
{
    public interface ILoaiSPRepository
    {
        TLoaiSp Add(TLoaiSp loaiSP);

        TLoaiSp Update(TLoaiSp loaiSP);

        TLoaiSp Delete(string maloaiSP);

        TLoaiSp GetLoaiSP(string maloaiSP);

        IEnumerable<TLoaiSp> GetAllLoaiSP();
    }
}
