import { Pai, DivBotoes, Body, Titulo, Botao, Input } from './styled';
import React, { useState } from 'react';
import axios from 'axios';
import TipoDeAssinatura from './components/TipoDeAssinatura';
import AssinaturasMensais from './components/AssinaturasMensais';
import MontlyRevenue from './components/MontlyRevenue';
import ChurnRate from './components/ChurnRate'

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('http://localhost:3003/upload', formData); // https://backend-em-nest-js.vercel.app/upload 
    setData(response.data);
    
  }

  return (
    <Pai>
      <Titulo>
        Gráficos de Métricas Mensais.
      </Titulo>
      <h2>
        Clilque no botão "Escolher arquivo" logo abaixo e depois clique em "Upload" para ver os Gráficos.
      </h2>
      <Body>
        <MontlyRevenue file={file} setFile={setFile} data={data} setData={setData} />
        <ChurnRate file={file} setFile={setFile} data={data} setData={setData} />
        <AssinaturasMensais file={file} setFile={setFile} data={data} setData={setData} />
        <TipoDeAssinatura file={file} setFile={setFile} data={data} setData={setData} />
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
