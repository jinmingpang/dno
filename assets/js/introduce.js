(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    if(!IsPC()) {
            $('.panel-aside__main').hide();
            //return;
      }
      dno_config_init();
     initHeader();
     initAnimation();
     addListeners();
     
    function initHeader() {
        width = $(".panel-cover").width();
        height =  $(".panel-cover").height();
        target = {x: width/2, y: height/2};

        canvas = document.getElementById('start-fash');
        canvas.style.position="absolute";
        canvas.style.top="0px";
        canvas.style.left="0px";
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;

            //隐藏侧边栏
          
        }
           
        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
      //  if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
      //  }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0,
              w=$('.panel-cover').width(),
              h=$('.panel-cover').height();
        // else 
        //     if (e.clientX || e.clientY)    {
        //     posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        //     posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        // }
          if (e.clientX || e.clientY)    {
            var x=e.clientX,
                  y=e.clientY;

          if(!$('.panel-aside__content').is(':hidden')){
              if( x>$('.panel-cover ').width() && 
                $('#nav-toggle').hasClass('active') ){
                 closeAside();
              }
          }
                if(x>=w){
                  x=w/2;
                }
                if(y>=h){
                  y=h/2;
                }
               posx = x ;
               posy = y ;
          }
        target.x = posx;
        target.y = posy;

    }
  
    function scrollCheck() {
        // if(document.body.scrollTop > height) animateHeader = false;
        // else animateHeader = true;
    }
    $(".panel-cover").resize(function(){
        resize();
    });
    function resize() {
         var _w=$(".panel-cover").width();
        var _h=$(".panel-cover").height();
        canvas.width =_w;
        canvas.height =  _h;
        if(!IsPC()){
                $('.panel-aside__main').hide();
        }
    }
    var ef_type='same'; // dis_same
     $('#waterfall').on('mousemove',imgef);
    function imgef(e){
        var e = e || window.event,
             t = e.target || e.srcElement,
             e_type=e.type,
             imgobj=holder=null;
              var witch_target=$(t).attr('class');
             if(witch_target==='cell' || witch_target==='img_holder'){
                  if(witch_target==='cell'){
                        imgobj=$(t).find('img.post_img') ;
                        holder=$(t).find('div.img_holder');
                  }else{
                      imgobj=$(t).find('img.post_img') ;
                      holder=$(t);
                  }
                
                  var  o_l=(imgobj.width()-holder.width())/2,
                         o_t=(imgobj.height()-holder.height())/2;
                  imgobj.css({
                          'left' : -o_l,
                          'top' : -o_t,
                          'right' : 'auto',
                          'bottom' : 'auto'
                  });
                
             }else if(witch_target==='post_img'){
                        imgobj = $(t);
                        holder = $(t).parent();
                         var W=holder.width(),
                              H=holder.height(),
                              w=imgobj.width()-W,
                               h=imgobj.height()-H,
                              x0=holder.offset().left,
                              y0=holder.offset().top,
                              x1=(W-w)/2,
                              y1=(H-h)/2,
                              x2=x1+w,
                              y2=y1+h,
                              x=e.pageX-x0,
                              y=e.pageY-y0,
                              t_x=t_y=0,
                              x01=W/2,
                              y01=H/2;
                      if(ef_type==='dis_same'){
                             if( x<x01 && y<y01){
                                       if(x<x1) x=x1;
                                       if(y<y1) y=y1;
                                        x=x-x01;y=y-y01;
                                       imgobj.css({
                                          'left':x,
                                          'top':y,
                                          'right':'auto',
                                          'bottom':'auto'
                                       });
                                 }else if(x>x01 && y<y01){
                                        if(x>x2) x=x2;
                                        if(y<y1) y=y1;
                                        x=x-x01;y=y-y01;
                                       imgobj.css({
                                          'top':y,
                                          'right':-x,
                                          'left':'auto',
                                          'bottom':'auto'
                                       });
                                       console.log(-x);
                                 }else if(x<x01 && y>y01){
                                       if(x<x1) x=x1;
                                       if(y>y2) y=y2;
                                       x=x-x01;y=y-y01;
                                       imgobj.css({
                                          'left':x,
                                          'bottom':-y,
                                          'top':'auto',
                                          'right':'auto'
                                       });
                                 }else if(x>x01 && y>y01){
                                        if(x>=x2) x=x2;
                                        if(y>=y2) y=y2;
                                        x=x-x01;y=y-y01;
                                       imgobj.css({
                                          'right':-x,
                                          'bottom':-y,
                                          'left':'auto',
                                          'top':'auto'
                                       });
                                 }     
                      }else{
                              if( x<x01 && y<y01){
                                       if(x<x1) x=x1;
                                       if(y<y1) y=y1;
                                        x=2*(x-x01);
                                        y=2*(y-y01);
                                       imgobj.css({
                                          'right':x,
                                          'bottom':y,
                                       });
                                 }else if(x>x01 && y<y01){
                                        if(x>x2) x=x2;
                                        if(y<y1) y=y1;
                                        x=2*(x-x01);y=2*(y-y01);
                                       imgobj.css({
                                          'bottom':y,
                                          'left':-x,
                                       });
                                 }else if(x<x01 && y>y01){
                                       if(x<x1) x=x1;
                                       if(y>y2) y=y2;
                                       x=2*(x-x01);y=2*(y-y01);
                                       imgobj.css({
                                          'right':x,
                                          'top':-y
                                       });
                                 }else if(x>x01 && y>y01){
                                        if(x>=x2) x=x2;
                                        if(y>=y2) y=y2;
                                        x=2*(x-x01);y=2*(y-y01);
                                       imgobj.css({
                                          'left':-x,
                                          'top':-y
                                       });
                                 }      
                      }
                                
                       // e.preventDefault();
                        e.stopPropagation();
                        //return false;
             }   
       
    }
    // animation

    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    $('#scene').parallax();

    $('.panel-aside__main').on('click',function(e){
        var t=$(e.target) ;
        if(t.attr('class') && t.attr('class').indexOf('panel-aside__flag')>-1 || 
            t.parents('#nav-toggle').length===1 ){

            if($('.panel-aside__flag').attr('isopen')==='true'){
             closeAside();
            }else{
              openAside();
            }
        }
        if(t.parents('li').length===1 || t.get(0).tagName.toLowerCase()==='li'){
            // alert('chosen');
        }
    });
    $('.panel-aside__content').on('mousemove',function(e){
        var t=$(e.target);
        switchTip(t);
    });

   function openAside(){
          $('.panel-aside__flag').attr('isopen','true').animate({'left':'0px','top':'0px','border-radius':'0px'},'slow','swing');//.removeClass('rotateInUpRight').addClass('animated rotateInDownRight');
          $( "#nav-toggle").addClass('active');
          $('.panel-aside__content').removeClass('animated flipOutY').addClass('animated flipInY').show(); 
   }
   function closeAside(){
          $('.panel-aside__flag').attr('isopen','false').animate({'left':'20px','top':'20px','border-radius':'10px'},'slow','swing');//.removeClass('rotateInDownRight').addClass('animated rotateInUpRight');
          $( "#nav-toggle").removeClass('active');
          $('.panel-aside__content span').hide();
          $('.panel-aside__content').removeClass('animated flipInY').addClass('animated flipOutY'); 
         
   }
   function switchTip(t){
    if(!t) return;
        var _f=t.get(0).tagName.toLowerCase();

        if(_f==='a' ||  _f==='i'){
          if( t.parents('li').find('span').is(':hidden') ){
                $('.panel-aside__content  span').removeClass('animated flipInY').hide();
                t.parents('li').find('span').css('display','inline-block').addClass('animated flipInY');
          }
        }else if( _f==='span'){
            t.removeClass('animated flipInY').hide();
        }
   }

   function IsPC(){    
     var userAgentInfo = navigator.userAgent;  
     var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");    
     var flag = true;    
     for (var v = 0; v < Agents.length; v++) {    
         if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }    
     }    
     return flag;    
  }  
