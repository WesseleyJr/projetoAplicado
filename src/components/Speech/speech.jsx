import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconButton, ButtonContainer, Tooltip } from './styles';

const SpeechRecognition = ({ onTranscript, onClear }) => {
  const [recognition, setRecognition] = useState(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [error, setError] = useState('');

  const startRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Seu navegador não suporta reconhecimento de fala.');
      return;
    }

    const newRecognition = new webkitSpeechRecognition();
    newRecognition.continuous = true;
    newRecognition.interimResults = true;
    newRecognition.lang = 'pt-BR';

    newRecognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        onTranscript(finalTranscript);
      }
    };

    newRecognition.onerror = (event) => {
      setError('Erro no reconhecimento de fala: ' + event.error);
    };

    newRecognition.onend = () => {
      setIsRecognizing(false);
      console.log('Reconhecimento de fala finalizado.');
    };

    newRecognition.start();
    setRecognition(newRecognition);
    setIsRecognizing(true);
    setError('');
  }, [onTranscript]);

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
      setIsRecognizing(false);
    }
  };

  return (
    <ButtonContainer>
      <IconButton onClick={startRecognition} disabled={isRecognizing}>
        <FontAwesomeIcon icon={faMicrophone} />
        <Tooltip>Ativar escrita por fala</Tooltip>
      </IconButton>
      <IconButton onClick={stopRecognition} disabled={!isRecognizing}>
        <FontAwesomeIcon icon={faMicrophoneSlash} />
        <Tooltip>Desativar escrita por fala</Tooltip>
      </IconButton>
      <IconButton onClick={onClear}>
        <FontAwesomeIcon icon={faTrash} />
        <Tooltip>Limpar Diagnóstico</Tooltip>
      </IconButton>
      {error && <p>{error}</p>}
    </ButtonContainer>
  );
};

SpeechRecognition.propTypes = {
  onTranscript: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default SpeechRecognition;