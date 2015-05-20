// 表单插件
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define(["jquery"], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function($) {


	//插件直接写入jquery
	$.fn.extend({
		//下拉框功能及美化
        beautySelect: function(options){
        	var option = {'class':'select','height':200};
        	$.extend(option,options);

        	
        	var box = (function($,option){
        		var data;
        		//document.getElementById('test').innerHTML = option['class']
        		var old_box = $('.'+option['class']+'_box');
        		var box =  old_box.length> 0 ? old_box: $('<div/>').addClass(option['class']+'_box').css({'position':'absolute','display':'none'}).appendTo('body');
        		


        		//禁止选中文字
        		(!+[1,])? box.attr('unselectable','on') : box.css({'user-select': 'none'});


        		box.on('click','li',function(){
        			//console.log('fsefe');
        			var the = $(this);
        			var idx = the.parent().children('li').index(the);

    				if(!the.hasClass('hot') || (data.multiple && data.select.val().length != 1)){

    					//改变原控件
    					data.select.get(0).selectedIndex = idx;
			    		data.select.trigger("onchange");

    					//改变替换控件内容
    					//data.replace.children('span').html(the.html());
    					//data.replace.find('li').removeClass('hot').eq(idx).addClass('hot');

    					data.change = true;
    					
    				}

        		}).on('click','i',function(){

        			if(!data.multiple) return true;

        			
        			var the = $(this);
        			var li  = the.parent();
        			var list= li.parent().children('li');
        			var idx = list.index(li);

        			if(li.hasClass('hot')){
        				li.removeClass('hot');
        				//data.replace.find('li').eq(idx).removeClass('hot');
        				data.select.find('option').eq(idx).prop("selected",false);
        			}else{
        				li.addClass('hot');
        				//data.replace.find('li').eq(idx).addClass('hot');
        				data.select.find('option').eq(idx).prop("selected",true);
        			}


        			box.find('b').slideDown(500);
        			//data.replace.children('span').html(title.join(','));

        			data.change = true;
        			
        			return false;
        		});

        		$(document).on('click',function(){

        			if(data){
        				

        				if(data.change) {
        					data.select.trigger("change");
        					data.change = false;
        				}

        				data.replace.children('span').removeClass('hot');
        				box.hide();
        			}
        			
        		});

        		return {
        			value : function(val){box.html(val);
        			}
        			,show : function(d){
        				data = d,
        				data.change = false;
        				select = data.select,
        				replace= data.replace;
        				body = replace.children('div');

        				box.html('<div class="'+body.attr('class')+'">'+ body.html() +'</div>');

        				data.replace.children('span').addClass('hot');

        				box.css({
        					left:replace.offset().left
        					,top:replace.offset().top+replace.height()
        					,width:replace.innerWidth()
        					,'max-height':option['height']
        				});

        				box.show();

        				//禁止滚动
						//$(window).on('mousewheel',function(){return false;});
        			}
        			,hide : function(){box.hide();}
        		}

        		/**/
       	
        	})($,option);




        	return this.each(function(){

        		var replace,title,body,value
        			select 		= $(this),
        			multiple 	= !!select.attr('multiple');


        		//////////////创建
        		//如果隐藏，不执行后面，防止多次执行
				if(select.is(":visible") == false) return false;


				value =(function(select,multiple){
					var title = [],
						body  = [],
						item  = select.find('option'),
						i 	  =0,
						l     = item.length,
						each ,
						html  = '',
						selected = (multiple && select.val()) ? select.val().join('-') : (select.val() ? select.val():'');
							
					for(;i<l;i++){
						each = item.eq(i);
						html = each.html();
						if(selected.indexOf(each.val()) > -1 ){
							title.push(html);
							body.push('<li class="hot">');
						}else{
							body.push('<li>');
						}
						body.push('<i></i>')
						body.push(html);
						body.push('</li>');
					}

					
					if(!multiple){
						title = title[title.length-1];
					} else {
						title = title.join(',');
					}

					body = body.join('');

					return {title:title,body:body}
				})(select,multiple); 



				//新建替换元素
				replace = $('<div/>')
					.addClass(option['class'])
					.addClass(select.attr('name'))
					.css({
						 width:select.innerWidth()
						,height:select.innerHeight()
					});

				
			
				title = $('<span/>').html(value.title).on({
						click: function(e){
							var data = $(this).data();
							data.select.trigger('click');
							box.show({select:data.select,replace:data.replace,multiple:data.multiple});
					        return false;
						},
						//触发select 鼠标经过事件
						hover : function(){select.trigger('hover');}
					}).appendTo(replace).data({select:select,replace:replace,multiple:multiple});

				body = $('<div/>').html(function(){

					var wrap = [];
					if(multiple){
						wrap.push('<strong>全选/全不选</strong><ul>');
						wrap.push(value.body);
						wrap.push('</ul><b>确定</b>');
					}else{
						wrap.push('<ul>');
						wrap.push(value.body);
						wrap.push('</ul>');
					}
					return wrap.join('');

				}).addClass(function(){
					return multiple? option['class']+'_multiple': option['class']+'_radio';
				}).hide().appendTo(replace);

				

				select.on('change',function(){

					var the = $(this);
					var options = the.find('option');
					var replace = the.next('.select');

					var title=[];
					var body = [];

					//select.next('.select').children('div').html(html.replace(/option/g,'li'));

					//var list = replace.find('li');

					for(var i=0,v,l=options.length;i<l;i++){

						v = options.eq(i);
						if(v.prop('selected')){
							body.push('<li class="hot">');
							title.push(v.html());
						}else{
							body.push('<li>');
						}
						body.push(v.html());
						body.push('</li>');

					}

					replace.children('span').html(title.join(''));
					replace.children('div').html('<ul>'+body.join('')+'</ul>');

				});


				select.css('position','absolute').after(replace)
				/**/
        	});

        },
		formBeauty:function(opts){
			opts = jQuery.extend({}, opts || {});

			return this.each(function(){
				$(this).on({
					focus:function(){
						$(this).siblings('.form-holder').hide();
					},
					blur:function(){
						var the = $(this);
						if(the.val() == ""){
							the.siblings('.form-holder').show();
						}
					}
				},'input,textarea')
				//checkbox 美化
				.on('click','input[type="checkbox"]',function(){
					var the = $(this);
					if(the.prop('checked')){
						the.closest('.form-elem').addClass('form-checkbox_select');
					}else{
						the.closest('.form-elem').removeClass('form-checkbox_select');
					}
				})
				// 初始化
				.find('input,textarea').each(function(){
					var the = $(this);
					if(the.val()){
						the.siblings('.form-holder').hide();
					}
				}).end().find('input[type=checkbox]').each(function(){
					var the = $(this);
					if(the.prop('checked')){
						the.closest('.form-elem').addClass('form-checkbox_select');
					}else{
						the.closest('.form-elem').removeClass('form-checkbox_select');
					}
				})

				// 下拉菜单美化
				.end().find('select').beautySelect({'class':'select','height':300})

			});
		}
	});

    return $;
}));