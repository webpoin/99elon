<?php


	// 页面样式
	$css = array('css/global.css','css/other.css');


	// 页面js
	$js =  array('js/global.js');


	// 头部
	include 'tmp/header.htm';
?>



	<div style=" background: url(images/404_bkg.png) no-repeat top center;height: 540px;text-align: center;font-size: 14px;line-height: 24px;">
		<p style="padding-top:350px">您要找的资源可能已被删除，已更改名称或者暂时不可用。</p>
		<a href="/" style="color:#06609c">返回首页</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="" style="color:#f00;">刷新页面</a>
	</div>



<?php	
	// 底部
	include 'tmp/footer.htm';
?>