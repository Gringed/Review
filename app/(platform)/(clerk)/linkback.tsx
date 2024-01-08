"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Linkback = () => {
    const router = useRouter()
    console.log(router)
    return (
        <Button className='bg-transparent hover:bg-transparent text-primary' onClick={() => router.back()}>
            <div className="flex gap-2 font-bold py-4 items-center justify-between w-full">
                <ArrowLeft /> Back
            </div>
        </Button>
    )
}

export default Linkback
