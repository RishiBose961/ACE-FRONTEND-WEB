/* eslint-disable react/prop-types */
const TextArea = ({nameTitle,placeHolder,value,onChange}) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text font-bold capitalize">{nameTitle}</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-40"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      ></textarea>
    </label>
  );
};

export default TextArea;
