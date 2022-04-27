function myInstanceof(a,b){
        let left=a.__proto__
        let right=b.prototype
       while(true){
           if(left==right){
               return true
           }
           if(left==null){
               return false
           }
           left=left.__proto__
       }
    }