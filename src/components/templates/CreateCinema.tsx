import {
  FormProviderCreateCinema,
  FormTypeCreateCinema,
} from '@/forms/createCinema'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { HtmlSelect } from '../atoms/select'
import { Label } from '../atoms/label'
import { TextArea } from '../atoms/textArea'
import { Input } from '../atoms/input'
import { revalidatePath } from '@/util/actions/revalidatePath'
import { Button } from '../atoms/button'
import { useToast } from '../molecules/Toaster/use-toast'
import { useRouter } from 'next/navigation'
import { trpcClient } from '@/trpc/clients/client'
import { SimpleAccordion } from '../molecules/SimpleAccordian'
import { Plus } from 'lucide-react'
import { CurvedScreen, Square } from '../organisms/ScreenUtils'
import { ProjectionType, SoundSystemType } from '@prisma/client'
export interface ICreateCinemaProps {}

export const CreateCinema = ({}: ICreateCinemaProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useFormContext<FormTypeCreateCinema>()

  const {
    isLoading,
    data,
    error,
    mutateAsync: createCinema,
  } = trpcClient.cinemas.createCinema.useMutation()

  const { toast } = useToast()
  const { replace } = useRouter()
  return (
    <div>
      <form
        onSubmit={handleSubmit(
          async ({
            address: { address, lat, lng },
            cinemaName,
            screens,
            managerId,
          }) => {
            await createCinema({
              managerId,
              cinemaName,
              address: {
                address,
                lat,
                lng,
              },
              screens,
            })
            reset()
            toast({ title: `${cinemaName} created successfully.` })
            revalidatePath('admins/cinemas')
            replace('/admin/cinemas')
          },
        )}
      >
        <Label title="Cinema" error={errors.cinemaName?.message}>
          <Input placeholder="Cinema name" {...register('cinemaName')} />
        </Label>
        <Label title="Manager ID" error={errors.managerId?.message}>
          <Input placeholder="Manager ID" {...register('managerId')} />
        </Label>

        <Label title="Address" error={errors.address?.address?.message}>
          <TextArea placeholder="Address" {...register('address.address')} />
        </Label>
        {/* <Label title="Location">
            <ShowLocation />
        </Label> */}

        <AddScreens />
        <Button type="submit" loading={isLoading}>
          Create cinema
        </Button>
      </form>
    </div>
  )
}

const AddScreens = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormTypeCreateCinema>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `screens`,
  })

  const { screens } = useWatch<FormTypeCreateCinema>()

  return (
    <div>
      {fields.map((screen, screenIndex) => (
        <SimpleAccordion title={screenIndex + 1 || '[Empty]'} key={screen.id}>
          <div className="flex justify-end my-2">
            <Button
              variant="link"
              size="sm"
              className="text-xs text-gray-600 underline underline-offset-2"
              onClick={() => {
                remove(screenIndex)
              }}
            >
              remove screen
            </Button>
          </div>

          <div className={`flex flex-col gap-2`}>
            <div className="grid grid-cols-2 gap-2">
              <Label
                title="Projection type"
                error={errors.screens?.[screenIndex]?.type?.toString()}
              >
                <HtmlSelect
                  placeholder="projection type"
                  {...register(`screens.${screenIndex}.projectionType`)}
                >
                  {Object.values(ProjectionType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </HtmlSelect>
              </Label>
              <Label
                title="Sound system type"
                error={errors.screens?.[screenIndex]?.type?.toString()}
              >
                <HtmlSelect
                  placeholder="sound system type"
                  {...register(`screens.${screenIndex}.soundSystemType`)}
                >
                  {Object.values(SoundSystemType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </HtmlSelect>
              </Label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Label
                title="Rows"
                error={errors.screens?.[screenIndex]?.rows?.message}
              >
                <Input
                  placeholder="Enter the name"
                  {...register(`screens.${screenIndex}.rows`, {
                    valueAsNumber: true,
                  })}
                />
              </Label>
              <Label
                title="Columns"
                error={errors.screens?.[screenIndex]?.columns?.message}
              >
                <Input
                  type="number"
                  placeholder="Enter the name"
                  {...register(`screens.${screenIndex}.columns`, {
                    valueAsNumber: true,
                  })}
                />
              </Label>
              <Label
                title="Price"
                error={errors.screens?.[screenIndex]?.price?.message}
              >
                <Input
                  type="number"
                  placeholder="Enter the price"
                  {...register(`screens.${screenIndex}.price`, {
                    valueAsNumber: true,
                  })}
                />
              </Label>
            </div>
            <Grid
              rows={screens?.[screenIndex]?.rows || 0}
              columns={screens?.[screenIndex]?.columns || 0}
            />
          </div>
        </SimpleAccordion>
      ))}
      <div>
        <Button
          className="flex items-center justify-center w-full py-2 text-xs border border-dashed"
          size="sm"
          variant="link"
          onClick={() =>
            append({
              columns: 0,
              rows: 0,
              price: 0,
              projectionType: 'DOLBY_CINEMA',
              soundSystemType: 'DOLBY_ATMOS',
            })
          }
        >
          <Plus className="w-4 h-4" /> Add screen
        </Button>
      </div>
    </div>
  )
}

export const Grid = ({ rows, columns }: { rows: number; columns: number }) => {
  const renderRows = () => {
    const rowElements = []

    for (let i = 0; i < rows; i++) {
      const columnElements = []
      for (let j = 0; j < columns; j++) {
        columnElements.push(<Square key={`${i}-${j}`} />)
      }
      rowElements.push(
        <div key={`row-${i}`} className="flex gap-2">
          {columnElements}
        </div>,
      )
    }

    return (
      <div className="flex flex-col items-center gap-2  overflow-x-auto">
        {rowElements}
      </div>
    )
  }

  return (
    <div className="w-full">
      {renderRows()}
      <div className="flex justify-center">
        <CurvedScreen />
      </div>
    </div>
  )
}
