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

@WebServlet("/Edit")
public class Edit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public Edit() {
        super();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//doGet(request, response);
		
		
		try {
			
			Connection con=Crud.createConnect();
			String sql_query="update winter_internship set invoice_currency=?,cust_payment_terms=?" + "where sl_no=?;" ;
			PreparedStatement st=con.prepareStatement(sql_query);
			
			st.setString(1,request.getParameter("invoice_currency"));	
			st.setString(2,request.getParameter("cust_payment_terms"));
			st.setString(3,request.getParameter("sl_no"));
			
			
			
			st.executeUpdate();
			con.close();
			response.setHeader("Access-Control-Allow-Origin", "*");
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}