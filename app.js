function createJournalistCard(journalist) {
  const card = document.createElement('div');
  card.className = 'card';

  const name = document.createElement('h2');
  name.textContent = journalist.name;

  const location = document.createElement('p');
  location.innerHTML = `<strong>Tutuklandığı Yer:</strong> ${journalist.location}`;

  const status = document.createElement('p');
  status.innerHTML = `<strong>Durum:</strong> ${journalist.status}`;

  card.appendChild(name);
  card.appendChild(location);
  card.appendChild(status);

  return card;
}

async function loadJournalists() {
  try {
    const loading = document.getElementById('loading');
    const container = document.getElementById('journalist-container');

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    journalists.forEach(journalist => {
      container.appendChild(createJournalistCard(journalist));
    });

    loading.style.display = 'none';
  } catch (error) {
    console.error('Veri yüklenirken hata oluştu:', error);
    loading.textContent = 'Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
  }
}

document.addEventListener('DOMContentLoaded', loadJournalists);
