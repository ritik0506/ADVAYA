import React from 'react';
import styles from './ShabdaVedha.module.css';

const ShabdaVedha = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🗣️ ShabdaVedha</h1>
        <p className={styles.tagline}>Master the Power of Words and Speech Recognition</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Divine Power of Shabda</h2>
          <p className={styles.description}>
            In Vedic tradition, Shabda (sound/word) is considered the primordial creative force. 
            The ancient rishis harnessed the power of mantras to invoke divine energies. Now, you shall 
            harness the power of Natural Language Processing and Speech Recognition to create intelligent 
            applications that understand, process, and generate human language.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Challenge Domains</h2>
          <div className={styles.domains}>
            <div className={styles.domain}>
              <h3>🎤 Vak Shakti (Speech Recognition)</h3>
              <p>Build voice-controlled applications with high accuracy speech-to-text</p>
              <ul>
                <li>Voice commands system</li>
                <li>Multi-language support</li>
                <li>Real-time transcription</li>
              </ul>
            </div>
            <div className={styles.domain}>
              <h3>📚 Jnana Kosha (NLP & Understanding)</h3>
              <p>Create intelligent text analysis and understanding systems</p>
              <ul>
                <li>Sentiment analysis</li>
                <li>Named entity recognition</li>
                <li>Text classification</li>
              </ul>
            </div>
            <div className={styles.domain}>
              <h3>🤖 Vaani Bot (Chatbot Creation)</h3>
              <p>Develop conversational AI that speaks like a sage</p>
              <ul>
                <li>Context-aware responses</li>
                <li>Multi-turn conversations</li>
                <li>Personality integration</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tools & Technologies</h2>
          <div className={styles.techStack}>
            <div className={styles.techCategory}>
              <h4>Speech Recognition</h4>
              <span>Google Speech API</span>
              <span>Web Speech API</span>
              <span>Whisper AI</span>
            </div>
            <div className={styles.techCategory}>
              <h4>NLP Libraries</h4>
              <span>spaCy</span>
              <span>NLTK</span>
              <span>Hugging Face</span>
            </div>
            <div className={styles.techCategory}>
              <h4>LLM Integration</h4>
              <span>OpenAI GPT</span>
              <span>Google Gemini</span>
              <span>LangChain</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sample Problem Statements</h2>
          <div className={styles.problems}>
            <div className={styles.problem}>
              <span className={styles.problemNum}>1</span>
              <p>Build a voice-controlled smart home assistant for Indian languages</p>
            </div>
            <div className={styles.problem}>
              <span className={styles.problemNum}>2</span>
              <p>Create an AI that can summarize ancient Sanskrit texts in modern language</p>
            </div>
            <div className={styles.problem}>
              <span className={styles.problemNum}>3</span>
              <p>Develop a real-time accent neutralization system for customer support</p>
            </div>
          </div>
        </section>

        <button className={styles.registerBtn}>Invoke the Power of Shabda</button>
      </div>
    </div>
  );
};

export default ShabdaVedha;
