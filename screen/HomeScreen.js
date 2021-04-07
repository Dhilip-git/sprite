import React, {useState, useEffect, useContext} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Picker,
} from 'react-native';
import axios from 'axios';
import {StateContext} from '../context/state-context.js';

const HomeScreen = () => {
  const [state, dispatch] = useContext(StateContext);
  const [isFailure, setIsFailure] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Total');

  useEffect(() => {
    requestDetailAPI();
  }, []);

  const requestDetailAPI = () => {
    setLoading(true);
    setIsFailure(false);
    axios
      .get('https://api.covid19india.org/data.json')
      .then(function (response) {
        const data = response.data.statewise;
        dispatch({
          type: 'STATE_WISE',
          payload: data,
        });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setIsFailure(true);
      });
  };

  const onChange = value => {
    setSelectedItem(value);
    dispatch({
      type: 'STATE_DETAIL',
      payload: value,
    });
  };

  const renderDetailContent = () => {
    if (isLoading) {
      return (
        <View
          style={[
            styles.bottomContainer,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <ActivityIndicator
            size={Platform.OS === 'ios' ? 'large' : 50}
            color="#4F44FF"
          />
          <Text style={{fontSize: 30}}>Getting Data....</Text>
        </View>
      );
    } else if (isFailure) {
      return (
        <View
          style={[
            styles.bottomContainer,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Text style={styles.failureStyle}>Some Failure Occured!</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => requestDetailAPI()}>
            <Text style={styles.buttonText}>Try it again</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (
      state.stateWise &&
      state.stateWise.length &&
      state.stateDetail.state
    ) {
      return (
        <View style={styles.bottomContainer}>
          <Text style={styles.dateStyle}>
            As on {state.stateDetail.lastupdatedtime}
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.statusTextStyle}>Confirmed</Text>
            <Text style={styles.statusTextStyle}>
              {state.stateDetail.confirmed}
            </Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.statusTextStyle}>Active</Text>
            <Text style={styles.statusTextStyle}>
              {state.stateDetail.active}
            </Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.statusTextStyle}>Recovered</Text>
            <Text style={styles.statusTextStyle}>
              {state.stateDetail.recovered}
            </Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.statusTextStyle}>Death</Text>
            <Text style={styles.statusTextStyle}>
              {state.stateDetail.deaths}
            </Text>
          </View>
        </View>
      );
    }
    return <Text>No data found</Text>;
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Covid 19 Metrics</Text>
        <Text style={styles.countryText}>India</Text>
        <View style={styles.dropDownContainer}>
          <Text style={styles.stateText}>State</Text>
          <View style={styles.pickerContainer}>
            <Picker
              mode="dropdown"
              style={{
                height: '100%',
              }}
              selectedValue={selectedItem}
              onValueChange={item => onChange(item)}>
              {state.options.map(value => (
                <Picker.Item label={value} value={value} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      {renderDetailContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: '100%',
    backgroundColor: '#d6d6d4',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerText: {
    fontSize: 25,
    marginTop: '20%',
    fontWeight: 'bold',
  },
  countryText: {
    fontSize: 25,
    marginTop: '10%',
  },
  dropDownContainer: {
    height: '10%',
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: '5%',
  },
  stateText: {
    fontSize: 20,
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    elevation: 10,
  },
  dateStyle: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 20,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    height: '10%',
    marginTop: '5%',
    alignSelf: 'center',
  },
  statusTextStyle: {
    fontSize: 20,
  },
  failureStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonStyle: {
    height: '15%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  pickerContainer: {
    borderWidth: 1,
    width: '50%',
    marginLeft: 50,
    backgroundColor: '#FFFFFF',
  },
});

export default HomeScreen;
