import React from 'react'
import { useState } from 'react'
import InputField from './InputField'
import Popup from './Popup'


export default function App() {
  const [values, setValues] = useState([])
  const [pop, setPop] = useState(false)
  const [index, setIndex] = useState(null)
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  return (
    <div>
      <InputField values={values} setValues={setValues} setPop={setPop} setIndex={setIndex} count={count} setCount={setCount} setNum={setNum} num={num}/>
      <Popup values={values} setValues={setValues} pop={pop} setPop={setPop} index={index} setCount={setCount} count={count} setNum={setNum}/>
    </div>
  )
}
