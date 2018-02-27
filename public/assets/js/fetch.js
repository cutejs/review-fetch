$(document).ready(function(){
	type = ['','info','success','warning','danger'];

	fetchFunctions = {
	    showNotification: function(from, align){
	    var color = 2;

	    	$.notify({
	        	icon: "ti-check",
	        	message: "<b>Emails successfully sent!</b>"

	        },{
	            type: type[color],
	            timer: 1000,
	            placement: {
	                from: from,
	                align: align
	            }
	        });
		}
	}
	var data = {
	    from: 'testfetchreview@gmail.com',
	    subject: 'Message title',
	    text: 'Plaintext version of the message',
	    html: '<p>HTML version of the message</p>'
	};

	// Populate the Contact List dropdown
	var contactListSelect = $("#select-contact-list");
	// GET the contacts (clients for now)
	$.get("/api/fetch_client_data", function() {
		console.log("getting clients...");
	}).done(function(res){
		var selectOptions = "";
		// Dynamically add each options for the Contact List dropdown
		for(var i = 0; i < res.length; i++) {
			selectOptions += "<option value='" + JSON.stringify(res[i]) + "'>" + res[i].name + "</option>";
		}
		// Append the options to the contact list
		contactListSelect.html(selectOptions);
	});

	// Attach the event listener on form submit
	$("#email-send").on("submit", handleFormSubmit);

	// This handles the submission of the fetch review form
	function handleFormSubmit(event) {
		event.preventDefault();
		// Get the selected contact
		var to = JSON.parse(contactListSelect.val());
		// add 'to' property to the message
		data.to = to.email;

		// POST request sending the data which defines the mail content
		$.post("/api/send_email", data, function() {
			console.log("Sending email...");
		});
	}

});