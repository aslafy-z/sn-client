import styled from 'styled-components'

/**
 * Style variables for the DocViewer component
 */
export const styles = {
  colors: {
    background: '#f5f5f5',
    sidebar: '#eaeaeb',
    appBar: '#2a2a2c',
    icon: {
      inactive: '#ffffff',
      active: '#ffffff',
    },
    commentButton: '#ffffff',
  },
}

export const CommentsContainer = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
`
