import React from "react";
import styles from "@/styles/loader.module.css";

export default function Loading() {
  return (
    <section className={styles.loading_section}>
      <div className={styles.loading}></div>
    </section>
  );
}
