
var json = '{"a":"1", "b":2}';
//eval
var obj=eval("("+json+")")
//new Function
var obj1=(new Function('return'+json))()

