import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import logoImg from '../../assets/logo.svg'

import { Container, Content, RegisterForm, Section } from './styles';

export default function NewIncident() {
  const [title , setTile] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory()

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })
      history.push('/profile')
    } catch (error) {
      alert('Erro ao cadastrar caso')
      
    }

  }

  return (
    <Container>
      <Content>
        <Section>
          <img src={logoImg} alt="Be the hero"/>

          <h1>Cadastrar novo caso</h1>

          <p>Descreva o caso detalhadamente
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home</Link>
        </Section>
        <RegisterForm>
          <input 
            placeholder="Título do caso" 
            value={title}
            onChange={e => setTile(e.target.value)}
            />
          <textarea 
            placeholder="Descrição" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
          <input 
            placeholder="Valor em reais" 
            value={value}
            onChange={e => setValue(e.target.value)}
            />

          

           <button onClick={handleNewIncident} className="button" type="submit">Cadastrar</button> 

        </RegisterForm>

      </Content>

    </Container>
  );
}
