
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
	
	// 侧面分组
	$('.group').find('dl').each(function(){

		var $this = $(this);

		if($(this).children('dd').length<=0){
			return;
		}

		var height = $this.height();

		$this.on('click','dt',function(){

			var dl =  $(this).closest('dl');
			dl.stop();

			if(dl.height() ===45){
				dl.animate({height:height},100);
			}else{
				dl.animate({height:45},100);
			}

			return false;
		});

	});


	/***个人中心首页**/
	// 资料完善度
	setTimeout(function(){

		var $this = $('.massage_scale')
		var val =  parseInt($this.find('strong').html()) ||0;
		$this.find('cite i').html(val+'%');
		$this.find('cite>b').animate({width:val+'%'},600);
	},1);



	// 幻灯片
	$('.slide').slides({name:'slide',interval:2000,speed:500});
	



	// 我的订阅
	/*$('.subscribe').find('h2 a').on('click',function(){

		var $this = $(this);
		var type  = $this.attr("value");
		// 向后台发送取消订阅事件
		$.ajax({
			type: "POST",
			url: "/ajax/"+type,
			data:{type: "subscribe",event:'cancel',data: 'all'},
			dataType:'json',
			success:function(json){
				// 200 成功
				alert("成功");
				$this.val("取消订阅");
				if(json.status === 200){
					alert("成功");
					// 删除ul节点
					//$this.closest('.subscribe').find('ul').remove();

				}
			}
		});
		return false;
	}).end().find('ul').on('click','i',function(){

		var $this = $(this);

		// 你确定删除？？
		if(!window.confirm('您确定删除该订阅吗？')){
			return false;
		}

		// 向后台发送取消订阅事件
		$.ajax({
			type: "POST",
			url: "ajax.php",
			data:{type: "subscribe",event:'cancel',data: 'item'},
			dataType:'json',
			success:function(json){

				// 200 成功
				if(json.status === 200){

					// 文字改变
					// 删除ul节点
					$this.closest('li').remove();

				}
			}
		});

		return false;
	});*/
	// 我的订阅
	$('.subscribe_form').find('input').on('click',function(){
		var $this = $(this);
		var type  = $this.attr("typeid");
		// 向后台发送取消订阅事件
		$.ajax({
			type: "POST",
			url: "/ajax/"+type,
			data:{type: "subscribe",event:'cancel',data: 'all'},
			dataType:'json',
			success:function(json){
				// 200 成功
				if(type==3){
					alert("订阅成功！更新资料会第一时间发到您的邮箱，请注意查收。");
					$this.val("取消订阅");
					$this.attr("typeid",2);
				}else{
					alert("取消订阅成功！");
					$this.val("订阅");
					$this.attr("typeid",3);
				}
				
				/*if(json.status === 200){
					alert("成功");
					// 删除ul节点
					//$this.closest('.subscribe').find('ul').remove();

				}*/
			}
		});
		return false;
	});
	$("#MsgForm").on("submit",function(){
		var $this = $(this);
		var data = $this.serializeArray();
		var type =data['0']['value'];
		var Msg =data['1']['value'];
		$.post("/ajax/1",{type:type,Msg:Msg},function(result){
			if(result==1){alert("留言成功");}
			else{alert("留言失败");}
		});
		return false;
	});
	
	
	


	/****活动页*****/
	// 时间轴
	$('.timeline').find('h2').on('change','input',function(){

		console.log('sfefe');

		var $this = $(this);
		if($this.prop("checked")){
			$this.closest('.timeline').find('.expired').hide();
		}else{
			$this.closest('.timeline').find('.expired').show();
		}
	});




	/******基本信息页*****/
	$('.js-form-uploadpic').each(function(){
		var the = $(this);
		var img = the.find('img')
		var imgid = img.attr('id');
		var input = the.find('input');

		var label = the.find('label');
		$(this).find('input[type="file"]').uploadPreview({ Img:$(this).find('div')});

		// $('#'+input.attr('id')).uploadPreview({ Img:imgid, Width: 120, Height: 120 });

	});









})