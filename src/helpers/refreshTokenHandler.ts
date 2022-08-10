import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

type Props = {
  setInterval: (time: number) => void
}

export const RefreshTokenHandler = ({ setInterval, ...props }: Props) => {
  const { data: session } = useSession()

  useEffect(() => {
    if (!!session) {
      // We did set the token to be ready to refresh after 23 hours, here we set interval of 23 hours 30 minutes.
      const timeRemaining = Math.round(
        ((session.expiredAt as number) - 30 * 60 * 1000 - Date.now()) / 1000,
      )
      setInterval(timeRemaining > 0 ? timeRemaining : 0)
    }
  }, [session])

  return null
}
