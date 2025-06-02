import React from 'react'
import { ReasonStyle } from './style';

type ReasonProps = {
  children: React.ReactNode;    
}

const ReasonCard = ({ children }: ReasonProps) => {
  return (
    <ReasonStyle>
        {children}
    </ReasonStyle>
  )
}

export default ReasonCard