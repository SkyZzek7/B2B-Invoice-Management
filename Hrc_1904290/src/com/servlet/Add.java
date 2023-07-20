//package com.servlet;
//
//import java.io.IOException;
//import java.sql.Connection;
//import java.sql.Date;
//import java.sql.PreparedStatement;
//
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import com.crud.Crud;
//
//@WebServlet("/Add")
//public class Add extends HttpServlet {
//	private static final long serialVersionUID = 1L;
//       
//    
//    public Add() {
//        super();
//        
//    }
//
//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		
//		response.getWriter().append("Served at: ").append(request.getContextPath());
//	}
//
//	
//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		
//		String business_code = request.getParameter("business_code");
//        int cust_number = request.getParameter("cust_number") != "" ? Integer.parseInt(request.getParameter("cust_number")) : 0;
//        Date clear_date = request.getParameter("clear_date") != "" ? Date.valueOf(request.getParameter("clear_date")):null;
//        int buisness_year = request.getParameter("buisness_year") != "" ? Integer.parseInt(request.getParameter("buisness_year")):0;
//        String doc_id = request.getParameter("doc_id");
//        Date posting_date = request.getParameter("posting_date") != "" ? Date.valueOf(request.getParameter("posting_date")):null;
//        Date document_create_date = request.getParameter("document_create_date") != "" ? Date.valueOf(request.getParameter("document_create_date")):null;
//        Date due_in_date = request.getParameter("due_in_date") != "" ? Date.valueOf(request.getParameter("due_in_date")):null;
//        String invoice_currency = request.getParameter("invoice_currency");
//        String document_type = request.getParameter("document_type");
//        int posting_id = request.getParameter("posting_id") != "" ? Integer.parseInt(request.getParameter("posting_id")):0;
//        double total_open_amount = request.getParameter("total_open_amount") != "" ? Double.parseDouble(request.getParameter("total_open_amount")):0;
//        Date baseline_create_date = request.getParameter("baseline_create_date") != "" ? Date.valueOf(request.getParameter("baseline_create_date")):null;
//        String cust_payment_terms = request.getParameter("cust_payment_terms");
//        String invoice_id = request.getParameter("invoice_id");
//		
//		try {
//			
//			Connection con = Crud.createConnect();
//			String query = "INSERT INTO winter_internship (business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//			PreparedStatement st = con.prepareStatement(query);
//			
//			st.setString(1, business_code);
//            st.setInt(2, cust_number);
//            st.setDate(3, clear_date);
//            st.setInt(4, buisness_year);
//            st.setString(5, doc_id);
//            st.setDate(6, posting_date);
//            st.setDate(7, document_create_date);
//            st.setDate(8, due_in_date);
//            st.setString(9, invoice_currency);
//            st.setString(10, document_type);
//            st.setInt(11, posting_id);
//            st.setDouble(12, total_open_amount);
//            st.setDate(13, baseline_create_date);
//            st.setString(14, cust_payment_terms);
//            st.setString(15, invoice_id);
//            st.executeUpdate();
//            System.out.println(st);
//            response.setHeader("Access-Control-Allow-Origin", "*");
//        
//		}
//		catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//}

package com.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.crud.Crud;

@WebServlet("/Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public Add() {
        super();
        
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String business_code = request.getParameter("business_code");
        int cust_number = request.getParameter("cust_number") != "" ? Integer.parseInt(request.getParameter("cust_number")) : 0;
        Date clear_date = request.getParameter("clear_date") != "" ? Date.valueOf(request.getParameter("clear_date")):null;
        int buisness_year = request.getParameter("buisness_year") != "" ? Integer.parseInt(request.getParameter("buisness_year")):0;
        String doc_id = request.getParameter("doc_id");
        Date posting_date = request.getParameter("posting_date") != "" ? Date.valueOf(request.getParameter("posting_date")):null;
        Date document_create_date = request.getParameter("document_create_date") != "" ? Date.valueOf(request.getParameter("document_create_date")):null;
        Date due_in_date = request.getParameter("due_in_date") != "" ? Date.valueOf(request.getParameter("due_in_date")):null;
        String invoice_currency = request.getParameter("invoice_currency");
        String document_type = request.getParameter("document_type");
        int posting_id = request.getParameter("posting_id") != "" ? Integer.parseInt(request.getParameter("posting_id")):0;
        double total_open_amount = request.getParameter("total_open_amount") != "" ? Double.parseDouble(request.getParameter("total_open_amount")):0;
        Date baseline_create_date = request.getParameter("baseline_create_date") != "" ? Date.valueOf(request.getParameter("baseline_create_date")):null;
        String cust_payment_terms = request.getParameter("cust_payment_terms");
        int invoice_id = request.getParameter("invoice_id") != "" ? Integer.parseInt(request.getParameter("invoice_id")) : 0;
		
		try {
			
			Connection con = Crud.createConnect();
			String query = "INSERT INTO winter_internship (business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			PreparedStatement st = con.prepareStatement(query);
			
			st.setString(1, business_code);
            st.setInt(2, cust_number);
            st.setDate(3, clear_date);
            st.setInt(4, buisness_year);
            st.setString(5, doc_id);
            st.setDate(6, posting_date);
            st.setDate(7, document_create_date);
            st.setDate(8, due_in_date);
            st.setString(9, invoice_currency);
            st.setString(10, document_type);
            st.setInt(11, posting_id);
            st.setDouble(12, total_open_amount);
            st.setDate(13, baseline_create_date);
            st.setString(14, cust_payment_terms);
            st.setInt(15, invoice_id);
            st.executeUpdate();
            System.out.println(st);
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
        
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

}