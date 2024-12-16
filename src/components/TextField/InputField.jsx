/* eslint-disable react/prop-types */

const InputField = ({nameTitle,className,placeHolder,type,value,onChange,defaultValue}) => {
  return (
    <div>
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-bold capitalize">{nameTitle}</span>
      </div>
      <input
        type={type}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        className={`input  input-bordered w-full ${className}`}
        value={value}
        onChange={onChange}
      />
   
    </label>
  </div>
  )
}

export default InputField