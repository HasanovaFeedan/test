import React, { useState, useEffect } from 'react'
import "./header.scss"
import GridLines from '../../../components/site/firstsection/GridLines';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenuContent, setShowMenuContent] = useState(false);

  useEffect(() => {
    let timer;
    if (menuOpen) {
      setShowMenuContent(false);
      timer = setTimeout(() => setShowMenuContent(true), 600); //menyu nece saniye sonra gelecek
    } else {
      setShowMenuContent(false);
    }
    return () => clearTimeout(timer);
  }, [menuOpen]);

  const mainMenu = ['INDEX', 'PROFILE', 'WORKS', 'CONTACT'];
  const socials = ['X ↗', 'Instagram↗', 'Vimeo ↗', 'YouTube ↗', 'Behance ↗', 'GitHub ↗'];

  return (
    <div style={{position: 'relative'}}>
      <GridLines />
      <div className="header-contexts">
        <div className="headerleft">
          <p>Kaito Note</p>
        </div>
        {!menuOpen && (
          <div className="headerright" onClick={() => setMenuOpen(true)} style={{cursor:'pointer'}}>
            <p>{'{MENU}'}</p>
          </div>
        )}
      </div>
      {menuOpen && (
        <div className="side-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="side-menu" style={{width: '50vw'}} onClick={e => e.stopPropagation()}>
            <button className="menu-close-btn" onClick={() => setMenuOpen(false)}>
         <p className='close'>     {'{CLOSE}'}</p>
            </button>
            {showMenuContent && (
              <>
                <ul className='flex-ul'>
                  {mainMenu.map((item, i) => (
                    <li
                      key={item}
                      className={`menu-animate menu-animate-delay${i}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="social-grid">
                  {socials.map((item, i) => (
                    <li
                      key={item}
                      className={`menu-animate menu-animate-delay${i+mainMenu.length}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Header