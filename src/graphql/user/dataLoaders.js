import DataLoader from 'dataloader';

export const makerUserDataLoader = (getUsers) => {
  return new DataLoader(async (keys) => {
    const response = await getUsers(`?id=${keys.join('&id=')}`);
    return keys.map((key) => response.data.find((user) => user.id === key));
  });
};
