/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const DentistaCard = ({ dentist }) => {

  if (!dentist || !dentist.nome) {
    return <div>Dentista não encontrado.</div>;
  }
  return (
    <div className="bg-neutral-50 w-80 h-32 rounded-md flex flex-col gap-2 items-center shadow-md dark:bg-base-content p-2">
      <h2 className="font-semibold text-xl">
        {dentist.nome} {dentist.sobrenome}
      </h2>
      <p>Nome de usuário: @{dentist.usuario.username}</p>
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-700 hover:underline"
      > Ver mais detalhes
      </Link>
    </div>
  );
};

export default DentistaCard;
