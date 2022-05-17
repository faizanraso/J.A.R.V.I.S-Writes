import React from "react";
import '../styles/Dropdown.css'

function Dropdown(props: { onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined; engine: string; }) {
  return (
    <div className="dropdown-menu">
      <label htmlFor="engine">Engine:</label>
      <select defaultValue={props.engine} name="engine" id="engine" onChange={props.onChange}>
        <option value="text-curie-001">text-curie-001</option>
        <option value="text-babbage-001">text-babbage-001</option>
        <option value="text-davinci-001">text-davinci-001</option>
        <option value="text-davinci-002">text-davinci-002</option>
      </select>
    </div>
  );
}

export default Dropdown;
