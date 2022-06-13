import { useState } from 'react'
import { Notify } from '../../utils/notify'
import { Button } from '../Button'
import { Container, Title, Text, ContainerButtons, Copy, Popup } from './styles'
import { FiClipboard } from 'react-icons/fi'
import Happy from '../../../assets/happy.png'

import { mesages } from '../../utils/mesage.js'

export function Greetings() {
  const [mesage, setMesage] = useState(mesages[Math.floor(Math.random() * 9)])
  const [popup, setPopup] = useState(false)

  setInterval(() => {
    const currentDate = new Date().toLocaleTimeString()

    if (currentDate === '9:30:00') {
      Notify('Bom dia bebê!', mesage, Happy)
    }
  }, 1000)
  
  function handleMesage() {
    const randomMesage = Math.floor(Math.random() * 9)
    
    Notify('Bom dia bebê!', mesage, Happy)
    setMesage(mesages[randomMesage])
  }

  async function copyLink() {
    await navigator.clipboard.writeText(mesage)
    setPopup(true)

    setTimeout(() => {
      setPopup(false)
    }, 5000)
  }

  return (
    <Container>
      <Title>Mensagem do dia: {new Date().toLocaleDateString()}</Title>
      <Text>{mesage}</Text>
      <ContainerButtons>
        <Button onClick={handleMesage}>Nova mensagem</Button>
        <Copy onClick={copyLink}>
          <FiClipboard size={20} color="#FFF" />{' '}
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
