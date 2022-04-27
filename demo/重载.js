//用于查找
var users = {
    values: [1,2,3,4]
  };
//重载
function addMethod (object, name, fn) {
    //保存原有的
    var old=object[name]
    //重构
    object[name]=function(){
        if(fn.length===arguments.length){
            return fn.apply(this,arguments)
        }else if(typeof old==="function"){
            return old.apply(this,arguments)
        }
    }
  }
 
function find0 () {
    console.log("无参数")
    return this.values[0];
  }
function find1 (a) {
    console.log("参数：",a)
    return this.values.slice(0,2);
  }
function find2 (a,b) {
    console.log("参数：",a,b)
    return this.values.slice(0,-1);
  }
  
  addMethod(users, "find", find0);
  addMethod(users, "find", find1);
  addMethod(users, "find", find2);
  
  // 测试：
  console.log(users.find()); 
  console.log(users.find("Dean")); 
  console.log(users.find("Dean","Edwards")); 
  