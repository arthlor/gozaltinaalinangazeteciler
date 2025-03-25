// Consolidated journalist data with varied image extensions.
// You can list image filenames as stored (e.g., 'yagizbarut.jpeg', 'hayritunc.png', etc.)
const journalists = [
  {
    name: 'Bülent Kılıç',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'Foto Muhabiri',
    arrestedDate: '2023-05-15',
    image: 'images/bulent-kilic.jpg'
  },
  {
    name: 'Kurtuluş Arı',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'İstanbul Büyükşehir Belediyesi',
    arrestedDate: '2023-05-15',
    image: 'images/kurtulus-ari.jpg'
  },
  {
    name: 'Yasin Akgül',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'AFP (Agence France-Presse)',
    arrestedDate: '2023-05-15',
    image: 'images/yasin-akgul.jpg'
  },
  {
    name: 'Ali Onur Tosun',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'NOW TV',
    arrestedDate: '2023-05-15',
    image: 'images/ali-onur-tosun.jpg'
  },
  {
    name: 'Zeynep Kuray',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'Serbest Gazeteci',
    arrestedDate: '2023-05-15',
    image: 'images/zeynep-kuray.jpg'
  },
  {
    name: 'Hayri Tunç',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'Muhabir',
    arrestedDate: '2023-05-15',
    image: 'images/hayri-tunc.jpg' // Adapted to .png as provided
  },
  {
    name: 'Gökhan Kam',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'Bakırköy Belediyesi',
    arrestedDate: '2023-05-15',
    image: 'images/gokhan-kam.jpg'
  },
  {
    name: 'Barış İnce',
    location: 'İstanbul',
    status: 'Gözaltında',
    organization: 'BirGün',
    arrestedDate: '2023-05-15',
    releasedDate: '2023-05-16',
    image: 'images/baris-ince.jpg'
  },
  {
    name: 'Zişan Gür',
    location: 'İstanbul',
    status: 'Gözaltında',
    organization: 'Sendika.org',
    arrestedDate: '2023-05-15',
    releasedDate: '2023-05-16',
    image: 'images/zisan-gur.jpg'
  },
  {
    name: 'Murat Kocabaş',
    location: 'İzmir',
    status: 'Gözaltında',
    organization: 'Foto Muhabiri',
    arrestedDate: '2023-05-15',
    releasedDate: '2023-05-16',
    image: 'images/murat-kocabas.jpg'
  },
  {
    name: 'Yağız Barut',
    location: 'İzmir',
    status: 'Gözaltında',
    organization: 'İzmir Gazeteciler Cemiyeti',
    arrestedDate: '2023-05-15',
    releasedDate: '2023-05-16',
    image: 'images/yagiz-barut.jpg' // Adapted to .jpeg as provided
  }
];

