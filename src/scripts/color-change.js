const colorChanger = (() => {
  const utils = {
    randInt(i) {
      return Math.floor(Math.random() * i);
    },
    sample(arr) {
      return arr[this.randInt(arr.length)];
    },
  };

  const themes = [
    {
      type: "red900",
      primaryColor: "#b71c1c",
      textColor: "white",
    },
    {
      type: "pink800",
      primaryColor: "#ad1457",
      textColor: "white",
    },
    {
      type: "purple900",
      primaryColor: "#4a148c",
      textColor: "white",
    },
    {
      type: "deeppurple900",
      primaryColor: "#311b92",
      textColor: "white",
    },
    {
      type: "indigo700",
      primaryColor: "#303f9f",
      textColor: "white",
    },
    {
      type: "blue900",
      primaryColor: "#0d47a1",
      textColor: "white",
    },
    {
      type: "lightblue900",
      primaryColor: "#01579b",
      textColor: "white",
    },
    {
      type: "cyan900",
      primaryColor: "#006064",
      textColor: "white",
    },
    {
      type: "teal900",
      primaryColor: "#004d40",
      textColor: "white",
    },
    {
      type: "green900",
      primaryColor: "#1b5e20",
      textColor: "white",
    },
    {
      type: "lightgreen900",
      primaryColor: "#33691e",
      textColor: "white",
    },
    {
      type: "orange900",
      primaryColor: "#e65100",
      textColor: "white",
    },
    {
      type: "deeporange900",
      primaryColor: "#bf360c",
      textColor: "white",
    },
    {
      type: "brown900",
      primaryColor: "#3e2723",
      textColor: "white",
    },
    {
      type: "bluegrey500",
      primaryColor: "#607d8b",
      textColor: "white",
    },
  ];

  const theme = utils.sample(themes);

  console.log(theme.type);

  const bgColorPrimary = Array.from(
    document.getElementsByClassName("bg-color-primary")
  );
  const colorPrimary = Array.from(
    document.getElementsByClassName("color-primary")
  );

  bgColorPrimary.forEach((e) => {
    e.style.backgroundColor = theme.primaryColor;
    e.style.color = theme.textColor;
  });

  colorPrimary.forEach((e) => {
    e.style.color = theme.primaryColor;
  });
})();
