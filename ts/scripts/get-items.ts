import { writeFileSync } from 'fs';
import { axiosGet, download } from '../libs/axios';

type Result = {
  name: string;
  url: string;
};

const main = async () => {
  const limit = 1700;
  const url = `https://pokeapi.co/api/v2/item?limit=${limit}`;
  const listResponse = await axiosGet<{ count: number; results: Result[] }>(
    url,
  );
  const { count = 0, results = [] } = listResponse;
  console.log('count', count, 'limit', limit);

  const items = [];

  for (const result of results) {
    const { url = '' } = result;
    if (!url) continue;

    try {
      const itemResponse = await axiosGet<{
        id: number;
        name: string;
        sprites: { default: string };
      }>(url);

      const { id, name = '', sprites = { default: '' } } = itemResponse;
      await download(sprites.default, `./assets/images/items/${name}.png`);

      const imageURI = sprites.default
        ? `https://raw.githubusercontent.com/hieudoanm/pokemon/master/assetsimages/items/${name}.png`
        : null;
      console.log(id, name, imageURI);
      if (!imageURI) {
        continue;
      }

      const jsonFileName = `./assets/json/items/${name}.json`;
      const jsonData = {
        name,
        symbol: 'PKM',
        image: `${name}.png`,
        properties: {
          files: [{ uri: `${name}.png`, type: 'image/png' }],
          creators: [
            {
              address: 'E5HFBLSPcrca2GeUhASdJbAdizJzhiPB5t27dS9tFKd1',
              share: 100,
            },
          ],
        },
        collection: { name: 'items', family: 'pokemon' },
      };
      await writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2));
    } catch (error) {
      console.error('error', error);
    }
  }
};

main();
