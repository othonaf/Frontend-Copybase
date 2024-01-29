import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Carregando = () => {
  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <ClipLoader color={"#123abc"} loading={true} css={override} size={150} />
    </div>
  );
};

export default Carregando;
