import { RouterOutputs } from '@/trpc/clients/types'

//Using RouterOutputs just for typesafety
export const UserInfo = ({ hello }: { hello: RouterOutputs['hello'] }) => {
  return (
    <div>
      <div>{hello.name}</div>
      <div>{hello.age}</div>
    </div>
  )
}
