import "./App.css";
import { motion, useAnimationControls } from "framer-motion";
import { createRef, useEffect, useState } from "react";

function App() {
  const [sayYes, setSayYes] = useState(false);
  const [chasing, setChasing] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const text =
    params.get("q") || "Would you like to stay with me through the night";

  const controls = useAnimationControls();
  const btnRef = createRef<HTMLButtonElement>();
  let timer: number | undefined;

  const randomPositionInsidePage = () => {
    let x = Math.random() * (window.innerWidth * 0.9);
    let y = Math.random() * (window.innerHeight * 0.9);

    return { x, y };
  };

  const onMouseOver = () => {
    clearTimeout(timer);
    setChasing(true);
    const { x: newX, y: newY } = randomPositionInsidePage();
    if (btnRef.current) {
      btnRef.current.style.position = "fixed";
      btnRef.current.style.cursor = "none";
      btnRef.current.style.pointerEvents = "none";
      btnRef.current.style.opacity = "0";
    }
    controls.start({
      left: newX,
      top: newY,
      transition: {
        type: "tween",
        duration: 0.1,
        ease: "easeOut",
      },
    });
  };

  const onMouseOut = () => {
    if (btnRef.current) {
      btnRef.current.style.cursor = "pointer";
      btnRef.current.style.opacity = "1";
      btnRef.current.style.pointerEvents = "auto";
    }
    timer = setTimeout(() => {
      setChasing(false);
    }, 3000);
  };

  useEffect(() => {
    if (chasing) {
      document.documentElement.classList.add("chasing");
    } else {
      document.documentElement.classList.remove("chasing");
    }
  }, [chasing]);

  return (
    <>
      <div className={"flex flex-col items-center space-y-8"}>
        {sayYes ? (
          <>
            <h1 className={"font-bold text-6xl my-8"}>Yeyyyyyy!!</h1>
            <img
              src={
                "https://media.giphy.com/media/KPgOYtIRnFOOk/giphy.gif?cid=790b7611yyn85onatyeexfw720hrm737bikykk9fw58a8y9s&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
              }
              style={{ objectFit: "contain" }}
            />
          </>
        ) : (
          <>
            <h1 className={"title font-semibold max-w-xl"}>{text + "?"}</h1>
            <div className={"relative w-[375px] h-[375px]"}>
              <img
                className={"absolute"}
                src="https://media.giphy.com/media/51Uiuy5QBZNkoF3b2Z/giphy.gif?cid=82a1493bhnb789hohgxoxjzi9dccy75m4btinxope9w6t0aq&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                width={375}
                height={375}
                style={{ objectFit: "contain", opacity: chasing ? 1 : 0 }}
              />
              <img
                className={"absolute"}
                src={
                  "https://media.giphy.com/media/los0R5UJA9bOuTmK7t/giphy.gif"
                }
                width={375}
                height={375}
                style={{ objectFit: "contain", opacity: chasing ? 0 : 1 }}
              />
            </div>
            <div className={"button-wrapper w-[400px] flex justify-between"}>
              <motion.button
                className={"ys"}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  setSayYes(true);
                }}
                onMouseOver={() => {
                  clearTimeout(timer);
                  setChasing(false);
                }}
              >
                Yes
              </motion.button>
              <motion.button
                animate={controls}
                whileHover={{ scale: 0.9 }}
                ref={btnRef}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
              >
                No
              </motion.button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
