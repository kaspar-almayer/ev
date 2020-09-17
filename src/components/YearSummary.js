import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import Info from "./Info";
import { modelUnify, yearDonutColors } from "./../helpers";

import styled from "styled-components";

const StyledDonutWrapper = styled.div`
  display: flex;
`;

const YearSummaryWrapper = styled.div`
  flex: 0 1 50%;
  padding-right: 30px;
  margin-bottom: 100px;
`;

const StyledSvgWrapper = styled.div`
  max-width: 500px;
  flex: auto;
  @media (max-width: 700px) {
    display: none;
  }
`;

const StyledLegendWrapper = styled.div`
  margin-top: 75px;
  margin-left: 50px;
  @media (max-width: 700px) {
    margin-top: 30px;
  }
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

const StyledInfo = styled(Info)`
  padding-bottom: 0;
  margin-bottom: 0;
  margin-top: 100px;
  padding: 30px;
`;

const YearSummary = ({ data, summary }) => {
  const ref = useRef();

  const reduceData = (data) =>
    data.reduce((a, b) => {
      return a + b.value;
    }, 0);

  data = data
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
  data = Object.keys(data)
    .map((key) => {
      return {
        name: key,
        value: data[key],
      };
    })
    .sort((a, b) => b.value - a.value);

  data = [
    ...data.slice(0, 10),
    { name: "Pozostałe", value: reduceData(data.slice(10)) },
  ];

  useEffect(() => {
    const svgElement = d3.select(ref.current);

    var radius = 200;

    var color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(yearDonutColors);

    var pie = d3
      .pie()
      .value(function (d) {
        return d.value.value;
      })
      .sort(null);
    var data_ready = pie(d3.entries(data));

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(0) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    const chart = svgElement
      .append("g")
      .attr("transform", "translate(250,250)");

    chart
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", function (d) {
        return color(d.data.value.name);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px");
  }, [data]);

  return (
    <YearSummaryWrapper>
      <StyledInfo
        content={`Top 10 nowych zerejestrowanych samochodów elektrycznych w 2020 roku (styczeń-lipiec) - ${summary}`}
      />
      <StyledDonutWrapper>
        <StyledSvgWrapper>
          <svg viewBox="0 0 500 500" ref={ref} />
        </StyledSvgWrapper>
        <StyledLegendWrapper>
          {data.map((model, index) => (
            <StyledDonutLabel key={index}>
              <StyledDonutLabelNumber
                className="donut-label"
                style={{ backgroundColor: yearDonutColors[index] }}
              >
                {index + 1}
              </StyledDonutLabelNumber>
              <StyledDonutLabelText>
                {model.name} ({model.value})
              </StyledDonutLabelText>
            </StyledDonutLabel>
          ))}
        </StyledLegendWrapper>
      </StyledDonutWrapper>
    </YearSummaryWrapper>
  );
};

export default YearSummary;
