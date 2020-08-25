console.log('Module')
async function start() {
  return await Promise.resolve('its Work')
}
start().then(console.log)
