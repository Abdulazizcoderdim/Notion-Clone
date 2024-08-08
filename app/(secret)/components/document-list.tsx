'use client'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Item } from './item'

interface DocumentListProps {
  parentDocumentId?: Id<'documents'>
  level?: number
}

const DocumentList = ({ level, parentDocumentId }: DocumentListProps) => {
  const documents = useQuery(api.document.getDocuments, {
    parentDocument: parentDocumentId,
  })
  console.log(documents)

  return (
    <>
      {documents?.map((document) => (
        <div key={document._id}>
          <Item label={document.title} id={document._id} />
        </div>
      ))}
    </>
  )
}

export default DocumentList
