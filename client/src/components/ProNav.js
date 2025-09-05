import React from 'react';
import styles from './ProNav.module.css';
import { Link } from 'react-router-dom';

function ProNav({ onReset }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand} onClick={onReset}>
        <Link to="/" className={styles.brandLink}>CaloTrack</Link>
      </div>

      <ul className={styles.navbarLinks}>
        {/* <li className={styles.dropdown}>
          <span>features <span>▼</span></span>
        </li> */}
       <li className={styles.dropdown}>
  <button className={styles.dropdownToggle}>
    Learn <span className={styles.arrow}>▾</span>
  </button>
  <ul className={styles.dropdownMenu}>
    <li><Link to="/case-study">Case Study</Link></li>
    <li><Link to="/in-depth-article">In-Depth Article</Link></li>
  </ul>
</li>

        {/* <li className={styles.dropdown}>
          <span>tools <span>▼</span></span>
        </li> */}
        <div className={styles.Roadmap}>
  <li>
  <Link to="/roadmap">Roadmap</Link>
</li>
        </div>
     
      </ul>
    </nav>
  );
}

export default ProNav;
