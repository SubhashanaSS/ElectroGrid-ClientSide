<%@page import="model.Supplier"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Supplier Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css"> 
<link rel="stylesheet" type="text/css" href="css\footer.css"> 
<script src="components/jquery-3.6.0.js"></script>
<script src="components/sup.js"></script>

<nav class="navbar navbar-expand-md navbar-dark" style="background-color: #900C3F ">
                   

                    <ul class="navbar-nav">
                        <li><a href="Index.jsp" class="nav-link"><h5>ElectroGrid</h5></a></li>
                    </ul>
                </nav>

</head>
<body>

<div class="container"> 
	<div class="row">  
		 <br>
            <div class="container col-md-5">
                <div class="card">
                    <div class="card-body">
                       

                        <caption>
                            <h2>
                                Supplier Management
                            </h2>
                        </caption>
                        
              
				<form id="formSupplier" name="formSupplier" method="post" action="Supplier.jsp">  
					Supplier Name:  
					<input id="SupplierName" name="SupplierName" type="text" class="form-control form-control-sm">  
					
					<br> 
					Supply Size:  
					<input id="SupplySize" name="SupplySize" type="text" class="form-control form-control-sm">  
					
					<br>
					 Energy Type:  
					 <input id="EnergyType" name="EnergyType" type="text" class="form-control form-control-sm">  
					 
					 <br> 
					 Supplier Status:  
					 <input id="SupplierStatus" name="SupplierStatus" type="text" class="form-control form-control-sm">  
					 
					
					 
					 
					 <br>  
					 <input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">  
					 <input type="hidden" id="hidCustomerIDSave" name="hidSupplierIDSave" value=""> 
					 
					 
				</form> 
				  </div>
                </div>
            </div>  
            
         	 <div id="alertSuccess" class="alert alert-success"></div>  
			 <div id="alertError" class="alert alert-danger"></div> 
				
				<br>    
				
			  <div class="row">
               

                <div class="container">
                    <h3 class="text-center">Supplier Details</h3>
                    <hr>
                    <div class="container text-left">

                        <a href="Index.jsp" class="btn btn-success"style="background-color: #5353ff">Navigate To Home page</a>
                        
                    </div>
                    <br>
                
                   <div id="divItemsGrid">   
					<%    
						Supplier supplierObj = new Supplier();
						out.print(supplierObj.readSupplier());   
					%>  
				
					<br>
					<br>
					 <a href="Login.jsp" class="btn btn-success"style="background-color: 	#5353ff">Logout</a>
				</div> 
                   
                </div>
            </div>
				  
 			</div>    
</div>

</body>

<!-- Site footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">This project is based on a company named <i> Electro Grid (EG)</i> Who maintains the power grid of the country. My task was to create the online platform covering the whole scope of the company. I used java , tomcat , mysql and JAX-RS Restful webservice as our tools to create our platform..</p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links">
              <li><a href="Login.jsp">Home Page</a></li>
              <li><a href="">Contact Us</a></li>
              <li><a href="">Contribute</a></li>
              
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="Login.jsp">Customer Management</a></li>
              <li><a href="Login.jsp">Supplier Management</a></li>
            </ul>
          </div>
        </div>
        <hr>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by 
         <a href="#">Samaranayake S.</a>
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
              <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
              <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>

</html>
