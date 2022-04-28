import fs from 'fs';

const main = async () => {
  const pngFiles = await fs.readdirSync('./assets/images/items');
  const pngFileNames = pngFiles.map((pngFile) => {
    return pngFile.replace('.png', '');
  });
  console.log('png total', pngFileNames.length);

  const jsonFiles = await fs.readdirSync('./assets/json/items');
  const jsonFileNames = jsonFiles.map((jsonFile) => {
    return jsonFile.replace('.json', '');
  });
  console.log('json total', jsonFileNames.length);

  const difference = pngFileNames.filter((pngFileName) => {
    return !jsonFileNames.includes(pngFileName);
  });
  console.log('difference', difference);
};

main().catch((error) => console.error(error));
