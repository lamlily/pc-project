   jQuery(function($){
         $('#pageHeader').load('./top.html ',function(){
          (function logincar(){
             let login1 = $("#login1");
              let login2 = $("#login2");
              login1.find("a").attr("href","login.html");
              $(".btn-sidecart").attr("href","car.html")
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
            //放大镜
           let zheshu = $(".sidecount");//折数
           let tu = $(".exzoom_img_ul");//图
           let miaoshu = $(".product-titles");//描述
           let dataname = $(".product-titles2 a");//名字
           let xianjia = $(".action-price");//现价
           let yuanjia= $(".action-mktprice");//原价
           let btn_major =$(".btn-major");//加入购物车按钮
           let shuliang =$(".p-quantity");//加减
           let qty = $(".action-quantity-input");//input
            shuliang.on("click",".btn-decrease",function(){
                var sli = qty.val()-1;
                if(sli>36){
                  sli=36;
                }
                qty.val(sli);
            }).on("click",".btn-increase",function(){
                var bli = parseInt(qty.val())+1;
                if(bli<1){
                  bli=1;
                }
                qty.val(bli);
            });
            //获取地址栏 ?后id
          var params = decodeURI(location.search).slice(1);
          if(params!=""){
               $.ajax({
                url: '../api/xiangqingye.php',
                type: 'get',
                dataType: 'json',
                
                data: {id:params},
                 success: function(data){
                              var carArr={};
                                $.each(data,function(idx,item){
                                    let str ="";
                                    str=item.imgsrc.split("&");
                                    $.each(str,function(idx,item){
                                      tu.append(`<li><img src="${item} "/></li>`);
                                    });
                                  
                                    zheshu.text(item.zheshu);
                                    miaoshu.html(`<i class="icon iconfont">&ldquo;</i>${item.miaoshu}`);
                                    dataname.text(item.Sname);
                                    xianjia.text("￥"+item.curprice);
                                    yuanjia.text("￥"+item.oldprice);

                                   carArr=item; 
                                });
                                  //放大镜插件，修改了源码改变放大框大小
                                   $("#exzoom").exzoom({
                                      autoPlay: false,//禁止自动播放
                                  });//方法调用，务必在加载完后执行
                                btn_major.on("click",function(){
                                        let yonghuming =  $.cookie("admin")||"";
                                        if(yonghuming==""){
                                          location.href="./login.html";
                                          return;
                                        }
                                         var Ykey="qty";
                                         var Yvalue=parseInt(qty.val());
                                            carArr[Ykey]=Yvalue;
                                          // console.log(carArr);
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
                                                           if(data){
                                                             topcar();
                                                           }
                                                          }
                                            });
                                     
                                });

                            }
              });
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
                                             var currentGuid = $(this).attr("data-guid");
                                             let yonghuming = $.cookie("admin")||"";
                                             if(yonghuming==""){
                                                location.href="./login.html";
                                                return;
                                               }
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

          $(".pro-rule ").on("mouseenter",function(){
            $(this).addClass('on');
          }).on("mouseleave",function(){
             $(this).removeClass('on');
          });
 })