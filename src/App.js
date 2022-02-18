import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Alert} from 'react-native';
import params from './Params';
import MineField from './components/MineField';
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from './Functions';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
    };
  };

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert('Perdeeeeeeu!');
    }

    if (won) {
      Alert.alert('Parabens', 'Você Venceu!');
    }

    this.setState({board, lost, won});
  };

  onSelectFiel = (row, column) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    if (won) {
      Alert.alert('Parabens', 'Voce Ganhou!');
    }

    this.setState({board, won});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>Iniciando Mines!</Text>
        <Text style={styles.welcome}>
          Tamanho da grade: {params.getColumnsAmount()}x{params.getRowsAmount()}
        </Text>
        <View>
          <MineField
            board={this.state.board}
            onOpenField={this.onOpenField}
            onSelectFiel={this.onSelectFiel}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#aaa',
  },
});
