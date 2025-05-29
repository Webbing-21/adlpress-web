import { AuthDialogs } from '@/components/auth/auth-dialogs'
import LoginDialog from '@/components/auth/LoginDialog'
import React from 'react'

export default function page() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <AuthDialogs open/>
    </div>
  )
}
