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
          src="/minecraft-bg-better.webp"
          alt="Minecraft background"
          fill
          priority
          quality={85}
          sizes="100vw"
          className={styles.backgroundImage}
        />
        <div className={styles.grid}></div>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <div className={styles.pixelBorder}>
              <h1 className={styles.title}>
                <span className={styles.titleGlow}>ICEBREAKER</span>
                <span className={styles.titleYear}>2025</span>
              </h1>
            </div>

          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Event Registration</h2>
              <div className={styles.decorativeLine}></div>
            </div>
            
            <IcebreakerForm />
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.footerText}>
              Ready to break the ice? Join us for an unforgettable experience at ICEBREAKER 2025!
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
