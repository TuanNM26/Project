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


/**
 *
 * @author duong
 */
public class searchController extends HttpServlet {

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
            out.println("<title>Servlet searchController</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>dxcd</h1>");
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
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
         String keyword = request.getParameter("keyword");
         String pagenumber = request.getParameter("pageNumber");
         if(pagenumber ==null){
             pagenumber = "1";
         }
        int pageNumber = Integer.parseInt(pagenumber);
        int sizePage = 3;

    List<blog_detail> result = blog_detailDao.search( keyword, pageNumber, sizePage);
    String html = "";
        for (blog_detail object : result) {
            html+= "<div class='recent-news blog-lg m-b40'>";
            html+=	"<div class='action-box blog-lg'>";
            html+=	"<img src='"+object.getThumbnail()+"' alt=''>";
		html+=						"</div>";
		html+=						"<div class='info-bx'>";
		html+=							"<ul class='media-post'>";
		html+=								"<li><a href=><i class='fa fa-calendar'></i>"+object.getDate()+"</a></li>";
		html+=								"<li><a href=''><i class='fa fa-user'></i>"+object.getAuthor()+"</a></li>";
		html+=							"</ul>";
		html+=							"<h5 class='post-title'><a href='blogDetail?id="+object.getId()+"'>"+object.getTitle()+"</a></h5>";
		html+=							"<p>"+object.getDescription()+"</p>";
		html+=						"</div>";
		html+=					"</div>";
               
        }
           out.println(html);
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
        processRequest(request, response);
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
