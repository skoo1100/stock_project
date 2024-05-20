import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function StockTable() {
  return (
    <View style={styles.table}>
      <View style={styles.title}>
        <Text style={styles.rowItem}>123</Text>
        <Text style={styles.rowItem}>123</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
  },
  rowItem: {
    width: '50%',
    height: 30,
    textAlign: 'center',
    borderColor: '#0c0c0c',
    borderStyle: 'solid',
    borderWidth: 40,
  },
});

export default StockTable;