function dno_config_init(){
  var cof=$.isPlainObject(dno_config) ? dno_config : {} ,
        m_nav= $.isPlainObject(cof.mini_navbar ) ? cof.mini_navbar : {},
        s_panel=$.isPlainObject(cof.side_panel ) ? cof.side_panel : {},
        nav_btns=$.isArray(m_nav.btns) ?  m_nav.btns : [],
        p_txt_btns=$.isArray(s_panel.txt_btns) ?  s_panel.txt_btns : [],
        p_icon_btns=$.isArray(s_panel.img_btns) ?  s_panel.img_btns : [],
        items='';

        if(m_nav.color){
          $('.panel-aside__flag').css('backgroundColor',m_nav.color);
        }
        if(nav_btns){
          items+='<ul>';
          $.each(nav_btns,function(index,item){
            items+=' <li><a href="'+item.url+'"><i class="fa fa-'+item.icon+' fa-2x"></i></a><span style="display:none;">'+item.tip_str+'</span></li>';
          });
          items+='</ul>';
          $('.panel-aside__content').html(items);
        }
        if(s_panel.logo_url){
          $('.logo.moon').css({'background-image':'url('+s_panel.logo_url+')'});
        }
        if(s_panel.main_title){
          $('.panel-cover__title').html(s_panel.main_title);
        }
        if(s_panel.sub_title){
          $('.panel-cover__subtitle').html(s_panel.sub_title);
        }
        if(s_panel.description){
          $('.panel-cover__description').html(s_panel.description);
        }
        if(p_txt_btns){
          items='<ul  class="navigation">';
          items+=' <li class="navigation__item"><a href="#/blog" title="首页" class="blog-button" data-info="goto-index">首页</a></li>';
          $.each(p_txt_btns,function(index,item){
            items+=' <li class="navigation__item"><a href="'+item.url+'" title="'+item.text+'" class="blog-button" target="_blank">'+item.text+'</a></li>';
          });
          items+='</ul>';
          $('.cover-navigation--primary').html(items);
        }
        if(p_icon_btns){
          items='<ul  class="navigation">';
          $.each(p_icon_btns,function(index,item){
            items+=' <li class="navigation__item">'+
                    '<a href="'+item.url+'" title="'+item.title+'" target="_blank">'+
                        '<i class="social fa fa-'+item.icon+' fa-2x"></i>'+
                        '<span class="label">'+item.text+'</span>'+
                    '</a>'+
              '</li>';
          });
          items+='</ul>';
          $('.navigation--social').html(items);
        } 
}

})();