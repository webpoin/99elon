<?php


// 页面样式
	$css = array('css/global.css','css/common.css','css/mt4.css');


	// 页面js
	$js =  array('js/global.js');




	// 头部
	include 'tmp/header.htm';

	// 主体
	echo '<div class="center content"><div class="main">';

	include 'tmp/mt4_intro.htm';


	// 侧边栏
	echo '</div><div class="side">';

	include 'tmp/side_group.htm';
	include 'tmp/side_ad.htm';
	include 'tmp/side_service.htm';
	include 'tmp/side_newgit.htm';


	// 闭合
	echo '</div></div>';

	// 底部
	include 'tmp/footer.htm';




?>