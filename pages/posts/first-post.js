import React, {useCallback} from "react"
import styles from 'styles/first-post.module.css'

console.log('执行了2')
export default function FirstPost(){
  const clickMe = useCallback(()=>{
    console.log('you click me')
  },[]) // useCallback 避免每次创建都执行
  return (
    <>
      <div>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            内容
          </div>
        </div>
      </div>
    </>
  )
}
