

	
	


// 表单插件
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define(["jquery"], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {

	//插件直接写入jquery
	$.fn.extend({
		formCheck:function(opts){
			opts = jQuery.extend({
				success:function(the){},
				failure:function(the){}
			}, opts || {});

			var the,msg,res={success:false,failure:false};
			var rule = {
				required:function(){
					return the.val() ?  [true,''] : [false,'不能为空'];
				},
				phone:function(){
					if(the.val() == ''){return [false,'手机号码不能为空'];}
					return /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(the.val()) ? [true,'']:[false,'手机号码格式错误'];
				},
				password:function(){
					var l = the.val().length;
					if(l<1){
						return [false,'不能为空'];
					}else if(l<6){
						return [false,'密码长度不能少于6个字符']
					}else if(l>16){
						return [false,'密码长度不能大于16字符']
					}else{
						return [true,''];
					}
				},
				checked:function(){
					return the.prop('checked') ? [true,''] : [false,'未选中'];
				}
			}

			var success = function(val){
				the.closest('.form-elem').removeClass('form-error').addClass('form-success').siblings('.form-note').html(val);
				opts.success(the);
				return true;
			}
			var failure = function(val){
				the.closest('.form-elem').removeClass('form-success').addClass('form-error').siblings('.form-note').html(val);
				opts.failure(the);
				return false;
			}
			var check = function(item){
				the = item;
				var name = the.attr('class').match(/\bjs-check-(\w+)\b/)[1];

				if(rule[name]){
					var checked = rule[name]();
					return checked[0] ? success(checked[1]) : failure(checked[1]);
				}
				return true;
			}
			this.each(function(){
				var the = $(this);
				if(check(the)){
					res.success = res.success ? res.success.add(the) : the;
					//res.success.add(the);
				}else{
					res.failure = res.failure ? res.failure.add(the) : the;
					//res.failure.add(the);
				}
			});
			return res;
		},

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
        			// multiple 	= false;


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
        cxSelect: function(settings){

			// 默认值
			var cxSelect = {
				settings: $.extend({
					selects: [], // 下拉选框组
					url: null, // 列表数据文件路径（josn 格式）
					nodata: null, // 无数据状态
					required: true // 是否为必选
					//	firstTitle : '请选择',	// 下拉选框的标题
					//	firstValue : '0'		// 下拉选框的值
				}, settings),
				dom: {
					box: this
				}
			};
			
			cxSelect.init = function(){
				var _this = this;

				// 父容器不存在、未设置选择器组
				if (!_this.dom.box.length) {return};
				if (!_this.settings.selects.length) {return};
				
				_this.selectArray = [];
				_this.selectSum = _this.settings.selects.length;
				
				for (var i = 0; i < _this.selectSum; i++) {
					if (!_this.dom.box.find('select.' + _this.settings.selects[i])) {break};

					_this.selectArray.push(_this.dom.box.find('select.' + _this.settings.selects[i]));
				};

				_this.selectSum = _this.selectArray.length;

				// 设置的选择器组不存在
				if (!_this.selectSum) {return};

				// 设置 URL，通过 Ajax 获取数据
				if (typeof _this.settings.url === 'string') {
					$.getJSON(_this.settings.url, function(json){
						_this.dataJson = json;
						_this.buildContent();
					});

				// 设置自定义数据
				} else if (typeof _this.settings.url === 'object') {
					_this.dataJson = _this.settings.url;
					_this.buildContent();
				};
			};

			// 兼容旧浏览器的方法 
			cxSelect.isArray = function(value){
				if (typeof Array.isArray === "function") {
					return Array.isArray(value);
				} else {
					return Object.prototype.toString.call(value) === "[object Array]";
				}
			}

			cxSelect.getIndex = function(n){
				return (this.settings.required) ? n : n - 1;
			};

			// 获取下拉框内容
			cxSelect.getNewOptions = function(elemJquery, json){
				var _title = this.settings.firstTitle;
				var _value = this.settings.firstValue;
				var _html;
				
				if (typeof elemJquery.data('firstTitle') === 'string' || typeof elemJquery.data('firstTitle') === 'number') {
					_title = elemJquery.data('firstTitle');
				};
				if (typeof elemJquery.data('firstValue') === 'string' || typeof elemJquery.data('firstValue') === 'number') {
					_value = elemJquery.data('firstValue');
				};
				if(!this.settings.required){
					_html='<option value="' + _value + '">' + _title + '</option>';
				};

				$.each(json, function(i, v){
					if(typeof(v.v) === 'string' || typeof(v.v) === 'number'){
						_html += '<option value="'+v.v+'">' + v.n + '</option>';
					}else{
						_html += '<option value="'+v.n+'">' + v.n + '</option>';
					};
				});

				return _html;
			};

			// 构建选框内容
			cxSelect.buildContent = function(){
				var _this = this;

				_this.dom.box.on('change', 'select', function(){
					_this.selectChange(this.className);
				});

				var _html = _this.getNewOptions(_this.selectArray[0], _this.dataJson);
				_this.selectArray[0].html(_html).prop('disabled', false).trigger('change');

				_this.setDefaultValue();
			};

			// 设置默认值
			cxSelect.setDefaultValue = function(n){
				var _this = this;
				n = n || 0;

				if (n >= _this.selectSum) {return};

				if (_this.selectArray[n].data('value') && _this.selectArray[n].data('value').length) {
				
					setTimeout(function(){
						_this.selectArray[n].val(_this.selectArray[n].find('option').filter(function () { return $(this).html() == _this.selectArray[n].data('value'); }).val()).trigger('change');
						n++;
						_this.setDefaultValue(n);
					}, 1);
				};
			};

			// 改变选择时的处理
			cxSelect.selectChange = function(name){
				name = name.replace(/ /g,',');
				name = ',' + name + ',';

				var selectValues=[];
				var selectIndex;
				var selectNext;
				var selectData;
				var _html;

				// 获取当前 select 位置、选择值，并清空后面的 select
				for (var i = 0; i < this.selectSum; i++) {
					selectValues.push(this.getIndex(this.selectArray[i].get(0).selectedIndex));

					// if (typeof selectIndex === 'number' && i > selectIndex) {
					// 	this.selectArray[i].empty().prop('disabled', true);

					// 	if (this.settings.nodata === 'none') {
					// 		this.selectArray[i].css('display', 'none');
					// 	} else if(this.settings.nodata === 'hidden') {
					// 		this.selectArray[i].css('visibility', 'hidden');
					// 	};
					// };

					if (name.indexOf(',' + this.settings.selects[i] + ',') > -1) {
						selectIndex = i;
					};
				};

				// 获取下级的列表数据
				selectNext = selectIndex + 1;
				selectData = this.dataJson;

				for (var i = 0; i < selectNext; i++){
					if (typeof selectData[selectValues[i]]  === 'undefined' || this.isArray(selectData[selectValues[i]].s) === false || !selectData[selectValues[i]].s.length) {
						return;
					};
					selectData = selectData[selectValues[i]].s;
				};

				// 遍历数据写入下拉选框
				if (this.selectArray[selectNext]) {
					_html = this.getNewOptions(this.selectArray[selectNext], selectData);
					//this.selectArray[selectNext].html(_html).prop('disabled', false).css({'display':'', 'visibility':''}).trigger('change');
					this.selectArray[selectNext].html(_html).prop('disabled', false).trigger('change');
				};
			};
			
			cxSelect.init();
		},

        uploadPreview: function(opts) {
			// var _self = this,
			// 	_this = $(this);
			opts = jQuery.extend({
				ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
				Callback: function() {}
			}, opts || {});

			var getUrl = (function(){
				if (window.createObjectURL != undefined) {
					return function(file){return window.createObjectURL(file);}
				} else if (window.URL != undefined) {
					return function(file){return  window.URL.createObjectURL(file);}
				} else if (window.webkitURL != undefined) {
					return function(file){return window.webkitURL.createObjectURL(file);}
				}
			})();


			return this.on('change',function(){
				var $this = $(this);
				if (this.value) {
					if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
						alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
						this.value = "";
						return false;
					}

					try {
						$this.siblings('div').children('img').attr('src', getUrl(this.files[0]));
					} catch (e) {
						var src = "";
						$this.select();
						if (top != self) {
							window.parent.document.body.focus()
						} else {
							$this.blur()
						}
						src = document.selection.createRange().text;
						document.selection.empty();

						$this.siblings('div').css('filter','progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+src+'",sizingMethod=scale)').children('img').hide();

					}
					$this.siblings('em').hide();
					opts.Callback();
				}

			}).each(function(){
				var $this = $(this);
				if( !/icon_form_upload/.test($this.siblings('div').children('img').attr('src'))){
					$this.siblings('em').addClass('form_upload_mark');
				}

			})
		},

		formBeauty:function(opts){
			opts = jQuery.extend({}, opts || {});

			var event = {
				text: function () {
					if(this.value.length>0){
						$(this).siblings('em').hide();
					}else{
						$(this).siblings('em').show();
					}
				},
				checkbox:function(){
					var $this = $(this);
					if($this.prop('checked')){
						$this.addClass('select');
					}else{
						$this.removeClass('select');
					}

				},
				radio:function(){
					var $this = $(this);
					if($this.prop('checked')){
						$this.addClass('select').closest('form').find('input[type="radio"]').filter('[name="'+$this.attr('name')+'"]').not($this).removeClass('select');
					}
				},
				file:function(){
					var $this = $(this);
					if($this.val()){
						$this.siblings('div').find('img').attr('src',$this.val());
					}

				}
			}


			// 初始化
			this.find('input[type="text"]').each(event.text);
			this.find('input[type="password"]').each(event.text);
			this.find('input[type="radio"]').each(event.radio);
			this.find('input[type="checkbox"]').each(event.checkbox);
			this.find('input[type="file"]').uploadPreview();
			this.find('select').beautySelect({'class':'select','height':300});


			// 文本
			this.on('blur','input[type="text"]',event.text);
			this.on('focus','input[type="text"]',function(){$(this).siblings('em').hide();});

			// 文本域
			this.on('blur','textarea',event.text);
			this.on('focus','textarea',function(){$(this).siblings('em').hide();});

			// 密码
			this.on('blur','input[type="password"]',event.text);
			this.on('focus','input[type="password"]',function(){$(this).siblings('em').hide();});



			// 单选
			this.on('click','input[type="radio"]',event.radio);

			// 复选
			this.on('click','input[type="checkbox"]',event.checkbox);
		}
	});


    return $;
}));


$(document).ready(function () {
	$('.js-form').formBeauty();
})

