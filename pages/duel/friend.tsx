import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TypingAnimatedText from "../../components/TypingAnimatedText";
import TypingDuel from "../../components/TypingDuel";
import styles from "../../styles/Duel_Friend.module.css";

interface duelProgress {
  player1: Number;
  player2: Number;
}

const Friend: NextPage = () => {
  const [socket, setSocket] = useState<Socket>();
  const [duelCode, setDuelCode] = useState<string>("");
  const [matchFound, setMatchFound] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [paragraph, setParagraph] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [serverCountDownTime, setServerCountDownTime] = useState<number>(0);
  const interval = useRef<NodeJS.Timer>();
  const [progress, setProgress] = useState<duelProgress>({
    player1: 0,
    player2: 0,
  });
  const [imPlayer, setImPlayer] = useState<string>("");

  const router = useRouter();

  const handleGenerateUrl = () => {
    console.log("generate url");
    socket?.emit("generateDuelCode");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    socket?.emit("userInput", e.target.value);
    if (e.target.value === paragraph) {
      interval.current && clearInterval(interval.current);
    }
  };

  const startCounter = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }

    interval.current = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);
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
    });

    socket?.on("matchFound", (para: string) => {
      setParagraph(para);
      console.log(para);
    });

    socket?.on("joinedDuelResult", (result: boolean) => {
      console.log(result);
    });

    socket?.on("duelStart", () => {
      setTimeout(() => {
        console.log("start");
      }, 3000);
      setMatchFound(true);
    });

    socket?.on("Countdown", (time: number) => {
      setServerCountDownTime(time);
    });

    socket?.on("duelProgress", (progress: duelProgress) => {
      setProgress(progress);
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
        {!matchFound || !paragraph ? (
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
            <p>p1: {progress.player1.toString()} %</p>
            <p>p2: {progress.player2.toString()} %</p>
            <TypingDuel
              paragraph={paragraph}
              serverCountDownTime={serverCountDownTime}
              inputDisabled={serverCountDownTime === 0 ? false : true}
              userInput={userInput}
              handleChange={handleChange}
              time={time}
              startCounter={startCounter}
            />
          </>
        )}
      </main>
    </Layout>
  );
};

export default Friend;
