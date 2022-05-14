$(document).ready(function() 
{  
	if ($("#alertSuccess").text().trim() == "")  
	{   
		$("#alertSuccess").hide();  
	} 
	$("#alertError").hide(); 
});

//SAVE ============================================ 
$(document).on("click", "#btnSave", function(event) 
{  
	// Clear alerts---------------------  
	$("#alertSuccess").text("");  
	$("#alertSuccess").hide();  
	$("#alertError").text("");  
	$("#alertError").hide(); 

	// Form validation-------------------  
	var status = validateCustomerForm();  
	if (status != true)  
	{   
		$("#alertError").text(status);   
		$("#alertError").show();   
		return;  
	} 

	// If valid------------------------  
	var t = ($("#hidCustomerIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
	{
		url : "CustomerApi",
		type : t,
		data : $("#formCustomer").serialize(),
		dataType : "text",
		complete : function(response, status)
		{
			onCustomerSaveComplete(response.responseText, status);
		}
	});
}); 

function onCustomerSaveComplete(response, status){
	if(status == "success")
	{
		var resultSet = JSON.parse(response);
			
		if(resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully Saved.");
			$("#alertSuccess").show();
					
			$("#divItemsGrid").html(resultSet.data);
	
		}else if(resultSet.status.trim() == "error"){
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	}else if(status == "error"){
		$("#alertError").text("Error While Saving.");
		$("#slertError").show();
	}else{
		$("#alertError").text("Unknown Error while Saving.");
		$("#alertError").show();
	}
	$("#hidCustomerIDSave").val("");
	$("#formCustomer")[0].reset();
}

//UPDATE========================================== 
$(document).on("click", ".btnUpdate", function(event) 
		{     
	$("#hidCustomerIDSave").val($(this).closest("tr").find('#hidCustomerIDUpdate').val());     
	$("#CustomerName").val($(this).closest("tr").find('td:eq(0)').text());    
	$("#CustomerAddress").val($(this).closest("tr").find('td:eq(1)').text());     
	$("#CustomerEmail").val($(this).closest("tr").find('td:eq(2)').text());     
	$("#CustomerContact").val($(this).closest("tr").find('td:eq(3)').text()); 
	
});

//Remove Operation
$(document).on("click", ".btnRemove", function(event){
	$.ajax(
	{
		url : "CustomerApi",
		type : "DELETE",
		data : "CustomerID=" + $(this).data("customerid"),
		dataType : "text",
		complete : function(response, status)
		{
			onCustomerDeletedComplete(response.responseText, status);
		}
	});
});

function onCustomerDeletedComplete(response, status)
{
	if(status == "success")
	{
		var resultSet = JSON.parse(response);
			
		if(resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully Deleted.");
			$("#alertSuccess").show();
					
			$("#divItemsGrid").html(resultSet.data);
	
		}else if(resultSet.status.trim() == "error"){
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	}else if(status == "error"){
		$("#alertError").text("Error While Deleting.");
		$("#alertError").show();
	}else{
		$("#alertError").text("Unknown Error While Deleting.");
		$("#alertError").show();
	}
}

//CLIENTMODEL
function validateCustomerForm() {  
	// NAME  
	if ($("#CustomerName").val().trim() == "")  {   
		return "Insert CustomerName.";  
		
	} 
	
	 // Address 
	if ($("#CustomerAddress").val().trim() == "")  {   
		return "Insert CustomerAddress.";  
	} 
	
	
	//Email
	if ($("#CustomerEmail").val().trim() == "")  {   
		return "Insert CustomerEmail."; 
		 
	}
	 
	 // is numerical value  
	var tmpMobile = $("#CustomerContact").val().trim();  
	if (!$.isNumeric(tmpMobile))  {   
		return "Insert a numerical value for Contact Number.";  
		}	
		
		 return true;
		 
	}