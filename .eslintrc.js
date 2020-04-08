module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
  },
  "rules": {
    "react/jsx-filename-extension": [
      1, {
        "extensions": [".js", ".jsx"],
      }
    ],
    "import/no-named-as-default": 0,
  },
};
