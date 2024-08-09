'use client'

import { Id } from '@/convex/_generated/dataModel'

interface DocumentIdPageProps {
  params: {
    documentId: Id<'documents'>
  }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  return <div>DocumentIdPage {params.documentId}</div>
}

export default DocumentIdPage
