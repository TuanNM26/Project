/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import project.model.account;
import project.model.blog_detail;
import project.model.category_blog;

/**
 *
 * @author duong
 */
public class blog_detailDao extends DBConnect {

    public List<blog_detail> listblog_detail(int numberPage, int sizePage) {
        List<blog_detail> list = new ArrayList<>();
        try ( Connection connection = DBConnect.getConnection()) {
            int offset = (numberPage - 1) * sizePage;
            String sql = "SELECT * FROM (SELECT ROW_NUMBER() OVER (ORDER BY id) AS rownum, * FROM blog_detail) AS b WHERE b.status = 1 and b.rownum > ? AND b.rownum <= ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, offset);
            statement.setInt(2, offset + sizePage);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                blog_detail blog = new blog_detail();
                blog.setId(rs.getInt("id"));
                blog.setCategory_id(rs.getInt("category_id"));
                blog.setUser_id(rs.getInt("user_id"));
                blog.setTitle(rs.getString("title"));
                blog.setThumbnail(rs.getString("thumbnail"));
                blog.setBrief(rs.getString("brief"));
                blog.setDescription(rs.getString("description"));
                blog.setFlag(rs.getInt("flag"));
                blog.setStatus(rs.getInt("status"));
                blog.setDate(rs.getDate("date").toLocalDate());
                blog.setAuthor(rs.getString("author"));
                list.add(blog);
            }
        } catch (SQLException ex) {
            Logger.getLogger(blog_detailDao.class.getName()).log(Level.SEVERE, null, ex);
        }
        return list;
    }

    public List<blog_detail> listblog_detailAdmin() {
        List<blog_detail> list = new ArrayList<>();
        try ( Connection connection = DBConnect.getConnection()) {
            String sql = "SELECT * FROM (SELECT ROW_NUMBER() OVER (ORDER BY id) AS rownum, * FROM blog_detail) AS b";
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                blog_detail blog = new blog_detail();
                blog.setId(rs.getInt("id"));
                blog.setCategory_id(rs.getInt("category_id"));
                blog.setUser_id(rs.getInt("user_id"));
                blog.setTitle(rs.getString("title"));
                blog.setThumbnail(rs.getString("thumbnail"));
                blog.setBrief(rs.getString("brief"));
                blog.setDescription(rs.getString("description"));
                blog.setFlag(rs.getInt("flag"));
                blog.setStatus(rs.getInt("status"));
                blog.setDate(rs.getDate("date").toLocalDate());
                blog.setAuthor(rs.getString("author"));
                list.add(blog);
            }
        } catch (SQLException ex) {
            Logger.getLogger(blog_detailDao.class.getName()).log(Level.SEVERE, null, ex);
        }
        return list;
    }

    public int total() {

        try ( Connection connection = DBConnect.getConnection()) {
            String sql = "SELECT count(*) FROM (SELECT ROW_NUMBER() OVER (ORDER BY id) AS rownum, * FROM blog_detail) AS b ";
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                int totalPost = rs.getInt(1);
                return totalPost;
            }
        } catch (SQLException ex) {
            Logger.getLogger(blog_detailDao.class.getName()).log(Level.SEVERE, null, ex);
        }
        return 0;
    }

    public static blog_detail detail(int id) {
        blog_detail blog = null;
        try ( Connection connection = DBConnect.getConnection()) {
            String sql = "SELECT * FROM Blog_Detail WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            System.out.println(sql);
            if (rs.next()) {
                blog = new blog_detail();
                blog.setId(rs.getInt(1));
                blog.setCategory_id(rs.getInt(2));
                blog.setUser_id(rs.getInt(3));
                blog.setTitle(rs.getString(4));
                blog.setThumbnail(rs.getString(5));
                blog.setBrief(rs.getString(6));
                blog.setDescription(rs.getString(7));
                blog.setFlag(rs.getInt(8));
                blog.setStatus(rs.getInt(9));
                blog.setDate(rs.getDate(10).toLocalDate());
                blog.setAuthor(rs.getString(11));
            }
        } catch (SQLException ex) {
            Logger.getLogger(blog_detailDao.class.getName()).log(Level.SEVERE, null, ex);
        }
        return blog;
    }

    public static List<blog_detail> top3() {
        List<blog_detail> posts = new ArrayList<>();
        try ( Connection connection = DBConnect.getConnection()) {
            String sql = "SELECT TOP 3 * FROM Blog_Detail where status = 1 ORDER BY date DESC";
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                blog_detail blog = new blog_detail();
                blog.setId(rs.getInt("id"));
                blog.setCategory_id(rs.getInt("category_id"));
                blog.setUser_id(rs.getInt("user_id"));
                blog.setTitle(rs.getString("title"));
                blog.setThumbnail(rs.getString("thumbnail"));
                blog.setBrief(rs.getString("brief"));
                blog.setDescription(rs.getString("description"));
                blog.setFlag(rs.getInt("flag"));
                blog.setStatus(rs.getInt("status"));
                blog.setDate(rs.getDate("date").toLocalDate());
                blog.setAuthor(rs.getString("author"));
                posts.add(blog);
            }
        } catch (SQLException ex) {
            Logger.getLogger(blog_detailDao.class.getName()).log(Level.SEVERE, null, ex);
        }
        return posts;
    }

    public static int totalPage(int sizePage, String keyword) {
        int totalPage = 0;
        try ( Connection connection = DBConnect.getConnection()) {
            String sql = "SELECT count(*)\n"
                    + "    FROM Blog_Detail bd \n"
                    + "    JOIN Category_Blog cb ON bd.category_id = cb.id WHERE 1=1 ";
            if (keyword != null) {
                sql += " AND cb.name LIKE ? or bd.title LIKE ?";
            }

            PreparedStatement statement = connection.prepareStatement(sql);
            System.out.println(sql);
            int paramIndex = 1;
            if (keyword != null) {
                statement.setString(paramIndex++, "%" + keyword + "%");
                statement.setString(paramIndex++, "%" + keyword + "%");
            }
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                int totalPost = rs.getInt(1);
                totalPage = (int) Math.ceil((double) totalPost / sizePage);
            }
        } catch (SQLException ex) {
            Logger.getLogger(blog_detailDao.class.getName()).log(Level.SEVERE, null, ex);
        }
        return totalPage;
    }

    public static List<blog_detail> search(String keyword, int numberPage, int sizePage) {
        List<blog_detail> list = new ArrayList<>();
        try ( Connection connection = DBConnect.getConnection()) {
            int offset = (numberPage - 1) * sizePage;
            String sql = "SELECT b.bd_id,b.category_id, b.user_id, b.title, b.thumbnail, b.brief, b.description, b.flag, b.status, b.date, b.author\n"
                    + "FROM (SELECT ROW_NUMBER() OVER (ORDER BY bd.id) AS rownum, bd.id as bd_id, bd.category_id, bd.user_id, bd.title, bd.thumbnail, bd.brief, bd.description, bd.flag, bd.status, bd.date, bd.author \n"
                    + "    FROM Blog_Detail bd \n"
                    + "    JOIN Category_Blog cb ON bd.category_id = cb.id \n"
                    + "    WHERE 1=1 ";
            if (keyword != null) {
                sql += " AND cb.name LIKE ? or bd.title LIKE ?";
            }

            sql += ") AS b WHERE  b.status = 1 and b.rownum > ? AND b.rownum <= ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            System.out.println(sql);
            int paramIndex = 1;
            if (keyword != null) {
                statement.setString(paramIndex++, "%" + keyword + "%");
                statement.setString(paramIndex++, "%" + keyword + "%");
            }

            statement.setInt(paramIndex++, offset);
            statement.setInt(paramIndex++, offset + sizePage);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                blog_detail blog = new blog_detail();
                blog.setId(rs.getInt(1));
                blog.setCategory_id(rs.getInt("category_id"));
                blog.setUser_id(rs.getInt("user_id"));
                blog.setTitle(rs.getString("title"));
                blog.setThumbnail(rs.getString("thumbnail"));
                blog.setBrief(rs.getString("brief"));
                blog.setDescription(rs.getString("description"));
                blog.setFlag(rs.getInt("flag"));
                blog.setStatus(rs.getInt("status"));
                blog.setDate(rs.getDate("date").toLocalDate());
                blog.setAuthor(rs.getString("author"));
                blog.setCategory_id(rs.getInt("category_id"));
                list.add(blog);
            }
        } catch (SQLException ex) {
            Logger.getLogger(blog_detailDao.class.getName()).log(Level.SEVERE, null, ex);
        }
        return list;
    }

    public void delete(int id) {
        try ( Connection connection = DBConnect.getConnection()) {
            Statement stmt = connection.createStatement();
            String query = "DELETE FROM Blog_Detail WHERE id=" + id;
            stmt.executeUpdate(query);
            connection.close();
        } catch (SQLException e) {
        }
    }

    public static List<category_blog> getAll() {
        List<category_blog> categories = new ArrayList<>();
        try ( Connection connection = DBConnect.getConnection()) {
            Statement stmt = connection.createStatement();
            String query = "SELECT * FROM Category_Blog";
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                category_blog category = new category_blog();
                category.setCate_id(rs.getInt("id"));
                category.setName(rs.getString("name"));
                categories.add(category);
            }
            connection.close();
        } catch (SQLException e) {
        }
        return categories;
    }

    public void insert(int cate_id, int userId, String title, String thumbnail, String brief, String description, int flag, int status, String author) {
        try ( Connection connection = DBConnect.getConnection()) {
            String query = "INSERT INTO Blog_Detail  "
                    + "VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement pstmt = connection.prepareStatement(query);
            pstmt.setInt(1, cate_id);
            pstmt.setInt(2, userId);
            pstmt.setString(3, title);
            pstmt.setString(4, thumbnail);
            pstmt.setString(5, brief);
            pstmt.setString(6, description);
            pstmt.setInt(7, flag);
            pstmt.setInt(8, status);
            pstmt.setDate(9, Date.valueOf(LocalDate.now()));
            pstmt.setString(10, author);
            pstmt.executeUpdate();
            connection.close();
        } catch (SQLException e) {
        }
    }

    public void edit(int id, int cate_id, int userId, String title, String thumbnail, String brief, String description, int flag, int status, String author) {
        try ( Connection connection = DBConnect.getConnection()) {
            String query = "UPDATE Blog_Detail SET category_id=?, user_id=?, title=?, thumbnail=?, brief=?, description=?, flag=?, status=?, author=? ,date = ? WHERE id=?";
            PreparedStatement pstmt = connection.prepareStatement(query);
            pstmt.setInt(1, cate_id);
            pstmt.setInt(2, userId);
            pstmt.setString(3, title);
            pstmt.setString(4, thumbnail);
            pstmt.setString(5, brief);
            pstmt.setString(6, description);
            pstmt.setInt(7, flag);
            pstmt.setInt(8, status);
            pstmt.setString(9, author);
            pstmt.setDate(10, Date.valueOf(LocalDate.now()));
            pstmt.setInt(11, id);
            int rowsUpdated = pstmt.executeUpdate();
            System.out.println("Rows updated: " + rowsUpdated);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public static account findByUsernameAndPassword(String username, String password) {
    account result = null;
    try (Connection connection = DBConnect.getConnection()) {
        String query = "SELECT * FROM Account WHERE username=? AND password=?";
        PreparedStatement pstmt = connection.prepareStatement(query);
        pstmt.setString(1, username);
        pstmt.setString(2, password);
        ResultSet rs = pstmt.executeQuery();
        if (rs.next()) {
            result = new account();
            result.setUser_id(rs.getInt("user_id"));
            result.setUsername(rs.getString("username"));
            result.setPassword(rs.getString("password"));
            result.setFullname(rs.getString("fullname"));
            result.setEmail(rs.getString("email"));
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return result;
}
    public static void register(String username, String password, String fullname, String email) {
    try (Connection conn = DBConnect.getConnection()) {
        String query = "INSERT INTO Account (username, password, fullname, email) VALUES (?, ?, ?, ?)";
        PreparedStatement pstmt = conn.prepareStatement(query);
        pstmt.setString(1, username);
        pstmt.setString(2, password);
        pstmt.setString(3, fullname);
        pstmt.setString(4, email);
        pstmt.executeUpdate();
    } catch (SQLException ex) {
        // handle exception
    }
}


    public static void main(String[] args) {
        blog_detailDao dao = new blog_detailDao();
       List<blog_detail> li = dao.search(null, 1, 10);
        for (blog_detail object : li) {
            System.out.println(object);
        }
    }
}
