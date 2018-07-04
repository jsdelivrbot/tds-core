import React from 'react'
import PropTypes from 'prop-types'

import StandaloneIcon from '@tds/core-standalone-icon'

import safeRest from '../../shared/utils/safeRest'
import generateId from '../../shared/utils/generateId'
import joinClassNames from '../../shared/utils/joinClassNames'
import closest from './element-closest'

import Bubble from './Bubble'

import iconWrapperStyles from '../../shared/styles/IconWrapper.modules.scss'
import styles from './Tooltip.modules.scss'

const getTriggerA11yText = connectedFieldLabel => {
  if (!connectedFieldLabel) {
    return 'Reveal additional information.'
  }

  return `Reveal additional information about ${connectedFieldLabel}.`
}

const getIds = connectedFieldLabel => {
  const id = generateId(connectedFieldLabel, 'unknown-field')

  return {
    bubbleId: id.postfix('tooltip'),
    triggerId: id.postfix('trigger'),
  }
}

/**
 * Provide an explanation or instructions for a form field that most users do not need.
 *
 * @version ./package.json
 */
class Tooltip extends React.Component {
  constructor() {
    super()
    this.refTooltip = null
  }
  state = {
    open: false,
  }

  componentDidMount() {
    this.updatePageWidth()
  }

  componentDidUpdate() {
    if (this.state.open) {
      document.addEventListener('click', this.toggleBubbleOnOutsideEvent)
      document.addEventListener('keypress', this.toggleBubbleOnOutsideEvent)
      window.addEventListener('resize', this.updatePageWidth)
      this.updatePageWidth()
    } else {
      document.removeEventListener('click', this.toggleBubbleOnOutsideEvent)
      document.removeEventListener('keypress', this.toggleBubbleOnOutsideEvent)
      window.removeEventListener('resize', this.updatePageWidth)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleBubbleOnOutsideEvent)
    document.removeEventListener('keypress', this.toggleBubbleOnOutsideEvent)
    window.removeEventListener('resize', this.updatePageWidth)
  }

  setTooltipRef = element => {
    this.refTooltip = element
  }

  toggleBubbleOnOutsideEvent = event => {
    const { connectedFieldLabel } = this.props

    const { bubbleId, triggerId } = getIds(connectedFieldLabel)

    const inBubble = closest(event.target, `#${bubbleId}`)
    const inTrigger = closest(event.target, `#${triggerId}`)

    if (!inBubble && !inTrigger) {
      this.toggleBubble()
    }
  }

  toggleBubble = () => {
    this.setState(({ open }) => {
      return { open: !open }
    })
  }

  updatePageWidth = () => {
    if (this.refTooltip) {
      this.halfPageWidth = window.innerWidth / 2
      this.tooltipPos = this.refTooltip.offsetLeft
    }
  }

  render() {
    const { direction, connectedFieldLabel, children, ...rest } = this.props

    const { bubbleId, triggerId } = getIds(connectedFieldLabel)

    const classes = joinClassNames(iconWrapperStyles.fixLineHeight, styles.tooltip)

    return (
      <div {...safeRest(rest)} className={classes} ref={this.setTooltipRef}>
        <div className={styles.tooltipContainer} data-testid="tooltipContainer">
          <Bubble
            id={bubbleId}
            direction={direction || (this.tooltipPos > this.halfPageWidth ? 'left' : 'right')}
            open={this.state.open}
          >
            {children}
          </Bubble>
          <StandaloneIcon
            symbol="questionMarkCircle"
            a11yText={getTriggerA11yText(connectedFieldLabel)}
            onClick={this.toggleBubble}
            id={triggerId}
            aria-controls={bubbleId}
            aria-haspopup="true"
            aria-expanded={this.state.open ? 'true' : 'false'}
          />
        </div>
      </div>
    )
  }
}

Tooltip.propTypes = {
  /**
   * Open the bubble to the left or right of the trigger.
   */
  direction: PropTypes.oneOf(['left', 'right']),
  /**
   * The input field that using this tooltip must pass its label so that the tooltip trigger can connect itself. Do not
   * show this prop as it is not part of the public API. If this prop is not specified, the tooltip will generate
   * a generic ID, which could produce duplicate ids.
   *
   * @ignore
   */
  connectedFieldLabel: PropTypes.string,
  /**
   * The message. Can be raw text or text components.
   */
  children: PropTypes.node.isRequired,
}

Tooltip.defaultProps = {
  connectedFieldLabel: undefined,
}

export default Tooltip