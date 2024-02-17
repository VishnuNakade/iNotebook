import React from 'react'
// import PropTypes from 'prop-types'

export default function Alart(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div style={{ height: '50px' }}>

      {props.alart && <div className={`alert alert-${props.alart.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alart.type)}</strong>:{props.alart.msg}
      </div>}

    </div>
  )
}