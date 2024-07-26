import '../styles/chooseChar.css';

function ChooseChar() {
  console.log("test")
  return (
    <div className="choosechar-container">
      <h2>Choose Your Character, *username*</h2>
      <div className="choosechar-grid">
        <div className="char-card">
          <img src="/path/to/warrior-image.png" alt="Warrior" />
          <p>Warrior</p>
        </div>
        <div className="char-card">
          <img src="/path/to/wizard-image.png" alt="Wizard" />
          <p>Wizard</p>
        </div>
        <div className="char-card">
          <img src="/path/to/archer-image.png" alt="Archer" />
          <p>Archer</p>
        </div>
        <div className="char-card">
          <img src="/path/to/rogue-image.png" alt="Rogue" />
          <p>Rogue</p>
        </div>
      </div>
    </div>
  );
}

export default ChooseChar;