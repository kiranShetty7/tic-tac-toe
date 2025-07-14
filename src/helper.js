export const decisionMaker = () => {
  return Math.ceil(Math.random() * 100) % 2 === 0;
};

export const randomizedSelectionFromArray = (lengthOfArray) => {
  return Math.floor(Math.random() * lengthOfArray);
};
