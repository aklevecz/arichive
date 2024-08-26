const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const videoConfiguration = {
	host: 'https://fest-nouns.yaytso.art',
	maxId: 100
};

const thumbnailsDir = path.join(__dirname, 'thumbnails');

// Create thumbnails directory if it doesn't exist
if (!fs.existsSync(thumbnailsDir)) {
	fs.mkdirSync(thumbnailsDir);
}

const a = [1, 5];

// for (let i = 1; i <= videoConfiguration.maxId; i++) {
for (let i of a) {
	const url = `${videoConfiguration.host}/${i}.mp4`;
	const outputFilePath = path.join(thumbnailsDir, `${i}.webp`);
    console.log(url)
	const command = `ffmpeg -i "${url}" -vf "thumbnail" -frames:v 1 "${outputFilePath}"`;

	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error processing video ${i}: ${error.message}`);
			return;
		}
		console.log(`Thumbnail for video ${i} saved as ${outputFilePath}`);
	});
}
