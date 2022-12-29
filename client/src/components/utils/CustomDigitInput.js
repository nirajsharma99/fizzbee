function CustomDigitInput({ id, handleOp, min, max, step, value }) {
    const handleChange = (e) => {
        let input = document.getElementById(id);
        let minimum = input.getAttribute("min");
        let maximum = input.getAttribute("max");
        let step = parseFloat(input.getAttribute("step"));
        let val = parseFloat(input.getAttribute("value"));

        if (e.target.className === 'increment') {
            let newValue = val + step;
            if (newValue >= minimum && newValue <= maximum)
                handleOp(newValue);
        } else if (e.target.className === 'decrement') {
            let newValue = val - step;
            if (newValue >= minimum && newValue <= maximum)
                handleOp(newValue);
        }
    }
    return (
        <div className='digit-input-container'>
            <button className="decrement" onClick={handleChange}> - </button>
            <input className='digit-input' type="number" min={min} max={max} step={step} value={value || 0} id={id} readOnly />
            <button className="increment" onClick={handleChange}> + </button>
        </div>
    )
}
export default CustomDigitInput;