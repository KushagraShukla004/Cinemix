'use client'
import { useFormCreateManager } from '@/forms/createManager'
import { Input } from '../atoms/input'
import { Label } from '../atoms/label'

import { Title2 } from '../atoms/typography'
import { cn } from '@/util/styles'
import { BaseComponent } from '@/util/types'
import { trpcClient } from '@/trpc/clients/client'
import { revalidatePath } from '@/util/actions/revalidatePath'
import { useToast } from '../molecules/Toaster/use-toast'
import { Button } from '../atoms/button'
import { useEffect } from 'react'

export interface ICreateAdminProps extends BaseComponent {}

export const CreateAdmin = ({ className }: ICreateAdminProps) => {
  const { register, handleSubmit, reset } = useFormCreateManager()
  const { mutateAsync: createAdmin, error } =
    trpcClient.admins.create.useMutation()
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({ title: error.message })
    }
  }, [error, toast])

  return (
    <div
      className={cn(
        'w-full p-4 bg-gray-300 rounded shadow-lg max-w-96 mt-2',
        className,
      )}
    >
      <Title2>Create new admin</Title2>
      <form
        onSubmit={handleSubmit(async ({ id }) => {
          const admins = await createAdmin({ id })
          if (admins) {
            revalidatePath('/admin/admins')
            reset()
            toast({ title: 'Admin created.' })
          } else {
            toast({ title: 'Action failed.' })
          }
        })}
        className="space-y-2"
      >
        <Label title="UID">
          <Input placeholder="Enter the uid" {...register('id')} />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
