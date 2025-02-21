document.addEventListener('DOMContentLoaded', () => {
    const micIcon = document.getElementById('micIcon');
    const soundWaves = document.getElementById('soundWaves');
    let lastRecording = null; // Uložíme nahrávku

    // Nahrávání po kliknutí na mikrofon
    micIcon.addEventListener('click', async () => {
        micIcon.classList.add('recording');
        soundWaves.classList.add('recording');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                lastRecording = new Blob(chunks, { type: 'audio/webm' });
                console.log('Nahrávka uložena:', lastRecording);
            };

            recorder.start();
            console.log('Nahrávání začalo...');

            setTimeout(() => {
                recorder.stop();
                stream.getTracks().forEach(track => track.stop());
                micIcon.classList.remove('recording');
                soundWaves.classList.remove('recording');
                console.log('Nahrávání ukončeno.');
            }, 5000); // 5 sekund nahrávání
        } catch (err) {
            console.error('Chyba při nahrávání:', err);
            micIcon.classList.remove('recording');
            soundWaves.classList.remove('recording');
        }
    });

    // Přehrávání po kliknutí na vlny
    soundWaves.addEventListener('click', () => {
        if (lastRecording) {
            const audioUrl = URL.createObjectURL(lastRecording);
            const audio = new Audio(audioUrl);
            audio.play();
            console.log('Přehrávám nahrávku...');
            soundWaves.classList.add('recording'); // Animace během přehrávání
            audio.onended = () => {
                soundWaves.classList.remove('recording');
                URL.revokeObjectURL(audioUrl); // Uvolní paměť
            };
        } else {
            console.log('Žádná nahrávka k přehrání.');
        }
    });
});
