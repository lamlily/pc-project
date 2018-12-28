 jQuery(function($){
      // 头部
       $('#pageHeader').load('./html/top.html',function(){
          (function logincar(){
              let login1 = $("#login1");
              let login2 = $("#login2");
              let login0 = $("#login0");
              let register0 = $("#register0");

              login1.children("#login0").attr("href","html/login.html");
              login1.children("#register0").attr("href","html/register.html");
               // register0.find("a").attr("href","html/register.html");
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
         topcar();
          $(".btn-sidecart").attr("href","html/car.html");
          $('.nav-category a').each(function(){
                $(this).attr("href","html/list.html");
            });
       });
 
       // 底部
       $('#pageFooter').load('./html/footer.html',function(){
            $("#js_carttitle").on("click",function(){
                location.href="./html/car.html";
            })
       });
        $('#pageFooter2').load('./html/footer.html .footer_link_2');
        $('body').scrollspy({ target: '#navbar-example' });
        $('.banner').setSlide({
          fullScreenw:true,
          pagination:true,
          slideLih:420,
          pagingTrigger:'hover',
          slideTime:3000,
          autoPlay:true
        });
        $(window).resize(function(){
           $('.banner').setSlide({
            fullScreenw:true,
            slideLih:420,
            pagingTrigger:'hover',
            slideTime:3000,
            autoPlay:true
          });
        });
        $.ajax({
          url: 'api/index.php',
          type: 'get',
          dataType: 'json',
          data: {qty:4},
          success: function(data){
            // console.log(data);
              $.each(data.dataArr,function(idx,item){
                // console.log(item);
                  let images=[];
                  let str ="";
                  str=item.imgsrc.split("&");
                  // console.log(str);
                  $.each(str,function(idx,item){
                    images.push(item.substr(3));
                    // console.log(images);
                  });
                let html =`<a target="_blank" href="javascript:void(0);" class="sasa_mustcheck_a_odd" data-minid="${item.id}">
                            <div class="sasa_mustcheck_item sasa_mustcheck_item_odd">
                              <img class="sasa_mustcheck_img" src="${images[0]}">
                              <div class="sasa_mustcheck_info">
                                <p class="sasa_mustcheck_title">
                                  ${item.Sname}
                                </p>
                                <p class="sasa_mustcheck_subtit">
                                  ${item.jianshu}
                                </p>
                                <p class="sasa_mustcheck_date">
                                  疯抢价￥${item.curprice}
                                </p>
                                <span class="sasa_mustcheck_btn">立即疯抢</span>
                              </div>
                            </div>
                            </a>`;
                  $("#sasa_mustcheck_container").append(html).find("a:odd").attr("class", "sasa_mustcheck_a_even");
                 
               });
                $("#sasa_mustcheck_container").on("click","a",function(){
                      location.href = "./html/goods.html?" + encodeURI($(this).attr("data-minid"));
                  });
              
            }
        });
        
        $.ajax({
          url: 'api/index.php',
          type: 'get',
          dataType: 'json',
          data: {qty:2},
           success: function(data){
                      // console.log(data);
                        $.each(data.dataArr,function(idx,item){
                          // console.log(item);
                            let images=[];
                            let str ="";
                            str=item.imgsrc.split("&");
                            // console.log(str);
                            $.each(str,function(idx,item){
                              images.push(item.substr(3));
                              // console.log(images);
                            });
                          let html =`<div class="sasa_limit" data-minid="${item.id}">
                                      <a href="javascript:void(0);" target="_blank">
                                      <div class="sasa_limit_item">
                                        <div class="sasa_limit_imgWrapper">
                                          <img class="sasa_limit_img" alt="${item.jianshu}" src="${images[0]}" height="60" width="1920">
                                          <i class="sasa_limit_count"><b>${item.zheshu}<span>折</span></b></i>
                                        </div>
                                        <div class="sasa_limit_info">
                                          <div class="sasa_limit_detail">
                                            <div class="sasa_limit_detail_intro">
                                              <i class="icon iconfont sasa_limit_font_icon"></i>${item.miaoshu}
                                            </div>
                                            <div class="sasa_limit_detail_title">
                                              <b class="yew">香港特快直送 零扣关 </b>
                                                   ${item.Sname}
                                            </div>
                                            <div class="sasa_limit_detail_price">
                                              <div class="sasa_limit_pirce_cur">
                                                <span class="sasa_limit_price_cur_sig">￥</span><span class="sasa_limit_price_cur_num">${item.curprice}</span>
                                              </div>
                                              <div class="sasa_limit_price_old">
                                                <span class="sasa_limit_price_old_num">￥${item.oldprice}</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="sasa_limit_bottom">
                                            <span class="sasa_limit_btn">马上抢</span>
                                          </div>
                                        </div>
                                      </div>
                                      </a>
                                    </div>`;
                                  $(".sasa_limit_container").append(html);
                          });
                          $(".sasa_limit_container").on("click",".sasa_limit",function(){
                                location.href = "./html/goods.html?" + encodeURI($(this).attr("data-minid"));
                            });
            }
        });
        $.ajax({
          url: 'api/index.php',
          type: 'get',
          dataType: 'json',
          data: {qty:8},
           success: function(data){
                      // console.log(data);
                        $.each(data.dataArr,function(idx,item){
                          // console.log(item);
                            let images=[];
                            let str ="";
                            str=item.imgsrc.split("&");
                            // console.log(str);
                            $.each(str,function(idx,item){
                              images.push(item.substr(3));
                            });
                            // console.log(images);
                          let html =` <div class="sasa_new_item " data-minid="${item.id}">
                                      <div class="sasa_new_item_cont">
                                        <div class="sasa_new_imgWrapper">
                                          <a href="javascript:void(0);" target="_blank"><img class="sasa_new_img" height="271" width="271" alt="${item.jianshu}" src="${images[1]}"></a>
                                          <div class="sasa_new_arrival_icon">
                                            <p>
                                              新品<br>
                                              上市
                                            </p>
                                          </div>
                                          <div class="sasa_new_source_icon">
                                            <div class="sasa_new_cty_i sasa_new_cty_i_1">
                                            </div>
                                            <div class="sasa_source_name">
                                              <span class="sasa_new_nation_name">日本品牌</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="sasa_new_intro">
                                          <a href="javascript:void(0);" target="_blank"><b class="yew">
                                                    香港直送                             
                                          </b>${item.miaoshu}</a>
                                        </div>
                                        <div class="sasa_new_price">
                                          <span class="sasa_new_price_cur_sign">￥</span>
                                          <span class="sasa_new_price_cur_num">${item.curprice}</span>
                                          <span class="sasa_new_price_old"><del>￥${item.oldprice}</del></span>
                                        </div>
                                      </div>
                                    </div>`;
                            $(".sasa_new_body").append(html);
                            $(".sasa_new_body .sasa_new_item ").filter(function(i){
                              //这里参数i 是元素在选择出元素数组中的index
                                  if((i+1)%4 == 0){
                                    $(this).addClass("sasa_new_item_forth");
                                  }
                             
                              });
                         });
                            $(".sasa_new_body").on("click",".sasa_new_item",function(){
                                location.href = "./html/goods.html?" + encodeURI($(this).attr("data-minid"));
                            });
                        
                      }
        });

        // 头部购物车
        function topcar(){
             let yonghuming = $.cookie("admin")|| "";
             // console.log(yonghuming);
               $.ajax({
                      url: 'api/topcar.php',
                      type: 'get',
                      dataType: 'json',
                      data: {admin:yonghuming},
                       success: function(data){
                                        let cabianqty=0;
                                          // console.log(data);
                                           let ul = $(".minicart-list");
                                          let html = data.map(function(item){
                                            cabianqty+=parseInt(item.qty);
                                            let images=[];
                                            let str ="";
                                            str=item.imgsrc.split("&");
                                            $.each(str,function(idx,item){
                                                  images.push(item.substr(3));
                                            })
                                            return `<li class="goods-item">
                                                    <div class="goods-pic">
                                                      <a href="javascript:void;">
                                                        <img src="${images[0]}" alt="HABA 优白系列 HABA 润泽柔肤水 G露" ></a>
                                                    </div>
                                                    <div class="goods-info">
                                                      <h3 class="goods-name">
                                                        <a href="javascript:void(0);">
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
                                          ul.html(html);
                                          ul.on("click",".action-delete",function(){
                                             let yonghuming = $.cookie("admin");
                                             var currentGuid = $(this).attr("data-guid");
                                             // console.log(currentGuid);
                                                 $.ajax({
                                                  url: 'api/topcar.php',
                                                  type: 'get',
                                                  dataType: 'json',
                                                  data: {id:currentGuid,admin:yonghuming},
                                                   success: function(data){
                                                              let cabianqty=0;
                                                              let ul = $(".minicart-list");
                                                              let html = data.map(function(item){
                                                                cabianqty+=parseInt(item.qty);
                                                                // console.log(item);
                                                                let images=[];
                                                                  let str ="";
                                                                  str=item.imgsrc.split("&");
                                                                  $.each(str,function(idx,item){
                                                                        images.push(item.substr(3));
                                                                  })
                                                                return `<li class="goods-item">
                                                                        <div class="goods-pic">
                                                                          <a href="javascript:void(0);">
                                                                            <img src="${images[0]}" alt="HABA 优白系列 HABA 润泽柔肤水 G露" ></a>
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
                                                              ul.html(html);
                                                                }
                                                  });
                                          });
                                    }
                      });
       
          };
    });