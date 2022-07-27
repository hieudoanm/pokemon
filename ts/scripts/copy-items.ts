import { copyFileSync, readdirSync } from 'fs';

const main = async () => {
  const destPath = './temp/items';

  const pngPath = './assets/images/items';
  const pngFiles = await readdirSync(pngPath);
  for (const pngFile of pngFiles) {
    const response = await copyFileSync(
      `${pngPath}/${pngFile}`,
      `${destPath}/${pngFile}`,
    );
    console.log(response);
  }

  const jsonPath = './assets/json/items';
  const jsonFiles = await readdirSync(jsonPath);
  for (const jsonFile of jsonFiles) {
    const response = await copyFileSync(
      `${jsonPath}/${jsonFile}`,
      `${destPath}/${jsonFile}`,
    );
    console.log(response);
  }
};

main().catch((error) => console.error(error));
