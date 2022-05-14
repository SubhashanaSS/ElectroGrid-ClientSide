package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Customer {
	//Set DB connection
			private Connection connect() {
				Connection con = null;

				try {
					Class.forName("com.mysql.jdbc.Driver");
					// Provide the correct details: DBServer/DBName, username, password
					con = DriverManager.getConnection("jdbc:mysql://localhost:3306/electrogrid_clientside", "root", "");

					// For testing
					System.out.print("Successfully connected");

				} catch (Exception e) {
					e.printStackTrace();
				}

				return con;
			}
			
			//Read Customer
			public String readCustomer() {
				String output = "";

				try {
					Connection con = connect();
					if (con == null) {
						return "Error while connecting to the database for reading.";
					}

					// Prepare the html table to be displayed
					output = "<table border='1'><tr><th>Customer Name</th>" + "<th>Customer Address</th><th>Customer Email</th>"
							+ "<th>Customer Contact</th>" + "<th>Update</th><th>Remove</th></tr>";

					String query = "select * from customer";
					Statement stmt = con.createStatement();
					ResultSet rs = stmt.executeQuery(query);

					// iterate through the rows in the result set
					while (rs.next()) {

						String CustomerID = Integer.toString(rs.getInt("customerID"));
						String CustomerName = rs.getString("CustomerName");
						String CustomerAddress = rs.getString("CustomerAddress");
						String CustomerEmail = rs.getString("CustomerEmail");
						String CustomerContact = Integer.toString(rs.getInt("CustomerContact"));

						// Add into the html table

						output += "<tr><td><input id='hidcustomerIDUpdate' name='hidcustomerIDUpdate' type='hidden' value='"
								+ CustomerID + "'>" + CustomerName + "</td>";

						output += "<td>" + CustomerAddress + "</td>";
						output += "<td>" + CustomerEmail + "</td>";
						output += "<td>" + CustomerContact + "</td>";

						// buttons
						output += "<td><input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-secondary'></td>"
								+ "<td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-customerID='"
								+ CustomerID + "'>" + "</td></tr>";

					}

					con.close();

					// Complete the html table
					output += "</table>";
				} catch (Exception e) {
					output = "Error while reading the Customer Details.";
					System.err.println(e.getMessage());
				}

				return output;
			}

}