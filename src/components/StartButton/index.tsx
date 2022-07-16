import './styles.css'

interface StartButtonProps {
  onStartGame: () => void
  text?: string
}

export function StartButton({ onStartGame, text }: StartButtonProps) {
  return (
    <button onClick={onStartGame}>
      <span className="button_top">{text || "Iniciar Teste"}</span>
    </button>
  );
}
