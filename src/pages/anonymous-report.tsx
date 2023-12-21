import CardReport from '@/components/My-reports/my-reports'
import AcceptConfirmation from '@/components/Report-confirmation/Report-Accept-Confirmation'
import { GlobalContext } from '@/context/global_context'
import React, { useContext } from 'react'

const AnonymousReport = () => {
    const {reportData} = useContext(GlobalContext)
  console.log("od anonymous report",reportData)
    return (
    <div className="anonymous-report">
        <CardReport />
    </div>
  )
}

export default AnonymousReport