import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import fs from 'fs';

export const axiosGet = <T>(
  url: string,
  configs?: AxiosRequestConfig,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, configs)
      .then((response: AxiosResponse<T>) => {
        resolve(response.data);
      })
      .catch((error: AxiosError<T>) => {
        reject(error?.response?.data);
      });
  });
};

export const download = async (url: string, filePath: string) => {
  if (!url) return;
  const response = await axios({ url, method: 'GET', responseType: 'stream' });

  if (!response) return;
  const writer = fs.createWriteStream(filePath);

  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};
