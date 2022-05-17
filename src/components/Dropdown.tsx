import React from "react";
import '../styles/Dropdown.css'

function Dropdown(props: { onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined; engine: string; }) {
  return (
    <div className="dropdown-menu">
      <label htmlFor="engine">Engine:</label>
      <select name="engine" id="engine" onChange={props.onChange}>
        <option value="text-curie-001" selected={props.engine === "text-curie-001" ? true : false}>text-curie-001</option>
        <option value="text-davinci-002" selected={props.engine === "text-davinci-002" ? true : false}>text-davinci-002</option>
        <option value="text-davinci-001" selected={props.engine === "text-davinci-001" ? true : false}>text-davinci-001</option>
        <option value="text-babbage-001" selected={props.engine === "text-babbage-001" ? true : false}>text-babbage-001</option>
      </select>
    </div>
  );
}

export default Dropdown;
