import { ChakraProvider } from "@chakra-ui/react";
import { createContext, useState } from "react";
import { Header } from "Common/Header";
import { ContentPane } from "Common/ContentPane";

export const TabIndex = createContext(0);

function App() {
  const [selectedMenu, setSelectedMenu] = useState("home");
  return (
    <ChakraProvider>
      <Header selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <ContentPane selectedMenu={selectedMenu} />
    </ChakraProvider>
  );
}

export { App };
