$.fn.marquee=function(a){var b=$.extend({},$.fn.marquee.defaults,a);return this.each(function(){var K=$(this);var r=K.get(0);var A=K.width();var g=K.height();var v=K.children();var G=v.children();var h=0;var F=(b.direction=="left"||b.direction=="right")?1:0;var w,f,y,l;var s,L,J,I,H;var k,M;var z,N;var B=[];var n=0;var u=0;var o=0;v.css(F?"width":"height",10000);var E="<ul>";if(b.isEqual){k=G[F?"outerWidth":"outerHeight"]();M=G.length;h=k*M;for(var D=0;D<M;D++){B.push(D*k);E+="<li>"+(D+1)+"</li>"}}else{G.each(function(c){B.push(h);h+=$(this)[F?"outerWidth":"outerHeight"]();E+="<li>"+(c+1)+"</li>"})}E+="</ul>";if(h<(F?A:g)){return}v.append(G.clone()).css(F?"width":"height",h*2);if(b.navId){z=$(b.navId).append(E).hover(x,m);N=$("li",z);N.each(function(c){$(this).bind(b.eventNav,function(){if(y){return}if(n==c){return}j(B[c]);N.eq(n).removeClass("navOn");n=c;$(this).addClass("navOn")})});N.eq(n).addClass("navOn")}if(b.direction=="right"||b.direction=="down"){r[F?"scrollLeft":"scrollTop"]=h}else{r[F?"scrollLeft":"scrollTop"]=0}if(b.isMarquee){l=setTimeout(C,b.scrollDelay);K.hover(function(){clearInterval(l)},function(){clearInterval(l);l=setTimeout(C,b.scrollDelay)});if(b.controlBtn){$.each(b.controlBtn,function(c,d){$(d).bind(b.eventA,function(){b.direction=c;b.oldAmount=b.scrollAmount;b.scrollAmount=b.newAmount}).bind(b.eventB,function(){b.scrollAmount=b.oldAmount})})}}else{if(b.isAuto){m();K.hover(x,m)}if(b.btnGo){$.each(b.btnGo,function(c,d){$(d).bind(b.eventGo,function(){if(y==true){return}b.direction=c;j();if(b.isAuto){x();m()}})})}}function C(){var d=(b.direction=="left"||b.direction=="right")?"scrollLeft":"scrollTop";if(b.isMarquee){if(b.loop>0){o+=b.scrollAmount;if(o>h*b.loop){r[d]=0;return clearInterval(l)}}var c=r[d]+(b.direction=="left"||b.direction=="up"?1:-1)*b.scrollAmount}else{if(b.duration){if(s++<I){y=true;var c=Math.ceil(q(s,L,J,I));if(s==I){c=H}}else{c=H;clearInterval(w);y=false;return}}else{var c=H;clearInterval(w)}}if(b.direction=="left"||b.direction=="up"){if(c>=h){c-=h}}else{if(c<=0){c+=h}}r[d]=c;if(b.isMarquee){l=setTimeout(C,b.scrollDelay)}else{if(s<I){if(w){clearTimeout(w)}w=setTimeout(C,b.scrollDelay)}else{y=false}}}function j(e){y=true;var i=(b.direction=="left"||b.direction=="right")?"scrollLeft":"scrollTop";var d=b.direction=="left"||b.direction=="up"?1:-1;u=u+d;if(e==undefined&&b.navId){N.eq(n).removeClass("navOn");n+=d;if(n>=M){n=0}else{if(n<0){n=M-1}}N.eq(n).addClass("navOn");u=n}var c=u<0?h:0;s=0;L=r[i];H=(e!=undefined)?e:c+(b.distance*u)%h;if(d==1){if(H>L){J=H-L}else{J=H+h-L}}else{if(H>L){J=H-h-L}else{J=H-L}}I=b.duration;if(w){clearTimeout(w)}w=setTimeout(C,b.scrollDelay)}function m(){f=setInterval(function(){j()},b.time*1000)}function x(){clearInterval(f)}function q(i,e,P,O){return -P*(i/=O)*(i-2)+e}function p(i,e,P,O){return P*((i=i/O-1)*i*i*i*i+1)+e}})};
$.fn.marquee.setDefaults=function(a){$.extend($.fn.marquee.defaults,a)};
$.fn.marquee.defaults = {
	isMarquee: false, //是否为Marquee
	isEqual: true, //所有滚动的元素长宽是否相等,true,false
	loop: 0, //循环滚动次数，0时无限
	newAmount: 3, //加速滚动的步长
	eventA: 'mousedown', //鼠标事件，加速
	eventB: 'mouseup', //鼠标事件，原速
	isAuto: true, //是否自动轮换
	time: 5, //停顿时间，单位为秒
	duration: 50, //缓动效果，单次移动时间，越小速度越快，为0时无缓动效果
	eventGo: 'click', //鼠标事件，向前向后走
	direction: 'left', //滚动方向，'left','right','up','down'
	scrollAmount: 1, //步长
	scrollDelay: 10, //时长
	eventNav: 'click' //导航事件
};

