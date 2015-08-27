
export function chunk (array, chunkSize) {
  const chunkedArray = []
  for (var i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize))
  }
  return chunkedArray
}

export function chunkMap (map, chunkSize) {
  const chunkedMaps = []
  const mapAsArray = Array.from(map)
  for (var i = 0; i < map.size; i += chunkSize) {
    let chunked = mapAsArray.slice(i, i + chunkSize)
    chunkedMaps.push(new Map(chunked))
  }
  return chunkedMaps
}
