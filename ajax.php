<?php

	// 异步请求示例


	function get($key)
	{
		return empty($_GET[$key]) ? empty($_POST[$key]) ?  null  : $_POST[$key] : $_GET[$key];
	}



	/**********************		个人中心 	************************/
	// 我的订阅
	if(get('type') == 'subscribe'){

		$res->status = 200;
		$res->type = 'success';
		$res->data = '好多字啊好多字';
		echo json_encode($res);
	}
	/***	end 个人中心 	***/



	echo 'fuck';

?>