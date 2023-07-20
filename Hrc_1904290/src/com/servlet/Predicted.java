package com.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.crud.Crud;

/**
 * Servlet implementation class Predicted
 */
@WebServlet("/Predicted")
public class Predicted extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Predicted() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		doGet(request, response);
try {
			
			Connection con=Crud.createConnect();
			String sql_query="update winter_internship set aging_bucket=?;" + "where sl_no=?;" ;
			PreparedStatement st=con.prepareStatement(sql_query);
			
			st.setString(1,request.getParameter("aging_buket"));	
			st.setString(2,request.getParameter("sl_no"));
			
			
			
			st.executeUpdate();
			con.close();
			response.setHeader("Access-Control-Allow-Origin", "*");
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
