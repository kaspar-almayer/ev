import React, { useState, useEffect } from "react";

import YearBarChart from "./components/YearBarChart";
import DonutChart from "./components/Donut";
import YearSummary from "./components/YearSummary";
import Header from "./components/Header";
import Info from "./components/Info";
import Modal from "./components/Modal";

import DATA_2020 from "./data2020.json";

import { filterNewCars } from "./helpers";
import styled from "styled-components";

const StyledMain = styled.main`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 1250px) {
    flex-direction: column;
  }
`;

function App() {
  const [data, setData] = useState([]);
  const [dataLoaded, setdataLoaded] = useState(false);
  const [selectedMonth, setselectedMonth] = useState(1);
  const [modal, toogleModal] = useState({
    showModal: false,
    modalType: "",
  });

  const handleModalToogle = (modalType) => {
    toogleModal({
      showModal: !modal.showModal,
      modalType: modalType,
    });
  };

  useEffect(() => {
    const filteredData = DATA_2020.map((month) => ({
      ...month,
      data: month.data.filter(filterNewCars),
    }));
    setData(filteredData);
    setdataLoaded(true);
  }, []);

  return (
    <div className="App">
      <Header handleModalToogle={handleModalToogle} />
      <Info>Liczba rejestracji nowych samochodów elektrycznych w Polsce.</Info>
      {modal.showModal && (
        <Modal modalType={modal.modalType} closeModal={handleModalToogle} />
      )}
      {dataLoaded ? (
        <>
          <StyledMain>
            <YearBarChart
              data={data}
              setselectedMonth={setselectedMonth}
              selectedMonth={selectedMonth}
            />
            <DonutChart
              data={
                data.find(({ date }) => {
                  return (
                    date ===
                    `data_${
                      selectedMonth > 9 ? selectedMonth : `0${selectedMonth}`
                    }_2020`
                  );
                }).data
              }
              selectedMonth={selectedMonth}
            />
          </StyledMain>
          <StyledMain>
            {dataLoaded ? <YearSummary data={data} /> : null}
          </StyledMain>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default App;
