
// 幻灯片插件 渐变
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
			// ul.find('li').eq(0).clone().appendTo(ul);

			//动画	
			var play = function(){
				idx ++;
				ul.stop();
				if(idx>=size){
					// ul.animate({left:-data[idx-1].left - data[idx-1].width},opts.speed,function(){ul.css('left',0);});
					idx = 0;
					ul.find('li').fadeOut(300).eq(idx).fadeIn(300);
					
				}else{
					ul.find('li').fadeOut(300).eq(idx).fadeIn(300);
					// ul.animate({left:-data[idx].left},opts.speed);
				}
				alt.html(data[idx].title);
				crl.removeClass('on').eq(idx).addClass('on');
			}


			$('.slides_btn').find('b').eq(0).on('click',function(){

				clearInterval(interval);

				idx -=2;
				if(idx <= -2){
					idx = size-2;
				}
				play();
				interval = setInterval(play,opts.interval);
				
			}).end().eq(1).on('click',function(){


				clearInterval(interval);
				play();
				interval = setInterval(play,opts.interval);

			})



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
	// body..
	$('.slides').slides();

	if($('.js-datepicker').length>0){
		$('.js-datepicker').datepicker({ //添加日期选择功能  
			numberOfMonths: 1, //显示几个月  
			showButtonPanel: true, //是否显示按钮面板  
			dateFormat: 'yy-mm-dd', //日期格式  
			clearText: "清除", //清除日期的按钮名称  
			closeText: "关闭", //关闭选择框的按钮名称  
			yearSuffix: '年', //年的后缀  
			showMonthAfterYear: true, //是否把月放在年的后面   
			monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
			dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
			dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
			dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
			onSelect: function(selectedDate) { //选择日期后执行的操作  
				// alert(selectedDate);  
			}
		}).datepicker('setDate',new Date());
		
	}
});

    
function CjData(date) {
	
	alert(date);
/*        $.ajax({
            type: "get",
            cache: false,
            url: "/information/injax/3/"+date,
            timeout: 10000,
            error: function() {
                alert('加载错误请稍后再试!');
            },
            success: function(msg) {
                $("#cj_data").html(msg);
            }
        });*/
}

