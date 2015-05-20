<?php

// 激活


// 页面样式
	$css = array('css/global.css','css/account.css');


	// 页面js
	$js =  array('js/global.js','js/form.js','js/account.js');




	// 头部
	include 'tmp/header.htm';


	// 主体
	echo  '<div class="center content">';
	include 'tmp/location.htm';

	// 成功
	include 'tmp/activate_email_success.htm';

	// 失败
	// include 'tmp/activate_email_false.htm';


	echo  '</div>';



	// 底部
	include 'tmp/footer.htm';




?>