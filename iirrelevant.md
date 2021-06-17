## immer in redux
+ 1、直接改状态本身；2、返回新对象；两种不能在同一个好书函数中使用即一个函数中，不能直接改变状态（可变更新），同时又return
+ 但可以使用不可变更新来完成部分工作，然后通过“变异”保存结果。
+ 箭头函数中：容易破坏上面规则（默认返回）,解决办法：1、()=> void 2、()=>{}
+  Resetting and Replacing State 
  + + 不能直接state = someValue, 这既不会改变内存中现有的状态对象/数组，
也不会返回全新的值，因此 Immer 不会进行任何实际更改
 + + 办法：直接在reducers函数中 return newValue
 + + 调试：console.log(current(state))
+ 坑：
 不会跟踪对原始数据的直接修改