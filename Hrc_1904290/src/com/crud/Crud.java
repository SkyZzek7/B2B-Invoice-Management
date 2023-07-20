package com.crud;

import java.sql.*;
import java.sql.SQLException;

public class Crud {
    public static Connection createConnect() {
        Connection con = null;
        String url = "jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
        String uname = "root";
        String pass = "root";
        
        try {
            try {
                Class.forName("com.mysql.jdbc.Driver");
            }
            catch (ClassNotFoundException e)
            {
                e.printStackTrace();
            }
            con = DriverManager.getConnection(url, uname, pass);
            System.out.println("Post establishing a DB connection - " +con);
            
        }
        catch(SQLException e)
        {
            System.out.println("Error");
            e.printStackTrace();
        }
        return con;
        
    }

}