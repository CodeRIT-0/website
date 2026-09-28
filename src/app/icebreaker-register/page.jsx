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
          src="/images/icebreaker/icebreaker-bg.webp"
          alt="Comic City Background"
          fill
          priority
          quality={85}
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </div>

      <div className={`${styles.character} ${styles.charSpidermanGroup}`}>
        <Image src="/images/icebreaker/characters/spiderman-web.webp" alt="Web" width={10} height={500} className={styles.spiderWeb} />
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
          {/* Decorative characters */}
          <div className={`${styles.character} ${styles.charIronman}`}>
            <Image src="/images/icebreaker/characters/ironman.webp" alt="Iron Man" width={120} height={120} />
          </div>
          <div className={`${styles.character} ${styles.charCap}`}>
            <Image src="/images/icebreaker/characters/captain-america.webp" alt="Captain America" width={130} height={130} />
          </div>
          <div className={`${styles.character} ${styles.charDrDoom}`}>
            <Image src="/images/icebreaker/characters/drdoom.webp" alt="Dr. Doom" width={140} height={140} />
          </div>

          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Registration</h2>
            </div>
            
            <IcebreakerForm />
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.footerText}>
              Ready to break the ice? Join us for an unforgettable experience at ICEBREAKER 2026!
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
