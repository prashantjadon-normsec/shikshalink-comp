// JavaScript to dynamically list videos available in the 'videos' folder
document.addEventListener('DOMContentLoaded', async () => {
    const videoFeed = document.getElementById('video-feed');
    const videoDirectory = 'videos/';

    try {
        // Fetch the list of files from the videos directory
        const response = await fetch(videoDirectory);
        const text = await response.text();

        // Use a DOM parser to extract video file links from the response
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = doc.querySelectorAll('a');

        // Filter video links by file extension (e.g., .mp4, .webm)
        const videoFiles = Array.from(links)
            .map(link => link.getAttribute('href'))
            .filter(file => file.endsWith('.mp4') || file.endsWith('.webm')); // Add other formats if needed

        // Create video cards for each available video file
        videoFiles.forEach((videoFile) => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';

            const videoElement = document.createElement('video');
            videoElement.src = `${videoDirectory}${videoFile}`;
            videoElement.controls = true; // Show controls like play, pause

            const videoTitle = document.createElement('div');
            videoTitle.className = 'video-title';
            videoTitle.textContent = videoFile; // Display the file name as the title

            videoCard.appendChild(videoElement);
            videoCard.appendChild(videoTitle);

            videoFeed.appendChild(videoCard);
        });
    } catch (error) {
        console.error('Error fetching video files:', error);
    }
});
