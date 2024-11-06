import React, { useState, useEffect } from "react";

const TrackingInterface = () => {
  const MAX_DISTANCE = 660; // Maximum allowed connection distance
  const initialNodes = [
    { id: 1, x: 100, y: 200, hasSignal: true }, // Node 1 (left)
    { id: 2, x: window.innerWidth / 2, y: 200, hasSignal: true }, // Node 2 (middle)
    { id: 3, x: window.innerWidth - 100, y: 200, hasSignal: true }, // Node 3 (right)
  ];
  const [circlePos, setCirclePos] = useState({ x: 150, y: 300 });
  const [closestNodes, setClosestNodes] = useState([]);
  const [isAlert, setIsAlert] = useState(false);

  const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
    );
  };

  useEffect(() => {
    const distances = initialNodes.map((node) => ({
      ...node,
      distance: calculateDistance(circlePos, node),
    }));

    // Sort nodes by distance and filter out nodes facing signal issues or with distance > MAX_DISTANCE
    const validNodes = distances
      .filter((node) => node.hasSignal && node.distance <= MAX_DISTANCE)
      .sort((a, b) => a.distance - b.distance);

    setClosestNodes(validNodes.slice(0, 2)); // Select the two closest valid nodes

    // If one of the closest valid nodes is Node 3, set an alert
    setIsAlert(validNodes.some((node) => node.id === 3));
  }, [circlePos]);

  const handleMouseMove = (e) => {
    const svgElement = e.target.closest("svg");
    if (svgElement) {
      const rect = svgElement.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      if (newX >= 0 && newX <= rect.width && newY >= 0 && newY <= rect.height) {
        setCirclePos({ x: newX, y: newY });
      }
    }
  };

  return (
    <svg
      width="100%"
      height="400px"
      onMouseMove={handleMouseMove}
      style={{ border: "1px solid grey" }}
    >
      {initialNodes.map((node) => (
        <React.Fragment key={node.id}>
          {/* Render the node as a square */}
          <rect
            x={node.x - 10}
            y={node.y - 10}
            width="20"
            height="20"
            fill={isAlert && node.id !== 1 ? "red" : "black"}
          />
          {/* Render the label for the node */}
          <text
            x={node.x - 5}
            y={node.y - 15}
            fill={isAlert && node.id !== 1 ? "red" : "black"}
            fontSize="20"
            fontWeight="medium"
          >
            {node.id}
          </text>
        </React.Fragment>
      ))}

      {/* Render the green circle */}
      <circle cx={circlePos.x} cy={circlePos.y} r="8" fill="green" />

      {/* Render lines connecting the circle to the closest valid nodes */}
      {closestNodes.length > 0 &&
        closestNodes.map((node, index) => (
          <line
            key={index}
            x1={circlePos.x}
            y1={circlePos.y}
            x2={node.x}
            y2={node.y}
            stroke={isAlert && node.id !== 1 ? "red" : "black"}
            strokeWidth="2"
          />
        ))}

      {/* Display distances if connections are valid */}
      {closestNodes.length > 0 &&
        closestNodes.map((node, index) => (
          <text
            key={`text-${index}`}
            x={(circlePos.x + node.x) / 2}
            y={(circlePos.y + node.y) / 2 - 10}
            fill={isAlert && node.id !== 1 ? "red" : "black"}
          >
            {Math.round(calculateDistance(circlePos, node))}m
          </text>
        ))}

      {/* Indicate if the connection is broken */}
      {closestNodes.length === 1 && (
        <text
          x={circlePos.x + 10}
          y={circlePos.y - 10}
          fill="grey"
          fontSize="16"
          fontWeight="bold"
        >
          Connection Broken
        </text>
      )}
    </svg>
  );
};

export default TrackingInterface;
