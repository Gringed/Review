import { FormOrganization } from '@/components/form/form-organization';
import { Button } from '@/components/ui/button';


import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';

import React from 'react'

export default async function SelectOrg() {
  const { userId } = auth()
  if (!userId) {
    return null
  }
  const organizations = await db.organization.findMany({
    where: {
      admin: userId,
    },

  });
  console.log(organizations)
  return (
    <div>
      {organizations?.length === 0 && <FormOrganization sideOffset={10} side="right">
        <Button>Create new organization</Button>
      </FormOrganization>}
      {organizations.map((x) => x.id)}
    </div>
  )
}

