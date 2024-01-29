import { Pai, DivBotoes, Body, Titulo, Botao, Input, Loading } from './styled';
import React, { useState } from 'react';
import axios from 'axios';
import Carregando from './Carregando';
import TipoDeAssinatura from './components/TipoDeAssinatura';
import AssinaturasMensais from './components/AssinaturasMensais';
import MontlyRevenue from './components/MontlyRevenue';
import ChurnRate from './components/ChurnRate'

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [carregando, setCarregando] = useState(false); 

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const onFileUpload = async () => {
    setCarregando(true); 
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('https://backend-copybase.onrender.com/upload', formData);
    // http://localhost:3003/upload
    setData(response.data);
    setCarregando(false); 
  }

  return (
    <Pai>
      <Titulo>
        Gráficos de Métricas Mensais.
      </Titulo>
      <h2>
        Clique no botão "Escolher arquivo" logo abaixo e depois clique em "Upload" para ver os Gráficos.
      </h2>
      <h3>
        Arquivos do tipo ".csv" devem estar na codificação 'UTF-8'
      </h3>
      <Body>
        {carregando ? (
          <div><Carregando />
          <Loading>Carregando...</Loading></div>
          
        ) : (
          <>
            <MontlyRevenue file={file} setFile={setFile} data={data} setData={setData} />
            <ChurnRate file={file} setFile={setFile} data={data} setData={setData} />
            <AssinaturasMensais file={file} setFile={setFile} data={data} setData={setData} />
            <TipoDeAssinatura file={file} setFile={setFile} data={data} setData={setData} />
          </>
        )}
      </Body>
      <DivBotoes>
        <Input id="file" onChange={onFileChange} />
        <label for="file">Escolher arquivo</label>
        <Botao onClick={onFileUpload}>Upload</Botao>
      </DivBotoes>
    </Pai>
  );
}

export default App;
