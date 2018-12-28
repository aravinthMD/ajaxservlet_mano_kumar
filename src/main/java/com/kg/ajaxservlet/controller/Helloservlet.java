package com.kg.ajaxservlet.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.kg.ajaxservlet.model.Country;

/**
 * Helloservlet
 */
@WebServlet("/hello/*")
public class Helloservlet extends HttpServlet {
    ArrayList<Country> countryList = new ArrayList<Country>();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // super.doGet(req, resp);
        System.out.println("do get called");
        String query = "SELECT * from country";
        try {

            List<Object> list = MysqlConnect.getDbCon().resultSetToArrayList(query);
            List<Country> countryList = (List<Country>) (List<?>) list;

            String countryJsonString = new Gson().toJson(countryList);
            System.out.println(countryJsonString);

            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            resp.getWriter().write(countryJsonString);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        System.out.println("do delete called");
        int id=Integer.parseInt(req.getParameter("countryid"));
        System.out.println("countryid "+id);
    
       String sql="DELETE FROM country WHERE countryid="+id;

        try {
            int result=MysqlConnect.getDbCon().delete(sql);
            System.out.println(result);
        } catch (SQLException e) {
            e.printStackTrace();
        }
       

        
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //
        System.out.println("Ready to get inserted");
        int id=Integer.parseInt(req.getParameter("countryid"));
        System.out.println(id);
        String name=req.getParameter("countryname");
        System.out.println(name);

        String sql="INSERT INTO country(countryid,countryname) VALUES("+id+",'"+name+"')";  

        try {
            int result=MysqlConnect.getDbCon().insert(sql);
        } catch (Exception e) {
            //TODO: handle exception
        }


    }



    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        System.out.println("Ready to be edited");
    }

    // private void setAccessControlHeaders(HttpServletResponse resp) {
    //     resp.setHeader("Access-Control-Allow-Origin", "http://localhost:9090");
    //     resp.setHeader("Access-Control-Allow-Methods", "GET");
    //     resp.setHeader("Access-Control-Allow-Methods", "DELETE");
    //     resp.setHeader("Access-Control-Allow-Methods", "POST");
    
    // }

    // protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //     setAccessControlHeaders(resp);
    //     resp.setStatus(HttpServletResponse.SC_OK);
    // }

}