$(document).ready(function(){
	$('#plus-set').click(function(){
		$('#full-ajax').css('transform', 'translateY(-0%)');
	});
	/*
	$('.set').click(function(){
		$('.tile, #site-id').css('opacity', '0.2');
		$(this).css({'opacity': '1', 'z-index': '300'});
		$('.fab' + $(this).data('id')).css({'opacity': '1', 'z-index': '300'});
	});
	*/
	$('.set').click(function(){
		$('.game-screen').css('transform', 'translateY(-0%)');
	});
	
	$('.viewport-x').on('click', function(){
		$('#' + $(this).data('viewname')).css('transform', 'translateY(100%)');
	});
});