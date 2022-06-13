import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Title = styled.h1`
  font-size: 20px;
`

export const Text = styled.p`
  margin: 50px;
  font-size: 16px;
  text-align: center;
`

export const ContainerButtons = styled.div`
  display: flex;
  gap: 20px;
`

export const Copy = styled.button`
  padding: 10px;

  border: 1px solid #8257e6;
  border-radius: 8px;
  background: transparent;
  transition: background 0.2s;
  cursor: pointer;

  &:hover {
    background: #8257e6;
  }
`

export const Popup = styled.div`
  position: absolute;
  bottom: 30px;
  background-color: #fff;
  padding: 14px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  animation: slideY 1s;
  transition: all 1s;

  /* Animação slide*/
  @keyframes slideY {
    from {
      transform: translateY(20px);
    }

    to {
      transform: translateY(0);
    }
  }

  p {
    color: #888;
  }
`
