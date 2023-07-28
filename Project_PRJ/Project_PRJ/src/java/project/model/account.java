/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import project.dao.DBConnect;

/**
 *
 * @author duong
 */
public class account {
    int user_id;
    String username;
    String password;
    String fullname;
    String email;

    public account() {
    }

    public account(int user_id, String username, String password, String fullname, String email) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
    }

//    public account(String username, String password) {
//        this.username = username;
//        this.password = password;
//        connect();
//    }
    
    

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "account{" + "user_id=" + user_id + ", username=" + username + ", password=" + password + ", fullname=" + fullname + ", email=" + email + '}';
    }
    
    
//    Connection cnn;//ket noi DB
//    Statement stm;// thuc thi cau lenh sql
////        PreparedStatement stm;
//            PreparedStatement pstm;
//    ResultSet rs; // luu tru va quan li du lieu
//
//     private void connect() {
//        try {
//            cnn = (new DBConnect().conn);
//            if (cnn != null) {
//                System.out.println("Connect success");
//            }
//        } catch (Exception e) {
//
//        }
//    }
//     
//     
//      public boolean findUser() {
//        try {
//            String strSelect = "select * from Account where username=?";
//            pstm = cnn.prepareStatement(strSelect);
//            pstm.setString(1, username);
//            rs = pstm.executeQuery();
//            while (rs.next()) {
//                return true;
//            }
//
//        } catch (Exception e) {
//            System.out.println("findUser: " + e.getMessage());
//        }
//        return false;
//    }

    
}
