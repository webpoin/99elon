$(document).ready(function () {
	
	var mt4_cnt = $('.mt4_cnt');
	var mt4_tle = $('.mt4_tle');

	mt4_tle.on('click','li',function(){

		var $this = $(this);
		var idx = $this.parent().find('li').index($this);

		$this.addClass('active').siblings('li').removeClass('active');

		mt4_cnt.hide().eq(idx).show();

	})



});