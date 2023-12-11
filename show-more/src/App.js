import { useState } from "react";

function App() {
  return (
    <div className="App">
      <TextExpander>
        Space travel requires some seriously amzaing technology and
        collaboration between countries, private companies, and international
        space organization. and while it's
      </TextExpander>
      <TextExpander
        collapsedNumWords={20}
        expandButtonText="show Text"
        collapseButtonText="Collapse Text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amzaing technology and
        collaboration between countries, private companies, and international
        space organization. and while it's more exciting and amazing.
      </TextExpander>
      <TextExpander expanded={true} buttonColor="blue" className="box">
        Space travel requires some seriously amzaing technology and
        collaboration between countries, private companies, and international
        space organization. and while it's
      </TextExpander>
    </div>
  );
}

function TextExpander({
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show Less",
  buttonColor = "#ff6622",
  expanded = false,
  className = "",
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ");
  const buttonStyle = {
    background: "none",
    color: buttonColor,
    border: "none",
  };
  return (
    <div className={className}>
      <span>
        {displayText}
        <button
          style={buttonStyle}
          onClick={() => setIsExpanded((exp) => !exp)}
        >
          {isExpanded ? collapseButtonText : expandButtonText}
        </button>
      </span>
    </div>
  );
}
export default App;
