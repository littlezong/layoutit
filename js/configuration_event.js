$(function(){
	
//	导航栏链接点击时变更类名
	$('#navbar ul').on('click','li a',function(){
		
		var lycn = $(this).attr('rel');
		
		if(lycn != null){
			$(this).parent().addClass('active').siblings().removeClass('active');
			$('body').removeClass().addClass(lycn);
		}
	});
	
//	左栏折叠面板显示隐藏
	$('.sidebar>li>a').click(function(){
		
		var icon = $(this).siblings('.glyphicon.pull-left');
		icon.toggleClass('glyphicon-plus').toggleClass('glyphicon-minus');
		
	});
	
//	样式设置，变换相对应类名
	var ui_pf = $('.ui-platform');
	ui_pf.on('click','.configuration .dropdown-menu a',function(){

		$(this).parent().addClass('active').siblings().removeClass('active');
		
		if($(this).parent().is('.active')){
			
			var cn = $(this).attr('rel');
			var sb = $(this).parent().siblings();
			
			for(var i=0;i<sb.length;i++){
				var x = sb.eq(i).children().attr('rel');
				$(this).parents('.configuration').siblings('.view').children().removeClass(x);
			}
			
			$(this).parents('.configuration').siblings('.view').children().addClass(cn);
		}
	});
	
//	基本样式中链接地址编辑事件
//	$('.ui-platform').on('click','.configuration .edit-link',function(){
//		
//		$(this).siblings('input').css('visibility','visible');
//	
//	});
	$('.ui-platform').on('click','.configuration input[type=button]',function(){
		
		var url = $(this).siblings('input[type=url]').val();
		
		$(this).parent().siblings('.view').children('a').attr('href',url);
		$(this).css('visibility','hidden');
		$(this).siblings('input[type=url]').css('visibility','hidden');
	});
	
//	商品列表增减列
	$('.ui-platform').on('click','.configuration .btn',function(){
		var dateCon = $(this).attr('data-btn');
		var fcon = $(this).parent().siblings('.view').children();
		switch (dateCon){
			
//			基本样式链接编辑可见
			case 'edit-link':
				$(this).siblings('input').css('visibility','visible');
				break;
				
//			添加一行媒体列表
			case 'addRow':
				if(fcon.length<5){
					fcon.eq(0).clone().appendTo(fcon.parent());
				}
				break;
//			减少一行媒体列表
			case 'decRow':
				if(fcon.length>1){
					fcon.parent().find('>div:last').remove();
				}
				break;
			
//			添加一列商品列表
			case 'addCol':
				if(fcon.children().length<5){
					fcon.children().eq(0).clone().appendTo(fcon);
				}
				break;
//			减少一列商品列表
			case 'decCol':
				if(fcon.children().length>=2){
					fcon.find('>li:last').remove();
				}
				break;
			
			default:
				break;
		}
	})
});
