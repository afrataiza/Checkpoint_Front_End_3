import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from '../pages/Home';
import { DefaultContext } from '../contexts/DefaultContext';

const mockDentists = vi.fn( async () => [
  {
    "nome": "Mario",
    "sobrenome": "Meirelles da Silva",
    "matricula": "f668cd56-a924-4a41-ab9d-49e4caaebad8",
    "usuario": {
    "username": "mariodasilva"
    }
    },
    {
    "nome": "Andre",
    "sobrenome": "dos Santos",
    "matricula": "0edef9b7-8c56-459f-935f-f1a72e631c1e",
    "usuario": {
    "username": "andredossantos"
    }
    },
]);


describe('Home page', () => {
  
  it("renders Dentistas Disponiveis heading", () => {
    const { getByText } = render(
      <DefaultContext.Provider value={{ fetchDentists: mockDentists }}>
        <Home />
      </DefaultContext.Provider>
    );
  
    const headingElement = getByText(/Dentistas Disponiveis/i);
    expect(headingElement).toBeInTheDocument();
  });

});