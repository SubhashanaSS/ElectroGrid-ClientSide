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
	var status = validateSupplierForm();  
	if (status != true)  
	{   
		$("#alertError").text(status);   
		$("#alertError").show();   
		return;  
	} 

	// If valid------------------------  
	var t = ($("#hidSupplierIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
	{
		url : "SupplierApi",
		type : t,
		data : $("#formSupplier").serialize(),
		dataType : "text",
		complete : function(response, status)
		{
			onSupplierSaveComplete(response.responseText, status);
		}
	});
}); 

function onSupplierSaveComplete(response, status){
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
	$("#hidSupplierIDSave").val("");
	$("#formSupplier")[0].reset();
}

//UPDATE========================================== 
$(document).on("click", ".btnUpdate", function(event) 
		{     
	$("#hidSupplierIDSave").val($(this).closest("tr").find('#hidSupplierIDUpdate').val());     
	$("#SupplierName").val($(this).closest("tr").find('td:eq(0)').text());    
	$("#SupplySize").val($(this).closest("tr").find('td:eq(1)').text());     
	$("#EnergyType").val($(this).closest("tr").find('td:eq(2)').text());     
	$("#SupplierStatus").val($(this).closest("tr").find('td:eq(3)').text()); 
	

});

//Remove Operation
$(document).on("click", ".btnRemove", function(event){
	$.ajax(
	{
		url : "SupplierApi",
		type : "DELETE",
		data : "SupplierID=" + $(this).data("supplierid"),
		dataType : "text",
		complete : function(response, status)
		{
			onSupplierDeletedComplete(response.responseText, status);
		}
	});
});

function onSupplierDeletedComplete(response, status)
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
function validateSupplierForm() {  
	// Date  
	if ($("#SupplierName").val().trim() == "")  {   
		return "Insert Supplier Name.";  
		
	} 
	
	 // Type 
	if ($("#SupplierStatus").val().trim() == "")  {   
		return "Insert Supplier Status.";  
	} 
	
	
	// Amount  
	if ($("#EnergyType").val().trim() == "")  {   
		return "Insert Energy Type."; 
		 
	}
	 
	 // is numerical value  
	var tmpMobile = $("#SupplySize").val().trim();  
	if (!$.isNumeric(tmpMobile))  {   
		return "Insert a numerical value for Supply Size.";  
		
	}
	 
	
		

	 
	 return true; 
	 
}