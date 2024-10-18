
// Dom Loaded Event
document.addEventListener('DOMContentLoaded', async () => {
    /* DOM Variables */
    const periForm = document.getElementById('periForm');
    const periphs = document.getElementById('periphs');
    const video = document.getElementById('video');
    const takePhoto = document.getElementById('takePhoto');
    const download = document.getElementById('download');
    const error = document.getElementById('error');

    // Canvas
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    try {
        /* Init */
        const init = await getMedias();
        const mediasList = await getMediasList();
        
        mediasList.forEach(media => {
            loadOptions(media, periphs);
        })

        /* Validation du Formulaire de sélection du périphérique */
        periForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const media = await getMedias();
            video.srcObject = media;
            video.play();

            video.removeAttribute('hidden');
            takePhoto.removeAttribute('hidden');
        })

        /* Bouton de prise de photo cliqué */
        takePhoto.addEventListener('click', () => {
            canvas.removeAttribute('hidden');
            download.removeAttribute('hidden');

            canvas.width = video.getBoundingClientRect().width;
            canvas.height = video.getBoundingClientRect().height;
            context.drawImage(video, 0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
            download.href = canvas.toDataURL('image/png');
        })
    } catch (err) {
        error.textContent = `Une erreur s'est produite : ${err}`;
        error.removeAttribute('hidden');
    }
})

// Obtenir toute les Périphériques
const getMediasList = async () => {
    const list = await navigator.mediaDevices.enumerateDevices();

    let videoMedias = [];

    list.forEach(media => {
        if (media.kind === "videoinput") videoMedias.push(media);
    })

    return videoMedias;
}

const getMedias = () => {
    return navigator.mediaDevices.getUserMedia({audio: false, video: true});
}

const loadOptions = (media, where) => {
    where.innerHTML += `<option value=${media.id}>${media.label}</option>`;
}