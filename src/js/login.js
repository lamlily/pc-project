jQuery(function($){
               // 点击logo提爱哦转到首页；
                $(".logo").click(function(){
                    location.href="http://localhost:8099";
                });

                // var username=$('#Yuname').val();
                // username=getUrl("name");
                // $('#Yuname').val(username);


                // 登录
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
                    $('.topbar img').each(function(){
                        var arr = "../";
                        arr += $(this).attr('src');
                         $(this).attr('src',arr);
                    });
               });
                $('.action-verifycode').codeVerify({
                    type : 1,
                    width : '80px',
                    height : '36px',
                    fontSize : '12px',
                    codeLength : 4,
                    btnId : 'check-btn',
                    success : function() {
                         event.preventDefault();
                      let Yuname = $("#Yuname").val().trim();
                       let Ypassword =$('#Ypassword').val().trim();
                       if(Yuname==""){
                        alert("请输入用户名");
                        return false;
                       }else if(Ypassword==""){
                        alert("请输入密码");
                        return false;
                       }
                        $.ajax({
                            url: '../api/denglu.php',
                            type: 'post',
                            dataType: 'text',
                            data:{Yname:Yuname ,mima:Ypassword},

                            success: function(data){
                                console.log(data);
                                if(data==Yuname){
                                    $.cookie("admin",data,{path:"/"});
                                    location.href = "../index.html";


                                }else{
                                    alert("用户或密码错误")
                                }
                            },
                            error: function(){
                                alert("出错了");
                            }
                        });
                         return false;
                    },
                    error : function() {
                         event.preventDefault();
                         let Yuname = $("#Yuname").val().trim();
                       let Ypassword =$('#Ypassword').val().trim();
                         if(Yuname==""){
                            alert("请输入用户名");

                            return false;
                           }else if(Ypassword==""){
                            alert("请输入密码");
                            return false;
                           }
                        alert('验证码不匹配！');
                        return false;
                    }
                });
                

                // 注册
                $("#zuce").on("click",function(){
                    $(".sing-page").load("./sing-page-riget.html",function(){
                        var Yuname = $("#Yuname1");
                        var Ypassword =$('#zucemima1');
                        var Ypassword1=$('#zucemima2');
                        var _Yuname = Yuname.val().trim();
                        var _Ypassword =Ypassword.val().trim();
                        var _Ypassword1=Ypassword1.val().trim();
                        
                             Yuname.blur(function(){
                              _Yuname = Yuname.val().trim();
                                 if(_Yuname==""){
                                    alert("请输入用户名");
                                    return false;
                               }else if(_Yuname!=" "){
                                    if(_Yuname.length>4){
                                        $("#_build_tips_inline_error_1").css("display","none");
                                           $.ajax({
                                            url: '../api/zhuce1.php',
                                            type: 'post',
                                            dataType: 'text',
                                            data:{Yname:_Yuname},
                                            success: function(data){
                                                if(data=="true"){
                                                    alert("该用户名已被占用");
                                                }
                                            },
                                            error: function(){
                                                alert("出错了");
                                            }
                                        });
                                    }else{
                                        $("#_build_tips_inline_error_1").css("display","block");
                                    }
                               }
                           });
                           
                          Ypassword.blur(function(){
                            _Ypassword =Ypassword.val().trim();
                            if(_Ypassword.length<6||_Ypassword.length>16){
                                $("#_build_tips_inline_error_2").css("display","block");
                            }else{
                                 $("#_build_tips_inline_error_2").css("display","none");
                            }
                          });
                          Ypassword1.blur(function(){
                              _Ypassword1=Ypassword1.val().trim();
                              if(_Ypassword != _Ypassword1){
                                    $("#_build_tips_inline_error_3").css("display","block");
                               }else{
                                    $("#_build_tips_inline_error_3").css("display","none");
                               }
                          });
                      
                          

                         var btnAgree = $('#license');
                                btnAgree.on("click",function(){
                                   
                                    $("#check-btn")[0].disabled = !btnAgree[0].checked;
                                });
                         $('.action-verifycode').codeVerify({
                            type : 1,
                            width : '80px',
                            height : '36px',
                            fontSize : '12px',
                            codeLength : 4,
                            btnId : 'check-btn',
                            success : function() {
                                event.preventDefault();
                                _Yuname = Yuname.val().trim();
                                _Ypassword =Ypassword.val().trim();
                                _Ypassword1=Ypassword1.val().trim();
                                if(_Yuname==""){
                                    $("#_build_tips_inline_error_1").css("display","block");
                                    return;
                                } 
                                if(_Ypassword.length<6||_Ypassword.length>16){
                                      $("#_build_tips_inline_error_2").css("display","block");
                                    return;
                                }else{
                                    $("#_build_tips_inline_error_2").css("display","none");
                                }
                                if(_Ypassword1=""||_Ypassword != _Ypassword1){
                                     $("#_build_tips_inline_error_3").css("display","block");
                                    return;
                                }
                                $.ajax({
                                    url: '../api/zhuce.php',
                                    type: 'post',
                                    dataType: 'text',
                                    data:{fal:_Yuname ,con:_Ypassword},
                                    success: function(data){
                                       if(data=="true"){
                                        alert("注册成功");
                                        location.href = "../html/login.html?name="+_Yuname;


 
                                       }
                                    },
                                    error: function(){
                                        alert("出错了");
                                    }
                                });
                                 return false;
                            },
                            error : function() {
                                alert('验证码不匹配！');
                                event.preventDefault();
                                return false;
                            }
                        });
                    });
                })
});