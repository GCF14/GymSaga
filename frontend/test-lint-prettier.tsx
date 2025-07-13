// Test file for ESLint and Prettier
import React from "react"; // Extra spaces (Prettier should fix)

const TestComponent = () => {
  const name = "test"; // Missing type annotation, wrong quotes, extra spaces
  let unused_variable = 123; // Unused variable (ESLint should catch)
  const obj = { a: 1, b: 2, c: 3 }; // No spaces (Prettier should fix)

  if (true) {
    console.log("test");
  } // Wrong spacing, single quotes (Prettier should fix)

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default TestComponent;
("test change");
