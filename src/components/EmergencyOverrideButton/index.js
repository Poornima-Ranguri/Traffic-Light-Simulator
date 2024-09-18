const EmergencyOverrideButton = ({ onClick }) => {
  return (
    <button
      style={{
        backgroundColor: "#FF0000",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={onClick}
      className="emergency-button"
    >
      Emergency Override
    </button>
  );
};

export default EmergencyOverrideButton;
