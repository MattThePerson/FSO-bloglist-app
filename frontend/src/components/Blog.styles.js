import styled, { css } from 'styled-components'

export const Title = styled.div`
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`

export const BlogContainer = styled.div`
  max-width: 680px;
  margin: 1.5rem auto;
  padding: 1.5rem 1.75rem;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-family: 'Helvetica Neue', Arial, sans-serif;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`

export const buttonCss = css`
  display: inline-block;
  background: none;
  border: 1.5px solid currentColor;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  margin-right: 0.5rem;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.15s ease, transform 0.1s ease;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.96);
  }
`

export const LikeButton = styled.button`
  ${buttonCss}
  color: #2563eb;
`

export const DeleteButton = styled.button`
  ${buttonCss}
  color: #dc2626;
`

export const InteractionsRow = styled.div`
  display: flex;
  gap: 3px;
  margin: 4px 5px;
`

export const LightText = styled.div`
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  font-style: italic;
  line-height: 1.6;
  color: #6b7280;
  margin: 2px 3px;
`

export const DarkText = styled.div`
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  font-style: italic;
  line-height: 1.6;
  color: #222;
  margin: 2px 3px;
`

export const A = styled.a`
  font-family: inherit;
  font-size: 0.95rem;
  color: #2563eb;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s ease;

  &:hover {
    border-bottom-color: currentColor;
  }
`

