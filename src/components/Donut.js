import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import { donutColors, getMonthName, modelUnify } from "./../helpers";

import styled from "styled-components";

const StyledDonutWrapper = styled.div`
  flex: 0 1 50%;
  padding-right: 30px;
`;

const StyledSvgWrapper = styled.div`
  max-width: 500px;
  flex: auto;
`;

const StyledDonutLabel = styled.p`
  display: flex;
  align-items: center;
`;

const StyledDonutLabelText = styled.span``;

const StyledDonutLabelNumber = styled.span`
  color: #fff;
  text-align: center;
  line-height: 35px;
  display: inline-block;
  width: 35px;
  height: 35px;
  vertical-align: middle;
  margin-right: 10px;
`;

const DonutChart = ({ data, selectedMonth }) => {
  const ref = useRef();

  const reduceData = (data) =>
    data.reduce((a, b) => {
      return a + b.value;
    }, 0);

  const modelsCountObject = data
    .map(
      (el) =>
        `${
          el.attributes.marka === "BMW I" ? "BMW" : el.attributes.marka
        } ${modelUnify(el.attributes.model)}`
    )
    .reduce((map, val) => {
      map[val] = (map[val] || 0) + 1;
      return map;
    }, {});

  const modelsCountArray = Object.keys(modelsCountObject)
    .map((key) => {
      return {
        name: key,
        value: modelsCountObject[key],
      };
    })
    .sort((a, b) => b.value - a.value);

  const topFiveModelsCount = [
    ...modelsCountArray.slice(0, 5),
    { name: "Pozostałe", value: reduceData(modelsCountArray.slice(5)) },
  ];

  useEffect(() => {
    const chart = d3.select(ref.current);

    var radius = 200;

    var color = d3
      .scaleOrdinal()
      .domain(topFiveModelsCount.map((d) => d.name))
      .range(donutColors);

    var pie = d3
      .pie()
      .value(function (d) {
        return d.value.value;
      })
      .sort(null);
    var data_ready = pie(d3.entries(topFiveModelsCount));

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    const prev = chart.selectAll("path").select((d, i) => d)._groups[0];

    chart
      .selectAll(".test")
      .data(data_ready)
      .join("path")
      .attr("class", "test")
      .attr("d", arc)
      .transition()
      .duration(750)
      .attrTween("d", function (d, i) {
        const start = { startAngle: 0, endAngle: 0 };

        const test = {
          startAngle: prev[i]?.startAngle,
          endAngle: prev[i]?.endAngle,
        };
        const interpolate = prev.length
          ? d3.interpolate(test, d)
          : d3.interpolate(start, d);

        return function (t) {
          d = interpolate(t);

          return arc(d);
        };
      })
      .attr("fill", function (d) {
        return color(d.data.value.name);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px");
  }, [topFiveModelsCount]);

  return (
    <StyledDonutWrapper>
      <p className="donut-heading">{getMonthName(selectedMonth)}</p>
      <div className="wrapper">
        <StyledSvgWrapper>
          <svg viewBox="0 0 500 500">
            <g ref={ref} transform="translate(250,250)"></g>
          </svg>
        </StyledSvgWrapper>
        <div>
          {topFiveModelsCount.map((model, index) => (
            <StyledDonutLabel key={index}>
              <StyledDonutLabelNumber
                className="donut-label"
                style={{ backgroundColor: donutColors[index] }}
              >
                {model.value}
              </StyledDonutLabelNumber>
              <StyledDonutLabelText>{model.name}</StyledDonutLabelText>
            </StyledDonutLabel>
          ))}
        </div>
      </div>
    </StyledDonutWrapper>
  );
};

export default DonutChart;
