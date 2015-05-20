$(document).ready(function () {
	

	$('.login').on('click','h2',function(){
		// console.log(1)
		$(this).closest('li').addClass('active').siblings('li').removeClass('active');

	});


	$('.login_erwei').on('mouseenter','img',function(){

		// console.log('sfef');
	});
	
	$('#getCode').on('click',function(){
		// console.log(1)
		//$(this).closest('li').addClass('active').siblings('li').removeClass('active');
		var phone = $("#phone").val();
	    $.post("/phonemsg",{"phone":phone},function(result){
	    	alert(result);
		  },"json");
			
	});

})