// Consolidated journalist data with varied image extensions.
// You can list image filenames as stored (e.g., 'yagizbarut.jpeg', 'hayritunc.png', etc.)

function resolveImageUrl(imagePath) {
  if (!imagePath) {
    return 'images/fallback.jpg';
  }
  return imagePath;
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function fuzzyMatch(str, pattern) {
  pattern = pattern.toLowerCase();
  str = str.toLowerCase();
  let i = 0, n = -1, l;
  for (l of pattern) {
    if (!(n = str.indexOf(l, n + 1))) return false;
  }
  return true;
}

function getSearchSuggestions(searchTerm, journalists) {
  return journalists.filter(journalist => 
    fuzzyMatch(journalist.name, searchTerm) ||
    fuzzyMatch(journalist.location, searchTerm) ||
    fuzzyMatch(journalist.organization || '', searchTerm)
  ).slice(0, 5);
}

function filterJournalists(searchTerm, statusFilter, journalists) {
  const container = document.getElementById('journalist-container');
  container.innerHTML = '';

  journalists.sort((a, b) => {
    if (a.status === 'Gözaltında' && b.status !== 'Gözaltında') return -1;
    if (b.status === 'Gözaltında' && a.status !== 'Gözaltında') return 1;
    return 0;
  });

  journalists.forEach(journalist => {
    const matchesSearch = journalist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journalist.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || journalist.status === statusFilter;

    if (matchesSearch && matchesStatus) {
      const card = createJournalistCard(journalist);
      container.appendChild(card);
    }
  });
}

function createJournalistCard(journalist) {
  const card = document.createElement('div');
  card.className = 'journalist-card';

  const statusClass = journalist.status === 'Gözaltında' ? 'status-arrested' : 'status-released';
  const statusIcon = journalist.status === 'Gözaltında' ? 'fa-lock' : 'fa-unlock';
  const statusColor = journalist.status === 'Gözaltında' ? 'red' : 'green';
  const textColor = 'white';

  const imageUrl = resolveImageUrl(journalist.image);

  const content = `
    <div class="card-header">
      <img src="${imageUrl}" alt="${journalist.name}" class="journalist-image" onerror="this.src='images/fallback.jpg';">
      <div class="card-overlay">
        <div class="journalist-name">${journalist.name}</div>
      </div>
      <div class="status-badge ${statusClass}" style="background-color: ${statusColor}; color: ${textColor};">
        <i class="fas ${statusIcon}"></i>
        ${journalist.status}
      </div>
    </div>
    <div class="card-body">
      <div class="journalist-info">
        <div class="info-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>${journalist.location}</span>
        </div>
        ${journalist.organization ? `
          <div class="info-item">
            <i class="fas fa-building"></i>
            <span>${journalist.organization}</span>
          </div>
        ` : ''}
        <div class="info-item">
          <i class="fas fa-calendar-alt"></i>
          <span>${journalist.status}</span>
        </div>
        ${journalist.status === 'Serbest bırakıldı' && journalist.releasedDate && journalist.name !== 'Yağız Barut' ? `
          <div class="timeline-item">
            <i class="fas fa-calendar-check"></i>
            <span>Serbest Bırakıldı</span>
            <span>${journalist.releasedDate}</span>
          </div>
        ` : ''}
      </div>
      ${journalist.name === 'Murat Kocabaş' ? `
        <div class="legal-info">
          <p>İstanbul Büyükşehir Belediye Başkanı Ekrem İmamoğlu’nun da aralarında bulunduğu 48 kişinin tutuklanmasını protesto edenlere yönelik düzenlenen operasyonda foto muhabiri Murat Kocabaş gözaltına alındı.</p>
        </div>
      ` : ''}
      ${journalist.name === 'Zişan Gür' ? `
        <div class="legal-info">
          <p>MLSA'dan yapılan açıklamada, Saraçhane’de protestoları takip ederken gözaltına alınan sendika.org muhabiri Zişan Gür'ün gözaltında burnunun kırıldığı bildirildi.</p>
        </div>
      ` : ''}
      ${journalist.name === 'Yağız Barut' ? `
        <div class="legal-info">
          <p>İzmir Gazeteciler Cemiyeti Yönetim Kurulu üyesi gazeteci Yağız Barut, Konak'ın Alsancak semtinde haber takibi sırasında gözaltına alınmıştı. 27 Mart günü serbest bırakıldı.</p>
        </div>
      ` : ''}
      ${journalist.name === 'Barış İnce' ? `
        <div class="legal-info">
          <p>İstanbul Büyükşehir Belediye Başkanı ve Cumhurbaşkanı adayı Ekrem İmamoğlu'nun gözaltına alınmasına dair eylemlere katılanlara ve gazetecilere sabah saatlerinde ev baskınları gerçekleştirildi.</p>
          <p>Birgün yazarı Barış İnce and eşi Sevil İnce gözaltına alındı. Sevil İnce daha sonra serbest bırakıldı.</p>
        </div>
      ` : ''}
      ${journalist.name === 'Bülent Kılıç' ? `
        <div class="legal-info">
          <p>İBB eylemlerini takip ettiği gerekçesiyle 24 Mart'ta gözaltına alınmış, 25 Mart'ta ‘toplantı ve gösteri kanuna muhalefet’ suçlamasıyla tutuklanmıştı. 27 Mart'ta itiraz üzerine tahliye kararı verildi.</p>
        </div>
      ` : ''}
      ${journalist.name === 'Kurtuluş Arı' ? `
        <div class="legal-info">
          <p>İBB eylemlerini takip ettiği gerekçesiyle 24 Mart'ta gözaltına alınmış, 25 Mart'ta ‘toplantı ve gösteri kanuna muhalefet’ suçlamasıyla tutuklanmıştı. 27 Mart'ta itiraz üzerine tahliye kararı verildi.</p>
        </div>
      ` : ''}
      ${journalist.name === 'Yasin Akgül' ? `
        <div class="legal-info">
          <p>İBB eylemlerini takip ettiği gerekçesiyle 24 Mart'ta gözaltına alınmış, 25 Mart'ta ‘toplantı ve gösteri kanuna muhalefet’ suçlamasıyla tutuklanmıştı. 27 Mart'ta itiraz üzerine tahliye kararı verildi.</p>
        </div>
      ` : ''}
      ${journalist.name === 'Ali Onur Tosun' ? `
        <div class="legal-info">
          <p>İBB eylemlerini takip ettiği gerekçesiyle 24 Mart'ta gözaltına alınmış, 25 Mart'ta ‘toplantı ve gösteri kanuna muhalefet’ suçlamasıyla tutuklanmıştı. 27 Mart'ta itiraz üzerine tahliye kararı verildi.</p>
        </div>
      ` : ''}
      ${journalist.name === 'Zeynep Kuray' ? `
        <div class="legal-info">
          <p>İBB eylemlerini takip ettiği gerekçesiyle 24 Mart'ta gözaltına alınmış, 25 Mart'ta ‘toplantı ve gösteri kanuna muhalefet’ suçlamasıyla tutuklanmıştı. 27 Mart'ta itiraz üzerine tahliye kararı verildi.</p>
        </div>
      ` : ''}
      ${journalist.name === 'Hayri Tunç' ? `
        <div class="legal-info">
          <p>İBB eylemlerini takip ettiği gerekçesiyle 24 Mart'ta gözaltına alınmış, 25 Mart'ta ‘toplantı ve gösteri kanuna muhalefet’ suçlamasıyla tutuklanmıştı. 27 Mart'ta itiraz üzerine tahliye kararı verildi.</p>
        </div>
      ` : ''}
      ${journalist.name === 'Gökhan Kam' ? `
        <div class="legal-info">
          <p>İBB eylemlerini takip ettiği gerekçesiyle 24 Mart'ta gözaltına alınmış, 25 Mart'ta ‘toplantı ve gösteri kanuna muhalefet’ suçlamasıyla tutuklanmıştı. 27 Mart'ta itiraz üzerine tahliye kararı verildi.</p>
        </div>
      ` : ''}
      <div class="social-sharing">
        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`Tutuklanan Gazeteci: ${journalist.name} - Durum: ${journalist.status} - Yer: ${journalist.location} - Kuruluş: ${journalist.organization || 'Bağımsız'}`)}&url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(window.location.origin + '/' + journalist.image)}" target="_blank">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Tutuklanan Gazeteci: ${journalist.name} - Durum: ${journalist.status} - Yer: ${journalist.location} - Kuruluş: ${journalist.organization || 'Bağımsız'}`)}" target="_blank">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}&caption=${encodeURIComponent(`Tutuklanan Gazeteci: ${journalist.name} - Durum: ${journalist.status} - Yer: ${journalist.location} - Kuruluş: ${journalist.organization || 'Bağımsız'}`)}" target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(`Tutuklanan Gazeteci: ${journalist.name} - Durum: ${journalist.status} - Yer: ${journalist.location} - Kuruluş: ${journalist.organization || 'Bağımsız'} ${window.location.href}`)}" target="_blank">
          <i class="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>
  `;
  card.innerHTML = content;
  return card;
}

function loadJournalists() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Set the first journalist's image as the social sharing image
      if (data.length > 0) {
        const firstImage = resolveImageUrl(data[0].image);
        document.querySelector('meta[property="og:image"]').setAttribute('content', firstImage);
        document.querySelector('meta[name="twitter:image"]').setAttribute('content', firstImage);
      }

      const container = document.getElementById('journalist-container');
      container.innerHTML = '';
      
      // Sort journalists with Gözaltında status first
      data.sort((a, b) => {
        if (a.status === 'Gözaltında' && b.status !== 'Gözaltında') return -1;
        if (b.status === 'Gözaltında' && a.status !== 'Gözaltında') return 1;
        return 0;
      });

      data.forEach(journalist => {
        const card = createJournalistCard(journalist);
        container.appendChild(card);
      });
      document.getElementById('loading').style.display = 'none';
      const searchInput = document.getElementById('search');
      const statusFilter = document.getElementById('status-filter');
      const filterOptions = [
        { value: 'all', label: 'Tümü' },
        { value: 'Gözaltında', label: 'Gözaltında' },
        { value: 'Serbest bırakıldı', label: 'Serbest bırakıldı' }
      ];
      statusFilter.innerHTML = '';
      filterOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        statusFilter.appendChild(optionElement);
      });
      searchInput.addEventListener('input', debounce(() => {
        filterJournalists(searchInput.value, statusFilter.value, data);
      }, 300));
      statusFilter.addEventListener('change', () => {
        filterJournalists(searchInput.value, statusFilter.value, data);
      });
    })
    .catch(error => console.error('Error loading journalists:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  loadJournalists();
});