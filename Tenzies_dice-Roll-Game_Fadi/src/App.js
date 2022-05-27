import "./styles.css";

import React from "react"
import Dice from "./Dice"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import {useEffect, useState} from "react"

export default function App(){
    
    const randomNumArray=()=> new Array(10).fill(0).map(()=>{
    return(
        {
            value:Math.floor(Math.random()*6 +1),
            id:nanoid(),
            isHeld:false
            }
    )
})

    const [dice,setDice]=useState(randomNumArray())
    const[tensies,setTensies]=useState(false)
    const [numOfRolls,setNumOfRolls]=useState(0)
    useEffect(()=>{
    const firstItem=dice[0].value
    const allHeld=dice.every(dice=>dice.isHeld===true)
    const allSame=dice.every(dice=>dice.value===firstItem)
    if(allHeld && allSame){
         setTensies(true)
         console.log("won")
    }
    
},[dice])
  
    const holdDice=(id)=> setDice((prev)=>(prev.map(dic => (dic.id===id?{...dic,isHeld:!dic.isHeld}:dic))))
        
    
    
     const rolldice=()=>{
         setNumOfRolls((prev)=>prev+1)
         if(!tensies){
        setDice((prev)=>prev.map(dice=>dice.isHeld?dice: {
            value:Math.floor(Math.random()*6 +1),
            id:nanoid(),
            isHeld:false
        }))}else{
            setDice(randomNumArray())
            setTensies(false)
        }
        
    }
    
    const diceElement=dice.map((num) =>
     <Dice
        value={num.value}
        key={nanoid()}
        isHeld={num.isHeld}
       
        holdDice={()=>holdDice(num.id)}
    />)
    
    
   
    
    
    return(
        
        <main>
        {tensies && <Confetti />}
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
            {diceElement}
             </div>
             <h4>  {!tensies? `Number of Rolls:${numOfRolls}` : `You won with ${numOfRolls} rolls`}</h4>
             <button onClick={rolldice}> {!tensies? "Roll Dice":"New Game"}</button>
        </main>
       
        
    )
}
