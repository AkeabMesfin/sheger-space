function Input(props) {
    return (
        <input id={props.id}  type={props.type} name={props.name} placeholder={props.placeholder} className={props.className} value={props.value} onChange={props.onChange}/>
    )
}

export default Input;