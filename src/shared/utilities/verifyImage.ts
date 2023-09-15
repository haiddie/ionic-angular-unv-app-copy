export const VerifyImage = async (url: string) => {
  const res = await fetch(url, { method: "HEAD", mode: 'no-cors' });
  if (res.ok) {
    return true
  } 
  return false
}