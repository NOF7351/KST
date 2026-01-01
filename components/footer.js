class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #111827;
          color: #f3f4f6;
          padding: 4rem 2rem;
        }
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
        }
        .footer-logo {
          height: 50px;
          margin-bottom: 1.5rem;
          display: inline-block;
        }
        
        .footer-logo img {
          height: 100%;
          width: auto;
        }
.footer-description {
          color: #9ca3af;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
.footer-heading {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: white;
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        
        .footer-link {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .footer-link:hover {
          color: #f59e0b;
        }
        
        .copyright {
          text-align: center;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid #1f2937;
          color: #9ca3af;
        }
        
        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
          }
        }
      </style>
      
      <div class="footer-container">
        <div>
          <a href="/" class="footer-logo">
            <img src="https://raw.githubusercontent.com/NOF7351/KST/refs/heads/main/Resourses/logo.png" alt="logo">
          </a>
<p class="footer-description">
            Лучшие проекты, созданные для каждого.
          </p>
</div>
        
        <div>
          <h3 class="footer-heading">Навигация</h3>
          <div class="footer-links">
            <a href="/" class="footer-link">Главная</a>
            <a href="#about" class="footer-link">О нас</a>
            <a href="#projects" class="footer-link">Проекты</a>
</div>
        </div>
        
        <div>
          <h3 class="footer-heading">Контакты</h3>
          <div class="footer-links">
            <a href="mailto:kst-business@hotmail.com" class="footer-link flex items-center gap-2">
              <i data-feather="mail" class="w-4 h-4"></i> kst-business@hotmail.com
            </a>
            <a href="tel:+7//////////" class="footer-link flex items-center gap-2">
              <i data-feather="phone" class="w-4 h-4"></i> +7 (///) ///-//-//
            </a>
            <a href="#" class="footer-link flex items-center gap-2">
              <i data-feather="map-pin" class="w-4 h-4"></i> .
            </a>
          </div>
        </div>
      </div>
      
      <div class="copyright">
        &copy; ${new Date().getFullYear()} КСТ. Все права защищены.
      </div>
    `;
    }
}

customElements.define('custom-footer', CustomFooter);