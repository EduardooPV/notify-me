import { useState, useEffect } from 'react'
import { Notify } from '../../utils/notify'
import { Button } from '../Button'
import { Container, Title, Author, Message, ContainerButtons, Copy, Popup } from './styles'
import { FiClipboard } from 'react-icons/fi'
import Happy from '../../../assets/happy.png'

interface MessageProps {
  text: string
  author: string
}

export function Greetings() {
  const [data, setData] = useState<MessageProps[]>([])
  const [message, setMessage] = useState({
    text: '',
    author: '',
  })
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data)
        setMessage(data[Math.floor(Math.random() * 1642)])
      })
  }, [])

  function handleMesage() {
    setMessage(data[Math.floor(Math.random() * 1642)])

    Notify('Bom dia bebê!', 'Bora de mensagem inspiradora?', Happy)
  }

  setInterval(() => {
    const currentDate = new Date().toLocaleTimeString()

    if (currentDate === '9:30:00') {
      Notify('Bom dia bebê!', 'Bora de mensagem inspiradora?', Happy)
    }
  }, 1000)

  async function copyLink() {
    await navigator.clipboard.writeText(message.text)
    setPopup(true)

    setTimeout(() => {
      setPopup(false)
    }, 2000)
  }

  return (
    <Container>
      <Title>Mensagem do dia</Title>
      {message.author ? <Author>{message.author}:</Author> : <Author>??</Author>}
      <Message>{message.text}</Message>
      <ContainerButtons>
        <Button onClick={handleMesage}>Nova mensagem</Button>
        <Copy onClick={copyLink}>
          <FiClipboard size={20} color="#FFF" />
        </Copy>
      </ContainerButtons>
      {popup && (
        <Popup>
          <p>Mensagem copiada</p>
        </Popup>
      )}
    </Container>
  )
}
