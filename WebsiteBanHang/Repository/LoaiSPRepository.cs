using WebsiteBanHang.Models;
namespace WebsiteBanHang.Repository
{
    public class LoaiSPRepository : ILoaiSPRepository
    {
        public readonly WebSiteBanHangContext _context;

        public LoaiSPRepository(WebSiteBanHangContext context)
        {
            _context = context;
        }

        public TLoaiSp Add(TLoaiSp loaiSP)
        {
            _context.Add(loaiSP);
            _context.SaveChanges();
            return loaiSP;
        }

        public TLoaiSp Delete(string maloaiSP)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TLoaiSp> GetAllLoaiSP()
        {
            return _context.TLoaiSps;
        }

        public TLoaiSp GetLoaiSP(string maloaiSP)
        {

            return _context.TLoaiSps.Find(maloaiSP);
        }

        public TLoaiSp Update(TLoaiSp loaiSP)
        {
            _context.Update(loaiSP);
            _context.SaveChanges ();
            return loaiSP;
        }
    }
}
