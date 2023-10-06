/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
 
const getDentistaImage = async () => {
  try {
    const response = await axios.get(
      'https://api.unsplash.com/search/photos',
      {
        headers: {
          Authorization: `Client-ID aBWzUYRz1o9GEYJM8FdDxXvSaNxTD_BgTue_QaWoKMI`,
        },
        params: {
          query: 'professional dentist in lab coat',
          per_page: 50, 
        },
      }
    );

    return response.data.results.map((result) => result.urls.small);
  } catch (error) {
    console.error('Erro ao buscar imagens de médicos:', error);
    return [];
  }
};

const DentistaCard = ({dentista}) => { 
  const [dentistaImage, setDentistaImage] = useState(null);

  useEffect(() => {
    const fetchDentistaImage = async () => {
      const dentistaImages = await getDentistaImage();
      if (dentistaImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * dentistaImages.length);
        setDentistaImage(dentistaImages[randomIndex]);
      }
    };

    fetchDentistaImage();
  }, []);

    if(!dentista || !dentista.nome){
        return <div>Dentista não encontrado.</div>
    }
    return(
        <div>
             <img src={dentistaImage}  alt={dentista.nome} />
             <h2>{dentista.nome} {dentista.sobrenome}</h2>
             <p>Nome de usuário: @{dentista.usuario.username}</p>
        </div>
    );
};

export default DentistaCard;