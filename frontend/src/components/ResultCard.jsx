import "./ResultCard.css";

const ResultCard = () => {
  return (
    <div className="result-card">
      <h3 className="result-title">
        Results: Mula River, Aundh
      </h3>

      <p className="result-status unsafe">
        Status: UNSAFE ❌
      </p>

      <div className="result-section">
        <p className="result-heading">Issues:</p>
        <ul className="result-list">
          <li>High BOD</li>
          <li>Low Dissolved Oxygen</li>
        </ul>
      </div>

      <div className="result-section">
        <p className="result-heading">
          Recommended Actions:
        </p>
        <ul className="result-list green">
          <li>Boil water before use</li>
          <li>Install proper filtration</li>
          <li>Avoid direct consumption</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultCard;