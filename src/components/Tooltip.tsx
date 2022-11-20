import React, { ReactNode, useState } from "react"
import styled from "@emotion/styled"
import { Box } from "@chakra-ui/react"
import * as utils from "../utils/isMobile"

const Content = styled.div`
  text-align: center;
  white-space: normal;
  width: 200px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.colors.tableBoxShadow};
  position: absolute;
  z-index: 10;
  padding: 1rem 0.5rem;
  text-transform: none;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: 500;
  cursor: default;
  border-radius: 4px;
  bottom: calc(100% + 1rem);
  left: 25%;
  bottom: 125%;
  transform: translateX(-50%);
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 140px;
  }
`

const Arrow = styled.span`
  position: absolute;
  bottom: -0.5rem;
  left: calc(50% - 6px);
  border-right: 10px solid transparent;
  border-top: 10px solid ${({ theme }) => theme.colors.background};
  border-left: 10px solid transparent;
`

// Invisible full screen div "below" the clickable link
// Added so clicking away anywhere will hide Tooltip
const ModalReturn = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

export interface IProps {
  content: ReactNode
  children?: React.ReactNode
}

// TODO add `position` prop
const Tooltip: React.FC<IProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const isMobile = utils.isMobile()

  return (
    <>
      {isVisible && isMobile && (
        <ModalReturn onClick={() => setIsVisible(false)} />
      )}
      <Box
        position="relative"
        display="inline-flex"
        userSelect="none"
        cursor="pointer"
        title="More info"
        onMouseEnter={!isMobile ? () => setIsVisible(true) : undefined}
        onMouseLeave={!isMobile ? () => setIsVisible(false) : undefined}
        onClick={isMobile ? () => setIsVisible(!isVisible) : undefined}
      >
        {children}
        {isVisible && (
          <Content>
            <Arrow />
            {content}
          </Content>
        )}
      </Box>
    </>
  )
}

export default Tooltip
