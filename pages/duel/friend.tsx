import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TypingAnimatedText from "../../components/TypingAnimatedText";
import TypingGame from "../../components/TypingGame";
import styles from "../../styles/Duel_Friend.module.css";

const Friend: NextPage = () => {
  const [socket, setSocket] = useState<Socket>();
  const [duelCode, setDuelCode] = useState<string>("");
  const [matchFound, setMatchFound] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [paragraph, setParagraph] = useState<string>("");
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");

  const router = useRouter();

  const handleGenerateUrl = () => {
    console.log("generate url");
    socket?.emit("generateDuelCode");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    if (!socket?.open) {
      setSocket(io("http://localhost:3000"));
    }
    socket?.on("status", (status: string) => {
      console.log(status);
    });

    socket?.on("duelCode", (duelCode: string) => {
      setDuelCode(duelCode);
      console.log(duelCode);
    });

    socket?.on("MatchFound", () => {
      console.log("Match Found");
      setMatchFound(true);
    });

    socket?.on("joinedDuelResult", (result: boolean) => {
      console.log(result);
    });

    socket?.on("duelStart", (para: string) => {
      setMatchFound(true);
      setParagraph(para);
    });

    if (!router.isReady) return;
    const { code } = router.query;
    if (code) {
      // setDuelCode(code as string);
      socket?.emit("joinDuel", code);
      console.log("join duel", code);
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket, router.isReady]);

  return (
    <Layout>
      <Head>
        <title>NextRacer</title>
      </Head>
      <Header />
      <main className={styles.main}>
        {!matchFound ? (
          <>
            <TypingAnimatedText text="Duel a friend" type="h1" />
            {!duelCode ? (
              <div>
                <p>Generate a URL and play against a friend</p>
                <Button
                  onClick={handleGenerateUrl}
                  text="Generate URL"
                ></Button>
              </div>
            ) : (
              <div>
                <p>Send this URL to your friend</p>
                <p>localhost:3000/duel/friend?code={duelCode}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <div>Match Found</div>
            <TypingGame
              time={time}
              paragraph="Hello, World!"
              startCounter={() => console.log("lul")}
              inputDisabled={inputDisabled}
              userInput={userInput}
              handleChange={handleChange}
            />
          </>
        )}
      </main>
    </Layout>
  );
};

export default Friend;
