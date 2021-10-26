// import { StatusBar } from "expo-status-bar";
// <StatusBar style="auto" />
import React, { useState } from "react";
import {
  Button,
  Text,
  NativeBaseProvider,
  Center,
  extendTheme,
  Heading,
  VStack,
  Select,
  Stack,
  Box,
  Link,
  Flex,
  useSafeArea,
  theme,
  ScrollView,
} from "native-base";
import { Score, possibleCheckOuts } from "./boardTargets";
import useAsyncStorage from "./useAsyncStorage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Modal, View } from "react-native";

type GameState = GameRound[];
type Player = number;
type Dart = number;

interface GameRound {
  [key: Player]: {
    [key: Dart]: Score | undefined;
  };
}

const displayScoreLabel = (score?: Score) => {
  if (!score) {
    return "____";
  } else if (score.multiplyer > 1) {
    return `${score.score}x${score.multiplyer}`;
  } else {
    return `${score.score}`;
  }
};

const backgroundColor = theme.colors.coolGray[800];

function App() {
  const safeAreaProps = useSafeArea({ safeAreaTop: true, pt: 2 });

  const [numberOfPlayers, setNumberOfPlayers] = useAsyncStorage<string>(
    "numberOfPlayers",
    "2"
  );
  const [numberOfDarts, setNumberOfDarts] = useAsyncStorage<string>(
    "numberOfDarts",
    "3"
  );
  const [startPoint, setStartPoint] = useAsyncStorage<string>(
    "startPoint",
    "301"
  );

  const config = {
    numberOfPlayers: parseInt(numberOfPlayers),
    numberOfDarts: parseInt(numberOfDarts),
    startPoint: parseInt(startPoint),
  };

  const initialGameState = [[]];

  const [gameState, setGameState] = useAsyncStorage<GameState>(
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

  const getRemainingPoints = (playerNo: number): number => {
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
    <ScrollView style={{ backgroundColor }}>
      <Center flex={1} {...safeAreaProps}>
        <Heading>Classic Dart</Heading>
        <Stack direction={["column", "column", "row"]} space={1}>
          <Select
            selectedValue={numberOfPlayers}
            accessibilityLabel="Number of players"
            placeholder="Number of players"
            mt={1}
            onValueChange={(itemValue) => setNumberOfPlayers(itemValue)}
          >
            <Select.Item label="One Player" value="1" />
            <Select.Item label="Two Players" value="2" />
            <Select.Item label="Three Players" value="3" />
            <Select.Item label="Four Players" value="4" />
            <Select.Item label="Five Players" value="5" />
            <Select.Item label="Six Players" value="6" />
          </Select>
          <Select
            selectedValue={numberOfDarts}
            accessibilityLabel="Number of Darts"
            placeholder="Number of Darts"
            mt={1}
            onValueChange={(itemValue) => setNumberOfDarts(itemValue)}
          >
            <Select.Item label="One Dart" value="1" />
            <Select.Item label="Two Darts" value="2" />
            <Select.Item label="Three Darts" value="3" />
            <Select.Item label="Four Darts" value="4" />
            <Select.Item label="Five Darts" value="5" />
            <Select.Item label="Six Darts" value="6" />
          </Select>
          <Select
            selectedValue={startPoint}
            accessibilityLabel="Start point"
            placeholder="Start point"
            mt={1}
            onValueChange={(itemValue) => setStartPoint(itemValue)}
          >
            <Select.Item label="301 points" value="301" />
            <Select.Item label="501 points" value="501" />
          </Select>
          <Button onPress={() => setGameState(initialGameState)} mt={[2, 2, 1]}>
            RESTART GAME
          </Button>
        </Stack>
        <VStack>
          {gameState.map((round, rountNo) => {
            return (
              <View key={rountNo} style={{ marginTop: 20, marginBottom: 20 }}>
                <Text fontSize="lg">Round: {rountNo + 1}</Text>
                {[...Array(config.numberOfPlayers)].map((_, playerNo) => {
                  return (
                    <View
                      key={playerNo}
                      style={{ marginTop: 5, marginBottom: 5 }}
                    >
                      <Text>Player {playerNo + 1}</Text>
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
                              title={displayScoreLabel(
                                round[playerNo]?.[dartNo]
                              )}
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
          <Button onPress={addRound}>NEXT ROUND</Button>
        </VStack>
        <Flex direction="row" justify="space-around" wrap="wrap" mt={4}>
          {[...Array(config.numberOfPlayers)].map((_, playerNo) => {
            const remainingPoints = getRemainingPoints(playerNo);
            const possibilities = possibleCheckOuts(remainingPoints, 2);

            return (
              <Box key={playerNo} m={1}>
                <Box rounded="xl" bg="coolGray.900" p={14}>
                  <Text fontSize="2xl">Player {playerNo + 1}</Text>
                  <Text fontSize="6xl">{getRemainingPoints(playerNo)}</Text>
                </Box>
                {possibilities && (
                  <Box rounded="xl" mt={1} bg="coolGray.700" p={14}>
                    {possibilities.map((possibility) => {
                      const text = possibility
                        .map(displayScoreLabel)
                        .join(" --> ");
                      return <Text key={text}>{text}</Text>;
                    })}
                  </Box>
                )}
              </Box>
            );
          })}
        </Flex>
        <Box my={32}>
          <Text>Dart calculator made by Han Lin Yap </Text>
        </Box>
      </Center>
    </ScrollView>
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
      <Button
        mx={2}
        my={1}
        width={60}
        colorScheme={displayScoreLabel() !== title ? "indigo" : "success"}
        onPress={() => setIsVisible(true)}
      >
        {title}
      </Button>
      <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <ScrollView style={{ backgroundColor }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 40,
                marginBottom: 10,
              }}
            >
              <Button
                colorScheme="success"
                onPress={() => {
                  onPress(undefined);
                  setIsVisible(false);
                }}
              >
                0
              </Button>
              <Button
                colorScheme="success"
                onPress={() => {
                  onPress({ score: 25, multiplyer: 1 });
                  setIsVisible(false);
                }}
              >
                25
              </Button>
              <Button
                colorScheme="success"
                onPress={() => {
                  onPress({ score: 50, multiplyer: 1 });
                  setIsVisible(false);
                }}
              >
                50
              </Button>
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
                        colorScheme="success"
                        onPress={() => {
                          onPress(score);
                          setIsVisible(false);
                        }}
                      >
                        {label}
                      </Button>
                    );
                  })}
                </View>
              );
            })}
          </View>
          <Button onPress={() => setIsVisible(false)} mb={8}>
            CLOSE
          </Button>
        </ScrollView>
      </Modal>
    </>
  );
};

function Index() {
  const theme = extendTheme({
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "dark",
    },
  });

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <App />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

export default Index;
