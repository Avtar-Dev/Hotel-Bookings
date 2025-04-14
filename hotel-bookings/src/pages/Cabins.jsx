import React, { useEffect, useState } from "react";
import { getCabins } from "../services/apiCabins";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

const Cabins = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(function () {
    getCabins().then((data) => console.log("cabins", data));
  }, []);

  return (
    <>
      <Row type="vertical">
        <Heading as="h1">All cabins</Heading>
      </Row>

      <Row type="vertical">
        <CabinTable />
        <Button onClick={() => setShowForm(!showForm)}>Add new Cabin</Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
};

export default Cabins;
