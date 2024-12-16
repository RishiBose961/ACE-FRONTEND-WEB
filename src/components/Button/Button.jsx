/* eslint-disable react/prop-types */

const Button = ({nameTitle,type}) => {
  return (
    <button className="btn w-20 rounded-full btn-outline btn-accent" type={type}>{nameTitle}</button>
  )
}

export default Button