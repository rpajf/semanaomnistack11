import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg'
import { Container, Section, OngForm } from './styles';

export default function Logon() {
  const [id,setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile')
      
    } catch (error) {
      alert('Falha no login, tente novamente')
      
    }
    

  }

  return (
    <Container>
     
      <Section>
      <img src={logoImg} alt="Be the Heroi"/>

        <OngForm onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
          placeholder="Sua ID" 
          value={id}
          onChange={e => setId(e.target.value)}
          
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro</Link>
        </OngForm>
      </Section>
     
      <img src={heroesImg} alt="Heroes"/>
    </Container>
  );
}
