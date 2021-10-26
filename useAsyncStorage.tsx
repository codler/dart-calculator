import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useAsyncStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => Promise<void>, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((value) => {
        if (value === null) return initialValue;
        return JSON.parse(value);
      })
      .then(setStoredValue)
      .then(() => setIsInit(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = (value: T) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    return AsyncStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue, isInit];
}

export default useAsyncStorage;
