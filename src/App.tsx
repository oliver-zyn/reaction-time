import { useEffect, useState } from "react";
import { ResultModal } from "./components/ResultModal";
import { StartButton } from "./components/StartButton";
import "./style.css";

export function App() {
  const [isGameStarted, setIsGameStated] = useState(false);
  const [circleColor, setCircleColor] = useState("white");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageModal, setMessageModal] = useState('')
  const [isCounterActive, setIsCounterActive] = useState(false);
  const [isCounterPaused, setIsCounterPaused] = useState(true);
  const [time, setTime] = useState(0);

  const colors = ["red", "yellow", "greenyellow"];

  useEffect(() => {
    let interval = 0;
  
    if (isCounterActive && isCounterPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
        console.log(time);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isCounterActive, isCounterPaused]);

  const startCounter = () => {
    setIsCounterActive(true);
    setIsCounterPaused(false);
  };

  const pauseCounter = () => {
    setIsCounterPaused(true);
  };

  function startGame() {
    setIsGameStated(true);
    resetGame()

    let time = Math.round(Math.random() * 10000);

    if (time <= 1000) {
      time += 1500;
    }

    changeCircleColor(time);
  }

  function changeCircleColor(time: number) {
    setTimeout(() => {
      setCircleColor(colors[Math.floor(Math.random() * colors.length)]);

      startCounter()
    }, time);
  }

  function handleCircleClick() {
    pauseCounter()
    setIsModalOpen(true)

    if (circleColor === "white") {
      setMessageModal('Espere o círculo mudar de cor!')
    } else {
      setMessageModal(`O seu tempo foi de ${time / 1000} segundos`)
    }
  }
  
  function resetGame() {
    setIsCounterActive(false);
    setTime(0);
    setCircleColor('white')
    setIsModalOpen(false)
  }

  return (
    <main>
      {isGameStarted ? (
        <div
          className={`circle ${circleColor} ${isModalOpen ? 'hidden' : ''}`}
          onClick={handleCircleClick}
        ></div>
      ) : (
        <StartButton onStartGame={startGame} />
      )}

      {isModalOpen ? (
        <ResultModal messageModal={messageModal} onStartGame={startGame} />
      ) : null}
    </main>
  );
}
