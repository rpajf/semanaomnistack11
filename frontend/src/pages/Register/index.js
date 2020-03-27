import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import logoImg from '../../assets/logo.svg'

import { Container, Content, RegisterForm, Section } from './styles';

export default function Register() {
  const [name, setName] = useState('') 
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf

    };
    try {
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso: ${response.data.id}`)

      history.push('/')
    }catch(err) {
      alert('Erro no cadastro, tente novamente')
    }
  }

  return (
    <Container>
      <Content>
        <Section>
          <img src={logoImg} alt="Be the hero"/>

          <h1>Cadastro</h1>

          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem 
            os casos da sua ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para menu</Link>
        </Section>
        <RegisterForm onSubmit={handleRegister}>
          <input 
          placeholder="Nome da ONG" 
          value={name}
          onChange={e => setName(e.target.value)} 
          //adding input value in the variable that changes state
          />
          <input type="email" 
          placeholder="E-mail" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
          <input 
          placeholder="WhatsApp" 
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          />

          <div>
          <input 
          placeholder="Cidade"         
          value={city}
          onChange={e => setCity(e.target.value)}
          />
          
          <input 
          placeholder="UF" style={{ width: 80 }}
          value={uf}
          onChange={e => setUf(e.target.value)}
          />
          </div>

           <button className="button" type="submit">Cadastrar</button> 

        </RegisterForm>

      </Content>

    </Container>
  );
}
