const StrikeThrough = ({ pattern }) => {
  const getStrikePattern = () => {
    switch (pattern) {
      case 0:
        return {
          transform: `rotate(90deg)`,
          bottom: 0,
          top: 0,
          left: "2.7rem",
        };
      case 1:
        return {
          transform: `rotate(90deg)`,
          bottom: 0,
          top: 0,
          left: "7.4 rem",
        };
      case 2:
        return {
          transform: `rotate(90deg)`,
          bottom: 0,
          top: 0,
          left: "11.75rem",
        };
      case 3:
        return {
          transform: `rotate(90deg)`,
          bottom: "4.5rem",
          left: "7.4rem",
        };

      case 4:
        return {
          transform: `rotate(90deg)`,
          bottom: 0,
          top: 0,
          left: "7.4rem",
        };
      case 5:
        return {
          transform: `rotate(90deg)`,
          top: "4.5rem",
          left: "7.4rem",
        };
      case 6:
        return {
          transform: `rotate(135deg)`,
          top: -40,
          bottom: -30,
          left: "7.4rem",
          height: "20rem",
        };
      case 7:
        return {
          transform: `rotate(45deg)`,
          top: -40,
          bottom: -30,
          left: "7.4rem",
          height: "20rem",
        };
      default:
        return "0deg";
    }
  };
  const strikePattern = getStrikePattern();
  return (
    <div
      className="h-60 border border-black-1500 absolute"
      style={strikePattern}
    />
  );
};

export default StrikeThrough;
