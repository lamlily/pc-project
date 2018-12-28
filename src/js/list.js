 jQuery(function($){
        $('#pageHeader').load('./top.html ',function(){
           (function logincar(){
               let login1 = $("#login1");
                let login2 = $("#login2");
                login1.find("a").attr("href","login.html");
                $(".btn-sidecart").attr("href","car.html");
                let admin = $.cookie("admin");
                if(admin){
                  login1.hide();
                 login2.show().find("#admin").text($.cookie("admin"));
                 $("#login2 a").on("click",function(){
                    $.cookie('admin',null,{expires: -1,path: '/'});
                    logincar();
                    topcar();
                 });
                }else{
                   login1.show();
                   login2.hide();
                }
            })();
          let online = $(".noline");
          online.on("mouseover",function(){
            $(this).find('.top-children').stop().slideDown(300);
          }).on("mouseout",online,function(){
            $(this).find('.top-children').stop().slideUp(300);
          });
         let sasa_category = $(".sasa_category");
         sasa_category.hide();
          $(".all-category").on("mouseenter",function(){
              sasa_category.stop().slideDown(300);
          }).on("mouseleave",online,function(){
              sasa_category.stop().slideUp(300);
          });
              $('#pageHeader img').each(function(){
                  var arr = "../";
                  arr += $(this).attr('src');
                   $(this).attr('src',arr);
              });
              topcar();
       });
        $(".footer-rs").load('./footer.html',function(){
             $('.footer-rs img').each(function(){
                var arr = "../";
                arr += $(this).attr('src');
                 $(this).attr('src',arr);
            });
             $("#js_carttitle").on("click",function(){
                location.href="../html/car.html";
            })
         });
        $(".gray-box").on("click",".lei",function(){
            $(this).toggleClass('ahover').find("span").toggleClass('active');
            $(this).find("ul").toggleClass('hide');
            $(".l_btwo").on("click",function(){
              event.stopPropagation();
            })
        });


         $.ajax({
                url: '../api/index.php',
                type: 'get',
                dataType: 'json',
                data: {qty:24},
                cache:false,
                success: function(data){
                        // console.log(data);
                         let datalistul = $(".arrivalslist");
                        var prev = $(".append");
                        var pageLen =Math.ceil(data.len/data.qty);
                        darlist(data);
                        
                        paixu(data);
                        for(var i=1;i<=pageLen;i++){
                            prev.before(`<a href="javascript:void(0);" class="flip">${i}</a>`);
                        }
                        
                        $(".pageview a").not(".prev").not(".next").on("click",function(){
                             var page=$(this).text();
                              $.ajax({
                                url: '../api/index.php',
                                type: 'get',
                                dataType: 'json',
                                data: {qty:24,curpage:page},
                                cache:false,
                                 success: function(res){
                                                datalistul.empty();
                                                paixu(res);
                                                darlist(res);
                                                console.log(res);

                                              }
                                });
                        });
                }
              });

                          function darlist(data){
                             let datalistul = $(".arrivalslist");
                             $.each(data.dataArr,function(idx,item){
                                  let str ="";
                                  str=item.imgsrc.split("&");
                                  let img="";
                                   $.each(str,function(idx,item){
                                     img+=`<dd><img src="${item}" alt="" /></dd>`;
                                  });
                                  let html =`<li data-guid ="${item.id}">
                                          <div class="formall">
                                              <div class="formalpic fr">
                                                  <dl class="formalpic_list">
                                                      ${img}
                                                  </dl>
                                              </div> 
                                              <div class="formallcont">
                                                  <div class="arrivals-pic">
                                                      <b><img src="../images/liebiaoye.png"  alt="" /></b>
                                                      <a href="javascript:void(0);" id="xianshi"><img src="${str[0]}" alt="" /></a>
                                                  </div>
                                                  <div class="sale-price">
                                                      <span class="count fr">${item.zheshu}折</span>
                                                      <span class="price tl">￥${item.curprice}</span>
                                                      <span class="dis tl">￥${item.oldprice}<del></del></span>
                                                  </div>
                                                  <div class="arrivals-info">
                                                        <div class="infoconts">
                                                              <div class="des02">
                                                                  <b class="yew">香港特快直送 零扣关</b>
                                                                  <a href="javascript:void(0);" target="_blank">${item.jianshu}</a>                                    
                                                              </div>                                    
                                                            <p class="des03">
                                                              <a href="javascript:void(0);" target="_blank">${item.Sname}</a>
                                                            </p>
                                                            <p class="des04">&nbsp;&nbsp;</p>
                                                         </div>
                                                          <p class="salenum">已售11件</p>                            
                                                  </div> 
                                                  <div class="btn-buy">
                                                       <a href="javascript:void(0);" class="btn btn-major action-addtocart" target="_dialog_minicart" rel="nofollow">                   
                                                      <span><span>立即抢购</span></span></a>
                                                  </div>                    
                                              </div>
                                          </div> 
                                      </li>`
                                              datalistul.append(html);
                                      $(".arrivalslist li").filter(function(i){
                                        //这里参数i 是元素在选择出元素数组中的index
                                            if((i+1)%3 == 0){
                                              $(this).addClass("left");
                                            }
                                        });
                              });
                                let overimg = $(".formalpic_list");
                                  overimg.on("mouseover","dd",function(){
                                    let html =  $(this).html();
                                    $(this).closest("li").find("#xianshi").html(html);
                                });

                                datalistul.find(".btn-major").on("click",{a:data.dataArr},function dirlist(ev){
                                   let listdata = ev.data;

                                   // console.log(listdata)
                                   let yonghuming= $.cookie("admin")||"";
                                   if(yonghuming==""){
                                    location.href="./login.html";
                                    return;
                                   }
                                       var guid = $(this).closest("li").attr("data-guid");
                                        var carArr ={};
                                            $.each(listdata,function(idx,item){
                                                $.each(item,function(idx,item){
                                                     if(item.id==guid){
                                                      carArr=item;
                                                  }
                                                });
                                            });
                                             var Ykey="qty";
                                             var Yvalue=1;
                                                carArr[Ykey]=Yvalue;
                                              $.ajax({
                                                url: '../api/car.php',
                                                type: 'get',
                                                dataType: 'json',
                                                data: {
                                                        admin:yonghuming,
                                                        Sname: carArr.Sname,
                                                        curprice: carArr.curprice,
                                                        id: carArr.id,
                                                        imgsrc: carArr.imgsrc,
                                                        jianshu: carArr.jianshu,
                                                        miaoshu: carArr.miaoshu ,
                                                        oldprice: carArr.oldprice ,
                                                        qty:  carArr.qty,
                                                        zheshu:  carArr.zheshu
                                                },
                                                 success: function(data){
                                                               topcar();
                                                              }
                                                });
                                         
                                });
                                datalistul.on("click","#xianshi",function(){
                                   location.href = "./goods.html?" + encodeURI($(this).closest("li").attr("data-guid"));
                                });
                          };
                          var diy=true;
                          function paixu(data){
                            let datalistul = $(".arrivalslist");
                            // console.log(data);
                            $(".action-sort").unbind('click').bind("click",function(){
                              // 异步执行的时候，会遇上点击一下，代码就执行了多次,引起这个原因很可能就是事件重复调用
                              // unbind() 方法移除被选元素的事件处理程序
                              let num = $(this).attr("data-sort");
                                  $(".action-sort").removeClass("active");
                                  $(this).addClass("active");
                                  if(diy==true&&num==5){
                                    diy=false;
                                     let shijian={}
                                      let shij = data.dataArr.sort(function(a,b){
                                          return  Date.parse(b.timer) - Date.parse(a.timer);
                                      });
                                      shijian["dataArr"]=shij;
                                      datalistul.empty();
                                      darlist(shijian);
                                      return false;
                                  }else if(diy==false&&num==5){
                                      diy=true;
                                     let shijian={}
                                      let shij = data.dataArr.sort(function(a,b){
                                          return  Date.parse(a.timer) - Date.parse(b.timer);
                                      });
                                      shijian["dataArr"]=shij;
                                      datalistul.empty();
                                      darlist(shijian);
                                      return false;
                                  }
                                  if(diy==true&&num==7){
                                       diy=false;
                                     let jiage={}
                                      let jia = data.dataArr.sort(function(a,b){
                                          return parseInt(b.curprice) - parseInt(a.curprice);
                                      });
                                      jiage["dataArr"]=jia;
                                      datalistul.empty();
                                      darlist(jiage);
                                      return false;
                                  }else if(diy==false&&num==7){
                                      diy=true;
                                     let jiage={};
                                      let jia = data.dataArr.sort(function(a,b){
                                          return parseInt(a.curprice) - parseInt(b.curprice);
                                      });
                                      jiage["dataArr"]=jia;
                                      datalistul.empty();
                                      darlist(jiage);
                                      return false;
                                  }
                            })
                          }



         function topcar(){
             let yonghuming = $.cookie("admin")||"";
               if(yonghuming==""){
                  location.href="./login.html";
                  return;
                 }
               $.ajax({
                      url: '../api/topcar.php',
                      type: 'get',
                      dataType: 'json',
                      data: {admin:yonghuming},
                       success: function(data){
                                          // console.log(data);
                                          let cabianqty=0;
                                           let ul = $(".minicart-list");
                                          let html = data.map(function(item){
                                            cabianqty+=parseInt(item.qty);
                                            let str ="";
                                            str=item.imgsrc.split("&");
                                            return `<li class="goods-item">
                                                    <div class="goods-pic">
                                                      <a href="javascript:void(0);">
                                                        <img src="${str[0]}" alt="HABA 优白系列 HABA 润泽柔肤水 G露" ></a>
                                                    </div>
                                                    <div class="goods-info">
                                                      <h3 class="goods-name">
                                                        <a href="javascript:void;">
                                                          <label class="ui-color-yellow">香港特快直送 零扣关</label>${item.Sname}</a></h3>
                                                      <div class="goods-price">
                                                        <a href="javascript:void(0);" class="action-delete fr" data-guid="${item.id}">
                                                          <i class="iconfont"></i></a>
                                                        <p>
                                                          <span class="p-price">￥${item.curprice}</span>
                                                          <span class="p-quantity">x${item.qty}</span></p>
                                                      </div>
                                                    </div>
                                                  </li>
                                            `;
                                          }).join('');
                                           $("#js_cartnum").html(cabianqty);
                                          // cebianlan(cabianqty);
                                          ul.html(html);
                                          ul.on("click",".action-delete",function(){
                                             let yonghuming = $.cookie("admin")||"";
                                             if(yonghuming==""){
                                                location.href="./login.html";
                                                return;
                                               }
                                             var currentGuid = $(this).attr("data-guid");
                                             // console.log(currentGuid);
                                                 $.ajax({
                                                  url: '../api/topcar.php',
                                                  type: 'get',
                                                  dataType: 'json',
                                                  data: {id:currentGuid,admin:yonghuming},
                                                   success: function(data){
                                                              let cabianqty=0;
                                                              let ul = $(".minicart-list");
                                                              let html = data.map(function(item){
                                                                cabianqty+=parseInt(item.qty);
                                                                let str ="";
                                                                str=item.imgsrc.split("&");
                                                                return `<li class="goods-item">
                                                                        <div class="goods-pic">
                                                                          <a href="javascript:void(0);">
                                                                            <img src="${str[0]}" alt="HABA 优白系列 HABA 润泽柔肤水 G露" ></a>
                                                                        </div>
                                                                        <div class="goods-info">
                                                                          <h3 class="goods-name">
                                                                            <a href="javascript:void;">
                                                                              <label class="ui-color-yellow">香港特快直送 零扣关</label>${item.Sname}</a></h3>
                                                                          <div class="goods-price">
                                                                            <a href="javascript:void(0);" class="action-delete fr" data-guid="${item.id}">
                                                                              <i class="iconfont"></i></a>
                                                                            <p>
                                                                              <span class="p-price">￥${item.curprice}</span>
                                                                              <span class="p-quantity">x${item.qty}</span></p>
                                                                          </div>
                                                                        </div>
                                                                      </li>
                                                                `;
                                                              }).join('');
                                                            $("#js_cartnum").html(cabianqty);
                                                              // cebianlan(cabianqty);
                                                              ul.html(html);
                                                      }
                                                  });
                                          });
                                    }
                      });
       
          };
})