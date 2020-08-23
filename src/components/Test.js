import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const Test = () => {
  const [data, setData] = useState([8, 18, 27, 15]);
  const ref = useRef();

  useEffect(() => {
    const chart = d3.select(ref.current);

    const xScale = d3
      .scaleBand()
      .domain([0, 1, 2, 3]) // min and max value in our data array
      //.domain(data.map((e, i) => e.date)) // min and max value in our data array
      .range([0, 500]) // min and max value of our svg container
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([30, 0]) // min and max value in our data array
      .range([0, 400]); // min and max value of our svg container

    const xAxis = d3.axisBottom(xScale);
    chart.select(".x-axis").attr("transform", "translate(0,400)").call(xAxis);

    const yAxis = d3.axisRight(yScale).ticks(3).tickSize(600);
    chart.select(".y-axis").call(yAxis);
    chart.select(".y-axis .domain").remove();

    chart
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d, index) => xScale(index))
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => yScale(30 - d))
      .attr("width", xScale.bandwidth())
      .attr("rx", 6)
      .attr("ry", 6);
  }, [data]);

  return (
    <>
      <svg width="600" height="500" viewBox="0 0 500 500" ref={ref}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button onClick={() => setData([2, 10, 14, 20])}>set</button>
    </>
  );
};

export default Test;
