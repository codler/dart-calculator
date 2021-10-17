import { useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { Button, Text } from "./components";
import { useLocalStorage } from "@codler/utils";
import { theme } from "native-base";
import { Picker } from "@react-native-picker/picker";

type GameState = GameRound[];
type Player = number;
type Dart = number;
interface Score {
  score: number;
  multiplyer: number;
}

interface GameRound {
  [key: Player]: {
    [key: Dart]: Score | undefined;
  };
}

const displayScoreLabel = (score?: Score) => {
  if (!score) {
    return ".";
  } else if (score.multiplyer > 1) {
    return `${score.score}x${score.multiplyer}`;
  } else {
    return `${score.score}`;
  }
};

const backgroundColor = theme.colors.coolGray[800];

function App() {
  const [numberOfPlayers, setNumberOfPlayers] = useLocalStorage<string>(
    "numberOfPlayers",
    "2"
  );

  const config = {
    numberOfPlayers: parseInt(numberOfPlayers),
    numberOfDarts: 3,
    startPoint: 301,
  };

  const initialGameState = [[]];

  const [gameState, setGameState] = useLocalStorage<GameState>(
    "gameState",
    initialGameState
  );

  const addRound = () => {
    const round: GameRound = [];
    gameState.push(round);
    setGameState([...gameState]);
  };

  const addScore = (
    score: Score | undefined,
    roundNo: number,
    playerNo: number,
    dartNo: number
  ) => {
    if (!gameState[roundNo][playerNo]) {
      gameState[roundNo][playerNo] = [];
    }
    gameState[roundNo][playerNo][dartNo] = score;
    setGameState([...gameState]);
  };

  const getRemainingPoints = (playerNo: number) => {
    let points = config.startPoint;
    gameState.forEach((round) => {
      if (round[playerNo]) {
        points -= Object.values(round[playerNo]).reduce((prev, curr) => {
          if (curr) {
            return prev + curr.score * curr.multiplyer;
          }
          return prev;
        }, 0);
      }
    });

    return points;
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <View>
        <Picker
          selectedValue={numberOfPlayers}
          onValueChange={(itemValue, itemIndex) =>
            setNumberOfPlayers(itemValue)
          }
        >
          <Picker.Item label="One Player" value="1" />
          <Picker.Item label="Two Players" value="2" />
          <Picker.Item label="Three Players" value="3" />
          <Picker.Item label="Four Players" value="4" />
          <Picker.Item label="Five Players" value="5" />
          <Picker.Item label="Six Players" value="6" />
        </Picker>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text>Players: {config.numberOfPlayers}</Text>
        <Text>Darts: {config.numberOfDarts}</Text>
        <Text>StartPoint: {config.startPoint}</Text>
      </View>
      <Button
        title="Restart Game"
        onPress={() => setGameState(initialGameState)}
      />
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        {gameState.map((round, rountNo) => {
          return (
            <View key={rountNo} style={{ marginTop: 20, marginBottom: 20 }}>
              <Text style={{ fontSize: 20 }}>Round: {rountNo + 1}</Text>
              {[...Array(config.numberOfPlayers)].map((_, playerNo) => {
                return (
                  <View
                    key={playerNo}
                    style={{ marginTop: 5, marginBottom: 5 }}
                  >
                    <Text style={{ marginBottom: 5 }}>
                      Player {playerNo + 1}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginLeft: 5,
                        marginRight: 5,
                      }}
                    >
                      {[...Array(config.numberOfDarts)].map((_, dartNo) => {
                        return (
                          <ChooseScoreButton
                            title={displayScoreLabel(round[playerNo]?.[dartNo])}
                            key={dartNo}
                            onPress={(score) =>
                              addScore(score, rountNo, playerNo, dartNo)
                            }
                          />
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
      <View>
        <Button title="Add round" onPress={addRound} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          {[...Array(config.numberOfPlayers)].map((_, playerNo) => {
            return (
              <View key={playerNo}>
                <Text style={{ fontSize: 25 }}>Player {playerNo + 1}</Text>
                <Text style={{ fontSize: 60 }}>
                  {getRemainingPoints(playerNo)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      <View style={{ height: 70 }}></View>
    </View>
  );
}

interface ChooseScoreButtonProps {
  title: string;
  onPress: (score?: Score) => void;
}

const ChooseScoreButton = (props: ChooseScoreButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { title, onPress } = props;

  return (
    <>
      <View style={{ width: 50 }}>
        <Button title={title} onPress={() => setIsVisible(true)} />
      </View>
      <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <ScrollView style={{ backgroundColor }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Button
                title={"0"}
                onPress={() => {
                  onPress(undefined);
                  setIsVisible(false);
                }}
              />
              <Button
                title={"25"}
                onPress={() => {
                  onPress({ score: 25, multiplyer: 1 });
                  setIsVisible(false);
                }}
              />
              <Button
                title={"50"}
                onPress={() => {
                  onPress({ score: 50, multiplyer: 1 });
                  setIsVisible(false);
                }}
              />
            </View>

            {[...Array(20)].map((_, row) => {
              return (
                <View
                  key={row}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 10,
                  }}
                >
                  {[...Array(3)].map((_, column) => {
                    const score = { score: row + 1, multiplyer: column + 1 };
                    const label = displayScoreLabel(score);

                    return (
                      <Button
                        key={column}
                        title={label}
                        onPress={() => {
                          onPress(score);
                          setIsVisible(false);
                        }}
                      />
                    );
                  })}
                </View>
              );
            })}
          </View>
          <Button onPress={() => setIsVisible(false)} title={"Close"} />
        </ScrollView>
      </Modal>
    </>
  );
};

export default App;
