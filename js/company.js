

$(document).ready(function() {

	var prize = $('.prize');
	var prize_dis = prize.find('.prize_dis');


	prize.find('ul').movingBoxes({
		startPanel: 1, // start with this panel
		reducedSize: .5, // non-current panel size: 80% of panel size
		wrap: true, // if true, the panel will "wrap" (it really rewinds/fast forwards) at the ends
		buildNav: true, // if true, navigation links will be added
		navFormatter: function() {
			return "&#9679;";
		}, // function which returns the navigation text for each panel
		completed:function(){
			// console.log('sfefe');
			prize_dis.html(prize.find('li.current').find('cite').html());
		}
	});


	// 切换
	$('.intro').add('.license').add('.envir').on('mouseenter','li',function(){
		$(this).addClass('active').siblings('li').removeClass('active');
	});



	
	// 子导航
	var subnav = $('.subnav');
	var show_fixed = false;
	var speed = 200;


	var body = $('html, body');
	var item = $('.head_top').add('.intro').add('.license').add('.super').add('.envir').add('.prize').add('.friend').add('.foot');
	var item_val = [];
	var item_head = $('.subnav_inside').find('li');
	var item_side = $('.scroll').find('b');
	var win = $(window)
	var height = win.height();
	var event_timeout = false;
	var item_active = 0;
	var defult_mouse = window.onmousewheel || document.onmousewheel;

	body.animate({scrollTop:0},50); 
	item.each(function(){
		var $this = $(this);
		item_val.push({top:$this.offset().top,height:$this.height()});
	});



	var itemPrev = function(){
		item_active ++;
		if(item_active>item.length-1) { item_active = item.length -1; return;}
		item_head.eq(item_active-1).addClass('active').siblings().removeClass('active');
		item_side.eq(item_active-1).addClass('active').siblings().removeClass('active');
		body.animate({scrollTop:item.eq(item_active).offset().top - 277},500); 

	}
	var itemNext = function(){

		item_active --;
		if(item_active<0) { item_active = 0; return;}
		item_head.eq(item_active-1).addClass('active').siblings().removeClass('active');
		item_side.eq(item_active-1).addClass('active').siblings().removeClass('active');
		body.animate({scrollTop:item.eq(item_active).offset().top - 277},500); 
	}





	window.onmousewheel = document.onmousewheel = function(e){
		var dire;
		e = e ||window.event;
		if (e.wheelDelta) { //IE/Opera/Chrome 
			dire = e.wheelDelta;
		} else if (e.detail) { //Firefox 
			dire = e.detail;
		}


		// 文字太高修复，性能损失太大
		// if(dire<0 && (item_val[item_active].top + item_val[item_active].height - win.scrollTop() - height >0) ){
		// 	return;
		// }


		if(event_timeout){return false;}
		event_timeout = true;


		if (dire > 0) {
			itemNext();
		} else if (dire < 0) {
			itemPrev()
		}

		setTimeout(function(){event_timeout = false},200);
		return false;
	}

	item_head.on('click',function(){
		body.stop();
		$(this).addClass('active').siblings().removeClass('active');
		body.animate({scrollTop:item.eq( item_head.index($(this)) +1).offset().top - 277},500); 
	});

	item_side.on('mouseenter',function(){
		body.stop();
		$(this).addClass('active').siblings().removeClass('active');
		body.animate({scrollTop:item.eq( item_side.index($(this)) +1).offset().top - 277},500); 
	});

	

	$(window).scroll(function(e){

		var subnavtop = 548;
		var scrolltop =  $(window).scrollTop();
		

		if(scrolltop>=subnavtop && !show_fixed){
			subnav.addClass('subnav_fixed');
			subnav.find('ul').css('padding-top',0);
			subnav.find('ul').animate({'padding-top':30},speed);
			show_fixed = true;

		}else if(scrolltop<subnavtop && show_fixed){
			subnav.removeClass('subnav_fixed');
			subnav.find('ul').css('padding-top',500);
			subnav.find('ul').animate({'padding-top':300},speed);
			show_fixed = false;
		}

	});

})