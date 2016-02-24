;(function($){
	var a_width=window.innerWidth;
	if(a_width<=360){
		column =1;
			c_width=a_width-40;
			column_space=0;
	}else if(a_width <= 960){
		column =2;
		c_width=(a_width-80)/2;
	}else{
		c_width=250;
	}
	

   var 
   //参数
   setting={
      	column_width:c_width+8,//列宽
             scaleimg:1.5,
	  column_className:'waterfall_column',//列的类名
	  column_space:20,//列间距
	  cell_selector:'.cell',//要排列的砖块的选择器，context为整个外部容器
	  img_selector:'img',//要加载的图片的选择器
	  auto_imgHeight:true,//是否需要自动计算图片的高度
	  fadein:true,//是否渐显载入
	  fadein_speed:600,//渐显速率，单位毫秒
	  insert_type:2, //单元格插入方式，1为插入最短那列，2为按序轮流插入
	  getResource:function(index){ }  //获取动态资源函数,必须返回一个砖块元素集合,传入参数为加载的次数
   },
   //
   waterfall=$.waterfall={},//对外信息对象
   $waterfall=null;//容器
   waterfall.load_index=1, //加载次数
   $.fn.extend({
       waterfall:function(opt){
		opt=opt||{};  
	      setting=$.extend(setting,opt);
		  $waterfall=waterfall.$waterfall=$(this);
		  waterfall.$columns=creatColumn();
		  render($(this).find(setting.cell_selector).detach(),false); //重排已存在元素时强制不渐显
		  waterfall._scrollTimer2=null;
		  $(window).bind('scroll',function(){
		     clearTimeout(waterfall._scrollTimer2);
			 waterfall._scrollTimer2=setTimeout(onScroll,300);
		  });
		  waterfall._scrollTimer3=null;
		  $(window).bind('resize',function(){
		     clearTimeout(waterfall._scrollTimer3);
			 waterfall._scrollTimer3=setTimeout(onResize,300);
		  });
	   }
   });
   $('#waterfall img').width(c_width-20);
   $('#waterfall .cell').width(c_width);
   function creatColumn(){//创建列
      waterfall.column_num=calculateColumns();//列数
	  //循环创建列
	  var html='';
	  for(var i=0;i<waterfall.column_num;i++){
	     html+='<div class="'+setting.column_className+'" style="width:'+setting.column_width+'px; display:inline-block; *display:inline;zoom:1; margin-left:'+setting.column_space/2+'px;margin-right:'+setting.column_space/2+'px; vertical-align:top; overflow:hidden"></div>';
	  }
	  $waterfall.prepend(html);//插入列
	  return $('.'+setting.column_className,$waterfall);//列集合
   }
   function calculateColumns(){//计算需要的列数
      var num=Math.floor(($waterfall.innerWidth())/(setting.column_width+setting.column_space));
	  if(num<1){ num=1; } //保证至少有一列
	  return num;
   }
   
   function render(elements,fadein){//渲染元素
      if(!$(elements).length) return;//没有元素

      	callback=function(holderobj){

     		var imgobj=holderobj.find('img.post_img'),
     			holer=holderobj.find('.img_holder');
     		var i_w=imgobj.width(),
     	 	      i_h=imgobj.height();

     		holderobj.find('.img_holder').css({ 'width':i_w,
      						      'height':i_h
      						   });
     		 imgobj.css({ 'width' : i_w*setting.scaleimg,
                                           'height' :i_h*setting.scaleimg });
	            imgobj.css({
                            'top' : -(imgobj.height()-i_h)/2,
                            'left' :  -(imgobj.width()-i_w)/2
	            });
      		var minl=holer.width()-imgobj.width(),
      			maxl=0,
      			mint=holer.height()-imgobj.height(),
      			maxt=0;
      		holer.attr({minl:minl,maxl:maxl,'mint':mint,'maxt':maxt})
      	};
      
      var $columns = waterfall.$columns;
      $(elements).each(function(i){										
		  if(!setting.auto_imgHeight||setting.insert_type==2){//如果给出了图片高度，或者是按顺序插入，则不必等图片加载完就能计算列的高度了
		     if(setting.insert_type==1){ 
			    insert($(elements).eq(i),setting.fadein&&fadein);//插入元素

			 }else if(setting.insert_type==2){
			    insert2($(elements).eq(i),i,setting.fadein&&fadein);//插入元素	 
		     }
		     callback($(elements).eq(i));
			 return true;//continue
		  }						
		  if($(this)[0].nodeName.toLowerCase()=='img'||$(this).find(setting.img_selector).length>0){//本身是图片或含有图片
		      var image=new Image;
			  var src=$(this)[0].nodeName.toLowerCase()=='img'?$(this).attr('src'):$(this).find(setting.img_selector).attr('src');
			  
			  image.onload=function(){//图片加载后才能自动计算出尺寸
			      image.onreadystatechange=null;
				  if(setting.insert_type==1){ 
				     insert($(elements).eq(i),setting.fadein&&fadein);//插入元素
				  }else if(setting.insert_type==2){
					 insert2($(elements).eq(i),i,setting.fadein&&fadein);//插入元素	 
				  }
				   callback($(elements).eq(i));
				  image=null;
			  }
			  image.onreadystatechange=function(){//处理IE等浏览器的缓存问题：图片缓存后不会再触发onload事件
			      if(image.readyState == "complete"){
					 image.onload=null;
					 if(setting.insert_type==1){ 
					    insert($(elements).eq(i),setting.fadein&&fadein);//插入元素
					 }else if(setting.insert_type==2){
					    insert2($(elements).eq(i),i,setting.fadein&&fadein);//插入元素	 
					 }
					  callback($(elements).eq(i));
					 image=null;
				  }
			  }
			  image.src=src;
		  }else{//不用考虑图片加载
		      if(setting.insert_type==1){ 
				 insert($(elements).eq(i),setting.fadein&&fadein);//插入元素
			  }else if(setting.insert_type==2){
				 insert2($(elements).eq(i),i,setting.fadein&&fadein);//插入元素	 
			  }
			 callback($(elements).eq(i));
		  }						
	  });
   }
   function public_render(elems){//ajax得到元素的渲染接口
   	  render(elems,true);	
   }
   function insert($element,fadein){//把元素插入最短列
      if(fadein){//渐显
	     $element.css('opacity',0).appendTo(waterfall.$columns.eq(calculateLowest())).fadeTo(setting.fadein_speed,1);
	  }else{//不渐显
         $element.appendTo(waterfall.$columns.eq(calculateLowest()));
	  }
   }
   function insert2($element,i,fadein){//按序轮流插入元素
      if(fadein){//渐显
	     $element.css('opacity',0).appendTo(waterfall.$columns.eq(i%waterfall.column_num)).fadeTo(setting.fadein_speed,1);
	  }else{//不渐显
         $element.appendTo(waterfall.$columns.eq(i%waterfall.column_num));
	  }
   }
   function calculateLowest(){//计算最短的那列的索引
      var min=waterfall.$columns.eq(0).outerHeight(),min_key=0;
	  waterfall.$columns.each(function(i){						   
		 if($(this).outerHeight()<min){
		    min=$(this).outerHeight();
			min_key=i;
		 }							   
	  });
	  return min_key;
   }
   function getElements(){//获取资源

     if(pageArray.length>=$.waterfall.load_index+1 &&
       	pageArray[$.waterfall.load_index] ){
     	// console.log('run');
     	$.waterfall.load_index+=1;
     	return setting.getResource($.waterfall.load_index,public_render);
     }
      return false;
   }
   waterfall._scrollTimer=null;//延迟滚动加载计时器
   function onScroll(){//滚动加载
      if($('div.content-wrapper>[data-info="index_pots"]').is(':hidden')) return;
      clearTimeout(waterfall._scrollTimer);
	  waterfall._scrollTimer=setTimeout(function(){
	      var $lowest_column=waterfall.$columns.eq(calculateLowest());//最短列
		  var bottom=$lowest_column.offset().top+$lowest_column.outerHeight();//最短列底部距离浏览器窗口顶部的距离
		  var scrollTop=document.documentElement.scrollTop||document.body.scrollTop||0;//滚动条距离
		  var windowHeight=document.documentElement.clientHeight||document.body.clientHeight||0;//窗口高度
		  if(scrollTop>=bottom-windowHeight){
			 render(getElements(),true);
		  }
	  },100);
   }
   function onResize(){//窗口缩放时重新排列
      if($('div.content-wrapper>[data-info="index_pots"]').is(':hidden')) return;
      if(calculateColumns()==waterfall.column_num) return; //列数未改变，不需要重排
      var $cells=waterfall.$waterfall.find(setting.cell_selector);
	  waterfall.$columns.remove();
	  waterfall.$columns=creatColumn();
      render($cells,false); //重排已有元素时强制不渐显
   }

var pageArray=[null];
var opt={
  getResource:function(index,render){
  //index为已加载次数,render为渲染接口函数,
  //接受一个dom集合或jquery对象作为参数。
  //通过ajax等异步方法得到的数据可以传入该接口进行渲染，如 render(elem)
	
	var i=0,pagelen=pageArray.length;
	//console.log(index+'@@'+pagelen+'@@');
	//console.log(pageArray);
	if(index<=pagelen){
		$('#waterfall').infinitescroll('retrieve');
		render( $(pageArray[index-1]) );
	}
	for(var i=0;i<index;i++){
		if(pageArray[i]){
			if(index-i>=5){
				pageArray[i]=null;
			}
		}
	}

  },
  auto_imgHeight:true,
  insert_type:1
};
$(window).unbind('.infscr');
$('#waterfall').infinitescroll({
	    navSelector  : "nav[role='navigation']",   // 页面分页元素(成功后会被隐藏)
	    nextSelector : "a.older-posts", // 需要点击的下一页链接，和2的html要对应
	    itemSelector : "div.cell"  , // ajax回来之后，每一项的selecter
	                              //（比如每篇文章都有item这个class）
	    animate      : false,      //加载完毕是否采用动态效果
	    extraScrollPx: 50,       //向下滚动的像素，必须开启动态效果
	    // debug     : true,      //调试的时候，可以打开
	    bufferPx     : 5,         //提示语展现的时长，数字越大，展现时间越短
	    loading: {
	        //finishedMsg: '没有更多内容了', //当加载失败，或者加载不出内容之后的提示语
	        img:  '',   //自定义loadding的动画图
	        msgText : '',    //加载时的提示语
	        loadstart : function (){
			$('.loaderhloder').show();
		},
	        loadend : function (){
			$('.loaderhloder').hide();
		}
	        
	    },
	    errorCallback:function(e){
	    	$('.loaderhloder').hide();
	    	$('footer.footer').show();
	    }
	},function( newElements,opt ) {

		$('.loaderhloder').hide();
		$(newElements).find('.img_holder,.img_holder>img').width((c_width-20));
		$(newElements).find('.cell').width(c_width);	

		pageArray[pageArray.length++]=newElements;
	    	$(newElements).remove();

	       //成功后执行自定义的函数
	       //如果需要对新内容进行加工，就在这里实现
});
$('#waterfall').waterfall(opt);
$('nav.pagination').hide();
$('body').on('click',function(e){
	var e = e || window.event,
	     target =  e.target || e.serElement,
	     t_obj  = $(target);
	
	if(t_obj.get(0).tagName.toLowerCase() === 'a'){
		var data_info=t_obj.attr('data-info'),
		     urlstring = t_obj.attr('href');
		 if(!data_info) return;
		 if(data_info === 'goto-post'){
			$.ajax({	
				type : 'GET',
				url:urlstring,
				dataType : 'text',
				success : function(data){
					$('body').css({'background':'#fff'});
					var s_str= '<div id="markflagstart"></div>',
					     s_pos = data.indexOf(s_str),
					     e_pos = data.indexOf('<div id="markflagend"></div>'),
					     content =  data.substring(s_pos+s_str.length,e_pos);
					var posts_holder=$('div.content-wrapper>[data-info="index_pots"]');
					var post_detail_holder= $('div.content-wrapper>div[data-info="post-detail"]');
					waterfall.scrollTop=$(document).scrollTop();
					posts_holder.hide();
					post_detail_holder.html(content).show();
  					$(document).scrollTop(0);
  					if($('.post-container+.read-more>.read-more-item').length===1){
  						$('.read-more>.read-more-item').addClass('read-more-oneitem');

  					}else{
  						$('.read-more>.read-more-item').removeClass('read-more-oneitem');
  					}					
				}
			});

		}else if( data_info === 'goto-index' ){
		      	posts_holder=$('div.content-wrapper>div[data-info="index_pots"]');
			if(posts_holder.length===1){
				$('body').css({'background':'#dededa'})
				posts_holder.show();
				$('div.content-wrapper>div[data-info="post-detail"]').hide();
				$(document).scrollTop(waterfall.scrollTop);
				
			}
		}else if(data_info==='thumbs'){
			var commend=t_obj.find('i');
			if(commend.attr('commend')==='true'){
				commend.attr({'commend':'false'}).css({'color':'#888'});
			}else{
				commend.attr({'commend':'true'}).css({'color':'#C64F4A'});
			}
			
		}else if(data_info==='post-remark'){
			t_obj.parents('.post-list__meta').hide(200);
			t_obj.parents('.cell').find('.remark-holder').show(200,function(){
								  	t_obj.parents('.cell').find('.remark-input').focus();
								  });
		}else if(data_info==='colse-remark'){
			var cell=t_obj.parents('.cell');
			cell.find('.post-list__meta').show(200);
			cell.find('.remark-holder').hide(200);
		}else if(data_info==='submit-remark'){
			var cell=t_obj.parents('.cell');
			cell.find('.post-list__meta').show(200);
			cell.find('.remark-holder').hide(200);
		}
		e.preventDefault(); 
		e.stopPropagation();
		return false; 
	}

});

})(jQuery);
