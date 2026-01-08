class NewsSection extends HTMLElement {
  constructor() {
    super();
    // ============================================
    // МАССИВ НОВОСТЕЙ
    // 
    // ВНИМАНИЕ: Все ID изначально свободны
    // Новости будут сортироваться по убыванию ID
    // Самые новые (с наибольшим ID) показываются первыми
    // 
    // Для добавления новостей:
    // 1. Откройте редактор: news-editor.html
    // 2. Создайте новости
    // 3. Скопируйте сгенерированный код
    // 4. Замените этот массив скопированным кодом
    // 5. Сохраните файл и обновите страницу
    // ============================================
    
    // ============================================
    // МАССИВ НОВОСТЕЙ (сортировка: новые → старые)
    // Самые новые новости (с наибольшим ID) показываются первыми
    // Скопируйте и замените весь массив allNewsData в components/news.js
    // Всего новостей: 2
    // ============================================
    this.allNewsData = [
      {
        id: 3,
        title: "УЖЕ СКОРО!",
        date: "8 января, 2026",
        text: "Совсем скоро выйдет обновление на сайте KST-Tools! В нём будет добавлено: Калькулятор ИМТ, Генератор паролей и Анализатор текста. Подробнее вы можете узнать на сайте KST-Tools 👉 https://nof7351.github.io/KST-Tools/\n ",
        image: "https://raw.githubusercontent.com/NOF7351/KST/refs/heads/main/Resourses/UpdatePictures/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0(1).png"
      }
      {
        id: 2,
        title: "Привет №2",
        date: "2 января, 2026",
        text: "Привет, это тестовая новость №2 (последняя). На сегодня больше новостей не будет :)",
        image: "."
      },

      {
        id: 1,
        title: "Привет",
        date: "2 января, 2026",
        text: "Это тестовая новость №1, ещё будет №2 для проверки",
        image: "."
      }
    ];

    // Фильтруем только валидные новости
    this.allNewsData = this.allNewsData.filter(news => news && news.id);

    // Сортируем по ID в порядке убывания (новые первыми)
    this.allNewsData.sort((a, b) => b.id - a.id);

    // Текущие отображаемые новости (изначально только самая новая)
    this.currentNewsData = this.allNewsData.length > 0 ? [this.allNewsData[0]] : [];
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
                Используйте редактор новостей для добавления первой новости
              </p>
              <div class="mt-6 text-sm text-gray-500">
                <i class="fas fa-info-circle mr-2"></i>
                Все ID новостей свободны
              </div>
            </div>
          </div>
        </section>
      `;
      return;
    }

    // Сортируем текущие данные по убыванию ID
    const sortedCurrentNews = [...this.currentNewsData].sort((a, b) => b.id - a.id);

    this.innerHTML = `
      <section class="news-section">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl font-bold text-center mb-12">📰 Последние новости</h2>
          
          <!-- Информация о сортировке -->
          <div class="mb-8 max-w-4xl mx-auto text-center">
            <div class="inline-flex items-center bg-blue-50 text-blue-800 px-4 py-2 rounded-lg">
              <i class="fas fa-sort-amount-down mr-2"></i>
              Новости отсортированы от новых к старым
            </div>
          </div>
          
          <!-- Контейнер новостей -->
          <div class="news-container grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            ${sortedCurrentNews.map((news, index) => `
              <div class="news-item bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fadeInUp">
                <div class="p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h3 class="text-2xl font-bold text-gray-800">${news.title}</h3>
                      <div class="flex items-center mt-2 gap-2 flex-wrap">
                        <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          <i class="far fa-calendar-alt mr-1"></i> ${news.date}
                        </span>
                        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">
                          <i class="fas fa-hashtag mr-1"></i>ID: ${news.id}
                        </span>
                        ${index === 0 ?
        '<span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Самая новая</span>' :
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
                ${this.getNextNewsIds().length > 0 ? `(ID: ${this.getNextNewsIds().join(', ')})` : ''}
              </div>
            ` : `
              <div class="text-center">
                <div class="inline-flex items-center text-green-600 px-4 py-2 rounded-lg mb-3">
                  <i class="fas fa-check-circle mr-2"></i>
                  Все новости загружены
                </div>
                <div class="text-sm text-gray-500">
                  Показано ${this.visibleCount} из ${this.allNewsData.length} новостей
                </div>
              </div>
            `}
          </div>
          
          <!-- Информация о сортировке -->
          ${this.allNewsData.length > 1 ? `
            <div class="mt-12 max-w-2xl mx-auto text-center">
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 inline-block">
                <p class="text-sm text-gray-600">
                  <i class="fas fa-sort-numeric-down-alt mr-2"></i>
                  Новости отображаются в порядке: <strong>новые → старые</strong>
                </p>
              </div>
            </div>
          ` : ''}
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

  // Получение ID следующих новостей
  getNextNewsIds() {
    const currentIds = this.currentNewsData.map(news => news.id);
    const nextNews = this.allNewsData
      .filter(news => !currentIds.includes(news.id))
      .slice(0, 2)
      .map(news => news.id)
      .sort((a, b) => b - a); // Сортируем по убыванию для отображения

    return nextNews;
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
      }
    `;
    this.appendChild(style);
  }

  // Загрузка больше новостей (в порядке убывания ID)
  loadMoreNews() {
    this.visibleCount = Math.min(this.visibleCount + 2, this.allNewsData.length);

    // Берем новости в порядке убывания ID
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
}

customElements.define('news-section', NewsSection);

