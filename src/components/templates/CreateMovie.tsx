'use client'

import { useFormCreateMovie } from '@/forms/createMovie'
import React from 'react'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { trpcClient } from '@/trpc/clients/client'
import { HtmlSelect } from '../atoms/select'
import { Genre } from '@prisma/client'
import { useToast } from '../molecules/Toaster/use-toast'
import { useRouter } from 'next/navigation'
import { revalidatePath } from '@/util/actions/revalidatePath'
import { useImageUpload } from '@/util/hooks'
import { ProgressBar } from '../molecules/ProgressBar'
import { ImagePreview } from '../molecules/ImagePreview'
import { Controller } from 'react-hook-form'

type MyCreateMovieProps = {}

export default function CreateMovie({}: MyCreateMovieProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,
    control,
    formState: { errors },
  } = useFormCreateMovie()

  const { toast } = useToast()
  const { replace } = useRouter()

  const { posterUrl } = watch()
  const [{ percent, uploading }, uploadImages] = useImageUpload()

  const { isLoading, mutateAsync: createMovie } =
    trpcClient.movies.createMovie.useMutation()
  return (
    <div>
      <form
        onSubmit={handleSubmit(
          async ({ director, duration, genre, releaseDate, title }) => {
            const uploadedImages = await uploadImages(posterUrl)

            await createMovie({
              director,
              duration,
              genre,
              releaseDate,
              title,
              posterUrl: uploadedImages[0],
            })
            reset()
            toast({ title: `Movie ${title} created successfully.` })
            revalidatePath('admins/movies')
            replace('/admin/movies')
          },
        )}
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label title="Title" error={errors.title?.message}>
              <Input placeholder="Title of movie" {...register('title')} />
            </Label>
            <Label title="Director Name" error={errors.director?.message}>
              <Input placeholder="Director name" {...register('director')} />
            </Label>
            <Label title="Duration" error={errors.duration?.message}>
              <Input
                placeholder="Duration"
                {...register('duration', { valueAsNumber: true })}
              />
            </Label>
            <Label title="Release date" error={errors.releaseDate?.message}>
              <Input
                placeholder="Release date"
                type="date"
                {...register('releaseDate', {
                  setValueAs: (value) => {
                    const date = new Date(value)
                    return isNaN(date.getTime()) ? '' : date.toISOString()
                  },
                })}
              />
            </Label>
            <Label title="Genre" error={errors.genre?.message}>
              <HtmlSelect placeholder="projection type" {...register(`genre`)}>
                {Object.values(Genre).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </HtmlSelect>
            </Label>
          </div>
          <Label title="Images" error={errors.posterUrl?.message?.toString()}>
            <ImagePreview
              src={posterUrl || ''}
              clearImage={() => resetField('posterUrl')}
            >
              {/* this makes the whole component controlled (to store something not just the state) */}
              <Controller
                control={control}
                name={`posterUrl`}
                render={({ field }) => (
                  <Input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => field.onChange(e?.target?.files)}
                  />
                )}
              />
            </ImagePreview>

            {percent > 0 ? <ProgressBar value={percent} /> : null}
          </Label>
        </div>
        <Button loading={isLoading || uploading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}
