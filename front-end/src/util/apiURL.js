export const apiURL = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:3333"
    : "https://fathomless-everglades-31856.herokuapp.com";
};
