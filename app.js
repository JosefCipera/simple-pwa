document.addEventListener('DOMContentLoaded', () => {
    const micIcon = document.getElementById('micIcon');
    const soundWaves = document.getElementById('soundWaves');
    let lastRecording = null;

    micIcon.addEventListener('click', async () => {
        console.log('Klik na mikrofon – start nahrávání');
        micIcon.classList.add('recording');
        soundWaves.classList.add('recording');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
                console.log('Data nahrávky přijata:', e.data);
            };

            recorder.onstop = () => {
                lastRecording = new Blob(chunks, { type: 'audio/webm' });
                console.log('Nahrávka uložena, velikost:', lastRecording.size);
            };

            recorder.start();
            console.log('Nahrávání běží...');

            setTimeout(() => {
                recorder.stop();
                stream.getTracks().forEach(track => track.stop());
                micIcon.classList.remove('recording');
                soundWaves.classList.remove('recording');
                console.log('Nahrávání skončilo.');
            }, 5000);
        } catch (err) {
            console.error('Chyba při nahrávání:', err);
            micIcon.classList.remove('recording');
            soundWaves.classList.remove('recording');
        }
    });

    soundWaves.addEventListener('click', () => {
        console.log('Klik na vlny – pokus o přehrání');
        if (lastRecording) {
            console.log('Přehrávám nahrávku, velikost:', lastRecording.size);
            const audioUrl = URL.createObjectURL(lastRecording);
            const audio = new Audio(audioUrl);
            audio.play().then(() => {
                soundWaves.classList.add('recording');
                console.log('Přehrávání začalo.');
            }).catch(err => {
                console.error('Chyba při přehrávání:', err);
            });
            audio.onended = () => {
                soundWaves.classList.remove('recording');
                URL.revokeObjectURL(audioUrl);
                console.log('Přehrávání skončilo.');
            };
        } else {
            console.log('Žádná nahrávka k přehrání.');
        }
    });
});
