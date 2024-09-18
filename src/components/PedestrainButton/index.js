const PedestrianButton = ({ onClick }) => {
  return (
    <button
      style={{
        backgroundColor: "#4CAF50",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={onClick}
      className="request-button"
    >
      Request Crossing
    </button>
  );
};

export default PedestrianButton;
