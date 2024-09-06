// JavaScript to dynamically list videos from the selected class folder
document.addEventListener('DOMContentLoaded', () => {
    // Initial load or setup actions can go here if needed
});

function loadVideos(classFolder) {
    const videoFeed = document.getElementById('video-feed');
    videoFeed.innerHTML = ''; // Clear previous videos

    const videoDirectory = `${classFolder}/`;

    fetch(videoDirectory)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const links = doc.querySelectorAll('a');

            const videoFiles = Array.from(links)
                .map(link => link.getAttribute('href'))
                .filter(file => file.endsWith('.mp4') || file.endsWith('.webm'));

            videoFiles.forEach((videoFile) => {
                const videoCard = document.createElement('div');
                videoCard.className = 'video-card';

                const videoElement = document.createElement('video');
                videoElement.src = `${videoDirectory}${videoFile}`;
                videoElement.controls = true;

                const videoTitle = document.createElement('div');
                videoTitle.className = 'video-title';
                videoTitle.textContent = videoFile;

                videoCard.appendChild(videoElement);
                videoCard.appendChild(videoTitle);

                videoFeed.appendChild(videoCard);
            });
        })
        .catch(error => {
            console.error('Error fetching video files:', error);
            videoFeed.innerHTML = `<p>Failed to load videos for ${classFolder}. Please try again later.</p>`;
        });
}
