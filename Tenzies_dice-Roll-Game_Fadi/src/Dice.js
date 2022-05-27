export default function Dice(props){
  const dotsarray=new Array(props.value).fill(0).map(() => <span className={` dot dot${props.value}`}></span>)
  
 let styles={background:props.isHeld? "green":"white"}
  return(
      
      
      <div className="dice" onClick={props.holdDice} 
      style={styles} >
      
          {dotsarray}
          </div>
      
  )
}