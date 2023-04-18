function resolve(obj, path) {
  const props = path.split('.')
  return props.reduce((prev, curr) => prev?.[curr], obj)
}

export default resolve
