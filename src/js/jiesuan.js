jQuery(function($){
      $('#pageHeader').load('./top.html .topbar',function(){
         (function logincar(){
                     let login1 = $("#login1");
                      let login2 = $("#login2");
                      login1.find("a").attr("href","login.html");
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
          
         function qingdan(data){
            var params = decodeURI(location.search).slice(1,-1);
            params=params.split("&");
            var obj=[];
            for(var i=0;i<data.length;i++){
              for(var j=0;j<params.length;j++){
                if(data[i].id==params[j]){
                  obj.push(data[i]);
                }
              }
            }
            let tbody = $(".cart-exchange");
            let zongjia = 0;
            $.each(obj,function(idx,item){
                let str ="";
                str=item.imgsrc.split("&");
                let html =` <tr class="cart-item" data-guid="${item.id}">
                            <td class="p-info">
                              <div class="p-title cartproimg">
                                <a  href="./goods.html?${item.id}"><img src="${str[0]}" class="gift-pic">${item.Sname}</a>
                              </div>
                            </td>
                            <td class="p-price">￥${item.curprice}</td>
                            <td class="p-num">${item.qty}</td>
                            <td class="p-subtotal">￥${item.curprice*item.qty}</td>
                          </tr>`;
                      tbody.append(html);
                      zongjia+=parseInt(item.curprice*item.qty);
            });
            $(".goods").find("span").not(".label").text("￥"+zongjia);
            $(".price").text("￥"+zongjia);
            $(".total_amount").text("￥"+zongjia);

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
                                          console.log(data);
                                           qingdan(data);
                                          let cabianqty=0;
                                           let ul = $(".minicart-list");
                                          let html = data.map(function(item){
                                            cabianqty+=parseInt(item.qty);
                                            let str ="";
                                            str=item.imgsrc.split("&");
                                            return `<li class="goods-item">
                                                    <div class="goods-pic">
                                                      <a href="javascript:void(0);">
                                                        <img src="${str[0]}" alt="" ></a>
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

 })