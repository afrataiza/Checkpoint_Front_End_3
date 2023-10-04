import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
 
/*
const getRandomAvatar = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const avatarURL = response.data.results[0].picture.large;
      return avatarURL;
    } catch (error) {
      console.error("Erro ao buscar avatar:", error);
      return null;
    }
  };

  */

const DentistaCard = ({dentista}) => { 
    /*
    const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      const randomAvatar = await getRandomAvatar();
      if (randomAvatar) {
        setAvatar(randomAvatar);
      }
    };

    fetchAvatar();
  }, []);

  */

    if(!dentista || !dentista.nome){
        return <div>Dentista não encontrado.</div>
    }
    return(
        <div>
            {/* <img src={avatar}  alt={dentista.nome} />*/}
             <h2>{dentista.nome} {dentista.sobrenome}</h2>
             <p>{dentista.usuario.username}</p>
        </div>
    );
};

export default DentistaCard;