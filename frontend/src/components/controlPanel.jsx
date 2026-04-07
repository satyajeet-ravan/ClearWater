import "./ControlPanel.css";

const ControlPanel = () => {
  return (
    <div className="control-panel">

      <select className="control-select">
        <option>State: Maharashtra</option>
      </select>

      <select className="control-select">
        <option>District: Pune</option>
      </select>

      <select className="control-select">
        <option>Water Usage: Drinking</option>
      </select>

      <button className="control-button">
        Check Quality
      </button>

    </div>
  );
};

export default ControlPanel;