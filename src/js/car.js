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
                          location.reload();
                          logincar();
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

      
      
    let yonghuming = $.cookie("admin")||"";
    if(yonghuming==""){
      location.href="./login.html";
      return;
    }
    ajax1();
    function ajax1(){
        $.ajax({
            url: '../api/topcar.php',
            type: 'get',
            dataType: 'json',
            data: {admin:yonghuming},
            success: function(data){
                                  let tbody = $("#cartBCDepot tbody");
                                  let tfoot=$("#J_orderPrice tr").not(".ui-carttable-placeholder").find(".fr");
                                  let idxjian =tfoot.find(".items-quantity");
                                  let idxjia =tfoot.find(".ui-cart-total");
                                  let html = data.map(function(item){
                                            let str ="";
                                            str=item.imgsrc.split("&");
                                            return `<tr class="J_cart-product" data-guid="${item.id}">
                                                      <td class="ui-carttable-td1">
                                                        <div class="ui-cart-pcheckbox">
                                                          <input class="J-select-goods-hkbc " type="checkbox" name="selectcb">
                                                        </div>
                                                        <div class="ui-cart-pimg">
                                                          <a href="javascript:void(0);" target="_blank">
                                                            <img src="${str[0]}" alt="">
                                                          </a>
                                                        </div>
                                                      </td>
                                                      <td class="ui-carttable-td2">
                                                        <div>
                                                          <a href="javascript:void(0);" target="_blank">${item.Sname}
                                                           </a>
                                                          
                                                        </div>
                                                        <div class="p_special none"><i class="tipyelbox"></i></div>
                                                        <ul class="J-cartTabelPromotion ui-carttable-promotions">
                                                                      </ul>
                                                        <div class="J-cartTableGoodsGifts">
                                                                      </div>
                                                      </td>
                                                      <td class="J-price">￥${item.curprice}</td>
                                                      <td>
                                                        <div class="p-quantity">
                                                          <a href="javascript:void(0);" class="btn-decrease">-</a>
                                                          <input type="text" value="${item.qty}" old="${item.qty}">
                                                          <a href="javascript:void(0);" class="btn-increase">+</a>
                                                        </div>
                                                                  </td>
                                                      <td class="J-subtotal ui-color-pink">
                                                      ￥${item.curprice*item.qty}          </td>
                                                      <td>
                                                        <a href="javascript:void(0);" class="J-btnDelete ui-carttable-action">删除</a>
                                                        <div class="bonded_prompt">商品已包税</div>
                                                      </td>
                                                    </tr>`
                                  }).join('');
                                  tbody.html(html);

                                  (function(){
                                        let quanxuan = $("#BCDepotCheckbox");
                                        let danxuan = $("*.J-select-goods-hkbc");
                                        quanxuan.on("click",function(){
                                            let zhuangtai = $(this).prop("checked");
                                            $.each(danxuan,function(idx,item){
                                                danxuan.prop("checked",zhuangtai);
                                                yunsuan();
                                            })
                                        });
                                        danxuan.on("click",function(){
                                            for(var i=0;i<danxuan.length;i++){
                                                if(!danxuan[i].checked){
                                                  break;
                                                }
                                            }
                                            if(i===danxuan.length){
                                                quanxuan.prop("checked",true);
                                            }else{
                                                quanxuan.prop("checked",false);
                                            }
                                            yunsuan();
                                        });
                                  })();

                                  yunsuan();
                                  function yunsuan(){
                                      let input = $(".J_cart-product input:checked");//获取复选框选中的元素
                                      let jiage=0;
                                        let zongshu=0;
                                      $.each(input,function(idx,item){
                                        jiage += parseInt($(this).closest(".J_cart-product").children(".J-subtotal").text().replace(/[^0-9]/g, ""));
                                        zongshu+=parseInt($(this).closest(".J_cart-product").find("input[ type='text' ]").val());
                                      })
                                       idxjian.text(zongshu);
                                       idxjia.text(`￥${jiage}`);
                                  };
                                  //删除单条
                                  tbody.on("click",".J-btnDelete",function(){
                                     let yonghuming = $.cookie("admin");
                                     var currentGuid = $(this).closest(".J_cart-product").attr("data-guid");
                                         $.ajax({
                                          url: '../api/topcar.php',
                                          type: 'get',
                                          dataType: 'json',
                                          data: {id:currentGuid,admin:yonghuming},
                                           success: function(data){
                                                          if(data){
                                                            ajax1();
                                                            topcar();
                                                          }
                                                        }
                                          });
                                  });
                                  //删除{a:data}为点击时候传入的参数
                                  var shuliang = $(".p-quantity");
                                  shuliang.find(".btn-decrease").on("click",{a:data},function dirlist(ev){
                                        let listdata = ev.data;
                                        let Aqty = $(this).siblings("input[ type='text' ]");
                                        let old =Aqty.attr("old");
                                        let guid = $(this).closest(".J_cart-product").attr("data-guid");
                                        let sli = Aqty.val()-1;
                                            if(sli<1){
                                              sli=1;
                                            }
                                              Aqty.val(sli);
                                              let carArr ={};
                                        $.each(listdata,function(idx,item){
                                            $.each(item,function(idx,item){
                                               if(item.id==guid){
                                                carArr=item;
                                                carArr.qty=Aqty.val()-old;
                                              }
                                            });
                                        });
                                        duibi(Aqty.val(),old,carArr);
                                        yunsuan();
                                  })
                                  //添加
                                  shuliang.find(".btn-increase").on("click",{a:data},function dlist(ev){
                                          let listdata = ev.data;
                                          let Bqty = $(this).siblings("input[ type='text']");
                                          let old =Bqty.attr("old");
                                          let guid = $(this).closest(".J_cart-product").attr("data-guid");
                                          let bli = parseInt(Bqty.val())+1;
                                              if(bli>36){
                                                bli=36;
                                              }
                                          Bqty.val(bli);
                                          let carbrr ={};
                                          $.each(listdata,function(idx,item){
                                                 $.each(item,function(idx,item){
                                                    if(item.id==guid){
                                                      carbrr=item;
                                                      carbrr.qty=Bqty.val()-old;
                                                    }
                                                });
                                          });
                                          duibi(Bqty.val(),old,carbrr);  
                                          yunsuan();
                                  });
                    }
        });
    };
    //清空购物车
    $("#J_actionClean").on("click",function(){
       let yonghuming = $.cookie("admin")||"";
          $.ajax({
                url: '../api/removercar.php',
                type: 'get',
                dataType: 'json',
                data: {removecar:"yes",admin:yonghuming},
                 success: function(data){
                                if(data){
                                    ajax1();
                                    topcar();
                                }
                          }
              });
    });

    $(".btn").on("click",function(){
      // console.log($(this));
      let str ="";
      let input = $(".J_cart-product input:checked");
      $.each(input,function(idx,item){
        str+= $(this).closest(".J_cart-product").attr("data-guid")+"&";
      })
      event.preventDefault();
      location.href = "./jiesuan.html?"+encodeURI(str);
    })
    //增加减少商品时候判断，old存储旧值，如若不相等更新数据
    function duibi(value,old,carArr){
        if(old!=value){
              $.ajax({
                url: '../api/car.php',
                type: 'get',
                dataType: 'json',
                data: {
                    Sname: carArr.Sname,
                    admin: carArr.admin,
                    curprice: carArr.curprice,
                    id: carArr.id,
                    imgsrc: carArr.imgsrc,
                    jianshu: carArr.jianshu,
                    miaoshu: carArr.miaoshu,
                    oldprice: carArr.oldprice,
                    qty: carArr.qty,
                    zheshu: carArr.zheshu
                },
                 success: function(data){
                                if(data){
                                  ajax1();
                                  topcar();
                                }
                              }
                });
        }
    };
      //头部购物车
   function topcar(){
             let yonghuming = $.cookie("admin")|| "";
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
                                             let yonghuming = $.cookie("admin");
                                             var currentGuid = $(this).attr("data-guid");
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
                                                              ajax1();
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