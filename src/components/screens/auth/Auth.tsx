'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { AtSign, KeyRound, CircleUserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useState } from 'react'

import { Button } from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'
import { IAuthFormState } from './auth.types'

interface IAuth {  
  type?: 'Login' | 'Register'
}
export function Auth({type}: IAuth) {

  const [isLoading, setIsLoading] = useState(false)

  const { register, formState: { errors }, handleSubmit } = useForm<IAuthFormState>({
    mode: 'onChange'
  })

  const {push} = useRouter()

  const onSubmit:SubmitHandler<IAuthFormState> = async data => {

    setIsLoading(true)

    const response = await signIn(
      'credentials',  
      {
        redirect: false,
        ...data
      }
    )
  
    if (response?.error) {
      toast.error(response.error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    push('/')
  }

  return (
    <div className='flex w-screen h-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='m-auto block w-96 p-layout *:my-6'>
        <h1 className='text-center text-3xl font-bold'>{type}</h1>
        {type === 'Register' && 
          <Field 
            {...register('username', {
              required: true,
            })}
            placeholder='Enter username' 
            type='name'
            Icon={CircleUserRound}
          />
        }
        <Field 
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            },
          })}
          placeholder='Enter email' 
          type='email' 
          Icon={AtSign}
          error={errors.email}
        />
        <Field 
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: 'Min 6 length symbols!'
            }
          })}
          placeholder='Enter password' 
          type='password' 
          Icon={KeyRound} 
          error={errors.password}
        />
        <div className='text-center'>
          <Button isLoading={isLoading} disabled={isLoading} type='submit'>{type}</Button>
        </div>
      </form>
    </div>
  )
}