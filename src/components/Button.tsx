import { theme } from "native-base";
import { ReactNode } from "react";
import { Button, ButtonProps } from "react-native";

const ThemedButton = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<Button> &
    Readonly<ButtonProps> &
    Readonly<{ children?: ReactNode }>
) => {
  const { color, ...rest } = props;

  return <Button color={color ?? theme.colors.emerald[500]} {...rest} />;
};

export default ThemedButton;
