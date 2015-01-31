$(document).ready(function() {
  $("#total-results").hide();


	$("#searchButton").click(function() {
      $("#searchForm").submit(); 
	});

  	$("#searchForm").submit(function(e) {
  		// Fix sql injection threat;
  		var url = "https://api.sqoot.com/v2/deals?api_key=6vc2ns&query=" + $('#searchItem').val() + "&location=" + capitaliseFirstLetter($('#searchCity').val().toLowerCase());
  		console.log(url);

  		$.ajax({
  			type : "GET",
  			url : url,
  			dataType : "jsonp",
  			success : function(data) {
          $("#information").empty();
  				$("#no-results").slideUp("fast");

  				if (data.deals.length == 0) {
  					$("#no-results").slideDown("fast");
  					$("#information").slideUp("fast");
  					return;
  				}
  				$("#information").slideDown("fast");
          		var deals = data.deals;
              var info = data.query;
              $("#total-results").append(info.total);
              $("#total-results").slideDown("fast"); 

          		deals.forEach(function (deal) {

        			var finePrint;

        			if (deal.deal.fine_print != null) {
        				finePrint = deal.deal.fine_print.replace("/•/g", ". ");
        			}
            		console.log(deal);

            		$("#information").append("<div class='title'> \
            								  	<i class='dropdown icon'></i>" + 
            								  	deal.deal.title + 
            								 "</div> \
            								 <div class='content'> \
            								 	<div class='ui middle aligned grid'>" +
            								 		(deal.deal.description == null ? "" : "<div class='row'> \
            								 			<div class='column'> \
            								 				<p>" + deal.deal.description + "</p> \
            								 			</div> \
            								 		</div>") + 
            								 		"<div class='equal height row'> \
            								 			<div class='six wide column'> \
            								 				<img class='ui rounded image' src='" + deal.deal.image_url + "' /> \
            								 			</div> \
            								 			<div class='ten wide column'> \
												 			<table class='ui unstackable table'> \
												 				<thead> \
												 					<tr> \
												 						<th colspan='2'>Contact Information</th> \
												 					</tr> \
												 				</thead> \
												 				<tbody> \
												 					<tr> \
												 						<td class='collapsing'>Address</td> \
												 						<td> \
												 							<addr>" + 
												 								deal.deal.merchant.address + "<br>" + 
												 								deal.deal.merchant.locality + " " + deal.deal.merchant.region + ", " + deal.deal.merchant.country_code + "<br>" +
												 								deal.deal.merchant.postal_code + " \
												 							</addr> \
												 						</td> \
												 					</tr> \
												 					<tr> \
												 						<td class='collapsing'>Phone</td> \
												 						<td>" + deal.deal.merchant.phone_number + "</td>\
												 					</tr> \
												 				</tbody> \
												 			</table> \
												 		</div> \
            										</div>" + (deal.deal.fine_print == null ? "" :
            										"<div class='row'> \
            											<div class='column'> \
            												<i>" + deal.deal.fine_print + "</i> \
            											</div> \
            										</div>") +
            										"<div class='row'> \
            											<div class='column'> \
            								 				<div id='" + deal.deal.url + "' class='ui fluid teal button'>" + 
            								 					deal.deal.provider_name + " \
            								 				</div> \
            								 			</div> \
            								 		</div> \
            								 	</div> \
            								 </div>");

            		var link = document.getElementById(deal.deal.url);
            		link.addEventListener('click', function() {
              			newTab(deal.deal.url);
            		});
          		});

				$('html').css({ height : "auto" });
  			}
      	});
    	
      	return false;
  	});

  	$('.ui.accordion').accordion();

  	$('.title').click(function() {
  		$('html').css({ height : "auto" });
  	});

  	function newTab(url) {
    	chrome.tabs.create({ url: url });
  	}

  	function capitaliseFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}
});