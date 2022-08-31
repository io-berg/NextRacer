import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TypingAnimatedText from "../../components/TypingAnimatedText";
import styles from "../../styles/Duel_Friend.module.css";

const Friend: NextPage = () => {
  const [socket, setSocket] = useState<Socket>();
  const handleGenerateUrl = () => {
    console.log("generate url");
    socket?.emit("generateDuelCode");
  };

  useEffect(() => {
    if (!socket) {
      setSocket(io("http://localhost:3000"));
    }
    socket?.on("status", (status: string) => {
      console.log(status);
    });

    socket?.on("duelCode", (duelCode: string) => {
      console.log(duelCode);
    });
  }, [socket]);

  return (
    <Layout>
      <Head>
        <title>NextRacer</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <TypingAnimatedText text="Duel a friend" type="h1" />
        <p>Generate a URL and play against a friend</p>
        <Button onClick={handleGenerateUrl} text="Generate URL"></Button>
      </main>
    </Layout>
  );
};

export default Friend;
