document.addEventListener('DOMContentLoaded', () => {
    const micIcon = document.getElementById('micIcon');
    const soundWaves = document.getElementById('soundWaves');

    micIcon.addEventListener('click', async () => {
        // Přidáme třídu pro vizuální zpětnou vazbu
        micIcon.classList.add('recording');
        soundWaves.classList.add('recording');

        try {
            // Získáme přístup k mikrofonu
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);

            // Ukládání dat nahrávky
            const chunks = [];
            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                console.log('Nahrávka dokončena:', blob);
                // Tady můžeš s nahrávkou něco dělat, např. stáhnout nebo přehrát
            };

            // Spustíme nahrávání
            recorder.start();
            console.log('Nahrávání 시작...');

            // Zastavíme po 5 sekundách
            setTimeout(() => {
                recorder.stop();
                stream.getTracks().forEach(track => track.stop()); // Ukončíme stream
                micIcon.classList.remove('recording');
                soundWaves.classList.remove('recording');
                console.log('Nahrávání ukončeno.');
            }, 5000);
        } catch (err) {
            console.error('Chyba při nahrávání:', err);
            micIcon.classList.remove('recording');
            soundWaves.classList.remove('recording');
        }
    });
});
