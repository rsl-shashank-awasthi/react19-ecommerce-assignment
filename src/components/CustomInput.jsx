export default function CustomInput({ label, id, ref, ...props }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} ref={ref} {...props} />
    </div>
  );
}