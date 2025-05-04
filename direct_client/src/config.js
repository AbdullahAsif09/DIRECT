export const keys = {
  api:
    import.meta.env?.MODE === "development"
      ? // ? "https://badger-primary-muskox.ngrok-free.app/api/"
        "http://localhost:5500/api/"
      : "http://89.116.32.31:5500/api/",

  rootserver:
    import.meta.env?.MODE === "development"
      ? // "https://badger-primary-muskox.ngrok-free.app/api/"
        "http://localhost:5500/"
      : "http://89.116.32.31:5500/",
};
