
// 幻灯片插件
$.fn.extend({
	slides: function(opts) {

		opts = jQuery.extend({name:'slides',speed:300,start:0,auto:true,interval:5000}, opts || {});//默认参数
		
		return this.each(function(){

			var data = [];


			var $this = $(this);
			$this.find('li').each(function(){
				var width,left,title, $this = $(this);
				
				if( !$this.attr('src')){
					title = $this.find('img').attr('alt');
				}else{
					title = $this.attr('alt');
					$('<a/>').attr('href',$this.attr('href')).html('<img src="'+$this.attr('src')+'" alt="'+title+'"/>').appendTo($this);
					$this.removeAttr('href src alt');
				}

				width = $this.width();
				left  = $this.position().left;

				data.push({left:left,width:width,title:title});
			
			});

			
			var idx = opts.start;
			var interval = false;
			var size = data.length;
			var ul =  $this.find('ul');

			var alt = $('<div/>').addClass(opts.name+'_alt').html(data[opts.start].title).appendTo($this);
			var crl = $('<div/>').addClass(opts.name+'_crl').html('123456789'.substr(0,size).replace(/(\d)/g,"<b>$1</b>")).appendTo($this).children('b').eq(opts.start).addClass('on').end();
			ul.find('li').eq(0).clone().appendTo(ul);

			//动画	
			var play = function(){
				idx ++;
				ul.stop();
				if(idx>=size){
					ul.animate({left:-data[idx-1].left - data[idx-1].width},opts.speed,function(){ul.css('left',0);});
					idx = 0;
					
				}else{
					ul.animate({left:-data[idx].left},opts.speed);
				}
				alt.html(data[idx].title);
				crl.removeClass('on').eq(idx).addClass('on');
			}

			if(opts.auto){
				interval = setInterval(play,opts.interval);
			}

			$this.on({mouseenter:function(){
				if(interval) clearInterval(interval);
			},mouseleave:function(){
				if(opts.auto) interval = setInterval(play,opts.interval);
			}});


			crl.on('mouseenter',function(){
				idx = crl.index($(this)) -1;
				play();
			})

		});
	}
});


$(document).ready(function () {

	// banner缓存
	$('.banner_slide').slides({name:'slide',interval:5000,speed:500});


	// 底部资源轮播
	$('.partners_scroll').marquee({
		time:3,
		distance:200,
		btnGo:{left:'.partners_left',right:'.partners_right'},
		direction:'left'
	});
	

	// $('.super_main').on({
	// 		mouseenter: function() {
	// 			var $p = $(this).find('p');
	// 			$p.stop();
	// 			$p.animate({
	// 				top: 0
	// 			}, 20);
	// 		},
	// 		mouseleave: function() {

	// 			var $p = $(this).find('p');
	// 			$p.stop();
	// 			$p.animate({
	// 				top: "100%"
	// 			}, 800);

	// 			// console.log('out')

	// 		}
	// 	},
	// 	'li');
});