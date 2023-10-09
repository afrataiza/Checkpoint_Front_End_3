import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DefaultContext } from "../../contexts/DefaultContext";
import dentistImage from "../../assets/dentista.jpg";
import Button from "../../components/Button";
import ConsultModal from "../../components/Modal";
import toast from 'react-hot-toast';

const DentistDetails = () => {
  const { id } = useParams();
  const { dentistsList } = useContext(DefaultContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [registration, setRegistration] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const findDentist = dentistsList.find(
      (dentist) => dentist.matricula === id
    );
    if (findDentist) {
      setName(`${findDentist.nome} ${findDentist.sobrenome}`);
      setUsername(findDentist.usuario.username);
      setRegistration(findDentist.matricula);
    }
  }, [dentistsList, id]);

  const handleModal = () => {
    const token = JSON.parse(localStorage.getItem("user_token"));
    if (!token) {
      toast("Você precisa estar logado para marcar uma consulta!");
      return;
    }
    setModal(true);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center py-16 gap-12">
      <h1 className="text-3xl font-semibold">Detalhes do dentista</h1>
      <div className="flex gap-20 w-full justify-center p-4 leading-8">
        <div className="flex flex-col justify-center items-center w-1/3">
          <h2 className="text-2xl font-semibold w-full">{name}</h2>
          <p className="font-medium mb-2 w-full">{`@${username}`}</p>
          <p className="w-full">
            <span className="font-medium">Matrícula:</span> {registration}
          </p>
          <p className="w-full"><span className="font-medium">Especialidade:</span> Endodontia, Ortodontia e Clinica geral</p>
          <p className="font-medium w-full">Descrição:</p>
          <ul className="list-image-checkmark list-outside text-justify w-4/5 leading-6 mb-6">
            <li>
              <span className="align-super">
                Limpeza dental: remoção da placa bacteriana e do tártaro dos
                dentes.
              </span>
            </li>
            <li>
              <span className="align-super">
                Tratamento de cáries: remoção da cárie e restauração do dente.
              </span>
            </li>
            <li>
              <span className="align-super">
                Tratamento de canal: procedimento para tratar e salvar um dente
                que esteja infectado ou inflamado.
              </span>
            </li>
            <li>
              <span className="align-super">
                Extração de dentes: remoção de um dente que esteja danificado,
                infectado ou que esteja atrapalhando a saúde bucal.{" "}
              </span>
            </li>
            <li>
              <span className="align-super">
                Tratamento periodontal: tratamento de doenças da gengiva que
                podem levar à perda de dentes.{" "}
              </span>
            </li>
          </ul>
          <Button text='Marcar Consulta' onClick={handleModal} />
        </div>
        <img
          src={dentistImage}
          alt="Imagem de procedimento odontológico na boca"
          className="w-1/2"
        />
      </div>
      {modal && (
        <ConsultModal setModal={setModal}/>
      )}
    </div>
  );
};

export default DentistDetails;
