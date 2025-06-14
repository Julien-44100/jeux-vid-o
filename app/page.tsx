'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [scrollLevel, setScrollLevel] = useState(0); // 0 = image1, 1 = image2, 2 = vidéo 1, 3 = vidéo 2
  const [lastY, setLastY] = useState(0);

  function getTimeLeft() {
    const target = new Date('2026-05-26T00:00:00');
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return { jours: 0, heures: 0, minutes: 0, secondes: 0, terminé: true };
    return {
      jours: Math.floor(diff / (1000 * 60 * 60 * 24)),
      heures: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      secondes: Math.floor((diff / 1000) % 60),
      terminé: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastY && scrollLevel === 0) {
        setScrollLevel(1); // vers image 2
      } else if (currentY > lastY && scrollLevel === 1) {
        setScrollLevel(0); // retour à image 1
      } else if (scrollLevel === 0 && currentY > lastY) {
        setScrollLevel(2); // vers première vidéo
      }
       else if (scrollLevel === 2 && currentY < lastY) {
        setScrollLevel(1); // retour à image 2
      } else if (scrollLevel === 3 && currentY < lastY) {
        setScrollLevel(2); // retour à la première vidéo
      }

      setLastY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastY, scrollLevel]);

  return (
    <div className={`${styles.container} ${styles[`step${scrollLevel}`]}`}>
      {scrollLevel < 2 && (
        <>
          <h1 className={styles.title}>⏳ Compte à rebours jusqu’au 26 mai 2026</h1>
          <h2 className={styles.text}>
            {timeLeft.terminé
              ? "🎉 C'est le grand jour !"
              : `${timeLeft.jours} jours, ${timeLeft.heures} heures, ${timeLeft.minutes} minutes, ${timeLeft.secondes} secondes`}
          </h2>
{scrollLevel === 0 ? (
  <button className={styles.button} onClick={() => setScrollLevel(1)}>
    Voir l’image suivante
  </button>
) : (
  <button className={styles.button} onClick={() => setScrollLevel(0)}>
    Revenir à l’image précédente
  </button>
)}

        </>
      )}

      {scrollLevel === 2 && (
        <div className={styles.videoContainer}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/QdBZY2fkU-0?autoplay=1&mute=1"
            title="GTA VI Trailer 1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <button className={styles.button} onClick={() => setScrollLevel(3)}>
            Voir la deuxième vidéo
          </button>
        </div>
      )}

      {scrollLevel === 3 && (
        <div className={styles.videoContainer}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/VQRLujxTm3c?autoplay=1&mute=1"
            title="GTA VI Trailer 2"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
