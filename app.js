// Příklad: Změna barvy ikon po načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    const micIcon = document.getElementById('micIcon');
    const soundIcon = document.getElementById('soundIcon');

    // Automatická akce po otevření
    micIcon.style.color = '#ff4444'; // Červený mikrofon
    soundIcon.style.color = '#4444ff'; // Modrý zvuk

    // Příklad klikací interakce (volitelné)
    micIcon.addEventListener('click', () => {
        alert('Mikrofon aktivován!');
    });

    soundIcon.addEventListener('click', () => {
        alert('Zvuk přehrán!');
    });
});
