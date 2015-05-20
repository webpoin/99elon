<?php

	// 页面样式
	$css = array('css/global.css','css/personal.css');


	// 页面js
	$js =  array('js/global.js','js/form.js','js/personal.js');



	// 头部
	include 'tmp/header.htm';


	// 主体
	echo  '<div class="center content"><div class="main">';

	include 'tmp/location.htm';
	include 'tmp/personal_withdrawal.htm';



	// 侧边
	echo  '</div><div class="side">';
	include 'tmp/personal_side.htm';



	echo  '</div></div>';

	// 底部
	include 'tmp/footer.htm';



?>