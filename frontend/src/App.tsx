import { ChakraProvider, Box } from "@chakra-ui/react";
import { createContext, useState } from "react";
import { Header } from "Common/Header";
import { MainPane } from "Common/MainPane";

export const TabIndex = createContext(0);

function App() {
  const [selectedMenu, setSelectedMenu] = useState("home");
  return (
    <ChakraProvider>
      <Header selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <MainPane selectedMenu={selectedMenu} />
    </ChakraProvider>
  );
}

export { App };
