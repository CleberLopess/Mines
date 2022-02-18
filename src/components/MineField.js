/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Field from './Field';

export default props => {
  const rows = props.board.map((row, r) => {
    const columns = row.map((field, c) => {
      return (
        <Field
          {...field}
          key={c}
          onOpen={() => props.onOpenField(r, c)}
          onSelect={e => props.onSelectField(r, c)}
        />
      );
    });
    return (
      <View key={r} style={styles.colum}>
        {columns}
      </View>
    );
  });
  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
  },
  colum: {
    flexDirection: 'row',
  },
});
