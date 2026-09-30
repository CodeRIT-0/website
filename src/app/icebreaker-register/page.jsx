'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import IcebreakerForm from '../../components/IcebreakerForm/IcebreakerForm';
import styles from './page.module.css';

export default function IcebreakerRegister() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image
          src="/images/icebreaker/icebreaker-bg2.webp"
          alt="Comic City Background"
          fill
          priority
          quality={90}
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </div>

      <div className={`${styles.character} ${styles.charSpidermanGroup}`}>
        <div className={styles.spiderWeb} aria-hidden="true" />
        <Image src="/images/icebreaker/characters/spider.webp" alt="Spider-Man" width={215} height={215} className={styles.spiderMan} />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.titleMain}>ICEBREAKER</span>
            <span className={styles.titleYear}>2026</span>
          </h1>
        </header>

        <main className={styles.main}>
          <div className={styles.formCard}>
            <div className={`${styles.character} ${styles.charDocStrange}`}>
              <Image src="/images/icebreaker/characters/doc-strange-nobg.webp" alt="Doctor Strange" width={250} height={198} className={`${styles.pixelArt} ${styles.float} ${styles.docImg}`} />
              <div className={styles.bubble}>Ready to break the ice?</div>
            </div>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Registration</h2>
            </div>
            
            <IcebreakerForm />
          </div>
        </main>

        <div className={styles.squad}>
          <Image src="/images/icebreaker/characters/captain-marvel.webp" alt="Captain Marvel" width={203} height={330} className={`${styles.pixelArt} ${styles.float} ${styles.marvel}`} style={{ '--dur': '3.4s' }} />
          <Image src="/images/icebreaker/characters/wavenger2.webp" alt="Wavenger" width={109} height={123} className={`${styles.pixelArt} ${styles.float} ${styles.wanda}`} style={{ '--dur': '2.8s', '--delay': '-1s' }} />
          <Image src="/images/icebreaker/characters/drdoom.webp" alt="Dr. Doom" width={335} height={398} className={`${styles.pixelArt} ${styles.float} ${styles.doom}`} style={{ '--dur': '3.6s', '--delay': '-0.5s' }} />
          <Image src="/images/icebreaker/characters/cap-america.webp" alt="Captain America" width={354} height={531} className={`${styles.float} ${styles.cap}`} style={{ '--dur': '4s', '--delay': '-2s' }} />
        </div>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Join us for an unforgettable experience at ICEBREAKER 2026!
          </p>
        </footer>
      </div>
    </div>
  );
}
