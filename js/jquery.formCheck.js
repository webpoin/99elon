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
		}
	});

    return $;
}));