const fs = require('fs').promises;
const path = require('path');

async function getDirectoryMapping(rootDir) {
	const directoryPath = path.join(__dirname, rootDir);

	try {
		const directories = await fs.readdir(directoryPath);
		const directoryMapping = {};

		const processingPromises = directories
			.filter((dir) => dir !== '.DS_Store')
			.map(async (directory) => {
				const subDirPath = path.join(directoryPath, directory);
				try {
					const files = await fs.readdir(subDirPath);
					directoryMapping[directory] = files.filter((dir) => dir !== '.DS_Store');
				} catch (error) {
					console.error(`Error reading files in directory ${directory}:`, error);
				}
			});

		await Promise.all(processingPromises);
		return directoryMapping;
	} catch (error) {
		console.error('Error reading directories:', error);
		throw error;
	}
}

async function main() {
	try {
		const mapping = await getDirectoryMapping('static/projects');
        fs.writeFile(path.join(__dirname, 'src/lib/projectToImages.json'), JSON.stringify(mapping));
		console.log('Directory mapping:', mapping);
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

main();
