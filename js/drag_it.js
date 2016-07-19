$(function(){
//	缓存布局
	var storage = window.localStorage;
	$('.ui-platform').html(storage.getItem('ly_save'));
	
//	标记拖曳状态
	var dragging = redragging = false;
	
	var x = $('.container-fluid').width()-$('.ui-platform').width()/10;
	
	var con; // 用于记录父容器
	
//  当前移动到目标上的索引、偏移高度、目标高度
	var c_index, c_posTop, c_halfH;
	
//	左栏鼠标左击拖动时克隆元素并初始化坐标
	$(".widget-bar .draggable .drag").mousedown(function(e){
		
		dragging = true;
		
	    $(this).parent('.draggable').clone().addClass("clone").appendTo($("body"));

//		单击拖动时插入虚线框
		$('<div class="dashBox"></div>').appendTo($('.ui-platform'));
		
	    $("body").css('cursor','move');
	    
	    $(".clone").css({'left':e.pageX-$('.clone').width(),'top':e.pageY});
	    
	    return false;
	});
	
//	绑定右栏鼠标左击拖动事件
	$('.ui-platform').on('mousedown','.draggable .drag',function(e){
		
		redragging=true;
		
//		当前拖曳对象所在容器
		con = $(this).parent('.draggable').parent();
		
//		单击拖动时插入虚线框
		$('<div class="dashBox"></div>').insertBefore($(this).parent());
		
		$(this).parent('.draggable').addClass('redragging').appendTo('.ui-platform').css({'left':e.pageX-x,'top':e.pageY-50});
		
		$("body").css('cursor','move');
		
		return false;
	});
	
	$('.ui-platform').on('mousemove','.draggable',function(){
		
		c_index = $(this).index();
		
//		拖曳到目标上时目标的纵轴偏移量及高度
		c_posTop = $(this).position().top;
		c_halfH = $(this).outerHeight();
		
	});
	
	$('.ui-platform').on('mousemove',function(e){
		
		var e= e||window.event;
		
		var c_obj = $('.ui-platform .draggable');
//		alert(c_obj.length)
//		获取鼠标在当前容器中的位置
		var cy = e.pageY - $('.ui-platform').offset().top;
		
		var c_top = c_posTop + c_halfH;
		
		if($('.clone').length>0&&dragging&&$('.clone').is('.nessesary')){
			if(cy <= c_posTop+1){
				$('.dashBox').insertBefore(c_obj.eq(c_index));
			}else if(cy >= c_top+1){
				$('.dashBox').insertAfter(c_obj.eq(c_index));
			}else{
//				$('.dashBox').appendTo();
			}
		}else if(redragging&&$('.redragging').is('.nessesary')){
			if(cy <= c_posTop+1){
				$('.dashBox').insertBefore(c_obj.eq(c_index));
			}else if(cy >= c_top+1){
				$('.dashBox').insertAfter(c_obj.eq(c_index));
			}else{
//				$('.dashBox').css('display','none');
			}
		}
	});
	
	$('.ui-platform').on('mousemove','.column',function(e){
		
		var e = e||window.event;
		var col_top = e.pageY - $(this).offset().top;
		var col_child = $(this).children();
		
		if($('.clone').length>0&&dragging){
			
			$('.dashBox').appendTo($(this));
			if(col_child.length<0){
				$('.dashBox').appendTo($(this));
			}
//			else{
//				col_child.each(function(){
//					var ind = $(this).index();
////					var ind_top = $(this).position().top;
////					var ind_H = $(this).outerHeight();
//					if(col_top<=c_posTop){
//						$('.dashBox').insertBefore($(this));
//					}else if(col_top>=c_posTop+c_halfH){
//						$('.dashBox').insertAfter($(this));
//					}
//				})
//			}
			
		}else if(redragging){
			
			$('.dashBox').appendTo($(this));
			if(col_child.length<0){
				$('.dashBox').appendTo($(this));
			}
//			else{
//				col_child.each(function(){
//					var ind = $(this).index();
//					var ind_top = $(this).position().top;
//					var ind_H = $(this).outerHeight();
//					if(col_top<=ind_top){
//						$('.dashBox').insertBefore($(this));
//					}else if(col_top>ind_top+ind_H){
//						$('.dashBox').insertAfter($(this));
//					}
//				})
//			}
		}
		
	});
	
//	在右栏释放左键时
	$('.ui-platform').mouseup(function(e){
		if($('.clone').length>0&&dragging){
			dragging=false;
			if($('.clone').is('.nessesary')){
//				$('.clone').appendTo($('.ui-platform')).css({'left':0,'top':0}).removeClass('clone');
				$('.clone').insertAfter('.dashBox').css({'left':0,'top':0}).removeClass('clone');
			}else{
				$('.clone').remove();
			}
		}else if(redragging){
			redragging=false;
			
//			右栏拖曳时，确保基本样式和组件嵌入布局设置中
			if($('.redragging').is('.nessesary')){
//				$('.redragging').appendTo($(this)).css({'left':0,'top':0}).removeClass('redragging');
				$('.redragging').insertAfter($('.dashBox')).css({'left':0,'top':0}).removeClass('redragging');
			}else{
				$('.redragging').appendTo(con).css({'left':0,'top':0}).removeClass('redragging');
			}
			
		}
		
	});
	
	
	
//	在右栏column元素下释放左键时
	$('.ui-platform').on('mouseup','.nessesary .column',function(e){
		if($('.clone').length>0&&dragging){
			dragging=false;
			$('.clone').appendTo($(this)).css({'left':0,'top':0}).removeClass('clone');
		}else if(redragging){
			redragging=false;
			$('.redragging').appendTo($(this)).css({'left':0,'top':0}).removeClass('redragging');
		}
		
	});
	
//	克隆对象移动时坐标、在文档中释放左键时
	$(document).mousemove(function(e){
		var e = e||window.event;

	    if($(".clone").length>0&&dragging)
	    {
	        $(".clone").css({'left':e.pageX-$('.clone').width(),'top':e.pageY});
	        return false;
	    }else if(redragging){
	   		$('.redragging').css({'left':e.pageX-x,'top':e.pageY-50});
	   		return false;
	    }
	}).mouseup(function(e){
		if($('.clone').length>0&&dragging){
			dragging=false;
			$('.clone').remove();
		}else if(redragging){
			redragging=false;
			
//			拖曳元素嵌入原来位置
			$('.redragging').appendTo(con).css({'left':0,'top':0}).removeClass('redragging');
		}
		
//		移除虚线框
		$('.dashBox').remove();
		
		$("body").css('cursor','auto');
		
//		初始化轮播图
		$('.carousel').carousel();
		$('.left.carousel-control').click(function(){
			$('.carousel').carousel('prev');
		});
		$('.right.carousel-control').click(function(){
			$('.carousel').carousel('next');
		});
		
//		初始化标签切换页并增加相对应的id、href属性
		var tabs = $('.ui-platform .tab-content .tab-pane');
		var links = $('.ui-platform .tabbable a');
		for(var i=0;i<tabs.length;i++){
			links.eq(i).attr('href','#tab'+i);
			tabs.eq(i).attr('id','tab'+i);
		}
		$('.tabbable a').click(function(e){
			e.preventDefault();
			$(this).tab('show');
		});
		
		ly_all = $('.ui-platform').html();
		//	设置缓存内容
		storage.setItem('ly_save',ly_all);
	});
	
//	右栏移除按钮
	$('.ui-platform').on('click','.draggable .remove',function(){
		$(this).parent('.draggable').remove();
		ly_all = $('.ui-platform').html();
		//	设置缓存内容
		storage.setItem('ly_save',ly_all);
	});
	
//	清空
	$('#clearLayout').click(function(){
		if(confirm('确认清空所有布局？')){
			$('.ui-platform').html('');
			storage.clear();
		}
	});
});
