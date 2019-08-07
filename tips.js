!(function(){    
    var tipsObj = function(){
        this.layer  = document.getElementById("layer");
        this.logbtn  = document.getElementById("logbtn");
        this.inputPhone  = document.getElementById("inputPhone");
        this.sendbtn  = document.getElementById("sendbtn");
        this.inputnum  = document.getElementById("inputnum");
        this.layer_span  = document.getElementById("layer_span");
        // layer 关闭
        this.count;
        // 获取验证码的点击数
        this.flag;

        // 定时器
        this.timer = null;

        fns.fire.apply(this)
    }
    var fns = {
        
        TipsFn:function(){
            // 手机号判断
            var inputPhoneReg = /^1[3456789]\d{9}$/;
            // 验证码判断
            var inputnumReg = /^[\d]{4}$/;    
            var tipsObj=this;
            
            flag = 0;
            console.log("当前发送验证码次数" + flag);

            // 监听获取验证码点击数
            sendbtn.addEventListener("click",function(){
                // flag = 0;
                flag++;
                console.log("当前发送验证码次数" + flag);
                
            }),
           
            logbtn.addEventListener("click",function(){                  
                //console.log("执行弹出");

                // 1.未输入手机号点击登录
                if(inputPhone.value =="") {                       
                        console.log("显示弹出1");
                        layer.style.display="block";
                        fns.timeFn.apply(tipsObj);
                        return false;
                }
                // 2.输入不合法手机号 点击登录
                else if((inputPhone.value.length > 0 && inputPhone.value.length < 11) || !(inputPhoneReg.test(inputPhone.value))){
                    console.log("显示弹出2");
                    layer.style.display="block";
                    layer_span.innerHTML="请输入合法手机号";
                    fns.timeFn.apply(tipsObj);
                    return false;
                }
                // 3.合法手机号，未获取验证码，点击登录
                else if(inputPhoneReg.test(inputPhone.value) && flag == 0){
                    console.log("显示弹出3");
                    layer.style.display="block";
                    layer_span.innerHTML="请获取验证码";
                    fns.timeFn.apply(tipsObj);
                    return false;
                }
                // 4.合法手机号，已经获取验证码，判断验证码不正确，点击登录
                else if(inputPhoneReg.test(inputPhone.value) && flag > 0 && !(inputnumReg.test(inputnum.value))){
                    console.log("显示弹出4");
                    layer.style.display="block";
                    layer_span.innerHTML="验证码输入错误";
                    fns.timeFn.apply(tipsObj);
                    return false;
                }
                //5.验证码输入正确 提交表单
                else if(inputnumReg.test(inputnum.value) && inputPhoneReg.test(inputPhone.value) && flag > 0 ){
                    console.log("显示弹出5");
                    layer.style.display="block";
                    layer_span.innerHTML="登录成功";
                    fns.timeFn.apply(tipsObj);
                    return false;
                }

            })
            sendbtn.addEventListener("click",function(){

                if(inputPhone.value =="") {                       
                    console.log("显示弹出1");
                    layer.style.display="block";
                    fns.timeFn.apply(tipsObj);
                    return false;
                    
            }
                
            })
            
        },
        countDownFn :function(){
            var inputPhoneReg = /^1[3456789]\d{9}$/;
            var counts = 10;
            var sendObj = this;
            console.log("执行倒计时");
            // 绑定点击事件
            sendbtn.addEventListener("click",function(){
                if(inputPhone.value =="" || !(inputPhoneReg.test(inputPhone.value))) {                       
                    console.log("显示弹出1");
                    layer.style.display="block";
                    fns.timeFn.apply(tipsObj);
                    return false;
                }else{
                    var test=setInterval(function(){   
                    if(counts == 0){
                        console.log("可获取验证码");    
                        sendbtn.removeAttribute("disabled");    
                        sendbtn.value="获取验证码";          
                        counts = 10;
                        clearInterval(test);
                                                    
                    }else{                               
                        sendbtn.setAttribute("disabled", true);
                        sendbtn.value="重新发送(" + counts + ")";  
                        counts--;
                        //console.log(count);       
                    }
                    
                },1000);
                
                }
                
            })

               
        },

        // 定时器
        timeFn:function(){
            var tipsObj=this;
            count = 5;
            tipsObj.timer = setInterval(function(){
                count--;
                // console.log(count);
                if(count == 0){
                    layer.style.display="none";
                    clearInterval(tipsObj.timer);                 
                }
                return false;
            },1000);
        },

        fire:function(){
            fns.TipsFn.apply(this);
            fns.timeFn.apply(this);
            fns.countDownFn.apply(this);
        }
    }


    window.Tips= tipsObj;
})();