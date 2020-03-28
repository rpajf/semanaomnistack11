import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, FlatList } from 'react-native';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
    //route name, values sent to the route on the incident
  }
  async function loadIncidents() {
    if (loading) {
      return;
      /* keeps  the state and the data when the app is loading

      */
    }
    if (total > 0 && incidents.length === total) {
      return;

    }
    setLoading(true);


    const response = await api.get('incidents', {
      params: { page }
    });


    setIncidents([...incidents, ...response.data]);
    /* keep the incidents added and the data incoming
      without needing to reaload the page
    */

    setTotal(response.headers['x-total-count']);
    setPage(page + 1)
    setLoading(false);

  }
  useEffect(() => {
    loadIncidents();

  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.

        </Text>
        </View>
        <Text style={styles.title}>Seja bem Vindo!</Text>
        <Text style={styles.decription}>Escolha um do casos baixo e salve o dia</Text>
        <FlatList
          style={styles.incidentList} 
          data={incidents}
          keyExtractor={incident => String(incident.id)/* necessary on RN */}
          showsVerticalScrollIndicator={false}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          renderItem={({ item: incident }) => (
            /* every item is an incident */
            <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', { 
                style: 'currency', currency: 'BRL'}).format(incident.value)}
              </Text>

            <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
           
            </View>

          )}
        />
        



    </View>
  );
}
