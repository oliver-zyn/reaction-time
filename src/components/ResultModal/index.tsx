import { StartButton } from "../StartButton";
import "./styles.css";

interface ResultModalProps {
  messageModal: string
  onStartGame: () => void
}

export function ResultModal({ messageModal, onStartGame }: ResultModalProps) {
  return (
    <div className="result-modal">
      <div className="time-modal">{messageModal}</div>
      <StartButton onStartGame={onStartGame} text="Tente Novamente" />
    </div>
  );
}
