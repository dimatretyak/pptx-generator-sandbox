const splitArrayIntoChunks = <T>(
  array: T[],
  perChunk: number,
  fillElement?: any
) => {
  if (perChunk <= 0) {
    throw new Error(
      `Passed incorrect value for the "perChunk" argument (allowed from 1, passed ${perChunk})`
    );
  }

  const chunks = array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, [] as T[][]);

  if (fillElement !== undefined) {
    const lastChunk = chunks[chunks.length - 1];

    chunks[chunks.length - 1] = Array.from(
      {
        length: perChunk,
      },
      (_, index) => lastChunk[index] ?? fillElement
    );
  }

  return chunks;
};

export default splitArrayIntoChunks;
