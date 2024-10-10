import { useEffect, useState } from 'react'

export default function useAudio(src: string) {

  const [audio, setAudio] = useState<any>(null)

  useEffect(() => {
    setAudio(new Audio(src))
  }, [src])

  return audio
}
