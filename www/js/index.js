$(document).ready(function () {



	
	var head = $('.head');
	var head_fixed = head.children('div');
	
	var top = head.offset().top +head.height()-66;
	var show_fixed = false;
	var speed = 200;


	$('.head_search').on('mouseenter',function(){

		var $this = $(this);

		if($this.closest('.head_fixed').length>0){
			// console.log('yes');
			$this.stop();
			$this.animate({width:240},speed);

		}else{
			console.log('no')
		}

	}).on('mouseleave',function(){

		var $this = $(this);

		if($this.closest('.head_fixed').length>0){
			$this.stop();
			$this.animate({width:26},speed,function(){
				$this.removeAttr('style');
			});

		}
	})



	$(window).scroll(function(){

		if($(window).scrollTop()>top ){
			if(show_fixed) return;
			head_fixed.addClass('head_fixed');
			show_fixed = true;

		}else{
			if(!show_fixed) return;
			head_fixed.removeClass('head_fixed');

			show_fixed = false;
		}

	})





	



});