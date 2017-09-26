import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icon/Icon'

/**
 * An icon that is used just for visual aesthetics.
 *
 * <span class="docs--badge green">wip</span>
 */
const DecorativeIcon = ({ symbol, variant, size, ...rest }) => (
  <Icon {...rest} symbol={symbol} variant={variant} size={size} aria-hidden="true" />
)

DecorativeIcon.propTypes = {
  /**
   * Name of the icon symbol.
   */
  symbol: PropTypes.oneOf([
    'caretDown',
    'caretUp',
    'checkmark',
    'chevron',
    'leftChevron',
    'exclamationPointCircle',
    'expander',
    'hamburger',
    'incomplete',
    'location',
    'minus',
    'plus',
    'questionMarkCircle',
    'spyglass',
    'times'
  ]).isRequired,
  /**
   * The appearance of the Icon.
   */
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'inverted',
    'error'
  ]),
  /**
   * The icon size in pixels.
   */
  size: PropTypes.oneOf([16, 24, 48])
}

DecorativeIcon.defaultProps = {
  variant: undefined,
  size: 24
}

export default DecorativeIcon