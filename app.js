const journalists = [
  {
    name: 'Bülent Kılıç',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'Foto muhabiri',
    image: 'images/bulent-kilic.jpg'
  },
  {
    name: 'Kurtuluş Arı',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'İstanbul Büyükşehir Belediyesi foto muhabiri',
    image: 'images/kurtulus-ari.jpg'
  },
  {
    name: 'Yasin Akgül',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'AFP (Agence France-Presse) foto muhabiri',
    image: 'images/yasin-akgul.jpg'
  },
  {
    name: 'Ali Onur Tosun',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'NOW TV muhabiri',
    image: 'images/ali-onur-tosun.jpg'
  },
  {
    name: 'Zeynep Kuray',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'Serbest gazeteci',
    image: 'images/zeynep-kuray.jpg'
  },
  {
    name: 'Hayri Tunç',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'Muhabir',
    image: 'images/hayri-tunc.jpg'
  },
  {
    name: 'Gökhan Kam',
    location: 'İstanbul',
    status: 'Tutuklu',
    organization: 'Bakırköy Belediyesi foto muhabiri',
    image: 'images/gokhan-kam.jpg'
  },
  {
    name: 'Barış İnce',
    location: 'İstanbul',
    status: 'Gözaltında',
    organization: 'BirGün yazarı',
    image: 'images/baris-ince.jpg'
  },
  {
    name: 'Zişan Gür',
    location: 'İstanbul',
    status: 'Gözaltında',
    organization: 'Sendika.org muhabiri',
    image: 'images/zisan-gur.jpg'
  },
  {
    name: 'Murat Kocabaş',
    location: 'İzmir',
    status: 'Gözaltında',
    organization: 'Foto muhabiri',
    image: 'images/murat-kocabas.jpg'
  },
  {
    name: 'Yağız Barut',
    location: 'İzmir',
    status: 'Gözaltında',
    organization: 'İzmir Gazeteciler Cemiyeti Yönetim Kurulu üyesi',
    image: 'images/yagiz-barut.jpg'
  }
];

function createJournalistCard(journalist) {
  const card = document.createElement('div');
  card.className = 'journalist-card';

  const statusClass = journalist.status === 'Tutuklu' ? 'status-arrested' : 'status-released';
  const statusIcon = journalist.status === 'Tutuklu' ? 'fa-lock' : 'fa-unlock';

  const content = `
    <div class="card-header">
      <img src="${journalist.image}" alt="${journalist.name}" class="journalist-image">
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
          <span>Tutuklanma: ${journalist.arrestedDate}</span>
        </div>
        ${journalist.releasedDate ? 
          `<div class="timeline-item">
            <i class="fas fa-calendar-check"></i>
            <span>Serbest Bırakılma: ${journalist.releasedDate}</span>
          </div>` : ''}
      </div>
    </div>
    <div class="social-sharing">
      <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`Tutuklanan Gazeteci: ${journalist.name} - ${window.location.href}`)}" target="_blank">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank">
        <i class="fab fa-facebook"></i>
      </a>
      <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(`Tutuklanan Gazeteci: ${journalist.name} - ${window.location.href}`)}" target="_blank">
        <i class="fab fa-whatsapp"></i>
      </a>
    </div>
  `;

  card.innerHTML = content;
  return card;
}

async function loadJournalists() {
  try {
    const loading = document.getElementById('loading');
    const container = document.getElementById('journalist-container');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    container.innerHTML = '';
    journalists.forEach(journalist => {
      container.appendChild(createJournalistCard(journalist));
    });

    loading.style.display = 'none';
  } catch (error) {
    console.error('Hata:', error);
    loading.innerHTML = '<p class="error">Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>';
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