
var s = navigator.userAgent.toLowerCase().match(/msie ([\d.0]+?)/)[1] || 6;

if(parseInt(s) <8){

	document.write('<div style="position: absolute;width: 500px; left:50%;top: 50%; margin-left: -250px;margin-top: -200px;"><h5>您的浏览器版本过低，为了保证我们的服务质量，请升级您的浏览器。</h5><br/>');
	document.write('您的浏览器内核版本为：Microsoft Internet Explorer '+s+'.0,建议升级为：<br/>');
	document.write('<a href="http://www.microsoft.com/zh-cn/download/internet-explorer-8-details.aspx">Microsoft Internet Explorer8.0</a><br/>');
	document.write('<a href="http://dlc2.pconline.com.cn/filedown_51614_6936517/Or4hW331/Chrome_setup_chs.exe">谷歌chrome浏览器</a><br/>');
	document.write('<a href="http://chrome.360.cn/">360极速浏览器</a><br/>');
	document.write('<a href="http://www.firefox.com.cn/download/">火狐firefox浏览器</a></div>');

	document.execCommand("stop");
}



