module.exports = {
  purge: [],
  theme: {
    extend: {
      maxHeight: {
        32: "8rem",
        56: "14rem",
        64: "16rem",
        40: "10rem",
      },
    },
  },
  variants: {
    display: ["responsive", "hover", "focus", "active", "group-hover"],
    textDecoration: ["responsive", "hover", "focus", "active", "group-hover"],
    borderColor: ["responsive", "hover", "focus", "active", "group-hover"],
    padding: ["responsive"],
    inset: ["responsive"],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
