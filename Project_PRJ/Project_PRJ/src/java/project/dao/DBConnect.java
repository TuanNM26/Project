/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project.dao;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DBConnect {
    public Connection conn;
    /**
     * main
     *
     * @author viettuts.vn
     * @param args
     */
    public static void main(String args[]) {
        try {
            // connnect to database 'testdb'
            Connection conn = getConnection();
            // close connection
            conn.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    /**
     * create connection
     *
     * @author viettuts.vn
     * @param dbURL: database's url
     * @param userName: username is used to login
     * @param password: password is used to login
     * @return connection
     */
    public static Connection getConnection() {
//    String DB_URL = "jdbc:mysql://ec2-18-138-11-200.ap-southeast-1.compute.amazonaws.com/swp_project";
//    String USER_NAME = "root";
//    String PASSWORD = "YUx6avHuynBbDXG2SN2n";
        Connection conn = null;
        String url = "jdbc:sqlserver://LAPTOP-HK5HU0DA:1433;databaseName=PRJ301_Project";
        String USER_NAME = "sa";
        String PASSWORD = "123";

        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            conn = DriverManager.getConnection(url, USER_NAME, PASSWORD);

        } catch (Exception ex) {
            System.out.println("connect failure!");
            ex.printStackTrace();
        }
        return conn;
    }
}
