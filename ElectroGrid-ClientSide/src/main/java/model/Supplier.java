package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Supplier {
	// A common method to connect to the DB
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
			
			public String readSupplier() {
				String output = "";

				try {
					Connection con = connect();
					if (con == null) {
						return "Error while connecting to the database for reading.";
					}

					// Prepare the html table to be displayed
					output = "<table border='1'><tr><th>Supplier Name</th>" + "<th>Supply Size</th><th>Energy Type</th>"
							+ "<th>Supplier Status</th>" + "<th>Update</th><th>Remove</th></tr>";

					String query = "select * from supplier";
					Statement stmt = con.createStatement();
					ResultSet rs = stmt.executeQuery(query);

					// iterate through the rows in the result set
					while (rs.next()) {

						String SupplierID = Integer.toString(rs.getInt("SupplierID"));
						String SupplierName = rs.getString("SupplierName");
						String SupplySize = rs.getString("SupplySize");
						String EnergyType = rs.getString("EnergyType");
						String SupplierStatus = rs.getString("SupplierStatus");

						// Add into the html table

						output += "<tr><td><input id='hidSupplierIDUpdate' name='hidSupplierIDUpdate' type='hidden' value='"
								+ SupplierID + "'>" + SupplierName + "</td>";

						output += "<td>" + SupplySize + "</td>";
						output += "<td>" + EnergyType + "</td>";
						output += "<td>" + SupplierStatus + "</td>";

						// buttons
						output += "<td><input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-secondary'></td>"
								+ "<td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-SupplierID='"
								+ SupplierID + "'>" + "</td></tr>";

					}

					con.close();

					// Complete the html table
					output += "</table>";
				} catch (Exception e) {
					output = "Error while reading the Supplier Details.";
					System.err.println(e.getMessage());
				}

				return output;
			}
}
