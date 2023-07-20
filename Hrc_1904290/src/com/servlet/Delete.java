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
 * Servlet implementation class DeleteInvoice
 */
@WebServlet("/Delete")
public class Delete extends HttpServlet {
	private static final long serialVersionUID = 1L;
	/**
     * @see HttpServlet#HttpServlet()
     */
    public Delete() {
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
try {
			
			int slno = Integer.valueOf(request.getParameter("sl_no"));
			
			Connection con=Crud.createConnect();
			String sql_query="update winter_internship set is_deleted=1 where sl_no=?;" ;
			//We are supposed to use the is_deleted variable
			PreparedStatement st=con.prepareStatement(sql_query);			
			
			st.setInt(1, slno);
			st.executeUpdate();
			con.close();
			response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}

}
}