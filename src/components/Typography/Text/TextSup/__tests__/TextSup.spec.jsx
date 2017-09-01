import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import TextSup from '../TextSup'

describe('TextSup', () => {
  const doShallow = props => (
    shallow(<TextSup {...props}>Some content</TextSup>)
  )

  it('renders', () => {
    const textSup = doShallow()

    expect(toJson(textSup)).toMatchSnapshot()
  })

  it('renders an HTML sub tag', () => {
    const textSup = doShallow()

    expect(textSup).toHaveTagName('sup')
  })

  it('passes additional attributes to the sub element', () => {
    const textSup = doShallow({ id: 'the-sub-text' })

    expect(textSup).toHaveProp('id', 'the-sub-text')
  })

  it('does not allow custom CSS', () => {
    const textSup = doShallow({ className: 'my-custom-class', style: { color: 'hotpink' } })

    expect(textSup).not.toHaveProp('className', 'my-custom-class')
    expect(textSup).not.toHaveProp('style')
  })
})