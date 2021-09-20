import {
  IconButton, IconButtonProps, useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import useSound from "use-sound";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  const [play] = useSound("/audios/lightswitch.mp3", {
    volume: 0.05,
    sprite: {
      on: [0, 300],
      off: [500, 300]
    }
  });

  const handleClick = () => {
    text === "dark" ? play({ id: "on" }) : play({ id: "off" });
    toggleColorMode();
  };

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={handleClick}
        icon={<SwitchIcon />}
        aria-label={`Switch to ${text} mode`}
        {...props}
      />
    </AnimatePresence>
  );
};
