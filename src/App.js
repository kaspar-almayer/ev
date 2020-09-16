import React, { useState, useEffect } from "react";

import YearBarChart from "./components/YearBarChart";
import DonutChart from "./components/Donut";
import YearSummary from "./components/YearSummary";
import Header from "./components/Header";
import Info from "./components/Info";
import Modal from "./components/Modal";

import DATA_2020 from "./data2020.json";
import DATA_2019 from "./data2019.json";

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
    const DATA = [...DATA_2019, ...DATA_2020];
    const filteredData = DATA.map((month) => ({
      ...month,
      data: month.data.filter(filterNewCars),
    }));
    setData(filteredData);
    setdataLoaded(true);
  }, []);

  return (
    <div className="App">
      <Header handleModalToogle={handleModalToogle} />
      <Info content="Liczba rejestracji nowych samochodów elektrycznych w Polsce." />
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
                  if (selectedMonth > 12) {
                    return date === `data_${selectedMonth - 12}_2020`;
                  } else {
                    return date === `data_${selectedMonth}_2019`;
                  }
                }).data
              }
              selectedMonth={selectedMonth}
            />
          </StyledMain>
          <StyledMain>
            <YearSummary
              data={[
                ...data[12].data,
                ...data[13].data,
                ...data[14].data,
                ...data[15].data,
                ...data[16].data,
                ...data[17].data,
                ...data[18].data,
              ]}
              summary={
                [
                  ...data[12].data,
                  ...data[13].data,
                  ...data[14].data,
                  ...data[15].data,
                  ...data[16].data,
                  ...data[17].data,
                  ...data[18].data,
                ].length
              }
            />
          </StyledMain>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default App;
