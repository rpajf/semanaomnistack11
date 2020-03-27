import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Container, Header, Cases } from './styles';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  // []: the data from the api
  const history = useHistory()

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(res => {
      setIncidents(res.data)

    })
  }, [ongId])
  //seccond parameter: dependencies array, when the value on the [] changes,
  // it determine when the arrow function is executed

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id));
      
    } catch (error) {
      alert('Erro ao deletar caso, tente denovo')
      
    }
  }
  function handleLogout() {
    history.push('/')

  }

  return (
    <Container>
      <Header>
        <img src={logoImg} alt="Be the hero"/>
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incident">Cadastrar novo caso</Link>
        <button onClick={handleLogout} className="header-button" type="button">
          
          <FiPower size={18} color="#e02041" />
        </button>
        
      </Header>
      <h1>Casos cadastrados</h1>
      <Cases>
        {/* with () its the same as return {} */}
        {incidents.map(incident => (
          <li key={incident.id}>
            {/* key: the unique value from each item */}
          <strong>CASO:</strong>
          <p>{incident.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incident.description}</p>

          <strong>VALOR</strong>
          <p>
            {Intl.NumberFormat('pt-BR', { style:'currency', currency: 'BRL'}
            ).format(incident.value)}
            </p>

          <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
            {/* arrow functions here allows the whole function with the parameter
                be passed, without arrow function , the func is executed when the 
                component renderizes
            */}
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
        ))}
        

       
      </Cases>
    </Container>
  );
}
