import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import styled from "styled-components";

const StyledChartWrapper = styled.div`
  flex: 0 1 50%;
  text-align: center;
  max-width: 700px;
  margin-right: 30px;
`;

const StyledFootNote = styled.p`
  padding: 0 50px;
  max-width: 600px;
  font-size: 14px;
  margin: 0 auto;
`;

const YearBarChart = ({ data, setselectedMonth, selectedMonth }) => {
  const ref = useRef();

  data = data.map((month) => ({ date: month.date, data: month.data.length }));

  useEffect(() => {
    const chart = d3.select(ref.current);

    const xScale = d3
      .scaleBand()
      .domain(data.map((e, i) => e.date)) // min and max value in our data array
      .range([0, 600]) // min and max value of our svg container
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([200, 0]) // min and max value in our data array
      .range([0, 400]); // min and max value of our svg container

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((d) =>
        d.length === 11 && d.slice(5, 6) === "1"
          ? `1/${d.slice(-4)}`
          : d.slice(5, -5)
      );
    chart.select(".x-axis").attr("transform", "translate(0,400)").call(xAxis);

    const yAxis = d3
      .axisRight(yScale)
      .ticks(3)
      .tickSize(700)
      .tickFormat((d) => (d ? `${d}` : ``));
    chart.select(".y-axis").call(yAxis);
    chart.select(".y-axis .domain").remove();
    chart.selectAll(".y-axis .tick text").attr("x", 630).attr("dy", -4);

    chart
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d, index) => xScale(d.date))
      .attr("y", (d) => yScale(d.data))
      .attr("height", (d) => yScale(200 - d.data))
      .attr("width", xScale.bandwidth())
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", (d, index) =>
        index + 1 === selectedMonth ? "#343181" : "#6E6BC7"
      )
      .on("click", (d, index) => setselectedMonth(index + 1));

    chart
      .selectAll(".bar-label")
      .data(data)
      .join("text")
      .text((d) => (d.data > 200 ? `${d.data}*` : d.data))
      .attr("class", "bar-label")
      .attr(
        "x",
        (d, index) =>
          xScale(d.date) + (d.data > 100 ? (d.data > 200 ? 2 : 4) : 7)
      )
      .attr("y", (d) => (d.data > 200 ? yScale(215) : yScale(d.data) + 20))
      .attr("fill", "#fff")
      .attr("font-size", 12);

    chart
      .selectAll(".bar-footer")
      .data(data)
      .join("rect")
      .attr("class", "bar-footer")
      .attr("x", (d, index) => xScale(d.date))
      .attr("y", 390)
      .attr("height", 10)
      .attr("width", xScale.bandwidth())
      .attr("fill", (d, index) =>
        index + 1 === selectedMonth ? "#343181" : "#6E6BC7"
      );

    const ticks = d3.selectAll(".tick text");

    ticks.attr("class", function (d, i) {
      if (d.length === 11 && d.slice(5, 6) === "1") {
        return "full-year";
      } else {
        return "";
      }
    });
  }, [selectedMonth]);

  return (
    <StyledChartWrapper>
      <svg viewBox="0 0 700 500">
        <g ref={ref} transform="translate(50,50)">
          <g className="x-axis" />
          <g className="y-axis" />
        </g>
      </svg>
      <StyledFootNote>
        * Spike najprawdopodobniej związany ze startem wypożyczalnie samochodów
        elektrycznych w Warszawie (
        <a
          href="https://moto.pl/MotoPL/7,170318,24608051,innogy-go-czyli-500-elektrycznych-bmw-dla-warszawy-rusza.html"
          target="_blank"
        >
          https://moto.pl/MotoPL/7,170318,24608051,innogy-go-czyli-500-elektrycznych-bmw-dla-warszawy-rusza.html
        </a>
        )
      </StyledFootNote>
    </StyledChartWrapper>
  );
};

export default YearBarChart;
