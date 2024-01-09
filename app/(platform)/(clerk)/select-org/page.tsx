import { FormOrganization } from '@/components/form/form-organization';
import { Button } from '@/components/ui/button';
import { MAX_FREE_ORG } from '@/constants/boards';


import { db } from '@/lib/db';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react'

export default async function SelectOrg() {
  const { userId } = auth()
  const isPro = await checkSubscription()
  if (!userId) {
    return null
  }
  const organizations = await db.organization.findMany({
    where: {
      admin: userId,
    },

  });
  console.log(organizations?.length)
  return (
    <div className='flex mt-5 flex-col gap-y-5 w-full'>
      {!isPro ? organizations?.length < MAX_FREE_ORG && <FormOrganization sideOffset={10} side="right">
        <Button>Create new organization</Button>
      </FormOrganization> : <div></div>}
      {organizations.map((x) => <div className='flex w-full'>
        <Link className='flex w-full pe-5 items-center gap-4 border border-primary hover:border-secondary font-semibold bg-primary-foreground text-primary  hover:bg-secondary hover:text-muted transition-all rounded-full' href={`/organization/${x.id}`}>
          <div className="w-[60px] h-[60px] relative">
            <Image
              fill
              src={"https://images.unsplash.com/photo-1704798123029-d63689dd2b81?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="Organization"
              className="rounded-full object-cover"
            />
          </div>
          <span className=''>
            {x.name}
          </span>

        </Link>

      </div>)}
    </div>
  )
}

