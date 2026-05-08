export function withTimeout(promise, ms = 10000, label = 'Operation') {
  let timer
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms)
  })

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}

export function delay(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
