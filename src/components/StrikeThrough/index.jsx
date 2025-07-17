const StrikeThrough = ({ pattern }) => {
  const getStrikePattern = () => {
    switch (pattern) {
      case 0:
        return {
          transform: `rotate(90deg)`,
          top: "-7rem",
          left: "10.5rem",
        };
      case 1:
        return {
          transform: `rotate(90deg)`,
          top: "-0.5rem",
          left: "10.5rem",
        };
      case 2:
        return {
          transform: `rotate(90deg)`,
          top: "5.9rem",
          left: "10.5rem",
        };
      case 3:
        return {
          left: "4rem",
          top: "0rem",
          height: "21.5rem",
        };

      case 4:
        return {
          left: "10.45rem",
          top: "0rem",
          height: "21.5rem",
        };
      case 5:
        return {
          left: "17rem",
          top: "0rem",
          height: "21.5rem",
        };
      case 6:
        return {
          transform: `rotate(135deg)`,
          top: -90,
          bottom: -50,
          left: "10.25rem",
          height: "32rem",
        };
      case 7:
        return {
          transform: `rotate(45deg)`,
          top: -85,
          bottom: -50,
          left: "10.25rem",
          height: "32rem",
        };
      default:
        return {
          display: "none",
        };
    }
  };
  const strikePattern = getStrikePattern();
  return (
    <div
      className="h-90 border border-black-1500 absolute"
      style={strikePattern}
    />
  );
};

export default StrikeThrough;
