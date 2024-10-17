import React, { useState } from "react";
import { ethers, Signer } from 'ethers';
import "./App.css"; // Importando o CSS
import { getMetamaskProvider } from "./metamaskService";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, Button, Input, InputGroup, Stack } from "@chakra-ui/react";
import ABI from './abi.json';
import { providers } from "web3";

const Dojo = () => {
  const [texto, setTexto] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");

  const CONTRACT_ADDRESS = "0x0e736a5c39B7Cdf798cdd2A3fa7d88Cf4f07804e"

  async function mostrarTexto() {
      
    
    try {
      const provider = await getDefaultProvider();
      const signer = provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const contractSigner = contract.connect(signer);

      const tx = await contractSigner.sendMessage({String});
      setOutput(JSON.stringify(tx));

      console.log(signer);


    }
    catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="papel">
      <Box
        bg="white"
        w="50%"
        h="20%"
        p={4}
        marginTop={10}
        id="outputText"
        color="black"
        rounded={10}
      >
        {output}
      </Box>
      <Stack spacing={2}>
        <InputGroup>
          <Input
            placeholder="Send text"
            onChange={(e) => setTexto(e.target.value)}
            value={texto}
            bg="white"
          />
        </InputGroup>
        <Button size="lg" onClick={mostrarTexto}>
          Update
        </Button>
      </Stack>
      <Stack>
        <ConnectButton />
      </Stack>
    </div>
  );
};

export default Dojo;
