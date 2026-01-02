class NewsSection extends HTMLElement {
    constructor() {
        super();
        // ============================================
        // МАССИВ НОВОСТЕЙ
        // Первая новость показывается сразу
        // Остальные загружаются по кнопке
        // ============================================
        this.allNewsData = [
            {
                id: 1,
                title: "DeepSeek лучший!",
                date: "1 января, 2026",
                text: "Спасибо дипсику за код для новостей :)",
                image: "."
            }
            {
  id: 2,
  title: "Уже скоро...",
  date: "2 января, 2026",
  text: "Я уже готовлю сайт с инструментами - KST Tools. Например, сейчас уже готов супер простой медиаплеер. Для тех, кто хочет попробовать - вот ссылка: https://nof7351.github.io/KST-Tools/SuperSimpleMediaPlayer/SuperSimpleMediaPlayer",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo5CCs2bmRfzBkBwdLvMNKtbiVhUMKqR3THQ&s"
}
        ];

        // Фильтруем только валидные новости
        this.allNewsData = this.allNewsData.filter(news => news && news.id);

        // Проверяем уникальность ID
        this.validateNewsIds();

        // Сортируем по ID
        this.allNewsData.sort((a, b) => a.id - b.id);

        // Текущие отображаемые новости (изначально только первая)
        const firstNews = this.allNewsData.find(news => news.id === 1) || this.allNewsData[0];
        this.currentNewsData = firstNews ? [firstNews] : [];
        this.visibleCount = this.currentNewsData.length;
    }

    // Проверка уникальности ID
    validateNewsIds() {
        const ids = this.allNewsData.map(news => news.id);
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

        if (duplicates.length > 0) {
            console.error(`❌ ОШИБКА: Дублирующиеся ID новостей: ${duplicates.join(', ')}`);
            console.error('Исправьте ID в массиве allNewsData!');
        }

        return duplicates.length === 0;
    }

    connectedCallback() {
        this.render();
        this.applyStyles();
    }

    render() {
        // Если нет новостей
        if (this.allNewsData.length === 0) {
            this.innerHTML = `
        <section class="news-section">
          <div class="container mx-auto px-4 py-20">
            <div class="text-center">
              <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-newspaper text-gray-400 text-3xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-700 mb-3">Новостей пока нет</h3>
              <p class="text-gray-600 max-w-md mx-auto">
                Скоро здесь появятся свежие новости
              </p>
            </div>
          </div>
        </section>
      `;
            return;
        }

        const occupiedIds = this.allNewsData.map(news => news.id).sort((a, b) => a - b);

        this.innerHTML = `
      <section class="news-section">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl font-bold text-center mb-12">📰 Последние новости</h2>
          
          <!-- Статистика (простая) -->
          <div class="news-stats mb-8 max-w-4xl mx-auto">
            <div class="flex items-center justify-center gap-6 text-center">
              <div>
                <div class="text-2xl font-bold text-amber-600">${this.allNewsData.length}</div>
                <div class="text-sm text-gray-500">всего новостей</div>
              </div>
              <div class="h-8 w-px bg-gray-300"></div>
              <div>
                <div class="text-2xl font-bold text-blue-600">${this.visibleCount}</div>
                <div class="text-sm text-gray-500">показано</div>
              </div>
            </div>
          </div>
          
          <!-- Контейнер новостей -->
          <div class="news-container grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            ${this.currentNewsData.map(news => `
              <div class="news-item bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fadeInUp">
                <div class="p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h3 class="text-2xl font-bold text-gray-800">${news.title}</h3>
                      <div class="flex items-center mt-2 gap-2 flex-wrap">
                        <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          <i class="far fa-calendar-alt mr-1"></i> ${news.date}
                        </span>
                        ${news.id === 1 ?
                '<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Первая новость</span>' :
                ''
            }
                      </div>
                    </div>
                  </div>
                  <p class="text-gray-600 mb-6">${news.text}</p>
                  <div class="news-image">
                    <img src="${news.image}" alt="${news.title}" class="w-full h-64 object-cover rounded-lg">
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Кнопка загрузки -->
          <div class="text-center mt-12">
            ${this.visibleCount < this.allNewsData.length ? `
              <button id="loadMoreNews" class="load-more-btn inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i class="fas fa-plus-circle mr-2"></i>
                Загрузить больше новостей
                <span class="ml-2 text-sm bg-white text-amber-800 px-2 py-1 rounded-full">
                  +${Math.min(2, this.allNewsData.length - this.visibleCount)}
                </span>
              </button>
              <div class="text-xs text-gray-500 mt-2">
                Ещё ${this.allNewsData.length - this.visibleCount} новости(ей)
              </div>
            ` : `
              <div class="text-center">
                <div class="inline-flex items-center text-green-600 px-4 py-2 rounded-lg mb-3">
                  <i class="fas fa-check-circle mr-2"></i>
                  Все новости загружены
                </div>
              </div>
            `}
          </div>
        </div>
      </section>
    `;

        // Добавляем иконки Font Awesome
        if (!document.querySelector('#font-awesome')) {
            const faLink = document.createElement('link');
            faLink.id = 'font-awesome';
            faLink.rel = 'stylesheet';
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(faLink);
        }

        // Обработчик кнопки загрузки
        this.querySelector('#loadMoreNews')?.addEventListener('click', () => {
            this.loadMoreNews();
        });
    }

    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .news-section {
        padding: 5rem 0;
        background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
      }
      
      .news-item {
        transition: transform 0.3s ease;
      }
      
      .news-item:hover {
        transform: translateY(-5px);
      }
      
      .news-image img {
        transition: transform 0.5s ease;
      }
      
      .news-item:hover .news-image img {
        transform: scale(1.02);
      }
      
      .load-more-btn {
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }
      
      @media (max-width: 768px) {
        .news-section {
          padding: 3rem 0;
        }
        
        .news-stats .flex {
          flex-direction: column;
          gap: 1rem;
        }
        
        .news-stats .h-8 {
          display: none;
        }
      }
    `;
        this.appendChild(style);
    }

    // Загрузка больше новостей
    loadMoreNews() {
        this.visibleCount = Math.min(this.visibleCount + 2, this.allNewsData.length);
        this.currentNewsData = this.allNewsData.slice(0, this.visibleCount);
        this.render();

        // Плавная прокрутка к последней загруженной новости
        setTimeout(() => {
            const lastNewsItem = this.querySelectorAll('.news-item:last-child')[0];
            if (lastNewsItem) {
                lastNewsItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }, 100);
    }

    // Получение информации о новостях
    getNewsInfo() {
        return {
            total: this.allNewsData.length,
            visible: this.currentNewsData.length,
            occupiedIds: this.allNewsData.map(news => news.id).sort((a, b) => a - b),
            firstNewsId: this.allNewsData[0]?.id || null
        };
    }
}

customElements.define('news-section', NewsSection);

// Простой API для управления новостями
window.NewsManager = {
    // Получить информацию
    getInfo: function () {
        const newsSection = document.querySelector('news-section');
        if (newsSection) {
            return newsSection.getNewsInfo();
        }
        return null;
    },

    // Загрузить больше новостей
    loadMore: function () {
        const newsSection = document.querySelector('news-section');
        if (newsSection) {
            newsSection.loadMoreNews();
        }
    }

};
