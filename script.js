// Odtwarzacz YouTube
let player;
let isMuted = true;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-background', {
        videoId: 'iLEhGbFrBdU', // Nowy film
        playerVars: {
            'autoplay': 1,
            'mute': 1,
            'controls': 0,
            'loop': 1,
            'playlist': 'iLEhGbFrBdU',
            'rel': 0,
            'enablejsapi': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Inicjalizacja głośności
    updateVolumeDisplay(50);

    // Obsługa suwaka głośności
    document.getElementById('volume-control').addEventListener('input', function () {
        const volume = parseInt(this.value);
        if (isMuted && volume > 0) {
            player.unMute();
            isMuted = false;
        }
        player.setVolume(volume);
        updateVolumeDisplay(volume);
    });
}

function updateVolumeDisplay(volume) {
    document.getElementById('volume-value').textContent = volume + '%';
    document.getElementById('volume-control').value = volume;
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

// Aktualizacja czasu i daty
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(/:/g, '<span class="blink">:</span>');

    const dateStr = now.toLocaleDateString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    document.getElementById('clock').innerHTML = timeStr;
    document.getElementById('date').textContent = dateStr;
}

updateTime();
setInterval(updateTime, 1000);
