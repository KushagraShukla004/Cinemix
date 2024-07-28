'use client'
import { Map } from '../organisms/Map'

import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'

import { useFormContext, useWatch, useFieldArray } from 'react-hook-form'

import { Panel } from '../organisms/Map/Panel'
import { Marker } from '../organisms/Map/MapMarker'
import { CenterOfMap, DefaultZoomControls } from '../organisms/Map/ZoomControls'
import { useMap } from 'react-map-gl'

import { HtmlSelect } from '../atoms/select'

import {
  FormProviderCreateCinema,
  FormTypeCreateCinema,
} from '@/forms/createCinema'
import { BrandIcon } from '../atoms/BrandIcon'
import { useToast } from '../molecules/Toaster/use-toast'
import { TextArea } from '../atoms/textArea'
import { trpcClient } from '@/trpc/clients/client'
import { SimpleAccordion } from '../molecules/SimpleAccordian'
import { ProjectionType, SoundSystemType } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { revalidatePath } from '@/util/actions/revalidatePath'
import { cn } from '@/util/styles'
import { CurvedScreen, Square } from '../organisms/ScreenUtils'
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
    <div className="grid gap-3 md:grid-cols-2">
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
      {/* <Map
        initialViewState={{
          longitude: 80.2,
          latitude: 12.9,
          zoom: 8,
        }}
      >
        <MapMarker />

        <Panel position="left-top">
          
          <DefaultZoomControls>
            <CenterOfMap
              onClick={(latLng) => {
                const lat = parseFloat(latLng.lat.toFixed(6))
                const lng = parseFloat(latLng.lng.toFixed(6))

                setValue('address.lat', lat, { shouldValidate: true })
                setValue('address.lng', lng, { shouldValidate: true })
              }}
            />
          </DefaultZoomControls>
        </Panel>
      </Map> */}
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
    <div className="mb-4">
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

// const MapMarker = () => {
//   const { address } = useWatch<FormTypeCreateCinema>()
//   const { setValue } = useFormContext<FormTypeCreateCinema>()

//   return (
//     <Marker
//       pitchAlignment="auto"
//       longitude={address?.lng || 0}
//       latitude={address?.lat || 0}
//       draggable
//       onDragEnd={({ lngLat }) => {
//         const { lat, lng } = lngLat
//         setValue('address.lat', lat || 0)
//         setValue('address.lng', lng || 0)
//       }}
//     >
//       <BrandIcon />
//     </Marker>
//   )
// }

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
