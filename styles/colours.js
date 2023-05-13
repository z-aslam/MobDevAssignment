export let colours = {
  green: "#5b1",
  darkGreen: "#4a2",
  lightGrey: "#777",
  black: "#000",
  white: "#FFF",
  lighterGrey: "#AAA",
  offWhite: "#FDFDFD",
};

export const updateColour = (darkMode) => {
  if (darkMode) {
    colours = {
      green: "#5b1",
      darkGreen: "#4a2",
      lightGrey: "#777",
      black: "#fdfdfd",
      white: "#303134",
      lighterGrey: "#AAA",
      offWhite: "#202124",
      error: "#FF0000",
    };
  } else {
    colours = {
      green: "#5b1",
      darkGreen: "#4a2",
      lightGrey: "#777",
      black: "#000",
      white: "#FFF",
      lighterGrey: "#AAA",
      offWhite: "#FDFDFD",
    };
  }
};
