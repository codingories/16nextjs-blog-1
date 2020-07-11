import Head from 'next/head'
import React from "react"

export default function Index() {
  return (
    <div>
      <h1>标题1</h1>
      <p>段落</p>
      <style jsx>{`
        h1{
        color:red;
        }
      `}
      </style>
      <style jsx global>{`
       body{
        background-color:blue;
       }
`
      }</style>
    </div>
  )
}
