import { useEffect, useState } from 'react'
import { Notify } from '../../utils/notify'
import { Button } from '../Button'
import { Container, Title, Text, ContainerButtons, Copy, Popup } from './styles'
import { FiClipboard } from 'react-icons/fi'
import Happy from '../../../assets/happy.png'

import { Translator, Translate } from 'react-auto-translate'

export function Greetings() {
  const [mesage, setMesage] = useState('')
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setMesage(data[Math.floor(Math.random() * 1642)].text)
      })
  }, [])

  setInterval(() => {
    const currentDate = new Date().toLocaleTimeString()

    if (currentDate === '9:30:00') {
      Notify('Bom dia bebê!', 'Bora de mensagem inspiradora?', Happy)
    }
  }, 1000)

  function handleMesage() {
    fetch('https://type.fit/api/quotes')
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setMesage(data[Math.floor(Math.random() * 1642)].text)
      })

    Notify('Bom dia bebê!', 'Bora de mensagem inspiradora?', Happy)
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
      <Title>Mensagem do dia</Title>
      <Text>{mesage}</Text>
      <Translator
        from="en"
        to="fr"
        googleApiKey="AIzaSyBGl2CvY7kX_agwj5ReanIDVmQ1NQ5D8ZU"
      >
        <h1>
          <Translate>Welcome!</Translate>
        </h1>
      </Translator>
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
