import { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

const NotificationWrapper = styled.div`
  position: absolute;
  top: 3.2rem;
  right: 1.7rem;
  margin: 4px 7px;
  margin-bottom: 0;
  height: 1.8rem;
  max-width: 20rem;
`

const notificationCss = css`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #333;
  tex-align: center;
  height: 100%;
  border-radius: 9px;
  border: 1.5px solid #0003;
  padding: 2px 1rem;
  width: fit-content;
  font-family: sans-serif;
`

const GoodNotification = styled.div`
  ${notificationCss}
  background: #2c35;
`

const BadNotification = styled.div`
  ${notificationCss}
  background: #c235;
`


const HoverNotification = ({ messageGood, messageBad }) => {

  const [msg, setMsg] = useState('')
  const [msgGood, setMsgGood] = useState(false)
  const [msgVisible, setMsgVisible] = useState(false)

  let visibilityTimeout = useRef(null)

  const showNotification = (msg) => {
    setMsg(msg)
    setMsgVisible(true)
    clearTimeout(visibilityTimeout.current)
    visibilityTimeout.current = setTimeout(() => setMsgVisible(false), 3000)
  }

  useEffect(() => {
    if (messageGood) {
      setMsgGood(true)
      showNotification(messageGood)
    }
  }, [messageGood])

  useEffect(() => {
    if (messageBad) {
      setMsgGood(false)
      showNotification(messageBad)
    }
  }, [messageBad])

  const notificationComponent = msgGood
    ? <GoodNotification>{msg}</GoodNotification>
    : <BadNotification>{msg}</BadNotification>

  return (
    <NotificationWrapper>
      {msgVisible && notificationComponent}
    </NotificationWrapper>
  )
}

export default HoverNotification

