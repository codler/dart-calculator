import { theme } from "native-base";
import { ReactNode } from "react";
import { Text, TextProps } from "react-native";

const ThemedText = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<Text> &
    Readonly<TextProps> &
    Readonly<{ children?: ReactNode }>
) => {
  const { style, ...rest } = props;

  return (
    <Text
      style={{
        color: theme.colors.warmGray[50],
        ...(style as any),
      }}
      {...rest}
    />
  );
};

export default ThemedText;
