/* eslint-disable react/prop-types */
import { DefaultContext } from "../../contexts/DefaultContext";
import { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

import Button from "../Button";

const ConsultModal = ({ setModal }) => {
  const { dentistsList, patientsList, fetchConsults } = useContext(DefaultContext);
  const navigate = useNavigate();

  const handleClose = () => {
    setModal(false);
  };

  const handleConsult = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const consultData = Object.fromEntries(formData);
    if (!consultData.dentist || !consultData.patient || !consultData.date) {
      toast("Preencha todos os campos!");
      return;
    }
    const patient = patientsList.find(
      (patient) =>
        `${patient.nome} ${patient.sobrenome}` === consultData.patient
    );
    const dentist = dentistsList.find(
      (dentist) =>
        `${dentist.nome} ${dentist.sobrenome}` === consultData.dentist
    );
    const newConsult = {
      paciente: {
        matricula: patient.matricula,
      },
      dentista: {
        matricula: dentist.matricula
      },
      dataHoraAgendamento: consultData.date,
    };
    const status = await fetchConsults(newConsult);
    if (status === 200) {
      navigate("/");
    }
  };

  return (
    <div
      id="consult-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-16 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md: h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Marcação de consulta
            </h3>
            <form className="space-y-6" action="#" onSubmit={handleConsult}>
              <div>
                <label
                  htmlFor="dentist"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Dentista
                </label>
                <select
                  name="dentist"
                  id="dentist"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Selecione um dentista</option>
                  {dentistsList.length > 0 &&
                    dentistsList.map((dentist) => (
                      <option
                        key={dentist.matricula}
                        value={`${dentist.nome} ${dentist.sobrenome}`}
                      >
                        {dentist.nome} {dentist.sobrenome}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="patient"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Paciente
                </label>
                <select
                  name="patient"
                  id="patient"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Selecione um paciente</option>
                  {patientsList.length > 0 &&
                    patientsList.map((patient) => (
                      <option
                        key={patient.matricula}
                        value={`${patient.nome} ${patient.sobrenome}`}
                      >
                        {patient.nome} {patient.sobrenome}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Data
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div className="flex w-full justify-center">
                <Button text="Enviar" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultModal;
