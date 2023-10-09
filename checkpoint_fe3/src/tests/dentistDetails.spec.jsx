import { describe, it, vi, expect } from 'vitest';
import DentistDetails from '../pages/DentistDetails';
import { useParams } from 'react-router-dom';
import { DefaultContext } from '../contexts/DefaultContext';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

const dentistsList = [
  {
    matricula: '1',
    nome: 'Dentista',
    sobrenome: 'Sobrenome',
    usuario: {
      username: 'dentista123',
    },
  },
];

describe('DentistDetails', () => {
  it('renders DentistDetails component correctly', () => {
    useParams.mockReturnValue({ id: '1' });
    
    const { getByText } = render(
      <DefaultContext.Provider value={{ dentistsList: dentistsList }}>
        <DentistDetails />
      </DefaultContext.Provider>
    );

    expect(getByText('Detalhes do dentista')).toBeInTheDocument();
    expect(getByText('Dentista Sobrenome')).toBeInTheDocument();
    expect(getByText('@dentista123')).toBeInTheDocument();
    expect(getByText('Endodontia, Ortodontia e Clinica geral')).toBeInTheDocument();
  });

});
