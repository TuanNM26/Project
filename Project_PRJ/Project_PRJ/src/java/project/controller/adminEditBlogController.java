/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package project.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import project.dao.blog_detailDao;
import project.model.blog_detail;
import project.model.category_blog;

/**
 *
 * @author duong
 */
public class adminEditBlogController extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try ( PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet adminEditBlogController</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet adminEditBlogController at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        blog_detailDao dao = new blog_detailDao();
        String id = request.getParameter("id");
        blog_detail b = dao.detail(Integer.parseInt(id));
        List<category_blog> listC = blog_detailDao.getAll();
        request.setAttribute("listC", listC);
        request.setAttribute("blog", b);
        request.getRequestDispatcher("editBlog.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        blog_detailDao dao = new blog_detailDao();
        String id = request.getParameter("id");
        String cate_id = request.getParameter("cate_id");
        String title = request.getParameter("title");
        String thumbnail = request.getParameter("thumbnail");
        String brief = request.getParameter("brief");
        String author = request.getParameter("author");
        String Description = request.getParameter("Description");
        int statusI = 0;
        String status = request.getParameter("status"); // Lấy giá trị của trường status
        if (status != null && status.equals("on")) {
            statusI = 1;
        }
        int flagI = 0;
        String flag = request.getParameter("flag"); // Lấy giá trị của trường status
        if (flag != null && flag.equals("on")) {
            flagI = 1;
        }
        
        dao.edit(Integer.parseInt(id), Integer.parseInt(cate_id), 1, title, thumbnail, brief, Description, flagI, statusI, author);
        request.setAttribute("status", statusI);
        request.getRequestDispatcher("blog.jsp").forward(request, response);
        response.sendRedirect("adminBlog");
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
