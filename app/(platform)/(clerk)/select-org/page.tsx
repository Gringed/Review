import { FormOrganization } from '@/components/form/form-organization';
import { Button } from '@/components/ui/button';
import { MAX_FREE_ORG } from '@/constants/boards';


import { db } from '@/lib/db';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
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
        <Link className='px-5 py-3 w-full border border-primary font-semibold bg-primary text-muted hover:bg-secondary hover:text-primary transition-all rounded-full' href={`/organization/${x.id}`}>{x.name}</Link>
      </div>)}
    </div>
  )
}

