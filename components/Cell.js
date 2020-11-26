const e = React.createElement;

export const Cell = (props) => {
  return e(
    "div",
    { className: "output-cell" },
    e("div", { className: "output-text" }, props.name),
    e(
      "div",
      null,
      props.value,
      props.unit ? e("span", { className: "output-unit" }, props.unit) : null
    )
  );
};
