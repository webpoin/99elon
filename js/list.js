$("#list_more").on("click",function(){
	var c_id = $("#category_id").val();
	var page = parseInt($("#page").val())+1;
	$.get("/information/injax/"+c_id+"/"+page,function(result){
		var obj = JSON.parse(result);
		$("#list li:last-child").after(obj.li);
		var newpage = page;
		$("#page").val(newpage);
		if(obj.status!=2){
			$("#list_more").html("<a href='#'>没有新闻了</a>");
		}
	},'text');
	return false;
});