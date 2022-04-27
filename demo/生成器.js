function* num(){
    yield 1
    yield 2
    yield 3
    yield 4
    return 5
}

for(let i of num()){
    console.log(i)   //1,2,3,4
}