import React from 'react';
import { View, StyleSheet } from 'react-native';
import StockTable from './components/stockTable/StockTable';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StockTable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default App;
