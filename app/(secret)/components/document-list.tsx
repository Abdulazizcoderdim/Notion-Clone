'use client'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'

interface DocumentListProps {
  parentDocumentId?: Id<'documents'>
  level?: number
}

const DocumentList = ({ level, parentDocumentId }: DocumentListProps) => {
  const document = useQuery(api.document.getDocuments, {
    parentDocument: parentDocumentId,
  })
  console.log(document)

  return <div>DocumentList</div>
}

export default DocumentList
