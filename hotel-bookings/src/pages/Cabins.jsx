import React, { useEffect } from "react";
import { getCabins } from "../services/apiCabins";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";

const Cabins = () => {
  useEffect(function () {
    getCabins().then((data) => console.log("cabins", data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>

      <Row>
        <CabinTable />
      </Row>
    </Row>
  );
};

export default Cabins;
