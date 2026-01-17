'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { questions, personalities, PersonalityType } from './data/quizData';

type QuizState = 'welcome' | 'quiz' | 'results';

interface Results {
  personality: PersonalityType;
  percentage: number;
}

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PersonalityType[]>([]);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quizState === 'results') {
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#8b6d47', '#c9a86c', '#d5c4a1', '#5c4033'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [quizState]);

  const handleStartQuiz = () => {
    setQuizState('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (personality: PersonalityType) => {
    const newAnswers = [...answers, personality];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState('results');
    }
  };

  const calculateResults = (): Results[] => {
    const counts: Record<PersonalityType, number> = {
      'bold-adventurer': 0,
      'sweet-enthusiast': 0,
      'social-butterfly': 0
    };

    answers.forEach(answer => {
      counts[answer]++;
    });

    const total = answers.length;
    const results: Results[] = Object.entries(counts)
      .map(([personality, count]) => ({
        personality: personality as PersonalityType,
        percentage: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return results;
  };

  const handleRestart = () => {
    setQuizState('welcome');
    setCurrentQuestion(0);
    setAnswers([]);
    setCopied(false);
  };

  const handleShare = async (topPersonality: typeof personalities['bold-adventurer']) => {
    const shareText = `Moja kawowa osobowość to: ${topPersonality.tagline}! ☕\n\n${topPersonality.description}\n\nMój napój: ${topPersonality.signatureDrink}\n\nOdkryj swoją kawową osobowość w Basecamp Coffee!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Moja Kawowa Osobowość',
          text: shareText,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveImage = async () => {
    const results = calculateResults();
    const topResult = results[0];
    const topPersonality = personalities[topResult.personality];

    // Create a temporary div for capture
    const captureDiv = document.createElement('div');
    captureDiv.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: 500px;
      padding: 40px;
      background: #ffffff;
      font-family: Arial, sans-serif;
      border: 3px solid #d5c4a1;
      border-radius: 24px;
    `;

    captureDiv.innerHTML = `
      <h1 style="font-family: Georgia, serif; font-size: 24px; color: #5c4033; text-align: center; margin-bottom: 24px;">
        Twoja Kawowa Osobowość
      </h1>
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="width: 150px; height: 150px; margin: 0 auto 20px; border-radius: 50%; overflow: hidden; border: 4px solid #c9a86c;">
          <img src="${topPersonality.image}" style="width: 100%; height: 100%; object-fit: cover;" crossorigin="anonymous" />
        </div>
        <h2 style="font-family: Georgia, serif; font-size: 20px; color: #5c4033; margin-bottom: 12px;">
          ${topPersonality.tagline}
        </h2>
        <p style="color: #8b6d47; font-size: 14px; line-height: 1.5; margin-bottom: 16px; padding: 0 20px;">
          ${topPersonality.description}
        </p>
        <div style="background: #f5ebe0; padding: 12px 20px; border-radius: 12px; display: inline-block;">
          <span style="color: #8b6d47; font-size: 13px;">Twój napój: </span>
          <span style="color: #5c4033; font-weight: bold; font-size: 14px;">${topPersonality.signatureDrink}</span>
        </div>
      </div>
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 14px; color: #8b6d47; margin-bottom: 16px; font-weight: 600;">Twoje wyniki:</h3>
        ${results.map(r => {
          const p = personalities[r.personality];
          return `
            <div style="margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 13px; color: #5c4033;">${p.tagline}</span>
                <span style="font-size: 13px; color: #8b6d47; font-weight: 600;">${r.percentage}%</span>
              </div>
              <div style="height: 8px; background: #e8ddd4; border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: ${r.percentage}%; background: ${p.color}; border-radius: 4px;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <p style="text-align: center; color: #c9a86c; font-size: 12px; font-weight: 600; letter-spacing: 1px;">
        ☕ Basecamp Coffee
      </p>
    `;

    document.body.appendChild(captureDiv);

    // Wait for image to load
    const img = captureDiv.querySelector('img');
    if (img) {
      await new Promise((resolve) => {
        if (img.complete) resolve(true);
        else img.onload = () => resolve(true);
      });
    }

    const canvas = await html2canvas(captureDiv, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    document.body.removeChild(captureDiv);

    const link = document.createElement('a');
    link.download = 'moja-kawowa-osobowosc.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  // Welcome Screen
  if (quizState === 'welcome') {
    return (
      <div className="quiz-container">
        <div className="welcome-card">
          <div className="coffee-icon">☕</div>
          <h1>Odkryj swoją Kawową Osobowość</h1>
          <p className="subtitle">
            Odpowiedz na 5 pytań i dowiedz się, jaki typ kawosza w Tobie drzemie!
          </p>
          <button onClick={handleStartQuiz} className="start-button">
            Rozpocznij Quiz
          </button>
          <p className="brand">Basecamp Coffee</p>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (quizState === 'quiz') {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="quiz-container">
        <div className="quiz-card" key={`card-${currentQuestion}`}>
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-text">
              Pytanie {currentQuestion + 1} z {questions.length}
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
                key={`progress-${currentQuestion}`}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="question" key={`question-${currentQuestion}`}>
            {question.question}
          </h2>

          {/* Options */}
          <div className="options" key={`options-${currentQuestion}`}>
            {question.options.map((option, index) => (
              <button
                key={`${currentQuestion}-${index}`}
                onClick={() => handleAnswer(option.personality)}
                className="option-button"
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-text">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  const results = calculateResults();
  const topResult = results[0];
  const topPersonality = personalities[topResult.personality];

  return (
    <div className="quiz-container">
      <div className="results-card" ref={resultsRef}>
        <h1>Twoja Kawowa Osobowość</h1>

        {/* Main Result */}
        <div className="main-result">
          <div className="result-image-container">
            <img
              src={topPersonality.image}
              alt={topPersonality.name}
              className="result-image"
            />
          </div>
          <h2 className="personality-name">{topPersonality.tagline}</h2>
          <p className="personality-description">{topPersonality.description}</p>
          <div className="signature-drink">
            <span className="drink-label">Twój napój:</span>
            <span className="drink-name">{topPersonality.signatureDrink}</span>
          </div>
        </div>

        {/* All Results */}
        <div className="all-results">
          <h3>Twoje wyniki:</h3>
          {results.map((result, index) => {
            const personality = personalities[result.personality];
            return (
              <div key={index} className="result-bar-container">
                <div className="result-bar-header">
                  <span className="result-bar-name">{personality.tagline}</span>
                  <span className="result-bar-percentage">{result.percentage}%</span>
                </div>
                <div className="result-bar">
                  <div
                    className="result-bar-fill"
                    style={{
                      width: `${result.percentage}%`,
                      backgroundColor: personality.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="action-buttons">
          <button
            onClick={handleSaveImage}
            className="action-button"
          >
            📷 Zapisz jako zdjęcie
          </button>
          <button
            onClick={() => handleShare(topPersonality)}
            className="action-button"
          >
            {copied ? '✓ Skopiowano!' : '📤 Udostępnij wynik'}
          </button>
          <button onClick={handleRestart} className="action-button">
            🔄 Zagraj ponownie
          </button>
        </div>

        <p className="brand">Basecamp Coffee</p>
      </div>
    </div>
  );
}
