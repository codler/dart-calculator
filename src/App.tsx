import { useState } from "react";
import { Button, Modal, ScrollView, Text, View } from "react-native";
import { useLocalStorage } from "@codler/utils";

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

function App() {
  const config = {
    numberOfPlayers: 2,
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
    <View>
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
            marginTop: 20,
          }}
        >
          {[...Array(config.numberOfPlayers)].map((_, playerNo) => {
            return (
              <View key={playerNo}>
                <Text style={{ fontSize: 20 }}>Player {playerNo + 1}</Text>
                <Text style={{ fontSize: 50 }}>
                  {getRemainingPoints(playerNo)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
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
        <ScrollView>
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
