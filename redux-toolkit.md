# redux toolkit

## immer in redux
+ 1、直接改状态本身；2、返回新对象；两种不能在同一个函数中使用,即一个函数中，不能直接改变状态（可变更新），同时又return
+ 但可以使用不可变更新来完成部分工作，然后通过“变异”保存结果。
+ 箭头函数中：容易破坏上面规则（默认返回）,解决办法：1、()=> void 2、()=>{}
+  Resetting and Replacing State 
   + 不能直接state = someValue, 这既不会改变内存中现有的状态对象/数组，
也不会返回全新的值，因此 Immer 不会进行任何实际更改
   + 办法：直接在reducers函数中 return newValue
   + 调试：console.log(current(state))
+ 坑：
 不会跟踪对原始数据的直接修改


 ## hooks
 #### useSelector
 #### const result: any = useSelector(selector: Function, equalityFn?: Function)

 + 当触发一个dispatch, useSelector对比之前的结果，如果不同则会使组件re-render
 + 注意 useSelector 默认使用===比较，非浅对比，connect()使用浅比较
 + redux和react一样使用批量更新，所以一个dispatch导致同一个组件中多个useSelector改变，也只执行一次render
 + 因为useSelector只是 === 比较，所以当要取selector函数返回object类型时，如果不做任何处理，会使缓存失效。解决办法：
   +  拆开使用多useSelector
   +  使用 Reselect，或者使用memoized的selector
   +  可选参数中使用shallowEqual
  
  ```js
  import { shallowEqual, useSelector } from 'react-redux'
  const selectedData = useSelector(selectorReturningObject, shallowEqual)
  ``` 

## 例子
####  Using memoizing selectors
memoizing selectors (e.g. created via createSelector from reselect) 
When the selector does only depend on the state, simply ensure that it is declared outside of the component so that the same selector instance is used for each render
简单在外部组件声明：

``` jsx
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const makeSelectCompletedTodosCount = () =>
  createSelector(
    (state) => state.todos,
    (_, completed) => completed,// 使用组件中的props
    (todos, completed) =>
      todos.filter((todo) => todo.completed === completed).length
  )

export const CompletedTodosCount = ({ completed }) => {
  // 如果在多个组件中使用，配合useMemo使用返回自有的selector instance
  const selectCompletedTodosCount = useMemo(makeSelectCompletedTodosCount, [])

  const matchingCount = useSelector((state) =>
    selectCompletedTodosCount(state, completed)
  )

  return <div>{matchingCount}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <CompletedTodosCount completed={true} />
      <span>Number of unfinished todos:</span>
      <CompletedTodosCount completed={false} />
    </>
  )
}
```

reselect：createSelector前面的参数为Selector取多个值，combiner参数接受前面返回的多个值
```ts
export function createSelector<S, R1, R2, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector<S, T, (res1: R1, res2: R2) => T>;
```

## useDispatch
This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
配合useCallback使用：
```jsx
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()
  const incrementCounter = useCallback(
    () => dispatch({ type: 'increment-counter' }),
    // / Safe to add dispatch to the dependencies array,dispatch不会变
    [dispatch]
  )

  return (
    <div>
      <span>{value}</span>
      <MyIncrementButton onIncrement={incrementCounter} />
    </div>
  )
}

export const MyIncrementButton = React.memo(({ onIncrement }) => (
  <button onClick={onIncrement}>Increment counter</button>
))
```
The `dispatch` function reference will be stable as long as the same store instance is being passed to the <Provider>. Normally, that store instance never changes in an application.

## useStore
This hook returns a reference to the same Redux store that was passed in to the <Provider> component.

## createAsyncThunk