// Optional: Helper function to ensure the image URL is correct.
// If only a base name is provided (without extension), you could try appending a default extension.
function resolveImageUrl(imagePath) {
  // Check if the imagePath already includes a file extension
  if (/\.[a-z]+$/i.test(imagePath)) {
    return imagePath;
  }
  // If not, return the path with a default extension (e.g., .jpg)
  return imagePath + '.jpg';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

function createJournalistCard(journalist) {
  const card = document.createElement('div');
  card.className = 'journalist-card';

  // Set class and icon based on status
  const statusClass = journalist.status === 'Tutuklu' ? 'status-arrested' : 'status-released';
  const statusIcon = journalist.status === 'Tutuklu' ? 'fa-lock' : 'fa-unlock';

  // Use the helper to resolve the image URL (this will work for .jpg, .jpeg, .png, etc.)
  const imageUrl = resolveImageUrl(journalist.image);

  const content = `
    <div class="card-header">
      <img src="${imageUrl}" alt="${journalist.name}" class="journalist-image">
      <div class="journalist-name">${journalist.name}</div>
      <div class="status-badge ${statusClass}">
        <i class="fas ${statusIcon}"></i>
        ${journalist.status}
      </div>
    </div>
    <div class="card-body">
      <div class="info-item">
        <i class="fas fa-map-marker-alt"></i>
        <span>${journalist.location}</span>
      </div>
      <div class="info-item">
        <i class="fas fa-building"></i>
        <span>${journalist.organization || 'Bağımsız'}</span>
      </div>
      <div class="timeline">
        <div class="timeline-item">
          <i class="fas fa-calendar-alt"></i>
          <span>${journalist.status}</span>
        </div>
        ${journalist.name === 'Murat Kocabaş' ? 
          `<div class="legal-info">
            <p>İstanbul Büyükşehir Belediye Başkanı Ekrem İmamoğlu’nun da aralarında bulunduğu 48 kişinin tutuklanmasını protesto edenlere yönelik düzenlenen operasyonda foto muhabiri Murat Kocabaş gözaltına alındı.</p>
          </div>` : ''}
        ${journalist.name === 'Zişan Gür' ? 
          `<div class="legal-info">
            <p>MLSA'dan yapılan açıklamada, Saraçhane’de protestoları takip ederken gözaltına alınan sendika.org muhabiri Zişan Gür'ün gözaltında burnunun kırıldığı bildirildi.</p>
          </div>` : ''}
        ${journalist.name === 'Yağız Barut' ? 
          `<div class="legal-info">
            <p>İzmir Gazeteciler Cemiyeti Yönetim Kurulu üyesi gazeteci Yağız Barut, Konak'ın Alsancak semtinde haber takibi sırasında gözaltına alındı.</p>
          </div>` : ''}
        ${journalist.name === 'Barış İnce' ? 
          `<div class="legal-info">
            <p>İstanbul Büyükşehir Belediye Başkanı ve Cumhurbaşkanı adayı Ekrem İmamoğlu'nun gözaltına alınmasına dair eylemlere katılanlara ve gazetecilere sabah saatlerinde ev baskınları gerçekleştirildi.</p>
            <p>Birgün yazarı Barış İnce ve eşi Sevil İnce gözaltına alındı. Sevil İnce daha sonra serbest bırakıldı.</p>
          </div>` : ''}
        ${journalist.status === 'Tutuklu' ? 
          `<div class="legal-info">
            <p>Savcı gözaltındaki gazetecileri önce adli kontrol talebiyle farklı sulh ceza hakimliklerine sevk etti. Ancak daha sonra sevk yazısını değiştirerek gazetecilerin tutuklanmasını istedi.</p>
            <p>Hakim karşısına çıkartılan gazeteciler "2911 sayılı Toplantı ve Gösteri Yürüyüşleri Kanununa Muhalefet" suçlamasıyla tutuklandı.</p>
          </div>` : ''}
        ${journalist.status === 'Tutuklu' && journalist.releasedDate ? 
          `<div class="timeline-item">
            <i class="fas fa-calendar-check"></i>
            <span>Serbest Bırakıldı</span>
          </div>` : ''}
      </div>
    </div>
    <div class="social-sharing">
      <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`Tutuklanan Gazeteci: ${journalist.name} - Durum: ${journalist.status} - Yer: ${journalist.location} - Kuruluş: ${journalist.organization || 'Bağımsız'}`)}&url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(window.location.origin + '/' + journalist.image)}" target="_blank">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank">
        <i class="fab fa-facebook"></i>
      </a>
      <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(`Tutuklanan Gazeteci: ${journalist.name} - Durum: ${journalist.status} - Yer: ${journalist.location} - Kuruluş: ${journalist.organization || 'Bağımsız'} ${window.location.href}`)}" target="_blank">
        <i class="fab fa-whatsapp"></i>
      </a>
    </div>
  `;
  card.innerHTML = content;
  return card;
}

async function loadJournalists() {
  const loading = document.getElementById('loading');
  const container = document.getElementById('journalist-container');

  try {
    // Clear existing content
    container.innerHTML = '';

    // Simulate data loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create and append cards
    journalists.forEach(journalist => {
      container.appendChild(createJournalistCard(journalist));
    });
  } catch (error) {
    console.error('Hata:', error);
    container.innerHTML = '<div class="error">Gazeteciler yüklenirken bir hata oluştu.</div>';
  } finally {
    // Always hide loading state
    loading.style.display = 'none';
  }
}

function filterJournalists() {
  const searchValue = document.getElementById('search').value.toLowerCase();
  const filterStatus = document.querySelector('.filter-btn.active').dataset.filter;
  
  const filtered = journalists.filter(journalist => {
    const matchesSearch = journalist.name.toLowerCase().includes(searchValue) || 
                          journalist.location.toLowerCase().includes(searchValue);
    const matchesStatus = filterStatus === 'all' ? true : journalist.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const container = document.getElementById('journalist-container');
  container.innerHTML = '';
  filtered.forEach(j => container.appendChild(createJournalistCard(j)));
}

document.addEventListener('DOMContentLoaded', () => {
  loadJournalists();

  document.getElementById('search').addEventListener('input', filterJournalists);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterJournalists();
    });
  });
});
