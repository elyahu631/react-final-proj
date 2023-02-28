

export default function CHintNavigation(props) {
  return (
   <div style={{
    fontSize:"12px",
    textAlign:"center",
    color: props.color,
    fontWeight:"500"
   }}>  
    {props.hint} <br />
    {props.hint2}
   </div>
  );
}
