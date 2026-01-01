class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
        }
        .logo {
          height: 40px;
          display: flex;
          align-items: center;
        }
        
        .logo img {
          height: 100%;
          width: auto;
        }
.nav-links {
          display: flex;
          gap: 2rem;
        }
        
        .nav-link {
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
          position: relative;
        }
        
        .nav-link:hover {
          color: #f59e0b;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #f59e0b;
          transition: width 0.3s;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #111827;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
        }
      </style>
      
      <div class="navbar-container">
        <a href="/" class="logo">
          <img src="https://raw.githubusercontent.com/NOF7351/KST/refs/heads/main/Resourses/logo.png" alt="logo">
        </a>
<div class="nav-links">
          <a href="/" class="nav-link">Главная</a>
          <a href="#about" class="nav-link">Кто мы?</a>
          <a href="#projects" class="nav-link">Проекты</a>
          
        </div>
        
        <button class="mobile-menu-btn">
          <i data-feather="menu"></i>
        </button>
      </div>
    `;
    }
}

customElements.define('custom-navbar', CustomNavbar);