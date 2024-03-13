import DataLoader from 'dataloader';

export const makerPostDataLoader = (getPosts) => {
  return new DataLoader(async (keys) => {
    const response = await getPosts(`?userId=${keys.join('&userId=')}`);
    return keys.map((key) =>
      response.data.filter((post) => post.userId === key),
    );
  });
};
